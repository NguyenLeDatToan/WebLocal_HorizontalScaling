// DB Gateway Service
const express = require('express');
const httpProxy = require('http-proxy');
const app = express();

// Cấu hình proxy
const proxy = httpProxy.createProxyServer();

// Danh sách DB Services đã đăng ký
let registeredDatabases = [];

// Hàm thêm DB vào danh sách
function addDatabase(dbInfo) {
  // Xóa DB cũ nếu tồn tại
  registeredDatabases = registeredDatabases.filter(
    db => !(db.host === dbInfo.host && db.port === dbInfo.port)
  );
  
  // Thêm DB mới
  registeredDatabases.push({
    id: dbInfo.id,
    name: dbInfo.name,
    host: dbInfo.host,
    port: dbInfo.port,
    status: 'healthy',
    registeredAt: new Date().toISOString()
  });
  
  console.log(`Database registered: ${dbInfo.name} at ${dbInfo.host}:${dbInfo.port}`);
}

// Hàm xóa DB khỏi danh sách
function removeDatabase(host, port) {
  registeredDatabases = registeredDatabases.filter(
    db => !(db.host === host && db.port === port)
  );
  console.log(`Database unregistered: ${host}:${port}`);
}

// API đăng ký DB Service
app.post('/register-db', express.json(), (req, res) => {
  const { id, name, host, port } = req.body;
  
  if (!id || !name || !host || !port) {
    return res.status(400).json({ error: 'ID, name, host and port are required' });
  }
  
  addDatabase({ id, name, host, port });
  res.json({ 
    message: 'Database registered successfully', 
    activeDatabases: registeredDatabases.length 
  });
});

// API gỡ đăng ký DB Service
app.post('/unregister-db', express.json(), (req, res) => {
  const { host, port } = req.body;
  
  if (!host || !port) {
    return res.status(400).json({ error: 'Host and port are required' });
  }
  
  removeDatabase(host, port);
  res.json({ 
    message: 'Database unregistered successfully', 
    activeDatabases: registeredDatabases.length 
  });
});

// Hàm kiểm tra sức khỏe DB
async function checkDBHealth(db) {
  try {
    const response = await fetch(`http://${db.host}:${db.port}/health`);
    return response.ok;
  } catch (e) {
    return false;
  }
}

// Hàm cập nhật trạng thái sức khỏe DB
async function updateDBHealthStatus() {
  for (const db of registeredDatabases) {
    const isHealthy = await checkDBHealth(db);
    db.status = isHealthy ? 'healthy' : 'unhealthy';
  }
}

// API chuyển tiếp yêu cầu đến DB phù hợp
app.use('/db/:dbName', async (req, res) => {
  try {
    // Cập nhật sức khỏe trước khi chuyển tiếp
    await updateDBHealthStatus();
    
    // Tìm DB phù hợp theo tên
    const targetDB = registeredDatabases.find(db => db.name === req.params.dbName);
    
    if (!targetDB || targetDB.status !== 'healthy') {
      return res.status(503).json({ error: `Database ${req.params.dbName} not available` });
    }
    
    // Chuyển tiếp yêu cầu đến DB
    proxy.web(req, res, { 
      target: `http://${targetDB.host}:${targetDB.port}` 
    });
  } catch (error) {
    res.status(503).json({ error: 'No healthy databases available' });
  }
});

// Route kiểm tra sức khỏe DB Gateway
app.get('/health', async (req, res) => {
  await updateDBHealthStatus();
  res.json({ 
    status: 'healthy', 
    registeredDatabases: registeredDatabases.length,
    databases: registeredDatabases
  });
});

// Lấy danh sách DB đã đăng ký
app.get('/databases', (req, res) => {
  res.json(registeredDatabases);
});

app.listen(29500, () => {
  console.log('DB Gateway running on port 29500');
  // Cập nhật sức khỏe định kỳ mỗi 10 giây
  setInterval(updateDBHealthStatus, 10000);
});