import type { Contact } from './types'

export const contact: Contact = {
  // Add your email here when you want it on the site, e.g. email: 'you@example.com'
  github: 'https://github.com/ThanhhBinh',
  location: { en: 'Ho Chi Minh City, Vietnam', vi: 'TP. Hồ Chí Minh' },
}

export function primaryContactHref(c: Contact): string {
  return c.email ? `mailto:${c.email}` : c.github
}
