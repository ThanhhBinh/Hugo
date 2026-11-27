import type { Profile } from './types'

export const profile: Profile = {
  name: 'Hugo',
  fullName: 'Phan Thanh Bình',
  location: { en: 'Ho Chi Minh City, Vietnam', vi: 'TP. Hồ Chí Minh' },
  about: {
    en: [
      "I studied web programming and started my first job as a Fresher in October 2024. Two months later I became a Junior Developer, and today I lead the front-end of an outsourcing team.",
      "I don't think of myself as a specialist in one thing any more. When a problem needs a website, I build a website; when it needs a mobile or desktop app, I build that; when it is an email or domain issue, I fix it. The tool follows the problem.",
    ],
    vi: [
      'Mình học lập trình web và bắt đầu đi làm với vị trí Fresher từ tháng 10/2024. Hai tháng sau mình lên Junior Developer, và hiện tại mình dẫn dắt phần front-end của một team outsourcing.',
      'Mình không còn coi bản thân là người chỉ chuyên một mảng. Vấn đề cần website thì mình làm website, cần app mobile hay desktop thì mình làm app, là chuyện email hay tên miền thì mình xử lý luôn. Công cụ đi theo vấn đề.',
    ],
  },
}
