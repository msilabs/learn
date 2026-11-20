---
course: laravel
slug: routing
title: Route কীভাবে কাজ করে
description: /posts খুললে Laravel কীভাবে জানে কোন কোড চালাতে হবে? routes/web.php, GET আর POST, {id} দিয়ে ফাঁকা ঘর, route-এর নাম আর 404, দেড় মিনিটে।
order: 2
date: 2026-11-20
og_icon: 🧭
og_text: Route
status: synced
---

## মালিকের জন্য নোট

- voice মালিকের নিজের লেখা চূড়ান্ত script থেকে হুবহু নেওয়া। ১৬টা অনুচ্ছেদ, ২৫টা বাক্য।
- কোড পর্দায় দেখানো হয়েছে লাইন প্রতি একটা mono note দিয়ে।
- [যাচাই] উদাহরণের "post" আর HTTP-র `POST` শুনতে এক। caption-এ `POST` বড় হাতের অক্ষরে আলাদা দেখায়।

## অংশ ১: রিসেপশনের তালিকা

L1
voice: [curious] লারাভেল কীভাবে জানে, স্ল্যাশ পোস্টস খুললে কোন কোডটা চালাতে হবে?
caption: Laravel কীভাবে জানে, /posts খুললে কোন কোডটা চালাতে হবে?
L2
voice: উত্তর থাকে রাউটস ফোল্ডারের ওয়েব ডট পি-এইচ-পি ফাইলে। এটাই অফিসের রিসেপশন।
caption: উত্তর থাকে routes ফোল্ডারের web.php ফাইলে। এটাই অফিসের রিসেপশন।
L3
voice: এখানে প্রতিটা লাইন একটা নিয়ম, এই ঠিকানায় এলে এই কাজটা করো।
caption: এখানে প্রতিটা লাইন একটা নিয়ম, এই ঠিকানায় এলে এই কাজটা করো।
L4
voice: যেমন রাউট গেট, স্ল্যাশ পোস্টস, তারপর একটা ফাংশন, যেটা পোস্টের তালিকা ফেরত দেয়।
caption: যেমন Route::get, /posts, তারপর একটা ফাংশন, যেটা পোস্টের তালিকা ফেরত দেয়।
L5
voice: খেয়াল করুন, এখানে শুধু ঠিকানা নয়, রিকোয়েস্টের ধরনও লেখা আছে, গেট।
caption: খেয়াল করুন, এখানে শুধু ঠিকানা নয়, রিকোয়েস্টের ধরনও লেখা আছে, GET।
L6
voice: কারণ একই ঠিকানায় দুই রকম রিকোয়েস্ট আসতে পারে। তালিকা দেখতে চাইলে গেট, আর ফর্ম জমা দিলে পোস্ট।
caption: কারণ একই ঠিকানায় দুই রকম রিকোয়েস্ট আসতে পারে। তালিকা দেখতে চাইলে GET, আর ফর্ম জমা দিলে POST।
L7
voice: রিসেপশন দুটোকে দুই আলাদা কাজের দিকে পাঠাতে পারে।
caption: রিসেপশন দুটোকে দুই আলাদা কাজের দিকে পাঠাতে পারে।

