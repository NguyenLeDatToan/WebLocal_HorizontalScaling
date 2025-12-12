# 🎨 Giao Diện Người Dùng

## 🔄 Chuyển Tiếp Giữa Các Tài Liệu
- [🏠 Trang chủ](README.MD)
- [📋 Cấu trúc hệ thống](STRUCTURE.MD)
- [🚀 Hướng dẫn vận hành](RUN.MD)
- [🎨 Giao diện người dùng](UI.MD)
- [📝 Nhật ký thay đổi](CHANGELOG.MD)

## 📚 Mục Lục
- [🎯 Mục Tiêu Giao Diện](#-mục-tiêu-giao-diện)
- [🧭 Flow Người Dùng](#-flow-người-dùng)
- [🎨 Thiết Kế Giao Diện](#-thiết-kế-giao-diện)
- [📱 Components Hiện Có](#-components-hiện-có)
- [🔧 Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)

## 🎯 Mục Tiêu Giao Diện
- Hiển thị trạng thái hệ thống thời gian thực
- Cung cấp công cụ quản lý nhanh
- Giao diện thân thiện, responsive trên mọi thiết bị
- Điều hướng dễ dàng giữa các trang

[🔙 Về mục lục](#-mục-lục)

## 🧭 Flow Người Dùng
1. **Navbar** → Hiển thị logo thương hiệu
2. **Trang chủ** → Xem trạng thái tổng quát
3. **Bảng điều khiển** → Quản lý chi tiết (tính năng đang phát triển)
4. **Trạng thái** → Xem chi tiết trạng thái (tính năng đang phát triển)
5. **Cài đặt** → Cấu hình hệ thống (tính năng đang phát triển)

[🔙 Về mục lục](#-mục-lục)

## 🎨 Thiết Kế Giao Diện
- **Màu sắc**: Hệ thống màu đất/thổ (earth/soil theme) theo biến CSS với hiệu ứng chuyển động nhẹ nhàng
- **Layout**: Responsive với navbar trên cùng, chiều cao gọn nhẹ
- **Components**: Reusable React components
- **Icons**: Emoji + biểu tượng trực quan

[🔙 Về mục lục](#-mục-lục)

## 📱 Components Hiện Có

### Cấu Trúc Component (Dạng Cây)
```
📁 Components/
├── 📄 Navbar.jsx
│   ├── 🎨 Giao diện: Thanh ngang trên cùng, chiều cao gọn nhẹ
│   ├── 🎯 Chức năng: Hiển thị logo thương hiệu và nút hành động chính
│   ├── 🎨 Thiết kế: Gradient đất/thổ chuyển động nhẹ nhàng (theo biến CSS)
│   ├── 📐 Kích thước: padding: 0.3rem 1.25rem, font-size: 1rem (tiêu đề)
│   ├── 🏷️ Logo: Sử dụng component Logo.jsx (thiết kế thương hiệu cá tính)
│   └── 🎯 Nút hành động: Nút tròn "Bắt đầu" ở bên phải với hiệu ứng hover
├── 📄 Logo.jsx
│   ├── 🖼️ Loại file: Hình ảnh PNG
│   ├── 📁 Đường dẫn: ../utils/img/logo.png
│   ├── 🎯 Mục tiêu: Hiển thị biểu tượng thương hiệu WebLocal
│   ├── 📐 Kích thước: 50px chiều cao, tự động điều chỉnh theo tỷ lệ
│   ├── 🌐 Màu sắc: Áp dụng filter CSS để đổi màu thành trắng
│   └── 🖌️ Hiệu ứng: Zoom nhẹ khi hover (1.05x)
├── 📄 Navbar.css
│   ├── 🎨 Định dạng: flex layout, gradient background chuyển động
│   ├── 📌 Nút hành động: navbar-start-btn với styling riêng
│   ├── 🌐 Tương tác: hover effects với hiệu ứng nâng nhẹ
│   └── 📱 Mobile: responsive với giao diện gọn gàng
└── 📄 Logo.css
    ├── 🎨 Định dạng: responsive sizing
    ├── 🎯 Hiển thị: ảnh logo với hiệu ứng hover
    └── 🌐 Tương tác: scale transformation
```

### Component Tree (Theo trang hiện tại)
```
📄 App.jsx
└── 📄 HomePage.jsx
    └── 📄 Navbar.jsx
        └── 📄 Logo.jsx
            └── 🎨 UI: Biểu tượng thương hiệu WebLocal với hiệu ứng động
```

[🔙 Về mục lục](#-mục-lục)

## 🔗 Mối Quan Hệ Component
```
📁 Pages/
└── HomePage.jsx
    └── sử dụng
        └── 📁 Components/
            └── Navbar.jsx
                └── hiển thị
                    └── Logo (/)
```

## 🔧 Công Nghệ Sử Dụng
- React 18+
- CSS Modules/Styled Components (tùy chọn)
- Responsive Design
- API integration qua proxy

[🔙 Về đầu trang](#-giao-diện-người-dùng)
