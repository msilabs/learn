# Laravel course: পরিকল্পনা

## লক্ষ্য

- **দর্শক:** PHP জানেন, Laravel-এ নতুন।
- **প্রতিশ্রুতি:** Laravel-এর ভেতরের ধারণা পরিষ্কার হবে। "Laravel শিখে ফেলবেন" বা "production developer" দাবি নয়।
- **পাঠ শেষে দর্শক:** যেকোনো Laravel প্রজেক্ট খুলে চিনবেন কোন ফাইল কী করে, request কোন পথে যায়, কিছু না চললে কোথায় খুঁজবেন। documentation পাশে রেখে ছোট CRUD আর login বানাতে পারবেন।
- **বাদ:** service, action, API Resource, repository, Service Container-এর গভীরে, Facade, queue, event, API।

## পুরো course-এর উপমা: অফিস ভবন

| Laravel | অফিস |
| --- | --- |
| `public/index.php` | মূল ফটক |
| route | রিসেপশন আর তার তালিকা |
| middleware | নিরাপত্তারক্ষী |
| controller | কর্মকর্তা |
| model | রেকর্ড রুম |
| view / Blade | ছাপানো চিঠির প্যাড |
| `.env` | ম্যানেজারের তালাবন্ধ ড্রয়ার |
| migration | আলমারির নকশার নির্দেশপত্র |
| session | ভিজিটর পাস |
| CSRF token | অফিসের গোপন সিল |
| Artisan | অফিসের সহকারী |

উদাহরণের ডেটা সব পাঠে "post"। প্রতিটা পাঠ একা দেখলেও বোঝা যায়, আগের পাঠের উপর নির্ভর করে না।

## পাঠের তালিকা

ক্রম: আগে কিছু চলতে দেখা, তারপর একটা একটা টুকরো যোগ। request-এর পথের ক্রম নয়।

ফোল্ডারের নম্বর শুধু ক্রমের জন্য। slug আর URL-এ নম্বর নেই: `01-request-lifecycle/` ফোল্ডারের পাঠের URL `/laravel/request-lifecycle/`।

| # | ফোল্ডার (`drafts/laravel/`) | শিরোনাম (খসড়া) | og_icon | og_text | মূল কথা |
| --- | --- | --- | --- | --- | --- |
| **ভাগ ১: URL থেকে পেইজ** | | | | | |
| 1 | `01-request-lifecycle` | Laravel-এ একটা request-এর যাত্রা | 🏢 | Request | সব request এক দরজা দিয়ে ঢোকে, তারপর route, middleware, controller, model, view |
| 2 | `02-routing` | Route কীভাবে কাজ করে | 🧭 | Route | URL আর method দেখে কোড, `{id}`, নাম, 404 |
| 3 | `03-blade` | Blade দিয়ে পেইজ বানানো | 📄 | Blade | view, layout, PHP-তে compile, `{{ }}` বনাম `{!! !!}` |
| 4 | `04-controller` | Controller কেন লাগে | 👔 | Controller | route পাতলা, কাজ controller-এ, `Request` নিজে আসে, `make:controller` |
| 5 | `05-mvc` | MVC: কে কোন কাজ করে | 🧩 | MVC | তিন ঘরে ভাগ, কেউ কারও কাজে নাক গলায় না, view-এ query নয় |
| **ভাগ ২: ডেটা** | | | | | |
| 6 | `06-env-config` | `.env` আর config | 🔐 | .env | গোপন তথ্য কোডের বাইরে, `config()` বনাম `env()`, `APP_DEBUG` |
| 7 | `07-migration` | Migration: database-এর version control | 🗂️ | Migration | up/down, `migrations` table, চলে যাওয়া migration বদলাবেন না |
| 8 | `08-eloquent` | Model আর Eloquent | 🗄️ | Eloquent | table মানে class, row মানে object, binding, SQL আড়াল হয়, দূর হয় না |
| 9 | `09-relationship` | Relationship আর N+1 | 🔗 | Relationship | `belongsTo`, `hasMany`, `belongsToMany`, `with()` |
| **ভাগ ৩: form আর ব্যবহারকারী** | | | | | |
| 10 | `10-validation` | Request আর Validation | ✅ | Validation | নিয়ম, ভুলে ফেরত, Form Request, ব্রাউজারের যাচাই যথেষ্ট নয় |
| 11 | `11-csrf` | CSRF কী, আর `@csrf` কেন | 🛡️ | CSRF | জাল request, টোকেন, 419, `GET`-এ কিছু বদলাবেন না |
| 12 | `12-authentication` | Session আর login | 🪪 | Login | HTTP-র স্মৃতি নেই, session cookie, hash, starter kit, লগআউট |
| 13 | `13-middleware` | Middleware: পথের পাহারাদার | 💂 | Middleware | `auth`, group, পেঁয়াজের স্তর, ভুলে যাওয়া route খোলা |
| **শেষ** | | | | | |
| 14 | `14-folder-structure` | সব কোথায় থাকে | 🗺️ | Folders | ফোল্ডার, Composer আর `vendor`, Artisan, শুধু `public` খোলা |

শিরোনাম, `og_icon` আর `og_text` সব খসড়া। ড্রাফট লেখার সময় চূড়ান্ত হবে।

## script-এর অবস্থা

১৪টা `.voice.txt` লেখা আছে, মালিকের দেখার অপেক্ষায়। প্রতিটা ১৮৬–২০৪ শব্দ (প্রায় ৮৫–৯৩ সেকেন্ড), ১৬–১৭টা অনুচ্ছেদ, ৩টা expression tag, কোনো বাক্য ৯০ অক্ষরের বেশি নয়।

