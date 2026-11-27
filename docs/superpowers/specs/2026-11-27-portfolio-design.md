# Thiết kế: Portfolio / CV online của Hugo

Ngày: 27/11/2026 · Trạng thái: chờ Hugo duyệt (Hugo duyệt tài liệu này là duyệt luôn các mục [Claude đề xuất], kể cả câu chữ ở phần 3)

Ghi chú: dòng có **[Claude đề xuất]** là quyết định Claude tự đưa ra, Hugo chưa nói. Các dòng còn lại là Hugo đã chốt.

## 1. Mục đích và lý do

- Một trang **giới thiệu bản thân, giống một CV online**, cho Hugo (Phan Thanh Bình). Bản đầu tiên chỉ giới thiệu bản thân. Phần chào dịch vụ hay nhận việc freelance để sau.
- Thông điệp chính: **"Mình là người giải quyết vấn đề"**. Hugo không còn coi mình chuyên về một mảng nào: cần web thì làm web, cần app thì làm app, cần lo email/tên miền thì lo luôn.
- Repo là `github.com/ThanhhBinh/Hugo`. Bản thân repo cũng là bằng chứng kỹ năng React + TypeScript của một Lead FE, nên code phải sạch và dễ đọc.

## 2. Mục tiêu, không làm, và những gì coi là thất bại

**Mục tiêu**
- Người xem hiểu Hugo là ai, đang làm gì và đã lên từ Fresher tới Lead FE thế nào, chỉ sau một lần cuộn.
- Trang "sống động": có 3D, cuộn tới đâu nội dung chuyển cảnh liền mạch tới đó.
- Có hai ngôn ngữ: **tiếng Anh (mặc định) và tiếng Việt**.
- **Sáng/tối tự đổi** theo cài đặt máy, có thêm nút để người xem tự chuyển.

**Không làm trong bản này**
- Trang dịch vụ, bảng giá, form liên hệ có backend, blog, CMS.
- Ngôn ngữ thứ ba.

**Coi là thất bại, kể cả khi trang vẫn chạy**
- Lộ thông tin nội bộ của dự án công ty hoặc khách hàng: ảnh chụp màn hình, mã nguồn, số liệu, tên khách.
- Lộ thông tin riêng tư: số điện thoại, địa chỉ nhà, Facebook.
- Ghi sai sự thật hoặc bịa thêm thành tích không có trong CV hay lời Hugo.
- Trang chậm, giật hoặc khó đọc trên điện thoại. 3D không được che mất chữ.

## 3. Nội dung (nguồn: CV TopCV 2024 + lời Hugo)

**Đầu trang (hero)**
- Tên: "Hugo (Phan Thanh Bình)".
- Câu chính **[Claude đề xuất]**: VI "Mình là Hugo. Mình giải quyết vấn đề — bằng web, app, script hay bất cứ thứ gì công việc cần." / EN "I'm Hugo. I solve problems, with web, apps, scripts or whatever the job needs."
- Dòng phụ: "Front-end Lead · Full-stack · Web · Mobile · Desktop · IT".
- Avatar tròn (logo) nằm giữa quả cầu 3D. Có nút Liên hệ.

**Giới thiệu** **[Claude viết, dựa trên CV + lời Hugo]**: vài câu kể Hugo đi từ Fresher lên Lead FE trong khoảng một năm, làm web, mobile và desktop, kiêm hỗ trợ IT, email và tên miền. Bỏ hẳn giọng "mong được thực tập" của CV cũ.

**Kinh nghiệm (dòng thời gian, mới nhất ở trên)**
- 2025 – nay · Lead Front-end · Team outsourcing. **[Claude đề xuất]** Trên trang chỉ ghi "Outsourcing team", không nhắc lead cũ của InspiLab, để không gợi chuyện công ty cũ đóng cửa. Dẫn phần front-end, làm full-stack các dự án TeleRadar, AdOps, SaleAudit, kiêm hỗ trợ IT, email và tên miền.
- 01/2025 – 2025 · Junior Developer · InspiLab (công ty công nghệ du lịch, sản phẩm Inspitrip).
- 10/2024 – 12/2024 · Fresher · InspiLab. Lên Junior sau 2 tháng: trên trang phải thấy rõ đây là hai bước liên tiếp.
- Không nhắc chuyện InspiLab đã đóng cửa.

