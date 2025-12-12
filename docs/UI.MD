# 🎨 Tài liệu Giao diện WebLocal

## 🎯 Thiết kế tổng thể

Giao diện WebLocal được thiết kế theo phong cách hiện đại, tối giản với hệ thống màu sắc đồng bộ hóa. Giao diện sử dụng hệ thống CSS variables để duy trì sự nhất quán về màu sắc trên toàn ứng dụng.

## 🌈 Theme màu sắc (Thổ Thần)

### Màu chính (Primary Colors - Nâu Đất)
- `--primary-500`: #a5966d (Nâu trung bình từ đất)
- `--primary-600`: #8d7b54 (Nâu đậm)

### Màu phụ (Secondary Colors - Terracotta)
- `--secondary-500`: #d87a68 (Terracotta - đỏ nâu đặc trưng)
- `--secondary-600`: #c05e48 (Terracotta đậm)

### Màu bổ sung (Complementary Colors - Rừng & Đất sét)
- `--complement-500`: #59ab62 (Xanh lá đất)
- `--complement-600`: #438a4a (Xanh rừng)

### Màu nền (Background)
- `--bg-primary`: #fcfaf7 (Nền đất nhẹ)
- `--bg-card`: #ffffff (Nền card - trắng sạch)

### Màu văn bản
- `--text-primary`: #4d3d2e (Nâu đậm gần giống đen)
- `--text-white`: #ffffff (Văn bản trắng)

## 🖼️ Giao diện Login

Trang đăng nhập (Login Page) được thiết kế với form trung tâm, có:
- Logo lớn ở giữa container thay thế cho tiêu đề "Chào mừng bạn đến với WebLocal"
- Form đăng nhập với username/email và password
- Các tùy chọn quên mật khẩu và tạo tài khoản mới
- Hiệu ứng focus cho input fields
- Hover effects cho button
- Hiệu ứng pulse 2s lặp vô hạn cho logo (chỉ xuất hiện trong ranh giới hình ảnh) để tăng sự thu hút

## 🏷️ Logo Component

Component Logo được thiết kế linh hoạt với các biến thể:
- `default`: Logo cơ bản (không hiệu ứng đặc biệt)
- `navbar`: Logo với filter trắng để hiển thị trên nền gradient (dùng trong Navbar)
- `login`: Logo với hiệu ứng gradient chuyển động tương tự Navbar

### Hiệu ứng
- Animation gradientShift 8s lặp vô hạn cho biến thể login
- Hiệu ứng hover phát sáng (glow effect) cho biến thể login
- Hiệu ứng hover scale(1.05) cho biến thể navbar và default
- Sử dụng hệ thống màu CSS variables để đồng bộ giao diện

## 📱 Responsive

Tất cả giao diện đều hỗ trợ responsive trên nhiều kích thước màn hình khác nhau, từ mobile đến desktop.

## ⚙️ Cấu trúc

Tất cả biến màu được định nghĩa trong `frontend/src/styles/variables.css` và được import vào `App.jsx` để áp dụng toàn cục.

## 📐 Hệ thống kích thước

Dự án sử dụng hệ thống kích thước chuẩn dựa trên tỉ lệ 8px (space unit) để đảm bảo tính đồng bộ trong giao diện:

- Khoảng cách: `--space-0`, `--space-025`, `--space-05`, `--space-1`... `--space-10`
- Kích thước font: `--font-size-xs`, `--font-size-sm`, `--font-size-base`, `--font-size-md`...
- Kích thước thành phần: `--input-height`, `--btn-height`, `--logo-size-sm`, `--logo-size-md`, `--logo-size-lg`
- Border-radius: `--border-radius-sm`, `--border-radius-md`, `--border-radius-lg`

Hệ thống này giúp đồng bộ giao diện và dễ dàng điều chỉnh kích thước các thành phần.

## 🎨 Hệ thống màu sắc chuẩn

Tất cả các thành phần UI đều sử dụng hệ thống màu sắc được định nghĩa trong `variables.css`:

- Màu chính: `--primary-500`, `--primary-600`, v.v. (nâu đất)
- Màu phụ: `--secondary-500`, `--secondary-600`, v.v. (terracotta)
- Màu nền: `--bg-primary`, `--bg-secondary`, `--bg-card`
- Màu văn bản: `--text-primary`, `--text-secondary`, `--text-white`
- Màu trạng thái: `--success`, `--warning`, `--error`, `--info`

## 🏗️ Hệ thống thành phần chuẩn

Dự án sử dụng hệ thống CSS toàn cục trong `App.css` cho các thành phần UI chuẩn:

- Input: với kích thước và màu sắc đồng nhất sử dụng biến CSS
- Button: với các biến thể sử dụng biến CSS
- Card: với hiệu ứng bóng đồng nhất sử dụng biến CSS
- Utility classes: `.container`, `.d-flex`, `.flex-column`, `.justify-center`, `.align-center`, `.text-center`, `.mt-*`, `.mb-*`, `.pt-*`, `.pb-*`, v.v. cho bố cục nhanh

## 📐 Hệ thống đồng bộ

Tất cả các thành phần UI trong dự án đều sử dụng hệ thống màu sắc và kích thước chuẩn:

- Biến màu: `var(--primary-500)`, `var(--secondary-500)`, `var(--bg-primary)`, v.v.
- Biến kích thước: `var(--space-1)`, `var(--space-2)`, `var(--font-size-sm)`, `var(--font-size-base)`, v.v.
- Biến hiệu ứng: `var(--border-radius-sm)`, `var(--border-radius-md)`, v.v.

## 🎨 Hiệu ứng chuyển động

Hiệu ứng chuyển động được đồng bộ trên toàn ứng dụng sử dụng:

- animation: gradientShift 8s ease infinite cho hiệu ứng gradient
- animation: pulse 2s infinite cho hiệu ứng phát sáng
- transition: all 0.3s ease cho hiệu ứng hover
- transform: scale(1.05) cho hiệu ứng hover