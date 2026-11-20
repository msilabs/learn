---
course: laravel
slug: controller
title: Controller কেন লাগে
description: সব কাজ route-এর ফাইলে লিখলে কী হয়? controller, মেথড, Request নিজে থেকে পাওয়া, আর php artisan make:controller, দেড় মিনিটে।
order: 4
date: 2026-11-20
og_icon: 👔
og_text: Controller
status: synced
---

## মালিকের জন্য নোট

- voice মালিকের নিজের লেখা চূড়ান্ত script থেকে হুবহু নেওয়া। ১৬টা অনুচ্ছেদ, ২৫টা বাক্য।
- [যাচাই] script-এ বলা আছে controller থাকে "app ফোল্ডারের ভেতরে Controllers নামের ফোল্ডারে"। আসল পথ `app/Http/Controllers`, পর্দায় সেটাই দেখানো হয়েছে।
- [যাচাই] Service Container-এর নাম একবার বলা হয়েছে, গভীরে যাওয়া হয়নি।

## অংশ ১: জট আর সমাধান

L1
voice: [curious] সব কাজ যদি রাউটের ফাইলেই লেখেন, পঞ্চাশটা পেজের পর ফাইলটা দেখতে কেমন হবে?
caption: সব কাজ যদি route-এর ফাইলেই লেখেন, 50টা পেজের পর ফাইলটা দেখতে কেমন হবে?
L2
voice: হাজার লাইনের একটা জট। কোন কাজ কোথায়, খুঁজে পাওয়াই কঠিন।
caption: হাজার লাইনের একটা জট। কোন কাজ কোথায়, খুঁজে পাওয়াই কঠিন।
L3
voice: এর সমাধান কন্ট্রোলার। রিসেপশন শুধু পথ দেখায়, আর কাজ করেন আলাদা ঘরের কর্মকর্তা।
caption: এর সমাধান controller। রিসেপশন শুধু পথ দেখায়, আর কাজ করেন আলাদা ঘরের কর্মকর্তা।

```json
[
    { "type": "note", "at": "L1", "until": "L3", "text": "📂 routes/web.php", "x": 15, "y": 22, "w": 70 },
    { "type": "note", "at": "L1", "until": "L3", "text": "Route::get('/posts', function () { …40 লাইন… });", "x": 15, "y": 33, "w": 70, "mono": true },
    { "type": "note", "at": "L1", "until": "L3", "text": "Route::post('/posts', function () { …60 লাইন… });", "x": 15, "y": 42, "w": 70, "mono": true },
    { "type": "note", "at": "L1", "until": "L3", "text": "Route::get('/users', function () { …50 লাইন… });", "x": 15, "y": 51, "w": 70, "mono": true },
    { "type": "text", "at": "L1", "until": "L2", "text": "… আরও 47টা পেজ", "x": 15, "y": 62, "w": 70 },
    { "type": "label", "at": "L2", "until": "L3", "text": "🧶 হাজার লাইনের জট", "tone": "danger" },
    { "type": "text", "at": "L2.2", "until": "L3", "text": "কোন কাজ কোথায়? 🔍", "x": 15, "y": 62, "w": 70, "tone": "danger" },

    { "type": "label", "at": "L3", "until": "L4", "text": "সমাধান: controller", "tone": "ok" },
    { "type": "box", "at": "L3", "until": "L4", "text": "🚪 ফটক", "x": 1.5, "y": 36, "w": 14.5 },
    { "type": "line", "at": "L3", "until": "L4", "x": 16, "y": 41, "w": 2 },
    { "type": "box", "at": "L3", "until": "L4", "text": "🛎️ রিসেপশন", "x": 18, "y": 36, "w": 14.5 },
    { "type": "line", "at": "L3", "until": "L4", "x": 32.5, "y": 41, "w": 2 },
    { "type": "box", "at": "L3", "until": "L4", "text": "💂 রক্ষী", "x": 34.5, "y": 36, "w": 14.5 },
    { "type": "line", "at": "L3", "until": "L4", "x": 49, "y": 41, "w": 2 },
    { "type": "box", "at": "L3", "until": "L4", "text": "👔 কর্মকর্তা", "x": 51, "y": 36, "w": 14.5, "tone": "accent" },
    { "type": "line", "at": "L3", "until": "L4", "x": 65.5, "y": 41, "w": 2 },
    { "type": "box", "at": "L3", "until": "L4", "text": "🗄️ রেকর্ড রুম", "x": 67.5, "y": 36, "w": 14.5 },
    { "type": "line", "at": "L3", "until": "L4", "x": 82, "y": 41, "w": 2 },
    { "type": "box", "at": "L3", "until": "L4", "text": "📄 চিঠি", "x": 84, "y": 36, "w": 14.5 },
    { "type": "text", "at": "L3.2", "until": "L4", "text": "শুধু পথ দেখায়", "x": 15, "y": 48, "w": 20.5 },
    { "type": "text", "at": "L3.2", "until": "L4", "text": "আসল কাজ ⚙️", "x": 48, "y": 48, "w": 20.5, "tone": "accent" }
]
```

