# 🚀 Hướng Dẫn Khởi Động Hệ Thống

## 🏗️ Cấu trúc hệ thống
```
├── load-balancer/          # Dịch vụ điều phối người dùng 🔄
│   ├── index.js           # Logic load balancing với health check 🧪
│   └── package.json       # Dependencies 📦
├── web-servers/            # Các máy chủ xử lý yêu cầu 🌐
│   ├── server1.js         # Web server chính (cổng 21000) 💻
│   └── package.json       # Dependencies 📦
├── db-services/            # Dịch vụ quản lý CSDL 💾
│   ├── index.js           # Logic CSDL (cổng 29000) 💾
│   └── package.json       # Dependencies 📦
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
```

### 2. Khởi động các dịch vụ (theo thứ tự) ⚙️

#### B1: Khởi động Load Balancer (phải chạy TRƯỚC server) 🔄
```bash
cd load-balancer
node index.js
```

#### B2: Khởi động Database Service 💾
```bash
cd db-services
node index.js
```

#### B3: Khởi động Web Servers (sẽ tự động đăng ký với Load Balancer) 🌐
```bash
cd web-servers
node server1.js
```

### 3. Kiểm tra hệ thống 🧪
- Truy cập: http://localhost:20000 🌐
- Kiểm tra sức khỏe: http://localhost:20000/health 🧪

## 📈 Chạy trên nhiều cổng (mở rộng)
### Web Servers 🌐
Để chạy nhiều web server trên các cổng khác nhau (cổng bất kỳ):
```bash
# Cổng 21000 (mặc định)
SERVER_ID=server1 PORT=21000 node server1.js

# Cổng 21001
SERVER_ID=server2 PORT=21001 node server1.js

# Cổng 30000 (bất kỳ)
SERVER_ID=server3 PORT=30000 node server1.js
```

### Load Balancer (cơ chế đăng ký máy chủ) 🔄
Load Balancer sử dụng cơ chế đăng ký thay vì quét cổng:
- Web Server **tự động đăng ký** khi khởi động ✅
- Web Server **tự động gỡ đăng ký** khi tắt 🔄
- Không giới hạn cổng - Web Server chạy ở đâu, Load Balancer cũng nhận diện 🌐
- Chỉ chuyển tiếp đến máy chủ đã đăng ký và đang khỏe 💚

### DB Services 💾
CSDL chạy trên cổng từ 29000 trở đi:
- 29001: users_db 👤
- 29002: products_db 📦
- 29003: orders_db 📋

## 🛑 Dừng hệ thống
- Dùng `Ctrl+C` trên từng terminal đang chạy dịch vụ ⏹️
  - Web Server sẽ **tự động gỡ đăng ký** khỏi Load Balancer ✅
- Hoặc chạy lệnh tắt toàn bộ hệ thống:
  ```bash
  pkill -f "node.*load-balancer\|node.*web-servers\|node.*db-services"
  ```
  - Lệnh này chỉ tắt các dịch vụ trong hệ thống (không ảnh hưởng dịch vụ khác) 🔧
- Hoặc tắt tất cả tiến trình Node.js (cẩn trọng):
  ```bash
  pkill -f node
  ```
  - Web Server có thể không kịp gỡ đăng ký khỏi Load Balancer ⚠️

## 📝 Ghi chú
- Load Balancer sẽ tự động bỏ qua các máy chủ không phản hồi 🚫
- Health check được thực hiện mỗi 10 giây để cập nhật trạng thái máy chủ 🔄
- Load Balancer: cổng 20000 🔄
- Web Servers: cổng 21000-28000 🌐
- DB Services: cổng 29000+ 💾