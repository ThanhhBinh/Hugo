import { describe, expect, test } from 'vitest'
import { career, contact, education, experience, goals, primaryContactHref, profile, projects, services, toolbox } from '../src/content'

const all = { profile, experience, projects, toolbox, education, contact, career, services, goals }

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
    expect(experience.map((e) => e.id)).toEqual(['outsourcing-lead', 'middle', 'inspilab-junior', 'inspilab-fresher'])
    expect(experience.map((e) => e.period.en)).toEqual([
      '03/2026 – present',
      '04/2025 – 02/2026',
      '01/2025 – 03/2025',
      '10/2024 – 12/2024',
    ])
    expect(experience[0]!.period.vi).toBe('03/2026 – nay')
    expect(experience[0]!.team?.en).toMatch(/4–6/)
  })

  test('career ladder and stats match what Hugo stated', () => {
    expect(career.ladder.map((l) => l.date)).toEqual(['10/2024', '01/2025', '04/2025', '03/2026'])
    expect(career.ladder.map((l) => l.role)).toEqual(['Fresher', 'Junior', 'Middle', 'Lead Front-end'])
    expect(career.stats.map((s) => s.value)).toEqual(['17', '4–6', '5', '9.12'])
  })

  test('each work project explains what Hugo did', () => {
    for (const p of projects.filter((x) => x.group === 'work')) {
      expect(p.did?.en, p.name).toHaveLength(3)
      expect(p.did?.vi, p.name).toHaveLength(3)
      expect(p.result?.en.length, p.name).toBeGreaterThan(0)
    }
    expect(projects.filter((x) => x.group === 'work').map((p) => p.art)).toEqual(['radar', 'campaigns', 'audit'])
  })

  test('services and goals have the planned shape', () => {
    expect(services.items).toHaveLength(4)
    expect(services.steps).toHaveLength(3)
    expect(goals).toHaveLength(3)
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
    expect(primaryContactHref(contact)).toBe('mailto:thanhhbinh0501@gmail.com')
    expect(primaryContactHref({ ...contact, email: undefined })).toBe('https://github.com/ThanhhBinh')
    expect(primaryContactHref({ ...contact, email: 'a@b.c' })).toBe('mailto:a@b.c')
  })

  test('experience makes no claims beyond what Hugo stated', () => {
    const text = JSON.stringify(experience)
    expect(text).not.toMatch(/idea to release|ý tưởng tới khi phát hành/i)
    expect(experience[0]!.summary.en).not.toMatch(/SaleAudit\) for web, mobile and desktop/)
  })

  test('shows the current bridge degree at HCM-UTE as ongoing', () => {
    expect(education.studying?.school.vi).toBe('Trường Đại học Công nghệ Kỹ thuật TP.HCM (HCM-UTE)')
    expect(education.studying?.school.en).toBe('Ho Chi Minh City University of Technology and Engineering (HCM-UTE)')
    expect(education.studying?.status.en).toMatch(/currently studying/i)
  })

  test('education keeps the stated facts', () => {
    expect(education.gpa).toBe('9.12')
    expect(education.period).toBe('2022 – 2024')
    expect(education.certs).toEqual([{ year: '2024', label: 'Aptis ESOL B2' }])
  })
})
