// DB Gateway Service with Advanced Registration and Health Monitoring
const express = require('express');
const httpProxy = require('http-proxy');
const app = express();

// Cấu hình proxy
const proxy = httpProxy.createProxyServer();

// Danh sách DB Services đã đăng ký
let registeredDatabases = [];
let requestCounts = {}; // Theo dõi số lượng request cho mỗi DB

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
    registeredAt: new Date().toISOString(),
    requestCount: 0
  });

  // Khởi tạo bộ đếm request cho DB mới
  requestCounts[`${dbInfo.host}:${dbInfo.port}`] = 0;

  console.log(`Database registered: ${dbInfo.name} at ${dbInfo.host}:${dbInfo.port}`);
}

// Hàm xóa DB khỏi danh sách
function removeDatabase(host, port) {
  registeredDatabases = registeredDatabases.filter(
    db => !(db.host === host && db.port === port)
  );

  // Xóa bộ đếm request cho DB bị gỡ
  delete requestCounts[`${host}:${port}`];

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

    // Reset request count nếu DB không khỏe mạnh
    if (!isHealthy) {
      requestCounts[`${db.host}:${db.port}`] = 0;
    }
  }
}

// Hàm chọn DB phù hợp theo tên và thuật toán load balancing
function getTargetDatabase(dbName, algorithm = 'round-robin') {
  const matchingDatabases = registeredDatabases.filter(
    db => db.name === dbName && db.status === 'healthy'
  );

  if (matchingDatabases.length === 0) {
    return null;
  }

  // Áp dụng thuật toán load balancing
  switch (algorithm) {
    case 'least-connections':
      // Chọn DB có ít request nhất
      return matchingDatabases.reduce((least, db) => {
        const leastKey = `${least.host}:${least.port}`;
        const currentKey = `${db.host}:${db.port}`;

        return requestCounts[currentKey] < requestCounts[leastKey] ? db : least;
      }, matchingDatabases[0]);

    case 'round-robin':
    default:
      // Xoay vòng DB
      const target = matchingDatabases[0];
      registeredDatabases = [
        ...registeredDatabases.filter(db => db.name !== dbName),
        ...matchingDatabases.slice(1),
        target
      ];
      return target;
  }
}

// API chuyển tiếp yêu cầu đến DB phù hợp
app.use('/db/:dbName', async (req, res) => {
  try {
    // Cập nhật sức khỏe trước khi chuyển tiếp
    await updateDBHealthStatus();

    // Lấy thuật toán load balancing từ header hoặc sử dụng mặc định
    const algorithm = req.headers['x-db-load-balance-algorithm'] || 'round-robin';
    const targetDB = getTargetDatabase(req.params.dbName, algorithm);

    if (!targetDB) {
      return res.status(503).json({ error: `Database ${req.params.dbName} not available` });
    }

    // Tăng số lượng request cho DB được chọn
    const targetKey = `${targetDB.host}:${targetDB.port}`;
    requestCounts[targetKey] = (requestCounts[targetKey] || 0) + 1;
    targetDB.requestCount = requestCounts[targetKey];

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
    loadBalanceAlgorithm: req.query.algorithm || 'round-robin',
    databases: registeredDatabases.map(db => ({
      id: db.id,
      name: db.name,
      host: db.host,
      port: db.port,
      status: db.status,
      registeredAt: db.registeredAt,
      requestCount: requestCounts[`${db.host}:${db.port}`] || 0
    }))
  });
});

// Lấy danh sách DB đã đăng ký
app.get('/databases', (req, res) => {
  res.json(registeredDatabases.map(db => ({
    id: db.id,
    name: db.name,
    host: db.host,
    port: db.port,
    status: db.status,
    registeredAt: db.registeredAt,
    requestCount: requestCounts[`${db.host}:${db.port}`] || 0
  })));
});

// Route lấy thông tin thống kê DB
app.get('/stats', (req, res) => {
  res.json({
    registeredDatabases: registeredDatabases.length,
    totalRequests: Object.values(requestCounts).reduce((sum, count) => sum + count, 0),
    databases: registeredDatabases.map(db => ({
      id: db.id,
      name: db.name,
      host: db.host,
      port: db.port,
      status: db.status,
      requestCount: requestCounts[`${db.host}:${db.port}`] || 0
    })),
    requestCounts: requestCounts
  });
});

app.listen(29500, () => {
  console.log('DB Gateway running on port 29500 with advanced registration and load balancing');
  // Cập nhật sức khỏe định kỳ mỗi 10 giây
  setInterval(updateDBHealthStatus, 10000);
});