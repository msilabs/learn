---
course: laravel
slug: env-config
title: .env আর config
description: ডেটাবেসের পাসওয়ার্ড কোডে লিখে GitHub-এ পুশ করলে কী হয়? .env, .env.example, config ফোল্ডার, config() বনাম env(), আর APP_DEBUG, দেড় মিনিটে।
order: 6
date: 2026-11-20
og_icon: 🔐
og_text: .env
status: synced
---

## মালিকের জন্য নোট

- voice মালিকের নিজের লেখা চূড়ান্ত script থেকে হুবহু নেওয়া। ১৬টা অনুচ্ছেদ, ২৫টা বাক্য।
- [যাচাই] config cache থাকলে config ফাইলের বাইরে `env()` মান পায় না।
- [যাচাই] Laravel 11 থেকে নতুন প্রজেক্টের ডিফল্ট ডেটাবেস sqlite, তখন `DB_HOST`-এর মতো লাইনগুলো comment করা থাকে। L16-এর পর্দায় mysql-এর উদাহরণ।

## অংশ ১: কোডে পাসওয়ার্ড

L1
voice: [curious] ডেটাবেসের পাসওয়ার্ড কোডের ভেতরে লিখে গিটহাবে পুশ করলে কী হয়?
caption: ডেটাবেসের পাসওয়ার্ড কোডের ভেতরে লিখে GitHub-এ পুশ করলে কী হয়?
L2
voice: যে কেউ রিপোজিটরি খুললেই পাসওয়ার্ডটা দেখে ফেলে। আর এমন পাসওয়ার্ড খুঁজে বেড়ানো স্বয়ংক্রিয় প্রোগ্রামও আছে।
caption: যে কেউ রিপোজিটরি খুললেই পাসওয়ার্ডটা দেখে ফেলে। আর এমন পাসওয়ার্ড খুঁজে বেড়ানো স্বয়ংক্রিয় প্রোগ্রামও আছে।
L3
voice: লারাভেল তাই গোপন তথ্য রাখে কোডের বাইরে, ডট-ই-এন-ভি নামের একটা ফাইলে।
caption: Laravel তাই গোপন তথ্য রাখে কোডের বাইরে, .env নামের একটা ফাইলে।
L4
voice: অফিসের ভাষায়, এটা ম্যানেজারের তালাবন্ধ ড্রয়ার। চাবি আর পাসওয়ার্ড, সব এখানে।
caption: অফিসের ভাষায়, এটা ম্যানেজারের তালাবন্ধ ড্রয়ার। চাবি আর পাসওয়ার্ড, সব এখানে।

```json
[
    { "type": "note", "at": "L1", "until": "L3", "text": "$password = 'secret123';", "x": 4, "y": 30, "w": 36, "mono": true, "tone": "danger" },
    { "type": "packet", "at": "L1", "until": "L3", "text": "📤 push", "from": 41, "to": 50, "y": 30.5, "w": 18 },
    { "type": "box", "at": "L1", "until": "L3", "icon": "☁️", "text": "GitHub", "x": 70, "y": 26, "w": 22 },
    { "type": "text", "at": "L2", "until": "L3", "text": "👀 যে কেউ দেখে", "x": 66, "y": 47, "w": 30, "tone": "danger" },
    { "type": "box", "at": "L2.2", "until": "L3", "icon": "🤖", "text": "পাসওয়ার্ড খোঁজা প্রোগ্রাম", "x": 36, "y": 54, "w": 30, "tone": "danger" },

    { "type": "label", "at": "L3", "until": "L4", "text": ".env: কোডের বাইরে", "tone": "ok" },
    { "type": "line", "at": "L3", "until": "L4", "x": 40, "y": 45.5, "w": 20, "dashed": true },
    { "type": "box", "at": "L3", "until": "L4", "icon": "📂", "text": "কোড", "x": 12, "y": 36, "w": 28 },
    { "type": "box", "at": "L3", "until": "L4", "icon": "🔐", "text": ".env", "x": 60, "y": 36, "w": 28, "tone": "accent" },

    { "type": "label", "at": "L4", "until": "L5", "text": "ম্যানেজারের তালাবন্ধ ড্রয়ার", "tone": "accent" },
    { "type": "box", "at": "L4", "until": "L5", "icon": "🔐", "text": "তালাবন্ধ ড্রয়ার", "x": 36, "y": 28, "w": 28, "tone": "accent" },
    { "type": "text", "at": "L4.2", "until": "L5", "text": "🔑 চাবি · 🔒 পাসওয়ার্ড", "x": 25, "y": 54, "w": 50 }
]
```

