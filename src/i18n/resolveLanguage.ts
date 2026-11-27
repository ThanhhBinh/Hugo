import { isLang, type Lang } from './types'

interface Input {
  search: string
  stored: string | null
  navigatorLang: string | undefined
}

/** Order: ?lang= in the URL, then the saved choice, then the browser language, then English. */
export function resolveInitialLanguage({ search, stored, navigatorLang }: Input): Lang {
  const fromUrl = new URLSearchParams(search).get('lang')
  if (isLang(fromUrl)) return fromUrl
  if (isLang(stored)) return stored
  if (navigatorLang?.toLowerCase().startsWith('vi')) return 'vi'
  return 'en'
}
