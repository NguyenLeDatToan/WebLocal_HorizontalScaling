# Script khởi động toàn hệ thống
#!/bin/bash

echo "🚀 Khởi động hệ thống 3 lớp..."

# Lưu đường dẫn gốc
ROOT_DIR=$(pwd)

# Khởi động DB Gateway trước (cổng 29500)
echo "🔌 Khởi động DB Gateway..."
cd "$ROOT_DIR/db-gateway" && npm install && node index.js &
DB_GATEWAY_PID=$!
sleep 3

# Khởi động DB Services (cổng 29001, 29002, 29003)
echo "💾 Khởi động DB Services..."
cd "$ROOT_DIR/db-services" && npm install

# DB 1 - users_db
DB_ID=1 DB_NAME=users_db PORT=29001 node index.js &
DB1_PID=$!
sleep 1

# DB 2 - products_db  
DB_ID=2 DB_NAME=products_db PORT=29002 node index.js &
DB2_PID=$!
sleep 1

# DB 3 - orders_db
DB_ID=3 DB_NAME=orders_db PORT=29003 node index.js &
DB3_PID=$!
sleep 1

# Chờ DB Services đăng ký
sleep 3

# Khởi động Load Balancer (cổng 20000)
echo "🔄 Khởi động Load Balancer..."
cd "$ROOT_DIR/load-balancer" && npm install && node index.js &
LOAD_BALANCER_PID=$!
sleep 3

# Khởi động Web Servers (cổng 21000, 21001, 21002)
echo "🌐 Khởi động Web Servers..."
cd "$ROOT_DIR/web-servers"

# Web Server 1
SERVER_ID=server1 PORT=21000 node server1.js &
WEB1_PID=$!
sleep 2

# Web Server 2
SERVER_ID=server2 PORT=21001 node server1.js &
WEB2_PID=$!
sleep 2

# Web Server 3
SERVER_ID=server3 PORT=21002 node server1.js &
WEB3_PID=$!
sleep 2

echo "✅ Hệ thống đã khởi động hoàn tất!"
echo "🔌 DB Gateway: http://localhost:29500"
echo "🔄 Load Balancer: http://localhost:20000"  
echo "🌐 Web Servers: 21000, 21001, 21002"
echo "💾 DB Services: 29001 (users_db), 29002 (products_db), 29003 (orders_db)"
echo ""
echo "🔧 Kiểm tra trạng thái Load Balancer: http://localhost:20000/health"
echo "🔧 Kiểm tra trạng thái DB Gateway: http://localhost:29500/health"
echo "🔧 Gửi yêu cầu thử: curl -X POST http://localhost:20000/api/data -d '{\"test\": \"data\"}'"

# Giữ script chạy
wait $DB_GATEWAY_PID $LOAD_BALANCER_PID $DB1_PID $DB2_PID $DB3_PID $WEB1_PID $WEB2_PID $WEB3_PID