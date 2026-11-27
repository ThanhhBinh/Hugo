# Hugo Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A one-page bilingual (EN/VI) CV site for Hugo with a scroll-driven 3D scene, deployed to GitHub Pages.

**Architecture:** Vite + React + TypeScript SPA. CV content lives in typed `src/content/*` files (each text field has `en` and `vi`); UI strings in `src/i18n/`. Sections are plain React components; a fixed React Three Fiber canvas (lazy-loaded) morphs one point set between sphere → H → ring according to which section (`data-shape`) is on screen.

**Tech Stack:** Vite 6, React 19, TypeScript 5 (strict), three + @react-three/fiber, Vitest + @testing-library/react + jsdom, ESLint (typescript-eslint), GitHub Actions → GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-27-portfolio-design.md`

## Global Constraints

- Languages: `en` (default) and `vi` only. Initial language order: `?lang=` → localStorage `hugo.lang` → `navigator.language` starting with `vi` → `en`.
- Language switch labels: "English" / "Tiếng Việt", no flags; update `<html lang>`, `document.title`, `<meta name="description">` on change.
- Theme: follow `prefers-color-scheme`, toggle overrides, persisted in localStorage `hugo.theme`; all storage access in try/catch.
- Colours: accent `#FFC21A` on near-black (dark); light theme cream background, text near-black, accent text `#9A6A00`. WCAG AA contrast.
- Never render: phone number, home address, Facebook, client names, screenshots/metrics of TeleRadar/AdOps/SaleAudit, mention of InspiLab closing.
- Dates: only what the spec states (10/2024 – 12/2024, 01/2025 – 2025, 2025 – nay/present). No invented months.
- Email is optional; when absent every contact CTA points to `https://github.com/ThanhhBinh`.
- Vite `base: '/Hugo/'`; site URL `https://thanhhbinh.github.io/Hugo/`.
- Reduced motion → no 3D canvas, no reveal/transition animations. No WebGL → page renders without canvas.
- Desktop ≥ 960px: text column left, 3D fixed right half. Below 960px: single column, canvas behind text at ≤ 0.35 opacity.
- System font stack; no external network requests at runtime.

## Review Focus

- `?lang=fr` or garbage value → falls back to stored/browser/en, never blank text (test in Task 2).
- localStorage throwing (Safari private mode, blocked storage) → no crash, defaults used (tests in Tasks 2 and 3).
- `prefers-reduced-motion: reduce` → canvas never mounted (test in Task 6).
- WebGL unavailable / scene chunk fails to load → content still fully visible (test in Task 6).
- Narrow 360px phone with long Vietnamese strings → no horizontal scroll (Playwright check in Task 7).

---

### Task 1: Scaffold, folder structure, assets

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `tests/setup.ts`, `tests/app.test.tsx`
- Create dirs (with files later): `src/{assets/images,components/{layout,sections,ui},scene,content,i18n,hooks,styles}`, `public/`
- Copy: `/mnt/user-data/outputs/hugo-portfolio/assets/hugo-avatar-{320,720}.webp`, `hugo-avatar-512.png` → `src/assets/images/`; `favicon-64.png`, `apple-touch-icon.png` → `public/`

**Interfaces:**
- Produces: `npm run dev|build|test|lint|typecheck`; `App` default export; Vitest env jsdom with `tests/setup.ts` (jest-dom matchers, `matchMedia` stub defaulting to no-match).

- [ ] **Step 1:** Scaffold with `npm create vite@latest . -- --template react-ts`, add deps (`three @react-three/fiber`, dev: `vitest jsdom @testing-library/react @testing-library/jest-dom @types/three`), set `base: '/Hugo/'`, vitest config in `vite.config.ts`, scripts `test: vitest run`, `typecheck: tsc -b --noEmit`. Delete template demo files.
- [ ] **Step 2: Failing test** `tests/app.test.tsx`: `render(<App/>)` → `expect(screen.getByRole('main')).toBeInTheDocument()`.
- [ ] **Step 3:** Run `npm test` → FAIL (no `main`). Make `App` render `<main id="top" />`. Run → PASS.
- [ ] **Step 4:** `index.html`: `lang="en"`, favicon/apple-touch links (`%BASE_URL%`), title "Hugo — Front-end Lead & Problem Solver", meta description EN, `<meta name="color-scheme" content="light dark">`. Copy assets.
- [ ] **Step 5:** `npm run build && npm run lint && npm run typecheck` all exit 0.
- [ ] **Step 6:** Commit `chore: scaffold vite react ts project`.

