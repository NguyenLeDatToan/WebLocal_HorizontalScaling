# 🚀 Hướng Dẫn Khởi Động Hệ Thống

## 🏗️ Cấu trúc hệ thống
```
├── load-balancer/          # Load Balancer service 🔄
│   ├── index.js           # Logic load balancing với health check & đăng ký máy chủ 🧪
│   └── package.json       # Dependencies 📦
├── web-servers/            # Web Servers cluster 🌐
│   ├── server1.js         # Web server chính (cổng 21000) 💻
│   └── package.json       # Dependencies 📦
├── db-services/            # DB Services layer 💾
│   ├── index.js           # Logic DB với tự động đăng ký với DB Gateway 💾
│   └── package.json       # Dependencies 📦
├── db-gateway/             # DB Gateway trung gian giữa Web & DB 🔄
│   ├── index.js           # Logic điều phối DB theo tên & health check 🧪
│   └── package.json       # Dependencies 📦
├── start-system.sh         # Script khởi động toàn hệ thống 🚀
├── stop-system.sh          # Script tắt toàn hệ thống 🛑
├── frontend/               # Frontend React cho hệ thống 🎨
│   ├── src/              # Source code frontend
│   ├── package.json      # Dependencies frontend
│   └── vite.config.js    # Cấu hình Vite
├── backup/                 # Thư mục sao lưu hệ thống 💾
└── docs/                   # Tài liệu hệ thống 📚
    ├── README.MD          # Tổng quan hệ thống 📋
    ├── UI.MD              # Giao diện người dùng 🎨
    ├── CHANGELOG.MD       # Nhật ký thay đổi 📝
    └── RUN.MD             # Hướng dẫn khởi động (bạn đang đọc file này) 📖
```

## 🛠️ Yêu cầu hệ thống
- Node.js v18+ 💻
- NPM 📦

## 🚀 Cách khởi động hệ thống

### 1. Cài đặt dependencies 📦
```bash
cd load-balancer && npm install
cd ../web-servers && npm install
cd ../db-services && npm install
cd ../db-gateway && npm install
cd ../frontend && npm install
```

### 2. Khởi động bằng script (khuyến nghị) 🤖
```bash
./start-system.sh
```
Script sẽ tự động:
- Khởi động DB Gateway (cổng 29500) 🔌
- Khởi động DB Services (cổng 29001-29003) 💾
- Khởi động Load Balancer (cổng 20000) 🔄
- Khởi động Web Servers (cổng 21000-21002) 🌐
- Khởi động Frontend (cổng 19000 mặc định) 🎨
- Tự động cài đặt dependencies cho tất cả dịch vụ 📦

### 3. Chạy frontend trên cổng tùy chọn 🌐
```bash
FRONTEND_PORT=4000 ./start-system.sh
```
Frontend sẽ chạy trên cổng 4000 thay vì 19000.

### 3. Thủ công từng dịch vụ (nếu cần) ⚙️

#### B1: Khởi động DB Gateway (phải chạy TRƯỚC tất cả) 🔌
```bash
cd db-gateway
node index.js
```

#### B2: Khởi động DB Services (sẽ tự động đăng ký với DB Gateway) 💾
```bash
cd db-services
# users_db (cổng 29001)
DB_ID=1 DB_NAME=users_db PORT=29001 node index.js

# products_db (cổng 29002)
DB_ID=2 DB_NAME=products_db PORT=29002 node index.js

# orders_db (cổng 29003)
DB_ID=3 DB_NAME=orders_db PORT=29003 node index.js
```

#### B3: Khởi động Load Balancer 🔄
```bash
cd load-balancer
node index.js
```

#### B4: Khởi động Web Servers (sẽ tự động đăng ký với Load Balancer) 🌐
```bash
cd web-servers
# Web Server 1 (cổng 21000)
SERVER_ID=server1 PORT=21000 node server1.js

# Web Server 2 (cổng 21001)
SERVER_ID=server2 PORT=21001 node server1.js

# Web Server 3 (cổng 21002)
SERVER_ID=server3 PORT=21002 node server1.js
```

