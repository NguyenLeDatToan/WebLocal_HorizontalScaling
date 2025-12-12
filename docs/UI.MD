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
1. **Navbar** → Điều hướng giữa các trang
2. **Trang chủ** → Xem trạng thái tổng quát
3. **Bảng điều khiển** → Quản lý chi tiết (tính năng đang phát triển)
4. **Trạng thái** → Xem chi tiết trạng thái (tính năng đang phát triển)
5. **Cài đặt** → Cấu hình hệ thống (tính năng đang phát triển)

[🔙 Về mục lục](#-mục-lục)

## 🎨 Thiết Kế Giao Diện
- **Màu sắc**: Gradient xanh - tím theo thiết kế hiện đại
- **Layout**: Responsive với navbar trên cùng
- **Components**: Reusable React components
- **Icons**: Emoji + biểu tượng trực quan

[🔙 Về mục lục](#-mục-lục)

## 📱 Components Hiện Có

### Cấu Trúc Component (Dạng Cây)
```
📁 Components/
├── 📄 Navbar.jsx
│   ├── 🎨 Giao diện: Thanh ngang trên cùng
│   ├── 🎯 Chức năng: Điều hướng giữa các trang
│   ├── 🔗 Liên kết: Trang Chủ, Bảng Điều Khiển, Trạng Thái, Cài Đặt
│   └── 🎨 Thiết kế: Gradient màu xanh - tím
└── 📄 Navbar.css
    ├── 🎨 Định dạng: flex layout, gradient background
    ├── 🎯 Hiển thị: responsive với mobile/desktop
    └── 🌐 Tương tác: hover effects
```

### Component Tree (Theo trang hiện tại)
```
📄 App.jsx
└── 📄 HomePage.jsx
    └── 📄 Navbar.jsx
        └── 🎨 UI: Thanh điều hướng chính
```

[🔙 Về mục lục](#-mục-lục)

## 🔗 Mối Quan Hệ Component
```
📁 Pages/
└── HomePage.jsx
    └── sử dụng
        └── 📁 Components/
            └── Navbar.jsx
                └── liên kết đến
                    ├── Trang Chủ (/)
                    ├── Bảng Điều Khiển (/dashboard)
                    ├── Trạng Thái (/status)
                    └── Cài Đặt (/settings)
```

## 🔧 Công Nghệ Sử Dụng
- React 18+
- CSS Modules/Styled Components (tùy chọn)
- Responsive Design
- API integration qua proxy

[🔙 Về đầu trang](#-giao-diện-người-dùng)