### Task 2: i18n core

**Files:**
- Create: `src/i18n/types.ts`, `src/i18n/en.ts`, `src/i18n/vi.ts`, `src/i18n/resolveLanguage.ts`, `src/i18n/LanguageProvider.tsx`, `src/i18n/useLanguage.ts`, `src/lib/storage.ts`
- Test: `tests/i18n.test.tsx`

**Interfaces:**
- Produces:
  - `type Lang = 'en' | 'vi'`; `type Localized<T = string> = Record<Lang, T>`
  - `type UiStrings` (keys: `nav.{about,experience,projects,toolbox,education,contact}`, `hero.{eyebrow,title,subtitle,cta,ctaSecondary}`, `meta.{title,description}`, `switch.{language,themeLight,themeDark}`, `section.*` headings, `footer.note`); `en: UiStrings`, `vi: UiStrings` (TS enforces same keys)
  - `readStorage(key: string): string | null`, `writeStorage(key: string, value: string): void` (both swallow errors)
  - `resolveInitialLanguage(input: { search: string; stored: string | null; navigatorLang: string | undefined }): Lang`
  - `<LanguageProvider>`; `useLanguage(): { lang: Lang; setLang(l: Lang): void; t: UiStrings; pick<T>(v: Localized<T>): T }`

- [ ] **Step 1: Failing tests:**
  - `resolveInitialLanguage({search:'?lang=vi',stored:'en',navigatorLang:'en-US'})` → `'vi'`
  - `({search:'?lang=fr',stored:'vi',navigatorLang:'en'})` → `'vi'`
  - `({search:'',stored:null,navigatorLang:'vi-VN'})` → `'vi'`
  - `({search:'',stored:'xx',navigatorLang:undefined})` → `'en'`
  - With `localStorage.getItem` mocked to throw: rendering provider + consumer shows English hero title, no throw.
  - After `setLang('vi')`: `document.documentElement.lang === 'vi'`, `document.title === vi.meta.title`, meta description content === `vi.meta.description`, `localStorage['hugo.lang'] === 'vi'`.
- [ ] **Step 2:** `npm test -- i18n` → FAIL.
- [ ] **Step 3:** Implement. Hero copy fixed by spec: EN title "I'm Hugo. I solve problems, with web, apps, scripts or whatever the job needs." / VI "Mình là Hugo. Mình giải quyết vấn đề — bằng web, app, script hay bất cứ thứ gì công việc cần."; subtitle (both) "Front-end Lead · Full-stack · Web · Mobile · Desktop · IT".
- [ ] **Step 4:** `npm test` → PASS. Commit `feat(i18n): language resolution and provider`.

### Task 3: Theme

**Files:**
- Create: `src/styles/theme.css`, `src/styles/global.css`, `src/hooks/useTheme.ts`, `src/components/ui/ThemeToggle.tsx`, `src/components/ui/LanguageSwitch.tsx`
- Test: `tests/theme.test.tsx`

**Interfaces:**
- Consumes: `readStorage/writeStorage`, `useLanguage`
- Produces: `type Theme = 'light' | 'dark'`; `useTheme(): { theme: Theme; toggle(): void }` — sets `document.documentElement.dataset.theme`; CSS vars `--bg --surface --text --muted --line --accent --accent-text --accent-ink` defined for `[data-theme=light]` and `[data-theme=dark]`.

- [ ] **Step 1: Failing tests:** stub `matchMedia('(prefers-color-scheme: dark)')` → matches: initial `data-theme === 'dark'`; click ThemeToggle → `'light'` and `localStorage['hugo.theme']==='light'`; storage throwing → still renders. LanguageSwitch: two buttons named "English" and "Tiếng Việt" with `lang` attrs, `aria-pressed` on current, inside `role="group"` labelled `t.switch.language`; clicking "Tiếng Việt" sets lang `vi`.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement (colours from Global Constraints). **Step 4:** Run → PASS. Commit `feat(ui): theme and language switches`.

