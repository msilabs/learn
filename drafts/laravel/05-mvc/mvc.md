---
course: laravel
slug: mvc
title: MVC: কে কোন কাজ করে
description: এক ফাইলে query, হিসাব আর HTML লিখলে সমস্যা কোথায়? Model, View আর Controller-এর তিন ঘরের ভাগাভাগি, আর view-এ কেন query নয়, দেড় মিনিটে।
order: 5
date: 2026-11-20
og_icon: 🧩
og_text: MVC
status: synced
---

## মালিকের জন্য নোট

- voice মালিকের নিজের লেখা চূড়ান্ত script থেকে হুবহু নেওয়া। ১৭টা অনুচ্ছেদ, ২৮টা বাক্য।
- পর্দায় তিন ঘর বাঁ থেকে ডানে: 🗄️ Model, 👔 Controller, 📄 View। কাজ চলাচল দেখানো হয়েছে ঘরগুলোর উপর দিয়ে packet দিয়ে।

## অংশ ১: এক ফাইলের সমস্যা

L1
voice: [curious] এক ফাইলেই ডেটাবেসের কোয়েরি, হিসাব আর এইচ-টি-এম-এল লিখলে সমস্যা কোথায়?
caption: এক ফাইলেই ডেটাবেসের কোয়েরি, হিসাব আর HTML লিখলে সমস্যা কোথায়?
L2
voice: ছোট পেজে কিছু না। কিন্তু ডিজাইন বদলাতে গেলে কোয়েরি ভাঙে, আর কোয়েরি বদলাতে গেলে ডিজাইন।
caption: ছোট পেজে কিছু না। কিন্তু ডিজাইন বদলাতে গেলে কোয়েরি ভাঙে, আর কোয়েরি বদলাতে গেলে ডিজাইন।
L3
voice: এম-ভি-সি এই কাজগুলোকে তিনটা আলাদা ঘরে রাখে। মডেল, ভিউ আর কন্ট্রোলার।
caption: MVC এই কাজগুলোকে তিনটা আলাদা ঘরে রাখে। Model, View আর Controller।
L4
voice: অফিসের ভাষায়, ভিউ হলো চিঠির নকশা, আর কন্ট্রোলার হলো কর্মকর্তা।
caption: অফিসের ভাষায়, view হলো চিঠির নকশা, আর controller হলো কর্মকর্তা।
L5
voice: আর মডেল হলো রেকর্ড রুম। ডেটা কোথায় আছে, কীভাবে আনতে হয়, সব সে জানে।
caption: আর model হলো রেকর্ড রুম। ডেটা কোথায় আছে, কীভাবে আনতে হয়, সব সে জানে।

```json
[
    { "type": "note", "at": "L1", "until": "L3", "text": "📂 posts.php", "x": 15, "y": 22, "w": 70 },
    { "type": "note", "at": "L1", "until": "L3", "text": "$rows = $db->query('SELECT * FROM posts');", "x": 15, "y": 31, "w": 70, "mono": true },
    { "type": "note", "at": "L1", "until": "L3", "text": "$total = count($rows);", "x": 15, "y": 40, "w": 70, "mono": true },
    { "type": "note", "at": "L1", "until": "L3", "text": "echo '<h1>' . $total . ' পোস্ট</h1>';", "x": 15, "y": 49, "w": 70, "mono": true },
    { "type": "text", "at": "L2", "until": "L2.2", "text": "ছোট পেজে কিছু না 👍", "x": 15, "y": 62, "w": 70, "tone": "ok" },
    { "type": "text", "at": "L2.2", "until": "L3", "text": "🎨 ডিজাইন বদলালে কোয়েরি ভাঙে 💥 কোয়েরি বদলালে ডিজাইন", "x": 10, "y": 62, "w": 80, "tone": "danger" },

    { "type": "label", "at": "L3", "until": "L6", "text": "MVC: তিনটা আলাদা ঘর", "tone": "accent" },
    { "type": "line", "at": "L3.2", "until": "L6", "x": 28, "y": 49.5, "w": 11 },
    { "type": "line", "at": "L3.2", "until": "L6", "x": 61, "y": 49.5, "w": 11 },
    { "type": "box", "at": "L3.2", "until": "L6", "icon": "🗄️", "text": "Model", "x": 6, "y": 40, "w": 22 },
    { "type": "box", "at": "L3.2", "until": "L6", "icon": "👔", "text": "Controller", "x": 39, "y": 40, "w": 22 },
    { "type": "box", "at": "L3.2", "until": "L6", "icon": "📄", "text": "View", "x": 72, "y": 40, "w": 22 },
    { "type": "text", "at": "L4", "until": "L6", "text": "চিঠির নকশা", "x": 70, "y": 61, "w": 26, "tone": "accent" },
    { "type": "text", "at": "L4", "until": "L6", "text": "কর্মকর্তা", "x": 37, "y": 61, "w": 26, "tone": "accent" },
    { "type": "text", "at": "L5", "until": "L6", "text": "রেকর্ড রুম", "x": 4, "y": 61, "w": 26, "tone": "accent" },
    { "type": "note", "at": "L5.2", "until": "L6", "text": "ডেটা কোথায়, কীভাবে আনতে হয়, সব জানে", "x": 2, "y": 67, "w": 36 }
]
```

