---
course: laravel
slug: migration
title: Migration: ডেটাবেসের version control
description: নিজের ডেটাবেসে যোগ করা কলাম সহকর্মীর ডেটাবেসে যাবে কীভাবে? migration ফাইল, up আর down, migrations টেবিলের খাতা, rollback, দেড় মিনিটে।
order: 7
date: 2026-11-20
og_icon: 🗂️
og_text: Migration
status: synced
---

## মালিকের জন্য নোট

- voice মালিকের নিজের লেখা চূড়ান্ত script থেকে হুবহু নেওয়া। ১৬টা অনুচ্ছেদ, ২৮টা বাক্য।
- পর্দায় migration ফাইলের নাম আর `migrate:status`-এর লেখা সরল করে দেখানো হয়েছে।

## অংশ ১: কলাম যাবে কীভাবে

L1
voice: [curious] নিজের ডেটাবেসে নতুন একটা কলাম যোগ করলেন। সহকর্মীর ডেটাবেসে সেটা যাবে কীভাবে?
caption: নিজের ডেটাবেসে নতুন একটা কলাম যোগ করলেন। সহকর্মীর ডেটাবেসে সেটা যাবে কীভাবে?
L2
voice: মুখে বলে দিলে কেউ না কেউ ভুলবেই। আর লাইভ সার্ভারে ভুল টেবিল মানে ভাঙা সাইট।
caption: মুখে বলে দিলে কেউ না কেউ ভুলবেই। আর লাইভ সার্ভারে ভুল টেবিল মানে ভাঙা সাইট।
L3
voice: মাইগ্রেশন টেবিলের গঠনকে কোডে লিখে রাখে। ব্যাপারটা ডেটাবেসের জন্য গিটের মতো।
caption: Migration টেবিলের গঠনকে কোডে লিখে রাখে। ব্যাপারটা ডেটাবেসের জন্য Git-এর মতো।
L4
voice: অফিসের ভাষায়, রেকর্ড রুমের আলমারির নকশা লেখা থাকে নির্দেশপত্রে। যে শাখাতেই যান, হুবহু একই আলমারি।
caption: অফিসের ভাষায়, রেকর্ড রুমের আলমারির নকশা লেখা থাকে নির্দেশপত্রে। যে শাখাতেই যান, হুবহু একই আলমারি।

```json
[
    { "type": "line", "at": "L1", "until": "L3", "x": 32, "y": 43.5, "w": 36, "dashed": true },
    { "type": "box", "at": "L1", "until": "L3", "icon": "💻", "text": "আপনার ডেটাবেস", "x": 6, "y": 34, "w": 26 },
    { "type": "box", "at": "L1", "until": "L3", "icon": "💻", "text": "সহকর্মীর ডেটাবেস", "x": 68, "y": 34, "w": 26 },
    { "type": "note", "at": "L1", "until": "L3", "text": "+ views কলাম", "x": 6, "y": 56, "w": 26, "mono": true, "tone": "ok" },
    { "type": "text", "at": "L1.2", "until": "L3", "text": "❓ কীভাবে যাবে", "x": 68, "y": 56, "w": 26, "tone": "danger" },
    { "type": "packet", "at": "L2", "until": "L3", "text": "🗣️ মুখে বলা", "from": 33, "to": 47, "y": 35, "w": 20, "tone": "danger" },
    { "type": "box", "at": "L2.2", "until": "L3", "icon": "🖥️", "text": "লাইভ সার্ভার: 💥 ভাঙা সাইট", "x": 34, "y": 56, "w": 32, "tone": "danger" },

    { "type": "label", "at": "L3", "until": "L4", "text": "Migration: টেবিলের গঠন কোডে", "tone": "ok" },
    { "type": "note", "at": "L3", "until": "L4", "text": "Schema::create('posts', …);", "x": 25, "y": 34, "w": 50, "mono": true },
    { "type": "text", "at": "L3.2", "until": "L4", "text": "🗂️ ডেটাবেসের জন্য Git", "x": 25, "y": 50, "w": 50, "tone": "accent" },

    { "type": "label", "at": "L4", "until": "L5", "text": "আলমারির নির্দেশপত্র", "tone": "accent" },
    { "type": "box", "at": "L4", "until": "L5", "icon": "📜", "text": "নির্দেশপত্র", "x": 6, "y": 36, "w": 24, "tone": "accent" },
    { "type": "line", "at": "L4.2", "until": "L5", "x": 30, "y": 45.5, "w": 8 },
    { "type": "box", "at": "L4.2", "until": "L5", "icon": "🗄️", "text": "শাখা ১", "x": 38, "y": 36, "w": 17 },
    { "type": "box", "at": "L4.2", "until": "L5", "icon": "🗄️", "text": "শাখা ২", "x": 58, "y": 36, "w": 17 },
    { "type": "box", "at": "L4.2", "until": "L5", "icon": "🗄️", "text": "শাখা ৩", "x": 78, "y": 36, "w": 17 },
    { "type": "text", "at": "L4.2", "until": "L5", "text": "হুবহু একই আলমারি ✓", "x": 38, "y": 60, "w": 57, "tone": "ok" }
]
```

