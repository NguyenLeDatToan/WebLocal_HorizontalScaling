// Web Server Service with Auto-Registration & DB Connection
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Lấy cổng và host từ biến môi trường
const PORT = parseInt(process.env.PORT) || 21001;
const HOST = process.env.HOST || 'localhost';
const SERVER_ID = process.env.SERVER_ID || `server-${PORT}`;
const LB_HOST = process.env.LB_HOST || 'localhost';
const LB_PORT = process.env.LB_PORT || 20000;
const DB_GATEWAY_HOST = process.env.DB_GATEWAY_HOST || 'localhost';
const DB_GATEWAY_PORT = process.env.DB_GATEWAY_PORT || 29500;

// Route chính
app.get('/', (req, res) => {
  res.json({
    message: 'Web Server is running',
    timestamp: new Date().toISOString(),
    serverId: SERVER_ID,
    port: PORT,
    host: HOST
  });
});

// Route kiểm tra sức khỏe
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    serverId: SERVER_ID,
    port: PORT
  });
});

// Route lấy thông tin máy chủ
app.get('/info', (req, res) => {
  res.json({
    serverId: SERVER_ID,
    port: PORT,
    host: HOST,
    loadBalancer: `${LB_HOST}:${LB_PORT}`,
    dbGateway: `${DB_GATEWAY_HOST}:${DB_GATEWAY_PORT}`
  });
});

// Route xử lý yêu cầu người dùng và kết nối DB
app.post('/api/data', async (req, res) => {
  // Xử lý dữ liệu từ người dùng
  const userData = req.body;

  // Gửi yêu cầu đến DB Gateway (giả sử kết nối đến users_db)
  try {
    const dbResponse = await fetch(`http://${DB_GATEWAY_HOST}:${DB_GATEWAY_PORT}/db/users_db`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...userData,
        processedBy: SERVER_ID,
        requestTime: new Date().toISOString()
      })
    });

    const dbResult = await dbResponse.json();

    // Gửi phản hồi kết hợp từ Web Server và DB
    res.json({
      received: true,
      data: userData,
      processedBy: SERVER_ID,
      port: PORT,
      host: HOST,
      dbResponse: dbResult,
      dbConnected: dbResponse.ok
    });
  } catch (error) {
    // Nếu DB không phản hồi, vẫn gửi phản hồi từ Web Server
    res.json({
      received: true,
      data: userData,
      processedBy: SERVER_ID,
      port: PORT,
      host: HOST,
      dbConnected: false,
      dbError: error.message
    });
  }
});

// Hàm đăng ký với Load Balancer (có retry)
async function registerWithLoadBalancer() {
  let attempts = 0;
  const maxAttempts = 100;
  const retryInterval = 2000;

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`http://${LB_HOST}:${LB_PORT}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ host: HOST, port: PORT })
      });

      if (response.ok) {
        console.log(`Server ${HOST}:${PORT} registered with Load Balancer at ${LB_HOST}:${LB_PORT}`);
        return true;
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
    const response = await fetch(`http://${LB_HOST}:${LB_PORT}/unregister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ host: HOST, port: PORT })
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

// Hàm kiểm tra kết nối đến DB Gateway
async function checkDBGatewayConnection() {
  try {
    const response = await fetch(`http://${DB_GATEWAY_HOST}:${DB_GATEWAY_PORT}/health`);
    return response.ok;
  } catch (e) {
    return false;
  }
}

// Khởi động server
app.listen(PORT, async () => {
  console.log(`Web Server ${SERVER_ID} running on port ${PORT}`);
  
  // Kiểm tra kết nối đến DB Gateway trước khi đăng ký
  const dbGatewayConnected = await checkDBGatewayConnection();
  if (!dbGatewayConnected) {
    console.warn(`Warning: Cannot connect to DB Gateway at ${DB_GATEWAY_HOST}:${DB_GATEWAY_PORT}`);
  } else {
    console.log(`Successfully connected to DB Gateway at ${DB_GATEWAY_HOST}:${DB_GATEWAY_PORT}`);
  }
  
  // Đăng ký với Load Balancer (sẽ thử lại nếu không thành công)
  await registerWithLoadBalancer();
});

// Gỡ đăng ký khi tắt máy chủ
process.on('SIGINT', async () => {
  console.log(`\nShutting down server ${SERVER_ID} on port ${PORT}...`);
  await unregisterWithLoadBalancer();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log(`\nShutting down server ${SERVER_ID} on port ${PORT}...`);
  await unregisterWithLoadBalancer();
  process.exit(0);
});