### Task 4: CV content

**Files:**
- Create: `src/content/types.ts`, `profile.ts`, `experience.ts`, `projects.ts`, `toolbox.ts`, `education.ts`, `contact.ts`, `index.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Consumes: `Localized`
- Produces:
  - `profile: { name: 'Hugo'; fullName: 'Phan Thanh Bình'; location: Localized; about: Localized<string[]> }`
  - `experience: Array<{ id: string; period: Localized; role: string; org: Localized; summary: Localized; highlight?: Localized }>` (newest first; Fresher entry `highlight` = promoted after 2 months)
  - `projects: Array<{ id: string; name: string; problem: Localized; solution: Localized; role: Localized; stack: string[]; group: 'work' | 'school' }>`
  - `toolbox: Array<{ id: string; label: Localized; items: string[] }>`
  - `education: { school: Localized; major: Localized; period: '2022 – 2025'; gpa: '9.12'; awards: Array<{ year: string; label: Localized }>; certs: Array<{ year: '2024'; label: 'Aptis ESOL B2' }>; activities: Array<{ period: string; label: Localized }> }`
  - `contact: { email?: string; github: 'https://github.com/ThanhhBinh'; location: Localized }`; `primaryContactHref(c): string` → `mailto:` if email else github URL.

- [ ] **Step 1: Failing tests:** every `Localized` leaf (walk objects recursively) has non-empty `en` and `vi`; experience ids in order `['outsourcing-lead','inspilab-junior','inspilab-fresher']` with periods EN `'2025 – present'`, `'01/2025 – 2025'`, `'10/2024 – 12/2024'`; project names include `TeleRadar`, `AdOps`, `SaleAudit` (group work) and three school projects; serialized content (`JSON.stringify`) contains none of `/0335|facebook|Phước Long|phá sản|bankrupt/i`; `primaryContactHref({...contact, email: undefined})` → github URL; with `email:'a@b.c'` → `'mailto:a@b.c'`.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Write content from spec §3 verbatim facts (EN translations natural; org for current job "Outsourcing team" / "Team outsourcing"; no email set). **Step 4:** Run → PASS. Commit `feat(content): typed bilingual CV content`.

### Task 5: Layout and sections

**Files:**
- Create: `src/components/layout/{Header,Footer,ScrollProgress}.tsx`, `src/components/ui/{Reveal,Chip,SectionHeading}.tsx`, `src/components/sections/{Hero,About,Experience,Projects,Toolbox,Education,Contact}.tsx`, `src/hooks/{useActiveSection,useReducedMotion,useScrollProgress}.ts`, `src/styles/sections.css`
- Modify: `src/App.tsx`
- Test: `tests/sections.test.tsx`

**Interfaces:**
- Consumes: content exports, `useLanguage`, `useTheme`, ThemeToggle, LanguageSwitch
- Produces: each section is `<section id=... data-shape="sphere|h|ring">` — hero `sphere`; about, experience, projects, toolbox, education `h`; contact `ring`. `useReducedMotion(): boolean`. `useActiveSection(ids: string[]): string`. `useScrollProgress(): number` (0–1, also written to CSS var `--scroll` on `<html>`). Timeline fill uses CSS var `--fill` (0–1) set on the Experience list.

- [ ] **Step 1: Failing tests:** in `en`: headings for all 7 sections present, hero h1 = EN title, contact CTA `href` = github URL; switch to `vi`: hero h1 = VI title and nav shows VI labels; every `section` has a valid `data-shape`; header avatar img has alt "Hugo"; no element text matches phone regex `/\d{9,}/`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. Layout: desktop grid with text column `min(620px, 52vw)` on the left; hero avatar `hugo-avatar-720.webp` (srcset 320/720) centred where the 3D sphere sits (right half) on desktop, above the text on mobile. Reveal = IntersectionObserver adds `.in`; disabled when reduced motion. Header sticky with backdrop blur, nav links to `#id`, active link `aria-current="true"`.
- [ ] **Step 4:** Run → PASS. Commit `feat(sections): CV sections, header, scroll progress`.