```json
[
    { "type": "bar", "at": "L1", "until": "L2", "text": "example.com/posts/", "y": 19 },
    { "type": "text", "at": "L1", "until": "L2", "text": "কোন কোডটা চলবে? 🤔", "x": 30, "y": 42, "w": 40, "tone": "accent" },
    { "type": "note", "at": "L2", "until": "L8", "text": "📂 routes/web.php", "x": 15, "y": 22, "w": 70 },

    { "type": "box", "at": "L2.2", "until": "L3", "text": "🚪 ফটক", "x": 1.5, "y": 44, "w": 14.5 },
    { "type": "line", "at": "L2.2", "until": "L3", "x": 16, "y": 49, "w": 2 },
    { "type": "box", "at": "L2.2", "until": "L3", "text": "🛎️ রিসেপশন", "x": 18, "y": 44, "w": 14.5, "tone": "accent" },
    { "type": "line", "at": "L2.2", "until": "L3", "x": 32.5, "y": 49, "w": 2 },
    { "type": "box", "at": "L2.2", "until": "L3", "text": "💂 রক্ষী", "x": 34.5, "y": 44, "w": 14.5 },
    { "type": "line", "at": "L2.2", "until": "L3", "x": 49, "y": 49, "w": 2 },
    { "type": "box", "at": "L2.2", "until": "L3", "text": "👔 কর্মকর্তা", "x": 51, "y": 44, "w": 14.5 },
    { "type": "line", "at": "L2.2", "until": "L3", "x": 65.5, "y": 49, "w": 2 },
    { "type": "box", "at": "L2.2", "until": "L3", "text": "🗄️ রেকর্ড রুম", "x": 67.5, "y": 44, "w": 14.5 },
    { "type": "line", "at": "L2.2", "until": "L3", "x": 82, "y": 49, "w": 2 },
    { "type": "box", "at": "L2.2", "until": "L3", "text": "📄 চিঠি", "x": 84, "y": 44, "w": 14.5 },
    { "type": "text", "at": "L2.2", "until": "L3", "text": "route", "x": 18, "y": 56, "w": 14.5, "tone": "accent" },

    { "type": "label", "at": "L3", "until": "L4", "text": "প্রতিটা লাইন একটা নিয়ম" },
    { "type": "note", "at": "L3", "until": "L4", "text": "এই ঠিকানায় এলে 👉 এই কাজটা করো", "x": 20, "y": 40, "w": 60, "tone": "accent" },

    { "type": "note", "at": "L4", "until": "L6", "text": "Route::get('/posts', function () {", "x": 15, "y": 36, "w": 70, "mono": true },
    { "type": "note", "at": "L4", "until": "L6", "text": "    return 'পোস্টের তালিকা';", "x": 15, "y": 45, "w": 70, "mono": true },
    { "type": "note", "at": "L4", "until": "L6", "text": "});", "x": 15, "y": 54, "w": 70, "mono": true },
    { "type": "label", "at": "L5", "until": "L6", "text": "রিকোয়েস্টের ধরন: GET", "tone": "accent" },
    { "type": "text", "at": "L5", "until": "L6", "text": "👆 get মানে GET রিকোয়েস্ট", "x": 15, "y": 64, "w": 40, "tone": "accent", "align": "left" },

    { "type": "label", "at": "L6", "until": "L7", "text": "একই ঠিকানা, দুই ধরন" },
    { "type": "note", "at": "L6", "until": "L8", "text": "Route::get('/posts', ...);", "x": 6, "y": 38, "w": 50, "mono": true },
    { "type": "note", "at": "L6.2", "until": "L8", "text": "Route::post('/posts', ...);", "x": 6, "y": 48, "w": 50, "mono": true },
    { "type": "label", "at": "L7", "until": "L8", "text": "দুই আলাদা কাজ", "tone": "accent" },
    { "type": "text", "at": "L7", "until": "L8", "text": "👉 📋 তালিকা দেখানো", "x": 60, "y": 39.5, "w": 36, "tone": "ok", "align": "left" },
    { "type": "text", "at": "L7", "until": "L8", "text": "👉 💾 নতুন পোস্ট জমা", "x": 60, "y": 49.5, "w": 36, "tone": "ok", "align": "left" }
]
```

## অংশ ২: ফাঁকা ঘর

