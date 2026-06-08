# سراب ِ زیشت — Sarab-e-Zeest
## Premium Urdu Novel Website

A complete, production-ready dark-mode novel website built with HTML5, CSS3, and Vanilla JavaScript.

---

## 📁 Folder Structure

```
sarab-e-zeesht/
│
├── index.html              ← Homepage (Hero, Characters preview, Chapters preview)
│
├── css/
│   └── style.css           ← All styles (dark theme, RTL, responsive)
│
├── js/
│   ├── main.js             ← Navigation, bookmarks, animations, search
│   └── chapters.js         ← All 15 chapter data (titles + content)
│
├── pages/
│   ├── about.html          ← Novel description, themes, details
│   ├── characters.html     ← Character cards with expandable modals
│   ├── chapters.html       ← Full chapter list with search
│   ├── chapter.html        ← Chapter reader (RTL, progress bar, bookmarks)
│   └── author.html         ← Author profile + feedback form + bookmarks
│
└── README.md
```

---

## 🚀 How to Deploy on GitHub Pages

1. Upload the entire `sarab-e-zeesht/` folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your site will be live at `https://yourusername.github.io/sarab-e-zeesht/`

---

## 📄 HOW TO INSERT PDF CONTENT

When you have the PDF of the novel, follow these steps to insert the real content:

### Step 1 — Open `js/chapters.js`

Each chapter is an object in the `CHAPTERS` array:

```javascript
{
  num: 1,
  urdu: "باب کا اردو نام",        // ← Chapter title in Urdu
  english: "Chapter Title",         // ← Chapter title in English
  content: `
    <p>اردو متن یہاں ڈالیں۔</p>    // ← Chapter content goes here
    <p>اگلا پیراگراف۔</p>
  `
}
```

### Step 2 — Replace Placeholder Content

For each chapter, replace the `content` field with the real PDF text.

**Formatting rules:**
- Wrap each paragraph in `<p>` tags
- Use `dir="rtl"` is already applied to the whole reader
- For section breaks, use: `<div class="chapter-section-break">✦ ✦ ✦</div>`
- Keep all text in Urdu script (no transliteration needed)

**Example:**
```javascript
{
  num: 1,
  urdu: "آغاز",
  english: "The Beginning",
  content: `
    <p>یہاں پہلے باب کا اصل متن ڈالیں جو PDF میں ہے۔</p>
    <p>دوسرا پیراگراف یہاں آئے گا۔</p>
    <div class="chapter-section-break">✦ ✦ ✦</div>
    <p>باب کا آگے کا حصہ۔</p>
  `
}
```

### Step 3 — Update Chapter Titles

In the same `chapters.js` file, update the `urdu` and `english` fields for each chapter with the real names from your PDF.

### Step 4 — Update About Page Text

Open `pages/about.html` and find the `about-story` section. Replace the placeholder description with the real novel description from your PDF.

### Step 5 — Update Author Name

Open `pages/author.html` and update:
- `Qalam-e-Khwab` → Real author name
- Author bio text → Real bio from PDF

---

## ✨ Features Included

| Feature | Status |
|---|---|
| Dark mode only UI | ✅ |
| RTL Urdu support | ✅ |
| 15 Chapter data | ✅ |
| Chapter reader | ✅ |
| Reading progress bar | ✅ |
| Bookmark system (localStorage) | ✅ |
| Continue reading banner | ✅ |
| Chapter search | ✅ |
| Font size controls | ✅ |
| Keyboard navigation (← →) | ✅ |
| Mobile responsive | ✅ |
| Character modals | ✅ |
| Feedback form | ✅ |
| Scroll reveal animations | ✅ |
| Floating particles | ✅ |
| Page transitions | ✅ |
| GitHub Pages ready | ✅ |

---

## 🎨 Design System

| Variable | Value |
|---|---|
| Background | `#0b0b0f` |
| Purple Accent | `#5b3b8a` |
| Gold Highlight | `#d4af37` |
| Text Primary | `#f0eee8` |
| Font (English) | Cinzel + Cormorant Garamond |
| Font (Urdu) | Noto Nastaliq Urdu |

---

*Built with love for the story of Sarab-e-Zeest* ✦
