---
course: laravel
slug: request-lifecycle
title: Laravel-এ একটা রিকোয়েস্টের যাত্রা
description: Laravel-এ /about খুললে কোন ফাইল চলে? মূল ফটক, route, middleware, controller, model আর view পেরিয়ে একটা রিকোয়েস্টের পুরো পথ, দেড় মিনিটে।
order: 1
date: 2026-11-20
og_icon: 🏢
og_text: Request
status: synced
---

## মালিকের জন্য নোট

- voice মালিকের নিজের লেখা চূড়ান্ত script থেকে হুবহু নেওয়া। ১৬টা অনুচ্ছেদ, ২৭টা বাক্য।
- caption-এ Laravel-এর নিজস্ব শব্দ ইংরেজিতে (route, middleware, controller, model, view), আর রিকোয়েস্ট, রেসপন্সের মতো ওয়েবের সাধারণ শব্দ বাংলা হরফে, web course-এর মতো।
- [যাচাই] কিছু middleware সব রিকোয়েস্টে route মেলানোর আগেই চলে। পাঠে শুধু "রিসেপশনের পরে পাহারাদার" দেখানো হয়েছে।
- [যাচাই] L16-এর পর্দায় `public/index.php`-এর লাইনগুলো Laravel 11 আর 12-এর। পুরোনো version-এ একটু আলাদা।

## অংশ ১: কোন ফাইল চলে

L1
voice: [curious] লারাভেলের কোনো সাইটে স্ল্যাশ অ্যাবাউট খুললে, আসলে কোন ফাইলটা চলে?
caption: Laravel-এর কোনো সাইটে /about খুললে, আসলে কোন ফাইলটা চলে?
L2
voice: সাধারণ পি-এইচ-পি-তে উত্তর সহজ, অ্যাবাউট ডট পি-এইচ-পি। কিন্তু লারাভেলে এমন কোনো ফাইলই নেই।
caption: সাধারণ PHP-তে উত্তর সহজ, about.php। কিন্তু Laravel-এ এমন কোনো ফাইলই নেই।
L3
voice: এখানে প্রতিটা রিকোয়েস্ট ঢোকে একটাই দরজা দিয়ে, পাবলিক ফোল্ডারের ইনডেক্স ডট পি-এইচ-পি।
caption: এখানে প্রতিটা রিকোয়েস্ট ঢোকে একটাই দরজা দিয়ে, public ফোল্ডারের index.php।

```json
[
    { "type": "bar", "at": "L1", "until": "L3", "text": "example.com/about/", "y": 19 },
    { "type": "text", "at": "L1", "until": "L2", "text": "কোন ফাইলটা চলে? 🤔", "x": 30, "y": 42, "w": 40, "tone": "accent" },
    { "type": "note", "at": "L2", "until": "L3", "title": "সাধারণ PHP", "text": "📄 about.php ✓", "x": 12, "y": 40, "w": 34, "tone": "ok" },
    { "type": "note", "at": "L2.2", "until": "L3", "title": "Laravel", "text": "📄 about.php? এমন ফাইলই নেই ✗", "x": 54, "y": 40, "w": 34, "tone": "danger" },
    { "type": "label", "at": "L3", "until": "L4", "text": "একটাই দরজা 🚪", "tone": "accent" },
    { "type": "packet", "at": "L3", "until": "L4", "text": "/about", "from": 6, "to": 22, "y": 30, "w": 16, "mono": true },
    { "type": "packet", "at": "L3", "until": "L4", "text": "/posts", "from": 6, "to": 22, "y": 42, "w": 16, "mono": true, "travel": 3 },
    { "type": "packet", "at": "L3", "until": "L4", "text": "/login", "from": 6, "to": 22, "y": 54, "w": 16, "mono": true, "travel": 3.4 },
    { "type": "box", "at": "L3", "until": "L4", "icon": "🚪", "text": "public/index.php", "x": 42, "y": 34, "w": 26, "tone": "accent" }
]
```

## অংশ ২: অফিস ভবনের পথ

