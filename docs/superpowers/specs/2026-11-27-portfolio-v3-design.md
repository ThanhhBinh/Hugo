# Thiết kế v3: Portfolio cho cả HR và khách freelance

Ngày: 27/11/2026 · Trạng thái: chờ Hugo duyệt · Bổ sung và thay một phần cho `2026-11-27-portfolio-design.md` (bản v2). Những gì không nhắc ở đây thì giữ nguyên như v2: ngôn ngữ, màu, sáng/tối, avatar, công nghệ, cấu trúc thư mục, quy tắc riêng tư.

**[Claude đề xuất]** đánh dấu chỗ Claude tự quyết hoặc tự viết. Hugo duyệt tài liệu này là duyệt luôn các chỗ đó.

## 1. Vì sao làm lại

Hugo xem bản v2 và thấy ba vấn đề:
- Trang còn đơn giản, chưa đúng bố cục của một portfolio.
- Thiếu phần **Mục tiêu**.
- **Dự án không nổi bật**: người xem không hiểu rõ Hugo đã làm gì.

Banner thì đẹp. Nhưng khi cuộn xuống, chữ H 3D chiếm nửa màn hình và ép nội dung vào một cột hẹp.

Trang phải phục vụ **cả hai nhóm** (Hugo xác nhận):
- **HR tuyển dụng:** cần lọc nhanh vị trí, số năm kinh nghiệm, từ khoá công nghệ, file CV, mốc thời gian liền mạch và email.
- **Khách freelance:** cần biết Hugo giải quyết được việc gì cho họ, làm việc thế nào, liên hệ ra sao.

## 2. Cách làm đã chọn

Đã cân nhắc ba cách:
1. **Một trang chung, có hai lối vào.** ← Hugo chọn.
2. Một trang với nút chuyển "Nhà tuyển dụng / Khách hàng". Người xem dễ không thấy nút, và phải làm, kiểm tra gấp đôi.
3. Hai trang riêng (`/` và `/hire`). Thành hai link, hai chỗ phải cập nhật. Để dành cho sau này, khi freelance nhiều.

## 3. Bố cục mới (từ trên xuống)

Nội dung trải rộng toàn màn hình: khung giữa tối đa ~1200px, nhiều phần chia lưới 2–4 cột trên máy tính, một cột trên điện thoại.

1. **Banner**: giữ nguyên avatar và quả cầu 3D. Thêm:
   - Dòng từ khoá: "Front-end Lead · ~2 năm kinh nghiệm · React · TypeScript · Flutter".
   - Hai nút: **Tải CV (PDF)** cho HR, và **Thuê mình làm dự án** cho khách (dẫn tới phần Liên hệ / email).
2. **Bậc thang sự nghiệp + số liệu nổi bật**, ngay dưới banner:
   - Dải bậc thang: Fresher (10/2024) → Junior (01/2025) → Middle (04/2025) → **Lead Front-end (03/2026)**.
   - 4 ô số liệu **[Claude đề xuất]**: "17 tháng · từ Fresher lên Lead" (mỗi bậc: 2 tháng Fresher, 3 tháng Junior, 11 tháng Middle), "4–6 người · đang dẫn dắt nhóm front-end", "5 nền tảng · Web, Android, iOS, Windows, macOS", "9.12 · ĐTB cao đẳng, top 4 Khoa".
3. **Dự án nổi bật**: phần quan trọng nhất.
   - TeleRadar, AdOps, SaleAudit mỗi cái một **thẻ lớn**, hình minh hoạ trừu tượng (không phải ảnh thật, có ghi chú) xen kẽ trái/phải.
   - Mỗi thẻ có: Vấn đề → **Mình đã làm** (3 gạch đầu dòng) → Kết quả → Công nghệ → Vai trò, thời gian.
   - Dự án thời đi học: 3 thẻ nhỏ, liệt kê việc mình làm lấy đúng từ CV.
4. **Mình giúp được gì** (cho khách) **[Claude đề xuất]**:
   - 4 thẻ dịch vụ: Web app (React/TypeScript) · App mobile & desktop (Flutter) · Script và công cụ tự động hoá · Email, tên miền và hỗ trợ IT.
   - 3 bước làm việc: Bạn kể vấn đề → Mình gửi kế hoạch và ước lượng → Mình làm, cập nhật, bàn giao kèm giải thích.
