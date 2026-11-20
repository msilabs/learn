---
course: laravel
slug: eloquent
title: Model আর Eloquent
description: ডেটাবেস থেকে পোস্ট আনতে কি প্রতিবার SQL লিখতে হবে? table মানে class, row মানে object, all, find, where, save, আর আড়ালে থাকা SQL, দেড় মিনিটে।
order: 8
date: 2026-11-20
og_icon: 🗄️
og_text: Eloquent
status: synced
---

## মালিকের জন্য নোট

- voice মালিকের নিজের লেখা চূড়ান্ত script থেকে হুবহু নেওয়া। ১৬টা অনুচ্ছেদ, ২৬টা বাক্য।
- পর্দায় Eloquent-এর বানানো SQL সরল করে দেখানো হয়েছে। আসলে টেবিল আর কলামের নাম backtick-এ থাকে, যেমন `posts`.`id`।

## অংশ ১: প্রতিবার SQL?

L1
voice: [curious] ডেটাবেস থেকে পোস্ট আনতে কি প্রতিবার এস-কিউ-এল লিখতে হবে?
caption: ডেটাবেস থেকে পোস্ট আনতে কি প্রতিবার SQL লিখতে হবে?
L2
voice: লেখা যায়। কিন্তু প্রতিটা কোয়েরি হাতে লিখলে, ভুল আর একই কথা বারবার লেখা দুটোই বাড়ে।
caption: লেখা যায়। কিন্তু প্রতিটা কোয়েরি হাতে লিখলে, ভুল আর একই কথা বারবার লেখা দুটোই বাড়ে।
L3
voice: লারাভেলের এলোকোয়েন্ট ডেটাবেসের প্রতিটা টেবিলকে একটা পি-এইচ-পি ক্লাস বানিয়ে দেয়। এই ক্লাসের নাম মডেল।
caption: Laravel-এর Eloquent ডেটাবেসের প্রতিটা টেবিলকে একটা PHP ক্লাস বানিয়ে দেয়। এই ক্লাসের নাম model।
L4
voice: পোস্টস টেবিলের জন্য পোস্ট মডেল। আর টেবিলের প্রতিটা সারি হয়ে যায় একটা অবজেক্ট।
caption: posts টেবিলের জন্য Post model। আর টেবিলের প্রতিটা সারি হয়ে যায় একটা অবজেক্ট।
L5
voice: অফিসের ভাষায়, মডেল হলো রেকর্ড রুম। আপনি শুধু বলেন কী চাই, কোন তাক থেকে আনতে হবে সেটা তার কাজ।
caption: অফিসের ভাষায়, model হলো রেকর্ড রুম। আপনি শুধু বলেন কী চাই, কোন তাক থেকে আনতে হবে সেটা তার কাজ।

