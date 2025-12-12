// Load Balancer Service with Server Registration
const express = require('express');
const httpProxy = require('http-proxy');
const app = express();

// Cấu hình proxy
const proxy = httpProxy.createProxyServer();

// Danh sách máy chủ đã đăng ký
let registeredServers = [];

// Hàm thêm máy chủ mới vào danh sách
function addServer(serverInfo) {
  // Xóa máy chủ cũ nếu tồn tại
  registeredServers = registeredServers.filter(
    s => !(s.host === serverInfo.host && s.port === serverInfo.port)
  );
  
  // Thêm máy chủ mới
  registeredServers.push({
    host: serverInfo.host,
    port: serverInfo.port,
    status: 'healthy',
    registeredAt: new Date().toISOString()
  });
  
  console.log(`Server registered: ${serverInfo.host}:${serverInfo.port}`);
}

// Hàm xóa máy chủ khỏi danh sách
function removeServer(host, port) {
  registeredServers = registeredServers.filter(
    s => !(s.host === host && s.port === port)
  );
  console.log(`Server unregistered: ${host}:${port}`);
}

// API đăng ký máy chủ
app.post('/register', express.json(), (req, res) => {
  const { host, port } = req.body;
  
  if (!host || !port) {
    return res.status(400).json({ error: 'Host and port are required' });
  }
  
  addServer({ host, port });
  res.json({ 
    message: 'Server registered successfully', 
    activeServers: registeredServers.length 
  });
});

// API gỡ đăng ký máy chủ
app.post('/unregister', express.json(), (req, res) => {
  const { host, port } = req.body;
  
  if (!host || !port) {
    return res.status(400).json({ error: 'Host and port are required' });
  }
  
  removeServer(host, port);
  res.json({ 
    message: 'Server unregistered successfully', 
    activeServers: registeredServers.length 
  });
});

// Hàm kiểm tra sức khỏe máy chủ
async function checkHealth(server) {
  try {
    const response = await fetch(`http://${server.host}:${server.port}/health`);
    return response.ok;
  } catch (e) {
    return false;
  }
}

// Hàm cập nhật trạng thái sức khỏe cho tất cả máy chủ
async function updateHealthStatus() {
  for (const server of registeredServers) {
    const isHealthy = await checkHealth(server);
    server.status = isHealthy ? 'healthy' : 'unhealthy';
  }
}

// Hàm chọn máy chủ healthy theo round-robin
function getNextHealthyServer() {
  const healthyServers = registeredServers.filter(server => server.status === 'healthy');
  
  if (healthyServers.length === 0) {
    throw new Error('No healthy servers available');
  }

  // Lấy máy chủ đầu tiên và đưa nó ra cuối danh sách (round-robin)
  const server = healthyServers[0];
  registeredServers = [...registeredServers.slice(1), server];
  return server;
}

// Route mặc định chuyển tiếp đến máy chủ healthy
app.get('*', async (req, res) => {
  try {
    // Cập nhật trạng thái sức khỏe trước mỗi request
    await updateHealthStatus();
    
    const target = getNextHealthyServer();
    proxy.web(req, res, { target: `http://${target.host}:${target.port}` });
  } catch (error) {
    res.status(503).json({ error: 'No healthy servers available' });
  }
});

// Route kiểm tra sức khỏe của load balancer
app.get('/health', async (req, res) => {
  await updateHealthStatus();
  res.json({ 
    status: 'healthy', 
    registeredServers: registeredServers.length,
    servers: registeredServers
  });
});

app.listen(20000, () => {
  console.log('Load Balancer running on port 20000 with server registration');
  // Cập nhật sức khỏe định kỳ mỗi 10 giây
  setInterval(updateHealthStatus, 10000);
});