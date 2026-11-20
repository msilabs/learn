---
course: laravel
slug: blade
title: Blade দিয়ে পেজ বানানো
description: route থেকে পুরো HTML পেজ ফেরত দেবেন কীভাবে? view, Blade-এর {{ }}, @foreach, layout, PHP-তে বদলে জমা রাখা, আর {!! !!}-এর বিপদ, দেড় মিনিটে।
order: 3
date: 2026-11-20
og_icon: 📄
og_text: Blade
status: synced
---

## মালিকের জন্য নোট

- voice মালিকের নিজের লেখা চূড়ান্ত script থেকে হুবহু নেওয়া। ১৬টা অনুচ্ছেদ, ২৬টা বাক্য।
- caption-এ "দুই জোড়া কার্লি ব্র্যাকেট" দেখানো হয়েছে `{{ }}` দিয়ে। L14-এ `{!!…!!}` লেখা হয়েছে মাঝে ফাঁকা ছাড়া, কারণ tool বিস্ময়চিহ্নের পরে ফাঁকা পেলে বাক্য ভাঙে।
- [যাচাই] বদলানো PHP ফাইল জমা থাকে `storage/framework/views`-এ, আর `{{ $x }}` হয়ে যায় `<?php echo e($x); ?>`।

## অংশ ১: পুরো পেজ কীভাবে

L1
voice: [curious] রাউট থেকে একটা লেখা ফেরত দেওয়া সহজ। কিন্তু পুরো এইচ-টি-এম-এল পেজ ফেরত দেবেন কীভাবে?
caption: route থেকে একটা লেখা ফেরত দেওয়া সহজ। কিন্তু পুরো HTML পেজ ফেরত দেবেন কীভাবে?
L2
voice: পি-এইচ-পি-র ভেতরে এইচ-টি-এম-এল মিশিয়ে লেখা যায়। কিন্তু তাতে ফাইলটা দ্রুত জগাখিচুড়ি হয়ে যায়।
caption: PHP-র ভেতরে HTML মিশিয়ে লেখা যায়। কিন্তু তাতে ফাইলটা দ্রুত জগাখিচুড়ি হয়ে যায়।
L3
voice: লারাভেলে পেজের নকশা থাকে আলাদা ফাইলে, যার নাম ভিউ। আর ভিউ লেখার ভাষার নাম ব্লেড।
caption: Laravel-এ পেজের নকশা থাকে আলাদা ফাইলে, যার নাম view। আর view লেখার ভাষার নাম Blade।
L4
voice: অফিসের ভাষায়, ভিউ হলো ছাপানো চিঠির প্যাড। নকশা তৈরি, শুধু ফাঁকা ঘরে তথ্য বসবে।
caption: অফিসের ভাষায়, view হলো ছাপানো চিঠির প্যাড। নকশা তৈরি, শুধু ফাঁকা ঘরে তথ্য বসবে।

```json
[
    { "type": "note", "at": "L1", "until": "L2", "text": "return 'হ্যালো';", "x": 25, "y": 28, "w": 50, "mono": true, "tone": "ok" },
    { "type": "note", "at": "L1.2", "until": "L2", "text": "পুরো HTML পেজ? 🤔", "x": 25, "y": 44, "w": 50, "tone": "accent" },
    { "type": "note", "at": "L2", "until": "L3", "text": "echo '<h1>' . $title . '</h1>';", "x": 15, "y": 24, "w": 70, "mono": true },
    { "type": "note", "at": "L2", "until": "L3", "text": "<?php foreach ($posts as $p) { ?>", "x": 15, "y": 33, "w": 70, "mono": true },
    { "type": "note", "at": "L2", "until": "L3", "text": "<li><?= $p->title ?></li> <?php } ?>", "x": 15, "y": 42, "w": 70, "mono": true },
    { "type": "text", "at": "L2.2", "until": "L3", "text": "🍲 জগাখিচুড়ি", "x": 30, "y": 56, "w": 40, "tone": "danger" },
    { "type": "label", "at": "L3", "until": "L4", "text": "view আর Blade" },
    { "type": "note", "at": "L3", "until": "L4", "text": "📂 resources/views/posts.blade.php", "x": 15, "y": 30, "w": 70, "mono": true },
    { "type": "text", "at": "L3", "until": "L4", "text": "আলাদা ফাইলে পেজের নকশা = view", "x": 15, "y": 44, "w": 70, "tone": "accent" },
    { "type": "text", "at": "L3.2", "until": "L4", "text": "লেখার ভাষা = Blade", "x": 15, "y": 52, "w": 70, "tone": "accent" },

    { "type": "label", "at": "L4", "until": "L5", "text": "ছাপানো চিঠির প্যাড", "tone": "accent" },
    { "type": "note", "at": "L4", "until": "L5", "title": "📄 প্রিয় ________,", "text": "আপনার পোস্ট: ________", "x": 30, "y": 20, "w": 40 },
    { "type": "box", "at": "L4", "until": "L5", "text": "🚪 ফটক", "x": 1.5, "y": 42, "w": 14.5 },
    { "type": "line", "at": "L4", "until": "L5", "x": 16, "y": 47, "w": 2 },
    { "type": "box", "at": "L4", "until": "L5", "text": "🛎️ রিসেপশন", "x": 18, "y": 42, "w": 14.5 },
    { "type": "line", "at": "L4", "until": "L5", "x": 32.5, "y": 47, "w": 2 },
    { "type": "box", "at": "L4", "until": "L5", "text": "💂 রক্ষী", "x": 34.5, "y": 42, "w": 14.5 },
    { "type": "line", "at": "L4", "until": "L5", "x": 49, "y": 47, "w": 2 },
    { "type": "box", "at": "L4", "until": "L5", "text": "👔 কর্মকর্তা", "x": 51, "y": 42, "w": 14.5 },
    { "type": "line", "at": "L4", "until": "L5", "x": 65.5, "y": 47, "w": 2 },
    { "type": "box", "at": "L4", "until": "L5", "text": "🗄️ রেকর্ড রুম", "x": 67.5, "y": 42, "w": 14.5 },
    { "type": "line", "at": "L4", "until": "L5", "x": 82, "y": 47, "w": 2 },
    { "type": "box", "at": "L4", "until": "L5", "text": "📄 চিঠি", "x": 84, "y": 42, "w": 14.5, "tone": "accent" },
    { "type": "text", "at": "L4.2", "until": "L5", "text": "নকশা তৈরি, শুধু ফাঁকা ঘরে তথ্য বসবে", "x": 15, "y": 62, "w": 70, "tone": "accent" }
]
```