L4
voice: ব্যাপারটা একটা অফিস ভবনের মতো। যে কাজেই আসুন, সবাইকে মূল ফটক দিয়েই ঢুকতে হয়।
caption: ব্যাপারটা একটা অফিস ভবনের মতো। যে কাজেই আসুন, সবাইকে মূল ফটক দিয়েই ঢুকতে হয়।
L5
voice: ফটক পেরিয়ে প্রথমে রিসেপশন। লারাভেলে এর নাম রাউট, আর এর কাছে আছে একটা তালিকা।
caption: ফটক পেরিয়ে প্রথমে রিসেপশন। Laravel-এ এর নাম route, আর এর কাছে আছে একটা তালিকা।
L6
voice: তালিকায় লেখা থাকে, কোন ঠিকানার জন্য কোন কর্মকর্তার কাছে যেতে হবে।
caption: তালিকায় লেখা থাকে, কোন ঠিকানার জন্য কোন কর্মকর্তার কাছে যেতে হবে।
L7
voice: কিন্তু কর্মকর্তার ঘরে যাওয়ার পথে কি কেউ আটকায়?
caption: কিন্তু কর্মকর্তার ঘরে যাওয়ার পথে কি কেউ আটকায়?
L8
voice: আটকায়, নিরাপত্তারক্ষী। লারাভেলে এদের বলে মিডলওয়্যার, যেমন একজন দেখেন আপনি লগইন করেছেন কি না।
caption: আটকায়, নিরাপত্তারক্ষী। Laravel-এ এদের বলে middleware, যেমন একজন দেখেন আপনি লগইন করেছেন কি না।
L9
voice: [excited] পাহারা পেরোলেই কর্মকর্তা, মানে কন্ট্রোলার! আসল কাজটা তিনিই করেন।
caption: পাহারা পেরোলেই কর্মকর্তা, মানে controller! আসল কাজটা তিনিই করেন।
L10
voice: দরকার হলে তিনি রেকর্ড রুম থেকে ফাইল আনান। এই রেকর্ড রুমের নাম মডেল, যে ডেটাবেসের সাথে কথা বলে।
caption: দরকার হলে তিনি রেকর্ড রুম থেকে ফাইল আনান। এই রেকর্ড রুমের নাম model, যে ডেটাবেসের সাথে কথা বলে।
L11
voice: তারপর উত্তরটা সুন্দর করে একটা চিঠিতে সাজান। এই চিঠির নকশাকে বলে ভিউ।
caption: তারপর উত্তরটা সুন্দর করে একটা চিঠিতে সাজান। এই চিঠির নকশাকে বলে view।
L12
voice: চিঠিটা আবার পাহারাদারদের পেরিয়ে, ফটক দিয়ে বেরিয়ে আপনার ব্রাউজারে পৌঁছায়। এটাই রেসপন্স।
caption: চিঠিটা আবার পাহারাদারদের পেরিয়ে, ফটক দিয়ে বেরিয়ে আপনার ব্রাউজারে পৌঁছায়। এটাই রেসপন্স।
L13
voice: আর পুরো যাত্রাটা শেষ হয় চোখের পলকে।
caption: আর পুরো যাত্রাটা শেষ হয় চোখের পলকে।

