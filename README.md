# Hugo — Portfolio / CV online

Trang giới thiệu bản thân của **Hugo (Phan Thanh Bình)** — Front-end Lead, full-stack, "người giải quyết vấn đề".
Song ngữ Anh/Việt, nền sáng/tối, cảnh 3D: quả cầu ở banner, rồi tản thành nền chấm sáng mờ khi cuộn xuống.
Phục vụ cả nhà tuyển dụng (nút **Tải CV PDF**) và khách freelance (nút **Thuê mình làm dự án**).

🔗 https://thanhhbinh.github.io/Hugo/

**Công nghệ:** Vite · React · TypeScript · Three.js / React Three Fiber · Vitest · GitHub Actions + Pages.

## Chạy trên máy

```bash
npm install
npm run dev        # mở http://localhost:5173/Hugo/
npm test           # chạy test
npm run lint       # kiểm tra code
npm run typecheck  # kiểm tra kiểu TypeScript
npm run build      # build ra thư mục dist/
npm run build:cv   # tạo dist/Hugo-CV-EN.pdf và dist/Hugo-CV-VI.pdf (chạy sau build; cần Chromium của Playwright)
```

## Sửa nội dung CV

Mọi nội dung nằm trong `src/content/` — **không cần đụng vào giao diện**. Mỗi chữ có hai bản `en` và `vi`.

| File | Nội dung |
|------|----------|
| `profile.ts` | Tên, đoạn giới thiệu |
| `career.ts` | Bậc thang sự nghiệp và 4 ô số liệu |
| `experience.ts` | Kinh nghiệm (mới nhất ở trên) |
| `projects.ts` | Dự án: vấn đề → mình đã làm → kết quả. Có số liệu thật thì thêm vào `result` |
| `services.ts` | Dịch vụ cho khách freelance và 3 bước làm việc |
| `goals.ts` | Mục tiêu |
| `toolbox.ts` | Công cụ mình dùng |
| `education.ts` | Học vấn, giải thưởng, hoạt động |
| `contact.ts` | Email, GitHub, nơi ở. Có LinkedIn thì bỏ comment dòng `linkedin`. |

File CV PDF (tiếng Anh và tiếng Việt) được tạo tự động từ chính các file này nên không phải sửa hai nơi; nút **Tải CV** tải đúng bản theo ngôn ngữ đang xem.

Chữ giao diện (menu, tiêu đề, nút) nằm trong `src/i18n/en.ts` và `src/i18n/vi.ts`. Thiếu khóa nào thì TypeScript báo lỗi.

Link chia sẻ thẳng bản tiếng Việt: `https://thanhhbinh.github.io/Hugo/?lang=vi`

## Cấu trúc thư mục

```
src/
├─ components/layout/    Header, Footer, ScrollProgress
├─ components/sections/  Hero, Highlights, Projects, Services, Experience, Toolbox, Goals, Education, Contact
├─ components/ui/        Nút chuyển ngôn ngữ, sáng/tối, Reveal, Chip...
├─ scene/                Cảnh 3D (shapes.ts: quả cầu → chấm sáng)
├─ content/              Nội dung CV
├─ cv/                   Trang CV dạng in (cv.html) để tạo PDF
├─ i18n/                 Đa ngôn ngữ
├─ hooks/                useTheme, useReducedMotion, useActiveSection...
└─ styles/               Màu sáng/tối, CSS
tests/                   Test (Vitest)
scripts/screenshots.mjs  Chụp màn hình kiểm tra giao diện
scripts/build-cv.mjs     In trang CV ra PDF
docs/superpowers/        Tài liệu thiết kế và kế hoạch
```

## Đưa lên mạng (GitHub Pages)

1. Push lên nhánh `main`.
2. Lần đầu: vào **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Mỗi lần push, GitHub Actions tự chạy lint, test, build tạo file CV PDF rồi cập nhật trang.

Dùng tên miền riêng: đổi `base: '/Hugo/'` thành `base: '/'` trong `vite.config.ts` và thêm file `public/CNAME`.

## Truy cập & hiệu năng

- Bật "giảm chuyển động" trong máy → tắt 3D và hiệu ứng, nội dung vẫn đầy đủ.
- Máy không hỗ trợ WebGL → trang vẫn hiện bình thường, chỉ không có 3D.
- Phần 3D được tải sau, nên chữ hiện ngay.

---

*English:* personal CV site of Hugo (Phan Thanh Bình). Edit content in `src/content/`, run `npm run dev`, deploy by pushing to `main` (GitHub Actions → Pages).