## অংশ ২: Laravel-এ model

L6
voice: লারাভেলে মডেল থাকে অ্যাপ স্ল্যাশ মডেলস ফোল্ডারে। প্রতিটা মডেল সাধারণত ডেটাবেসের একটা টেবিলের প্রতিনিধি।
caption: Laravel-এ model থাকে app/Models ফোল্ডারে। প্রতিটা model সাধারণত ডেটাবেসের একটা টেবিলের প্রতিনিধি।

```json
[
    { "type": "label", "at": "L6", "until": "L7", "text": "Laravel-এ model" },
    { "type": "note", "at": "L6", "until": "L7", "text": "📂 app/Models/Post.php", "x": 15, "y": 26, "w": 70, "mono": true },
    { "type": "line", "at": "L6.2", "until": "L7", "x": 42, "y": 51.5, "w": 16 },
    { "type": "box", "at": "L6.2", "until": "L7", "icon": "🗄️", "text": "Post model", "x": 12, "y": 42, "w": 30, "tone": "accent" },
    { "type": "box", "at": "L6.2", "until": "L7", "icon": "🛢️", "text": "posts টেবিল", "x": 58, "y": 42, "w": 30 },
    { "type": "text", "at": "L6.2", "until": "L7", "text": "প্রতিনিধি", "x": 40, "y": 45, "w": 20, "tone": "accent" }
]
```

## অংশ ৩: একটা রিকোয়েস্টের পথ

L7
voice: এবার একটা রিকোয়েস্ট ধরে দেখি। কেউ পোস্টের তালিকা চাইলেন।
caption: এবার একটা রিকোয়েস্ট ধরে দেখি। কেউ পোস্টের তালিকা চাইলেন।
L8
voice: কর্মকর্তা রেকর্ড রুমকে বলেন, সব পোস্ট দাও। রেকর্ড রুম ডেটাবেস ঘেঁটে তালিকা এনে দেয়।
caption: কর্মকর্তা রেকর্ড রুমকে বলেন, সব পোস্ট দাও। রেকর্ড রুম ডেটাবেস ঘেঁটে তালিকা এনে দেয়।
L9
voice: তারপর কর্মকর্তা তালিকাটা দেন ভিউকে, আর ভিউ সেটা সাজিয়ে পেজ বানায়।
caption: তারপর কর্মকর্তা তালিকাটা দেন view-কে, আর view সেটা সাজিয়ে পেজ বানায়।
L10
voice: [excited] খেয়াল করুন, কেউ কারও কাজে নাক গলায় না!
caption: খেয়াল করুন, কেউ কারও কাজে নাক গলায় না!
L11
voice: ভিউ জানে না ডেটা কোথা থেকে এলো। মডেল জানে না পেজটা দেখতে কেমন।
caption: view জানে না ডেটা কোথা থেকে এলো। model জানে না পেজটা দেখতে কেমন।
L12
voice: তাই নিশ্চিন্তে ডিজাইন বদলানো যায়, ডেটাবেসের কোডে হাত না দিয়েই।
caption: তাই নিশ্চিন্তে ডিজাইন বদলানো যায়, ডেটাবেসের কোডে হাত না দিয়েই।

