# Script tắt toàn hệ thống
#!/bin/bash

echo "🛑 Dừng hệ thống..."

# Lấy PID của các tiến trình Node.js trong thư mục hệ thống
PIDS=$(lsof -t -c node -d cwd -F n | grep -E "(load-balancer|web-servers|db-services|db-gateway)" | cut -d' ' -f2 | sort -u | tr '\n' ' ')

if [ -z "$PIDS" ]; then
  echo "✅ Không tìm thấy tiến trình hệ thống nào đang chạy."
else
  echo "🔍 Tìm thấy các tiến trình hệ thống: $PIDS"
  echo "🛑 Đang dừng các tiến trình..."
  kill $PIDS 2>/dev/null
  sleep 2
  # Kiểm tra lại và buộc dừng nếu cần
  lsof -t -c node -d cwd -F n | grep -E "(load-balancer|web-servers|db-services|db-gateway)" | cut -d' ' -f2 | sort -u | xargs kill -9 2>/dev/null || true
  echo "✅ Các tiến trình hệ thống đã được tắt."
fi

# Kiểm tra các tiến trình Node.js đang nghe trên các cổng hệ thống
PORT_PIDS=$(lsof -t -i :20000,:21000,:21001,:21002,:29500,:29001,:29002,:29003 2>/dev/null)
if [ -n "$PORT_PIDS" ]; then
  echo "🔍 Phát hiện tiến trình đang nghe trên cổng hệ thống: $PORT_PIDS"
  kill $PORT_PIDS 2>/dev/null
  sleep 1
  lsof -t -i :20000,:21000,:21001,:21002,:29500,:29001,:29002,:29003 2>/dev/null | xargs kill -9 2>/dev/null || true
  echo "✅ Các tiến trình trên cổng hệ thống đã được tắt."
fi

echo "🔧 Kiểm tra các tiến trình còn lại..."
FINAL_CHECK=$(lsof -t -i :20000,:21000,:21001,:21002,:29500,:29001,:29002,:29003 2>/dev/null)
if [ -z "$FINAL_CHECK" ]; then
  echo "✅ Không còn tiến trình hệ thống nào đang chạy."
else
  echo "⚠️  Vẫn còn tiến trình đang chạy: $FINAL_CHECK"
fi