## অংশ ২: .env আর .env.example

L5
voice: ফাইলটা দেখতে সহজ। প্রতি লাইনে একটা নাম, সমান চিহ্ন, তারপর তার মান।
caption: ফাইলটা দেখতে সহজ। প্রতি লাইনে একটা নাম, সমান চিহ্ন, তারপর তার মান।
L6
voice: আর নতুন প্রজেক্টে লারাভেল এই ফাইলটাকে আগে থেকেই গিটের বাইরে রাখে।
caption: আর নতুন প্রজেক্টে Laravel এই ফাইলটাকে আগে থেকেই Git-এর বাইরে রাখে।
L7
voice: কিন্তু তাহলে অন্য ডেভেলপার জানবেন কীভাবে, কোন কোন মান লাগবে?
caption: কিন্তু তাহলে অন্য ডেভেলপার জানবেন কীভাবে, কোন কোন মান লাগবে?
L8
voice: এর জন্য আছে ডট-ই-এন-ভি ডট এক্সাম্পল। একই নামগুলো থাকে আসল মান ছাড়া, আর এটা গিটে যায়।
caption: এর জন্য আছে .env.example। একই নামগুলো থাকে আসল মান ছাড়া, আর এটা Git-এ যায়।

```json
[
    { "type": "label", "at": "L5", "until": "L6", "text": ".env দেখতে সহজ" },
    { "type": "note", "at": "L5", "until": "L6", "text": "📂 .env", "x": 20, "y": 20, "w": 60 },
    { "type": "note", "at": "L5.2", "until": "L6", "text": "APP_NAME=Laravel", "x": 20, "y": 30, "w": 60, "mono": true },
    { "type": "note", "at": "L5.2", "until": "L6", "text": "DB_DATABASE=blog", "x": 20, "y": 39, "w": 60, "mono": true },
    { "type": "note", "at": "L5.2", "until": "L6", "text": "DB_PASSWORD=secret123", "x": 20, "y": 48, "w": 60, "mono": true },
    { "type": "text", "at": "L5.2", "until": "L6", "text": "নাম = মান", "x": 20, "y": 60, "w": 60, "tone": "accent" },

    { "type": "label", "at": "L6", "until": "L7", "text": "Git-এর বাইরে" },
    { "type": "note", "at": "L6", "until": "L7", "text": "📂 .gitignore", "x": 20, "y": 28, "w": 60 },
    { "type": "note", "at": "L6", "until": "L7", "text": ".env", "x": 20, "y": 37, "w": 60, "mono": true, "tone": "ok" },
    { "type": "text", "at": "L6", "until": "L7", "text": "✓ নতুন প্রজেক্টে আগে থেকেই", "x": 20, "y": 50, "w": 60, "tone": "ok" },

    { "type": "label", "at": "L7", "until": "L8", "text": "অন্য ডেভেলপার জানবেন কীভাবে?" },
    { "type": "box", "at": "L7", "until": "L8", "icon": "🧑‍💻", "text": "নতুন ডেভেলপার", "x": 36, "y": 28, "w": 28 },
    { "type": "text", "at": "L7", "until": "L8", "text": "কোন কোন মান লাগবে? 🤔", "x": 25, "y": 54, "w": 50, "tone": "accent" },

    { "type": "label", "at": "L8", "until": "L9", "text": ".env.example", "tone": "ok" },
    { "type": "note", "at": "L8", "until": "L9", "text": "📂 .env.example  ✓ Git-এ যায়", "x": 6, "y": 24, "w": 42, "tone": "ok" },
    { "type": "note", "at": "L8.2", "until": "L9", "text": "DB_DATABASE=", "x": 6, "y": 34, "w": 42, "mono": true },
    { "type": "note", "at": "L8.2", "until": "L9", "text": "DB_PASSWORD=", "x": 6, "y": 43, "w": 42, "mono": true },
    { "type": "note", "at": "L8.2", "until": "L9", "text": "🔐 .env  ✗ Git-এ যায় না", "x": 52, "y": 24, "w": 42, "tone": "danger" },
    { "type": "note", "at": "L8.2", "until": "L9", "text": "DB_DATABASE=blog", "x": 52, "y": 34, "w": 42, "mono": true },
    { "type": "note", "at": "L8.2", "until": "L9", "text": "DB_PASSWORD=secret123", "x": 52, "y": 43, "w": 42, "mono": true },
    { "type": "text", "at": "L8.2", "until": "L9", "text": "একই নাম, আসল মান ছাড়া", "x": 6, "y": 54, "w": 42, "tone": "ok" }
]
```

