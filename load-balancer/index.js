// Load Balancer Service with Server Registration and Advanced Load Balancing
const express = require('express');
const httpProxy = require('http-proxy');
const app = express();

// Cấu hình proxy
const proxy = httpProxy.createProxyServer();

// Danh sách máy chủ đã đăng ký
let registeredServers = [];
let requestCounts = {}; // Theo dõi số lượng request cho mỗi server

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
    registeredAt: new Date().toISOString(),
    requestCount: 0
  });

  // Khởi tạo bộ đếm request cho máy chủ mới
  requestCounts[`${serverInfo.host}:${serverInfo.port}`] = 0;

  console.log(`Server registered: ${serverInfo.host}:${serverInfo.port}`);
}

// Hàm xóa máy chủ khỏi danh sách
function removeServer(host, port) {
  registeredServers = registeredServers.filter(
    s => !(s.host === host && s.port === port)
  );

  // Xóa bộ đếm request cho máy chủ bị gỡ
  delete requestCounts[`${host}:${port}`];

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

    // Reset request count nếu máy chủ không khỏe mạnh
    if (!isHealthy) {
      requestCounts[`${server.host}:${server.port}`] = 0;
    }
  }
}

// Hàm chọn máy chủ healthy theo round-robin
function getNextHealthyServerRoundRobin() {
  const healthyServers = registeredServers.filter(server => server.status === 'healthy');

  if (healthyServers.length === 0) {
    throw new Error('No healthy servers available');
  }

  // Lấy máy chủ đầu tiên và đưa nó ra cuối danh sách (round-robin)
  const server = healthyServers[0];
  registeredServers = [...registeredServers.slice(1), server];
  return server;
}

// Hàm chọn máy chủ theo thuật toán least connections (ít request nhất)
function getLeastUsedHealthyServer() {
  const healthyServers = registeredServers.filter(server => server.status === 'healthy');

  if (healthyServers.length === 0) {
    throw new Error('No healthy servers available');
  }

  // Tìm máy chủ có số lượng request ít nhất
  const leastUsedServer = healthyServers.reduce((least, server) => {
    const leastKey = `${least.host}:${least.port}`;
    const currentKey = `${server.host}:${server.port}`;

    return requestCounts[currentKey] < requestCounts[leastKey] ? server : least;
  }, healthyServers[0]);

  return leastUsedServer;
}

// Hàm chọn máy chủ dựa trên thuật toán được chỉ định
function getNextHealthyServer(algorithm = 'round-robin') {
  switch (algorithm) {
    case 'least-connections':
      return getLeastUsedHealthyServer();
    case 'round-robin':
    default:
      return getNextHealthyServerRoundRobin();
  }
}

// Route mặc định chuyển tiếp đến máy chủ healthy
app.get('*', async (req, res) => {
  try {
    // Cập nhật trạng thái sức khỏe trước mỗi request
    await updateHealthStatus();

    // Lấy thuật toán load balancing từ header hoặc sử dụng mặc định
    const algorithm = req.headers['x-load-balance-algorithm'] || 'round-robin';
    const target = getNextHealthyServer(algorithm);

    // Tăng số lượng request cho máy chủ được chọn
    const targetKey = `${target.host}:${target.port}`;
    requestCounts[targetKey] = (requestCounts[targetKey] || 0) + 1;
    target.requestCount = requestCounts[targetKey];

    proxy.web(req, res, { target: `http://${target.host}:${target.port}` });
  } catch (error) {
    res.status(503).json({ error: 'No healthy servers available' });
  }
});

// Route POST cũng chuyển tiếp đến máy chủ healthy
app.post('*', async (req, res) => {
  try {
    // Cập nhật trạng thái sức khỏe trước mỗi request
    await updateHealthStatus();

    // Lấy thuật toán load balancing từ header hoặc sử dụng mặc định
    const algorithm = req.headers['x-load-balance-algorithm'] || 'round-robin';
    const target = getNextHealthyServer(algorithm);

    // Tăng số lượng request cho máy chủ được chọn
    const targetKey = `${target.host}:${target.port}`;
    requestCounts[targetKey] = (requestCounts[targetKey] || 0) + 1;
    target.requestCount = requestCounts[targetKey];

    proxy.web(req, res, { target: `http://${target.host}:${target.port}` });
  } catch (error) {
    res.status(503).json({ error: 'No healthy servers available' });
  }
});

// Route PUT cũng chuyển tiếp đến máy chủ healthy
app.put('*', async (req, res) => {
  try {
    // Cập nhật trạng thái sức khỏe trước mỗi request
    await updateHealthStatus();

    // Lấy thuật toán load balancing từ header hoặc sử dụng mặc định
    const algorithm = req.headers['x-load-balance-algorithm'] || 'round-robin';
    const target = getNextHealthyServer(algorithm);

    // Tăng số lượng request cho máy chủ được chọn
    const targetKey = `${target.host}:${target.port}`;
    requestCounts[targetKey] = (requestCounts[targetKey] || 0) + 1;
    target.requestCount = requestCounts[targetKey];

    proxy.web(req, res, { target: `http://${target.host}:${target.port}` });
  } catch (error) {
    res.status(503).json({ error: 'No healthy servers available' });
  }
});

// Route DELETE cũng chuyển tiếp đến máy chủ healthy
app.delete('*', async (req, res) => {
  try {
    // Cập nhật trạng thái sức khỏe trước mỗi request
    await updateHealthStatus();

    // Lấy thuật toán load balancing từ header hoặc sử dụng mặc định
    const algorithm = req.headers['x-load-balance-algorithm'] || 'round-robin';
    const target = getNextHealthyServer(algorithm);

    // Tăng số lượng request cho máy chủ được chọn
    const targetKey = `${target.host}:${target.port}`;
    requestCounts[targetKey] = (requestCounts[targetKey] || 0) + 1;
    target.requestCount = requestCounts[targetKey];

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
    loadBalanceAlgorithm: req.query.algorithm || 'round-robin',
    servers: registeredServers.map(server => ({
      host: server.host,
      port: server.port,
      status: server.status,
      registeredAt: server.registeredAt,
      requestCount: requestCounts[`${server.host}:${server.port}`] || 0
    }))
  });
});

// Route lấy thông tin load balancing
app.get('/stats', (req, res) => {
  res.json({
    registeredServers: registeredServers.length,
    totalRequests: Object.values(requestCounts).reduce((sum, count) => sum + count, 0),
    servers: registeredServers.map(server => ({
      host: server.host,
      port: server.port,
      status: server.status,
      requestCount: requestCounts[`${server.host}:${server.port}`] || 0
    })),
    requestCounts: requestCounts
  });
});

app.listen(20000, () => {
  console.log('Load Balancer running on port 20000 with advanced server registration and load balancing algorithms');
  // Cập nhật sức khỏe định kỳ mỗi 10 giây
  setInterval(updateHealthStatus, 10000);
});