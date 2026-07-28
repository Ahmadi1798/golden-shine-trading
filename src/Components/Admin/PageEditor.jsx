'use client';

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Badge } from '../ui';
import { useLanguage } from '../../context/LanguageContext';

const localeByLanguage = {
  en: 'en-US',
  fa: 'fa-IR',
  ps: 'ps-AF',
};

const fieldLabelTranslations = {
  fa: {
    Title: 'عنوان',
    Date: 'تاریخ',
    'Image URL': 'آدرس تصویر',
    'Link URL': 'آدرس لینک',
    Excerpt: 'خلاصه',
    'Full Content (detail page)': 'محتوای کامل (صفحه جزئیات)',
    'Key Insights (one per line)': 'نکته های کلیدی (هر خط یک مورد)',
    'Next Steps': 'گام های بعدی',
    Description: 'توضیح',
    Eyebrow: 'تیتر کوتاه',
    Heading: 'سرفصل',
    'Slide Image URL': 'آدرس تصویر اسلاید',
    'Slide Image Alt Text': 'متن جایگزین تصویر اسلاید',
    'Primary CTA Label': 'برچسب اقدام اصلی',
    'Primary CTA URL': 'آدرس اقدام اصلی',
    'Secondary CTA Label': 'برچسب اقدام ثانویه',
    'Secondary CTA URL': 'آدرس اقدام ثانویه',
    'Stat Label': 'برچسب آمار',
    'Stat Value': 'مقدار آمار',
    Question: 'پرسش',
    Answer: 'پاسخ',
    Name: 'نام',
    Role: 'نقش',
    'Photo URL': 'آدرس عکس',
    Bio: 'بیوگرافی',
    'Facebook URL': 'آدرس فیسبوک',
    'LinkedIn URL': 'آدرس لینکدین',
    'X/Twitter URL': 'آدرس ایکس/توییتر',
    'Instagram URL': 'آدرس اینستاگرام',
    'Hero Image URL': 'آدرس تصویر هیرو',
    'Video URL': 'آدرس ویدیو',
    'Video Poster URL': 'آدرس پوستر ویدیو',
    'CTA Label': 'برچسب اقدام',
    'CTA URL': 'آدرس اقدام',
    Features: 'ویژگی ها',
    Services: 'خدمات',
    Projects: 'پروژه ها',
    Posts: 'نوشته ها',
    'FAQ Items': 'آیتم های پرسش های متداول',
    Steps: 'گام ها',
    'Image Alt': 'متن جایگزین تصویر',
    'Image Alt Text': 'متن جایگزین تصویر',
    'Background Image URL': 'آدرس تصویر پس زمینه',
    'Team Members': 'اعضای تیم',
    'Team Values': 'ارزش های تیم',
    'Section Title': 'عنوان بخش',
    Content: 'محتوا',
  },
  ps: {
    Title: 'سرلیک',
    Date: 'نېټه',
    'Image URL': 'د انځور پته',
    'Link URL': 'د لینک پته',
    Excerpt: 'لنډیز',
    'Full Content (detail page)': 'بشپړ منځپانګه (تفصیلي پاڼه)',
    'Key Insights (one per line)': 'مهم ټکي (په هره کرښه کې یو)',
    'Next Steps': 'راتلونکي ګامونه',
    Description: 'تشریح',
    Eyebrow: 'لنډ سرلیک',
    Heading: 'اصلي سرلیک',
    'Slide Image URL': 'د سلایډ انځور پته',
    'Slide Image Alt Text': 'د سلایډ انځور بدیل متن',
    'Primary CTA Label': 'اصلي اقدام لیکنه',
    'Primary CTA URL': 'د اصلي اقدام پته',
    'Secondary CTA Label': 'ثانوي اقدام لیکنه',
    'Secondary CTA URL': 'د ثانوي اقدام پته',
    'Stat Label': 'د احصایې لیکنه',
    'Stat Value': 'د احصایې ارزښت',
    Question: 'پوښتنه',
    Answer: 'ځواب',
    Name: 'نوم',
    Role: 'دنده',
    'Photo URL': 'د انځور پته',
    Bio: 'بیو',
    'Facebook URL': 'د فیسبوک پته',
    'LinkedIn URL': 'د لینکډین پته',
    'X/Twitter URL': 'د اېکس/ټوېټر پته',
    'Instagram URL': 'د انسټاګرام پته',
    'Hero Image URL': 'د هیرو انځور پته',
    'Video URL': 'د ویډیو پته',
    'Video Poster URL': 'د ویډیو پوسټر پته',
    'CTA Label': 'د اقدام لیکنه',
    'CTA URL': 'د اقدام پته',
    Features: 'ځانګړتیاوې',
    Services: 'خدمتونه',
    Projects: 'پروژې',
    Posts: 'لیکنې',
    'FAQ Items': 'د پوښتنو توکي',
    Steps: 'ګامونه',
    'Image Alt': 'د انځور بدیل متن',
    'Image Alt Text': 'د انځور بدیل متن',
    'Background Image URL': 'د شالید انځور پته',
    'Team Members': 'د ټیم غړي',
    'Team Values': 'د ټیم ارزښتونه',
    'Section Title': 'د برخې سرلیک',
    Content: 'منځپانګه',
  },
};

const sectionKindLabelTranslations = {
  fa: {
    homehero: 'هیروی خانه',
    homeheroslider: 'اسلایدر هیروی خانه',
    homeservices: 'پیش نمایش خدمات',
    features: 'چرا ما / ویژگی ها',
    process: 'فرایند',
    homeportfolio: 'تیزر نمونه کار',
    homeblog: 'تیزر وبلاگ',
    homefaq: 'پرسش های متداول',
    cta: 'فراخوان اقدام',
    abouthero: 'هیروی درباره',
    story: 'داستان ما',
    values: 'ارزش های اصلی',
    serviceshero: 'هیروی خدمات',
    serviceslist: 'فهرست خدمات',
    portfoliohero: 'هیروی نمونه کار',
    projectsgallery: 'گالری پروژه ها',
    bloghero: 'هیروی وبلاگ',
    blogposts: 'نوشته های وبلاگ',
    contact: 'بخش تماس',
    teamhero: 'هیروی تیم',
    teamstats: 'آمار تیم',
    teammembers: 'اعضای تیم',
    teamvalues: 'ارزش های تیم',
  },
  ps: {
    homehero: 'د کور هیرو',
    homeheroslider: 'د کور هیرو سلایډر',
    homeservices: 'د خدمتونو لنډه بڼه',
    features: 'ولې موږ / ځانګړتیاوې',
    process: 'بهیر',
    homeportfolio: 'د پروژو ټیزر',
    homeblog: 'د بلاګ ټیزر',
    homefaq: 'ډېرې پوښتنې',
    cta: 'د اقدام بلنه',
    abouthero: 'د زموږ په اړه هیرو',
    story: 'موږ څوک یو',
    values: 'اصلي ارزښتونه',
    serviceshero: 'د خدمتونو هیرو',
    serviceslist: 'د خدمتونو لست',
    portfoliohero: 'د پروژو هیرو',
    projectsgallery: 'د پروژو ګالري',
    bloghero: 'د بلاګ هیرو',
    blogposts: 'د بلاګ لیکنې',
    contact: 'د اړیکې برخه',
    teamhero: 'د ټیم هیرو',
    teamstats: 'د ټیم احصایه',
    teammembers: 'د ټیم غړي',
    teamvalues: 'د ټیم ارزښتونه',
  },
};

const sectionKindDescriptionTranslations = {
  fa: {
    homehero: 'تیتر اصلی، متن پشتیبان و دکمه های اقدام.',
    homeheroslider: 'هیروی اسلایدی تمام عرض با متن، دکمه ها و آمار هر اسلاید.',
    homeservices: 'شبکه معرفی خدمات با دکمه اقدام اختیاری.',
    features: 'نکات ارزش پیشنهادی و متن پشتیبان.',
    process: 'بخش مراحل کار به صورت گام به گام.',
    homeportfolio: 'کارت های پروژه های منتخب با لینک.',
    homeblog: 'کارت های پیش نمایش تازه ترین نوشته ها.',
    homefaq: 'پرسش های متداول با حالت آکاردئونی.',
    cta: 'بلاک فراخوان اقدام برای تبدیل بهتر.',
    abouthero: 'مقدمه صفحه درباره با رسانه اختیاری.',
    story: 'روایت ما با تصویر.',
    values: 'کارت های ارزش های اصلی.',
    serviceshero: 'هیروی معرفی خدمات با اقدام.',
    serviceslist: 'فهرست ساختاریافته خدمات.',
    portfoliohero: 'معرفی صفحه نمونه کار.',
    projectsgallery: 'گالری پروژه ها.',
    bloghero: 'معرفی صفحه وبلاگ.',
    blogposts: 'فهرست/کارت های نوشته های وبلاگ.',
    contact: 'اطلاعات تماس و بخش ارسال پیام.',
    teamhero: 'معرفی صفحه تیم با تیتر کوتاه، عنوان و توضیح.',
    teamstats: 'نوار آمار متحرک برای شاخص های کلیدی.',
    teammembers: 'کارت اعضای تیم با عکس، بیو و شبکه های اجتماعی.',
    teamvalues: 'ارزش های تیم به صورت کارت های شماره دار.',
  },
  ps: {
    homehero: 'اصلي سرلیک، مرسته کوونکی متن او د اقدام بټنونه.',
    homeheroslider: 'پراخ هیرو سلایډر له متن، اقدام او احصایې سره.',
    homeservices: 'د خدمتونو گرېډ له اختیاري اقدام سره.',
    features: 'د ارزښت مهم ټکي او مرسته کوونکی متن.',
    process: 'د کار بهیر په ګام په ګام بڼه.',
    homeportfolio: 'د غوره پروژو کارتونه له لینکونو سره.',
    homeblog: 'د وروستیو لیکنو لنډ کارتونه.',
    homefaq: 'د پوښتنو ځوابونو اکارډیوني برخه.',
    cta: 'د تبدیلاتو لپاره د اقدام بلاک.',
    abouthero: 'د About پاڼې پېژندنه له اختیاري رسنۍ سره.',
    story: 'موږ څوک یو کیسه له انځور سره.',
    values: 'د اصلي ارزښتونو کارتونه.',
    serviceshero: 'د خدمتونو د پاڼې هیرو او اقدام.',
    serviceslist: 'د خدمتونو منظم لست.',
    portfoliohero: 'د پروژو پاڼې پېژندنه.',
    projectsgallery: 'د پروژو ګالري برخه.',
    bloghero: 'د بلاګ پاڼې پېژندنه.',
    blogposts: 'د بلاګ لیکنو لست/کارتونه.',
    contact: 'د اړیکې معلومات او فورم برخه.',
    teamhero: 'د ټیم پاڼې پېژندنه.',
    teamstats: 'د شرکت کلیدي شمېرو ښودلو پټه.',
    teammembers: 'د ټیم غړو کارتونه له انځور او بیو سره.',
    teamvalues: 'د ټیم ارزښتونه په شمېرل شوو کارتونو کې.',
  },
};

const groupLabelTranslations = {
  fa: { content: 'محتوا', media: 'رسانه', actions: 'اقدامات', advanced: 'پیشرفته' },
  ps: { content: 'منځپانګه', media: 'رسنۍ', actions: 'اقدامونه', advanced: 'پرمختللی' },
};

const SECTION_ALIASES = {
  hero: 'homehero',
  herosection: 'homehero',
  homehero: 'homehero',
  homeheroslider: 'homeheroslider',
  heroslider: 'homeheroslider',
  sliderhero: 'homeheroslider',
  sliderherosection: 'homeheroslider',
  services: 'homeservices',
  servicespreview: 'homeservices',
  testimonials: 'features',
  testimonial: 'features',
  testimonails: 'features',
  whychooseus: 'features',
  process: 'process',
  ourprocess: 'process',
  portfolio: 'homeportfolio',
  projectsteaser: 'homeportfolio',
  blog: 'homeblog',
  blogteaser: 'homeblog',
  cta: 'cta',
  contact: 'contact',
  abouthero: 'abouthero',
  about: 'abouthero',
  whoweare: 'story',
  whowearesection: 'story',
  corevalues: 'values',
  values: 'values',
  ourapproach: 'process',
  serviceshero: 'serviceshero',
  serviceslist: 'serviceslist',
  servicesoverview: 'serviceslist',
  list: 'serviceslist',
  bloghero: 'bloghero',
  blogposts: 'blogposts',
  posts: 'blogposts',
  portfoliohero: 'portfoliohero',
  projectsgallery: 'projectsgallery',
  projects: 'projectsgallery',
  aboutcta: 'cta',
  blogcta: 'cta',
  portfoliocta: 'cta',
  protfoliocta: 'cta',
  servicescta: 'cta',
  contactform: 'contact',
  team: 'teamhero',
  teamhero: 'teamhero',
  teamstats: 'teamstats',
  teammembers: 'teammembers',
  teamvalues: 'teamvalues',
  teamsection: 'teammembers',
};

const EXPECTED_SECTION_KINDS_BY_SLUG = {
  home: ['homehero', 'homeservices', 'features', 'process', 'homeportfolio', 'homeblog', 'cta'],
  about: ['abouthero', 'story', 'values', 'process', 'cta'],
  services: ['serviceshero', 'serviceslist', 'cta'],
  portfolio: ['portfoliohero', 'projectsgallery', 'cta'],
  blog: ['bloghero', 'blogposts', 'cta'],
  contact: ['contact'],
  team: ['teamhero', 'teamstats', 'teammembers', 'teamvalues'],
};

const OPTIONAL_SECTION_LIBRARY_KINDS_BY_SLUG = {
  home: ['homeheroslider', 'homefaq'],
};

const CANONICAL_SECTION_KEY_BY_SLUG_AND_KIND = {
  home: {
    homehero: 'hero',
    homeheroslider: 'hero-slider',
    homeservices: 'services',
    features: 'testimonials',
    process: 'process',
    homeportfolio: 'portfolio',
    homeblog: 'blog',
    homefaq: 'faq',
    cta: 'cta',
  },
  about: {
    abouthero: 'abouthero',
    story: 'whoweare',
    values: 'corevalues',
    process: 'ourapproach',
    cta: 'aboutcta',
  },
  services: {
    serviceshero: 'serviceshero',
    serviceslist: 'serviceslist',
    cta: 'servicescta',
  },
  portfolio: {
    portfoliohero: 'portfoliohero',
    projectsgallery: 'projectsgallery',
    cta: 'portfoliocta',
  },
  blog: {
    bloghero: 'bloghero',
    blogposts: 'blogposts',
    cta: 'blogcta',
  },
  contact: {
    contact: 'contact',
  },
  team: {
    teamhero: 'teamhero',
    teamstats: 'teamstats',
    teammembers: 'teammembers',
    teamvalues: 'teamvalues',
  },
};