## অংশ ২: ফাঁকা ঘর ভরা

L5
voice: কর্মকর্তা বলেন ভিউ পোস্টস, আর সাথে দেন পোস্টের তালিকা।
caption: কর্মকর্তা বলেন view('posts'), আর সাথে দেন পোস্টের তালিকা।
L6
voice: ব্লেড ফাইলে দুই জোড়া কার্লি ব্র্যাকেটের ভেতরে ভেরিয়েবল লিখলেই, সেখানে তার মান বসে যায়।
caption: Blade ফাইলে {{ }}-এর ভেতরে ভেরিয়েবল লিখলেই, সেখানে তার মান বসে যায়।
L7
voice: তালিকা দেখাতে আছে ফোরইচ, শর্তের জন্য ইফ। সবই এইচ-টি-এম-এলের ভেতরে, পরিষ্কারভাবে।
caption: তালিকা দেখাতে আছে @foreach, শর্তের জন্য @if। সবই HTML-এর ভেতরে, পরিষ্কারভাবে।

```json
[
    { "type": "line", "at": "L5", "until": "L6", "x": 24, "y": 45.5, "w": 52 },
    { "type": "box", "at": "L5", "until": "L6", "icon": "👔", "text": "কর্মকর্তা", "x": 6, "y": 34, "w": 18 },
    { "type": "box", "at": "L5", "until": "L6", "icon": "📄", "text": "view: posts", "x": 76, "y": 34, "w": 18, "tone": "accent" },
    { "type": "packet", "at": "L5", "until": "L6", "text": "📋 পোস্টের তালিকা", "from": 25, "to": 55, "y": 35.5, "w": 20 },
    { "type": "note", "at": "L5", "until": "L6", "text": "return view('posts', ['posts' => $posts]);", "x": 15, "y": 60, "w": 70, "mono": true },

    { "type": "label", "at": "L6", "until": "L7", "text": "{{ }}: মান বসে যায়", "tone": "accent" },
    { "type": "note", "at": "L6", "until": "L7", "text": "<h1>{{ $title }}</h1>", "x": 25, "y": 28, "w": 50, "mono": true },
    { "type": "text", "at": "L6", "until": "L7", "text": "👇", "x": 40, "y": 39, "w": 20 },
    { "type": "note", "at": "L6", "until": "L7", "text": "<h1>আমার ব্লগ</h1>", "x": 25, "y": 46, "w": 50, "mono": true, "tone": "ok" },

    { "type": "label", "at": "L7", "until": "L8", "text": "@foreach আর @if" },
    { "type": "note", "at": "L7", "until": "L8", "text": "@foreach ($posts as $post)", "x": 15, "y": 22, "w": 70, "mono": true },
    { "type": "note", "at": "L7", "until": "L8", "text": "    <li>{{ $post->title }}</li>", "x": 15, "y": 31, "w": 70, "mono": true },
    { "type": "note", "at": "L7", "until": "L8", "text": "@endforeach", "x": 15, "y": 40, "w": 70, "mono": true },
    { "type": "note", "at": "L7", "until": "L8", "text": "@if ($posts->isEmpty()) <p>কিছু নেই</p> @endif", "x": 15, "y": 51, "w": 70, "mono": true },
    { "type": "text", "at": "L7.2", "until": "L8", "text": "HTML-এর ভেতরেই, পরিষ্কার ✓", "x": 15, "y": 64, "w": 70, "tone": "ok" }
]
```