এখনো `.md` ড্রাফট নেই। সাধারণ নিয়মে `.voice.txt` তৈরি হয় ড্রাফট থেকে। এখানে উল্টো: আগে script, তারপর মালিক রাজি হলে script থেকে হুবহু ড্রাফট লেখা হবে। `lesson.mjs voice` চালালে ড্রাফট থেকে `.voice.txt` আবার লেখা হয়, তাই ড্রাফটের voice অক্ষরে অক্ষরে মিলতে হবে।

## [যাচাই] মালিকের জন্য

- **পাঠ ১:** কিছু middleware সব request-এ route মেলানোর আগেই চলে। পাঠে শুধু "রিসেপশনের পরে পাহারাদার" দেখানো হয়েছে। নতুনদের জন্য সরল করা।
- **পাঠ ১, ১৪:** Laravel 11 থেকে `app/Http/Kernel.php` নেই। তাই version-নির্ভর ফাইলের নাম বাদ, শুধু `public/index.php` আর মূল ফোল্ডারগুলো।
- **পাঠ ৪:** `Request` নিজে থেকে আসার কারণ হিসেবে Service Container-এর নাম একবার বলা হয়েছে, গভীরে যাওয়া হয়নি।
- **পাঠ ৬:** config cache থাকলে config ফাইলের বাইরে `env()` মান পায় না।
- **পাঠ ১২:** session cookie-র নাম `APP_NAME` থেকে আসে, যেমন `laravel_session`। তাই script-এ বলা আছে "নামের শেষে সেশন লেখা কুকি"। starter kit-এর নাম বলা হয়নি, কারণ Laravel 12-এ সেটা বদলেছে।
- **পাঠ ১৩:** `php artisan route:list -v` middleware দেখায়।
- **পাঠ ২:** উদাহরণের "post" আর HTTP-র `POST` শুনতে এক। caption-এ `POST` আলাদা দেখাবে, তবুও শুনে গুলিয়ে যেতে পারে।
- **পাঠ ১৪:** শেষ পাঠ। শেষে হাতে-কলমে চর্চার জন্য কোথায় যাবেন, এমন একটা লাইন যোগ করা যায়।

## দৃশ্য

- **শুরুতে মানচিত্র:** প্রতিটা পাঠের প্রথম কয়েক সেকেন্ডে অফিস ভবনের ছোট মানচিত্র, আজকের ঘরটা `accent` রঙে। এখনকার `box` আর `line` দিয়েই হবে।
- **কোড দেখানো (প্রস্তাব, এখনো বানানো হয়নি):** পাঠ ২, ৩, ৪, ৭, ৮, ৯, ১০-এ ২–৫ লাইনের কোড দেখাতে হবে। এখন আছে শুধু `note`-এর `mono`, যাতে এক লাইনের কোড আঁটে। একটা `code` উপাদান লাগবে কি না, পাঠ ২-এর দৃশ্য বানানোর আগে মালিকের সিদ্ধান্ত লাগবে।
- **উপমা পর্দায়:** ফটক, রিসেপশন, রক্ষী, কর্মকর্তা, রেকর্ড রুম সব emoji আর `box` দিয়ে, প্রতিটা পাঠে একই emoji: 🚪 ফটক, 🛎️ রিসেপশন, 💂 রক্ষী, 👔 কর্মকর্তা, 🗄️ রেকর্ড রুম, 📄 চিঠি।

## course-এর কাজ (প্রথম পাঠ sync করার আগে)

- [ ] `data/courses.json`-এর বর্ণনা বদলানো। প্রস্তাব: "PHP জানেন? এবার Laravel-এর ভেতরের ধারণাগুলো পরিষ্কার করুন: request, route, controller, model, middleware, ছোট ছোট animated পাঠে।" (মালিকের সম্মতি লাগবে)
- [ ] `pages/laravel/[slug]/page.alo`: `pages/web/[slug]/page.alo` থেকে হুবহু কপি।
- [ ] `public/og/laravel.jpg` আছে। বর্ণনা বদলালেও ছবি বদলায় না, তাই আবার বানাতে হবে না।
- [ ] `status: "soon"` সরানো: ভাগ ১-এর পাঠ প্রকাশ হলে, মালিককে জিজ্ঞেস করে।

## প্রতিটা পাঠের ধাপ

1. মালিক `.voice.txt` পড়ে দরকার হলে বদলান, তারপর ElevenLabs-এ অডিও বানিয়ে `public/audio/laravel/`-এ রাখেন।
2. Claude `.voice.txt` থেকে হুবহু `drafts/laravel/<NN>-<slug>/<slug>.md` লেখে: caption, দৃশ্য, frontmatter।
3. `node tools/lesson.mjs voice laravel <slug>`, তারপর `diff` করে দেখা যে কিছু বদলায়নি।
4. `node tools/lesson.mjs og laravel <slug>`
5. `ffmpeg -i <ফাইল> -ac 1 -b:a 64k public/audio/laravel/<slug>.mp3`। আসল ফাইল scratchpad-এ সরিয়ে রাখা হবে।
6. `node tools/lesson.mjs sync laravel <slug>`
7. `node alo build`, headless Chrome-এ screenshot নিয়ে যাচাই, শেষে ড্রাফটে `status: synced`।

## প্রকাশের ক্রম

ভাগ ১ (পাঠ ১–৫) আগে, একসাথে বা পর পর। তারপর সাড়া দেখে ভাগ ২ আর ৩। ১৪ নম্বরটা সবার শেষে।