const ITEM_FIELD_SCHEMAS = {
  posts: [
    { key: 'title', label: 'Title' },
    { key: 'date', label: 'Date' },
    { key: 'image', label: 'Image URL', mediaType: 'image' },
    { key: 'link', label: 'Link URL' },
    { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
    { key: 'content', label: 'Full Content (detail page)', type: 'textarea' },
    { key: 'keyInsights', label: 'Key Insights (one per line)', type: 'textarea' },
    { key: 'nextSteps', label: 'Next Steps', type: 'textarea' },
  ],
  projects: [
    { key: 'title', label: 'Title' },
    { key: 'image', label: 'Image URL', mediaType: 'image' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ],
  services: [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ],
  steps: [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ],
  heroSlides: [
    { key: 'eyebrow', label: 'Eyebrow' },
    { key: 'heading', label: 'Heading' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'imageUrl', label: 'Slide Image URL', mediaType: 'image' },
    { key: 'imageAlt', label: 'Slide Image Alt Text' },
    { key: 'ctaLabel', label: 'Primary CTA Label' },
    { key: 'ctaHref', label: 'Primary CTA URL' },
    { key: 'secondaryCtaLabel', label: 'Secondary CTA Label' },
    { key: 'secondaryCtaHref', label: 'Secondary CTA URL' },
    { key: 'statLabel', label: 'Stat Label' },
    { key: 'statValue', label: 'Stat Value' },
  ],
  values: [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ],
  faqs: [
    { key: 'question', label: 'Question' },
    { key: 'answer', label: 'Answer', type: 'textarea' },
  ],
  teamMembers: [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'imageUrl', label: 'Photo URL', mediaType: 'image' },
    { key: 'bio', label: 'Bio', type: 'textarea' },
    { key: 'facebookUrl', label: 'Facebook URL' },
    { key: 'linkedinUrl', label: 'LinkedIn URL' },
    { key: 'xUrl', label: 'X/Twitter URL' },
    { key: 'instagramUrl', label: 'Instagram URL' },
  ],
};

const SECTION_FIELD_SCHEMAS = {
  homehero: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'imageUrl', label: 'Hero Image URL', type: 'text', mediaType: 'image' },
    { key: 'imageAlt', label: 'Hero Image Alt Text', type: 'text' },
    { key: 'ctaLabel', label: 'Primary CTA Label', type: 'text' },
    { key: 'ctaHref', label: 'Primary CTA URL', type: 'text' },
    { key: 'secondaryCtaLabel', label: 'Secondary CTA Label', type: 'text' },
    { key: 'secondaryCtaHref', label: 'Secondary CTA URL', type: 'text' },
    { key: 'ctaPrimary', label: 'Primary CTA Object', type: 'json' },
    { key: 'ctaSecondary', label: 'Secondary CTA Object', type: 'json' },
  ],
  homeheroslider: [
    { key: 'eyebrow', label: 'Section Eyebrow', type: 'text' },
    { key: 'autoplayDelay', label: 'Autoplay Delay (ms)', type: 'text' },
    { key: 'slides', label: 'Hero Slides', type: 'items', itemType: 'heroSlides' },
  ],
  abouthero: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'videoUrl', label: 'Background Video URL', type: 'text', mediaType: 'video' },
    { key: 'videoPoster', label: 'Background Video Poster URL', type: 'text', mediaType: 'image' },
    { key: 'ctaLabel', label: 'CTA Label', type: 'text' },
    { key: 'ctaHref', label: 'CTA URL', type: 'text' },
  ],
  serviceshero: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'ctaLabel', label: 'CTA Label', type: 'text' },
    { key: 'ctaHref', label: 'CTA URL', type: 'text' },
  ],
  homeservices: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'services', label: 'Service Items', type: 'items', itemType: 'services' },
    { key: 'ctaLabel', label: 'CTA Label', type: 'text' },
    { key: 'ctaHref', label: 'CTA URL', type: 'text' },
  ],
  serviceslist: [
    { key: 'services', label: 'Service Items', type: 'items', itemType: 'services' },
  ],
  homeportfolio: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'projects', label: 'Project Items', type: 'items', itemType: 'projects' },
    { key: 'ctaLabel', label: 'CTA Label', type: 'text' },
    { key: 'ctaHref', label: 'CTA URL', type: 'text' },
  ],
  projectsgallery: [
    { key: 'projects', label: 'Project Items', type: 'items', itemType: 'projects' },
  ],
  homeblog: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'posts', label: 'Post Items', type: 'items', itemType: 'posts' },
    { key: 'ctaLabel', label: 'CTA Label', type: 'text' },
    { key: 'ctaHref', label: 'CTA URL', type: 'text' },
  ],
  blogposts: [
    { key: 'posts', label: 'Post Items', type: 'items', itemType: 'posts' },
  ],
  portfoliohero: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ],
  bloghero: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ],
  story: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'paragraphOne', label: 'Paragraph One', type: 'textarea' },
    { key: 'paragraphTwo', label: 'Paragraph Two', type: 'textarea' },
    { key: 'imageUrl', label: 'Team Image URL', type: 'text', mediaType: 'image' },
    { key: 'imageAlt', label: 'Team Image Alt Text', type: 'text' },
  ],
  values: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'values', label: 'Value Items', type: 'items', itemType: 'values' },
  ],
  features: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'features', label: 'Features (one per line)', type: 'list' },
  ],
  homefaq: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'faqs', label: 'FAQ Items', type: 'items', itemType: 'faqs' },
  ],
  process: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'steps', label: 'Process Steps', type: 'items', itemType: 'steps' },
  ],
  contact: [
    { key: 'badge', label: 'Badge Label', type: 'text' },
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'formHeading', label: 'Form Heading', type: 'text' },
    { key: 'formDescription', label: 'Form Description', type: 'textarea' },
    { key: 'submitLabel', label: 'Submit Button Label', type: 'text' },
    { key: 'socialHeading', label: 'Social Section Heading', type: 'text' },
  ],
  teamhero: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ],
  teamstats: [
    { key: 'projectsDelivered', label: 'Projects Delivered', type: 'text' },
    { key: 'clientRating', label: 'Client Rating', type: 'text' },
    { key: 'yearsBuilding', label: 'Years Building', type: 'text' },
  ],
  teammembers: [
    { key: 'membersHeading', label: 'Heading', type: 'text' },
    { key: 'members', label: 'Team Members', type: 'items', itemType: 'teamMembers' },
  ],
  teamvalues: [
    { key: 'valuesHeading', label: 'Heading', type: 'text' },
    { key: 'values', label: 'Values', type: 'items', itemType: 'values' },
  ],
  cta: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'ctaLabel', label: 'CTA Label', type: 'text' },
    { key: 'ctaHref', label: 'CTA URL', type: 'text' },
  ],
  default: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'ctaLabel', label: 'CTA Label', type: 'text' },
    { key: 'ctaHref', label: 'CTA URL', type: 'text' },
  ],
};

const createEmptyItem = (itemType) => {
  if (itemType === 'posts') {
    return {
      title: '',
      date: '',
      image: '',
      link: '',
      excerpt: '',
      content: '',
      keyInsights: '',
      nextSteps: '',
    };
  }

  if (itemType === 'projects') {
    return {
      title: '',
      image: '',
      description: '',
    };
  }

  if (itemType === 'services' || itemType === 'steps' || itemType === 'values') {
    return {
      title: '',
      description: '',
    };
  }

  if (itemType === 'heroSlides') {
    return {
      eyebrow: '',
      heading: '',
      description: '',
      imageUrl: '',
      imageAlt: '',
      ctaLabel: '',
      ctaHref: '',
      secondaryCtaLabel: '',
      secondaryCtaHref: '',
      statLabel: '',
      statValue: '',
    };
  }

  if (itemType === 'faqs') {
    return {
      question: '',
      answer: '',
    };
  }

  if (itemType === 'teamMembers') {
    return {
      name: '',
      role: '',
      imageUrl: '',
      bio: '',
      facebookUrl: '',
      linkedinUrl: '',
      xUrl: '',
      instagramUrl: '',
    };
  }

  return {};
};

const stringifyJsonValue = (value) => {
  if (value === undefined) return '';
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return '';
  }
};

const normalizeSectionToken = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

const mediaAssetMatchesType = (asset, mediaType) => {
  if (!mediaType) return true;

  const assetType = String(asset?.type || '').toLowerCase();
  const mimeType = String(asset?.mimeType || '').toLowerCase();

  if (mediaType === 'image') {
    return assetType === 'image' || mimeType.startsWith('image/');
  }

  if (mediaType === 'video') {
    return assetType === 'video' || mimeType.startsWith('video/');
  }

  return true;
};

const getSectionKindForPage = (section, pageSlug) => {
  const rawKey = normalizeSectionToken(section.sectionKey || '');
  const rawType = normalizeSectionToken(section.sectionType || '');
  const keyKind = rawKey ? SECTION_ALIASES[rawKey] || rawKey : '';
  const typeKind = rawType ? SECTION_ALIASES[rawType] || rawType : '';
  const expectedKinds = [
    ...(EXPECTED_SECTION_KINDS_BY_SLUG[pageSlug] || []),
    ...(OPTIONAL_SECTION_LIBRARY_KINDS_BY_SLUG[pageSlug] || []),
  ];

  if (expectedKinds.length) {
    if (keyKind && expectedKinds.includes(keyKind)) return keyKind;
    if (typeKind && expectedKinds.includes(typeKind)) return typeKind;
  }

  return keyKind || typeKind || 'default';
};

const getSectionFieldSchema = (section, pageSlug) => {
  const kind = getSectionKindForPage(section, pageSlug);
  return SECTION_FIELD_SCHEMAS[kind] || SECTION_FIELD_SCHEMAS.default;
};

const getCanonicalSectionKey = (section, pageSlug, fallbackKey) => {
  const kind = getSectionKindForPage(section, pageSlug);
  const canonical = CANONICAL_SECTION_KEY_BY_SLUG_AND_KIND[pageSlug]?.[kind];
  return canonical || fallbackKey;
};

const humanizeLabel = (value = '') =>
  String(value)
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();

const DEFAULT_SECTION_CONTENT_BY_KIND = {
  homeheroslider: {
    eyebrow: 'Featured Highlights',
    autoplayDelay: '5000',
    slides: [
      {
        eyebrow: 'Creative Digital Studio',
        heading: 'Web Experiences That Look Bold and Convert Better',
        description:
          'We design and build modern websites with strong storytelling, clean UX, and measurable performance gains.',
        imageUrl: '/images/heroImage.webp',
        imageAlt: 'Creative team planning a digital campaign',
        ctaLabel: 'Explore Work',
        ctaHref: '/portfolio',
        secondaryCtaLabel: 'Start Project',
        secondaryCtaHref: '/contact',
        statLabel: 'Projects Delivered',
        statValue: '120+',
      },
      {
        eyebrow: 'Strategy + Design + Build',
        heading: 'From Discovery to Launch, We Build with Precision',
        description:
          'Every sprint combines brand thinking, interaction design, and robust engineering to move your business forward.',
        imageUrl: '/images/heroImage.webp',
        imageAlt: 'Design system wireframes and UI components on desk',
        ctaLabel: 'See Services',
        ctaHref: '/services',
        secondaryCtaLabel: 'Book a Call',
        secondaryCtaHref: '/contact',
        statLabel: 'Client Rating',
        statValue: '4.9/5',
      },
      {
        eyebrow: 'Built for Growth',
        heading: 'Launch Faster with a Team That Cares About Detail',
        description:
          'We help ambitious teams ship polished digital products without sacrificing accessibility, speed, or maintainability.',
        imageUrl: '/images/heroImage.webp',
        imageAlt: 'Laptop showing analytics dashboard with growth chart',
        ctaLabel: 'Read Insights',
        ctaHref: '/blog',
        secondaryCtaLabel: 'Contact Us',
        secondaryCtaHref: '/contact',
        statLabel: 'Years Building',
        statValue: '8+',
      },
    ],
  },
  homehero: {
    eyebrow: 'Creative Digital Studio',
    heading: 'Web Experiences That Look Bold and Convert Better',
    description:
      'We design and build modern websites with strong storytelling, clean UX, and measurable performance gains.',
    imageUrl: '/images/heroImage.webp',
    imageAlt: 'Creative team planning a digital campaign',
    ctaLabel: 'Explore Work',
    ctaHref: '/portfolio',
    secondaryCtaLabel: 'Start Project',
    secondaryCtaHref: '/contact',
  },
  homeservices: {
    heading: 'What We Do',
    description:
      'We help brands build user-focused digital experiences with scalable design and code.',
    services: [
      {
        title: 'Web Development',
        description:
          'High-performance websites using modern stacks like React and Tailwind.',
      },
      {
        title: 'UI/UX Design',
        description: 'User-first designs that balance aesthetics and functionality.',
      },
      {
        title: 'Digital Strategy',
        description: 'Clear and actionable strategies to launch and grow your product.',
      },
      {
        title: 'Performance Optimization',
        description: 'Speed, accessibility, and measurable improvements across your site.',
      },
    ],
    ctaLabel: 'View All Services',
    ctaHref: '/services',
  },
  features: {
    heading: 'Why Choose KarFamSoft?',
    description:
      'We bring clarity, design, and code together to help you build experiences that matter.',
    features: [
      'Proven experience with modern tech stacks',
      'Human-centered, design-first thinking',
      'Speed, responsiveness, and clean code',
      'Collaborative and transparent communication',
    ],
  },
  homeportfolio: {
    heading: 'Featured Projects',
    description: "A quick look at the work we've done for forward-thinking brands.",
    projects: [
      {
        title: 'TechNova Redesign',
        image: '/images/1.jpg',
        description: 'We helped TechNova boost engagement by 48% with a new brand and platform.',
      },
      {
        title: 'GlowCare Mobile App',
        image: '/images/2.jpg',
        description: 'Designed a smooth, wellness-first mobile app experience with React Native.',
      },
      {
        title: 'NovaFin Dashboard UI',
        image: '/images/3.jpg',
        description: 'Created a dashboard interface with real-time charts for a fintech client.',
      },
    ],
    ctaLabel: 'View Full Portfolio',
    ctaHref: '/portfolio',
  },
  homeblog: {
    heading: 'From the Blog',
    description: 'Insights and ideas from the KarFamSoft team to inspire your next project.',
    posts: [
      {
        title: 'The Power of Purposeful Design',
        image: '/blogs/1.jpg',
        date: 'May 2025',
        link: '/blog/the-power-of-purposeful-design',
        excerpt:
          'Discover how intentional design choices drive business growth and user engagement.',
        content:
          'Intentional design creates clarity, reduces friction, and builds trust across every step of the customer journey. When design is purposeful, users complete tasks faster and feel more confident about your brand.',
        keyInsights:
          'Align visual choices with business goals\nDesign for clarity before decoration\nContinuously test and refine key user flows',
        nextSteps:
          'Audit your top conversion journeys, simplify key interactions, and iterate based on measurable outcomes.',
      },
      {
        title: 'Top 5 Tools We Use to Build Scalable Websites',
        image: '/blogs/2.jpg',
        date: 'April 2025',
        link: '/blog/top-5-tools-we-use-to-build-scalable-websites',
        excerpt: 'Explore our favorite tools for building robust, scalable digital products.',
        content:
          'Scalability is less about one magic tool and more about combining the right stack with disciplined engineering practices. Our toolchain prioritizes reliability, maintainability, and delivery speed.',
        keyInsights:
          'Choose tools that fit your team skill set\nAutomate quality checks early\nStandardize architecture patterns across projects',
        nextSteps:
          'Review your stack bottlenecks, document standards, and automate repetitive workflows first.',
      },
      {
        title: 'Why Every Brand Needs a Design System',
        image: '/blogs/3.jpg',
        date: 'March 2025',
        link: '/blog/why-every-brand-needs-a-design-system',
        excerpt: 'Learn why a unified design system is essential for brand consistency and speed.',
        content:
          'A strong design system improves consistency, speeds delivery, and helps teams scale without losing quality. It aligns product, design, and engineering around reusable standards.',
        keyInsights:
          'Consistency builds trust\nReusable patterns reduce delivery time\nShared standards improve cross-team collaboration',
        nextSteps:
          'Start with core UI tokens and components, then document usage rules and governance workflows.',
      },
    ],
    ctaLabel: 'Visit Blog',
    ctaHref: '/blog',
  },
  abouthero: {
    heading: 'A Creative Partner for the Ambitious',
    description:
      'At KarFamSoft Agency, we create digital experiences that help brands grow, adapt, and thrive in a changing world.',
    ctaLabel: 'Contact Us',
    ctaHref: '/contact',
    videoUrl: '/videos/agency.mp4',
    videoPoster: '',
  },
  story: {
    heading: 'Who We Are',
    paragraphOne:
      'KarFamSoft Agency is a team of strategists, designers, and developers who believe in the power of purposeful creativity. We blend aesthetics with functionality to deliver digital solutions that are both visually compelling and strategically sound.',
    paragraphTwo:
      "Whether we're building a product from scratch or refining a platform, we bring full ownership, deep collaboration, and real curiosity to every project.",
    imageUrl: '',
    imageAlt: 'KarFamSoft team collaborating in a creative workspace',
  },
  values: {
    heading: 'What We Stand For',
    description:
      "At KarFamSoft Agency, we're guided by values that shape our work and relationships.",
    values: [
      {
        title: 'Craftsmanship',
        description: 'We obsess over the details that elevate good work to great experiences.',
      },
      {
        title: 'Clarity',
        description: 'We value honest, simple communication - no fluff, no jargon.',
      },
      {
        title: 'Agility',
        description: 'We adapt fast and build lean - because that is what real impact requires.',
      },
      {
        title: 'Long-Term Vision',
        description: 'We care about growth that lasts - in your brand, and our relationship.',
      },
    ],
  },
  process: {
    heading: 'Our Approach',
    description:
      'We combine strategy, design, and technology in a collaborative process that drives clarity, speed, and results.',
    steps: [
      {
        title: 'Discover',
        description:
          'We listen deeply and define what success looks like - grounded in user needs and business goals.',
      },
      {
        title: 'Design',
        description:
          'We translate ideas into visual systems and intuitive experiences that elevate your brand.',
      },
      {
        title: 'Develop',
        description:
          'We build scalable, clean, and responsive systems using modern, maintainable technologies.',
      },
      {
        title: 'Deliver & Evolve',
        description:
          'We launch, optimize, and support continuous growth - because good digital never stops.',
      },
    ],
  },
  cta: {
    heading: "Let's Build Something Meaningful Together",
    description:
      "Whether you're launching a new brand, building a product, or reimagining your digital experience - KarFamSoft Agency is ready to partner with you.",
    ctaLabel: 'Contact Us',
    ctaHref: '/contact',
  },
  contact: {
    badge: 'Contact Us',
    heading: "Let's Connect",
    description:
      'Got a project in mind? Fill out the form or reach out via email - we would love to hear from you.',
    formHeading: 'Start a Project Conversation',
    formDescription:
      'Share a few details and our team will respond with a clear next step.',
    submitLabel: 'Send Message',
    socialHeading: 'Follow Us',
  },
};

