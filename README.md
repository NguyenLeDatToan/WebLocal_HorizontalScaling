# 🏗️ WebLocal_HorizontalScaling

Hệ thống máy chủ website với khả năng mở rộng theo chiều ngang (horizontal scaling), bao gồm 5 lớp dịch vụ: Frontend → Load Balancer → Web Servers → DB Gateway → DB Services.

## 🌟 Tính Năng Chính

- **Mở rộng theo chiều ngang** (horizontal scaling)
- **Tự động phát hiện và quản lý dịch vụ hoạt động**
- **Giao diện người dùng React** với trạng thái thời gian thực
- **Hệ thống 5 lớp**:
  ```
  Người Dùng 👤 → Frontend 🎨 → Load Balancer 🔄 → Web Servers 🌐 → DB Gateway 🔀 → DB Services 💾
  ```

## 📚 Tài Liệu Hệ Thống

### Chính
- [**Cấu Trúc Hệ Thống**](./docs/STRUCTURE.MD) 🗂️ - Mô tả chi tiết cấu trúc hệ thống
- [**Hướng Dẫn Vận Hành**](./docs/RUN.MD) 🚀 - Cách khởi động, dừng, vận hành hệ thống
- [**Tổng Quan Hệ Thống**](./docs/README.MD) 📋 - Mô tả chức năng và mục tiêu hệ thống
- [**Nhật Ký Thay Đổi**](./docs/CHANGELOG.MD) 📝 - Ghi nhận các phiên bản và cập nhật

### Giao Diện
- [**Giao Diện Người Dùng**](./docs/UI.MD) 🎨 - Thiết kế giao diện và flow người dùng

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React, Vite, JSX
- **Backend**: NodeJS
- **Package Manager**: NPM
- **CSS Framework**: CSS thuần

## 🚀 Cách Chạy Hệ Thống

1. **Khởi động toàn hệ thống**:
   ```bash
   ./start-system.sh
   ```

2. **Dừng toàn hệ thống**:
   ```bash
   ./stop-system.sh
   ```

3. **Giao diện người dùng**: http://localhost:19000 (hoặc cổng tùy chọn)

## 📦 Kiến Trúc Hệ Thống

- **Load Balancer** (20000): Điều phối người dùng đến Web Servers khỏe
- **Web Servers** (21000+): Xử lý yêu cầu người dùng & kết nối DB qua DB Gateway  
- **DB Gateway** (29500): Điều phối yêu cầu DB đến các CSDL phù hợp
- **DB Services** (29000+): Xử lý dữ liệu người dùng
- **Frontend** (19000+): Giao diện người dùng & giám sát hệ thống

## 💾 Versions
- `V0.0.1-KhoiDauCuaDuAn`: Hệ thống cơ bản (Load Balancer + Web + DB)
- `V0.0.2-DB-Gateway`: Có DB Gateway trung gian
- `V0.1.1-Frontend-PageAndComponent`: Có Navbar component cho giao diện

## 🤝 Đóng Góp

Nếu bạn có ý tưởng cải tiến hoặc phát hiện lỗi, vui lòng tạo issue hoặc pull request. Cảm ơn bạn đã quan tâm đến dự án!