```json
[
    { "type": "note", "at": "L1", "until": "L2.2", "text": "SELECT * FROM posts WHERE id = 5;", "x": 20, "y": 30, "w": 60, "mono": true },
    { "type": "text", "at": "L1", "until": "L2", "text": "প্রতিবার? 🤔", "x": 25, "y": 44, "w": 50, "tone": "accent" },
    { "type": "text", "at": "L2", "until": "L2.2", "text": "লেখা যায় ✓", "x": 25, "y": 44, "w": 50, "tone": "ok" },
    { "type": "note", "at": "L2.2", "until": "L3", "text": "SELECT * FROM posts WHERE id = 5;", "x": 15, "y": 26, "w": 70, "mono": true, "tone": "danger" },
    { "type": "note", "at": "L2.2", "until": "L3", "text": "SELECT * FROM posts WHERE published = 1;", "x": 15, "y": 35, "w": 70, "mono": true, "tone": "danger" },
    { "type": "note", "at": "L2.2", "until": "L3", "text": "SELECT * FROM posts ORDER BY id DESC;", "x": 15, "y": 44, "w": 70, "mono": true, "tone": "danger" },
    { "type": "text", "at": "L2.2", "until": "L3", "text": "❌ ভুল · 🔁 একই কথা বারবার", "x": 15, "y": 56, "w": 70, "tone": "danger" },

    { "type": "label", "at": "L3", "until": "L4", "text": "Eloquent", "tone": "accent" },
    { "type": "line", "at": "L3", "until": "L4", "x": 38, "y": 43.5, "w": 24 },
    { "type": "box", "at": "L3", "until": "L4", "icon": "🛢️", "text": "posts টেবিল", "x": 8, "y": 34, "w": 30 },
    { "type": "box", "at": "L3", "until": "L4", "icon": "🧩", "text": "PHP ক্লাস", "x": 62, "y": 34, "w": 30, "tone": "accent" },
    { "type": "text", "at": "L3.2", "until": "L4", "text": "= model", "x": 62, "y": 56, "w": 30, "tone": "accent" },

    { "type": "label", "at": "L4", "until": "L5", "text": "table = class, row = object" },
    { "type": "note", "at": "L4", "until": "L5", "text": "class Post extends Model", "x": 20, "y": 24, "w": 60, "mono": true, "tone": "accent" },
    { "type": "text", "at": "L4", "until": "L5", "text": "posts টেবিল  👉  Post model", "x": 20, "y": 34, "w": 60 },
    { "type": "note", "at": "L4.2", "until": "L5", "text": "সারি: id=5, title='হ্যালো'", "x": 6, "y": 46, "w": 42, "mono": true },
    { "type": "note", "at": "L4.2", "until": "L5", "text": "👉 $post (একটা অবজেক্ট)", "x": 52, "y": 46, "w": 42, "mono": true, "tone": "ok" },

    { "type": "label", "at": "L5", "until": "L6", "text": "রেকর্ড রুম", "tone": "accent" },
    { "type": "box", "at": "L5", "until": "L6", "text": "🚪 ফটক", "x": 1.5, "y": 36, "w": 14.5 },
    { "type": "line", "at": "L5", "until": "L6", "x": 16, "y": 41, "w": 2 },
    { "type": "box", "at": "L5", "until": "L6", "text": "🛎️ রিসেপশন", "x": 18, "y": 36, "w": 14.5 },
    { "type": "line", "at": "L5", "until": "L6", "x": 32.5, "y": 41, "w": 2 },
    { "type": "box", "at": "L5", "until": "L6", "text": "💂 রক্ষী", "x": 34.5, "y": 36, "w": 14.5 },
    { "type": "line", "at": "L5", "until": "L6", "x": 49, "y": 41, "w": 2 },
    { "type": "box", "at": "L5", "until": "L6", "text": "👔 কর্মকর্তা", "x": 51, "y": 36, "w": 14.5 },
    { "type": "line", "at": "L5", "until": "L6", "x": 65.5, "y": 41, "w": 2 },
    { "type": "box", "at": "L5", "until": "L6", "text": "🗄️ রেকর্ড রুম", "x": 67.5, "y": 36, "w": 14.5, "tone": "accent" },
    { "type": "line", "at": "L5", "until": "L6", "x": 82, "y": 41, "w": 2 },
    { "type": "box", "at": "L5", "until": "L6", "text": "📄 চিঠি", "x": 84, "y": 36, "w": 14.5 },
    { "type": "text", "at": "L5.2", "until": "L6", "text": "আপনি: কী চাই · model: কোন তাক থেকে আনবে", "x": 10, "y": 54, "w": 80, "tone": "accent" }
]
```

## অংশ ২: আনা আর পড়া

L6
voice: সব পোস্ট চাইলে পোস্ট অল। পাঁচ নম্বরটা চাইলে পোস্ট ফাইন্ড পাঁচ।
caption: সব পোস্ট চাইলে Post::all()। 5 নম্বরটা চাইলে Post::find(5)।
L7
voice: শর্ত দিতে চাইলে হোয়্যার, যেমন শুধু প্রকাশিত পোস্টগুলো।
caption: শর্ত দিতে চাইলে where, যেমন শুধু প্রকাশিত পোস্টগুলো।
L8
voice: পাওয়া পোস্টের শিরোনাম পড়তে, পোস্ট অ্যারো টাইটেল। কলামের নামই প্রপার্টির নাম।
caption: পাওয়া পোস্টের শিরোনাম পড়তে, $post->title। কলামের নামই প্রপার্টির নাম।