```json
[
    { "type": "label", "at": "L7", "until": "L8", "text": "একটা রিকোয়েস্ট ধরে দেখি" },
    { "type": "line", "at": "L7", "until": "L13", "x": 28, "y": 49.5, "w": 11 },
    { "type": "line", "at": "L7", "until": "L13", "x": 61, "y": 49.5, "w": 11 },
    { "type": "box", "at": "L7", "until": "L13", "icon": "🗄️", "text": "Model", "x": 6, "y": 40, "w": 22 },
    { "type": "box", "at": "L7", "until": "L13", "icon": "👔", "text": "Controller", "x": 39, "y": 40, "w": 22 },
    { "type": "box", "at": "L7", "until": "L13", "icon": "📄", "text": "View", "x": 72, "y": 40, "w": 22 },
    { "type": "text", "at": "L7.2", "until": "L8", "text": "🙋 পোস্টের তালিকা চাই", "x": 30, "y": 30, "w": 40, "tone": "accent" },

    { "type": "label", "at": "L8", "until": "L9", "text": "Controller 👉 Model" },
    { "type": "packet", "at": "L8", "until": "L8.2", "text": "সব পোস্ট দাও", "from": 39, "to": 12, "y": 30, "w": 20 },
    { "type": "packet", "at": "L8.2", "until": "L9", "text": "📋 তালিকা", "from": 10, "to": 40, "y": 30, "w": 20, "tone": "ok" },
    { "type": "text", "at": "L8.2", "until": "L9", "text": "🛢️ ডেটাবেস ঘেঁটে", "x": 4, "y": 61, "w": 26, "tone": "accent" },
    { "type": "note", "at": "L8", "until": "L9", "text": "$posts = Post::all();", "x": 30, "y": 67, "w": 40, "mono": true },

    { "type": "label", "at": "L9", "until": "L10", "text": "Controller 👉 View" },
    { "type": "packet", "at": "L9", "until": "L10", "text": "📋 তালিকা", "from": 50, "to": 73, "y": 30, "w": 20, "tone": "ok" },
    { "type": "text", "at": "L9", "until": "L10", "text": "সাজিয়ে পেজ 📄", "x": 70, "y": 61, "w": 26, "tone": "ok" },
    { "type": "note", "at": "L9", "until": "L10", "text": "return view('posts', compact('posts'));", "x": 20, "y": 67, "w": 60, "mono": true },

    { "type": "label", "at": "L10", "until": "L11", "text": "কেউ কারও কাজে নাক গলায় না!", "tone": "ok" },
    { "type": "text", "at": "L11", "until": "L12", "text": "ডেটা কোথা থেকে? জানি না 🤷", "x": 66, "y": 61, "w": 32 },
    { "type": "text", "at": "L11.2", "until": "L12", "text": "পেজ কেমন? জানি না 🤷", "x": 2, "y": 61, "w": 30 },
    { "type": "box", "at": "L12", "until": "L13", "icon": "🎨", "text": "নতুন ডিজাইন", "x": 72, "y": 40, "w": 22, "tone": "ok" },
    { "type": "text", "at": "L12", "until": "L13", "text": "✓ হাত দিতে হয়নি", "x": 2, "y": 61, "w": 30, "tone": "ok" }
]
```

## অংশ ৪: পুরোনো ধারণা

