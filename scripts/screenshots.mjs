// Visual check. Run `npm run build && npm run preview` first, then `node scripts/screenshots.mjs`.
// Saves screenshots to ./screenshots and fails if any page scrolls sideways.
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const URL = process.env.URL ?? 'http://localhost:4173/Hugo/'
const SECTIONS = ['hero', 'highlights', 'projects', 'services', 'experience', 'toolbox', 'goals', 'education', 'contact']
const CASES = [
  { name: 'desktop-dark', viewport: { width: 1440, height: 900 }, colorScheme: 'dark', lang: 'en' },
  { name: 'desktop-light', viewport: { width: 1440, height: 900 }, colorScheme: 'light', lang: 'en' },
  { name: 'mobile-dark', viewport: { width: 390, height: 844 }, colorScheme: 'dark', lang: 'en' },
  { name: 'narrow-vi', viewport: { width: 360, height: 780 }, colorScheme: 'light', lang: 'vi' },
  { name: 'tall-960-vi', viewport: { width: 960, height: 1000 }, colorScheme: 'dark', lang: 'vi' },
]

function contrast(rgbA, rgbB) {
  const lum = (rgb) => {
    const [r, g, b] = rgb.map((v) => {
      const c = v / 255
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const [a, b] = [lum(rgbA), lum(rgbB)].sort((x, y) => y - x)
  return (a + 0.05) / (b + 0.05)
}
const parseRgb = (s) => s.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number)

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

  // The hero avatar must never cover the hero text.
  const overlap = await page.evaluate(() => {
    const a = document.querySelector('.hero-avatar').getBoundingClientRect()
    return [...document.querySelectorAll('.hero-text > *')].some((el) => {
      const t = el.getBoundingClientRect()
      return t.right > a.left && t.left < a.right && t.bottom > a.top && t.top < a.bottom
    })
  })
  if (overlap) {
    console.error(`${c.name}: hero avatar covers the hero text`)
    failed = true
  }

  // A menu must be reachable at every size.
  const navVisible = await page.evaluate(() => {
    const nav = document.querySelector('.main-nav')
    return !!nav && nav.getBoundingClientRect().height > 0 && getComputedStyle(nav).display !== 'none'
  })
  if (!navVisible) {
    console.error(`${c.name}: no visible menu`)
    failed = true
  }

  // Keyboard focus ring needs 3:1 against the page background.
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  const [outline, bg] = await page.evaluate(() => [
    getComputedStyle(document.activeElement).outlineColor,
    getComputedStyle(document.body).backgroundColor,
  ])
  const ratio = contrast(parseRgb(outline), parseRgb(bg))
  if (ratio < 3) {
    console.error(`${c.name}: focus ring contrast ${ratio.toFixed(2)}:1 is below 3:1`)
    failed = true
  }
  await page.evaluate(() => document.activeElement?.blur())

  // Behind the content the 3D layer must be faint (opacity <= 0.35).
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' }))
  await page.waitForTimeout(2500)
  const layerOpacity = await page.evaluate(() => Number(getComputedStyle(document.querySelector('.scene-layer')).opacity))
  if (layerOpacity > 0.35) {
    console.error(`${c.name}: 3D layer opacity ${layerOpacity} is above 0.35 behind the content`)
    failed = true
  }

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
