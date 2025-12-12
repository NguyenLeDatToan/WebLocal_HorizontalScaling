# 📚 Tài liệu dự án WebLocal

## 🎯 Tổng quan

Dự án WebLocal là một ứng dụng web hiện đại được xây dựng với React, sử dụng hệ thống màu sắc đồng bộ và giao diện thân thiện với người dùng.

## 🏗️ Kiến trúc

- Frontend: React với hệ thống CSS variables cho theme
- Backend: Node.js, Gateway và DB Services
- Load Balancer: Phân phối tải
- Web Servers: Các máy chủ xử lý yêu cầu

## 🎨 Giao diện

- Sử dụng theme màu xanh dương/tím (blue/purple) làm chủ đạo
- Hệ thống biến CSS được định nghĩa trong `frontend/src/styles/variables.css`
- Tất cả thành phần UI đều tuân thủ theme chung

## 🔧 Cài đặt

```bash
cd frontend
npm install
npm run dev
```

## 🚀 Chạy ứng dụng

- Chạy toàn bộ hệ thống: `./start-system.sh`
- Dừng hệ thống: `./stop-system.sh`

## 📝 Ghi chú

Thư mục này chứa tất cả tài liệu liên quan đến dự án, bao gồm hướng dẫn sử dụng, thiết kế UI và lịch sử thay đổi.