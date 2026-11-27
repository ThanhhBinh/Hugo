// Visual check. Run `npm run build && npm run preview` first, then `node scripts/screenshots.mjs`.
// Saves screenshots to ./screenshots and fails if any page scrolls sideways.
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const URL = process.env.URL ?? 'http://localhost:4173/Hugo/'
const SECTIONS = ['hero', 'about', 'experience', 'projects', 'toolbox', 'education', 'contact']
const CASES = [
  { name: 'desktop-dark', viewport: { width: 1440, height: 900 }, colorScheme: 'dark', lang: 'en' },
  { name: 'desktop-light', viewport: { width: 1440, height: 900 }, colorScheme: 'light', lang: 'en' },
  { name: 'mobile-dark', viewport: { width: 390, height: 844 }, colorScheme: 'dark', lang: 'en' },
  { name: 'narrow-vi', viewport: { width: 360, height: 780 }, colorScheme: 'light', lang: 'vi' },
]

mkdirSync('screenshots', { recursive: true })
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
let failed = false

for (const c of CASES) {
  const page = await browser.newPage({ viewport: c.viewport, colorScheme: c.colorScheme })
  page.on('pageerror', (e) => {
    console.error(`${c.name}: page error: ${e.message}`)
    failed = true
  })
  await page.goto(`${URL}?lang=${c.lang}`)
  await page.waitForTimeout(1500)
  for (const id of SECTIONS) {
    await page.evaluate((i) => document.getElementById(i)?.scrollIntoView({ behavior: 'instant' }), id)
    await page.waitForTimeout(1200)
    await page.screenshot({ path: `screenshots/${c.name}-${id}.png` })
  }
  const [scrollWidth, innerWidth] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth])
  if (scrollWidth > innerWidth) {
    console.error(`${c.name}: page is ${scrollWidth}px wide but the screen is ${innerWidth}px`)
    failed = true
  }
  console.log(`${c.name}: ok (${scrollWidth}/${innerWidth})`)
  await page.close()
}

await browser.close()
process.exit(failed ? 1 : 0)
