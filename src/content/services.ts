import type { Services } from './types'

export const services: Services = {
  items: [
    {
      id: 'web',
      file: 'web.tsx',
      title: { en: 'Web apps', vi: 'Ứng dụng web' },
      body: {
        en: 'Dashboards, admin tools and websites that are fast and easy to maintain.',
        vi: 'Dashboard, công cụ quản trị và website nhanh, dễ bảo trì.',
      },
      tags: ['React', 'TypeScript'],
    },
    {
      id: 'apps',
      file: 'apps.dart',
      title: { en: 'Mobile & desktop apps', vi: 'App mobile & desktop' },
      body: {
        en: 'One codebase for Android, iOS, Windows and macOS.',
        vi: 'Một mã nguồn cho Android, iOS, Windows và macOS.',
      },
      tags: ['Flutter'],
    },
    {
      id: 'automation',
      file: 'auto.sh',
      title: { en: 'Scripts & automation', vi: 'Script & tự động hoá' },
      body: {
        en: 'Small tools that replace repetitive manual work.',
        vi: 'Công cụ nhỏ thay cho việc lặp đi lặp lại bằng tay.',
      },
      tags: ['Node.js', 'Python'],
    },
    {
      id: 'it',
      file: 'it.conf',
      title: { en: 'Email, domains & IT support', vi: 'Email, tên miền & hỗ trợ IT' },
      body: {
        en: 'Setting up and fixing email, domains and everyday IT problems.',
        vi: 'Cấu hình và sửa lỗi email, tên miền và các sự cố IT hằng ngày.',
      },
      tags: ['DNS', 'Email'],
    },
  ],
  steps: [
    {
      title: { en: 'You describe the problem', vi: 'Bạn kể vấn đề' },
      body: { en: 'Tell me what is slow, manual or broken.', vi: 'Cho mình biết việc gì đang chậm, thủ công hoặc hỏng.' },
    },
    {
      title: { en: 'I send a plan and estimate', vi: 'Mình gửi kế hoạch và ước lượng' },
      body: { en: 'A clear scope, timeline and price before we start.', vi: 'Phạm vi, thời gian và chi phí rõ ràng trước khi bắt đầu.' },
    },
    {
      title: { en: 'I build, update and hand over', vi: 'Mình làm, cập nhật, bàn giao' },
      body: { en: 'Regular updates, then a handover with a clear explanation.', vi: 'Cập nhật đều đặn, rồi bàn giao kèm giải thích rõ ràng.' },
    },
  ],
}