## অংশ ৩: config ফোল্ডার

L9
voice: তারপর আছে কনফিগ ফোল্ডার। এখানে প্রতিটা বিষয়ের সেটিং, যেমন ডেটাবেস, মেইল আর সেশন।
caption: তারপর আছে config ফোল্ডার। এখানে প্রতিটা বিষয়ের সেটিং, যেমন ডেটাবেস, মেইল আর সেশন।
L10
voice: [excited] আর মজার ব্যাপার হলো, কনফিগ ফাইলগুলো মান পড়ে ডট-ই-এন-ভি থেকেই!
caption: আর মজার ব্যাপার হলো, config ফাইলগুলো মান পড়ে .env থেকেই!
L11
voice: তাই একই কোড আপনার ল্যাপটপে এক ডেটাবেসে চলে, সার্ভারে আরেকটায়। বদলায় শুধু ডট-ই-এন-ভি।
caption: তাই একই কোড আপনার ল্যাপটপে এক ডেটাবেসে চলে, সার্ভারে আরেকটায়। বদলায় শুধু .env।
L12
voice: কোডের ভেতরে মান পড়বেন কনফিগ ফাংশন দিয়ে, যেমন কনফিগ, অ্যাপ ডট নেম।
caption: কোডের ভেতরে মান পড়বেন config() ফাংশন দিয়ে, যেমন config('app.name')।
L13
voice: এনভি ফাংশন লিখবেন শুধু কনফিগ ফাইলের ভেতরে। কারণ সার্ভারে কনফিগ ক্যাশ করা হলে, বাইরে এটা আর মান পায় না।
caption: env() ফাংশন লিখবেন শুধু config ফাইলের ভেতরে। কারণ সার্ভারে config cache করা হলে, বাইরে এটা আর মান পায় না।

```json
[
    { "type": "label", "at": "L9", "until": "L10", "text": "config ফোল্ডার" },
    { "type": "note", "at": "L9", "until": "L10", "text": "📂 config/", "x": 20, "y": 24, "w": 60, "mono": true },
    { "type": "box", "at": "L9.2", "until": "L10", "text": "🛢️ database.php", "x": 6, "y": 38, "w": 26 },
    { "type": "box", "at": "L9.2", "until": "L10", "text": "✉️ mail.php", "x": 37, "y": 38, "w": 26 },
    { "type": "box", "at": "L9.2", "until": "L10", "text": "🎫 session.php", "x": 68, "y": 38, "w": 26 },

    { "type": "label", "at": "L10", "until": "L11", "text": "config পড়ে .env থেকে!", "tone": "accent" },
    { "type": "note", "at": "L10", "until": "L11", "text": "'database' => env('DB_DATABASE', 'laravel'),", "x": 10, "y": 28, "w": 80, "mono": true },
    { "type": "line", "at": "L10", "until": "L11", "x": 32, "y": 51, "w": 7 },
    { "type": "line", "at": "L10", "until": "L11", "x": 61, "y": 51, "w": 7 },
    { "type": "box", "at": "L10", "until": "L11", "text": "🔐 .env", "x": 10, "y": 46, "w": 22, "tone": "accent" },
    { "type": "box", "at": "L10", "until": "L11", "text": "📂 config", "x": 39, "y": 46, "w": 22 },
    { "type": "box", "at": "L10", "until": "L11", "text": "⚙️ অ্যাপ", "x": 68, "y": 46, "w": 22 },

    { "type": "label", "at": "L11", "until": "L12", "text": "একই কোড, আলাদা .env" },
    { "type": "box", "at": "L11", "until": "L12", "icon": "💻", "text": "ল্যাপটপ: DB_DATABASE=blog_local", "x": 6, "y": 30, "w": 42 },
    { "type": "box", "at": "L11", "until": "L12", "icon": "🖥️", "text": "সার্ভার: DB_DATABASE=blog_live", "x": 52, "y": 30, "w": 42 },
    { "type": "text", "at": "L11.2", "until": "L12", "text": "বদলায় শুধু .env ✓", "x": 25, "y": 56, "w": 50, "tone": "ok" },

    { "type": "label", "at": "L12", "until": "L13", "text": "কোডে: config()", "tone": "ok" },
    { "type": "note", "at": "L12", "until": "L13", "text": "config('app.name')   👉   'Laravel'", "x": 15, "y": 34, "w": 70, "mono": true, "tone": "ok" },

    { "type": "label", "at": "L13", "until": "L14", "text": "env() শুধু config ফাইলে" },
    { "type": "note", "at": "L13", "until": "L14", "text": "✓ config/app.php:  env('APP_NAME')", "x": 15, "y": 26, "w": 70, "mono": true, "tone": "ok" },
    { "type": "note", "at": "L13", "until": "L14", "text": "✗ controller-এ:  env('APP_NAME')", "x": 15, "y": 35, "w": 70, "mono": true, "tone": "danger" },
    { "type": "note", "at": "L13.2", "until": "L14", "text": "$ php artisan config:cache", "x": 25, "y": 48, "w": 50, "mono": true },
    { "type": "text", "at": "L13.2", "until": "L14", "text": "তারপর বাইরে env() আর মান পায় না", "x": 15, "y": 60, "w": 70, "tone": "danger" }
]
```

