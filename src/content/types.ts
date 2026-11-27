import type { Localized } from '../i18n/types'

export interface Profile {
  name: string
  fullName: string
  location: Localized
  about: Localized<string[]>
}

export interface ExperienceItem {
  id: string
  period: Localized
  role: string
  org: Localized
  summary: Localized
  /** Short badge, e.g. the fast promotion. */
  highlight?: Localized
  /** Team size line, e.g. the lead role. */
  team?: Localized
}

export interface Project {
  id: string
  name: string
  problem: Localized
  solution: Localized
  role: Localized
  stack: string[]
  group: 'work' | 'school'
  /** What Hugo did, three short points (work projects). */
  did?: Localized<string[]>
  result?: Localized
  period?: Localized
  /** Which abstract illustration to draw. */
  art: 'radar' | 'campaigns' | 'audit' | 'none'
}

export interface Career {
  ladder: Array<{ role: string; date: string }>
  stats: Array<{ value: string; label: Localized }>
}

export interface Services {
  items: Array<{ id: string; title: Localized; body: Localized; tags: string[] }>
  steps: Array<{ title: Localized; body: Localized }>
}

export interface Goal {
  id: string
  kicker: Localized
  title: Localized
  body: Localized
}

export interface ToolGroup {
  id: string
  label: Localized
  items: string[]
}

export interface Education {
  /** Degree in progress, shown first. */
  studying?: { school: Localized; program: Localized; status: Localized }
  school: Localized
  major: Localized
  period: string
  gpa: string
  gpaNote: Localized
  awards: Array<{ year: string; label: Localized }>
  certs: Array<{ year: string; label: string }>
  activities: Array<{ period: string; label: Localized }>
}

export interface Contact {
  /** Optional. Without it, every contact button points to GitHub. */
  email?: string
  linkedin?: string
  github: string
  location: Localized
}
