import type { Lang } from '../i18n/types'

/** Path of the CV PDF that matches the language (built by `npm run build:cv`). */
export function cvHref(lang: Lang): string {
  return `${import.meta.env.BASE_URL}Hugo-CV-${lang.toUpperCase()}.pdf`
}
