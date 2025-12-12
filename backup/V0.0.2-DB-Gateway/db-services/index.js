// DB Service with Auto-Registration to DB Gateway
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Lấy cổng và host từ biến môi trường
const PORT = parseInt(process.env.PORT) || 29000;
const DB_NAME = process.env.DB_NAME || `db-${PORT}`;
const DB_ID = parseInt(process.env.DB_ID) || PORT - 29000;
const HOST = process.env.HOST || 'localhost';

// Danh sách các CSDL phụ thuộc vào cổng
const databases = [
  { id: 1, name: 'users_db', port: 29001 },
  { id: 2, name: 'products_db', port: 29002 },
  { id: 3, name: 'orders_db', port: 29003 }
];

// Lấy thông tin DB hiện tại
const currentDB = databases.find(db => db.port === PORT) || { id: DB_ID, name: DB_NAME, port: PORT };

// Route kiểm tra sức khỏe
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    database: currentDB.name,
    port: currentDB.port
  });
});

// Route lấy danh sách CSDL
app.get('/databases', (req, res) => {
  res.json(databases);
});

// Route xử lý kết nối đến CSDL cụ thể
app.post('/connect/:dbId', (req, res) => {
  const dbId = parseInt(req.params.dbId);
  const db = databases.find(database => database.id === dbId);
  
  if (!db) {
    return res.status(404).json({ error: 'Database not found' });
  }
  
  // Trả về thông tin kết nối giả lập
  res.json({
    connectedTo: db.name,
    port: db.port,
    status: 'connected'
  });
});

// Hàm đăng ký với DB Gateway
async function registerWithDBGateway() {
  try {
    const response = await fetch('http://localhost:29500/register-db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: currentDB.id, 
        name: currentDB.name, 
        host: 'localhost', 
        port: currentDB.port 
      })
    });
    
    if (response.ok) {
      console.log(`Database ${currentDB.name} registered with DB Gateway`);
    } else {
      console.error(`Failed to register with DB Gateway: ${response.status}`);
    }
  } catch (error) {
    console.error('Error registering with DB Gateway:', error);
  }
}

// Hàm gỡ đăng ký khi tắt DB
async function unregisterFromDBGateway() {
  try {
    const response = await fetch('http://localhost:29500/unregister-db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ host: 'localhost', port: currentDB.port })
    });
    
    if (response.ok) {
      console.log(`Database ${currentDB.name} unregistered from DB Gateway`);
    } else {
      console.error(`Failed to unregister from DB Gateway: ${response.status}`);
    }
  } catch (error) {
    console.error('Error unregistering from DB Gateway:', error);
  }
}

// Khởi động DB Service
app.listen(PORT, async () => {
  console.log(`DB Service ${currentDB.name} running on port ${PORT}`);
  await registerWithDBGateway();
});

// Gỡ đăng ký khi tắt DB
process.on('SIGINT', async () => {
  console.log(`\nShutting down DB Service ${currentDB.name} on port ${PORT}...`);
  await unregisterFromDBGateway();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log(`\nShutting down DB Service ${currentDB.name} on port ${PORT}...`);
  await unregisterFromDBGateway();
  process.exit(0);
});