## অংশ ৩: layout আর গতি

L8
voice: কিন্তু প্রতিটা পেজে একই হেডার আর ফুটার কি বারবার লিখতে হবে?
caption: কিন্তু প্রতিটা পেজে একই হেডার আর ফুটার কি বারবার লিখতে হবে?
L9
voice: না। একটা লেআউট বানালে, প্রতিটা পেজ শুধু নিজের মাঝের অংশটুকু বসায়।
caption: না। একটা layout বানালে, প্রতিটা পেজ শুধু নিজের মাঝের অংশটুকু বসায়।
L10
voice: [excited] আর মজার ব্যাপার হলো, ব্লেড আলাদা কোনো ভাষা নয়! লারাভেল এটাকে সাধারণ পি-এইচ-পি-তে বদলে জমিয়ে রাখে।
caption: আর মজার ব্যাপার হলো, Blade আলাদা কোনো ভাষা নয়! Laravel এটাকে সাধারণ PHP-তে বদলে জমিয়ে রাখে।
L11
voice: তাই প্রথমবারের পর, পেজ চলে সাধারণ পি-এইচ-পি-র গতিতেই।
caption: তাই প্রথমবারের পর, পেজ চলে সাধারণ PHP-র গতিতেই।

```json
[
    { "type": "label", "at": "L8", "until": "L9", "text": "বারবার একই জিনিস?" },
    { "type": "box", "at": "L8", "until": "L9", "text": "🔝 হেডার", "x": 10, "y": 22, "w": 22, "tone": "danger" },
    { "type": "box", "at": "L8", "until": "L9", "text": "📄 পেজ ১", "x": 10, "y": 34, "w": 22 },
    { "type": "box", "at": "L8", "until": "L9", "text": "🔚 ফুটার", "x": 10, "y": 46, "w": 22, "tone": "danger" },
    { "type": "box", "at": "L8", "until": "L9", "text": "🔝 হেডার", "x": 39, "y": 22, "w": 22, "tone": "danger" },
    { "type": "box", "at": "L8", "until": "L9", "text": "📄 পেজ ২", "x": 39, "y": 34, "w": 22 },
    { "type": "box", "at": "L8", "until": "L9", "text": "🔚 ফুটার", "x": 39, "y": 46, "w": 22, "tone": "danger" },
    { "type": "box", "at": "L8", "until": "L9", "text": "🔝 হেডার", "x": 68, "y": 22, "w": 22, "tone": "danger" },
    { "type": "box", "at": "L8", "until": "L9", "text": "📄 পেজ ৩", "x": 68, "y": 34, "w": 22 },
    { "type": "box", "at": "L8", "until": "L9", "text": "🔚 ফুটার", "x": 68, "y": 46, "w": 22, "tone": "danger" },
    { "type": "text", "at": "L8", "until": "L9", "text": "বারবার? 😩", "x": 30, "y": 62, "w": 40, "tone": "danger" },

    { "type": "label", "at": "L9", "until": "L10", "text": "layout", "tone": "ok" },
    { "type": "box", "at": "L9.2", "until": "L10", "text": "🔝 হেডার", "x": 8, "y": 22, "w": 36, "tone": "ok" },
    { "type": "box", "at": "L9.2", "until": "L10", "text": "@yield('content')", "x": 8, "y": 34, "w": 36, "tone": "accent" },
    { "type": "box", "at": "L9.2", "until": "L10", "text": "🔚 ফুটার", "x": 8, "y": 46, "w": 36, "tone": "ok" },
    { "type": "note", "at": "L9.2", "until": "L10", "text": "@extends('layout')", "x": 54, "y": 26, "w": 40, "mono": true },
    { "type": "note", "at": "L9.2", "until": "L10", "text": "@section('content') … @endsection", "x": 54, "y": 35, "w": 40, "mono": true },
    { "type": "text", "at": "L9.2", "until": "L10", "text": "প্রতিটা পেজ শুধু মাঝের অংশ বসায়", "x": 15, "y": 62, "w": 70, "tone": "ok" },

    { "type": "label", "at": "L10", "until": "L11", "text": "Blade আলাদা ভাষা নয়!", "tone": "accent" },
    { "type": "note", "at": "L10.2", "until": "L12", "text": "{{ $title }}", "x": 8, "y": 34, "w": 32, "mono": true },
    { "type": "text", "at": "L10.2", "until": "L12", "text": "👉", "x": 42, "y": 35, "w": 10 },
    { "type": "note", "at": "L10.2", "until": "L12", "text": "<?php echo e($title); ?>", "x": 54, "y": 34, "w": 40, "mono": true, "tone": "ok" },
    { "type": "text", "at": "L10.2", "until": "L12", "text": "📂 storage/framework/views-এ জমা থাকে", "x": 15, "y": 48, "w": 70 },
    { "type": "label", "at": "L11", "until": "L12", "text": "⚡ সাধারণ PHP-র গতি", "tone": "ok" },
    { "type": "text", "at": "L11", "until": "L12", "text": "প্রথমবার বদলায়, তারপর সরাসরি চলে ⚡", "x": 15, "y": 62, "w": 70, "tone": "ok" }
]
```