```json
[
    { "type": "label", "at": "L4", "until": "L5", "text": "অফিস ভবনের মতো 🏢", "tone": "accent" },
    { "type": "box", "at": "L4", "until": "L14", "icon": "🚪", "text": "ফটক", "x": 4, "y": 34, "w": 14 },
    { "type": "box", "at": "L4", "until": "L5", "icon": "🚪", "text": "ফটক", "x": 4, "y": 34, "w": 14, "tone": "accent" },
    { "type": "text", "at": "L4.2", "until": "L14", "text": "index.php", "x": 2, "y": 54.5, "w": 18, "tone": "accent" },

    { "type": "label", "at": "L5", "until": "L7", "text": "রিসেপশন = route" },
    { "type": "line", "at": "L5", "until": "L14", "x": 18, "y": 43.5, "w": 5 },
    { "type": "box", "at": "L5", "until": "L14", "icon": "🛎️", "text": "রিসেপশন", "x": 23, "y": 34, "w": 14 },
    { "type": "box", "at": "L5", "until": "L7", "icon": "🛎️", "text": "রিসেপশন", "x": 23, "y": 34, "w": 14, "tone": "accent" },
    { "type": "text", "at": "L5.2", "until": "L14", "text": "route", "x": 21, "y": 54.5, "w": 18, "tone": "accent" },
    { "type": "note", "at": "L5.2", "until": "L7", "title": "📋 route-এর তালিকা", "text": "/about → কোন কর্মকর্তা", "x": 14, "y": 62, "w": 34 },

    { "type": "text", "at": "L7", "until": "L8", "text": "কেউ আটকায়? 🤔", "x": 38, "y": 26, "w": 22, "tone": "accent" },
    { "type": "label", "at": "L8", "until": "L9", "text": "নিরাপত্তারক্ষী = middleware" },
    { "type": "line", "at": "L8", "until": "L14", "x": 37, "y": 43.5, "w": 5 },
    { "type": "box", "at": "L8", "until": "L14", "icon": "💂", "text": "নিরাপত্তারক্ষী", "x": 42, "y": 34, "w": 14 },
    { "type": "box", "at": "L8", "until": "L9", "icon": "💂", "text": "নিরাপত্তারক্ষী", "x": 42, "y": 34, "w": 14, "tone": "accent" },
    { "type": "text", "at": "L8.2", "until": "L14", "text": "middleware", "x": 40, "y": 54.5, "w": 18, "tone": "accent" },
    { "type": "note", "at": "L8.2", "until": "L9", "text": "🔐 লগইন করেছেন?", "x": 33, "y": 62, "w": 32 },

    { "type": "label", "at": "L9", "until": "L10", "text": "কর্মকর্তা = controller", "tone": "accent" },
    { "type": "line", "at": "L9", "until": "L14", "x": 56, "y": 43.5, "w": 5 },
    { "type": "box", "at": "L9", "until": "L14", "icon": "👔", "text": "কর্মকর্তা", "x": 61, "y": 34, "w": 14 },
    { "type": "box", "at": "L9", "until": "L10", "icon": "👔", "text": "কর্মকর্তা", "x": 61, "y": 34, "w": 14, "tone": "accent" },
    { "type": "text", "at": "L9", "until": "L14", "text": "controller", "x": 59, "y": 54.5, "w": 18, "tone": "accent" },
    { "type": "note", "at": "L9.2", "until": "L10", "text": "⚙️ আসল কাজ এখানে", "x": 52, "y": 62, "w": 32 },

    { "type": "label", "at": "L10", "until": "L11", "text": "রেকর্ড রুম = model" },
    { "type": "line", "at": "L10", "until": "L14", "x": 75, "y": 43.5, "w": 3.5 },
    { "type": "line", "at": "L10", "until": "L14", "x": 78.5, "y": 27.5, "h": 16 },
    { "type": "line", "at": "L10", "until": "L14", "x": 78.5, "y": 27.5, "w": 2.5 },
    { "type": "box", "at": "L10", "until": "L14", "icon": "🗄️", "text": "রেকর্ড রুম", "x": 81, "y": 18, "w": 15 },
    { "type": "box", "at": "L10", "until": "L11", "icon": "🗄️", "text": "রেকর্ড রুম", "x": 81, "y": 18, "w": 15, "tone": "accent" },
    { "type": "text", "at": "L10.2", "until": "L14", "text": "model", "x": 80, "y": 37.5, "w": 17, "tone": "accent" },
    { "type": "note", "at": "L10.2", "until": "L11", "text": "🛢️ ডেটাবেসের সাথে কথা বলে", "x": 46, "y": 62, "w": 32 },

    { "type": "label", "at": "L11", "until": "L12", "text": "চিঠির নকশা = view" },
    { "type": "line", "at": "L11", "until": "L14", "x": 78.5, "y": 43.5, "h": 11 },
    { "type": "line", "at": "L11", "until": "L14", "x": 78.5, "y": 54.5, "w": 2.5 },
    { "type": "box", "at": "L11", "until": "L14", "icon": "📄", "text": "চিঠি", "x": 81, "y": 45, "w": 15 },
    { "type": "box", "at": "L11", "until": "L12", "icon": "📄", "text": "চিঠি", "x": 81, "y": 45, "w": 15, "tone": "accent" },
    { "type": "text", "at": "L11.2", "until": "L14", "text": "view", "x": 80, "y": 64.5, "w": 17, "tone": "accent" },

    { "type": "label", "at": "L12", "until": "L13", "text": "ফিরতি পথ" },
    { "type": "packet", "at": "L12", "until": "L13", "text": "📄 চিঠি", "from": 62, "to": 2, "y": 62, "w": 16, "tone": "ok", "travel": 3.5 },
    { "type": "label", "at": "L12.2", "until": "L13", "text": "এটাই রেসপন্স", "tone": "ok" },
    { "type": "label", "at": "L13", "until": "L14", "text": "⚡ চোখের পলকে", "tone": "accent" }
]
```

