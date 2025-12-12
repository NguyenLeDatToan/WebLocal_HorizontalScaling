# 📋 Hệ Thống Máy Chủ Website

## 🌟 Tổng Quan
Hệ thống gồm 3 dịch vụ chính:
1. **Load Balancer** 🔄: Điều phối người dùng đến các máy chủ đang hoạt động
2. **Web Servers** 🌐: Xử lý yêu cầu người dùng
3. **DB Services** 💾: Quản lý cơ sở dữ liệu

## 🏗️ Kiến Trúc
```
Người Dùng 👤 → [Load Balancer] → [Web Servers] ↔ [DB Services]
                ↓
        [Health Check Monitor] 🧪
```

## 💻 Công Nghệ Sử Dụng
- Frontend: React, Vite, JSX
- Backend: NodeJS
- Package Manager: NPM
- CSS Framework: CSS thuần

## 🎯 Mục Tiêu
- Mở rộng theo chiều ngang (horizontal scaling) 📈
- Chạy được trên 1 máy hoặc nhiều máy 🖥️
- Không sử dụng Docker 🚫

## 📁 Thư Mục
- `load-balancer/` 🔄: Dịch vụ điều phối người dùng
- `web-servers/` 🌐: Các máy chủ xử lý yêu cầu
- `db-services/` 💾: Dịch vụ cơ sở dữ liệu
- `docs/` 📚: Tài liệu hệ thống