# Samaya Sedona — Web Design Direction

**Direction:** Faded Southwest Editorial
**Source of truth:** Samaya Sedona Brand Guidelines (Polished Code × The Weber Co., 2026)
**Scope:** This document extends the print/identity system to web. Where the two
conflict, the brand guidelines win on identity, this document wins on behavior.

---

## 1. Direction

American high desert, sun-faded, 1970s — run through a quiet-luxury filter.

**Reference lanes**
- Vintage Arizona travel ephemera — matchbooks, motel signage, Fred Harvey-era
  postcards, WPA park posters. Where the display type and mesa pattern live.
- 1970s desert modernism — plaster, clerestory light, low horizontal furniture,
  warm shadow. Restraint, not ornament.
- Contemporary editorial hospitality — big type, big photos, wide margins,
  almost no UI chrome. This is what keeps the first two from reading as themed.

**Hard no**
Santa Fe kitsch: turquoise, Aztec-style borders, dreamcatchers, vortex language,
terracotta-and-teal. Two of the four personas explicitly reject "cheesy, overly
spiritual, generic." The identity already avoids this by using a landform instead
of a pattern language — do not undo that.

**Retro budget**
The retro lives in the display type and the line illustrations. Everything else is
modern: modern grid, modern spacing, modern responsive behavior. One optional
texture (subtle paper tone on Sand). That is the entire retro budget. No grain
everywhere, no 70s rounded containers, no groovy curves.

---

## 2. Unresolved — settle before build

| Item | Problem | Needed |
|---|---|---|
| Accent font | Segoe Script is a Microsoft system font. No webfont license path; falls back unpredictably off Windows. | Approve substitute (§3) |
| Napili license | Guidelines p.32 state desktop-only. Web use requires an additional license. | Purchase + confirm subsetting rights |
| Color values | Deep Canyon listed as `#4C2C16` / RGB 76,42,22 — the hex is 76,**44**,22. Sedona Clay listed as `#632010` / RGB 83,32,16 — the hex is **99**,32,16. | Client confirms which is authoritative. Tokens below assume **hex wins**. |
| Functional colors | Palette has none. | Proposed in §4.2 — needs sign-off |

---

## 3. Typography

### 3.1 Families

| Role | Family | Usage | Notes |
|---|---|---|---|
| Display | Napili | Section openers, hero, numerals | Uppercase only, tracking 0. **Never below 28px.** |
| Accent | Caveat (proposed) | Tagline, pull quotes, one-line asides | Replaces Segoe Script. SIL OFL, variable 400–700, closest upright casual match. |
| Body / UI | Poppins | Everything else | 400 / 500 / 600 only |

Napili is hand-drawn and condensed. Below ~28px its irregularity reads as a
rendering fault rather than character. If a heading must be small, it is Poppins
600 uppercase with +0.04em tracking, not shrunken Napili.

Subset Napili to uppercase A–Z, 0–9 and basic punctuation — roughly 45 glyphs.

### 3.2 Ramp

```css
--font-display: "Napili", "Oswald", sans-serif;
--font-accent:  "Caveat", cursive;
--font-body:    "Poppins", system-ui, sans-serif;

--text-hero:    clamp(2.75rem, 9vw,  7rem);    /* Napili, 0.92 lh */
--text-display: clamp(2.25rem, 6vw,  4.5rem);  /* Napili, 0.95 lh */
--text-h2:      clamp(1.75rem, 4vw,  3rem);    /* Napili, 1.0 lh  */
--text-h3:      1.25rem;                        /* Poppins 600, uppercase, 0.04em */
--text-accent:  clamp(1.5rem, 3vw, 2.25rem);   /* Caveat, 1.2 lh  */
--text-lead:    clamp(1.125rem, 2vw, 1.375rem);/* Poppins 400, 1.6 lh */
--text-body:    1.0625rem;                      /* Poppins 400, 1.7 lh */
--text-small:   0.875rem;                       /* Poppins 400, 1.6 lh */
--text-cta:     0.875rem;                       /* Poppins 600, uppercase, 0.08em */
```

### 3.3 Rules

- Body measure: 60–72ch. Never full-bleed text.
- Line height never below 1.6 for body — the guidelines call this out as misuse.
- Accent font: one line at a time, never a paragraph, never a label.
- No text within 24px of a container edge on mobile, 48px on desktop.
- Never stroke, outline, warp or effect any type (guidelines p.36).

---

## 4. Color

### 4.1 Brand tokens