## অংশ ২: migration ফাইল

L5
voice: প্রতিটা মাইগ্রেশন একটা ফাইল, থাকে ডেটাবেস স্ল্যাশ মাইগ্রেশনস ফোল্ডারে। নামের শুরুতে থাকে তারিখ আর সময়।
caption: প্রতিটা migration একটা ফাইল, থাকে database/migrations ফোল্ডারে। নামের শুরুতে থাকে তারিখ আর সময়।
L6
voice: ফাইলের ভেতরে দুটো মেথড। আপ বলে কী বানাতে হবে, ডাউন বলে কীভাবে ফিরিয়ে নিতে হবে।
caption: ফাইলের ভেতরে দুটো মেথড। up বলে কী বানাতে হবে, down বলে কীভাবে ফিরিয়ে নিতে হবে।
L7
voice: যেমন আপ-এ লেখা, পোস্টস টেবিল বানাও, তাতে থাকবে শিরোনাম আর লেখা।
caption: যেমন up-এ লেখা, posts টেবিল বানাও, তাতে থাকবে শিরোনাম আর লেখা।
L8
voice: তারপর একটা কমান্ড, পি-এইচ-পি আর্টিসান মাইগ্রেট। সব টেবিল তৈরি।
caption: তারপর একটা কমান্ড, php artisan migrate। সব টেবিল তৈরি।

```json
[
    { "type": "label", "at": "L5", "until": "L6", "text": "database/migrations" },
    { "type": "note", "at": "L5", "until": "L6", "text": "📂 database/migrations/", "x": 15, "y": 24, "w": 70, "mono": true },
    { "type": "note", "at": "L5", "until": "L6", "text": "2026_11_20_093000_create_posts_table.php", "x": 15, "y": 34, "w": 70, "mono": true },
    { "type": "note", "at": "L5", "until": "L6", "text": "2026_11_21_101500_add_views_to_posts_table.php", "x": 15, "y": 43, "w": 70, "mono": true },
    { "type": "text", "at": "L5.2", "until": "L6", "text": "👆 শুরুতে তারিখ আর সময়", "x": 15, "y": 56, "w": 70, "tone": "accent", "align": "left" },

    { "type": "label", "at": "L6", "until": "L7", "text": "দুটো মেথড: up আর down" },
    { "type": "note", "at": "L6", "until": "L7", "text": "public function up() { … }", "x": 20, "y": 24, "w": 60, "mono": true },
    { "type": "note", "at": "L6", "until": "L7", "text": "public function down() { … }", "x": 20, "y": 33, "w": 60, "mono": true },
    { "type": "box", "at": "L6.2", "until": "L7", "icon": "⬆️", "text": "up: কী বানাতে হবে", "x": 8, "y": 46, "w": 40, "tone": "ok" },
    { "type": "box", "at": "L6.2", "until": "L7", "icon": "⬇️", "text": "down: কীভাবে ফেরাতে হবে", "x": 52, "y": 46, "w": 40, "tone": "accent" },

    { "type": "label", "at": "L7", "until": "L8", "text": "up-এ: posts টেবিল" },
    { "type": "note", "at": "L7", "until": "L8", "text": "Schema::create('posts', function (Blueprint $table) {", "x": 10, "y": 22, "w": 80, "mono": true },
    { "type": "note", "at": "L7", "until": "L8", "text": "    $table->id();", "x": 10, "y": 31, "w": 80, "mono": true },
    { "type": "note", "at": "L7", "until": "L8", "text": "    $table->string('title');   // শিরোনাম", "x": 10, "y": 40, "w": 80, "mono": true, "tone": "accent" },
    { "type": "note", "at": "L7", "until": "L8", "text": "    $table->text('body');   // লেখা", "x": 10, "y": 49, "w": 80, "mono": true, "tone": "accent" },
    { "type": "note", "at": "L7", "until": "L8", "text": "});", "x": 10, "y": 58, "w": 80, "mono": true },

    { "type": "label", "at": "L8", "until": "L9", "text": "php artisan migrate" },
    { "type": "note", "at": "L8", "until": "L9", "text": "$ php artisan migrate", "x": 15, "y": 30, "w": 70, "mono": true },
    { "type": "note", "at": "L8.2", "until": "L9", "text": "create_posts_table · DONE ✓", "x": 15, "y": 42, "w": 70, "mono": true, "tone": "ok" }
]
```