## অংশ ২: ক্লাস আর মেথড

L4
voice: কন্ট্রোলার একটা সাধারণ পি-এইচ-পি ক্লাস। থাকে অ্যাপ ফোল্ডারের ভেতরে, কন্ট্রোলারস নামের ফোল্ডারে।
caption: Controller একটা সাধারণ PHP ক্লাস। থাকে app ফোল্ডারের ভেতরে, Controllers নামের ফোল্ডারে।
L5
voice: সাধারণত একটা বিষয়ের জন্য একটা কন্ট্রোলার। যেমন পোস্টের সব কাজ থাকে পোস্ট কন্ট্রোলারে।
caption: সাধারণত একটা বিষয়ের জন্য একটা controller। যেমন পোস্টের সব কাজ থাকে PostController-এ।
L6
voice: তার ভেতরে প্রতিটা কাজ একটা মেথড। তালিকা দেখানো ইনডেক্স, একটা পোস্ট দেখানো শো।
caption: তার ভেতরে প্রতিটা কাজ একটা মেথড। তালিকা দেখানো index, একটা পোস্ট দেখানো show।
L7
voice: এবার রাউট শুধু বলে, স্ল্যাশ পোস্টস এলে পোস্ট কন্ট্রোলারের ইনডেক্সে পাঠাও।
caption: এবার route শুধু বলে, /posts এলে PostController-এর index-এ পাঠাও।

```json
[
    { "type": "label", "at": "L4", "until": "L5", "text": "controller = একটা PHP ক্লাস" },
    { "type": "note", "at": "L4", "until": "L5", "text": "class PostController extends Controller", "x": 15, "y": 30, "w": 70, "mono": true },
    { "type": "note", "at": "L4.2", "until": "L5", "text": "📂 app/Http/Controllers/PostController.php", "x": 15, "y": 44, "w": 70, "mono": true, "tone": "accent" },

    { "type": "label", "at": "L5", "until": "L6", "text": "একটা বিষয়, একটা controller" },
    { "type": "box", "at": "L5", "until": "L6", "icon": "👔", "text": "PostController", "x": 8, "y": 32, "w": 26, "tone": "accent" },
    { "type": "box", "at": "L5", "until": "L6", "icon": "👔", "text": "UserController", "x": 37, "y": 32, "w": 26 },
    { "type": "box", "at": "L5", "until": "L6", "icon": "👔", "text": "CommentController", "x": 66, "y": 32, "w": 26 },
    { "type": "text", "at": "L5.2", "until": "L6", "text": "📝 পোস্টের সব কাজ", "x": 6, "y": 54, "w": 30, "tone": "accent" },

    { "type": "label", "at": "L6", "until": "L7", "text": "প্রতিটা কাজ = একটা মেথড" },
    { "type": "note", "at": "L6", "until": "L7", "text": "class PostController extends Controller {", "x": 12, "y": 24, "w": 76, "mono": true },
    { "type": "note", "at": "L6.2", "until": "L7", "text": "    public function index() { … }   // তালিকা", "x": 12, "y": 33, "w": 76, "mono": true, "tone": "accent" },
    { "type": "note", "at": "L6.2", "until": "L7", "text": "    public function show($id) { … }   // একটা পোস্ট", "x": 12, "y": 42, "w": 76, "mono": true, "tone": "accent" },
    { "type": "note", "at": "L6", "until": "L7", "text": "}", "x": 12, "y": 51, "w": 76, "mono": true },

    { "type": "label", "at": "L7", "until": "L8", "text": "route শুধু পথ দেখায়" },
    { "type": "note", "at": "L7", "until": "L8", "text": "Route::get('/posts', [PostController::class, 'index']);", "x": 10, "y": 32, "w": 80, "mono": true },
    { "type": "text", "at": "L7", "until": "L8", "text": "/posts  👉  PostController-এর index", "x": 15, "y": 46, "w": 70, "tone": "accent" }
]
```

