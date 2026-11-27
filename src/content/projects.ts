import type { Project } from './types'

// Work projects: names and one-line descriptions only (no screenshots, metrics or client names).
export const projects: Project[] = [
  {
    id: 'teleradar',
    name: 'TeleRadar',
    group: 'work',
    problem: {
      en: 'Following Telegram by hand was slow and easy to miss things.',
      vi: 'Theo dõi Telegram thủ công vừa chậm vừa dễ sót.',
    },
    solution: {
      en: 'A tool that collects and summarises the information in one place.',
      vi: 'Công cụ tự gom và thống kê thông tin về một chỗ.',
    },
    role: { en: 'Full-stack', vi: 'Full-stack' },
    stack: ['React', 'TypeScript', 'Full-stack'],
  },
  {
    id: 'adops',
    name: 'AdOps',
    group: 'work',
    problem: {
      en: 'Ad campaigns were managed in many scattered places.',
      vi: 'Quảng cáo được quản lý rải rác ở nhiều nơi.',
    },
    solution: {
      en: 'One central system to run and manage campaigns.',
      vi: 'Hệ thống vận hành chiến dịch tập trung.',
    },
    role: { en: 'Full-stack', vi: 'Full-stack' },
    stack: ['React', 'TypeScript', 'Full-stack'],
  },
  {
    id: 'saleaudit',
    name: 'SaleAudit',
    group: 'work',
    problem: {
      en: 'Checking sales figures by hand took time and caused mistakes.',
      vi: 'Đối soát số liệu bán hàng bằng tay mất thời gian và dễ sai.',
    },
    solution: {
      en: 'An automatic checking tool for sales data.',
      vi: 'Công cụ kiểm tra số liệu bán hàng tự động.',
    },
    role: { en: 'Full-stack', vi: 'Full-stack' },
    stack: ['React', 'TypeScript', 'Full-stack'],
  },
  {
    id: 'school-shopee',
    name: 'Shopee sales management',
    group: 'school',
    problem: {
      en: 'Sellers needed one place for orders, customers, vouchers and reports.',
      vi: 'Người bán cần một nơi quản lý đơn hàng, khách hàng, voucher và báo cáo.',
    },
    solution: {
      en: 'A full system with order tracking, customer management, promotions and analytics.',
      vi: 'Hệ thống đầy đủ: theo dõi đơn, quản lý khách hàng, khuyến mãi và báo cáo.',
    },
    role: { en: 'Full-stack', vi: 'Full-stack' },
    stack: ['Laravel', 'ReactJS', 'MySQL'],
  },
  {
    id: 'school-backpack',
    name: 'Backpack shop management',
    group: 'school',
    problem: {
      en: 'A backpack shop tracked sales and stock by hand.',
      vi: 'Cửa hàng ba lô quản lý bán hàng và tồn kho thủ công.',
    },
    solution: {
      en: 'Automated sales, product, order tracking and stock reports.',
      vi: 'Tự động hoá bán hàng, sản phẩm, theo dõi đơn và báo cáo tồn kho.',
    },
    role: { en: 'Full-stack', vi: 'Full-stack' },
    stack: ['Laravel', 'PHP', 'MySQL'],
  },
  {
    id: 'school-watch',
    name: 'Watch store management',
    group: 'school',
    problem: {
      en: 'A watch store needed to run its online business in one system.',
      vi: 'Cửa hàng đồng hồ cần quản lý kinh doanh online trong một hệ thống.',
    },
    solution: {
      en: 'Products, orders, inventory sync, discounts and business reports.',
      vi: 'Sản phẩm, đơn hàng, đồng bộ tồn kho, mã giảm giá và báo cáo kinh doanh.',
    },
    role: { en: 'Lead developer', vi: 'Lead developer' },
    stack: ['ReactJS', 'JavaScript', 'MySQL'],
  },
]
