// Lesson tool: builds everything from drafts/<course>/<slug>.md.
//   node tools/lesson.mjs voice <course> <slug>   -> drafts/<course>/<slug>.voice.txt
//   node tools/lesson.mjs og <course> <slug>      -> public/og/<course>/<slug>.png (needs Google Chrome)
//   node tools/lesson.mjs sync <course> <slug>    -> data/<course>/<slug>.json (needs macOS afconvert)
//
// A draft line (L1, L2, ...) is one paragraph of the narration. Each paragraph is split into
// sentences; every sentence becomes one caption with its own time, measured from the audio.
// Scene times refer to a paragraph ("L3") or to a sentence inside it ("L3.2").

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [cmd, course, slug] = process.argv.slice(2);
if (!['voice', 'og', 'sync'].includes(cmd) || !course || !slug) {
    console.error('usage: node tools/lesson.mjs <voice|og|sync> <course> <slug>');
    process.exit(1);
}

const draftPath = `drafts/${course}/${slug}.md`;
const voicePath = `drafts/${course}/${slug}.voice.txt`;
const audioPath = `public/audio/${course}/${slug}.mp3`;
const ogPath = `public/og/${course}/${slug}.png`;
const dataPath = `data/${course}/${slug}.json`;

const draft = readDraft(draftPath);

if (cmd === 'voice') voice();
if (cmd === 'og') og();
if (cmd === 'sync') sync();

function fail(message) {
    console.error(`error: ${message}`);
    process.exit(1);
}

// expression tags like [curious] are read by ElevenLabs, not spoken
function untag(text) {
    return text.replace(/\[[^\]]*\]\s*/g, '').trim();
}

function sentences(text) {
    return untag(text).split(/(?<=[।?!])\s+/).filter(Boolean);
}

function readDraft(path) {
    if (!existsSync(path)) fail(`${path} not found`);
    const src = readFileSync(path, 'utf8');

    const head = src.match(/^---\n([\s\S]*?)\n---/);
    if (!head) fail('front matter missing');
    const fm = {};
    for (const line of head[1].split('\n')) {
        const i = line.indexOf(':');
        if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }

    const lines = [];
    for (const m of src.matchAll(/^L(\d+)\nvoice: (.+)\ncaption: (.+)$/gm)) {
        const n = lines.length + 1;
        if (Number(m[1]) !== n) fail(`expected L${n}, found L${m[1]}`);
        const voice = m[2].trim();
        const caption = m[3].trim();
        const spoken = sentences(voice);
        const shown = sentences(caption);
        if (spoken.length !== shown.length) {
            fail(`L${n}: voice has ${spoken.length} sentence(s) but caption has ${shown.length}; they must match`);
        }
        lines.push({ voice, caption, spoken, shown });
    }
    if (!lines.length) fail('no lines found (expected "L1" / "voice:" / "caption:")');

    const scene = [];
    for (const m of src.matchAll(/```json\n([\s\S]*?)\n```/g)) {
        try {
            scene.push(...JSON.parse(m[1]));
        } catch (e) {
            fail(`invalid json block: ${e.message}`);
        }
    }

    for (const el of scene) {
        for (const ref of [el.at, el.until, ...(el.items ?? []).flatMap((it) => [it.at, it.until])]) {
            if (ref !== undefined && ref !== 'end') parseRef(ref, lines);
        }
    }

    return { fm, lines, scene };
}

// "L3" -> first sentence of paragraph 3, "L3.2" -> its second sentence; returns a flat sentence index
function parseRef(ref, lines) {
    const m = /^L(\d+)(?:\.(\d+))?$/.exec(ref);
    const line = m && lines[Number(m[1]) - 1];
    const part = m ? Number(m[2] ?? 1) : 0;
    if (!line || part < 1 || part > line.spoken.length) {
        fail(`bad time reference "${ref}" (use L1..L${lines.length}, "L3.2" for a sentence inside a line, or "end")`);
    }
    let index = part - 1;
    for (let i = 0; i < Number(m[1]) - 1; i++) index += lines[i].spoken.length;
    return index;
}

function voice() {
    writeFileSync(voicePath, draft.lines.map((l) => l.voice).join('\n\n') + '\n');
    console.log(`wrote ${voicePath} (${draft.lines.length} paragraphs)`);
}