```json
[
    { "type": "label", "at": "L6", "until": "L7", "text": "আনা" },
    { "type": "note", "at": "L6", "until": "L7", "text": "Post::all()   // সব পোস্ট", "x": 15, "y": 30, "w": 70, "mono": true },
    { "type": "note", "at": "L6.2", "until": "L7", "text": "Post::find(5)   // 5 নম্বর", "x": 15, "y": 40, "w": 70, "mono": true },
    { "type": "label", "at": "L7", "until": "L8", "text": "শর্ত: where" },
    { "type": "note", "at": "L7", "until": "L8", "text": "Post::where('published', true)->get();", "x": 12, "y": 32, "w": 76, "mono": true },
    { "type": "text", "at": "L7", "until": "L8", "text": "শুধু প্রকাশিত পোস্ট ✓", "x": 15, "y": 46, "w": 70, "tone": "ok" },
    { "type": "label", "at": "L8", "until": "L9", "text": "কলাম = প্রপার্টি" },
    { "type": "note", "at": "L8", "until": "L9", "text": "$post->title   👉   'হ্যালো'", "x": 20, "y": 32, "w": 60, "mono": true, "tone": "ok" },
    { "type": "text", "at": "L8.2", "until": "L9", "text": "title কলাম  👉  ->title", "x": 20, "y": 46, "w": 60, "tone": "accent" }
]
```

## অংশ ৩: আড়ালের SQL

L9
voice: কিন্তু এস-কিউ-এল যদি না-ই লিখি, ডেটাবেস বোঝে কীভাবে?
caption: কিন্তু SQL যদি না-ই লিখি, ডেটাবেস বোঝে কীভাবে?
L10
voice: [excited] এলোকোয়েন্ট পর্দার আড়ালে নিজেই এস-কিউ-এল বানিয়ে পাঠায়!
caption: Eloquent পর্দার আড়ালে নিজেই SQL বানিয়ে পাঠায়!
L11
voice: আর আপনার দেওয়া মানগুলো পাঠায় আলাদা করে। তাই কেউ ফর্মে এস-কিউ-এল লিখে দিলেও, সেটা চলে না।
caption: আর আপনার দেওয়া মানগুলো পাঠায় আলাদা করে। তাই কেউ ফর্মে SQL লিখে দিলেও, সেটা চলে না।
L12
voice: নতুন পোস্ট রাখাও সহজ। অবজেক্ট বানান, মান বসান, তারপর সেভ।
caption: নতুন পোস্ট রাখাও সহজ। অবজেক্ট বানান, মান বসান, তারপর save()।

```json
[
    { "type": "label", "at": "L9", "until": "L10", "text": "SQL না লিখলে?" },
    { "type": "text", "at": "L9", "until": "L10", "text": "ডেটাবেস বোঝে কীভাবে? 🤔", "x": 25, "y": 42, "w": 50, "tone": "accent" },
    { "type": "label", "at": "L10", "until": "L11", "text": "পর্দার আড়ালে SQL!", "tone": "ok" },
    { "type": "note", "at": "L10", "until": "L12", "text": "Post::find(5)", "x": 6, "y": 30, "w": 34, "mono": true },
    { "type": "text", "at": "L10", "until": "L12", "text": "👉", "x": 41, "y": 31, "w": 10 },
    { "type": "note", "at": "L10", "until": "L12", "text": "select * from posts where id = ? limit 1", "x": 52, "y": 30, "w": 44, "mono": true, "tone": "ok" },
    { "type": "label", "at": "L11", "until": "L12", "text": "মান যায় আলাদা করে 🛡️", "tone": "ok" },
    { "type": "note", "at": "L11", "until": "L12", "text": "মান আলাদা: [5]", "x": 52, "y": 42, "w": 44, "mono": true, "tone": "accent" },
    { "type": "note", "at": "L11.2", "until": "L12", "title": "ফর্মে লিখল: 5; DROP TABLE posts", "text": "✓ শুধু একটা মান, SQL হিসেবে চলে না", "x": 20, "y": 56, "w": 60, "tone": "ok" },
    { "type": "label", "at": "L12", "until": "L13", "text": "নতুন পোস্ট" },
    { "type": "note", "at": "L12.2", "until": "L13", "text": "$post = new Post;", "x": 20, "y": 28, "w": 60, "mono": true },
    { "type": "note", "at": "L12.2", "until": "L13", "text": "$post->title = 'নতুন পোস্ট';", "x": 20, "y": 37, "w": 60, "mono": true },
    { "type": "note", "at": "L12.2", "until": "L13", "text": "$post->save();", "x": 20, "y": 46, "w": 60, "mono": true, "tone": "ok" }
]
```