```css
--deep-canyon:    #4C2C16;
--moss:           #3C3113;
--sedona-clay:    #632010;
--canyon-leather: #9B6E48;
--desert-beige:   #CDAF95;
--sand:           #F5EEE9;
```

### 4.2 Functional tokens (proposed)

```css
--error:   #9A2B12;  /* 6.70:1 on Sand */
--success: #4A5D2A;  /* 6.33:1 on Sand */
--notice:  #8A5A14;  /* 5.15:1 on Sand */
--focus:   #632010;  /* Sedona Clay */
```

Error sits close to Sedona Clay by design — it should not feel foreign to the
palette. Because of that proximity, **never signal state with color alone**:
always pair with an icon and text.

### 4.3 Contrast matrix

Measured, not estimated. ✓ = AA body text (4.5:1+). △ = large text / UI only (3:1+).

| Foreground ↓ / Background → | Sand | Desert Beige | Deep Canyon | Moss | Sedona Clay |
|---|---|---|---|---|---|
| Deep Canyon | 10.89 ✓ | 6.05 ✓ | — | — | — |
| Moss | 11.15 ✓ | 6.19 ✓ | — | — | — |
| Sedona Clay | 10.48 ✓ | 5.82 ✓ | — | — | — |
| Canyon Leather | 3.88 △ | 2.16 ✗ | — | — | — |
| Desert Beige | 1.80 ✗ | — | 6.05 ✓ | 6.19 ✓ | 5.82 ✓ |
| Sand | — | — | 10.89 ✓ | 11.15 ✓ | 10.48 ✓ |

**Canyon Leather is not a body text color.** Large headings and UI borders only.
**Desert Beige on Sand is decorative only** — dividers, fills, illustration tint.

### 4.4 Surfaces

- Default page: Sand.
- Inverted sections: Sedona Clay or Deep Canyon, Sand text. Use sparingly — the
  footer, one mid-page statement band, the inquiry form.
- Moss is an accent, not a surface. It appears in illustration and in the
  celebration-crew pages (§9).

---

## 5. Layout

### 5.1 Grid

```css
--container-max: 1440px;
--content-max:   1280px;
--measure:       72ch;
--gutter-sm:     24px;
--gutter-lg:     32px;
```

12 columns ≥1024px. 6 columns 768–1023px. 4 columns below.

### 5.2 Spacing scale

4px base. Use tokens only — no arbitrary values.

```css
--sp-1: 4px;   --sp-2: 8px;   --sp-3: 12px;  --sp-4: 16px;
--sp-5: 24px;  --sp-6: 32px;  --sp-7: 48px;  --sp-8: 64px;
--sp-9: 96px;  --sp-10: 128px; --sp-11: 192px;
```

Section vertical rhythm: `--sp-9` mobile, `--sp-11` desktop. The brand reads as
elevated through air, not through decoration. When in doubt, add space.

### 5.3 The signature layout

The guidelines' own page template — a narrow left rail of text against a wide
right canvas, separated by a hairline — is the brand's layout signature. It
translates directly:

- Desktop: sticky left column (cols 1–4) carrying the section's argument;
  scrolling imagery or content right (cols 5–12). 1px Canyon Leather divider.
- Below 1024px: the rail stacks above its content, divider becomes a horizontal
  rule at 40% width, left-aligned.

Alternate this with full-bleed photography and with large empty fields of Sand.
Three modes, nothing else.

### 5.4 Breakpoints

`390` / `768` / `1024` / `1440`

Design mobile-first. The trip leader finds this on Instagram on her phone and
drops the link into a group text where 5–10 people decide together.

---

## 6. Components

### 6.1 Buttons

```
Primary    — Sedona Clay fill, Sand text, 4px radius, 14px/28px padding
             hover: Deep Canyon fill, 400ms
Secondary  — transparent, 1px Deep Canyon border, Deep Canyon text
             hover: Deep Canyon fill, Sand text
Ghost      — Deep Canyon text, 1px underline offset 6px
             hover: underline thickens to 2px
```

All CTAs: Poppins 600, uppercase, 0.08em tracking (per hierarchy, p.35).
Min touch target 44×44px. Radius never exceeds 4px — rounded corners push the
system toward friendly-tech and away from editorial.

### 6.2 Inputs

```
Rest     — Sand fill, 1px Canyon Leather border, Deep Canyon text
Hover    — border Deep Canyon
Focus    — 2px Sedona Clay ring, 2px offset, border Deep Canyon
Error    — 1px --error border, message below in --error + icon
Disabled — Desert Beige border, 60% opacity text, not-allowed cursor
Label    — always visible above field. Never placeholder-as-label.
```

