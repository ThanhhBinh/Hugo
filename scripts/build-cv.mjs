// Prints the CV page (cv.html) to dist/Hugo-CV-EN.pdf and dist/Hugo-CV-VI.pdf.
// Run after `npm run build`. Fails if a file is missing or suspiciously small.
import { existsSync, statSync } from 'node:fs'
import { chromium } from 'playwright'
import { preview } from 'vite'

const PORT = 4174
const server = await preview({ preview: { port: PORT, strictPort: true, host: '127.0.0.1' } })
const base = (server.config.base ?? '/').replace(/\/$/, '')
const browser = await chromium.launch()
let failed = false

try {
  for (const lang of ['en', 'vi']) {
    const page = await browser.newPage()
    await page.goto(`http://127.0.0.1:${PORT}${base}/cv.html?lang=${lang}`)
    await page.waitForSelector('article.cv')
    await page.evaluate(() => document.fonts.ready)
    const file = `dist/Hugo-CV-${lang.toUpperCase()}.pdf`
    await page.pdf({ path: file, format: 'A4', printBackground: true, preferCSSPageSize: true })
    await page.close()
    const size = existsSync(file) ? statSync(file).size : 0
    if (size < 10_000) {
      console.error(`${file}: missing or too small (${size} bytes)`)
      failed = true
    } else {
      console.log(`${file}: ${size} bytes`)
    }
  }
} finally {
  await browser.close()
  await new Promise((r) => server.httpServer.close(r))
}
process.exit(failed ? 1 : 0)