L13
voice: কিন্তু এই ভাগাভাগি কি শুধু লারাভেলের নিয়ম?
caption: কিন্তু এই ভাগাভাগি কি শুধু Laravel-এর নিয়ম?
L14
voice: না, এম-ভি-সি অনেক পুরোনো ধারণা। রুবি অন রেইলসের মতো আরও অনেক ফ্রেমওয়ার্কেও এটা আছে।
caption: না, MVC অনেক পুরোনো ধারণা। Ruby on Rails-এর মতো আরও অনেক ফ্রেমওয়ার্কেও এটা আছে।

```json
[
    { "type": "label", "at": "L13", "until": "L14", "text": "শুধু Laravel-এর নিয়ম?" },
    { "type": "text", "at": "L13", "until": "L14", "text": "🤔", "x": 40, "y": 40, "w": 20 },
    { "type": "label", "at": "L14", "until": "L15", "text": "MVC: পুরোনো ধারণা 📜", "tone": "accent" },
    { "type": "box", "at": "L14.2", "until": "L15", "icon": "🧱", "text": "Laravel", "x": 10, "y": 36, "w": 24 },
    { "type": "box", "at": "L14.2", "until": "L15", "icon": "💎", "text": "Ruby on Rails", "x": 38, "y": 36, "w": 24 },
    { "type": "box", "at": "L14.2", "until": "L15", "icon": "➕", "text": "আরও অনেক", "x": 66, "y": 36, "w": 24 }
]
```

## অংশ ৫: view-এ query নয়

L15
voice: [serious] তবে একটা কথা মনে রাখবেন। ভিউয়ের ভেতর থেকে সরাসরি ডেটাবেসে কোয়েরি করবেন না।
caption: তবে একটা কথা মনে রাখবেন। view-এর ভেতর থেকে সরাসরি ডেটাবেসে কোয়েরি করবেন না।
L16
voice: চলবে ঠিকই, কিন্তু ভাগাভাগিটাই ভেঙে যায়। ডেটা আনুন কন্ট্রোলারে, ভিউ শুধু দেখাবে।
caption: চলবে ঠিকই, কিন্তু ভাগাভাগিটাই ভেঙে যায়। ডেটা আনুন controller-এ, view শুধু দেখাবে।
L17
voice: এখনই অ্যাপের মডেলস ফোল্ডারে ইউজার ডট পি-এইচ-পি খুলে দেখুন। প্রথম মডেলটা লারাভেল নিজেই বানিয়ে রাখে।
caption: এখনই app-এর Models ফোল্ডারে User.php খুলে দেখুন। প্রথম model-টা Laravel নিজেই বানিয়ে রাখে।

```json
[
    { "type": "label", "at": "L15", "until": "L17", "text": "সাবধান", "tone": "danger" },
    { "type": "note", "at": "L15.2", "until": "L16.2", "title": "📄 view-এর ভেতরে:", "text": "@foreach (DB::table('posts')->get() as $post)", "x": 12, "y": 28, "w": 76, "mono": true, "tone": "danger" },
    { "type": "text", "at": "L16", "until": "L16.2", "text": "চলবে, কিন্তু ভাগাভাগি ভেঙে যায় 💔", "x": 15, "y": 46, "w": 70, "tone": "danger" },
    { "type": "note", "at": "L16.2", "until": "L17", "text": "👔 controller:  $posts = Post::all();", "x": 12, "y": 30, "w": 76, "mono": true, "tone": "ok" },
    { "type": "note", "at": "L16.2", "until": "L17", "text": "📄 view:  @foreach ($posts as $post)", "x": 12, "y": 40, "w": 76, "mono": true, "tone": "ok" },
    { "type": "label", "at": "L17", "until": "end", "text": "নিজে দেখুন 👀", "tone": "accent" },
    { "type": "note", "at": "L17", "until": "end", "text": "📂 app/Models/User.php", "x": 15, "y": 28, "w": 70, "mono": true },
    { "type": "text", "at": "L17.2", "until": "end", "text": "Laravel নিজেই বানিয়ে রাখে ✓", "x": 15, "y": 42, "w": 70, "tone": "ok" }
]
```
