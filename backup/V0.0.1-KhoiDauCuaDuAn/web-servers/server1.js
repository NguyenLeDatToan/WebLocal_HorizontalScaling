// Web Server Service with Auto-Registration & Retry Mechanism
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Lấy cổng và host từ biến môi trường
const PORT = parseInt(process.env.PORT) || 21000;
const HOST = process.env.HOST || 'localhost';
const SERVER_ID = process.env.SERVER_ID || `server-${PORT}`;

// Route chính
app.get('/', (req, res) => {
  res.json({ 
    message: 'Web Server is running',
    timestamp: new Date().toISOString(),
    serverId: SERVER_ID,
    port: PORT
  });
});

// Route kiểm tra sức khỏe
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Route xử lý yêu cầu người dùng
app.post('/api/data', (req, res) => {
  // Xử lý dữ liệu từ người dùng
  const userData = req.body;
  
  // Gửi phản hồi đơn giản
  res.json({
    received: true,
    data: userData,
    processedBy: SERVER_ID,
    port: PORT
  });
});

// Hàm đăng ký với Load Balancer (có retry)
async function registerWithLoadBalancer() {
  let attempts = 0;
  const maxAttempts = 100; // Thử liên tục cho đến khi thành công
  const retryInterval = 2000; // Thử lại mỗi 2 giây

  while (attempts < maxAttempts) {
    try {
      const response = await fetch('http://localhost:20000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ host: 'localhost', port: PORT })
      });
      
      if (response.ok) {
        console.log(`Server ${HOST}:${PORT} registered with Load Balancer`);
        return true; // Thoát khỏi hàm khi đăng ký thành công
      } else {
        console.log(`Attempt ${attempts + 1}: Failed to register with Load Balancer: ${response.status}`);
      }
    } catch (error) {
      console.log(`Attempt ${attempts + 1}: Error registering with Load Balancer: ${error.message}`);
    }
    
    attempts++;
    console.log(`Retrying in ${retryInterval / 1000} seconds...`);
    await new Promise(resolve => setTimeout(resolve, retryInterval));
  }

  console.error('Max attempts reached. Could not register with Load Balancer.');
  return false;
}

// Hàm gỡ đăng ký khi tắt máy chủ
async function unregisterWithLoadBalancer() {
  try {
    const response = await fetch('http://localhost:20000/unregister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ host: 'localhost', port: PORT })
    });
    
    if (response.ok) {
      console.log(`Server ${HOST}:${PORT} unregistered from Load Balancer`);
    } else {
      console.error(`Failed to unregister from Load Balancer: ${response.status}`);
    }
  } catch (error) {
    console.error('Error unregistering from Load Balancer:', error);
  }
}

// Khởi động server
app.listen(PORT, () => {
  console.log(`Web Server running on port ${PORT}`);
  // Đăng ký với Load Balancer (sẽ thử lại nếu không thành công)
  registerWithLoadBalancer();
});

// Gỡ đăng ký khi tắt máy chủ
process.on('SIGINT', async () => {
  console.log(`\nShutting down server on port ${PORT}...`);
  await unregisterWithLoadBalancer();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log(`\nShutting down server on port ${PORT}...`);
  await unregisterWithLoadBalancer();
  process.exit(0);
});