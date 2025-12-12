Hệ thống máy chủ website có cấu trúc được liệt kê để tương lai tôi có thể triển khai chạy trên nhiều máy và hiện tại vẫn có thể chạy trên 1 máy.

Hệ thống:
- Một dịch vụ điều tiết người dùng đến các máy chủ đang hoạt động, nhận người dùng trên một cổng duy nhất và điều tiết họ đến máy chủ phù hợp đang hoạt động để giảm lưu lượng người dùng và tránh để người dùng truy cập vào các máy chủ đang bị tắt
- Dịch vụ máy chủ, có thể chạy nhiều máy chủ khác nhau ở các cổng khác nhau cùng lúc và nhận từ sự điều tiết người dùng của dịch vj điều tiết. Nhập xuất thông tin từ các cơ sỡ dữ liệu
- Dịch vụ sơ sỡ dữ liệu, có thể chạy nhiều dịch vụ máy chủ cùng một lúc để nhập xuất thông tin mà người dùng cung cấp qua các máy chủ.

- Hệ thống này phải có khải năng mở rộng theo chiều ngang để tiết kiệm chi phí

- Chỉ dùng React, Vite, NPM, NodeJS, Html, Css, Jsx

Lưu ý: Không dùng được docker