## অংশ ৩: migrations টেবিলের খাতা

L9
voice: কিন্তু পরের বার চালালে কি সব আবার নতুন করে বানাবে?
caption: কিন্তু পরের বার চালালে কি সব আবার নতুন করে বানাবে?
L10
voice: [excited] না, লারাভেল একটা খাতা রাখে মাইগ্রেশনস নামের টেবিলে! কোনটা চলে গেছে, সব লেখা থাকে।
caption: না, Laravel একটা খাতা রাখে migrations নামের টেবিলে! কোনটা চলে গেছে, সব লেখা থাকে।
L11
voice: তাই পরের বার শুধু নতুন ফাইলগুলো চলে। সহকর্মী কোড নিয়ে মাইগ্রেট চালালেই, তার ডেটাবেসও আপনার মতো।
caption: তাই পরের বার শুধু নতুন ফাইলগুলো চলে। সহকর্মী কোড নিয়ে migrate চালালেই, তার ডেটাবেসও আপনার মতো।
L12
voice: ভুল হলে রোলব্যাক চালান। শেষ ধাপের ডাউন মেথড চলে, আর বদলটা ফিরে যায়।
caption: ভুল হলে rollback চালান। শেষ ধাপের down মেথড চলে, আর বদলটা ফিরে যায়।

```json
[
    { "type": "label", "at": "L9", "until": "L10", "text": "আবার চালালে?" },
    { "type": "text", "at": "L9", "until": "L10", "text": "সব আবার নতুন করে? 🤔", "x": 25, "y": 42, "w": 50, "tone": "accent" },

    { "type": "label", "at": "L10", "until": "L11.2", "text": "migrations টেবিল: খাতা 📒", "tone": "ok" },
    { "type": "note", "at": "L10.2", "until": "L11.2", "text": "📒 migrations", "x": 20, "y": 24, "w": 60 },
    { "type": "note", "at": "L10.2", "until": "L11.2", "text": "create_users_table · চলে গেছে ✓", "x": 20, "y": 34, "w": 60, "mono": true, "tone": "ok" },
    { "type": "note", "at": "L10.2", "until": "L11.2", "text": "create_posts_table · চলে গেছে ✓", "x": 20, "y": 43, "w": 60, "mono": true, "tone": "ok" },
    { "type": "note", "at": "L11", "until": "L11.2", "text": "add_views_to_posts_table · নতুন 👉 চলবে", "x": 20, "y": 52, "w": 60, "mono": true, "tone": "accent" },

    { "type": "label", "at": "L11.2", "until": "L12", "text": "দুজনের ডেটাবেস একই", "tone": "ok" },
    { "type": "box", "at": "L11.2", "until": "L12", "icon": "💻", "text": "আপনার ডেটাবেস", "x": 6, "y": 32, "w": 26, "tone": "ok" },
    { "type": "box", "at": "L11.2", "until": "L12", "icon": "💻", "text": "সহকর্মীর ডেটাবেস", "x": 68, "y": 32, "w": 26, "tone": "ok" },
    { "type": "text", "at": "L11.2", "until": "L12", "text": "= হুবহু এক ✓", "x": 34, "y": 39, "w": 32, "tone": "ok" },
    { "type": "note", "at": "L11.2", "until": "L12", "text": "$ php artisan migrate", "x": 30, "y": 58, "w": 40, "mono": true },

    { "type": "label", "at": "L12", "until": "L13", "text": "rollback ↩️" },
    { "type": "note", "at": "L12", "until": "L13", "text": "$ php artisan migrate:rollback", "x": 15, "y": 30, "w": 70, "mono": true },
    { "type": "text", "at": "L12.2", "until": "L13", "text": "⬇️ শেষ ধাপের down চলে, বদলটা ফিরে যায়", "x": 15, "y": 44, "w": 70, "tone": "accent" }
]
```

