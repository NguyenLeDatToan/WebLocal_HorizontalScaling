// DB Service
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Danh sách các CSDL đang chạy (cổng từ 29000 trở đi)
const databases = [
  { id: 1, name: 'users_db', port: 29001 },
  { id: 2, name: 'products_db', port: 29002 },
  { id: 3, name: 'orders_db', port: 29003 }
];

// Route kiểm tra sức khỏe
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    databases: databases.map(db => ({ id: db.id, name: db.name, status: 'running' }))
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

// Port listener
const PORT = process.env.PORT || 29000;
app.listen(PORT, () => {
  console.log(`DB Service running on port ${PORT}`);
});