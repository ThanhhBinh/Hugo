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
}

export interface Project {
  id: string
  name: string
  problem: Localized
  solution: Localized
  role: Localized
  stack: string[]
  group: 'work' | 'school'
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
  github: string
  location: Localized
}