## অংশ ৪: APP_DEBUG

L14
voice: [serious] তবে একটা কথা মনে রাখবেন। ডট-ই-এন-ভি-তে আছে অ্যাপ ডিবাগ নামের একটা সেটিং।
caption: তবে একটা কথা মনে রাখবেন। .env-এ আছে APP_DEBUG নামের একটা সেটিং।
L15
voice: এটা চালু থাকলে, কোনো ভুলে পুরো খুঁটিনাটি পর্দায় আসে, কখনো গোপন তথ্যসহ। লাইভ সার্ভারে এটা সবসময় ফলস রাখুন।
caption: এটা চালু থাকলে, কোনো ভুলে পুরো খুঁটিনাটি পর্দায় আসে, কখনো গোপন তথ্যসহ। লাইভ সার্ভারে এটা সবসময় false রাখুন।
L16
voice: এখনই নিজের ডট-ই-এন-ভি খুলে দেখুন, ডেটাবেসের সেটিং কোন লাইনগুলোতে।
caption: এখনই নিজের .env খুলে দেখুন, ডেটাবেসের সেটিং কোন লাইনগুলোতে।

```json
[
    { "type": "label", "at": "L14", "until": "L16", "text": "সাবধান", "tone": "danger" },
    { "type": "note", "at": "L14.2", "until": "L16", "text": "APP_DEBUG=true", "x": 30, "y": 28, "w": 40, "mono": true, "tone": "accent" },
    { "type": "note", "at": "L15", "until": "L16", "text": "💥 ভুল হলে পুরো খুঁটিনাটি পর্দায়, কখনো গোপন তথ্যসহ", "x": 15, "y": 42, "w": 70, "tone": "danger" },
    { "type": "note", "at": "L15.2", "until": "L16", "text": "লাইভ সার্ভারে:  APP_DEBUG=false", "x": 25, "y": 54, "w": 50, "mono": true, "tone": "ok" },
    { "type": "label", "at": "L16", "until": "end", "text": "নিজে দেখুন 👀", "tone": "accent" },
    { "type": "note", "at": "L16", "until": "end", "text": "📂 .env", "x": 20, "y": 20, "w": 60 },
    { "type": "note", "at": "L16", "until": "end", "text": "DB_CONNECTION=mysql", "x": 20, "y": 30, "w": 60, "mono": true, "tone": "accent" },
    { "type": "note", "at": "L16", "until": "end", "text": "DB_HOST=127.0.0.1", "x": 20, "y": 39, "w": 60, "mono": true, "tone": "accent" },
    { "type": "note", "at": "L16", "until": "end", "text": "DB_DATABASE=laravel", "x": 20, "y": 48, "w": 60, "mono": true, "tone": "accent" },
    { "type": "note", "at": "L16", "until": "end", "text": "DB_USERNAME=root", "x": 20, "y": 57, "w": 60, "mono": true, "tone": "accent" }
]
```