5. **Kinh nghiệm**: dòng thời gian, đủ tháng/năm (mục 4).
6. **Kỹ năng**: 4–5 ô theo nhóm (như v2).
7. **Mục tiêu**: 3 thẻ ngắn (mục 5).
8. **Học vấn**: như hiện tại (HCM-UTE đang học, CĐ Công Thương 2022–2024, giải thưởng, Aptis B2).
9. **Liên hệ**: email `thanhhbinh0501@gmail.com` (Hugo chọn), GitHub, TP.HCM, nút Tải CV. Nút lớn "Gửi email cho mình".

Menu theo thứ tự trên: Dự án · Dịch vụ · Kinh nghiệm · Kỹ năng · Mục tiêu · Học vấn · Liên hệ.

## 4. Kinh nghiệm (Hugo xác nhận)

- **03/2026 – nay** · Lead Front-end · Team outsourcing · dẫn dắt nhóm front-end 4–6 người, làm full-stack TeleRadar, AdOps, SaleAudit, kiêm hỗ trợ IT, email và tên miền.
- **04/2025 – 02/2026** · Middle Developer · InspiLab, sau đó Team outsourcing. Hugo đã là Middle khi chuyển sang team outsourcing (tháng chuyển chưa biết, không ghi).
- **01/2025 – 03/2025** · Junior Developer · InspiLab (Junior chỉ 3 tháng, Hugo xác nhận).
- **10/2024 – 12/2024** · Fresher · InspiLab. Lên Junior sau 2 tháng.
- Không ghi tên khách hàng. Không nhắc InspiLab đã đóng cửa.

## 5. Nội dung Claude viết nháp (Hugo duyệt cùng tài liệu)

**Mục tiêu**
- Ngắn hạn (1–2 năm): vững vai trò Lead Front-end. Xây kiến trúc front-end gọn, dễ mở rộng; review code và giúp team làm nhanh, ít lỗi.
- Học tập: hoàn thành liên thông đại học tại HCM-UTE, củng cố nền tảng song song với công việc.
- Dài hạn: trở thành người giải quyết bài toán trọn vẹn. Nhận một vấn đề kinh doanh và đưa ra giải pháp từ đầu đến cuối: web, mobile, desktop, hạ tầng.

**Mình đã làm**: viết chung, không bịa số liệu. Hugo có con số thì bổ sung sau trong `src/content/projects.ts`.
- **TeleRadar**
  - Làm: thiết kế và xây giao diện dashboard bằng React + TypeScript; làm phần thu thập, xử lý dữ liệu và API; triển khai và bảo trì.
  - Kết quả: thông tin về một chỗ, không phải theo dõi tay từng nhóm.
- **AdOps**
  - Làm: xây giao diện quản lý chiến dịch tập trung; làm API và lưu trữ dữ liệu chiến dịch; dẫn dắt front-end, review code.
  - Kết quả: một nơi duy nhất để vận hành chiến dịch.
- **SaleAudit**
  - Làm: xây giao diện đối soát và báo cáo; làm phần xử lý, so khớp dữ liệu bán hàng tự động; triển khai.
  - Kết quả: đối soát nhanh hơn, ít sai sót hơn làm tay.

## 6. Hình 3D (Hugo chọn phương án A)

- **Banner:** quả cầu mạng quanh avatar, như hiện tại.
- **Cuộn qua banner:** các điểm tách ra, **tản thành trường chấm sáng mờ phủ cả nền** (độ mờ thấp, ~0.25–0.35), trôi nhẹ theo cuộn và theo chuột. Không còn chữ H hay vòng tròn chiếm chỗ.
- Nội dung luôn nằm trên lớp 3D và luôn đọc được.
- "Giảm chuyển động" hoặc không có WebGL: như v2, trang vẫn đủ nội dung.

## 7. File CV PDF **[Claude đề xuất]**

- Hai file `Hugo-CV-EN.pdf` và `Hugo-CV-VI.pdf`, tạo tự động từ cùng nội dung trong `src/content/`, nên không phải sửa hai nơi.
- Tạo bằng Playwright, in một trang CV dạng in ấn (không 3D, không menu, 1–2 trang A4), lúc build.
- Nút "Tải CV" tải file đúng với ngôn ngữ đang xem.

## 8. Không làm trong bản này

- Trang `/hire` riêng, nút chuyển chế độ.
- LinkedIn (Hugo chưa đưa). Để sẵn chỗ trong `contact.ts`.
- Đưa dự án mã nguồn mở lên GitHub. Việc này nên làm, nhưng tách riêng khỏi trang.

## 9. Để người dựng tự quyết

Hình minh hoạ trừu tượng cho từng dự án, chi tiết lưới và khoảng cách, cách tản điểm 3D, câu chữ tiếng Anh tự nhiên (giữ đúng sự thật ở mục 4–5).