### 6.3 Cards

Flat. 1px Canyon Leather border or Desert Beige fill — never both, never a drop
shadow. Shadow is not in this system.

### 6.4 Navigation

Transparent over hero, Sand background with hairline bottom border once scrolled
past 80vh. Logo switches from Sand to Deep Canyon at the same threshold. Mobile:
full-screen overlay in Sedona Clay, Napili items at `--text-h2`.

### 6.5 Illustrations

The line-drawing set is the main tool for filling the gaps a print system leaves.
Use for: amenity markers, section dividers, empty states, 404, loading, footer
furniture, form confirmations. Stroke in Deep Canyon on light, Sand on dark.
Never repeat an element already in the logo (guidelines p.42).

**Favicon: use the solid oval submark, not the line-drawn S.** The intricate S
disappears below ~32px regardless of what p.25 claims.

---

## 7. Motion

```css
--dur-fast:   200ms;  /* state changes */
--dur-base:   400ms;  /* reveals, nav */
--dur-slow:   700ms;  /* image fades, section transitions */
--ease:       cubic-bezier(0.22, 1, 0.36, 1);
```

Slow, soft, minimal. Long fades. Nothing springs or bounces. Gentle scroll-depth
parallax is permitted (client direction, Nov 2026): small offsets, eased, never
spring physics — and fully disabled under `prefers-reduced-motion`. The 70s
reference belongs in the still image, never in the animation.

Banned: autoplay carousels, urgency banners, discount popups, self-opening chat
bubbles, scroll-jacking, count-up timers. "Generosity without extraction" means a
site that does not extract attention either.

Honor `prefers-reduced-motion: reduce` — opacity only, 0ms transforms.

---

## 8. Photography

Two distinct jobs, do not mix them:

**Mood imagery** — the guidelines' stated direction (p.45): soft focus, partial
framing, subjects out of frame, warm restrained grade. Use for hero, section
breaks, full-bleed bands.

**Proof imagery** — sharp, clear, well-lit architecture and room shots. Use for
the property gallery, floorplan, amenities.

Avery's listed hesitation is that she needs photos to prove the place feels as
good in person as online. At $1,000–2,500/night split 8 ways, someone will want to
see the actual kitchen. Do not let art direction eat the evidence.

Treatment: warm grain overlay at ≤6% opacity. No duotone, no heavy filters, no
color-washing to brand palette.

---

## 9. Information architecture

**Primary conversion is an inquiry, not a date picker.** The stated differentiator
is "every booking begins with a real conversation" — the form opens by asking why
you're gathering (celebration / reconnection / reset), and that answer drives the
follow-up. This is brand strategy expressed as UX, and no competitor is doing it.

Second-level nav is the four gathering types, because they cannot share a voice.
Lucas leaves if the site reads spiritual or soft; Susan leaves if it reads young
or loud. Homepage stays warm and neutral; the gathering pages diverge:

| Page | Temperature |
|---|---|
| Friend groups (Avery) | Sand base, soft light, mid-warm |
| Couples (Ethan & Claire) | Desert Beige accents, intimate crops |
| Celebration (Lucas) | Moss + Deep Canyon, harder horizons, more negative space, more graphic |
| Milestone (Susan) | Sand + Desert Beige, warmest, most light, largest type |

Same system, different weather. No new colors, no new fonts.

Also required, given the group-text decision pattern: a scannable page covering
what's included, sleeping arrangements, and total cost — shareable, no scroll
hunting, correct OG preview image.

---

## 10. Accessibility baseline

- WCAG 2.2 AA minimum. Contrast per §4.3, no exceptions for Canyon Leather body.
- Visible focus on every interactive element — 2px Sedona Clay, 2px offset.
- Full keyboard operability including the inquiry flow and gallery.
- Alt text on all content imagery; decorative illustration marked `aria-hidden`.
- Motion respects `prefers-reduced-motion`.
- Form errors announced, associated with their field, never color-only.

---

## 11. Open questions for client

1. Napili web license — purchased by whom, which domains?
2. Caveat approved as the Segoe Script substitute, or do they want a paid script?
3. Which color values are authoritative — hex or RGB (§2)?
4. Functional colors in §4.2 — approved?
5. Is the inquiry flow replacing a booking engine entirely, or sitting in front of one?