## অংশ ৩: জাদু নয়

L14
voice: [serious] তবে একটা কথা মনে রাখবেন। লারাভেল কোনো জাদু নয়।
caption: তবে একটা কথা মনে রাখবেন। Laravel কোনো জাদু নয়।
L15
voice: প্রতিটা রিকোয়েস্ট এই একই পথে চলে। তাই কিছু কাজ না করলে, পথ ধরে খুঁজুন কোথায় আটকাল।
caption: প্রতিটা রিকোয়েস্ট এই একই পথে চলে। তাই কিছু কাজ না করলে, পথ ধরে খুঁজুন কোথায় আটকাল।
L16
voice: এখনই পাবলিক ফোল্ডারের ইনডেক্স ডট পি-এইচ-পি খুলে দেখুন। পুরো সাইটের দরজা মাত্র কয়েক লাইনের।
caption: এখনই public ফোল্ডারের index.php খুলে দেখুন। পুরো সাইটের দরজা মাত্র কয়েক লাইনের।

```json
[
    { "type": "label", "at": "L14", "until": "L16", "text": "সাবধান", "tone": "danger" },
    { "type": "text", "at": "L14.2", "until": "L15", "text": "🪄 জাদু নয়", "x": 30, "y": 40, "w": 40, "tone": "danger" },
    { "type": "note", "at": "L15", "until": "L16", "text": "🚪 → 🛎️ → 💂 → 👔 → 🗄️ → 📄", "x": 20, "y": 28, "w": 60, "tone": "accent" },
    { "type": "text", "at": "L15", "until": "L16", "text": "প্রতিটা রিকোয়েস্ট, একই পথ", "x": 20, "y": 39, "w": 60 },
    { "type": "note", "at": "L15.2", "until": "L16", "text": "🔍 কিছু না চললে: পথ ধরে খুঁজুন কোথায় আটকাল", "x": 20, "y": 52, "w": 60, "tone": "ok" },
    { "type": "label", "at": "L16", "until": "end", "text": "নিজে দেখুন 👀", "tone": "accent" },
    { "type": "note", "at": "L16", "until": "end", "text": "📂 public/index.php", "x": 15, "y": 22, "w": 70 },
    { "type": "note", "at": "L16.2", "until": "end", "text": "require __DIR__.'/../vendor/autoload.php';", "x": 15, "y": 36, "w": 70, "mono": true },
    { "type": "note", "at": "L16.2", "until": "end", "text": "$app = require_once __DIR__.'/../bootstrap/app.php';", "x": 15, "y": 45, "w": 70, "mono": true },
    { "type": "note", "at": "L16.2", "until": "end", "text": "$app->handleRequest(Request::capture());", "x": 15, "y": 54, "w": 70, "mono": true }
]
```
