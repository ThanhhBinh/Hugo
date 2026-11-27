import type { Contact } from './types'

export const contact: Contact = {
  email: 'thanhhbinh0501@gmail.com',
  // linkedin: 'https://www.linkedin.com/in/...',  // add when ready
  github: 'https://github.com/ThanhhBinh',
  location: { en: 'Ho Chi Minh City, Vietnam', vi: 'TP. Hồ Chí Minh' },
}

export function primaryContactHref(c: Contact): string {
  return c.email ? `mailto:${c.email}` : c.github
}
