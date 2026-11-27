import { act, render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import App from '../src/App'
import { career, projects } from '../src/content'
import { en } from '../src/i18n/en'
import { vi } from '../src/i18n/vi'

declare const stubMatchMedia: (m?: (q: string) => boolean) => void

const SECTION_IDS = ['hero', 'highlights', 'projects', 'services', 'experience', 'toolbox', 'goals', 'education', 'contact']

describe('App sections', () => {
  test('shows every section heading and the English hero', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(en.hero.title)
    for (const heading of [
      en.section.highlights,
      en.section.projects,
      en.section.services,
      en.section.experience,
      en.section.toolbox,
      en.section.goals,
      en.section.education,
      en.section.contact,
    ]) {
      expect(screen.getByRole('heading', { level: 2, name: heading })).toBeInTheDocument()
    }
  })

  test('hero offers the CV download and follows the language', () => {
    render(<App />)
    for (const a of screen.getAllByRole('link', { name: en.hero.downloadCv })) expect(a).toHaveAttribute('href', expect.stringMatching(/Hugo-CV-EN\.pdf$/))
    act(() => screen.getByRole('button', { name: 'Tiếng Việt' }).click())
    const links = screen.getAllByRole('link', { name: vi.hero.downloadCv })
    expect(links.length).toBeGreaterThan(1)
    for (const a of links) expect(a).toHaveAttribute('href', expect.stringMatching(/Hugo-CV-VI\.pdf$/))
  })

  test('hero hire button goes to the contact section', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: en.hero.hire })).toHaveAttribute('href', '#contact')
  })

  test('contact shows the email as a mailto link', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'thanhhbinh0501@gmail.com' })).toHaveAttribute('href', 'mailto:thanhhbinh0501@gmail.com')
    expect(screen.getByRole('link', { name: new RegExp(en.contact.sendEmail) })).toHaveAttribute('href', 'mailto:thanhhbinh0501@gmail.com')
  })

  test('every work project card lists what Hugo did', () => {
    render(<App />)
    for (const p of projects.filter((x) => x.group === 'work')) {
      for (const item of p.did!.en) expect(screen.getByText(item)).toBeInTheDocument()
    }
  })

  test('the career log lists four commits, newest first, with HEAD on the latest', () => {
    render(<App />)
    const log = screen.getByRole('list', { name: en.section.highlights })
    const commits = within(log).getAllByRole('listitem')
    expect(commits.map((c) => c.textContent)).toEqual([...career.ladder].reverse().map((l) => expect.stringContaining(l.role)))
    expect(commits[0]).toHaveTextContent('03/2026')
    expect(commits[0]).toHaveTextContent('HEAD')
  })

  test('the hero terminal shows role and stack (reduced motion shows it at once)', () => {
    stubMatchMedia((q) => q === '(prefers-reduced-motion: reduce)')
    render(<App />)
    const term = screen.getByTestId('terminal')
    expect(term).toHaveTextContent(en.hero.keywords)
    expect(term).toHaveTextContent('React · TypeScript · Flutter')
    // Screen readers get the same facts as plain text, not the typing.
    expect(term).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText(/Phan Thanh Bình — .*React · TypeScript · Flutter/)).toBeInTheDocument()
  })

  test('each work project shows its problem as a removed diff line', () => {
    const { container } = render(<App />)
    for (const p of projects.filter((x) => x.group === 'work')) {
      const del = [...container.querySelectorAll('.diff .del')].find((li) => li.textContent?.includes(p.problem.en))
      expect(del, p.name).toBeTruthy()
    }
  })

  test('final numbers show without motion', () => {
    stubMatchMedia((q) => q === '(prefers-reduced-motion: reduce)')
    render(<App />)
    for (const s of career.stats) expect(screen.getAllByText(s.value).length).toBeGreaterThan(0)
  })

  test('switching to Vietnamese changes the hero and the navigation', () => {
    render(<App />)
    act(() => screen.getByRole('button', { name: 'Tiếng Việt' }).click())
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(vi.hero.title)
    const nav = screen.getByRole('navigation', { name: vi.nav.label })
    expect(within(nav).getByRole('link', { name: vi.nav.experience })).toHaveAttribute('href', '#experience')
  })

  test('menu follows the planned order', () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: en.nav.label })
    expect(within(nav).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual([
      '#projects', '#services', '#experience', '#toolbox', '#goals', '#education', '#contact',
    ])
  })

  test('sections exist in order and declare a 3D shape', () => {
    const { container } = render(<App />)
    const sections = [...container.querySelectorAll('main > section')]
    expect(sections.map((s) => s.id)).toEqual(SECTION_IDS)
    for (const s of sections) expect(['sphere', 'dots']).toContain(s.getAttribute('data-shape'))
    expect(container.querySelector('#hero')?.getAttribute('data-shape')).toBe('sphere')
    expect(container.querySelector('#projects')?.getAttribute('data-shape')).toBe('dots')
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
