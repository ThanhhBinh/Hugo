import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { CvDocument } from '../src/cv/CvDocument'

describe('CvDocument', () => {
  test('English CV has the key facts', () => {
    const { container } = render(<CvDocument lang="en" />)
    const text = container.textContent ?? ''
    for (const s of ['Phan Thanh Bình', 'thanhhbinh0501@gmail.com', '03/2026 – present', 'TeleRadar', 'HCM-UTE']) {
      expect(text).toContain(s)
    }
  })

  test('Vietnamese CV uses Vietnamese periods', () => {
    const { container } = render(<CvDocument lang="vi" />)
    expect(container.textContent).toContain('03/2026 – nay')
    expect(container.querySelector('article')?.getAttribute('lang')).toBe('vi')
  })

  test('CV never includes private details', () => {
    for (const lang of ['en', 'vi'] as const) {
      const { container, unmount } = render(<CvDocument lang={lang} />)
      expect(container.textContent).not.toMatch(/0335|facebook|Phước Long/i)
      unmount()
    }
  })

  test('CV lists what Hugo did on each work project', () => {
    const { container } = render(<CvDocument lang="en" />)
    expect(container.textContent).toContain('Built the automatic matching of sales data.')
  })
})