## অংশ ৪: {{ }} বনাম {!! !!}

L12
voice: কার্লি ব্র্যাকেট আরেকটা কাজ করে চুপচাপ। ভেতরের লেখায় এইচ-টি-এম-এলের চিহ্ন থাকলে, সেগুলোকে নিরীহ লেখা বানিয়ে দেয়।
caption: {{ }} আরেকটা কাজ করে চুপচাপ। ভেতরের লেখায় HTML-এর চিহ্ন থাকলে, সেগুলোকে নিরীহ লেখা বানিয়ে দেয়।
L13
voice: ফলে কেউ নামের জায়গায় স্ক্রিপ্ট লিখে দিলেও, সেটা চলে না, শুধু লেখা হিসেবে দেখায়।
caption: ফলে কেউ নামের জায়গায় স্ক্রিপ্ট লিখে দিলেও, সেটা চলে না, শুধু লেখা হিসেবে দেখায়।
L14
voice: [serious] তবে একটা কথা মনে রাখবেন। ব্লেডে আরেকটা চিহ্ন আছে, কার্লি ব্র্যাকেটের ভেতরে দুটো বিস্ময়চিহ্ন।
caption: তবে একটা কথা মনে রাখবেন। Blade-এ আরেকটা চিহ্ন আছে, {!!…!!}।
L15
voice: এটা লেখাকে না বদলেই বসিয়ে দেয়। ব্যবহারকারীর লেখায় এটা দিলে, সেই স্ক্রিপ্ট সত্যিই চলবে।
caption: এটা লেখাকে না বদলেই বসিয়ে দেয়। ব্যবহারকারীর লেখায় এটা দিলে, সেই স্ক্রিপ্ট সত্যিই চলবে।
L16
voice: তাই ব্যবহারকারীর লেখায় সবসময় দুই জোড়া কার্লি ব্র্যাকেটই রাখুন।
caption: তাই ব্যবহারকারীর লেখায় সবসময় {{ }}-ই রাখুন।

```json
[
    { "type": "label", "at": "L12", "until": "L14", "text": "{{ }}: নিরীহ বানায় 🛡️", "tone": "ok" },
    { "type": "note", "at": "L12.2", "until": "L13", "text": "<b>হাই</b>  👉  &lt;b&gt;হাই&lt;/b&gt;", "x": 12, "y": 36, "w": 76, "mono": true, "tone": "ok" },
    { "type": "note", "at": "L13", "until": "L14", "title": "নামের জায়গায়:", "text": "<script>alert('hi')</script>", "x": 20, "y": 26, "w": 60, "mono": true, "tone": "danger" },
    { "type": "note", "at": "L13", "until": "L14", "text": "✓ চলে না, পর্দায় শুধু লেখা", "x": 20, "y": 44, "w": 60, "tone": "ok" },

    { "type": "label", "at": "L14", "until": "end", "text": "সাবধান", "tone": "danger" },
    { "type": "note", "at": "L14.2", "until": "L16", "text": "{!! $text !!}", "x": 30, "y": 28, "w": 40, "mono": true, "tone": "danger" },
    { "type": "note", "at": "L15", "until": "L16", "text": "লেখা না বদলেই বসিয়ে দেয়", "x": 20, "y": 42, "w": 60 },
    { "type": "note", "at": "L15.2", "until": "L16", "text": "<script>…  👉  🔥 স্ক্রিপ্ট সত্যিই চলে", "x": 20, "y": 52, "w": 60, "tone": "danger", "mono": true },
    { "type": "note", "at": "L16", "until": "end", "text": "✓  {{ $name }}", "x": 25, "y": 30, "w": 50, "mono": true, "tone": "ok" },
    { "type": "note", "at": "L16", "until": "end", "text": "✗  {!! $name !!}", "x": 25, "y": 42, "w": 50, "mono": true, "tone": "danger" }
]
```
