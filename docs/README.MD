# 📋 Hệ Thống Máy Chủ Website

## 🌟 Tổng Quan
Hệ thống 5 lớp với khả năng mở rộng theo chiều ngang, quản lý tải thông minh và giám sát trạng thái thời gian thực.

## 🎯 Mục Tiêu
- Mở rộng theo chiều ngang (horizontal scaling) 📈
- Chạy được trên 1 máy hoặc nhiều máy 🖥️
- Không sử dụng Docker 🚫
- Tự động phát hiện và quản lý dịch vụ hoạt động ✅

## 💻 Công Nghệ Sử Dụng
- Frontend: React, Vite, JSX
- Backend: NodeJS
- Package Manager: NPM
- CSS Framework: CSS thuần

## 🧭 Điều Hướng
- **Cấu trúc hệ thống**: [STRUCTURE.MD](STRUCTURE.MD) 🗂️
- **Hướng dẫn vận hành**: [RUN.MD](RUN.MD) 🚀
- **Giao diện người dùng**: [UI.MD](UI.MD) 🎨
- **Nhật ký thay đổi**: [CHANGELOG.MD](CHANGELOG.MD) 📝

## 📚 Mục Lục
- [🎯 Mục Tiêu](#-mục-tiêu)
- [💻 Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [🧭 Điều Hướng](#-điều-hướng)
- [📱 Cấu Trúc Component](#-cấu-trúc-component)

## 📱 Cấu Trúc Component
Các component được tổ chức theo mô hình thư mục rõ ràng:
- 📁 `frontend/src/components/`: Chứa các component tái sử dụng
- 📁 `frontend/src/pages/`: Chứa các trang chính của ứng dụng
- 📁 `frontend/src/services/`: Chứa các service kết nối API
- 📁 `frontend/src/utils/`: Chứa các tiện ích hỗ trợ
- 📁 `frontend/src/utils/img/`: Chứa hình ảnh logo.png

Hiện tại, hệ thống đã tích hợp:
- **Logo.jsx**: Component hiển thị logo.png
- **Navbar.jsx**: Component điều hướng chính (sử dụng Logo.jsx)
- **HomePage.jsx**: Trang chủ hiển thị với Navbar

## 💾 Phiên Bản & Sao Lưu
- `V0.0.1-KhoiDauCuaDuAn`: Hệ thống cơ bản
- `V0.0.2-DB-Gateway`: Có DB Gateway trung gian
- `V0.1.2-Docs-System`: Hệ thống hoàn chỉnh với tài liệu cải thiện

## 🔄 Chuyển Tiếp Giữa Các Tài Liệu
- [🏠 Trang chủ](README.MD)
- [📋 Cấu trúc hệ thống](STRUCTURE.MD)
- [🚀 Hướng dẫn vận hành](RUN.MD)
- [🎨 Giao diện người dùng](UI.MD)
- [📝 Nhật ký thay đổi](CHANGELOG.MD)

[🔙 Về đầu trang](#-hệ-thống-máy-chủ-website)