function og() {
    const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    if (!existsSync(chrome)) fail('Google Chrome not found');
    const { og_icon, og_text } = draft.fm;
    if (!og_icon && !og_text) fail('add og_icon and/or og_text to the front matter');

    const courses = JSON.parse(readFileSync('data/courses.json', 'utf8'));
    const color = courses.find((c) => c.id === course)?.color ?? 'mint';
    const url = pathToFileURL(resolve('tools/og.html'));
    url.search = new URLSearchParams({ icon: og_icon ?? '', text: og_text ?? '', color }).toString();

    mkdirSync(`public/og/${course}`, { recursive: true });
    execFileSync(chrome, [
        '--headless=new',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        '--window-size=1200,630',
        '--virtual-time-budget=5000',
        `--screenshot=${resolve(ogPath)}`,
        url.href,
    ], { stdio: 'ignore' });
    console.log(`wrote ${ogPath}`);
}

function silences(wavPath, thresholdDb = -35, minLength = 0.15) {
    const buf = readFileSync(wavPath);
    let off = 12, rate = 16000, dataOff = 0, dataLen = 0;
    while (off < buf.length) {
        const id = buf.toString('ascii', off, off + 4);
        const len = buf.readUInt32LE(off + 4);
        if (id === 'fmt ') rate = buf.readUInt32LE(off + 12);
        if (id === 'data') {
            dataOff = off + 8;
            dataLen = len;
            break;
        }
        off += 8 + len;
    }

    const samples = Math.floor(dataLen / 2);
    const frame = Math.round(rate * 0.01);
    const threshold = Math.pow(10, thresholdDb / 20) * 32768;
    const gaps = [];
    let start = null;

    for (let i = 0; i * frame < samples; i++) {
        let sum = 0, count = 0;
        for (let j = i * frame; j < Math.min(samples, (i + 1) * frame); j++) {
            const v = buf.readInt16LE(dataOff + j * 2);
            sum += v * v;
            count++;
        }
        const quiet = Math.sqrt(sum / count) < threshold;
        const t = i * 0.01;
        if (quiet && start === null) start = t;
        if (!quiet && start !== null) {
            // silence at the very start is not a gap between sentences; silence at the end is never closed
            if (start > 0.05 && t - start >= minLength) gaps.push({ start, end: t, len: t - start });
            start = null;
        }
    }
    return { gaps, duration: samples / rate };
}

// Natural pauses inside a sentence (after a comma) can be as long as the pause between sentences.
// Take the longest gaps plus up to three extra, try every way of leaving extras out, and keep the
// split where every sentence is spoken at a similar speed (seconds per character).
// Accept it only if it is clearly better than every other split.
function bySpeakingRate(ranked, need, texts, duration) {
    const variation = (set) => {
        const sorted = set.toSorted((a, b) => a.start - b.start);
        const rates = [];
        let start = 0;
        for (const [i, g] of sorted.entries()) {
            rates.push((g.start - start) / texts[i].length);
            start = g.end;
        }
        rates.push((duration - start) / texts.at(-1).length);
        const mean = rates.reduce((a, b) => a + b) / rates.length;
        const sd = Math.sqrt(rates.reduce((a, b) => a + (b - mean) ** 2, 0) / rates.length);
        return sd / mean;
    };
    const combos = (n, k, from = 0) =>
        k === 0 ? [[]] : Array.from({ length: n - from }, (_, i) => from + i).flatMap((i) => combos(n, k - 1, i + 1).map((c) => [i, ...c]));

    const seen = new Map();
    for (let extra = 0; extra <= 3; extra++) {
        const pool = ranked.slice(0, need + extra);
        if (pool.length < need) break;
        for (const drop of combos(pool.length, pool.length - need)) {
            const set = pool.filter((_, i) => !drop.includes(i));
            const key = set.map((g) => g.start).sort((a, b) => a - b).join(',');
            if (!seen.has(key)) seen.set(key, { set, cv: variation(set) });
        }
    }
    const options = [...seen.values()].sort((a, b) => a.cv - b.cv);
    const [best, second] = options;
    if (!best) return null;
    console.log(`best split: rate variation ${best.cv.toFixed(3)}, next best ${second ? second.cv.toFixed(3) : '-'}`);
    if (best.cv > 0.15 || (second && second.cv < best.cv * 1.4)) return null;

    const used = new Set(best.set);
    for (const g of ranked.slice(0, need).filter((g) => !used.has(g))) {
        const sentence = best.set.filter((x) => x.start < g.start).length + 1;
        console.log(`pause at ${g.start.toFixed(2)}s (${g.len.toFixed(2)}s) is inside sentence ${sentence}, not between sentences`);
    }
    return best.set;
}