**Dự án**: Hugo cho phép ghi tên TeleRadar, AdOps, SaleAudit và mô tả sơ lược ("chia sẻ sơ sơ, không cần chi tiết"). Viết theo dạng "Vấn đề → Cách giải". Mỗi dự án gồm tên, một câu mô tả, vai trò và công nghệ. Không có ảnh, số liệu hay tên khách hàng. **[Claude viết mô tả]**
- TeleRadar: theo dõi thủ công trên Telegram vừa chậm vừa dễ sót, nên làm công cụ tự gom và thống kê thông tin về một chỗ.
- AdOps: quảng cáo được quản lý rải rác ở nhiều nơi, nên làm hệ thống vận hành chiến dịch tập trung.
- SaleAudit: đối soát số liệu bán hàng bằng tay mất thời gian và dễ sai, nên làm công cụ kiểm tra tự động.
- Dự án thời đi học (gom lại, hiện nhỏ hơn): 3 hệ thống quản lý bán hàng (Shopee: Laravel + React; ba lô: Laravel; đồng hồ: React, vai trò lead).
- Công nghệ của TeleRadar, AdOps, SaleAudit: Hugo chưa nói chi tiết. **[Claude đề xuất]** ghi chung là "React · TypeScript · Full-stack".

**Công cụ mình dùng** (thay cho mục "Kỹ năng")
- Ngôn ngữ: TypeScript, JavaScript, Dart, PHP
- Framework: React, Flutter, Laravel
- Nền tảng: Web, Android, iOS, Windows, macOS
- Dữ liệu và công cụ: MySQL, Git, VSCode
- IT: hỗ trợ IT, email và tên miền

**Học vấn và thành tích**
- Cao đẳng Công Thương TP.HCM, chuyên ngành Lập trình web, 2022–2025. Điểm trung bình 9.12 (2022–2024), top 4 Khoa.
- Học bổng sinh viên xuất sắc (2023). Danh hiệu "Sinh viên Tình nguyện Xuất sắc" (2023).
- Chứng chỉ Aptis ESOL B2 (2024). CV gốc ghi nhầm là "Aptist esol".
- Hoạt động: CLB Lập trình viên (2022–nay); tổ chức workshop "Lập trình cơ bản với JavaScript" (3/2024).

**Liên hệ** **[Claude đề xuất]**: email, GitHub (ThanhhBinh), "TP.HCM". Email là trường tùy chọn trong `src/content/`: khi chưa có thì phần Liên hệ và nút Liên hệ trỏ tới GitHub, không bao giờ hiện chỗ trống trên trang đã đưa lên mạng. Không hiện số điện thoại, địa chỉ nhà, Facebook.

**Bỏ khỏi bản này** **[Claude đề xuất]**: mục Sở thích trong CV cũ. Công cụ Email & Domain Checker (chưa hoàn thành, thêm sau).

## 4. Bố cục và trải nghiệm (Hugo chọn hướng A "Hành trình")

- **Máy tính (≥ 960px):** chữ cuộn ở cột trái. Một cảnh 3D cố định ở nửa phải màn hình, đứng yên trong lúc chữ cuộn qua.
- **Cảnh 3D đổi hình theo phần đang xem** **[Claude đề xuất]**: cùng một tập điểm sáng màu vàng nối với nhau bằng đường mảnh, có "gói dữ liệu" chạy trên các đường.
  - Hero: quả cầu mạng quay quanh avatar.
  - Kinh nghiệm, Dự án, Công cụ: chuyển thành chữ **H**.
  - Liên hệ: chuyển thành **vòng tròn**, gợi viền vàng của avatar.
  - Chuyển hình mượt theo vị trí cuộn, không giật cục. Ý nghĩa: cùng một thứ, gặp tình huống nào thì thành hình đó, khớp với thông điệp "giải quyết vấn đề".
- **Điện thoại:** một cột. Cảnh 3D chìm ra sau chữ, mờ đi, và chữ luôn đọc được.
- Dòng thời gian có vạch sáng dần lên theo vị trí cuộn. Nội dung hiện dần khi cuộn tới. Thanh tiến độ cuộn ở trên cùng. Menu tô sáng mục đang xem.
- Người dùng bật "giảm chuyển động" trong máy: tắt 3D và các hiệu ứng, trang vẫn đủ nội dung. Máy không có WebGL: trang vẫn hiện bình thường, chỉ không có 3D.
- Đầu trang: avatar nhỏ, chữ "Hugo", menu, nút chuyển EN/VI (ghi "English" / "Tiếng Việt", không dùng cờ), nút sáng/tối.

## 5. Hình ảnh