L8
voice: কিন্তু হাজারটা পোস্টের জন্য কি হাজারটা রাউট লিখতে হবে?
caption: কিন্তু হাজারটা পোস্টের জন্য কি হাজারটা route লিখতে হবে?
L9
voice: [excited] না! ঠিকানায় একটা ফাঁকা ঘর রাখলেই হয়, যেমন স্ল্যাশ পোস্টস স্ল্যাশ আইডি।
caption: না! ঠিকানায় একটা ফাঁকা ঘর রাখলেই হয়, যেমন /posts/{id}।
L10
voice: স্ল্যাশ পোস্টস স্ল্যাশ পাঁচ খুললে, ওই ঘরে বসে পাঁচ, আর ফাংশনটা হাতে পায় সেই সংখ্যা।
caption: /posts/5 খুললে, ওই ঘরে বসে 5, আর ফাংশনটা হাতে পায় সেই সংখ্যা।
L11
voice: রিসেপশন ঠিক এভাবেই কাজ করে। পাঁচ নম্বর ফাইল চাই শুনে, নম্বরটা লিখে কর্মকর্তার কাছে পাঠায়।
caption: রিসেপশন ঠিক এভাবেই কাজ করে। 5 নম্বর ফাইল চাই শুনে, নম্বরটা লিখে কর্মকর্তার কাছে পাঠায়।

```json
[
    { "type": "label", "at": "L8", "until": "L9", "text": "হাজারটা পোস্ট?" },
    { "type": "note", "at": "L8", "until": "L9", "text": "Route::get('/posts/1', ...);", "x": 25, "y": 26, "w": 50, "mono": true },
    { "type": "note", "at": "L8", "until": "L9", "text": "Route::get('/posts/2', ...);", "x": 25, "y": 35, "w": 50, "mono": true },
    { "type": "note", "at": "L8", "until": "L9", "text": "Route::get('/posts/3', ...);", "x": 25, "y": 44, "w": 50, "mono": true },
    { "type": "text", "at": "L8", "until": "L9", "text": "… হাজার বার? 😩", "x": 25, "y": 56, "w": 50, "tone": "danger" },

    { "type": "label", "at": "L9", "until": "L11", "text": "ফাঁকা ঘর: {id}", "tone": "ok" },
    { "type": "note", "at": "L9.2", "until": "L11", "text": "Route::get('/posts/{id}', function ($id) {", "x": 15, "y": 36, "w": 70, "mono": true, "tone": "ok" },
    { "type": "bar", "at": "L10", "until": "L11", "text": "example.com/posts/5", "y": 19 },
    { "type": "note", "at": "L10", "until": "L11", "text": "{id} ঘরে বসল 5  👉  $id = 5", "x": 25, "y": 50, "w": 50, "tone": "accent", "mono": true },

    { "type": "label", "at": "L11", "until": "L12", "text": "রিসেপশনের মতো", "tone": "accent" },
    { "type": "line", "at": "L11", "until": "L12", "x": 30, "y": 49.5, "w": 40 },
    { "type": "box", "at": "L11", "until": "L12", "icon": "🛎️", "text": "রিসেপশন", "x": 10, "y": 40, "w": 20, "tone": "accent" },
    { "type": "box", "at": "L11", "until": "L12", "icon": "👔", "text": "কর্মকর্তা", "x": 70, "y": 40, "w": 20 },
    { "type": "text", "at": "L11", "until": "L12", "text": "“5 নম্বর ফাইল চাই”", "x": 6, "y": 30, "w": 28 },
    { "type": "packet", "at": "L11.2", "until": "L12", "text": "📝 ফাইল নং 5", "from": 31, "to": 49, "y": 40.5, "w": 20, "tone": "ok" }
]
```

## অংশ ৩: নাম আর 404

L12
voice: প্রতিটা রাউটকে একটা নামও দেওয়া যায়। তাহলে ঠিকানা বদলালেও পুরো সাইটের লিংক ঠিক থাকে।
caption: প্রতিটা route-কে একটা নামও দেওয়া যায়। তাহলে ঠিকানা বদলালেও পুরো সাইটের লিংক ঠিক থাকে।
L13
voice: আর তালিকায় যে ঠিকানা নেই? রিসেপশন সোজা বলে দেয়, চারশো চার, এমন কিছু নেই।
caption: আর তালিকায় যে ঠিকানা নেই? রিসেপশন সোজা বলে দেয়, 404, এমন কিছু নেই।

