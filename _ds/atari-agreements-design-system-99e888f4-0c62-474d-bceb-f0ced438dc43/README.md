# Atari Agreements — Design System

A design system for **Atari Agreements**, an AI-assisted **licensing-agreements management dashboard**. The product lets legal/business teams find, organize, review and act on licensing agreements and contract documents (synced from sources like Google Drive). Core surfaces include an agreement library, agreement-detail views (activity status, AI processing status, shared-with-me, file-location breadcrumbs), document/file/text readers, clause accordions, and a first-person AI search assistant.

It pairs the heritage **Atari** brand (the red "Fuji" logo, the retro *Atari 1972* display face) with a warm, paper-cream UI and a calm, professional component set.

## Sources

- **Figma:** "Atari Agreements Design System.fig" (mounted read-only during creation). Pages: `Cover`, `Foundations`, `Components`, `Header`, `Icons`. The Foundations page documents type, color, spacing and logo; Components holds the full component catalog (buttons, search, accordions, agreement details, status, file location); Header holds the shell/nav bar; Icons holds the custom icon set (3 status colors each).
- **Fonts (provided):** `Atari 1972 Bold.otf`, `Atari 1972 Regular.otf` → copied to `fonts/`.
- No codebase or production URL was provided. The reader is assumed not to have access; sources are listed for traceability.

---

## CONTENT FUNDAMENTALS

**Voice.** Professional, warm and quietly helpful — a competent legal assistant, not a salesperson. The AI assistant speaks in the **first person** and offers help directly: *"Do you have any questions? I can help."* The product addresses the user as **you**.

**Casing.**
- **Title Case** for navigation, buttons, labels, folder names and feature names: *Home, Agreements, Alerts, Action Items, Agreement Details, Shared with me, File Location, End-User Licenses, Memorandums, Action Items.*
- **Sentence case** for descriptions, helper text and body copy: *"Within each agreement there is interactive components such as activity status, AI processing status, …"*

**Vocabulary.** Domain-specific and concrete: *agreement, licensing, clause, document, folder, counterparty, memorandum, end-user license, renew, activity status, AI processing.* Real-sounding object names ("Documents from Google Drive 2026") rather than lorem placeholders in live UI.

**Tone rules.**
- Lead with the noun the user cares about (the agreement, the folder, the clause).
- Keep labels short (1–3 words); let descriptions carry the explanation.
- No exclamation marks, no hype, no emoji anywhere in the UI.
- AI features are clearly signposted (a sparkle/diamond glyph and a purple accent) so AI output is never mistaken for the user's own content.

**Examples.**
- Nav: `Home` · `Agreements` · `Alerts` · `Action Items`
- AI search placeholder: `Do you have any questions? I can help.`
- Breadcrumb: `Documents from Google Drive 2026 › End-User Licenses › Memorandums`
- Section headers (Atari 1972): `Agreement Details`, `File Location`, `Shared with me`

---

## VISUAL FOUNDATIONS

**Overall vibe.** Warm "paper" minimalism with a retro-arcade brand accent. Backgrounds are off-white and cream (not stark white); structure comes from **hairline tan borders** rather than heavy shadows. The Atari red and a dark brick red provide punch; a deep espresso brown is the workhorse "active/selected" color.

**Color.**
- Surfaces step through warm neutrals: `--background #FEFEF9` → `--surface-base #F5F1E8` → `--surface-base-2 #E8DCCB` (hover) → `--surface-base-3 #D6C8B4` (selected). A cool `--surface-gray #F7F7F7` is used for inset wells.
- Text is near-black `#2B2B2B` (primary) and a warm taupe `#6B6257` (secondary/inactive).
- Brand: Atari red `#DC0032` (logo, destructive), brick `#892C1B` (header panel, upload action).
- Accent neutral espresso `#4A2C24` fills active breadcrumb pills and primary controls; navy slate `#3A4A6A` is the cooler accent for buttons.
- AI = **purple** (`#6929C4` / hover `#8A38F5`).
- Severity is a muted, earthy set: positive **sage** `#AFC3A2`, warning **gold/terracotta** `#C1A063`/`#C36A4A`, negative **crimson** `#DC0032`. Each has a hover and a soft tint for label backgrounds.

**Type.** Three faces only — no serif. **Atari 1972** (brand wordmark + hero display + page/section titles like "Agreement Details", 30–64px, generous tracking), **Figtree** (headings H1–H3 and body, 14–32px, weights 300–600), **Poppins** (small UI text, nav, search placeholder, 12–16px captions / metadata "slots"). Hierarchy is *3 headings + 3 text sizes*, each available in up to four weights.

