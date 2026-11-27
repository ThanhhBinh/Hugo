# Portfolio v4: giao diện kiểu code/IDE

Ngày: 27/11/2026 · Hugo đã duyệt bản phác `hugo-mockups/v4-ide.html` (hình + chuyển động).

## Vì sao
Bản v3 đủ nội dung nhưng trông như mẫu chung: nền tối + vàng, thẻ bo góc giống nhau. Nghiên cứu các portfolio tốt (Hostinger 25 ví dụ, Awwwards) cho thấy chúng có một ý tưởng hình ảnh xuyên suốt và để giao diện tự chứng minh kỹ năng. Ý tưởng của Hugo: cửa sổ code/terminal/git.

## Phạm vi
Chỉ đổi giao diện và chuyển động. Nội dung (`src/content/*`), ngôn ngữ, CV PDF, quả cầu 3D và nền chấm sáng giữ nguyên.

## Thiết kế
- Chữ: JetBrains Mono (tiêu đề, nhãn, mã) + IBM Plex Sans (đoạn văn), tự host qua `@fontsource` (có tiếng Việt), không gọi Google Fonts.
- Màu tối: nền #0d1117, panel #161b22, viền #2a313c; vàng #ffc21a của avatar làm màu nhấn; xanh/đỏ kiểu diff (#3fb950 / #ff7b72), xanh dương #79c0ff, tím #d2a8ff cho cú pháp. Sáng: giữ nền kem, cùng cấu trúc biến.
- Header: tab file (`career.log`, `projects.tsx`...) thay cho menu chữ; thứ tự menu và id section giữ nguyên.
- Banner: khung terminal tự gõ `whoami`, `cat role.txt`, `cat stack.txt` (nội dung lấy từ content/i18n), avatar + quả cầu giữ nguyên.
- Highlights: `git log --career` (commit hiện lần lượt) + 4 số liệu đếm lên.
- Dự án: khung cửa sổ, nửa là vấn đề/kết quả/công nghệ, nửa là "diff": dòng `+` xanh = việc đã làm, dòng `-` đỏ gạch = vấn đề đã xoá.
- Dịch vụ, kinh nghiệm, mục tiêu, học vấn, liên hệ: cửa sổ có thanh tiêu đề tên file.
- Chuyển động: gõ chữ, đếm số, hiện dần khi cuộn, nhấc thẻ khi rê chuột. `prefers-reduced-motion`: tất cả tắt, nội dung hiện ngay.
- Chuyển động liên kết (một câu chuyện, không phải hiệu ứng rời rạc):
  - Banner chạy theo chuỗi: terminal gõ xong từng lệnh → dòng kết quả hiện → khi gõ xong `stack.txt` thì quả cầu 3D "nhịp" một lần (sự kiện `hugo:beat`) → hai nút CV và Thuê mình hiện ra.
  - Một đường git dọc bên trái cả trang, vẽ dần theo thanh cuộn; mỗi section là một commit (chấm tròn) sáng lên khi tới; tab trên header sáng cùng lúc.
  - Mỗi lần một commit sáng, nền chấm 3D cũng nhịp nhẹ một lần (cùng sự kiện `hugo:beat`).
  - Trong một section, thứ tự cố định: tiêu đề → khung hiện → nội dung chạy (dòng `+` lần lượt, số đếm) → dòng `-` gạch cuối cùng.
- Giữ: AA contrast, focus ring, không cuộn ngang ở 360px, mọi chữ nằm trong i18n.

## Ngoài phạm vi
Ảnh chụp dự án thật, nội dung mới, LinkedIn.

## Ghi chú sau khi làm (điều chỉnh so với bản phác)
- Đường git là CSS thuần (đoạn vàng cho mỗi section đã tới, chấm sáng ở tiêu đề), không có component `GitRail` đo cuộn riêng: ít code hơn, cùng hiệu quả.
- Menu trên header chỉ đổi sang chữ mono và gạch chân vàng cho mục đang xem; nhãn vẫn là chữ dịch được (không đặt tên file thật để tránh hai bản ngôn ngữ).
- Khung `Window` có thanh tiêu đề dùng cho banner (terminal), sự nghiệp, dự án và dịch vụ. Kinh nghiệm, mục tiêu, học vấn, liên hệ giữ dạng thẻ/dòng thời gian, chỉ thêm nhãn tên file ở tiêu đề.
- Terminal trong banner ẩn khỏi trình đọc màn hình (aria-hidden) và có bản chữ đầy đủ cho họ.
