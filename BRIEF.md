# Camward Timber Construction — Website Build Brief

Build a polished, one-page marketing website for a carpentry business. All copy is to be written by you based on the brief below — the client has not supplied any. Match the tone of voice carefully (see Section 3).

---

## 1. Tech stack

- **Single static HTML file** (`index.html`) with one CSS file (`styles.css`) and minimal vanilla JS (`script.js`) only if needed for things like a mobile nav toggle or lightbox.
- No frameworks, no build step, no dependencies. This needs to be hostable anywhere (Netlify, Cloudflare Pages, even a basic shared host).
- Mobile-first responsive — most tradesmen leads come from phones.
- Accessible: semantic HTML, alt text on every image, sufficient colour contrast, focusable nav.
- Fast: lazy-load gallery images, no web fonts heavier than necessary (Google Fonts is fine, one or two weights max).
- Include sensible meta tags: title, description, Open Graph image, viewport.

---

## 2. Brand identity

- **Business name:** Camward Timber Construction
- **Tagline / strapline:** *Making wood look good*
- **Logo:** `assets/logo.png` (or whatever filename is in the assets folder — use what's there)
- **Owner:** Chris (referred to as "Chris and his team")
- **Based:** Horsham, West Sussex
- **Service area:** Horsham and the surrounding areas
- **Trade:** Carpenter (22 years' experience)
- **Team:** Two-man team plus a trusted group of sub-contractors

---

## 3. Tone of voice — IMPORTANT

The client picked **"Warm & local — friendly, down-to-earth, chatty"**. The copy should sound like a real person who happens to be very good at their job, not a marketing brochure.

**Words / phrases to weave in naturally:**
- Quality workmanship
- Friendly
- Reliable

**Avoid:**
- Corporate-speak ("solutions", "passionate", "delivering excellence")
- "Bespoke" — overused in this trade
- Anything that reads like every other tradesman website
- Excessive use of exclamation marks or emoji

**Voice cues:** Write like Chris is having a quick, friendly chat at the front door — confident in his skill, no waffle, no bragging. First-person plural ("we") works well given it's a two-man team. Contractions are fine ("we'll", "you've"). Short sentences. Plain English.

---

## 4. Site structure (single page, anchor nav)

1. **Sticky header** — logo left, nav right (Services, Work, About, Contact), phone number visible on desktop, hamburger on mobile
2. **Hero** — strong headline, the strapline, a clear "Get a quote" call to action, hero image (hero.jpg n the assets folder)
3. **About** — short, warm intro. Cover: 22 years in the trade, came to it at 24, was an apprentice then went solo, two-man team plus trusted subbies, based in Horsham
4. **Services** — six service cards (see Section 5)
5. **The way we work** — short section pulling out what the client is proud of: treats every site like his own home, minimises disruption, tidy, courteous, cleans up properly. This is a key differentiator — give it space.
6. **Gallery** — grid of project photos with captions (see Section 6). Click to enlarge (simple lightbox, vanilla JS).
7. **What we don't do** — small, friendly section listing things they refer elsewhere (cupboards, kitchens, door hanging, minor repairs). Frame it positively — "we focus on what we're best at" — so it doesn't read negatively.
8. **Credentials** — NVQ Level 2 in Site Carpentry, £2m public liability cover, 22 years' experience
9. **Contact** — phone, email, Instagram, service area, working hours, response time. Simple contact form (mailto: is fine for v1, no backend).
10. **Footer** — copyright, business name, maybe a repeat of the phone number

---

## 5. Services (write a 1–2 sentence description for each in the warm tone)

1. **Carpentry for homeowners and builders** — general carpentry work, both direct for homeowners and as a sub-contractor for main contractors / builders
2. **Loft conversions** — structural carpentry and 1st fix for loft conversion projects
3. **Garden rooms** — full timber-framed garden rooms, built on site
4. **Oak framed buildings** — traditional oak framing
5. **Porches** — timber porches, built to suit the property
6. **Decking** — garden decking

The client's sweet spot is **structural and 1st fix carpentry** — anything where he starts with a pile of timber and ends with a structure. Roofs, walls, garden rooms, porches, decking, saunas. Lean into this in the section intro.

---

## 6. Gallery captions

Use these photos and captions. Filenames will be in `assets/gallery/` — use whatever's there in order, or rename to match.

1. Hand-cut roof, Lindfield
2. Garden room, Horsham — completed
3. Garden room — structure stage
4. Loft conversion — 1st fix carpentry
5. Windows and cladding — for a local builder
6. Cedar-clad pool house with gym and shower

Make the gallery the visual heart of the page — these are the proof.

---

## 7. Customer info (for context, helps inform the copy)

- **Who hires them:** Homeowners doing renovations, and builders / main contractors as a sub-contractor
- **Job size:** Anything from £200 to £100k — don't put exact figures on the site, but the copy can say "from small jobs to full structural builds"
- **Typical first call:** "I've been recommended to you and I need help making my idea a reality" — this is gold, lean into "recommended by word of mouth" and "bringing your idea to life" themes

---

## 8. Contact details

- **Phone:** 07834 035 400 (format with spaces for readability)
- **Email:** info@camwardtimberconstruction.com *(use this one — the personal mail.com address shouldn't go on the site)*
- **Instagram:** [@camward_tc](https://instagram.com/camward_tc)
- **Service area:** Horsham and surrounding areas (no physical address)
- **Hours:** Monday–Friday, 8am–4pm
- **Response time:** Within 24 hours
- **Insurance:** £2m public liability cover (mention on site)
- **Qualification:** NVQ Level 2 in Site Carpentry

---

## 9. Design direction

The brief calls for warm and local — so the design should feel that way too. Avoid the generic "tradesman in a hi-vis vest" template aesthetic.

**Suggested palette (adjust as needed):**
- Warm off-white / cream background (`#FAF7F2` ish)
- Deep timber brown or charcoal for primary text (`#2A2520` ish)
- A single warm accent — burnt orange, sage green, or oak — for buttons and links
- Plenty of whitespace

**Typography:**
- A characterful serif or slab-serif for headings (e.g. Fraunces, Bitter, or similar — something with warmth, not generic sans)
- A clean, legible sans for body (Inter, Source Sans, or system stack)

**Imagery:** The photos do the heavy lifting. Don't crowd them with overlays or heavy filters. Generous gallery, full-bleed hero.

**Avoid:**
- Stock photography (the client has 1000 real photos)
- Stiff corporate layouts
- Generic "construction" iconography (hammers, hard hats, etc.)
- Heavy gradients or 2010-era textures

---

## 10. Asset handling

The project folder will contain:

```
/
├── BRIEF.md              (this file)
├── index.html            (you create)
├── styles.css            (you create)
├── script.js             (you create, only if needed)
└── assets/
    ├── logo.png          (client supplied)
    └── gallery/
        ├── 01-hand-cut-roof-lindfield.jpg
        ├── 02-garden-room-horsham.jpg
        ├── 03-garden-room-structure.jpg
        ├── 04-loft-conversion-first-fix.jpg
        ├── 05-windows-cladding.jpg
        └── 06-cedar-pool-house.jpg
```

Reference images by relative path. Use `loading="lazy"` on gallery images. Provide descriptive `alt` text on every image based on the captions in Section 6.

---

## 11. Deliverables

A working `index.html` plus `styles.css` (and `script.js` if used) that I can open in a browser and see a finished, polished one-page site.

Before you start, briefly outline the structure and design choices you're making, then build it. After building, list anything I'll need to swap in (e.g. real image filenames, final email address) so I can hand it over to the client cleanly.