**Backgrounds.** Flat warm fills — **no** gradients, photographic imagery or illustration in the chrome. The only "image" is the red ATARI logo PNG. AI surfaces may carry a subtle purple wash, and the brand header panel is a solid brick block. No textures or noise in production UI (the Figma's diamond/noise effects are decorative annotations only).

**Radii.** Soft and consistent: `32px` page cards & screens, `24px` inner image containers, `16px` buttons / pills / accordions / "number" tiles, `8px` search & small inputs, `5px` tiny, `999px` for circular avatars and full pills.

**Cards.** Off-white (`#FEFEF9`) on cream, defined by a **1px tan border** (`#E8DCCB`/`#D6C8B4`); rounded 16–32px. Shadows are reserved for floating/important elements, not flat cards.

**Elevation / shadow system** ("Border Shading", scaled to element importance):
- Small: `0 4px 6px -4px rgba(0,0,0,.10)`
- Medium: `0 4px 8px rgba(0,0,0,.20)`
- Large: `0 6px 20px rgba(0,0,0,.20)`
- Popover: `0 8px 28px -6px rgba(74,44,36,.22)` (warm, brown-tinted).

**Borders & dividers.** 1px (`#E8DCCB`) hairlines everywhere; 0.8px warm-gray (`#6B6257`) on the search field; 2px solid for icon strokes. Dashed purple (`#8A38F5`) borders appear only as *Figma annotations*, never in product.

**States.**
- **Hover:** step the surface one shade warmer/darker (`surface-base` → `surface-base-2`), or move to the `*-hover` semantic color.
- **Active / selected:** filled espresso `#4A2C24` (or the accent), white text + icons.
- **Inactive / disabled:** taupe text `#6B6257`, reduced contrast, no fill.
- **Press:** darken the fill (use the `*-hover`/`*-active` token); no scale-bounce.

**Motion.** Restrained and functional. The shell describes "animations of the pop-out window as well as a slight delay between screen changes to signify loading/change in screen" — i.e. gentle fades/slide-ins for popovers and a brief transition between screens. Easing ~`cubic-bezier(.2,.6,.2,1)`, durations ~150–250ms. No bounces or infinite loops.

**Transparency & blur.** Used sparingly — soft scrims behind modals/popovers; the UI is otherwise opaque and paper-like.

**Layout.** Fixed shell header (~90px) pinned on top with logo + nav + centered AI search + actions. Default design canvas **1440×900**. Generous internal padding (64px on big cards, 24/16px inside controls); flex/grid with explicit gaps.

**Imagery color vibe.** Warm and earthy; if photography is ever introduced it should read warm/neutral, never cool or high-saturation. Avatars are flat colored circles with a single white initial.

---

## ICONOGRAPHY

A **custom, single-weight icon set** for Atari Agreements (not Lucide/Heroicons/etc.). In the Figma each icon ships in **three status colors** — **Black (light contrast)** `#2B2B2B` (default on light surfaces), **Brown (inactive)** `#6B6257` (disabled/placeholder), and **White (dark contrast)** `#FEFEF9` (on espresso/brick/colored fills).

In this system the icons are delivered as **inline SVG via `assets/icons.js`** (`atariIcon(name, size)` returns an SVG string using `currentColor`), so a single glyph renders in any of the three brand colors by setting CSS `color`. Inline SVG was chosen over CSS masks because it renders reliably everywhere (including thumbnail/PDF capture). The dashboard UI kit wraps this in an `<Icon name size>` React component (`ui_kits/dashboard/Icons.jsx`). These are clean re-authored equivalents of the Figma glyphs in the same simple single-weight style; if you need the exact original vectors, re-export them from the Figma source.

Available glyphs (`assets/icons.js`) include: Home, Key (Agreements), Inbox, Search, AI (sparkle/diamond), Upload, Folder, Add Folder, Download, Share, People, Expand Carrot (chevron), Chevron-right, Trash, Edit, Edit History, Info, Clock, Dates (calendar), Document, Text, Status (check), Action Items, Pin, Tag, Legal, Finance, Counterparty, Business, Technical, Save, Relocate, Sync Docs, Log Out, Minimize, Menu, More, Plus, Eye, Bell, Filter.

**No emoji.** No decorative unicode. Avatars use single-letter initials on flat colored circles.

---

## INDEX — what's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file — context, content + visual foundations, iconography, manifest |
| `colors_and_type.css` | Source-of-truth design tokens (CSS vars) + semantic type classes |
| `fonts/` | `Atari1972-Regular.otf`, `Atari1972-Bold.otf` (brand display face) |
| `assets/atari-logo-stacked.png` | The **stacked** ATARI logo (Fuji mark over wordmark) — primary lockup |
| `assets/atari-logo-red.png` | The red ATARI horizontal logo (Fuji mark + wordmark) — wide contexts only |
| `assets/icons.js` | Custom inline-SVG icon set — `atariIcon(name, size)`, recolor via CSS `color` |
| `preview/*.html` | Design-system reference cards (type, color, spacing, components) |
| `ui_kits/dashboard/` | High-fidelity, interactive recreation of the Agreements dashboard |
| `SKILL.md` | Agent-Skill manifest so this system can be used in Claude Code |

**UI kits**
- `ui_kits/dashboard/` — the Agreements web dashboard: shell header, agreement library/table, agreement-detail panel, AI search, clause accordions, file-location breadcrumbs, buttons, badges, avatars. `index.html` is an interactive click-through.
