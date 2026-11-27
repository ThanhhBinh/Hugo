export const LANGS = ['en', 'vi'] as const
export type Lang = (typeof LANGS)[number]

/** A value written in every supported language. */
export type Localized<T = string> = Record<Lang, T>

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value)
}

/** Interface text (not CV content). Both languages must have every key. */
export interface UiStrings {
  meta: { title: string; description: string }
  nav: {
    label: string
    about: string
    experience: string
    projects: string
    toolbox: string
    education: string
    contact: string
    services: string
    goals: string
  }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    cta: string
    ctaSecondary: string
    keywords: string
    downloadCv: string
    hire: string
  }
  section: {
    about: string
    experience: string
    projects: string
    projectsWork: string
    projectsSchool: string
    toolbox: string
    education: string
    awards: string
    certs: string
    activities: string
    contact: string
    highlights: string
    services: string
    process: string
    goals: string
  }
  labels: {
    problem: string
    solution: string
    role: string
    promoted: string
    gpa: string
    did: string
    result: string
    illustration: string
    team: string
  }
  contact: { lead: string; email: string; github: string; location: string; sendEmail: string }
  switch: { language: string; themeToLight: string; themeToDark: string }
  footer: { note: string }
  skip: string
}
