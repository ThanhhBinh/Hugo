# Portfolio v4 (IDE UI) Implementation Plan

Spec: `docs/superpowers/specs/2026-11-27-portfolio-v4-ide-design.md`. Quy tắc Ponytail: ít code nhất đủ giải quyết, không thêm thư viện chuyển động, không đổi nội dung.

### Task 1: Fonts + tokens
Cài `@fontsource-variable/jetbrains-mono`, `@fontsource/ibm-plex-sans` (400/600/700, latin + vietnamese). Import trong `src/main.tsx`. Cập nhật biến màu trong `theme.css` (tối + sáng), biến `--font-mono`, `--font-sans`. Test: build qua; contrast ≥ 4.5 cho text/muted/accent-text trên nền (test nhỏ tính tỉ lệ).

### Task 2: Motion hooks (TDD)
`useInView(ref)` (một lần, không IO thì true), `useCountUp(target, active)` (số thập phân giữ nguyên, reduced motion → ngay giá trị cuối), `Terminal` component nhận `lines: Array<{cmd, out}>`, gõ từng ký tự, reduced motion → hiện đủ ngay. Test: Terminal hiện đủ lời ở chế độ giảm chuyển động; useCountUp trả về đích khi giảm chuyển động; giá trị "4–6" hiển thị nguyên.

Thêm vào Task 2: `beat()` (phát `CustomEvent('hugo:beat')`), Terminal gọi `onDone`. Task 3: Hero hiện nút sau `onDone` và gọi `beat()`; `GitRail` (đường dọc, `--fill` theo cuộn, chấm sáng khi section tới và gọi `beat()`); `NetworkShape` nghe `hugo:beat` để tăng kích thước/độ sáng điểm trong ~0.6s.

### Task 3: Restyle sections
Hero (Terminal, nội dung từ `profile`, `t.hero.*`), Highlights (git log từ `career.ladder`, ô số đếm), Projects (diff), khung `Window` dùng chung (thanh tiêu đề + tên file) cho Services/Experience/Goals/Education/Contact, Header dạng tab. Giữ test hiện có xanh (cập nhật chỗ đổi cấu trúc).

### Task 4: Verify
Test, lint, typecheck, screenshots 5 case, reviewer độc lập, build lại preview + PDF, đẩy lại artifact, tạo bundle mới.