const DEFAULT_SECTION_CONTENT_BY_PAGE_AND_KIND = {
  home: {
    process: {
      heading: 'Our Process',
      description:
        'Our process merges strategy, design, and development into one seamless journey.',
      steps: [
        {
          title: 'Discover',
          description: 'We listen, align on goals, and explore opportunities.',
        },
        {
          title: 'Design',
          description: 'We craft intuitive, elegant, and user-focused visuals.',
        },
        {
          title: 'Develop',
          description: 'We build clean, scalable, and responsive digital products.',
        },
        {
          title: 'Deliver & Evolve',
          description: 'We launch, measure, and improve continuously.',
        },
      ],
    },
    faq: {
      heading: 'Frequently Asked Questions',
      description: 'Quick answers to common questions about working with us.',
      faqs: [
        {
          question: 'What services does KarFamSoft offer?',
          answer: 'We provide web development, UI/UX design, digital strategy, mobile app design, SEO optimization, and brand identity services.',
        },
        {
          question: 'How long does a typical project take?',
          answer: 'Timelines vary depending on scope, but most projects range from 4 to 12 weeks from discovery to launch.',
        },
        {
          question: 'Do you work with startups and small businesses?',
          answer: 'Yes. We work with businesses of all sizes — from early-stage startups to established brands looking to refresh their digital presence.',
        },
        {
          question: 'What is your design process like?',
          answer: 'We follow a structured process: discover, design, develop, and deliver. Every phase includes collaboration and feedback loops to ensure alignment.',
        },
      ],
    },
    cta: {
      heading: 'Ready to bring your vision to life?',
      description: "Let's collaborate on something impactful and innovative.",
      ctaLabel: 'Start a Project',
      ctaHref: '/contact',
    },
  },
  services: {
    serviceshero: {
      heading: 'Our Services',
      description:
        'From concept to execution, we craft scalable digital services that blend strategy, design, and engineering.',
      ctaLabel: 'Get in Touch',
      ctaHref: '/contact',
    },
    serviceslist: {
      services: [
        {
          title: 'Web Development',
          description:
            'Modern, responsive websites built for performance, scalability, and user experience.',
        },
        {
          title: 'UI/UX Design',
          description:
            'Human-centered design systems that deliver beauty, usability, and consistency.',
        },
        {
          title: 'Digital Strategy',
          description:
            'We help define goals and roadmap digital success aligned to your business needs.',
        },
        {
          title: 'Mobile App Design',
          description:
            'Designing sleek mobile-first experiences your users will love across all devices.',
        },
        {
          title: 'SEO & Web Optimization',
          description:
            'Optimized for discoverability and speed to drive organic traffic and user retention.',
        },
        {
          title: 'Brand Identity',
          description:
            'Logo, typography, color systems and brand collateral built to resonate and scale.',
        },
      ],
    },
    cta: {
      heading: "Let's Bring Your Vision to Life",
      description:
        'Whether you need a complete digital overhaul or a small strategic shift, KarFamSoft Agency is ready to collaborate.',
      ctaLabel: 'Contact Us',
      ctaHref: '/contact',
    },
  },
  about: {
    cta: {
      heading: "Let's Build Something Meaningful Together",
      description:
        "Whether you're launching a new brand, building a product, or reimagining your digital experience - KarFamSoft Agency is ready to partner with you.",
      ctaLabel: 'Contact Us',
      ctaHref: '/contact',
    },
  },
  portfolio: {
    portfoliohero: {
      heading: 'Our Work',
      description:
        'Real results, creative execution, and scalable design - here\'s what we\'ve built for brands that trust us.',
    },
    projectsgallery: {
      projects: [
        {
          title: 'TechNova Redesign',
          image: '/images/1.jpg',
          description:
            'Full website redesign + SEO optimization. Increased engagement by 48%.',
        },
        {
          title: 'GlowCare App UI',
          image: '/images/2.jpg',
          description:
            'Mobile app design for a wellness startup. Built with Figma + React Native.',
        },
        {
          title: 'NovaFin Dashboard',
          image: '/images/3.jpg',
          description:
            'Custom dashboard UI with Tailwind and chart integrations for a fintech product.',
        },
        {
          title: 'Brand Identity for Clover',
          image: '/images/4.jpg',
          description:
            'Logo, typography, and print collateral for a sustainable clothing brand.',
        },
        {
          title: 'Analytics Dashboard for InsightPro',
          image: '/images/5.jpg',
          description:
            'Custom admin panel with live data integration and KPIs for executives.',
        },
        {
          title: 'UX Collaboration Platform',
          image: '/images/6.jpg',
          description:
            'Built a real-time interface for designers and PMs to co-edit mockups.',
        },
      ],
    },
    cta: {
      heading: 'Impressed by Our Work?',
      description:
        "Let's collaborate to turn your ideas into reality. KarFamSoft Agency is ready to build with you.",
      ctaLabel: 'Start a Project',
      ctaHref: '/contact',
    },
  },
  blog: {
    bloghero: {
      heading: 'Insights & Ideas',
      description:
        'Discover thoughts, tips, and strategies from the KarFamSoft team - where design meets innovation.',
    },
    blogposts: {
      posts: [
        {
          title: 'The Power of Purposeful Design',
          image: '/blogs/1.jpg',
          date: 'May 2025',
          link: '/blog/the-power-of-purposeful-design',
          excerpt:
            'How intentional design choices improve user engagement and brand trust.',
          content:
            'Intentional design creates clarity, reduces friction, and builds trust across every step of the customer journey. When design is purposeful, users complete tasks faster and feel more confident about your brand.',
          keyInsights:
            'Align visual choices with business goals\nDesign for clarity before decoration\nContinuously test and refine key user flows',
          nextSteps:
            'Audit your top conversion journeys, simplify key interactions, and iterate based on measurable outcomes.',
        },
        {
          title: 'Top 5 Tools We Use to Build Scalable Websites',
          image: '/blogs/2.jpg',
          date: 'April 2025',
          link: '/blog/top-5-tools-we-use-to-build-scalable-websites',
          excerpt: 'From design to deployment, here is our go-to tech stack in 2025.',
          content:
            'Scalability is less about one magic tool and more about combining the right stack with disciplined engineering practices. Our toolchain prioritizes reliability, maintainability, and delivery speed.',
          keyInsights:
            'Choose tools that fit your team skill set\nAutomate quality checks early\nStandardize architecture patterns across projects',
          nextSteps:
            'Review your stack bottlenecks, document standards, and automate repetitive workflows first.',
        },
        {
          title: 'Why Every Brand Needs a Design System',
          image: '/blogs/3.jpg',
          date: 'March 2025',
          link: '/blog/why-every-brand-needs-a-design-system',
          excerpt:
            'A design system is more than visuals - it is your brand\'s operating manual.',
          content:
            'A strong design system improves consistency, speeds delivery, and helps teams scale without losing quality. It aligns product, design, and engineering around reusable standards.',
          keyInsights:
            'Consistency builds trust\nReusable patterns reduce delivery time\nShared standards improve cross-team collaboration',
          nextSteps:
            'Start with core UI tokens and components, then document usage rules and governance workflows.',
        },
        {
          title: 'Dark Mode Design: Tips for Better UX',
          image: '/blogs/4.jpg',
          date: 'February 2025',
          link: '/blog/dark-mode-design-tips-for-better-ux',
          excerpt:
            'How to design inclusive, legible, and stylish dark interfaces in 2025.',
          content:
            'Dark interfaces require careful contrast management, typography tuning, and semantic color mapping to remain readable and comfortable.',
          keyInsights:
            'Use semantic color roles\nValidate accessibility contrast ratios\nTest across device brightness levels',
          nextSteps:
            'Run accessibility audits in both light and dark themes and fix low-contrast patterns first.',
        },
        {
          title: 'How We Approach Mobile-First Design',
          image: '/blogs/5.jpg',
          date: 'January 2025',
          link: '/blog/how-we-approach-mobile-first-design',
          excerpt:
            'Learn why starting with mobile changes the way we build for the web.',
          content:
            'Mobile-first pushes teams to focus on essentials. It improves hierarchy, forces clarity, and often leads to better desktop experiences too.',
          keyInsights:
            'Prioritize essential actions\nDesign for touch ergonomics\nProgressively enhance for larger screens',
          nextSteps:
            'Map your mobile critical path and remove low-value UI distractions from early screens.',
        },
        {
          title: 'Web Performance in 2025: What Actually Matters',
          image: '/blogs/6.jpg',
          date: 'December 2024',
          link: '/blog/web-performance-in-2025-what-actually-matters',
          excerpt:
            'Speed, accessibility, and user flow - the new performance checklist.',
          content:
            'Performance today is user-perceived responsiveness across the full journey. Fast rendering, stable layouts, and smooth interactions all contribute to conversion and retention.',
          keyInsights:
            'Track real-user metrics, not only lab scores\nOptimize critical rendering path\nEliminate layout shifts and interaction delays',
          nextSteps:
            'Measure Core Web Vitals in production and prioritize fixes by business impact.',
        },
      ],
    },
    cta: {
      heading: "Let's Talk Strategy",
      description:
        "Whether you're building from scratch or scaling up - KarFamSoft Agency is ready to partner with you. Let's create something impactful.",
      ctaLabel: 'Contact Us',
      ctaHref: '/contact',
    },
  },
};

const getDefaultContentForKind = (kind, pageSlug = '') => {
  const pageTemplate = DEFAULT_SECTION_CONTENT_BY_PAGE_AND_KIND[pageSlug]?.[kind];
  const template = pageTemplate || DEFAULT_SECTION_CONTENT_BY_KIND[kind];
  return template ? JSON.parse(JSON.stringify(template)) : {};
};

const mergeContentWithDefaults = (defaultContent, incomingContent) => {
  const incoming = incomingContent && typeof incomingContent === 'object' ? incomingContent : {};
  const merged = {
    ...defaultContent,
    ...incoming,
  };

  Object.keys(defaultContent).forEach((key) => {
    const defaultValue = defaultContent[key];
    const incomingValue = incoming[key];

    if (Array.isArray(defaultValue)) {
      if (!Array.isArray(incomingValue) || !incomingValue.length) {
        merged[key] = defaultValue;
        return;
      }

      const firstDefaultObject = defaultValue.find(
        (item) => item && typeof item === 'object' && !Array.isArray(item)
      );

      if (!firstDefaultObject) {
        merged[key] = incomingValue;
        return;
      }

      merged[key] = incomingValue.map((item, index) => {
        if (!item || typeof item !== 'object' || Array.isArray(item)) return item;

        const indexedDefault =
          defaultValue[index] && typeof defaultValue[index] === 'object' && !Array.isArray(defaultValue[index])
            ? defaultValue[index]
            : firstDefaultObject;

        return {
          ...indexedDefault,
          ...item,
        };
      });
    }
  });

  return merged;
};

const getFieldGroup = (field) => {
  if (field.type === 'json') return 'advanced';
  if (field.mediaType) return 'media';
  if (String(field.key || '').toLowerCase().includes('cta')) return 'actions';
  return 'content';
};

const FIELD_GROUP_LABELS = {
  content: 'Content',
  media: 'Media',
  actions: 'Actions',
  advanced: 'Advanced',
};

const SECTION_LIBRARY_LABELS = {
  homehero: 'Home Hero',
  homeheroslider: 'Home Hero Slider',
  homeservices: 'Services Preview',
  features: 'Why Choose Us / Features',
  process: 'Process',
  homeportfolio: 'Portfolio Teaser',
  homeblog: 'Blog Teaser',
  homefaq: 'FAQ',
  cta: 'Call To Action',
  abouthero: 'About Hero',
  story: 'Who We Are Story',
  values: 'Core Values',
  serviceshero: 'Services Hero',
  serviceslist: 'Services List',
  portfoliohero: 'Portfolio Hero',
  projectsgallery: 'Projects Gallery',
  bloghero: 'Blog Hero',
  blogposts: 'Blog Posts',
  contact: 'Contact Section',
  teamhero: 'Team Hero',
  teamstats: 'Team Stats',
  teammembers: 'Team Members',
  teamvalues: 'Team Values',
};

const SECTION_LIBRARY_DESCRIPTIONS = {
  homehero: 'Headline, supporting text, and primary/secondary actions.',
  homeheroslider: 'Full-width image slider hero with layered text, CTA actions, and slide stats.',
  homeservices: 'Service highlights grid with optional CTA.',
  features: 'Why-choose-us value points and supporting copy.',
  process: 'Step-by-step workflow section.',
  homeportfolio: 'Featured project cards with links.',
  homeblog: 'Latest post teaser cards.',
  homefaq: 'Accordion-style FAQ with editable questions and answers.',
  cta: 'Conversion-focused call to action block.',
  abouthero: 'About page introduction with optional media.',
  story: 'Who-we-are narrative with image.',
  values: 'Core values cards.',
  serviceshero: 'Services page hero intro and action.',
  serviceslist: 'Structured list of services.',
  portfoliohero: 'Portfolio intro block.',
  projectsgallery: 'Project gallery/cards section.',
  bloghero: 'Blog intro block.',
  blogposts: 'Blog post list/cards section.',
  contact: 'Contact details and inquiry section.',
  teamhero: 'Team page hero introduction with eyebrow, heading, and description.',
  teamstats: 'Animated stats strip showing key company metrics.',
  teammembers: 'Team member cards with photos, bios, and social links.',
  teamvalues: 'Core values and principles displayed as numbered cards.',
};

const SECTION_LIBRARY_PREVIEW_STYLES = {
  homehero: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 26%, white), color-mix(in srgb, var(--theme-secondary) 24%, white))',
  homeheroslider: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 38%, white), color-mix(in srgb, var(--theme-secondary) 34%, white), color-mix(in srgb, var(--theme-accent) 26%, white))',
  homeservices: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 14%, white), color-mix(in srgb, var(--theme-primary) 6%, white))',
  features: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-secondary) 16%, white), color-mix(in srgb, var(--theme-accent) 14%, white))',
  process: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 16%, white), color-mix(in srgb, var(--theme-secondary) 8%, white))',
  homeportfolio: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-accent) 16%, white), color-mix(in srgb, var(--theme-secondary) 12%, white))',
  homeblog: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-secondary) 16%, white), color-mix(in srgb, var(--theme-primary) 10%, white))',
  homefaq: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-accent) 12%, white), color-mix(in srgb, var(--theme-primary) 14%, white))',
  cta: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 30%, white), color-mix(in srgb, var(--theme-secondary) 25%, white), color-mix(in srgb, var(--theme-accent) 22%, white))',
  abouthero: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 22%, white), color-mix(in srgb, var(--theme-secondary) 16%, white))',
  story: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-secondary) 14%, white), color-mix(in srgb, var(--theme-primary) 10%, white))',
  values: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-accent) 15%, white), color-mix(in srgb, var(--theme-primary) 10%, white))',
  serviceshero: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 20%, white), color-mix(in srgb, var(--theme-secondary) 15%, white))',
  serviceslist: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 12%, white), color-mix(in srgb, var(--theme-secondary) 7%, white))',
  portfoliohero: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-accent) 14%, white), color-mix(in srgb, var(--theme-primary) 10%, white))',
  projectsgallery: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-secondary) 14%, white), color-mix(in srgb, var(--theme-primary) 8%, white))',
  bloghero: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 14%, white), color-mix(in srgb, var(--theme-accent) 12%, white))',
  blogposts: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-secondary) 12%, white), color-mix(in srgb, var(--theme-primary) 8%, white))',
  contact: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-accent) 12%, white), color-mix(in srgb, var(--theme-secondary) 10%, white))',
  teamhero: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 22%, white), color-mix(in srgb, var(--theme-secondary) 16%, white))',
  teamstats: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-accent) 14%, white), color-mix(in srgb, var(--theme-primary) 8%, white))',
  teammembers: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 14%, white), color-mix(in srgb, var(--theme-accent) 10%, white))',
  teamvalues: 'linear-gradient(135deg, color-mix(in srgb, var(--theme-secondary) 14%, white), color-mix(in srgb, var(--theme-primary) 10%, white))',
};

