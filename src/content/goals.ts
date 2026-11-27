import type { Goal } from './types'

export const goals: Goal[] = [
  {
    id: 'short',
    kicker: { en: 'Next 1–2 years', vi: '1–2 năm tới' },
    title: { en: 'Be a solid Front-end Lead', vi: 'Vững vai trò Lead Front-end' },
    body: {
      en: 'Build clean, scalable front-end architecture, review code, and help the team ship faster with fewer bugs.',
      vi: 'Xây kiến trúc front-end gọn, dễ mở rộng; review code và giúp team làm nhanh, ít lỗi hơn.',
    },
  },
  {
    id: 'study',
    kicker: { en: 'Studying', vi: 'Học tập' },
    title: { en: 'Finish my bridge degree at HCM-UTE', vi: 'Hoàn thành liên thông tại HCM-UTE' },
    body: {
      en: 'Strengthen my fundamentals alongside work.',
      vi: 'Củng cố nền tảng song song với công việc.',
    },
  },
  {
    id: 'long',
    kicker: { en: 'Long term', vi: 'Dài hạn' },
    title: { en: 'Solve problems end to end', vi: 'Giải quyết bài toán trọn vẹn' },
    body: {
      en: 'Take a business problem and deliver the whole solution: web, mobile, desktop and infrastructure.',
      vi: 'Nhận một vấn đề kinh doanh và đưa ra giải pháp từ đầu đến cuối: web, mobile, desktop, hạ tầng.',
    },
  },
]