## অংশ ৪: আড়াল, দূর নয়

L13
voice: [serious] তবে একটা কথা মনে রাখবেন। এলোকোয়েন্ট এস-কিউ-এল দূর করে না, শুধু আড়াল করে।
caption: তবে একটা কথা মনে রাখবেন। Eloquent SQL দূর করে না, শুধু আড়াল করে।
L14
voice: কোয়েরি ধীর হলে বা ফল ভুল এলে, এস-কিউ-এল না জানলে বুঝবেন না সমস্যা কোথায়।
caption: কোয়েরি ধীর হলে বা ফল ভুল এলে, SQL না জানলে বুঝবেন না সমস্যা কোথায়।
L15
voice: তাই মাঝে মাঝে দেখে নিন, আপনার কোড আসলে কোন এস-কিউ-এল বানাচ্ছে।
caption: তাই মাঝে মাঝে দেখে নিন, আপনার কোড আসলে কোন SQL বানাচ্ছে।
L16
voice: এখনই চালান পি-এইচ-পি আর্টিসান টিংকার, তারপর লিখুন ইউজার কাউন্ট। ডেটাবেসে কতজন, সাথে সাথে উত্তর।
caption: এখনই চালান php artisan tinker, তারপর লিখুন User::count()। ডেটাবেসে কতজন, সাথে সাথে উত্তর।

```json
[
    { "type": "label", "at": "L13", "until": "L16", "text": "সাবধান", "tone": "danger" },
    { "type": "box", "at": "L13.2", "until": "L14", "icon": "🙈", "text": "SQL আড়ালে, কিন্তু আছেই", "x": 30, "y": 30, "w": 40, "tone": "accent" },
    { "type": "note", "at": "L14", "until": "L15", "text": "🐢 কোয়েরি ধীর?   ❌ ফল ভুল?", "x": 20, "y": 30, "w": 60, "tone": "danger" },
    { "type": "text", "at": "L14", "until": "L15", "text": "SQL না জানলে কারণ খুঁজে পাবেন না", "x": 15, "y": 44, "w": 70, "tone": "danger" },
    { "type": "note", "at": "L15", "until": "L16", "text": "Post::where('published', true)->toSql();", "x": 12, "y": 30, "w": 76, "mono": true },
    { "type": "note", "at": "L15", "until": "L16", "text": "👉 select * from posts where published = ?", "x": 12, "y": 40, "w": 76, "mono": true, "tone": "ok" },
    { "type": "label", "at": "L16", "until": "end", "text": "নিজে দেখুন 👀", "tone": "accent" },
    { "type": "note", "at": "L16", "until": "end", "text": "$ php artisan tinker", "x": 20, "y": 26, "w": 60, "mono": true },
    { "type": "note", "at": "L16", "until": "end", "text": "> User::count()", "x": 20, "y": 36, "w": 60, "mono": true },
    { "type": "note", "at": "L16.2", "until": "end", "text": "= 3", "x": 20, "y": 46, "w": 60, "mono": true, "tone": "ok" }
]
```
