import type { Career } from './types'

export const career: Career = {
  ladder: [
    { role: 'Fresher', date: '10/2024' },
    { role: 'Junior', date: '01/2025' },
    { role: 'Middle', date: '04/2025' },
    { role: 'Lead Front-end', date: '03/2026' },
  ],
  stats: [
    { value: '17', label: { en: 'months from Fresher to Lead', vi: 'tháng từ Fresher lên Lead' } },
    { value: '4–6', label: { en: 'people in the front-end team I lead', vi: 'người trong nhóm front-end mình dẫn dắt' } },
    { value: '5', label: { en: 'platforms: Web, Android, iOS, Windows, macOS', vi: 'nền tảng: Web, Android, iOS, Windows, macOS' } },
    { value: '9.12', label: { en: 'college GPA, top 4 of the faculty', vi: 'ĐTB cao đẳng, top 4 Khoa' } },
  ],
}