function sync() {
    if (!existsSync(audioPath)) fail(`${audioPath} not found`);

    const { fm, lines, scene } = draft;
    if (existsSync(voicePath)) {
        const expected = lines.map((l) => l.voice).join('\n\n').trim();
        if (readFileSync(voicePath, 'utf8').trim() !== expected) {
            fail(`${voicePath} does not match the draft; update the draft from it (or run "voice") first`);
        }
    }

    const wav = join(tmpdir(), `lesson-${course}-${slug}.wav`);
    try {
        execFileSync('afconvert', ['-f', 'WAVE', '-d', 'LEI16@16000', '-c', '1', audioPath, wav], { stdio: 'pipe' });
    } catch (e) {
        fail(`could not read ${audioPath} with afconvert: ${String(e.stderr).trim()}`);
    }
    const { gaps, duration } = silences(wav);
    rmSync(wav);

    const spoken = lines.flatMap((l) => l.spoken);
    const shown = lines.flatMap((l) => l.shown);
    const need = spoken.length - 1;
    const ranked = gaps.toSorted((a, b) => b.len - a.len);
    let chosen = ranked.slice(0, need);
    const shortestChosen = chosen.length ? chosen.at(-1).len : 0;
    const longestOther = ranked[need]?.len ?? 0;

    console.log(`paragraphs: ${lines.length}, sentences: ${spoken.length}, gaps needed: ${need}, gaps found: ${gaps.length}`);
    console.log(`shortest sentence gap: ${shortestChosen.toFixed(2)}s, longest other pause: ${longestOther.toFixed(2)}s`);
    if (chosen.length < need || shortestChosen - longestOther < 0.2) {
        console.log('gap lengths alone are not decisive, checking speaking rate per sentence...');
        chosen = bySpeakingRate(ranked, need, spoken, duration);
        if (!chosen) {
            console.error('STOP: could not tell the pauses between sentences from other pauses.');
            console.error('Check that the audio follows the script, with no extra or missing sentences.');
            process.exit(2);
        }
    }

    const sorted = chosen.toSorted((a, b) => a.start - b.start);
    const starts = [0, ...sorted.map((g) => Math.round(g.end * 10) / 10)];
    const time = (ref) => (ref === undefined || ref === 'end' ? undefined : starts[parseRef(ref, lines)]);
    const timed = scene.map((el) => ({
        ...el,
        at: time(el.at),
        until: time(el.until),
        ...(el.items ? { items: el.items.map((it) => ({ ...it, at: time(it.at), until: time(it.until) })) } : {}),
    }));

    const thumb = fm.thumb ?? (existsSync(ogPath) ? `/og/${course}/${slug}.png` : undefined);
    const lesson = {
        title: fm.title,
        description: fm.description,
        order: Number(fm.order),
        date: fm.date,
        duration: Math.round(duration * 10) / 10,
        audio: `/audio/${course}/${slug}.mp3`,
        ...(thumb ? { thumb } : {}),
        captions: shown.map((text, i) => ({ t: starts[i], text })),
        scene: timed,
    };

    mkdirSync(`data/${course}`, { recursive: true });
    writeFileSync(dataPath, JSON.stringify(lesson, null, 4) + '\n');
    let k = 0;
    for (const [i, l] of lines.entries()) {
        for (const [j, s] of l.shown.entries()) {
            console.log(`L${i + 1}${l.shown.length > 1 ? '.' + (j + 1) : ''}\t${starts[k++].toFixed(1)}\t${s.slice(0, 40)}`);
        }
    }
    console.log(`wrote ${dataPath}`);
}
