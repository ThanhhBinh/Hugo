# Hugo — Portfolio / CV online

Trang giới thiệu bản thân của **Hugo (Phan Thanh Bình)** — Front-end Lead, full-stack, "người giải quyết vấn đề".
Song ngữ Anh/Việt, nền sáng/tối, cảnh 3D đổi hình theo vị trí cuộn (quả cầu → chữ H → vòng tròn).

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
```

## Sửa nội dung CV

Mọi nội dung nằm trong `src/content/` — **không cần đụng vào giao diện**. Mỗi chữ có hai bản `en` và `vi`.

| File | Nội dung |
|------|----------|
| `profile.ts` | Tên, đoạn giới thiệu |
| `experience.ts` | Kinh nghiệm (mới nhất ở trên) |
| `projects.ts` | Dự án: vấn đề → cách giải |
| `toolbox.ts` | Công cụ mình dùng |
| `education.ts` | Học vấn, giải thưởng, hoạt động |
| `contact.ts` | Liên hệ — **thêm email ở đây** (`email: 'ban@example.com'`). Chưa có email thì nút Liên hệ trỏ tới GitHub. |

Chữ giao diện (menu, tiêu đề, nút) nằm trong `src/i18n/en.ts` và `src/i18n/vi.ts`. Thiếu khóa nào thì TypeScript báo lỗi.

Link chia sẻ thẳng bản tiếng Việt: `https://thanhhbinh.github.io/Hugo/?lang=vi`

## Cấu trúc thư mục

```
src/
├─ components/layout/    Header, Footer, ScrollProgress
├─ components/sections/  Hero, About, Experience, Projects, Toolbox, Education, Contact
├─ components/ui/        Nút chuyển ngôn ngữ, sáng/tối, Reveal, Chip...
├─ scene/                Cảnh 3D (shapes.ts: cầu / H / vòng)
├─ content/              Nội dung CV
├─ i18n/                 Đa ngôn ngữ
├─ hooks/                useTheme, useReducedMotion, useActiveSection...
└─ styles/               Màu sáng/tối, CSS
tests/                   Test (Vitest)
scripts/screenshots.mjs  Chụp màn hình kiểm tra giao diện
docs/superpowers/        Tài liệu thiết kế và kế hoạch
```

## Đưa lên mạng (GitHub Pages)

1. Push lên nhánh `main`.
2. Lần đầu: vào **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Mỗi lần push, GitHub Actions tự chạy lint, test, build rồi cập nhật trang.

Dùng tên miền riêng: đổi `base: '/Hugo/'` thành `base: '/'` trong `vite.config.ts` và thêm file `public/CNAME`.

## Truy cập & hiệu năng

- Bật "giảm chuyển động" trong máy → tắt 3D và hiệu ứng, nội dung vẫn đầy đủ.
- Máy không hỗ trợ WebGL → trang vẫn hiện bình thường, chỉ không có 3D.
- Phần 3D được tải sau, nên chữ hiện ngay.

---

*English:* personal CV site of Hugo (Phan Thanh Bình). Edit content in `src/content/`, run `npm run dev`, deploy by pushing to `main` (GitHub Actions → Pages).
