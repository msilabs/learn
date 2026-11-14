# msilabs শিখুন

বাংলায় ছোট ছোট animated পাঠ আর interactive simulator। লাইভ: https://msilabs.github.io/learn/

প্রতিটা পাঠ সাধারণ HTML, ভিডিও নয়। একটা অডিও ফাইল বাজে, আর অডিওর সময় দেখে পর্দার উপাদানগুলো আসে আর যায়। লেখা সিলেক্ট করা যায়, গতি বদলানো যায়, পুরো স্ক্রিপ্ট নিচে থাকে, আর স্ক্রিপ্টের যেকোনো লাইনে ক্লিক করলে পাঠ সেখান থেকে চলে।

[Alo](https://msilabs.github.io/alo/) দিয়ে বানানো। কোনো runtime dependency নেই।

## চালানো

```
npm install
node alo dev      # http://localhost:3000
node alo build    # dist/
```

GitHub Pages-এ সাইটটা `/learn/` পাথে চলে, তাই deploy workflow `node alo build --base /learn/` দিয়ে build করে। কোডে লিংক সবসময় `/web/https/` আকারে লিখুন, base Alo নিজেই বসায়।

## কাঠামো

```
data/courses.json             course-এর তালিকা (id, title, description, topic, color, icon, status)
data/<course>/<slug>.json     একেকটা পাঠ: অডিও, ক্যাপশন আর দৃশ্য
data/interactive.json         simulator-এর কার্ড
public/audio/<course>/<slug>.mp3
public/og/<course>/<slug>.jpg thumbnail আর শেয়ারের ছবি (১২০০×৬৩০)
drafts/<course>/<slug>.md     পাঠের ড্রাফট: এখান থেকেই JSON, voice script আর ছবি তৈরি হয়
tools/lesson.mjs              ড্রাফট থেকে voice script, OG image আর JSON বানায়
pages/<course>/page.alo       course পেইজ (সব course-এ হুবহু একই ফাইল)
pages/<course>/[slug]/page.alo  পাঠের পেইজ (সব course-এ হুবহু একই ফাইল)
components/lesson/Player.alo  সাধারণ প্লেয়ার: সময়, কন্ট্রোল, ক্যাপশন, কীবোর্ড, পূর্ণ পর্দা
components/lesson/Transcript.alo  ক্লিক করা যায় এমন স্ক্রিপ্ট
components/scene/*.alo        দৃশ্যের উপাদান (title, label, box, line, packet, note, text, cards)
```

## নতুন পাঠ যোগ করা

সাধারণ পথ হলো ড্রাফট থেকে বানানো (বিস্তারিত `CLAUDE.md`-তে):

```
node tools/lesson.mjs voice web https   # drafts/web/https.voice.txt, ElevenLabs-এ পেস্ট করার জন্য
node tools/lesson.mjs og web https      # public/og/web/https.jpg
node tools/lesson.mjs sync web https    # অডিওর বিরতি মেপে প্রতিটা বাক্যের সময়, data/web/https.json
```

JSON-এর গঠন নিচে দেওয়া হলো:

1. অডিও রাখুন `public/audio/<course>/<slug>.mp3`-এ।
2. `data/<course>/<slug>.json` বানান (নিচের নমুনা দেখুন)। `slug` লিখবেন না, ফাইলের নাম থেকে আসে।
3. course-এর প্রথম পাঠ হলে `pages/web/[slug]/page.alo` কপি করে `pages/<course>/[slug]/page.alo` বানান।

কোনো component লিখতে হয় না। নতুন course হলে `data/courses.json`-এ এক লাইন যোগ করুন আর `pages/web/page.alo` কপি করে `pages/<course>/page.alo` বানান।

```json
{
    "title": "HTTPS কীভাবে কাজ করে",
    "description": "এক লাইনের বর্ণনা, পেইজের meta-তেও যায়।",
    "order": 1,
    "date": "2026-11-13",
    "duration": 64.9,
    "audio": "/audio/web/https.mp3",
    "thumb": "/thumbs/https.png",
    "captions": [
        { "t": 0, "text": "প্রথম লাইন" },
        { "t": 6.7, "text": "দ্বিতীয় লাইন" }
    ],
    "scene": [
        { "type": "title", "at": 0, "until": 6.7, "text": "শিরোনাম", "sub": "উপশিরোনাম" }
    ]
}
```

`thumb` ঐচ্ছিক। না দিলে course-এর রং আর icon দিয়ে cover তৈরি হয়। `date` দেখে হোমপেইজ ঠিক করে কোনটা সর্বশেষ পাঠ।

## দৃশ্যের উপাদান

সব উপাদানে `at` (কখন আসবে) আর `until` (কখন যাবে, না দিলে শেষ পর্যন্ত থাকে), সময় সেকেন্ডে। `x`, `y`, `w`, `h` স্টেজের শতাংশে। `tone` হতে পারে `danger`, `ok` বা `accent`।

| type | ঘর | কী আঁকে |
| --- | --- | --- |
| `title` | `text`, `sub` | পুরো পর্দা জুড়ে শিরোনাম |
| `label` | `text`, `tone` | উপরে মাঝখানে pill |
| `box` | `icon`, `text`, `x`, `y`, `w`, `tone` | বাক্স, যেমন ব্রাউজার বা সার্ভার |
| `line` | `x`, `y`, `w` অথবা `h`, `tone`, `dashed` | আড়াআড়ি (`w`) বা খাড়া (`h`) রেখা |
| `packet` | `text`, `from`, `to`, `y`, `w`, `tone`, `mono`, `travel` | `from` থেকে `to`-তে চলে যাওয়া বার্তা |
| `note` | `title`, `text`, `x`, `y`, `w`, `tone`, `mono` | বক্তব্য বা যাচাইয়ের নোট |
| `text` | `text`, `x`, `y`, `w`, `tone`, `align` | শুধু লেখা |
| `cards` | `items: [{ at, icon, title, text }]` | শেষে সারি করে কার্ড |
| `bar` | `icon`, `text`, `x`, `y`, `w`, `tone` | ব্রাউজারের ঠিকানার ঘর, যেমন `🔒 https://example.com` |

নতুন ধরনের উপাদান লাগলে `components/scene/`-এ একটা component বানান আর `components/scene/Stage.alo`-তে এক লাইন যোগ করুন।

## লাইসেন্স

MIT