const SectionLibraryPreviewShell = ({ previewStyle, children, isUsed }) => (
  <div
    className={`relative overflow-hidden rounded-2xl border p-4 shadow-inner transition ${
      isUsed ? 'opacity-90' : ''
    }`}
    style={{ background: previewStyle }}
  >
    <div className="pointer-events-none absolute inset-0 bg-white/10" />
    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
    <div className="pointer-events-none absolute -bottom-10 -left-6 h-20 w-20 rounded-full bg-black/10 blur-2xl" />
    <div className="relative">{children}</div>
  </div>
);

const PreviewLine = ({ className = '' }) => (
  <div className={`h-2 rounded-full bg-white/90 ${className}`.trim()} />
);

const PreviewBlock = ({ className = '' }) => (
  <div className={`rounded-xl border border-white/50 bg-white/35 ${className}`.trim()} />
);

const PreviewChip = ({ className = '' }) => (
  <div className={`rounded-full border border-white/60 bg-white/45 ${className}`.trim()} />
);

const SectionLibraryPreview = ({ kind, previewStyle, isUsed }) => {
  switch (kind) {
    case 'homeheroslider':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3">
            <PreviewBlock className="min-h-28 rounded-2xl bg-slate-900/35 p-3">
              <div className="flex h-full items-end justify-between rounded-xl border border-white/45 bg-black/25 p-3">
                <div className="space-y-2">
                  <PreviewChip className="h-3 w-20 bg-white/40" />
                  <PreviewLine className="w-28 bg-white/85" />
                  <PreviewLine className="w-24 bg-white/70" />
                  <div className="flex gap-2 pt-1">
                    <PreviewBlock className="h-7 w-20 rounded-full bg-white/85" />
                    <PreviewBlock className="h-7 w-16 rounded-full bg-white/40" />
                  </div>
                </div>
                <PreviewBlock className="h-12 w-14 rounded-xl bg-white/35" />
              </div>
            </PreviewBlock>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-white/85" />
                <div className="h-2 w-6 rounded-full bg-slate-900/35" />
                <div className="h-2 w-2 rounded-full bg-white/65" />
              </div>
              <div className="flex gap-1.5">
                <div className="h-6 w-6 rounded-full bg-white/70" />
                <div className="h-6 w-6 rounded-full bg-white/70" />
              </div>
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'homehero':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-3">
              <PreviewChip className="h-3 w-20" />
              <PreviewLine className="w-5/6" />
              <PreviewLine className="w-4/5" />
              <PreviewLine className="w-3/5" />
              <div className="flex gap-2 pt-2">
                <PreviewBlock className="h-8 w-24 rounded-full bg-slate-950/85" />
                <PreviewBlock className="h-8 w-20 rounded-full bg-white/55" />
              </div>
            </div>
            <PreviewBlock className="min-h-28 rounded-[1.5rem] bg-white/30 p-3">
              <div className="flex h-full items-center justify-center rounded-[1.2rem] border border-white/40 bg-white/55">
                <div className="space-y-2 text-center">
                  <PreviewLine className="mx-auto w-20 bg-slate-900/15" />
                  <PreviewLine className="mx-auto w-14 bg-slate-900/10" />
                </div>
              </div>
            </PreviewBlock>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'homeservices':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3">
            <PreviewChip className="h-3 w-16" />
            <PreviewLine className="w-1/2" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <PreviewBlock key={item} className="space-y-2 rounded-xl bg-white/50 p-3">
                  <div className="h-8 w-8 rounded-xl bg-white/80" />
                  <PreviewLine className="w-5/6 bg-slate-900/15" />
                  <PreviewLine className="w-4/6 bg-slate-900/10" />
                </PreviewBlock>
              ))}
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'features':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3">
            <PreviewChip className="h-3 w-24" />
            <PreviewLine className="w-2/3" />
            <div className="space-y-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/35 p-3">
                  <div className="h-8 w-8 rounded-full bg-white/80" />
                  <div className="flex-1 space-y-1">
                    <PreviewLine className="w-1/2 bg-slate-900/15" />
                    <PreviewLine className="w-3/4 bg-slate-900/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'process':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3">
            <PreviewChip className="h-3 w-16" />
            <PreviewLine className="w-2/3" />
            <div className="grid gap-2 sm:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <PreviewBlock key={item} className="space-y-2 rounded-xl bg-white/45 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-xs font-bold text-slate-900">{item}</div>
                  <PreviewLine className="w-4/5 bg-slate-900/15" />
                  <PreviewLine className="w-3/5 bg-slate-900/10" />
                </PreviewBlock>
              ))}
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'homeportfolio':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3">
            <PreviewChip className="h-3 w-20" />
            <PreviewLine className="w-2/3" />
            <div className="grid gap-2 sm:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <PreviewBlock key={item} className="space-y-2 rounded-xl bg-white/45 p-2">
                  <div className="h-14 rounded-lg bg-white/75" />
                  <PreviewLine className="w-3/4 bg-slate-900/15" />
                  <PreviewLine className="w-5/6 bg-slate-900/10" />
                </PreviewBlock>
              ))}
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'homeblog':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3">
            <PreviewChip className="h-3 w-16" />
            <PreviewLine className="w-1/2" />
            <div className="grid gap-2 sm:grid-cols-[1.1fr_0.9fr]">
              <PreviewBlock className="space-y-2 rounded-xl bg-white/50 p-3">
                <div className="h-16 rounded-lg bg-white/80" />
                <PreviewLine className="w-4/5 bg-slate-900/15" />
                <PreviewLine className="w-3/5 bg-slate-900/10" />
              </PreviewBlock>
              <div className="space-y-2">
                {[1, 2].map((item) => (
                  <PreviewBlock key={item} className="flex gap-3 rounded-xl bg-white/40 p-3">
                    <div className="h-14 w-14 rounded-lg bg-white/80" />
                    <div className="flex-1 space-y-2">
                      <PreviewLine className="w-2/3 bg-slate-900/15" />
                      <PreviewLine className="w-5/6 bg-slate-900/10" />
                    </div>
                  </PreviewBlock>
                ))}
              </div>
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'homefaq':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-2">
            <PreviewChip className="h-3 w-12" />
            <PreviewLine className="w-1/2" />
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-xl border border-white/40 bg-white/40 p-3">
                <PreviewLine className="w-3/4 bg-slate-900/12" />
                <div className="h-4 w-4 rounded-full bg-white/70" />
              </div>
            ))}
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'cta':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3 text-center">
            <PreviewChip className="mx-auto h-3 w-14" />
            <PreviewLine className="mx-auto w-3/4" />
            <PreviewLine className="mx-auto w-1/2" />
            <div className="flex justify-center gap-2 pt-2">
              <PreviewBlock className="h-8 w-24 rounded-full bg-slate-950/85" />
              <PreviewBlock className="h-8 w-20 rounded-full bg-white/55" />
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'abouthero':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="grid gap-3 sm:grid-cols-[0.95fr_1.05fr]">
            <PreviewBlock className="min-h-24 rounded-[1.4rem] bg-white/30 p-3">
              <div className="h-full rounded-[1.1rem] border border-white/40 bg-white/60" />
            </PreviewBlock>
            <div className="space-y-2">
              <PreviewChip className="h-3 w-20" />
              <PreviewLine className="w-5/6" />
              <PreviewLine className="w-4/5" />
              <PreviewLine className="w-3/5" />
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'story':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="grid gap-3 sm:grid-cols-[1fr_0.85fr]">
            <div className="space-y-2">
              <PreviewChip className="h-3 w-20" />
              <PreviewLine className="w-4/5" />
              <PreviewLine className="w-3/4" />
              <PreviewLine className="w-2/3" />
            </div>
            <PreviewBlock className="min-h-24 rounded-[1.4rem] bg-white/55" />
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'values':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3">
            <PreviewChip className="h-3 w-16" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <PreviewBlock key={item} className="space-y-2 rounded-xl bg-white/45 p-3">
                  <div className="h-6 w-6 rounded-lg bg-white/80" />
                  <PreviewLine className="w-1/2 bg-slate-900/15" />
                  <PreviewLine className="w-4/5 bg-slate-900/10" />
                </PreviewBlock>
              ))}
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'serviceshero':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3">
            <PreviewChip className="h-3 w-20" />
            <PreviewLine className="w-3/4" />
            <PreviewLine className="w-5/6" />
            <div className="flex gap-2 pt-2">
              <PreviewBlock className="h-8 w-24 rounded-full bg-slate-950/85" />
              <PreviewBlock className="h-8 w-28 rounded-full bg-white/55" />
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'serviceslist':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/40 p-3">
                <div className="h-10 w-10 rounded-xl bg-white/80" />
                <div className="flex-1 space-y-1">
                  <PreviewLine className="w-1/2 bg-slate-900/15" />
                  <PreviewLine className="w-4/5 bg-slate-900/10" />
                </div>
              </div>
            ))}
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'portfoliohero':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="grid gap-3 sm:grid-cols-[1fr_0.8fr]">
            <div className="space-y-2">
              <PreviewChip className="h-3 w-14" />
              <PreviewLine className="w-5/6" />
              <PreviewLine className="w-2/3" />
              <div className="flex gap-2 pt-2">
                <PreviewChip className="h-6 w-16" />
                <PreviewChip className="h-6 w-14" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <PreviewBlock className="h-12 rounded-xl bg-white/65" />
              <PreviewBlock className="h-12 rounded-xl bg-white/45" />
              <PreviewBlock className="h-12 rounded-xl bg-white/55" />
              <PreviewBlock className="h-12 rounded-xl bg-white/40" />
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'projectsgallery':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <PreviewBlock key={item} className="min-h-12 rounded-xl bg-white/55 p-1">
                <div className="h-full rounded-lg bg-white/85" />
              </PreviewBlock>
            ))}
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'bloghero':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3">
            <PreviewChip className="h-3 w-14" />
            <PreviewLine className="w-3/4" />
            <PreviewLine className="w-2/3" />
            <PreviewBlock className="h-14 rounded-[1.2rem] bg-white/50 p-2">
              <div className="h-full rounded-xl bg-white/80" />
            </PreviewBlock>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'blogposts':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/40 bg-white/40 p-3">
                <div className="h-12 w-12 rounded-xl bg-white/80" />
                <div className="flex-1 space-y-1">
                  <PreviewLine className="w-4/5 bg-slate-900/15" />
                  <PreviewLine className="w-2/3 bg-slate-900/10" />
                </div>
              </div>
            ))}
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'contact':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-2">
              <PreviewChip className="h-3 w-16" />
              <PreviewLine className="w-5/6" />
              <PreviewLine className="w-3/4" />
              <div className="space-y-2 pt-1">
                <PreviewBlock className="h-10 rounded-xl bg-white/50" />
                <PreviewBlock className="h-10 rounded-xl bg-white/45" />
              </div>
            </div>
            <div className="space-y-2 rounded-[1.4rem] border border-white/40 bg-white/35 p-3">
              <PreviewLine className="w-1/3 bg-slate-900/10" />
              <PreviewBlock className="h-8 rounded-xl bg-white/65" />
              <PreviewBlock className="h-8 rounded-xl bg-white/65" />
              <PreviewBlock className="h-16 rounded-xl bg-white/55" />
              <PreviewBlock className="h-8 rounded-full bg-slate-950/85" />
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'teamhero':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3 text-center">
            <PreviewChip className="mx-auto h-3 w-14" />
            <PreviewLine className="mx-auto w-4/5" />
            <PreviewLine className="mx-auto w-3/5" />
            <div className="mx-auto h-1 w-12 rounded-full bg-white/80" />
            <PreviewLine className="mx-auto w-2/3" />
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'teamstats':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="grid grid-cols-3 gap-1 rounded-lg border border-white/30 bg-white/30 p-2">
            {['120+', '4.9/5', '8+'].map((stat) => (
              <div key={stat} className="space-y-1 text-center">
                <PreviewLine className="mx-auto w-1/2 font-bold text-xl text-white/90">{stat}</PreviewLine>
                <PreviewLine className="mx-auto w-3/4 h-1.5 bg-white/40" />
              </div>
            ))}
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'teammembers':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3">
            <PreviewChip className="h-3 w-14" />
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((item) => (
                <PreviewBlock key={item} className="space-y-2 rounded-2xl bg-white/45 p-2 text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-white/80" />
                  <PreviewLine className="mx-auto w-4/5 bg-slate-900/15" />
                  <PreviewLine className="mx-auto w-1/2 bg-slate-900/10" />
                  <div className="mx-auto flex justify-center gap-1 pt-1">
                    <div className="h-4 w-4 rounded-full bg-white/75" />
                    <div className="h-4 w-4 rounded-full bg-white/75" />
                    <div className="h-4 w-4 rounded-full bg-white/75" />
                  </div>
                </PreviewBlock>
              ))}
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    case 'teamvalues':
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-3">
            <PreviewChip className="h-3 w-14" />
            <PreviewLine className="w-1/3" />
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((item) => (
                <PreviewBlock key={item} className="space-y-2 rounded-2xl bg-white/45 p-2 text-center">
                  <div className="mx-auto mb-1 h-8 w-8 rounded-lg bg-white/80 flex items-center justify-center text-xs font-bold text-slate-400">0{item}</div>
                  <PreviewLine className="mx-auto w-4/5 bg-slate-900/15" />
                  <PreviewLine className="mx-auto w-3/4 bg-slate-900/10" />
                </PreviewBlock>
              ))}
            </div>
          </div>
        </SectionLibraryPreviewShell>
      );
    default:
      return (
        <SectionLibraryPreviewShell previewStyle={previewStyle} isUsed={isUsed}>
          <div className="space-y-2">
            <PreviewLine className="w-2/3" />
            <PreviewLine className="w-1/2" />
            <PreviewLine className="w-3/5" />
          </div>
        </SectionLibraryPreviewShell>
      );
  }
};

const getSectionLibraryForPage = (pageSlug = '') => {
  const expectedKinds = EXPECTED_SECTION_KINDS_BY_SLUG[pageSlug] || [];
  const optionalKinds = OPTIONAL_SECTION_LIBRARY_KINDS_BY_SLUG[pageSlug] || [];
  const kinds = [...expectedKinds, ...optionalKinds];

  if (kinds.length) {
    return kinds.map((kind) => ({
      value: kind,
      label: SECTION_LIBRARY_LABELS[kind] || humanizeLabel(kind),
      description:
        SECTION_LIBRARY_DESCRIPTIONS[kind] || 'Prebuilt layout section with editable fields.',
      previewStyle:
        SECTION_LIBRARY_PREVIEW_STYLES[kind] ||
        'linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 14%, white), color-mix(in srgb, var(--theme-secondary) 10%, white))',
    }));
  }

  return [];
};

const mapSections = (sections = [], pageSlug = '') => {
  const usedKeys = new Set();
  const orderedSections = [...sections].sort(
    (a, b) => (Number(a?.orderIndex) || 0) - (Number(b?.orderIndex) || 0)
  );

  const normalizedSections = orderedSections.map((section, index) => {
    const kind = getSectionKindForPage(section, pageSlug);
    const defaultContent = getDefaultContentForKind(kind, pageSlug);
    const rawKey = section.sectionKey || `section-${index + 1}`;
    const normalizedKey = getCanonicalSectionKey(section, pageSlug, rawKey);

    let finalKey = normalizedKey;
    if (usedKeys.has(finalKey)) {
      let suffix = 2;
      while (usedKeys.has(`${normalizedKey}-${suffix}`)) suffix += 1;
      finalKey = `${normalizedKey}-${suffix}`;
    }
    usedKeys.add(finalKey);

    return {
      sectionKey: finalKey,
      sectionType: section.sectionType || '',
      orderIndex: section.orderIndex || index + 1,
      isVisible: section.isVisible !== false,
      content: mergeContentWithDefaults(defaultContent, section.content?.content || {}),
    };
  });

  const expectedKinds = EXPECTED_SECTION_KINDS_BY_SLUG[pageSlug] || [];
  if (!expectedKinds.length) {
    return normalizedSections;
  }

  const orderedByExpectedKind = [...normalizedSections].sort((a, b) => {
    const kindA = getSectionKindForPage(a, pageSlug);
    const kindB = getSectionKindForPage(b, pageSlug);
    const rankA = expectedKinds.indexOf(kindA);
    const rankB = expectedKinds.indexOf(kindB);
    const normalizedRankA = rankA === -1 ? Number.MAX_SAFE_INTEGER : rankA;
    const normalizedRankB = rankB === -1 ? Number.MAX_SAFE_INTEGER : rankB;

    if (normalizedRankA !== normalizedRankB) {
      return normalizedRankA - normalizedRankB;
    }

    return (Number(a.orderIndex) || 0) - (Number(b.orderIndex) || 0);
  });

  return orderedByExpectedKind.map((section, index) => ({
    ...section,
    orderIndex: index + 1,
  }));
};

