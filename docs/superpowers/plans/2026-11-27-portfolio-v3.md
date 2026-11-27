# Hugo Portfolio v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the v2 CV page into a full portfolio that serves HR and freelance clients: career ladder, stats, case-study projects, services, goals, CV PDF download, and a 3D background that dissolves into faint dots after the hero.

**Architecture:** Same Vite + React + TS app. Content stays in `src/content/` (extended types). Sections are re-laid out in a full-width container. The scene keeps one point set, morphing sphere → scattered "dots" field. A second Vite entry `cv.html` renders a print-only CV from the same content; a Playwright script prints it to `dist/Hugo-CV-EN.pdf` and `dist/Hugo-CV-VI.pdf`.

**Tech Stack:** unchanged (Vite 8, React 19, TS 7, three + R3F, Vitest, oxlint, Playwright 1.63 for PDFs/screenshots).

**Spec:** `docs/superpowers/specs/2026-11-27-portfolio-v3-design.md` (on top of `2026-11-27-portfolio-design.md`)

## Global Constraints

- All v2 constraints still hold (EN default + VI, theme, privacy list, base `/Hugo/`, reduced motion / no WebGL fallbacks, AA contrast, focus ring 3:1).
- Experience exactly: `03/2026 – present` Lead Front-end (team 4–6); `04/2025 – 02/2026` Middle Developer (InspiLab → Outsourcing team); `01/2025 – 03/2025` Junior Developer; `10/2024 – 12/2024` Fresher.
- Ladder: Fresher 10/2024 → Junior 01/2025 → Middle 04/2025 → Lead Front-end 03/2026.
- Stats: `17` months Fresher→Lead; `4–6` people led; `5` platforms; `9.12` GPA.
- Email shown: `thanhhbinh0501@gmail.com`; primary contact CTA becomes `mailto:` it.
- Hero keyword line (both langs): "Front-end Lead · ~2 years experience" / "Front-end Lead · ~2 năm kinh nghiệm", then "React · TypeScript · Flutter".
- CV download href: `${import.meta.env.BASE_URL}Hugo-CV-${lang.toUpperCase()}.pdf`.
- Menu order: projects · services · experience · toolbox · goals · education · contact.
- Project illustrations are abstract and labelled as illustrations; no real screenshots or numbers.

## Review Focus

- Hero text vs avatar overlap at 960×1000 and wide screens (existing screenshot check must still pass).
- 360px Vietnamese: ladder, stats, case cards must not overflow (screenshot check).
- CV PDF must not contain phone/address/Facebook and must exist for both languages after build (test in Task 4).
- Dots field must stay behind content and never reduce text readability: canvas opacity after hero ≤ 0.35 (check in Task 3).
- Language switch must update the CV link to the matching PDF (test in Task 2).

---

### Task 1: Content model v3

**Files:** Modify `src/content/{types,experience,projects,contact,index}.ts`; Create `src/content/{career,services,goals}.ts`; Modify `src/i18n/{types,en,vi}.ts`; Test `tests/content.test.ts`

**Interfaces — Produces:**
- `experience` ids `['outsourcing-lead','middle','inspilab-junior','inspilab-fresher']`, EN periods as Global Constraints; `ExperienceItem.team?: Localized`.
- `career: { ladder: Array<{ role: string; date: string }>; stats: Array<{ value: string; label: Localized }> }`
- `Project` gains `did: Localized<string[]>`, `result: Localized`, `period?: Localized`, `art: 'radar'|'campaigns'|'audit'|'none'`.
- `services: { items: Array<{ id: string; title: Localized; body: Localized; tags: string[] }>; steps: Array<{ title: Localized; body: Localized }> }`
- `goals: Array<{ id: string; kicker: Localized; title: Localized; body: Localized }>`
- `contact.email = 'thanhhbinh0501@gmail.com'`; optional `linkedin?: string`.
- UiStrings adds `nav.services`, `nav.goals`, `hero.keywords`, `hero.downloadCv`, `hero.hire`, `section.{highlights,services,process,goals}`, `labels.{did,result,illustration,team}`, `contact.sendEmail`.

- [ ] Step 1: Failing tests: periods/ids above; ladder dates `['10/2024','01/2025','04/2025','03/2026']`; stats values `['17','4–6','5','9.12']`; each work project has 3 `did` items in en and vi and non-empty `result`; services 4 items + 3 steps; goals 3; `primaryContactHref(contact)` = `mailto:thanhhbinh0501@gmail.com`; privacy regex test still passes (allow the email). Update old tests that asserted GitHub fallback for the real contact to use `{...contact, email: undefined}` only.
- [ ] Step 2: Run → FAIL. Step 3: Implement with spec §4–5 copy. Step 4: Run → PASS. Commit `feat(content): v3 content model`.