- Logo là đúng ảnh avatar Hugo gửi: cắt tròn, đã có sẵn bản 720px, 320px (webp) và 512px (png). Favicon và apple-touch-icon lấy phần mặt. Các file nằm ở `outputs/hugo-portfolio/assets`, cần chép vào repo.
- Màu chủ đạo theo avatar: vàng `#FFC21A` trên đen. Nền tối: gần đen. Nền sáng **[Claude đề xuất]**: kem ấm, chữ đen, chữ nhấn dùng vàng đậm `#9A6A00` để đủ độ tương phản.
- Chữ: dùng font hệ thống **[Claude đề xuất]**, nhẹ và không phụ thuộc mạng.

## 6. Cách làm (đã chọn)

**Các cách đã cân nhắc**
1. HTML/CSS/JS thuần + Three.js: nhẹ, nhưng repo không cho thấy kỹ năng React TS.
2. **Vite + React + TypeScript + React Three Fiber**: đúng bộ công nghệ Hugo dùng hằng ngày, repo thành bằng chứng kỹ năng, Hugo tự sửa dễ. Đổi lại phải có bước build. **Hugo chọn cách này.**
3. Next.js: mỗi ngôn ngữ một đường dẫn, tốt cho SEO, nhưng thừa với trang CV một trang.

**Chi tiết kỹ thuật** **[Claude đề xuất]**
- Đa ngôn ngữ: tự viết, nội dung EN/VI để trong file TypeScript có kiểu dữ liệu, thiếu khóa là báo lỗi khi build. Ngôn ngữ ban đầu chọn theo thứ tự: `?lang=` trên URL, lựa chọn đã lưu (localStorage, bọc try/catch), ngôn ngữ trình duyệt (`vi` → tiếng Việt), còn lại là tiếng Anh. Đổi ngôn ngữ thì cập nhật `<html lang>`, tiêu đề tab và meta description.
- Đưa lên mạng: GitHub Pages tại `https://thanhhbinh.github.io/Hugo/` (Vite `base: '/Hugo/'`, đổi một chỗ nếu sau này dùng tên miền riêng), build tự động bằng GitHub Actions mỗi lần push lên `main`.
- Mốc thời gian chỉ ghi tới năm khi Hugo không nói tháng, không tự bịa tháng.
- Chất lượng: ESLint + kiểm tra kiểu TypeScript, vài test cho phần đa ngôn ngữ. Đạt WCAG AA về tương phản, dùng được bằng bàn phím.
- Phần 3D tải sau nội dung chính (lazy), để chữ hiện ngay.

## 7. Cấu trúc thư mục

Hugo yêu cầu thư mục phải chia hợp lý. Đây là cấu trúc Claude đề xuất: chia theo vai trò, mỗi phần của trang có thư mục riêng, nội dung tách khỏi giao diện.

```
Hugo/
├─ .github/workflows/deploy.yml   # build + đưa lên GitHub Pages
├─ docs/superpowers/specs/        # tài liệu thiết kế (file này)
├─ public/                        # favicon, apple-touch-icon (copy nguyên)
├─ src/
│  ├─ assets/images/              # avatar các cỡ
│  ├─ components/
│  │  ├─ layout/                  # Header, Footer, ScrollProgress
│  │  ├─ sections/                # Hero, About, Experience, Projects, Toolbox, Education, Contact
│  │  └─ ui/                      # nút, chip, thẻ, LanguageSwitch, ThemeToggle
│  ├─ scene/                      # toàn bộ 3D: Scene, NetworkShape, shapes.ts (cầu/H/vòng)
│  ├─ content/                    # NỘI DUNG CV: profile.ts, experience.ts, projects.ts...
│  ├─ i18n/                       # en.ts, vi.ts (chữ giao diện), useLanguage
│  ├─ hooks/                      # useScrollSection, useReducedMotion, useTheme
│  ├─ styles/                     # biến màu sáng/tối, CSS chung
│  ├─ App.tsx
│  └─ main.tsx
├─ tests/                         # test đa ngôn ngữ, nội dung
├─ index.html
├─ package.json · tsconfig.json · vite.config.ts · eslint.config.js
└─ README.md                      # cách chạy, sửa nội dung, đưa lên mạng
```

Nguyên tắc: muốn sửa CV thì chỉ sửa trong `src/content/` (mỗi mục có cả `en` và `vi`), không phải đụng vào component.

## 8. Để người dựng tự quyết

- Tên component chi tiết, cách chia file nhỏ bên trong từng thư mục ở trên.
- Thông số 3D: số điểm, tốc độ, độ mờ trên điện thoại. Ưu tiên mượt hơn nhiều điểm.
- Câu chữ chi tiết từng mục (giữ đúng sự thật ở phần 3), bản tiếng Anh tự nhiên.
- Chọn thư viện nhỏ hỗ trợ (ví dụ `@react-three/drei`) nếu thật sự cần.
