# 🏗️ Cấu Trúc Hệ Thống

## 🔄 Chuyển Tiếp Giữa Các Tài Liệu
- [🏠 Trang chủ](README.MD)
- [📋 Cấu trúc hệ thống](STRUCTURE.MD)
- [🚀 Hướng dẫn vận hành](RUN.MD)
- [🎨 Giao diện người dùng](UI.MD)
- [📝 Nhật ký thay đổi](CHANGELOG.MD)

## 🗂️ Tổng Quan Cấu Trúc

### 📁 Thư Mục Chính
```
┌── 📁 backend/
│   ├── 📁 load-balancer/      # Cân bằng tải
│   ├── 📁 web-servers/        # Máy chủ web
│   ├── 📁 db-services/        # Cơ sở dữ liệu
│   └── 📁 db-gateway/         # Cổng trung gian DB
├── 📁 frontend/                # Giao diện người dùng
├── 📁 docs/                    # Tài liệu
├── 📁 backup/                  # Sao lưu
└── 📄 scripts/                 # Script hệ thống
```

### 🌐 Kiến Trúc 5 Lớp
```
Người Dùng 👤 → Frontend 🎨 → Load Balancer 🔄 → Web Servers 🌐 → DB Gateway 🔀 → DB Services 💾
```

## 🔄 Backend Services
### Load Balancer (20000)
- Health check, đăng ký máy chủ, cân bằng tải

### Web Servers (21000+)
- Xử lý yêu cầu, kết nối DB Gateway, tự đăng ký

### DB Gateway (29500)
- Điều phối DB, health check, đăng ký DB

### DB Services (29000+)
- Xử lý dữ liệu, tự đăng ký với gateway

## 📱 Frontend Components
### Component Tree
```
App.jsx
└── HomePage.jsx
    ├── Navbar.jsx (Thanh điều hướng)
    └── Empty Content (Nội dung trống)
```

### Component Details
- **Navbar.jsx**: Thanh điều hướng với các liên kết (Trang Chủ, Bảng Điều Khiển, Trạng Thái, Cài Đặt)

### API Connections
- `/api/*` → Load Balancer (20000)
- `/db/*` → DB Gateway (29500)

## 🛠️ Scripts & Tools
- `start-system.sh`: Khởi động toàn hệ thống
- `stop-system.sh`: Dừng toàn hệ thống

## 💾 Versions & Backups
- `V0.0.1-KhoiDauCuaDuAn`: Hệ thống cơ bản
- `V0.0.2-DB-Gateway`: Có DB Gateway trung gian
- `V0.1.2-Docs-System`: Hệ thống hoàn chỉnh với tài liệu cải thiện

[🔙 Về đầu trang](#-cấu-trúc-hệ-thống)