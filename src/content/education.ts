import type { Education } from './types'

export const education: Education = {
  school: {
    en: 'Ho Chi Minh City College of Industry and Trade',
    vi: 'Cao đẳng Công Thương TP. Hồ Chí Minh',
  },
  major: { en: 'Information Technology · Web programming', vi: 'Công nghệ thông tin · Lập trình web' },
  period: '2022 – 2025',
  gpa: '9.12',
  gpaNote: { en: '2022–2024 · top 4 of the faculty', vi: '2022–2024 · top 4 của Khoa' },
  awards: [
    { year: '2023', label: { en: 'Excellent Student Scholarship', vi: 'Học bổng sinh viên xuất sắc' } },
    { year: '2023', label: { en: '“Outstanding Volunteer Student” award', vi: 'Danh hiệu “Sinh viên Tình nguyện Xuất sắc”' } },
  ],
  certs: [{ year: '2024', label: 'Aptis ESOL B2' }],
  activities: [
    {
      period: '2022 –',
      label: {
        en: 'Developer Club volunteer: organising software development talks and events',
        vi: 'Tình nguyện viên CLB Lập trình viên: tổ chức hội thảo, hoạt động về phát triển phần mềm',
      },
    },
    {
      period: '03/2024',
      label: {
        en: 'Co-organised the workshop “JavaScript basics” for first-year students',
        vi: 'Đồng tổ chức workshop “Lập trình cơ bản với JavaScript” cho sinh viên năm nhất',
      },
    },
  ],
}
