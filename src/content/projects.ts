import type { Project } from './types'

// Work projects: names and one-line descriptions only (no screenshots, metrics or client names).
export const projects: Project[] = [
  {
    id: 'teleradar',
    name: 'TeleRadar',
    group: 'work',
    did: { en: ['Designed and built the dashboard UI with React and TypeScript.', 'Built the data collection, processing and API behind it.', 'Deployed and maintain it.'], vi: ['Thiết kế và xây giao diện dashboard bằng React và TypeScript.', 'Làm phần thu thập, xử lý dữ liệu và API phía sau.', 'Triển khai và bảo trì.'] },
    result: { en: 'Everything in one place, no more following each group by hand.', vi: 'Thông tin về một chỗ, không còn theo dõi tay từng nhóm.' },
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
    did: { en: ['Built one central interface to manage campaigns.', 'Built the API and storage for campaign data.', 'Led the front-end and reviewed code.'], vi: ['Xây giao diện tập trung để quản lý chiến dịch.', 'Làm API và lưu trữ dữ liệu chiến dịch.', 'Dẫn dắt front-end và review code.'] },
    result: { en: 'One single place to run campaigns.', vi: 'Một nơi duy nhất để vận hành chiến dịch.' },
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
    did: { en: ['Built the checking and reporting interface.', 'Built the automatic matching of sales data.', 'Deployed it.'], vi: ['Xây giao diện đối soát và báo cáo.', 'Làm phần xử lý, so khớp dữ liệu bán hàng tự động.', 'Triển khai.'] },
    result: { en: 'Faster checking with fewer mistakes than by hand.', vi: 'Đối soát nhanh hơn, ít sai sót hơn làm tay.' },
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