### Task 2: Sections v3 and layout

**Files:** Modify `src/App.tsx`, `src/components/layout/Header.tsx`, `src/components/sections/{Hero,Projects,Experience,Toolbox,Education,Contact}.tsx`, `src/styles/sections.css`; Create `src/components/sections/{Highlights,Services,Goals}.tsx`, `src/components/ui/ProjectArt.tsx`; Delete `src/components/sections/About.tsx` (its text moves into Highlights intro); Test `tests/sections.test.tsx`

**Interfaces:** Consumes Task 1 exports. Produces sections with ids `hero, highlights, projects, services, experience, toolbox, goals, education, contact`; `data-shape="sphere"` on hero, `"dots"` on all others.

- [ ] Step 1: Failing tests: h2 for every v3 section in EN; hero has link `en.hero.downloadCv` with href ending `Hugo-CV-EN.pdf`, after switching to VI it ends `Hugo-CV-VI.pdf`; hero `en.hero.hire` link → `#contact`; contact shows the email as a mailto link; each work project card renders its 3 `did` items; ladder renders 4 steps in order; every section `data-shape` ∈ {sphere, dots}; nav links in menu order.
- [ ] Step 2: Run → FAIL. Step 3: Implement. Full-width container `max-width: 1200px`, hero keeps v2 avatar geometry; case cards 2-column (art + text, alternating) ≥ 960px, stacked below; services 4-col → 2 → 1; timeline vertical full width with role/team; goals 3-col. Step 4: Run → PASS. Commit `feat(sections): v3 portfolio layout`.

### Task 3: Scene — sphere to dots field

**Files:** Modify `src/scene/{shapes,shapeTarget,NetworkShape}.tsx?`; Test `tests/shapes.test.ts`

**Interfaces:** `dotsShape(n: number, w: number, h: number, depth: number): Vec3[]` (deterministic, all points inside the box); `ShapeName = 'sphere' | 'dots'`; `shapeWeights(v): [number, number]`; `targetShapeValue` unchanged signature, `SHAPE_INDEX = { sphere: 0, dots: 1 }`.

- [ ] Step 1: Failing tests: `dotsShape(64, 16, 10, 4)` length 64, |x| ≤ 8, |y| ≤ 5, |z| ≤ 2, same output on two calls; `shapeWeights(0)`=[1,0], `(1)`=[0,1]; `targetShapeValue([{shape:'sphere',top:-800},{shape:'dots',top:100}],800)` = 1.
- [ ] Step 2: Run → FAIL. Step 3: Implement. Dots: links fade out fully (dots link strength 0), point size smaller, group x eases to 0, slow drift `y += scroll * 0.002` wrap, layer CSS opacity goes to 0.3 when value ≥ 0.5 (set via CSS var `--scene-opacity` on the layer). Step 4: Run → PASS; screenshot check passes. Commit `feat(scene): dissolve sphere into background dots`.

### Task 4: CV PDF

**Files:** Create `cv.html`, `src/cv/main.tsx`, `src/cv/CvDocument.tsx`, `src/cv/cv.css`, `scripts/build-cv.mjs`; Modify `vite.config.ts` (multi-page input), `package.json` (`build:cv`), `.github/workflows/deploy.yml` (install chromium, run `build:cv` after build); Test `tests/cv.test.tsx`

**Interfaces:** `CvDocument({ lang }: { lang: Lang })` renders name, role line, email, GitHub, location, experience with periods, work projects with did items, toolbox, education. `cv.html?lang=vi` picks language.

- [ ] Step 1: Failing tests: `CvDocument lang="en"` text contains `Phan Thanh Bình`, `thanhhbinh0501@gmail.com`, `03/2026 – present`, `TeleRadar`, `HCM-UTE`; lang vi contains `03/2026 – nay`; text has no `/0335|facebook|Phước Long/i`.
- [ ] Step 2: Run → FAIL. Step 3: Implement; `build-cv.mjs` serves `dist` via `vite preview`, prints `cv.html?lang=en|vi` with `page.pdf({format:'A4', printBackground:true})` to `dist/Hugo-CV-EN.pdf` / `-VI.pdf`, exits non-zero if either is missing or < 10 KB. Step 4: `npm run build && npm run build:cv` → both files exist. Commit `feat(cv): printable CV and PDF build`.

### Task 5: Verify, README, preview

- [ ] Update `scripts/screenshots.mjs` selectors if changed; run it → all cases ok. Update README (CV PDF, new content files). Rebuild preview with `--base ./` plus PDFs, republish artifact. Commit `docs: readme for v3`.