## অংশ ৪: চলে যাওয়া migration বদলাবেন না

L13
voice: [serious] তবে একটা কথা মনে রাখবেন। যে মাইগ্রেশন একবার চলে গেছে, তাকে আর বদলাবেন না।
caption: তবে একটা কথা মনে রাখবেন। যে migration একবার চলে গেছে, তাকে আর বদলাবেন না।
L14
voice: খাতায় সেটা চলা হিসেবে লেখা, তাই বদলালেও আর চলবে না।
caption: খাতায় সেটা চলা হিসেবে লেখা, তাই বদলালেও আর চলবে না।
L15
voice: কলাম যোগ বা বদলাতে হলে, সবসময় নতুন একটা মাইগ্রেশন বানান।
caption: কলাম যোগ বা বদলাতে হলে, সবসময় নতুন একটা migration বানান।
L16
voice: এখনই চালান পি-এইচ-পি আর্টিসান মাইগ্রেট কোলন স্ট্যাটাস। দেখবেন কোনটা চলেছে, কোনটা বাকি।
caption: এখনই চালান php artisan migrate:status। দেখবেন কোনটা চলেছে, কোনটা বাকি।

```json
[
    { "type": "label", "at": "L13", "until": "L16", "text": "সাবধান", "tone": "danger" },
    { "type": "note", "at": "L13.2", "until": "L15", "text": "✏️ create_posts_table.php  (চলে গেছে)", "x": 15, "y": 28, "w": 70, "mono": true, "tone": "danger" },
    { "type": "text", "at": "L13.2", "until": "L14", "text": "✗ আর বদলাবেন না", "x": 15, "y": 40, "w": 70, "tone": "danger" },
    { "type": "note", "at": "L14", "until": "L15", "text": "📒 migrations: create_posts_table · চলে গেছে ✓", "x": 15, "y": 40, "w": 70, "mono": true },
    { "type": "text", "at": "L14", "until": "L15", "text": "বদলালেও আর চলবে না 🚫", "x": 15, "y": 52, "w": 70, "tone": "danger" },
    { "type": "note", "at": "L15", "until": "L16", "text": "$ php artisan make:migration add_views_to_posts_table", "x": 8, "y": 32, "w": 84, "mono": true, "tone": "ok" },
    { "type": "text", "at": "L15", "until": "L16", "text": "✓ সবসময় নতুন migration", "x": 15, "y": 46, "w": 70, "tone": "ok" },
    { "type": "label", "at": "L16", "until": "end", "text": "নিজে দেখুন 👀", "tone": "accent" },
    { "type": "note", "at": "L16", "until": "end", "text": "$ php artisan migrate:status", "x": 15, "y": 24, "w": 70, "mono": true },
    { "type": "note", "at": "L16.2", "until": "end", "text": "create_users_table · Ran", "x": 15, "y": 36, "w": 70, "mono": true, "tone": "ok" },
    { "type": "note", "at": "L16.2", "until": "end", "text": "create_posts_table · Ran", "x": 15, "y": 45, "w": 70, "mono": true, "tone": "ok" },
    { "type": "note", "at": "L16.2", "until": "end", "text": "add_views_to_posts_table · Pending", "x": 15, "y": 54, "w": 70, "mono": true, "tone": "accent" }
]
```