## অংশ ৩: Request নিজে থেকে আসে

L8
voice: কিন্তু কর্মকর্তা রিকোয়েস্টের তথ্য পান কোথা থেকে?
caption: কিন্তু কর্মকর্তা রিকোয়েস্টের তথ্য পান কোথা থেকে?
L9
voice: [excited] মেথডে রিকোয়েস্ট নামের একটা প্যারামিটার চাইলেই, লারাভেল নিজেই সেটা ভরে দেয়!
caption: মেথডে Request নামের একটা প্যারামিটার চাইলেই, Laravel নিজেই সেটা ভরে দেয়!
L10
voice: এর পেছনে আছে লারাভেলের সার্ভিস কন্টেইনার। মেথড কী চাইছে দেখে, সেটা বানিয়ে হাতে দেয়।
caption: এর পেছনে আছে Laravel-এর Service Container। মেথড কী চাইছে দেখে, সেটা বানিয়ে হাতে দেয়।
L11
voice: কর্মকর্তা ফর্মের তথ্য পড়েন, দরকার হলে ডেটাবেস থেকে আনান, তারপর একটা ভিউ ফেরত দেন।
caption: কর্মকর্তা ফর্মের তথ্য পড়েন, দরকার হলে ডেটাবেস থেকে আনান, তারপর একটা view ফেরত দেন।

```json
[
    { "type": "box", "at": "L8", "until": "L9", "icon": "👔", "text": "কর্মকর্তা", "x": 41, "y": 30, "w": 18 },
    { "type": "text", "at": "L8", "until": "L9", "text": "রিকোয়েস্টের তথ্য কোথায়? 🤔", "x": 25, "y": 54, "w": 50, "tone": "accent" },
    { "type": "label", "at": "L9", "until": "L10", "text": "চাইলেই পেয়ে যান!", "tone": "ok" },
    { "type": "note", "at": "L9", "until": "L10", "text": "public function store(Request $request)", "x": 15, "y": 32, "w": 70, "mono": true, "tone": "ok" },
    { "type": "text", "at": "L9", "until": "L10", "text": "👆 Laravel নিজেই ভরে দেয়", "x": 15, "y": 46, "w": 70, "tone": "ok" },

    { "type": "label", "at": "L10", "until": "L11", "text": "Service Container" },
    { "type": "line", "at": "L10", "until": "L11", "x": 36, "y": 45.5, "w": 28 },
    { "type": "box", "at": "L10", "until": "L11", "icon": "📦", "text": "Service Container", "x": 8, "y": 36, "w": 28, "tone": "accent" },
    { "type": "box", "at": "L10", "until": "L11", "icon": "👔", "text": "store(Request $request)", "x": 64, "y": 36, "w": 30 },
    { "type": "text", "at": "L10", "until": "L10.2", "text": "কী চাইছে? 👀", "x": 36, "y": 34, "w": 28 },
    { "type": "packet", "at": "L10.2", "until": "L11", "text": "🎁 Request", "from": 37, "to": 49, "y": 37, "w": 14, "tone": "ok" },

    { "type": "label", "at": "L11", "until": "L12", "text": "কর্মকর্তার কাজ" },
    { "type": "line", "at": "L11", "until": "L12", "x": 32, "y": 45.5, "w": 5 },
    { "type": "line", "at": "L11", "until": "L12", "x": 63, "y": 45.5, "w": 5 },
    { "type": "box", "at": "L11", "until": "L12", "icon": "📥", "text": "ফর্মের তথ্য পড়া", "x": 6, "y": 36, "w": 26 },
    { "type": "box", "at": "L11", "until": "L12", "icon": "🗄️", "text": "ডেটাবেস থেকে আনা", "x": 37, "y": 36, "w": 26 },
    { "type": "box", "at": "L11", "until": "L12", "icon": "📄", "text": "view ফেরত", "x": 68, "y": 36, "w": 26, "tone": "ok" }
]
```

