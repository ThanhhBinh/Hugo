import { act, render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import App from '../src/App'
import { en } from '../src/i18n/en'
import { vi } from '../src/i18n/vi'

describe('App sections', () => {
  test('shows every section heading and the English hero', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(en.hero.title)
    for (const heading of [en.section.about, en.section.experience, en.section.projects, en.section.toolbox, en.section.education, en.section.contact]) {
      expect(screen.getByRole('heading', { level: 2, name: heading })).toBeInTheDocument()
    }
  })

  test('the hero contact button points to GitHub while there is no email', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: en.hero.cta })).toHaveAttribute('href', 'https://github.com/ThanhhBinh')
  })

  test('switching to Vietnamese changes the hero and the navigation', () => {
    render(<App />)
    act(() => screen.getByRole('button', { name: 'Tiếng Việt' }).click())
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(vi.hero.title)
    const nav = screen.getByRole('navigation', { name: vi.nav.label })
    expect(within(nav).getByRole('link', { name: vi.nav.experience })).toHaveAttribute('href', '#experience')
  })

  test('every section declares a 3D shape', () => {
    const { container } = render(<App />)
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBe(7)
    for (const s of sections) expect(['sphere', 'h', 'ring']).toContain(s.getAttribute('data-shape'))
    expect(container.querySelector('#hero')?.getAttribute('data-shape')).toBe('sphere')
    expect(container.querySelector('#contact')?.getAttribute('data-shape')).toBe('ring')
  })

  test('education section shows the ongoing university study', () => {
    render(<App />)
    expect(screen.getByText('Ho Chi Minh City University of Technology and Engineering (HCM-UTE)')).toBeInTheDocument()
  })

  test('header avatar is labelled and no phone number appears', () => {
    const { container } = render(<App />)
    expect(screen.getAllByRole('img', { name: 'Hugo' }).length).toBeGreaterThan(0)
    expect(container.textContent).not.toMatch(/\d{9,}/)
  })
})
