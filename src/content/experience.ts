import type { ExperienceItem } from './types'

// Newest first. Only dates Hugo stated: no invented months.
export const experience: ExperienceItem[] = [
  {
    id: 'outsourcing-lead',
    period: { en: '2025 – present', vi: '2025 – nay' },
    role: 'Lead Front-end',
    org: { en: 'Outsourcing team', vi: 'Team outsourcing' },
    summary: {
      en: 'Lead the front-end and build full-stack products (TeleRadar, AdOps, SaleAudit) for web, mobile and desktop. Also take care of IT support, email and domains for the team.',
      vi: 'Dẫn dắt phần front-end và làm full-stack các sản phẩm (TeleRadar, AdOps, SaleAudit) cho web, mobile và desktop. Kiêm hỗ trợ IT, quản lý email và tên miền cho team.',
    },
  },
  {
    id: 'inspilab-junior',
    period: { en: '01/2025 – 2025', vi: '01/2025 – 2025' },
    role: 'Junior Developer',
    org: { en: 'InspiLab · travel technology (Inspitrip)', vi: 'InspiLab · công nghệ du lịch (Inspitrip)' },
    summary: {
      en: 'Developed product features as part of a small engineering team, from idea to release.',
      vi: 'Phát triển tính năng sản phẩm trong một team kỹ sư nhỏ, từ ý tưởng tới khi phát hành.',
    },
  },
  {
    id: 'inspilab-fresher',
    period: { en: '10/2024 – 12/2024', vi: '10/2024 – 12/2024' },
    role: 'Fresher',
    org: { en: 'InspiLab · travel technology (Inspitrip)', vi: 'InspiLab · công nghệ du lịch (Inspitrip)' },
    summary: {
      en: 'Joined the team, learned the product and codebase quickly.',
      vi: 'Vào team, làm quen nhanh với sản phẩm và mã nguồn.',
    },
    highlight: { en: 'Promoted to Junior after 2 months', vi: 'Lên Junior chỉ sau 2 tháng' },
  },
]