## অংশ ৪: Artisan

L12
voice: আর কন্ট্রোলারের ফাইল হাতে লিখতে হয় না। চালান পি-এইচ-পি আর্টিসান মেক কোলন কন্ট্রোলার, তারপর নাম।
caption: আর controller-এর ফাইল হাতে লিখতে হয় না। চালান php artisan make:controller, তারপর নাম।
L13
voice: আর্টিসান হলো লারাভেলের কমান্ড লাইনের সহকারী। বলে দিলেই, সঠিক জায়গায় সঠিক কাঠামোর ফাইল বানিয়ে দেয়।
caption: Artisan হলো Laravel-এর কমান্ড লাইনের সহকারী। বলে দিলেই, সঠিক জায়গায় সঠিক কাঠামোর ফাইল বানিয়ে দেয়।

```json
[
    { "type": "label", "at": "L12", "until": "L13", "text": "হাতে লিখতে হয় না" },
    { "type": "note", "at": "L12.2", "until": "L14", "text": "$ php artisan make:controller PostController", "x": 12, "y": 32, "w": 76, "mono": true },
    { "type": "label", "at": "L13", "until": "L14", "text": "Artisan: কমান্ড লাইনের সহকারী 🤖", "tone": "accent" },
    { "type": "note", "at": "L13.2", "until": "L14", "text": "✓ app/Http/Controllers/PostController.php তৈরি", "x": 12, "y": 46, "w": 76, "mono": true, "tone": "ok" }
]
```

## অংশ ৫: সমন্বয়কারী

L14
voice: [serious] তবে একটা কথা মনে রাখবেন। কন্ট্রোলার কাজের সমন্বয়কারী, সব কাজ নিজে করার জায়গা নয়।
caption: তবে একটা কথা মনে রাখবেন। controller কাজের সমন্বয়কারী, সব কাজ নিজে করার জায়গা নয়।
L15
voice: কোনো মেথড শত লাইন ছাড়িয়ে গেলে, বুঝবেন কাজটা ভাগ করার সময় হয়েছে।
caption: কোনো মেথড শত লাইন ছাড়িয়ে গেলে, বুঝবেন কাজটা ভাগ করার সময় হয়েছে।
L16
voice: এখনই একটা পোস্ট কন্ট্রোলার বানিয়ে, একটা রাউটকে তার ইনডেক্স মেথডের দিকে পাঠিয়ে দেখুন।
caption: এখনই একটা PostController বানিয়ে, একটা route-কে তার index মেথডের দিকে পাঠিয়ে দেখুন।

```json
[
    { "type": "label", "at": "L14", "until": "L16", "text": "সাবধান", "tone": "danger" },
    { "type": "box", "at": "L14.2", "until": "L15", "icon": "👔", "text": "সমন্বয়কারী, সব কাজের জায়গা নয়", "x": 25, "y": 32, "w": 50, "tone": "accent" },
    { "type": "note", "at": "L15", "until": "L16", "text": "public function store(…) { … 150 লাইন … }", "x": 15, "y": 30, "w": 70, "mono": true, "tone": "danger" },
    { "type": "text", "at": "L15", "until": "L16", "text": "✂️ কাজটা ভাগ করার সময় হয়েছে", "x": 15, "y": 44, "w": 70, "tone": "ok" },
    { "type": "label", "at": "L16", "until": "end", "text": "নিজে করে দেখুন 👀", "tone": "accent" },
    { "type": "note", "at": "L16", "until": "end", "text": "$ php artisan make:controller PostController", "x": 10, "y": 28, "w": 80, "mono": true },
    { "type": "note", "at": "L16", "until": "end", "text": "Route::get('/posts', [PostController::class, 'index']);", "x": 10, "y": 40, "w": 80, "mono": true, "tone": "ok" }
]
```
