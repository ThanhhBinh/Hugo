import { describe, expect, test } from 'vitest'
import { contact, education, experience, primaryContactHref, profile, projects, toolbox } from '../src/content'

const all = { profile, experience, projects, toolbox, education, contact }

/** Walk every value; an object with exactly the keys en+vi is a Localized leaf. */
function localizedLeaves(value: unknown, path = 'content'): Array<[string, unknown, unknown]> {
  if (Array.isArray(value)) return value.flatMap((v, i) => localizedLeaves(v, `${path}[${i}]`))
  if (value && typeof value === 'object') {
    const keys = Object.keys(value).sort()
    if (keys.join(',') === 'en,vi') {
      const v = value as { en: unknown; vi: unknown }
      return [[path, v.en, v.vi]]
    }
    return Object.entries(value).flatMap(([k, v]) => localizedLeaves(v, `${path}.${k}`))
  }
  return []
}

describe('content', () => {
  test('every localized field has non-empty English and Vietnamese', () => {
    const leaves = localizedLeaves(all)
    expect(leaves.length).toBeGreaterThan(20)
    for (const [path, en, vi] of leaves) {
      const empty = (x: unknown) => x === '' || (Array.isArray(x) && x.length === 0) || x == null
      expect(empty(en), `${path}.en`).toBe(false)
      expect(empty(vi), `${path}.vi`).toBe(false)
    }
  })

  test('experience is newest first with the stated periods', () => {
    expect(experience.map((e) => e.id)).toEqual(['outsourcing-lead', 'inspilab-junior', 'inspilab-fresher'])
    expect(experience.map((e) => e.period.en)).toEqual(['2025 – present', '01/2025 – 2025', '10/2024 – 12/2024'])
  })

  test('projects include the three work projects and three school projects', () => {
    const work = projects.filter((p) => p.group === 'work').map((p) => p.name)
    expect(work).toEqual(['TeleRadar', 'AdOps', 'SaleAudit'])
    expect(projects.filter((p) => p.group === 'school')).toHaveLength(3)
  })

  test('never contains private details or the old company closing', () => {
    const text = JSON.stringify(all)
    expect(text).not.toMatch(/0335|facebook|Phước Long|phá sản|bankrupt|đóng cửa|closed down/i)
  })

  test('contact falls back to GitHub when there is no email', () => {
    expect(primaryContactHref({ ...contact, email: undefined })).toBe('https://github.com/ThanhhBinh')
    expect(primaryContactHref({ ...contact, email: 'a@b.c' })).toBe('mailto:a@b.c')
  })

  test('education keeps the stated facts', () => {
    expect(education.gpa).toBe('9.12')
    expect(education.period).toBe('2022 – 2025')
    expect(education.certs).toEqual([{ year: '2024', label: 'Aptis ESOL B2' }])
  })
})
