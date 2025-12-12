# Nhật Ký Thay Đổi

## [2024-12-12 13:30] 🔀
### Thêm Mới
- ✅ Tạo DB Gateway service làm dịch vụ trung gian
- ✅ DB Services tự động đăng ký với DB Gateway
- ✅ Web Servers kết nối DB thông qua DB Gateway
- ✅ Cơ chế điều phối DB theo tên (e.g. /db/users_db)
- ✅ Health check cho DB Services

## [2024-12-12 14:30] 🎨
### Thêm Mới
- ✅ Tạo Navbar component cho giao diện người dùng
- ✅ Thêm điều hướng giữa các trang (Trang Chủ, Bảng Điều Khiển, Trạng Thái, Cài Đặt)
- ✅ Cập nhật HomePage để tích hợp Navbar
- ✅ Cập nhật tài liệu UI.MD và STRUCTURE.MD

## [2024-12-12 14:00] 💾
### Thêm Mới
- ✅ Tạo bản sao lưu phiên bản: V0.0.2-DB-Gateway
- ✅ Chứa đầy đủ hệ thống 4 lớp: Load Balancer + Web Servers + DB Gateway + DB Services
- ✅ Bao gồm script khởi động/tắt toàn hệ thống

## [2024-12-12 13:45] 🚀
### Thêm Mới
- ✅ Script khởi động toàn hệ thống: start-system.sh
- ✅ Script tắt toàn hệ thống: stop-system.sh
- ✅ Tự động cài đặt dependencies cho tất cả dịch vụ
- ✅ Khởi động theo thứ tự đúng: DB Gateway → DB Services → Load Balancer → Web Servers

## [2024-12-12 12:30] 💾
### Thêm Mới
- ✅ Tạo bản sao lưu phiên bản: V0.0.1-KhoiDauCuaDuAn
- ✅ Thư mục backup/ chứa các phiên bản hệ thống
- ✅ Hướng dẫn khôi phục từ bản sao lưu

## [2024-12-12 12:00] 🔄
### Thêm Mới
- ✅ Cơ chế thử lại đăng ký tự động cho Web Server
- ✅ Web Server thử lại đăng ký mỗi 2 giây nếu Load Balancer chưa sẵn sàng
- ✅ Load Balancer & Server độc lập thứ tự khởi động
- 📝 Cập nhật RUN.MD với linh hoạt khởi động

## [2024-12-12 11:45] 📋
### Thay Đổi
- 🔄 Load Balancer dùng cơ chế đăng ký máy chủ  
- 🔄 Web Server tự động đăng ký với Load Balancer khi khởi động  
- 🔄 Web Server tự động gỡ đăng ký khi tắt  
- 🔄 Không giới hạn cổng - Load Balancer nhận diện mọi cổng  
- 📝 Cập nhật RUN.MD giải thích cơ chế đăng ký  

## [2024-12-12 10:30] 🔍
### Thay Đổi
- 🔄 Load Balancer dùng cơ chế phát hiện máy chủ động (21000-28000)  
- 🔄 Tự động quét máy chủ đang hoạt động thay vì danh sách cố định  
- 🔄 Chỉ chuyển hướng đến máy chủ phản hồi `/health`  
- 📝 Cập nhật RUN.MD giải thích cơ chế phát hiện  

## [2024-12-12 09:15] 🚀
### Thay Đổi
- 🔄 Load Balancer: cổng từ 8080 → 20000  
- 🔄 Web Servers: dải cổng từ 3001-3003 → 21000-28000  
- 🔄 DB Services: dải cổng từ 5000-5003 → 29000+  
- 📝 Cập nhật tài liệu RUN.MD với cấu hình cổng mới  
- 📋 Cập nhật tài liệu kiến trúc hệ thống  

## [2024-12-12 08:00] 📝
### Thêm Mới
- ✅ Tài liệu RUN.MD hướng dẫn khởi động hệ thống  
- ✅ Hướng dẫn cấu hình đa cổng chi tiết  
- ✅ Hướng dẫn kiểm tra sức khỏe và giám sát hệ thống  

## [2024-12-11 12:56] 🛠️
### Thêm Mới
- ✅ Cơ chế health check cho Load Balancer  
- ✅ Tự động phát hiện trạng thái máy chủ  
- ✅ Bỏ qua máy chủ không khỏe trong quá trình phân phối tải  

### Thay Đổi
- 🔄 Load Balancer chỉ chuyển hướng đến máy chủ khỏe mạnh  
- 🔄 Danh sách máy chủ cập nhật động theo trạng thái sức khỏe  

## [2024-12-07 17:09] 📁
### Thêm Mới
- ✅ Tạo cấu trúc thư mục hệ thống (load-balancer, web-servers, db-services)  
- ✅ Tạo tài liệu README.MD mô tả kiến trúc 3 lớp  
- ✅ Tạo tài liệu UI.MD mô tả giao diện người dùng  
- ✅ Thiết lập CHANGELOG.MD để theo dõi tiến độ  

### Kiến Trúc Hệ Thống
- 🔄 Load Balancer service  
- 🔄 Web Servers cluster  
- 🔄 DB Services layer  
- 📝 Documentation structure  