### Task 6: 3D scene

**Files:**
- Create: `src/scene/shapes.ts`, `src/scene/shapeTarget.ts`, `src/scene/NetworkShape.tsx`, `src/scene/Scene.tsx`, `src/scene/SceneLayer.tsx`
- Modify: `src/App.tsx` (render `<SceneLayer/>`)
- Test: `tests/shapes.test.ts`, `tests/sceneLayer.test.tsx`

**Interfaces:**
- Produces:
  - `type Vec3 = [number, number, number]`; `sphereShape(n: number, r: number): Vec3[]`, `hShape(n: number): Vec3[]`, `ringShape(n: number, r: number): Vec3[]`, `sortByHeight(p: Vec3[]): Vec3[]`, `nearestLinks(p: Vec3[], k: number): Array<[number, number]>`
  - `shapeWeights(v: number): [number, number, number]` (v: 0 sphere, 1 H, 2 ring; weights sum to 1)
  - `targetShapeValue(sections: Array<{ shape: 'sphere'|'h'|'ring'; top: number }>, viewportH: number): number` — blend while next section top moves 0.9vh → 0.35vh (smoothstep)
  - `SceneLayer` — fixed full-viewport wrapper, `aria-hidden`, lazy-imports `Scene`; renders nothing if reduced motion or WebGL unsupported; wrapped in an error boundary that renders nothing on failure.
- [ ] **Step 1: Failing tests:** `sphereShape(64,2.6)` length 64, every point |p| ≈ 2.6 (±1e-6); `hShape(64)` length 64, all |x| ≤ 1.5+1e-6 and |y| ≤ 2.3+1e-6; `ringShape(64,2.6)` xy-radius ≈ 2.6; `shapeWeights(0)`=[1,0,0], `(1)`=[0,1,0], `(2)`=[0,0,1], `(0.5)` sums to 1; `targetShapeValue([{shape:'sphere',top:-800},{shape:'h',top:100}],800)` = 1; `([{shape:'sphere',top:0},{shape:'h',top:800}],800)` = 0. SceneLayer: with reduced motion stub → no `canvas`/no scene container child; with `HTMLCanvasElement.prototype.getContext` returning null → renders nothing.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. Algorithm values from the existing prototype `/mnt/user-data/outputs/hugo-portfolio/assets/hero3d.src.js` (64 nodes, radius 2.6, H strokes x=±1.5, y=±2.3, two layers z=±0.35, packets 10, additive blending, links coloured by `shapeWeights` × 0.42, sphere spins, H/ring sway; pointer parallax; group x = 0.24 × visible width on ≥ 960px else 0). Read `targetShapeValue` each frame inside `useFrame` from `document.querySelectorAll('[data-shape]')`; ease toward it. Mobile canvas opacity 0.35. Colours read from CSS var `--accent` (re-read on theme change). Pause when `document.hidden`.
- [ ] **Step 4:** Run → PASS; `npm run build` → scene in separate chunk. Commit `feat(scene): scroll-driven 3D network`.

### Task 7: Deploy, README, verification

**Files:**
- Create: `.github/workflows/deploy.yml`, `scripts/screenshots.mjs`
- Modify: `README.md`

- [ ] **Step 1:** Workflow: on push to `main` + manual; Node 22; `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`; `actions/upload-pages-artifact` (`dist`) + `actions/deploy-pages`.
- [ ] **Step 2:** README (Vietnamese + short English): run locally, edit content in `src/content/`, add email, enable Pages (Settings → Pages → Source: GitHub Actions), change `base` for a custom domain.
- [ ] **Step 3:** `scripts/screenshots.mjs` (Playwright, against `npm run preview`): desktop 1440×900 dark+light, mobile 390×844, 360px VI; each asserts `document.documentElement.scrollWidth <= innerWidth`; scrolls to each section and saves PNG.
- [ ] **Step 4:** Run `npm run build && npm run preview & node scripts/screenshots.mjs` → exit 0; inspect images: text readable over canvas, shape changes sphere → H → ring.
- [ ] **Step 5:** Commit `chore: deploy workflow, readme, screenshot check`.