## 🧪 Kiểm tra hệ thống
- **Frontend**: http://localhost:19000 🎨 (hoặc cổng tùy chọn)
- **Load Balancer**: http://localhost:20000 🌐
- **Load Balancer Health**: http://localhost:20000/health 🧪
- **DB Gateway**: http://localhost:29500 🔌
- **DB Gateway Health**: http://localhost:29500/health 🧪
- **Web Server**: http://localhost:21000, 21001, 21002 💻
- **Web Server Health**: http://localhost:21000/health, 21001/health, 21002/health 🧪

## 📈 Gửi yêu cầu thử
```bash
# Gửi yêu cầu đến Load Balancer (sẽ chuyển tiếp đến Web Server khỏe)
curl -X POST http://localhost:20000/api/data -d '{"test": "data"}' -H "Content-Type: application/json"

# Gửi yêu cầu trực tiếp đến Web Server
curl -X POST http://localhost:21000/api/data -d '{"test": "data"}' -H "Content-Type: application/json"

# Gửi yêu cầu đến DB qua DB Gateway
curl -X GET http://localhost:29500/db/users_db/health
```

## 🔄 Kiến trúc 5 lớp (có Frontend)
```
Người Dùng 👤 → Frontend:19000+ 🎨 → Load Balancer:20000 🔄 → Web Servers:21000+ 🌐 → DB Gateway:29500 🔀 → DB Services:29000+ 💾
```
- Frontend: Giao diện người dùng & giám sát hệ thống 🎨
- Load Balancer: Điều phối người dùng đến Web Servers khỏe 🔄
- Web Servers: Xử lý yêu cầu người dùng & kết nối DB qua DB Gateway 🌐
- DB Gateway: Điều phối yêu cầu DB đến các CSDL phù hợp 🔀
- DB Services: Xử lý dữ liệu người dùng 💾

## 🛑 Dừng hệ thống
### Dùng script (khuyến nghị) 🤖
```bash
./stop-system.sh
```
Script sẽ:
- Dừng tất cả tiến trình Node.js liên quan đến hệ thống ⏹️
- Tự động gỡ đăng ký Web Server khỏi Load Balancer ✅
- Tự động gỡ đăng ký DB khỏi DB Gateway ✅
- Dọn dẹp sạch sẽ, an toàn 💯

### Thủ công ⚙️
- Dùng `Ctrl+C` trên từng terminal đang chạy dịch vụ ⏹️
  - Web Server sẽ **tự động gỡ đăng ký** khỏi Load Balancer ✅
  - DB Service sẽ **tự động gỡ đăng ký** khỏi DB Gateway ✅

## 💾 Backup & Restore
### Sao lưu phiên bản hiện tại
- Thư mục `backup/V0.0.1-KhoiDauCuaDuAn/` chứa bản sao lưu đầu tiên 💾
- Chứa toàn bộ: Load Balancer, Web Servers, DB Services, DB Gateway, Docs

### Khôi phục từ bản sao lưu
- Copy nội dung từ `backup/V0.0.1-KhoiDauCuaDuAn/` ra thư mục gốc 💾
- Chạy `./start-system.sh` để khởi động lại hệ thống

## 📝 Ghi chú
- **Frontend**: Giao diện React với proxy đến backend 🎨
- **DB Gateway** là dịch vụ trung gian giữa Web & DB 🔀
- **Web Servers** kết nối DB thông qua DB Gateway 🌐
- **Load Balancer** chỉ điều phối người dùng, không can thiệp dữ liệu 🔄
- **Cơ chế đăng ký**: Web/DB tự động đăng ký khi khởi động, gỡ khi tắt ✅
- **Health check**: Mỗi 10 giây cập nhật trạng thái máy chủ 🔄
- **Frontend**: cổng 19000+ (mặc định 19000) 🎨
- **Load Balancer**: cổng 20000 🔄
- **Web Servers**: cổng 21000-28000 🌐
- **DB Gateway**: cổng 29500 🔀
- **DB Services**: cổng 29000+ 💾