import type { ToolGroup } from './types'

export const toolbox: ToolGroup[] = [
  { id: 'languages', label: { en: 'Languages', vi: 'Ngôn ngữ' }, items: ['TypeScript', 'JavaScript', 'Dart', 'PHP'] },
  { id: 'frameworks', label: { en: 'Frameworks', vi: 'Framework' }, items: ['React', 'Flutter', 'Laravel'] },
  { id: 'platforms', label: { en: 'Platforms', vi: 'Nền tảng' }, items: ['Web', 'Android', 'iOS', 'Windows', 'macOS'] },
  { id: 'data-tools', label: { en: 'Data & tools', vi: 'Dữ liệu & công cụ' }, items: ['MySQL', 'Git', 'VSCode'] },
  {
    id: 'it',
    label: { en: 'IT', vi: 'IT' },
    items: ['IT support', 'Email', 'DNS / Domains'],
  },
]