const createSectionFromKind = ({
  kind,
  pageSlug,
  orderIndex,
  usedKeys,
}) => {
  const canonicalKey =
    CANONICAL_SECTION_KEY_BY_SLUG_AND_KIND[pageSlug]?.[kind] || `section-${orderIndex}`;

  let uniqueKey = canonicalKey;
  if (usedKeys.has(uniqueKey)) {
    let suffix = 2;
    while (usedKeys.has(`${canonicalKey}-${suffix}`)) suffix += 1;
    uniqueKey = `${canonicalKey}-${suffix}`;
  }
  usedKeys.add(uniqueKey);

  return {
    sectionKey: uniqueKey,
    sectionType: kind,
    orderIndex,
    isVisible: true,
    content: getDefaultContentForKind(kind, pageSlug),
  };
};

const PageEditor = ({ page }) => {
  const { language } = useLanguage();
  const locale = localeByLanguage[language] || localeByLanguage.en;
  const copyByLanguage = {
    en: {
      statuses: {
        invalidJson: (fieldKey) => `Invalid JSON in ${fieldKey}. Fix and blur the field again.`,
        rawMustBeObject: 'Raw content JSON must be an object.',
        rawApplied: 'Section raw JSON applied.',
        rawInvalid: 'Raw content JSON is invalid.',
        sectionOrderUpdated: 'Section order updated. Save sections to persist.',
        chooseSectionStyle: 'Choose a section style from the library first.',
        invalidSectionStyle: 'Invalid section style selected. Please choose from the library list.',
        oneHeroOnly:
          'Only one Home Hero style can be used at a time. Remove the existing Home Hero section first.',
        alreadyExists: (label) => `'${label}' already exists.`,
        addedSection: (label) => `Added section: ${label}.`,
        noDefaults: 'No default section set is defined for this page.',
        defaultsRestored: 'Default section set restored in editor. Save sections to persist.',
        saveMeta: 'Saving page metadata...',
        saveMetaFailed: 'Failed to save page metadata.',
        saveMetaDone: 'Page metadata saved.',
        saveSections: 'Saving sections...',
        saveSectionsUnauthorized: 'Failed to save sections: session expired. Please log in again.',
        saveSectionsFailed: (code, message) => `Failed to save sections (${code}): ${message}`,
        saveSectionsError: (message) => `Failed to save sections: ${message}`,
        saveSectionsDone: 'Sections saved.',
        validating: 'Validating draft...',
        validationRequestFailed: 'Validation request failed.',
        validationIssues: 'Validation found issues.',
        validationPassed: 'Validation passed. Draft is ready to publish.',
        preparingPublish: 'Preparing publish summary...',
        preparingPublishFailed: 'Failed to prepare publish confirmation.',
        publishBlocked: 'Publish blocked by validation errors.',
        reviewAndConfirm: 'Review publish changes and confirm.',
        publishing: 'Publishing page...',
        publishFailed: 'Failed to publish page.',
        published: 'Page published.',
        rollingBack: 'Rolling back page...',
        rollbackFailed: 'Failed to rollback page.',
        rollbackDone: 'Rollback completed. Refreshing editor state...',
      },
      confirmRestore:
        'Restore default sections? This will replace current sections in the editor for this page.',
      ui: {
        publish: 'Publish',
        publishing: 'Publishing',
        publishedAt: (date) => `Published at ${date}`,
        noPublished: 'No published version yet. Draft changes are private until you publish.',
        checkReadiness: 'Check Readiness',
        preparing: 'Preparing...',
        reviewPublish: 'Review & Publish',
        openPreview: 'Open Preview',
        openLivePage: 'Open Live Page',
        publishNote: 'Publish Note (optional)',
        publishPlaceholder: 'Describe this publish change',
        rollbackNote: 'Rollback Note (optional)',
        rollbackPlaceholder: 'Reason for rollback',
        validationIssuesTitle: 'Draft validation issues:',
        seo: 'SEO',
        pageSeo: 'Page SEO',
        title: 'Title',
        pageTitlePlaceholder: 'Page title',
        seoTitle: 'SEO Title',
        seoTitlePlaceholder: 'Meta title for search engines',
        seoDescription: 'SEO Description',
        seoDescriptionPlaceholder: 'Brief description for search results',
        saveSeo: 'Save SEO',
        history: 'History',
        publishHistory: 'Publish History',
        showingRecent: (count) => `Showing ${count} recent entries.`,
        historySubtitle: 'Roll back the live page to a previously published version.',
        rollback: 'Rollback',
        publishAction: 'Publish',
        by: 'By',
        note: 'Note',
        rollbackThis: 'Rollback to this',
        noHistory: 'No publish history available yet.',
        showRecent3: 'Show only recent 3',
        showAll: (count) => `Show all (${count})`,
        loadingHistory: 'Loading history...',
        editor: 'Editor',
        sectionsEditor: 'Sections Editor',
        sectionsEditorSubtitle: 'Edit section order, visibility, and section-type specific fields.',
        sectionWarnings: 'Section mapping warnings',
        totalSections: 'Total sections',
        visible: 'Visible',
        hidden: 'Hidden',
        sectionLibrary: 'Section Library',
        sectionLibraryHint:
          'Add prebuilt section styles, or restore the full default page layout.',
        manageMedia: 'Manage Media',
        sectionStyle: 'Section Style',
        selectSectionStyle: 'Select a section style...',
        used: 'Used',
        add: 'Add',
        hideMockups: 'Hide Mockups',
        showMockups: 'Show Mockups',
        restoreDefaults: 'Restore Defaults',
        selected: 'Selected',
        selectToAdd: 'Select a section style from the dropdown or mockup cards to enable adding.',
        alreadyUsed: (label) => `${label} is already used on this page. Choose another style.`,
        readyToAdd: (label) => `Ready to add: ${label}`,
        untitledSection: 'Untitled Section',
        type: 'Type',
        order: 'Order',
        custom: 'custom',
        dragToReorder: 'Drag to reorder',
        drag: 'Drag',
        expand: 'Expand',
        sectionKey: 'Section Key',
        sectionType: 'Section Type',
        orderLabel: 'Order',
        visibleLabel: 'Visible',
        contentGroupFallback: 'Content',
        addItem: 'Add Item',
        remove: 'Remove',
        pasteOrPickMedia: 'Paste URL or pick from media',
        selectFromMedia: 'Select from media library',
        noItems: 'No items yet. Add one to start.',
        advancedRaw: 'Advanced: Raw Section JSON',
        applyRaw: 'Apply Raw JSON',
        removeSection: 'Remove Section',
        addSectionsHint: 'Add sections from Section Library only. Drag section headers to reorder, then save.',
        saveSections: 'Save Sections',
        liveDraftPreview: 'Live Draft Preview',
        liveDraftPreviewHint: 'Uses saved draft content.',
        refresh: 'Refresh',
        previewTitle: 'Live draft preview',
        confirmPublish: 'Confirm Publish',
        reviewChanges: 'Review changes between live content and current draft before publishing.',
        summary: 'Summary',
        sectionsSummary: (a, r, c) => `Sections added: ${a}, removed: ${r}, updated: ${c}`,
        metaChanges: 'Meta changes',
        noMetaChanges: 'No meta changes detected.',
        sectionChanges: 'Section changes',
        noSectionChanges: 'No section changes detected.',
        cancel: 'Cancel',
        publishingNow: 'Publishing...',
        confirmPublishButton: 'Confirm Publish',
      },
    },
    fa: {
      statuses: {
        invalidJson: (fieldKey) => `JSON نامعتبر در ${fieldKey}. اصلاح کنید و دوباره از فیلد خارج شوید.`,
        rawMustBeObject: 'JSON خام بخش باید یک شیء باشد.',
        rawApplied: 'JSON خام بخش اعمال شد.',
        rawInvalid: 'JSON خام بخش نامعتبر است.',
        sectionOrderUpdated: 'ترتیب بخش ها به روز شد. برای ذخیره دائمی، ذخیره را بزنید.',
        chooseSectionStyle: 'ابتدا یک سبک بخش از کتابخانه انتخاب کنید.',
        invalidSectionStyle: 'سبک انتخابی نامعتبر است. لطفا از لیست کتابخانه انتخاب کنید.',
        oneHeroOnly: 'در هر زمان فقط یک سبک هیروی خانه قابل استفاده است. ابتدا بخش هیروی موجود را حذف کنید.',
        alreadyExists: (label) => `'${label}' از قبل وجود دارد.`,
        addedSection: (label) => `بخش اضافه شد: ${label}.`,
        noDefaults: 'برای این صفحه مجموعه پیش فرض تعریف نشده است.',
        defaultsRestored: 'مجموعه پیش فرض بخش ها در ویرایشگر بازیابی شد. برای ذخیره دائمی، ذخیره کنید.',
        saveMeta: 'در حال ذخیره فراداده صفحه...',
        saveMetaFailed: 'ذخیره فراداده صفحه ناموفق بود.',
        saveMetaDone: 'فراداده صفحه ذخیره شد.',
        saveSections: 'در حال ذخیره بخش ها...',
        saveSectionsUnauthorized: 'ذخیره بخش ها ناموفق بود: نشست منقضی شده است. دوباره وارد شوید.',
        saveSectionsFailed: (code, message) => `ذخیره بخش ها ناموفق بود (${code}): ${message}`,
        saveSectionsError: (message) => `ذخیره بخش ها ناموفق بود: ${message}`,
        saveSectionsDone: 'بخش ها ذخیره شدند.',
        validating: 'در حال اعتبارسنجی پیش نویس...',
        validationRequestFailed: 'درخواست اعتبارسنجی ناموفق بود.',
        validationIssues: 'در اعتبارسنجی مشکلاتی یافت شد.',
        validationPassed: 'اعتبارسنجی با موفقیت انجام شد. پیش نویس آماده انتشار است.',
        preparingPublish: 'در حال آماده سازی خلاصه انتشار...',
        preparingPublishFailed: 'آماده سازی تایید انتشار ناموفق بود.',
        publishBlocked: 'انتشار به دلیل خطاهای اعتبارسنجی متوقف شد.',
        reviewAndConfirm: 'تغییرات انتشار را بررسی و تایید کنید.',
        publishing: 'در حال انتشار صفحه...',
        publishFailed: 'انتشار صفحه ناموفق بود.',
        published: 'صفحه منتشر شد.',
        rollingBack: 'در حال بازگردانی صفحه...',
        rollbackFailed: 'بازگردانی صفحه ناموفق بود.',
        rollbackDone: 'بازگردانی انجام شد. وضعیت ویرایشگر در حال تازه سازی است...',
      },
      confirmRestore: 'بخش های پیش فرض بازیابی شوند؟ این کار بخش های فعلی این صفحه را در ویرایشگر جایگزین می کند.',
      ui: {},
    },
    ps: {
      statuses: {
        invalidJson: (fieldKey) => `${fieldKey} کې ناسم JSON دی. سم یې کړئ او بیا له خانې ووځئ.`,
        rawMustBeObject: 'د برخې خام JSON باید یو object وي.',
        rawApplied: 'د برخې خام JSON تطبیق شو.',
        rawInvalid: 'د برخې خام JSON ناسم دی.',
        sectionOrderUpdated: 'د برخو ترتیب تازه شو. د تل لپاره د خوندي کولو لپاره Save ووهئ.',
        chooseSectionStyle: 'لومړی د کتابتون څخه د برخې سبک وټاکئ.',
        invalidSectionStyle: 'ټاکل شوی سبک ناسم دی. مهرباني وکړئ له کتابتون لیست څخه یې وټاکئ.',
        oneHeroOnly: 'په یو وخت کې یوازې د Home Hero یو سبک کارول کېدای شي. لومړی موجود Home Hero برخه لرې کړئ.',
        alreadyExists: (label) => `'${label}' له مخکې شته.`,
        addedSection: (label) => `برخه زیاته شوه: ${label}.`,
        noDefaults: 'د دې پاڼې لپاره د برخو اصلي مجموعه نه ده ټاکل شوې.',
        defaultsRestored: 'په اېډېټر کې د برخو اصلي مجموعه بېرته راوستل شوه. د تل لپاره خوندي یې کړئ.',
        saveMeta: 'د پاڼې metadata خوندي کېږي...',
        saveMetaFailed: 'د پاڼې metadata خوندي نه شوه.',
        saveMetaDone: 'د پاڼې metadata خوندي شوه.',
        saveSections: 'برخې خوندي کېږي...',
        saveSectionsUnauthorized: 'برخې خوندي نه شوې: ناسته ختمه شوې. بیا ننوزئ.',
        saveSectionsFailed: (code, message) => `برخې خوندي نه شوې (${code}): ${message}`,
        saveSectionsError: (message) => `برخې خوندي نه شوې: ${message}`,
        saveSectionsDone: 'برخې خوندي شوې.',
        validating: 'مسوده ارزول کېږي...',
        validationRequestFailed: 'د ارزونې غوښتنه ناکامه شوه.',
        validationIssues: 'ارزونې ستونزې وموندلې.',
        validationPassed: 'ارزونه بریالۍ شوه. مسوده خپرولو ته چمتو ده.',
        preparingPublish: 'د خپرولو لنډیز چمتو کېږي...',
        preparingPublishFailed: 'د خپرولو تایید چمتو نه شو.',
        publishBlocked: 'خپرول د ارزونې د خطاګانو له امله بند شول.',
        reviewAndConfirm: 'د خپرولو بدلونونه وڅېړئ او تایید یې کړئ.',
        publishing: 'پاڼه خپرېږي...',
        publishFailed: 'پاڼه خپره نه شوه.',
        published: 'پاڼه خپره شوه.',
        rollingBack: 'پاڼه بېرته ګرځول کېږي...',
        rollbackFailed: 'پاڼه بېرته نه شوه ګرځېدلی.',
        rollbackDone: 'بېرته ګرځول بشپړ شول. د اېډېټر حالت تازه کېږي...',
      },
      confirmRestore: 'ایا اصلي برخې بېرته راوړو؟ دا به په اېډېټر کې د دې پاڼې اوسني برخې بدل کړي.',
      ui: {},
    },
  };
  const localizedUiByLanguage = {
    fa: {
      publish: 'انتشار',
      publishing: 'در حال انتشار',
      publishedAt: (date) => `منتشر شده در ${date}`,
      noPublished: 'هنوز نسخه منتشرشده ای وجود ندارد. تغییرات پیش نویس تا زمان انتشار خصوصی هستند.',
      checkReadiness: 'بررسی آمادگی',
      preparing: 'در حال آماده سازی...',
      reviewPublish: 'بررسی و انتشار',
      openPreview: 'باز کردن پیش نمایش',
      openLivePage: 'باز کردن صفحه زنده',
      publishNote: 'یادداشت انتشار (اختیاری)',
      publishPlaceholder: 'تغییر این انتشار را توضیح دهید',
      rollbackNote: 'یادداشت بازگردانی (اختیاری)',
      rollbackPlaceholder: 'دلیل بازگردانی',
      validationIssuesTitle: 'مشکلات اعتبارسنجی پیش نویس:',
      pageSeo: 'سئوی صفحه',
      title: 'عنوان',
      pageTitlePlaceholder: 'عنوان صفحه',
      seoTitle: 'عنوان سئو',
      seoTitlePlaceholder: 'عنوان متا برای موتورهای جستجو',
      seoDescription: 'توضیح سئو',
      seoDescriptionPlaceholder: 'توضیح کوتاه برای نتایج جستجو',
      saveSeo: 'ذخیره سئو',
      history: 'تاریخچه',
      publishHistory: 'تاریخچه انتشار',
      showingRecent: (count) => `نمایش ${count} مورد اخیر.`,
      historySubtitle: 'صفحه زنده را به یک نسخه منتشرشده قبلی بازگردانید.',
      rollback: 'بازگردانی',
      publishAction: 'انتشار',
      by: 'توسط',
      note: 'یادداشت',
      rollbackThis: 'بازگردانی به این نسخه',
      noHistory: 'هنوز تاریخچه انتشاری وجود ندارد.',
      showRecent3: 'فقط 3 مورد اخیر',
      showAll: (count) => `نمایش همه (${count})`,
      loadingHistory: 'در حال بارگذاری تاریخچه...',
      editor: 'ویرایشگر',
      sectionsEditor: 'ویرایشگر بخش ها',
      sectionsEditorSubtitle: 'ترتیب، نمایش و فیلدهای اختصاصی هر بخش را ویرایش کنید.',
      sectionWarnings: 'هشدارهای نگاشت بخش',
      totalSections: 'کل بخش ها',
      visible: 'نمایش داده شده',
      hidden: 'مخفی',
      sectionLibrary: 'کتابخانه بخش ها',
      sectionLibraryHint: 'سبک های آماده بخش را اضافه کنید یا چیدمان پیش فرض کامل را بازیابی کنید.',
      manageMedia: 'مدیریت رسانه',
      sectionStyle: 'سبک بخش',
      selectSectionStyle: 'یک سبک بخش انتخاب کنید...',
      used: 'استفاده شده',
      add: 'افزودن',
      hideMockups: 'پنهان کردن ماکاپ ها',
      showMockups: 'نمایش ماکاپ ها',
      restoreDefaults: 'بازیابی پیش فرض ها',
      selected: 'انتخاب شده',
      selectToAdd: 'برای افزودن، یک سبک بخش را از فهرست یا کارت ها انتخاب کنید.',
      alreadyUsed: (label) => `${label} از قبل در این صفحه استفاده شده است. سبک دیگری انتخاب کنید.`,
      readyToAdd: (label) => `آماده افزودن: ${label}`,
      untitledSection: 'بخش بدون عنوان',
      type: 'نوع',
      order: 'ترتیب',
      custom: 'سفارشی',
      dragToReorder: 'برای تغییر ترتیب بکشید',
      drag: 'کشیدن',
      expand: 'گسترش',
      sectionKey: 'کلید بخش',
      sectionType: 'نوع بخش',
      orderLabel: 'ترتیب',
      visibleLabel: 'نمایش',
      contentGroupFallback: 'محتوا',
      addItem: 'افزودن آیتم',
      remove: 'حذف',
      pasteOrPickMedia: 'آدرس را وارد کنید یا از رسانه انتخاب کنید',
      selectFromMedia: 'انتخاب از کتابخانه رسانه',
      noItems: 'هنوز آیتمی وجود ندارد. برای شروع یکی اضافه کنید.',
      advancedRaw: 'پیشرفته: JSON خام بخش',
      applyRaw: 'اعمال JSON خام',
      removeSection: 'حذف بخش',
      addSectionsHint: 'فقط از کتابخانه بخش ها اضافه کنید. سرصفحه بخش ها را برای تغییر ترتیب بکشید، سپس ذخیره کنید.',
      saveSections: 'ذخیره بخش ها',
      liveDraftPreview: 'پیش نمایش زنده پیش نویس',
      liveDraftPreviewHint: 'از محتوای پیش نویس ذخیره شده استفاده می کند.',
      refresh: 'تازه سازی',
      previewTitle: 'پیش نمایش زنده پیش نویس',
      confirmPublish: 'تایید انتشار',
      reviewChanges: 'پیش از انتشار، تغییرات بین محتوای زنده و پیش نویس فعلی را بررسی کنید.',
      summary: 'خلاصه',
      sectionsSummary: (a, r, c) => `بخش های اضافه شده: ${a}، حذف شده: ${r}، به روز شده: ${c}`,
      metaChanges: 'تغییرات متا',
      noMetaChanges: 'تغییر متایی تشخیص داده نشد.',
      sectionChanges: 'تغییرات بخش',
      noSectionChanges: 'تغییر بخشی تشخیص داده نشد.',
      cancel: 'انصراف',
      publishingNow: 'در حال انتشار...',
      confirmPublishButton: 'تایید انتشار',
    },
    ps: {
      publish: 'خپرول',
      publishing: 'د خپرولو حالت',
      publishedAt: (date) => `خپور شوی: ${date}`,
      noPublished: 'لا تر اوسه خپره نسخه نشته. د مسودې بدلونونه تر خپرېدو پورې شخصي دي.',
      checkReadiness: 'د چمتووالي کتنه',
      preparing: 'چمتو کېږي...',
      reviewPublish: 'کتنه او خپرول',
      openPreview: 'مخکتنه پرانیزئ',
      openLivePage: 'ژوندۍ پاڼه پرانیزئ',
      publishNote: 'د خپرولو یادښت (اختیاري)',
      publishPlaceholder: 'د دې خپرونې بدلون تشریح کړئ',
      rollbackNote: 'د بېرته راګرځولو یادښت (اختیاري)',
      rollbackPlaceholder: 'د بېرته راګرځولو دلیل',
      validationIssuesTitle: 'د مسودې د ارزونې ستونزې:',
      pageSeo: 'د پاڼې SEO',
      title: 'سرلیک',
      pageTitlePlaceholder: 'د پاڼې سرلیک',
      seoTitle: 'SEO سرلیک',
      seoTitlePlaceholder: 'د لټون انجن لپاره meta سرلیک',
      seoDescription: 'SEO تشریح',
      seoDescriptionPlaceholder: 'د لټون پایلو لپاره لنډه تشریح',
      saveSeo: 'SEO خوندي کړئ',
      history: 'تاریخچه',
      publishHistory: 'د خپرولو تاریخچه',
      showingRecent: (count) => `وروستي ${count} توکي ښودل کېږي.`,
      historySubtitle: 'ژوندۍ پاڼه پخوانۍ خپره شوې نسخې ته بېرته وګرځوئ.',
      rollback: 'بېرته راګرځول',
      publishAction: 'خپرول',
      by: 'له خوا',
      note: 'یادښت',
      rollbackThis: 'همدې نسخې ته بېرته راګرځول',
      noHistory: 'لا د خپرولو تاریخچه نشته.',
      showRecent3: 'یوازې وروستي 3',
      showAll: (count) => `ټول وښیه (${count})`,
      loadingHistory: 'تاریخچه پورته کېږي...',
      editor: 'اېډېټر',
      sectionsEditor: 'د برخو اېډېټر',
      sectionsEditorSubtitle: 'د برخو ترتیب، لید او ځانګړي فیلډونه سم کړئ.',
      sectionWarnings: 'د برخو د نقشې خبرتیاوې',
      totalSections: 'ټولې برخې',
      visible: 'ښکاره',
      hidden: 'پټ',
      sectionLibrary: 'د برخو کتابتون',
      sectionLibraryHint: 'چمتو برخې زیاتې کړئ یا د پاڼې بشپړ اصلي جوړښت بېرته راوړئ.',
      manageMedia: 'رسنۍ اداره کړئ',
      sectionStyle: 'د برخې سبک',
      selectSectionStyle: 'د برخې سبک وټاکئ...',
      used: 'کارول شوی',
      add: 'زیاتول',
      hideMockups: 'ماک اپونه پټ کړئ',
      showMockups: 'ماک اپونه وښایئ',
      restoreDefaults: 'اصلي حالت راواړوئ',
      selected: 'ټاکل شوی',
      selectToAdd: 'د زیاتولو لپاره له لېست یا کارتونو څخه د برخې سبک وټاکئ.',
      alreadyUsed: (label) => `${label} په دې پاڼه کې له مخکې کارول شوی. بل سبک وټاکئ.`,
      readyToAdd: (label) => `د زیاتولو لپاره چمتو: ${label}`,
      untitledSection: 'بې سرلیکه برخه',
      type: 'ډول',
      order: 'ترتیب',
      custom: 'ځانګړی',
      dragToReorder: 'د ترتیب لپاره راکاږئ',
      drag: 'راکاږئ',
      expand: 'پراخول',
      sectionKey: 'د برخې کیلي',
      sectionType: 'د برخې ډول',
      orderLabel: 'ترتیب',
      visibleLabel: 'ښکاره',
      contentGroupFallback: 'منځپانګه',
      addItem: 'توکی زیات کړئ',
      remove: 'لرې کول',
      pasteOrPickMedia: 'URL ولیکئ یا له رسنیو یې وټاکئ',
      selectFromMedia: 'له رسنیو کتابتونه وټاکئ',
      noItems: 'لا توکي نشته. د پیل لپاره یو زیات کړئ.',
      advancedRaw: 'پرمختللی: د برخې خام JSON',
      applyRaw: 'خام JSON تطبیق کړئ',
      removeSection: 'برخه لرې کړئ',
      addSectionsHint: 'یوازې له برخو کتابتون څخه برخې زیاتې کړئ. د ترتیب لپاره سرلیکونه راکاږئ، بیا خوندي کړئ.',
      saveSections: 'برخې خوندي کړئ',
      liveDraftPreview: 'ژوندۍ مسوده مخکتنه',
      liveDraftPreviewHint: 'د خوندي شوې مسودې منځپانګه کاروي.',
      refresh: 'تازه کول',
      previewTitle: 'ژوندۍ مسوده مخکتنه',
      confirmPublish: 'خپرول تایید کړئ',
      reviewChanges: 'له خپرولو مخکې د ژوندۍ منځپانګې او اوسنۍ مسودې بدلونونه وڅېړئ.',
      summary: 'لنډیز',
      sectionsSummary: (a, r, c) => `زیات شوي: ${a}، لرې شوي: ${r}، نوي شوي: ${c}`,
      metaChanges: 'د meta بدلونونه',
      noMetaChanges: 'د meta بدلون ونه موندل شو.',
      sectionChanges: 'د برخو بدلونونه',
      noSectionChanges: 'د برخو بدلون ونه موندل شو.',
      cancel: 'لغوه',
      publishingNow: 'خپرېږي...',
      confirmPublishButton: 'خپرول تایید',
    },
  };
  const copy = copyByLanguage[language] || copyByLanguage.en;
  const ui = { ...copyByLanguage.en.ui, ...(localizedUiByLanguage[language] || {}), ...copy.ui };
  const localizeFieldLabel = (label) => fieldLabelTranslations[language]?.[label] || label;
  const localizeSectionKindLabel = (kind) =>
    sectionKindLabelTranslations[language]?.[kind] || SECTION_LIBRARY_LABELS[kind] || humanizeLabel(kind);
  const localizeSectionDescription = (kind, fallbackDescription) =>
    sectionKindDescriptionTranslations[language]?.[kind] || fallbackDescription;
  const localizeGroupLabel = (group) =>
    groupLabelTranslations[language]?.[group] || FIELD_GROUP_LABELS[group] || ui.contentGroupFallback;

  const [title, setTitle] = useState(page.title || '');
  const [seoTitle, setSeoTitle] = useState(page.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(page.seoDescription || '');
  const [sections, setSections] = useState(mapSections(page.sections || [], page.slug));
  const [publishedAt, setPublishedAt] = useState(page.publishedSnapshot?.publishedAt || null);
  const [status, setStatus] = useState('');
  const [publishHistory, setPublishHistory] = useState([]);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [jsonDrafts, setJsonDrafts] = useState({});
  const [publishNote, setPublishNote] = useState('');
  const [rollbackNote, setRollbackNote] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [publishDiff, setPublishDiff] = useState(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPreparingPublish, setIsPreparingPublish] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [previewRefreshKey, setPreviewRefreshKey] = useState(0);
  const [mediaAssets, setMediaAssets] = useState([]);
  // isMediaAssetsLoading removed — unused in current UI
  const [selectedLibraryKind, setSelectedLibraryKind] = useState('');
  const [isLibraryPreviewOpen, setIsLibraryPreviewOpen] = useState(false);
  const [draggedSectionIndex, setDraggedSectionIndex] = useState(null);
  const [dragOverSectionIndex, setDragOverSectionIndex] = useState(null);
  const previewHref = page.slug === 'home' ? '/?preview=1' : `/${page.slug}?preview=1`;
  const liveHref = page.slug === 'home' ? '/' : `/${page.slug}`;
  const previewFrameHref = previewRefreshKey
    ? `${previewHref}${previewHref.includes('?') ? '&' : '?'}previewKey=${previewRefreshKey}`
    : previewHref;

  useEffect(() => {
    setPreviewRefreshKey(Date.now());
  }, [page.id]);

  useEffect(() => {
    setSelectedLibraryKind('');
    setIsLibraryPreviewOpen(false);
  }, [page.id, page.slug]);

  const updateSectionField = (index, key, value) => {
    setSections((current) =>
      current.map((section, idx) =>
        idx === index
          ? {
              ...section,
              [key]: value,
            }
          : section
      )
    );
  };

  const updateSectionContentField = (index, key, value) => {
    setSections((current) =>
      current.map((section, idx) =>
        idx === index
          ? {
              ...section,
              content: {
                ...section.content,
                [key]: value,
              },
            }
          : section
      )
    );
  };

  const updateSectionListField = (index, key, value) => {
    const list = String(value).split('\n');
    updateSectionContentField(index, key, list);
  };

  const updateSectionItemField = (sectionIndex, arrayKey, itemIndex, itemField, value) => {
    setSections((current) =>
      current.map((section, idx) => {
        if (idx !== sectionIndex) return section;

        const currentItems = Array.isArray(section.content?.[arrayKey])
          ? section.content[arrayKey]
          : [];

        const nextItems = currentItems.map((item, i) =>
          i === itemIndex
            ? {
                ...item,
                [itemField]: value,
              }
            : item
        );

        return {
          ...section,
          content: {
            ...section.content,
            [arrayKey]: nextItems,
          },
        };
      })
    );
  };

  const addSectionItem = (sectionIndex, arrayKey, itemType) => {
    setSections((current) =>
      current.map((section, idx) => {
        if (idx !== sectionIndex) return section;

        const currentItems = Array.isArray(section.content?.[arrayKey])
          ? section.content[arrayKey]
          : [];

        return {
          ...section,
          content: {
            ...section.content,
            [arrayKey]: [...currentItems, createEmptyItem(itemType)],
          },
        };
      })
    );
  };

  const removeSectionItem = (sectionIndex, arrayKey, itemIndex) => {
    setSections((current) =>
      current.map((section, idx) => {
        if (idx !== sectionIndex) return section;

        const currentItems = Array.isArray(section.content?.[arrayKey])
          ? section.content[arrayKey]
          : [];

        return {
          ...section,
          content: {
            ...section.content,
            [arrayKey]: currentItems.filter((_, i) => i !== itemIndex),
          },
        };
      })
    );
  };

  const setDraft = (draftKey, value) => {
    setJsonDrafts((current) => ({ ...current, [draftKey]: value }));
  };

  const clearDraft = (draftKey) => {
    setJsonDrafts((current) => {
      const next = { ...current };
      delete next[draftKey];
      return next;
    });
  };

  const applyJsonFieldDraft = (index, fieldKey) => {
    const draftKey = `${index}:${fieldKey}`;
    const draft = jsonDrafts[draftKey];
    if (draft === undefined) return;

    try {
      const parsed = JSON.parse(draft);
      updateSectionContentField(index, fieldKey, parsed);
      clearDraft(draftKey);
      setStatus('');
    } catch {
      setStatus(copy.statuses.invalidJson(fieldKey));
    }
  };

  const applyRawContentDraft = (index) => {
    const draftKey = `${index}:__raw`;
    const draft = jsonDrafts[draftKey];
    if (draft === undefined) return;

    try {
      const parsed = JSON.parse(draft);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        setStatus(copy.statuses.rawMustBeObject);
        return;
      }

      updateSectionField(index, 'content', parsed);
      clearDraft(draftKey);
      setStatus(copy.statuses.rawApplied);
    } catch {
      setStatus(copy.statuses.rawInvalid);
    }
  };

  const removeSection = (index) => {
    setSections((current) =>
      current
        .filter((_, idx) => idx !== index)
        .map((section, idx) => ({
          ...section,
          orderIndex: idx + 1,
        }))
    );
  };

  const moveSection = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;

    setSections((current) => {
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= current.length || toIndex >= current.length) {
        return current;
      }

      const next = [...current];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);

      return next.map((section, idx) => ({
        ...section,
        orderIndex: idx + 1,
      }));
    });

    setStatus(copy.statuses.sectionOrderUpdated);
  };

  const onSectionDragStart = (index) => {
    setDraggedSectionIndex(index);
    setDragOverSectionIndex(index);
  };

  const onSectionDragOver = (index, event) => {
    event.preventDefault();
    if (dragOverSectionIndex !== index) {
      setDragOverSectionIndex(index);
    }
  };

  const onSectionDrop = (index, event) => {
    event.preventDefault();
    if (draggedSectionIndex === null) return;
    moveSection(draggedSectionIndex, index);
    setDraggedSectionIndex(null);
    setDragOverSectionIndex(null);
  };

  const onSectionDragEnd = () => {
    setDraggedSectionIndex(null);
    setDragOverSectionIndex(null);
  };

  const addSectionFromLibrary = (kindOverride) => {
    const eventLike =
      kindOverride && typeof kindOverride === 'object' && 'preventDefault' in kindOverride;
    const rawKind = eventLike ? '' : kindOverride;
    const kind = (rawKind || selectedLibraryKind || '').toString();
    if (!kind) {
      setStatus(copy.statuses.chooseSectionStyle);
      return;
    }

    const validLibraryKinds = new Set(sectionLibrary.map((item) => item.value));
    if (!validLibraryKinds.has(kind)) {
      setStatus(copy.statuses.invalidSectionStyle);
      return;
    }

    const alreadyExists = sections.some(
      (section) => getSectionKindForPage(section, page.slug) === kind
    );

    const isHomeHeroVariant = kind === 'homehero' || kind === 'homeheroslider';
    const hasExistingHomeHeroVariant =
      isHomeHeroVariant &&
      sections.some((section) => {
        const sectionKind = getSectionKindForPage(section, page.slug);
        return sectionKind === 'homehero' || sectionKind === 'homeheroslider';
      });

    if (hasExistingHomeHeroVariant) {
      setStatus(copy.statuses.oneHeroOnly);
      return;
    }

    if (alreadyExists) {
      setStatus(copy.statuses.alreadyExists(localizeSectionKindLabel(kind)));
      return;
    }

    setSections((current) => {
      const usedKeys = new Set(current.map((section) => section.sectionKey).filter(Boolean));
      const next = createSectionFromKind({
        kind,
        pageSlug: page.slug,
        orderIndex: current.length + 1,
        usedKeys,
      });
      return [...current, next];
    });

    setStatus(copy.statuses.addedSection(localizeSectionKindLabel(kind)));
  };

  const restoreDefaultSections = () => {
    const expectedKinds = EXPECTED_SECTION_KINDS_BY_SLUG[page.slug] || [];
    if (!expectedKinds.length) {
      setStatus(copy.statuses.noDefaults);
      return;
    }

    const shouldReplace = globalThis.confirm(
      copy.confirmRestore
    );
    if (!shouldReplace) return;

    const usedKeys = new Set();
    const nextSections = expectedKinds.map((kind, index) =>
      createSectionFromKind({
        kind,
        pageSlug: page.slug,
        orderIndex: index + 1,
        usedKeys,
      })
    );

    setSections(nextSections);
    setStatus(copy.statuses.defaultsRestored);
  };

  const savePageMeta = async () => {
    setStatus(copy.statuses.saveMeta);

    const response = await fetch(`/api/pages/${page.slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, seoTitle, seoDescription }),
    });

    if (!response.ok) {
      setStatus(copy.statuses.saveMetaFailed);
      return;
    }

    setStatus(copy.statuses.saveMetaDone);
    setPreviewRefreshKey(Date.now());
  };

  const saveSections = async () => {
    setStatus(copy.statuses.saveSections);

    const usedKeys = new Set();
    const payloadSections = sections.map((section, index) => {
      const safeSectionKey =
        typeof section.sectionKey === 'string' ? section.sectionKey : `section-${index + 1}`;
      const safeSectionType = typeof section.sectionType === 'string' ? section.sectionType : '';
      const safeContent = (() => {
        try {
          return JSON.parse(JSON.stringify(section.content || {}));
        } catch {
          return {};
        }
      })();

      const fallbackKey = safeSectionKey || `section-${index + 1}`;
      const normalizedKey = getCanonicalSectionKey(section, page.slug, fallbackKey);

      let finalKey = normalizedKey;
      if (usedKeys.has(finalKey)) {
        let suffix = 2;
        while (usedKeys.has(`${normalizedKey}-${suffix}`)) suffix += 1;
        finalKey = `${normalizedKey}-${suffix}`;
      }
      usedKeys.add(finalKey);

      return {
        sectionKey: finalKey,
        sectionType: safeSectionType,
        orderIndex: Number(section.orderIndex) || index + 1,
        isVisible: Boolean(section.isVisible),
        content: safeContent,
      };
    });

    try {
      const response = await fetch(`/api/pages/${page.slug}/sections`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: payloadSections }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message = payload?.details || payload?.error || 'Unknown error';

        if (response.status === 401) {
          setStatus(copy.statuses.saveSectionsUnauthorized);
          return;
        }

        setStatus(copy.statuses.saveSectionsFailed(response.status, message));
        return;
      }

      setStatus(copy.statuses.saveSectionsDone);
      setPreviewRefreshKey(Date.now());
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(copy.statuses.saveSectionsError(message));
    }
  };

  const validateDraftForPublish = async () => {
    setStatus(copy.statuses.validating);

    const response = await fetch(`/api/admin/pages/${page.id}/validate`);
    if (!response.ok) {
      setStatus(copy.statuses.validationRequestFailed);
      return;
    }

    const payload = await response.json();
    const errors = payload?.validation?.errors || [];
    setValidationErrors(errors);

    if (errors.length) {
      setStatus(copy.statuses.validationIssues);
      return;
    }

    setStatus(copy.statuses.validationPassed);
  };

  const loadPublishHistory = useCallback(async () => {
    setIsHistoryLoading(true);

    const response = await fetch(`/api/admin/pages/${page.id}/publish-history`);

    if (!response.ok) {
      setIsHistoryLoading(false);
      return;
    }

    const payload = await response.json();
    setPublishHistory(Array.isArray(payload?.revisions) ? payload.revisions : []);
    setIsHistoryLoading(false);
  }, [page.id]);

  const openPublishConfirm = async () => {
    setIsPreparingPublish(true);
    setStatus(copy.statuses.preparingPublish);

    const [validationResponse, diffResponse] = await Promise.all([
      fetch(`/api/admin/pages/${page.id}/validate`),
      fetch(`/api/admin/pages/${page.id}/diff`),
    ]);

    if (!validationResponse.ok || !diffResponse.ok) {
      setIsPreparingPublish(false);
      setStatus(copy.statuses.preparingPublishFailed);
      return;
    }

    const validationPayload = await validationResponse.json();
    const diffPayload = await diffResponse.json();

    const errors = validationPayload?.validation?.errors || [];
    setValidationErrors(errors);

    if (errors.length) {
      setIsPreparingPublish(false);
      setStatus(copy.statuses.publishBlocked);
      return;
    }

    setPublishDiff(diffPayload?.diff || null);
    setIsPreparingPublish(false);
    setIsPublishModalOpen(true);
    setStatus(copy.statuses.reviewAndConfirm);
  };

  const publishPage = async () => {
    setIsPublishing(true);
    setStatus(copy.statuses.publishing);

    const response = await fetch(`/api/admin/pages/${page.id}/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: publishNote }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      const errors = payload?.validation?.errors;
  setIsPublishing(false);
       if (Array.isArray(errors) && errors.length) {
         setValidationErrors(errors);
         setStatus(copy.statuses.publishBlocked);
         return;
       }
 
       setStatus(copy.statuses.publishFailed);
       return;
     }
 
     const payload = await response.json();
     setPublishedAt(payload?.publishedAt || null);
     setValidationErrors([]);
    setStatus(copy.statuses.published);
     setIsPublishModalOpen(false);
  setIsPublishing(false);
     loadPublishHistory();
     setPreviewRefreshKey(Date.now());
   };

  const rollbackToRevision = async (revisionId) => {
    setStatus(copy.statuses.rollingBack);

    const response = await fetch(`/api/admin/pages/${page.id}/rollback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ revisionId, note: rollbackNote }),
    });

    if (!response.ok) {
      setStatus(copy.statuses.rollbackFailed);
      return;
    }

    const payload = await response.json();
    setPublishedAt(payload?.publishedAt || null);
    setStatus(copy.statuses.rollbackDone);
    loadPublishHistory();
    globalThis.location.reload();
  };

  useEffect(() => {
    setPreviewRefreshKey(Date.now());
  }, []);

  const loadMediaAssets = useCallback(async () => {
    try {
      const response = await fetch('/api/media');
      if (!response.ok) return;

      const payload = await response.json();
      setMediaAssets(Array.isArray(payload?.mediaAssets) ? payload.mediaAssets : []);
    } catch {
      setMediaAssets([]);
    }
  }, []);

  useEffect(() => {
    loadMediaAssets();
  }, [loadMediaAssets]);

  useEffect(() => {
    loadPublishHistory();
  }, [loadPublishHistory]);

  const historySummary = useMemo(() => {
    if (!publishDiff) return null;
    return publishDiff.summary || { added: 0, removed: 0, changed: 0 };
  }, [publishDiff]);

  const sectionMismatchWarnings = useMemo(() => {
    const expectedKinds = [
      ...(EXPECTED_SECTION_KINDS_BY_SLUG[page.slug] || []),
      ...(OPTIONAL_SECTION_LIBRARY_KINDS_BY_SLUG[page.slug] || []),
    ];
    if (!expectedKinds.length) return [];

    return sections
      .map((section, index) => {
        const kind = getSectionKindForPage(section, page.slug);
        if (kind === 'default' || expectedKinds.includes(kind)) return null;

        const sectionKey = section.sectionKey || `section-${index + 1}`;
        const sectionType = section.sectionType || ui.custom;
        const kindLabel =
          sectionKindLabelTranslations[language]?.[kind] ||
          SECTION_LIBRARY_LABELS[kind] ||
          humanizeLabel(kind);

        if (language === 'fa') {
          return `بخش ${index + 1} (${sectionKey} / ${sectionType}) به '${kindLabel}' نگاشت می شود که برای /${page.slug} غیرمعمول است.`;
        }

        if (language === 'ps') {
          return `برخه ${index + 1} (${sectionKey} / ${sectionType}) د '${kindLabel}' سره برابره شوې چې د /${page.slug} لپاره غیرمعمولي ده.`;
        }

        return `Section ${index + 1} (${sectionKey} / ${sectionType}) maps to '${kindLabel}', which is unusual for /${page.slug}.`;
      })
      .filter(Boolean);
  }, [language, page.slug, sections, ui.custom]);

  const visiblePublishHistory = showAllHistory ? publishHistory : publishHistory.slice(0, 3);
  const sectionLibrary = useMemo(() => getSectionLibraryForPage(page.slug), [page.slug]);
  const usedSectionKinds = useMemo(
    () => new Set(sections.map((section) => getSectionKindForPage(section, page.slug))),
    [page.slug, sections]
  );
  const sectionLibraryItems = useMemo(
    () =>
      sectionLibrary.map((item) => ({
        ...item,
        isUsed: usedSectionKinds.has(item.value),
      })),
    [sectionLibrary, usedSectionKinds]
  );
  const selectedLibraryItem = useMemo(
    () => sectionLibraryItems.find((item) => item.value === selectedLibraryKind) || null,
    [sectionLibraryItems, selectedLibraryKind]
  );
  const canAddFromLibrary = Boolean(selectedLibraryItem && !selectedLibraryItem.isUsed);

  return (
    <>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,1fr)]">
        <div className="space-y-5">
          <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
            <div
              className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
              style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
            />
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'var(--theme-primary)' }}
            >
              {ui.publish}
            </span>
            <h2 className="mt-1 text-base font-extrabold text-slate-900 dark:text-white">{ui.publishing}</h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {publishedAt
                ? ui.publishedAt(new Date(publishedAt).toLocaleString(locale))
                : ui.noPublished}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={validateDraftForPublish}
                className="rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-200"
                style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)' }}
              >
                {ui.checkReadiness}
              </button>

              <button
                type="button"
                onClick={openPublishConfirm}
                disabled={isPreparingPublish}
                className="rounded-xl px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
              >
                {isPreparingPublish ? ui.preparing : ui.reviewPublish}
              </button>

              <a
                href={previewHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-200"
                style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)' }}
              >
                {ui.openPreview}
              </a>

              <a
                href={liveHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
              >
                {ui.openLivePage}
              </a>
            </div>

            <label className="mt-4 block space-y-1.5 text-sm font-medium">
              <span className="text-slate-700 dark:text-slate-300">{ui.publishNote}</span>
              <input
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={publishNote}
                onChange={(event) => setPublishNote(event.target.value)}
                placeholder={ui.publishPlaceholder}
              />
            </label>

            <label className="mt-3 block space-y-1.5 text-sm font-medium">
              <span className="text-slate-700 dark:text-slate-300">{ui.rollbackNote}</span>
              <input
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={rollbackNote}
                onChange={(event) => setRollbackNote(event.target.value)}
                placeholder={ui.rollbackPlaceholder}
              />
            </label>

            {validationErrors.length ? (
              <div className="mt-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 p-3">
                <p className="text-sm font-semibold text-rose-700 dark:text-rose-400">
                  {ui.validationIssuesTitle}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-700 dark:text-rose-400">
                  {validationErrors.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
            <div
              className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
              style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
            />
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'var(--theme-primary)' }}
            >
              {ui.seo}
            </span>
            <h2 className="mt-1 text-base font-extrabold text-slate-900 dark:text-white">{ui.pageSeo}</h2>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="space-y-1.5 text-sm font-medium">
                <span className="text-slate-700 dark:text-slate-300">{ui.title}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
                  style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder={ui.pageTitlePlaceholder}
                />
              </label>

              <label className="space-y-1.5 text-sm font-medium">
                <span className="text-slate-700 dark:text-slate-300">{ui.seoTitle}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
                  style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                  value={seoTitle}
                  onChange={(event) => setSeoTitle(event.target.value)}
                  placeholder={ui.seoTitlePlaceholder}
                />
              </label>
            </div>

            <label className="mt-3 block space-y-1.5 text-sm font-medium">
              <span className="text-slate-700 dark:text-slate-300">{ui.seoDescription}</span>
              <textarea
                rows={3}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2 resize-none"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={seoDescription}
                onChange={(event) => setSeoDescription(event.target.value)}
                placeholder={ui.seoDescriptionPlaceholder}
              />
            </label>

            <button
              type="button"
              onClick={savePageMeta}
              className="mt-4 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
            >
              {ui.saveSeo}
            </button>
          </section>

          <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
            <div
              className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
              style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
            />
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'var(--theme-primary)' }}
            >
              {ui.history}
            </span>
            <h2 className="mt-1 text-base font-extrabold text-slate-900 dark:text-white">{ui.publishHistory}</h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {ui.showingRecent(Math.min(visiblePublishHistory.length, 3))}{' '}
              {ui.historySubtitle}
            </p>

            <div className="mt-4 space-y-2">
              {visiblePublishHistory.map((revision) => (
                <div
                  key={revision.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{revision.title || page.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {revision.actionType === 'rollback' ? ui.rollback : ui.publishAction}:{' '}
                      {new Date(revision.publishedAt).toLocaleString(locale)}
                    </p>
                    {revision.actorEmail ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {ui.by}: {revision.actorEmail}
                      </p>
                    ) : null}
                    {revision.note ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400">{ui.note}: {revision.note}</p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={() => rollbackToRevision(revision.id)}
                    className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition-all duration-200"
                  >
                    {ui.rollbackThis}
                  </button>
                </div>
              ))}

              {!publishHistory.length && !isHistoryLoading ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {ui.noHistory}
                </p>
              ) : null}

              {publishHistory.length > 3 ? (
                <button
                  type="button"
                  onClick={() => setShowAllHistory((current) => !current)}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
                >
                  {showAllHistory
                    ? ui.showRecent3
                    : ui.showAll(publishHistory.length)}
                </button>
              ) : null}

              {isHistoryLoading ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">{ui.loadingHistory}</p>
              ) : null}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
            <div
              className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
              style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
            />
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'var(--theme-primary)' }}
            >
              {ui.editor}
            </span>
            <h2 className="mt-1 text-base font-extrabold text-slate-900 dark:text-white">{ui.sectionsEditor}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {ui.sectionsEditorSubtitle}
            </p>

            {sectionMismatchWarnings.length ? (
              <div className="mt-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 p-3">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                  {ui.sectionWarnings}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-amber-800 dark:text-amber-300">
                  {sectionMismatchWarnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {[
                { label: ui.totalSections, value: sections.length },
                { label: ui.visible, value: sections.filter((s) => s.isVisible).length },
                { label: ui.hidden, value: sections.filter((s) => !s.isVisible).length },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  {stat.label}: <span className="text-slate-900 dark:text-white tabular-nums">{stat.value}</span>
                </div>
              ))}
            </div>

            {sectionLibraryItems.length ? (
              <div className="mt-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                  {ui.sectionLibrary}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {ui.sectionLibraryHint}
                  {' '}<a href="/admin/media" className="font-semibold underline" style={{ color: 'var(--theme-primary)' }}>{ui.manageMedia}</a>
                </p>
                <div className="mt-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-gray-950 p-3">
                  <div className="flex flex-wrap items-end gap-2">
                    <label className="flex-1 min-w-[200px] space-y-1 text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300">
                      <span>{ui.sectionStyle}</span>
                      <select
                        value={selectedLibraryKind}
                        onChange={(event) => setSelectedLibraryKind(event.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2"
                        style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                      >
                        <option value="">{ui.selectSectionStyle}</option>
                        {sectionLibraryItems.map((item) => (
                          <option key={item.value} value={item.value}>
                            {localizeSectionKindLabel(item.value)}{item.isUsed ? ` (${ui.used})` : ''}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      onClick={() => addSectionFromLibrary()}
                      disabled={!canAddFromLibrary}
                      className="rounded-lg border px-4 py-2 text-xs font-semibold min-w-[64px] text-center transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        borderColor: 'var(--theme-primary)',
                        color: 'var(--theme-primary)',
                      }}
                    >
                      {ui.add}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsLibraryPreviewOpen((current) => !current)}
                      className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-semibold min-w-[110px] text-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
                    >
                      {isLibraryPreviewOpen ? ui.hideMockups : ui.showMockups}
                    </button>
                    <button
                      type="button"
                      onClick={restoreDefaultSections}
                      className="rounded-lg border border-amber-400 dark:border-amber-700 px-4 py-2 text-xs font-semibold min-w-[120px] text-center text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-200"
                    >
                      {ui.restoreDefaults}
                    </button>
                  </div>
                </div>

                {isLibraryPreviewOpen ? (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {sectionLibraryItems.map((item) => {
                      const isSelected = selectedLibraryKind === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setSelectedLibraryKind(item.value)}
                          className={`rounded-2xl border bg-white p-3 text-left shadow-sm transition dark:bg-gray-950 ${
                            isSelected
                              ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-900'
                              : 'border-gray-200 hover:border-indigo-300 dark:border-gray-700'
                          }`}
                        >
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {localizeSectionKindLabel(item.value)}
                            </p>
                            {item.isUsed ? (
                              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                                {ui.used}
                              </Badge>
                            ) : null}
                            {isSelected ? (
                              <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                {ui.selected}
                              </Badge>
                            ) : null}
                          </div>
                          <p className="mb-3 text-xs text-gray-600 dark:text-gray-300">
                            {localizeSectionDescription(item.value, item.description)}
                          </p>
                          <SectionLibraryPreview
                            kind={item.value}
                            previewStyle={item.previewStyle}
                            isUsed={item.isUsed}
                          />
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {!selectedLibraryItem ? (
                  <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
                    {ui.selectToAdd}
                  </p>
                ) : selectedLibraryItem.isUsed ? (
                  <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">
                    {ui.alreadyUsed(localizeSectionKindLabel(selectedLibraryItem.value))}
                  </p>
                ) : (
                  <p className="mt-3 text-xs text-emerald-700 dark:text-emerald-300">
                    {ui.readyToAdd(localizeSectionKindLabel(selectedLibraryItem.value))}
                  </p>
                )}
              </div>
            ) : null}

            <div className="space-y-4">
              {sections.map((section, index) => {
                const sectionFieldSchema = getSectionFieldSchema(section, page.slug);
                const isDragTarget = dragOverSectionIndex === index;
                const isDragging = draggedSectionIndex === index;

                return (
                <details
                  key={`${section.sectionKey}-${index}`}
                  onDragOver={(event) => onSectionDragOver(index, event)}
                  onDrop={(event) => onSectionDrop(index, event)}
                  className={`rounded-lg border bg-gray-50 transition-all duration-200 ease-out dark:bg-gray-950 ${
                    isDragTarget
                      ? 'border-indigo-400 ring-2 ring-indigo-100 shadow-md -translate-y-0.5 dark:border-indigo-700 dark:ring-indigo-900/50'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <summary
                    draggable
                    onDragStart={() => onSectionDragStart(index)}
                    onDragEnd={onSectionDragEnd}
                    className={`flex list-none items-center justify-between gap-3 rounded-lg px-4 py-3 transition-colors ${
                      isDragging ? 'cursor-grabbing bg-indigo-50/70 dark:bg-indigo-950/30' : 'cursor-grab'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {index + 1}. {humanizeLabel(section.sectionKey) || ui.untitledSection}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {ui.type}: {localizeSectionKindLabel(getSectionKindForPage(section, page.slug)) || ui.custom}
                        {' · '}
                        {ui.order}: {section.orderIndex}
                        {' · '}
                        {section.isVisible ? ui.visible : ui.hidden}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        title={ui.dragToReorder}
                        aria-label={ui.dragToReorder}
                        className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-3 w-3"
                        >
                          <circle cx="5" cy="4" r="1" />
                          <circle cx="5" cy="8" r="1" />
                          <circle cx="5" cy="12" r="1" />
                          <circle cx="11" cy="4" r="1" />
                          <circle cx="11" cy="8" r="1" />
                          <circle cx="11" cy="12" r="1" />
                        </svg>
                        {ui.drag}
                      </span>
                      <span className="rounded-full border border-gray-300 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                        {ui.expand}
                      </span>
                    </div>
                  </summary>

                  <div className="border-t border-gray-200 px-4 py-4 dark:border-gray-700">
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="space-y-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                      <span>{ui.sectionKey}</span>
                      <input
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                        value={section.sectionKey}
                        onChange={(event) =>
                          updateSectionField(index, 'sectionKey', event.target.value)
                        }
                      />
                    </label>

                    <label className="space-y-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                      <span>{ui.sectionType}</span>
                      <input
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                        value={section.sectionType}
                        onChange={(event) =>
                          updateSectionField(index, 'sectionType', event.target.value)
                        }
                      />
                    </label>

                    <label className="space-y-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                      <span>{ui.orderLabel}</span>
                      <input
                        type="number"
                        min="1"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                        value={section.orderIndex}
                        onChange={(event) =>
                          updateSectionField(index, 'orderIndex', Number(event.target.value))
                        }
                      />
                    </label>

                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input
                        type="checkbox"
                        checked={section.isVisible}
                        onChange={(event) =>
                          updateSectionField(index, 'isVisible', event.target.checked)
                        }
                      />
                      <span>{ui.visibleLabel}</span>
                    </label>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {sectionFieldSchema.map((field, fieldIndex) => {
                      const fieldValue = section.content?.[field.key];
                      const draftKey = `${index}:${field.key}`;
                      const group = getFieldGroup(field);
                      const previousGroup =
                        fieldIndex > 0 ? getFieldGroup(sectionFieldSchema[fieldIndex - 1]) : null;
                      const shouldRenderGroupHeader = fieldIndex === 0 || previousGroup !== group;

                      const groupHeader = shouldRenderGroupHeader ? (
                        <div
                          key={`${field.key}-group-header`}
                          className="md:col-span-2 mt-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                        >
                          {localizeGroupLabel(group)}
                        </div>
                      ) : null;

                      if (field.type === 'textarea') {
                        return (
                          <Fragment key={field.key}>
                            {groupHeader}
                            <label
                              className="space-y-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300 md:col-span-2"
                            >
                              <span>{localizeFieldLabel(field.label)}</span>
                              <textarea
                                rows={3}
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                                value={String(fieldValue || '')}
                                onChange={(event) =>
                                  updateSectionContentField(index, field.key, event.target.value)
                                }
                              />
                            </label>
                          </Fragment>
                        );
                      }

                      if (field.type === 'list') {
                        return (
                          <Fragment key={field.key}>
                            {groupHeader}
                            <label
                              className="space-y-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300 md:col-span-2"
                            >
                              <span>{localizeFieldLabel(field.label)}</span>
                              <textarea
                                rows={4}
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm dark:border-gray-700 dark:bg-gray-900"
                                value={Array.isArray(fieldValue) ? fieldValue.join('\n') : ''}
                                onChange={(event) =>
                                  updateSectionListField(index, field.key, event.target.value)
                                }
                              />
                            </label>
                          </Fragment>
                        );
                      }

                      if (field.type === 'items') {
                        const items = Array.isArray(fieldValue) ? fieldValue : [];
                        const itemSchema = ITEM_FIELD_SCHEMAS[field.itemType] || [];

                        return (
                          <Fragment key={field.key}>
                            {groupHeader}
                            <div
                              className="space-y-2 rounded-md border border-gray-200 bg-white p-3 md:col-span-2 dark:border-gray-700 dark:bg-gray-900"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                                  {localizeFieldLabel(field.label)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => addSectionItem(index, field.key, field.itemType)}
                                  className="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
                                >
                                  {ui.addItem}
                                </button>
                              </div>

                            <div className="space-y-3">
                              {items.map((item, itemIndex) => (
                                <div
                                  key={`${field.key}-${itemIndex}`}
                                  className="rounded-md border border-gray-200 p-3 dark:border-gray-700"
                                >
                                  <div className="mb-2 flex items-center justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                      {field.itemType} #{itemIndex + 1}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() => removeSectionItem(index, field.key, itemIndex)}
                                      className="rounded-md bg-rose-600 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-700"
                                    >
                                      {ui.remove}
                                    </button>
                                  </div>

                                  <div className="grid gap-2 md:grid-cols-2">
                                    {itemSchema.map((itemField) => {
                                      if (itemField.type === 'textarea') {
                                        return (
                                          <label
                                            key={itemField.key}
                                            className="space-y-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300 md:col-span-2"
                                          >
                                            <span>{localizeFieldLabel(itemField.label)}</span>
                                            <textarea
                                              rows={3}
                                              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
                                              value={String(item[itemField.key] || '')}
                                              onChange={(event) =>
                                                updateSectionItemField(
                                                  index,
                                                  field.key,
                                                  itemIndex,
                                                  itemField.key,
                                                  event.target.value
                                                )
                                              }
                                            />
                                          </label>
                                        );
                                      }

                                      if (itemField.mediaType) {
                                        const itemValue = String(item[itemField.key] || '');
                                        const mediaOptions = mediaAssets.filter((asset) =>
                                          mediaAssetMatchesType(asset, itemField.mediaType)
                                        );

                                        return (
                                          <div
                                            key={itemField.key}
                                            className="space-y-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300"
                                          >
                                            <span>{localizeFieldLabel(itemField.label)}</span>
                                            <input
                                              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
                                              value={itemValue}
                                              onChange={(event) =>
                                                updateSectionItemField(
                                                  index,
                                                  field.key,
                                                  itemIndex,
                                                  itemField.key,
                                                  event.target.value
                                                )
                                              }
                                              placeholder={ui.pasteOrPickMedia}
                                            />
                                            <select
                                              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs dark:border-gray-700 dark:bg-gray-950"
                                              value={
                                                mediaOptions.some((asset) => asset.url === itemValue)
                                                  ? itemValue
                                                  : ''
                                              }
                                              onChange={(event) =>
                                                updateSectionItemField(
                                                  index,
                                                  field.key,
                                                  itemIndex,
                                                  itemField.key,
                                                  event.target.value
                                                )
                                              }
                                            >
                                              <option value="">{ui.selectFromMedia}</option>
                                              {mediaOptions.map((asset) => (
                                                <option key={asset.id} value={asset.url}>
                                                  {asset.name}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        );
                                      }

                                      return (
                                        <label
                                          key={itemField.key}
                                          className="space-y-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300"
                                        >
                                          <span>{localizeFieldLabel(itemField.label)}</span>
                                          <input
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
                                            value={String(item[itemField.key] || '')}
                                            onChange={(event) =>
                                              updateSectionItemField(
                                                index,
                                                field.key,
                                                itemIndex,
                                                itemField.key,
                                                event.target.value
                                              )
                                            }
                                          />
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}

                              {!items.length ? (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {ui.noItems}
                                </p>
                              ) : null}
                            </div>
                            </div>
                          </Fragment>
                        );
                      }

                      if (field.type === 'json') {
                        return (
                          <Fragment key={field.key}>
                            {groupHeader}
                            <label
                              className="space-y-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300 md:col-span-2"
                            >
                              <span>{localizeFieldLabel(field.label)}</span>
                              <textarea
                                rows={5}
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm dark:border-gray-700 dark:bg-gray-900"
                                value={jsonDrafts[draftKey] ?? stringifyJsonValue(fieldValue ?? {})}
                                onChange={(event) => setDraft(draftKey, event.target.value)}
                                onBlur={() => applyJsonFieldDraft(index, field.key)}
                              />
                            </label>
                          </Fragment>
                        );
                      }

                      if (field.mediaType) {
                        const stringValue = String(fieldValue || '');
                        const mediaOptions = mediaAssets.filter((asset) =>
                          mediaAssetMatchesType(asset, field.mediaType)
                        );

                        return (
                          <Fragment key={field.key}>
                            {groupHeader}
                            <div
                              className="space-y-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300"
                            >
                              <span>{localizeFieldLabel(field.label)}</span>
                              <input
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                                value={stringValue}
                                onChange={(event) =>
                                  updateSectionContentField(index, field.key, event.target.value)
                                }
                                placeholder={ui.pasteOrPickMedia}
                              />
                              <select
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs dark:border-gray-700 dark:bg-gray-900"
                                value={
                                  mediaOptions.some((asset) => asset.url === stringValue)
                                    ? stringValue
                                    : ''
                                }
                                onChange={(event) =>
                                  updateSectionContentField(index, field.key, event.target.value)
                                }
                              >
                                <option value="">{ui.selectFromMedia}</option>
                                {mediaOptions.map((asset) => (
                                  <option key={asset.id} value={asset.url}>
                                    {asset.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Fragment>
                        );
                      }

                      return (
                        <Fragment key={field.key}>
                          {groupHeader}
                          <label
                            className="space-y-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300"
                          >
                            <span>{localizeFieldLabel(field.label)}</span>
                            <input
                              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                              value={String(fieldValue || '')}
                              onChange={(event) =>
                                updateSectionContentField(index, field.key, event.target.value)
                              }
                            />
                          </label>
                          </Fragment>
                      );
                    })}

                    <details className="md:col-span-2">
                      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                        {ui.advancedRaw}
                      </summary>
                      <div className="mt-2 space-y-2">
                        <textarea
                          rows={8}
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm dark:border-gray-700 dark:bg-gray-900"
                          value={jsonDrafts[`${index}:__raw`] ?? stringifyJsonValue(section.content || {})}
                          onChange={(event) => setDraft(`${index}:__raw`, event.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => applyRawContentDraft(index)}
                          className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                        >
                          {ui.applyRaw}
                        </button>
                      </div>
                    </details>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
                    >
                      {ui.removeSection}
                    </button>
                  </div>
                  </div>
                </details>
              );
            })}

              <p className="rounded-xl border px-3 py-2 text-xs"
                style={{
                  borderColor: 'color-mix(in srgb, var(--theme-primary) 30%, transparent)',
                  backgroundColor: 'color-mix(in srgb, var(--theme-primary) 8%, transparent)',
                  color: 'var(--theme-primary)',
                }}
              >
                {ui.addSectionsHint}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={saveSections}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
                style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
              >
                {ui.saveSections}
              </button>
              {status ? (
                <p className={`text-sm font-medium ${
                  /failed|error/i.test(status)
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  {status}
                </p>
              ) : null}
            </div>
          </section>
        </div>

        <aside className="self-start xl:sticky xl:top-24">
          <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-4 shadow-sm dark:shadow-black/30">
            <div
              className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
              style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
            />
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">
                  {ui.liveDraftPreview}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {ui.liveDraftPreviewHint}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewRefreshKey(Date.now())}
                className="rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
              >
                {ui.refresh}
              </button>
            </div>

            <iframe
              key={previewFrameHref}
              title={ui.previewTitle}
              src={previewFrameHref}
              className="mt-3 h-[72vh] w-full rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-gray-950"
            />
          </section>
        </aside>
      </div>

      {isPublishModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white dark:bg-gray-950 p-6 shadow-2xl dark:shadow-black/60">
            <div
              className="h-0.5 rounded-full mb-4"
              style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
            />
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{ui.confirmPublish}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {ui.reviewChanges}
            </p>

            <div className="mt-4 rounded-xl border px-4 py-3 text-sm"
              style={{
                borderColor: 'color-mix(in srgb, var(--theme-primary) 25%, transparent)',
                backgroundColor: 'color-mix(in srgb, var(--theme-primary) 8%, transparent)',
              }}
            >
              <p className="font-semibold" style={{ color: 'var(--theme-primary)' }}>{ui.summary}</p>
              <p className="mt-1" style={{ color: 'var(--theme-primary)' }}>
                {ui.sectionsSummary(historySummary?.added || 0, historySummary?.removed || 0, historySummary?.changed || 0)}
              </p>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{ui.metaChanges}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
                  {(publishDiff?.metaChanges || []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                  {!publishDiff?.metaChanges?.length ? <li className="text-slate-500 dark:text-slate-500">{ui.noMetaChanges}</li> : null}
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{ui.sectionChanges}</p>
                <ul className="mt-2 max-h-56 list-disc space-y-1 overflow-y-auto pl-5 text-sm text-slate-600 dark:text-slate-400">
                  {(publishDiff?.sectionChanges || []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                  {!publishDiff?.sectionChanges?.length ? <li className="text-slate-500 dark:text-slate-500">{ui.noSectionChanges}</li> : null}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(false)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
              >
                {ui.cancel}
              </button>
              <button
                type="button"
                onClick={publishPage}
                disabled={isPublishing}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
              >
                {isPublishing ? ui.publishingNow : ui.confirmPublishButton}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PageEditor;