```json
[
    { "type": "label", "at": "L12", "until": "L13", "text": "route-এর নাম 🏷️" },
    { "type": "note", "at": "L12", "until": "L13", "text": "Route::get('/posts/{id}', ...)->name('posts.show');", "x": 12, "y": 30, "w": 76, "mono": true },
    { "type": "note", "at": "L12.2", "until": "L13", "text": "route('posts.show', 5)  →  /posts/5", "x": 12, "y": 44, "w": 76, "mono": true, "tone": "ok" },
    { "type": "text", "at": "L12.2", "until": "L13", "text": "ঠিকানা বদলালেও লিংক ঠিক থাকে ✓", "x": 20, "y": 56, "w": 60, "tone": "ok" },
    { "type": "label", "at": "L13", "until": "L14", "text": "তালিকায় নেই?" },
    { "type": "bar", "at": "L13", "until": "L14", "text": "example.com/hello/", "y": 22 },
    { "type": "note", "at": "L13.2", "until": "L14", "title": "🛎️ 404", "text": "এমন কিছু নেই", "x": 35, "y": 44, "w": 30, "tone": "danger" }
]
```

## অংশ ৪: ভারী কাজ নয়

L14
voice: [serious] তবে একটা কথা মনে রাখবেন। রাউট শুধু পথ দেখায়, ভারী কাজের জায়গা এটা নয়।
caption: তবে একটা কথা মনে রাখবেন। route শুধু পথ দেখায়, ভারী কাজের জায়গা এটা নয়।
L15
voice: সব কাজ রাউটের ফাইলে লিখলে, ফাইলটা দ্রুত জট পাকিয়ে যায়। সেই কাজের জায়গা হলো কন্ট্রোলার।
caption: সব কাজ route-এর ফাইলে লিখলে, ফাইলটা দ্রুত জট পাকিয়ে যায়। সেই কাজের জায়গা হলো controller।
L16
voice: এখনই চালিয়ে দেখুন, পি-এইচ-পি আর্টিসান রাউট কোলন লিস্ট। আপনার অ্যাপের পুরো রিসেপশন খাতা এক নজরে।
caption: এখনই চালিয়ে দেখুন, php artisan route:list। আপনার অ্যাপের পুরো রিসেপশন খাতা এক নজরে।

```json
[
    { "type": "label", "at": "L14", "until": "L16", "text": "সাবধান", "tone": "danger" },
    { "type": "box", "at": "L14.2", "until": "L15", "icon": "🛎️", "text": "route শুধু পথ দেখায় 👉", "x": 30, "y": 32, "w": 40, "tone": "accent" },
    { "type": "note", "at": "L15", "until": "L16", "text": "📂 web.php-তে সব কাজ? 🧶 জট পাকিয়ে যায়", "x": 20, "y": 30, "w": 60, "tone": "danger" },
    { "type": "note", "at": "L15.2", "until": "L16", "text": "👔 ভারী কাজের জায়গা: controller", "x": 20, "y": 44, "w": 60, "tone": "ok" },
    { "type": "label", "at": "L16", "until": "end", "text": "নিজে দেখুন 👀", "tone": "accent" },
    { "type": "note", "at": "L16", "until": "end", "text": "$ php artisan route:list", "x": 15, "y": 24, "w": 70, "mono": true },
    { "type": "note", "at": "L16.2", "until": "end", "text": "GET|HEAD · posts", "x": 15, "y": 38, "w": 70, "mono": true, "tone": "ok" },
    { "type": "note", "at": "L16.2", "until": "end", "text": "POST · posts", "x": 15, "y": 47, "w": 70, "mono": true, "tone": "ok" },
    { "type": "note", "at": "L16.2", "until": "end", "text": "GET|HEAD · posts/{id} · posts.show", "x": 15, "y": 56, "w": 70, "mono": true, "tone": "ok" }
]
```
