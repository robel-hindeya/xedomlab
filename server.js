import http from 'http';
import httpProxy from 'http-proxy';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GATEWAY_PORT = process.env.PORT || 8080;
const BACKEND_PORT = 5000;
const ADMIN_PORT = 3001;
const FRONTEND_PORT = 3000;

console.log('\x1b[36m%s\x1b[0m', '==========================================================');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', '   XEDOM LAB — UNIFIED MONOREPO RUNNER');
console.log('\x1b[36m%s\x1b[0m', '==========================================================');
console.log('Starting services:');
console.log(`  • Backend (API)      : http://localhost:${BACKEND_PORT}`);
console.log(`  • Admin (Dashboard)  : http://localhost:${ADMIN_PORT}`);
console.log(`  • Frontend (Website) : http://localhost:${FRONTEND_PORT}`);
console.log(`  • Unified Gateway    : http://localhost:${GATEWAY_PORT}`);
console.log('----------------------------------------------------------');

// Child processes list
const processes = [];

function runService(name, dir, command, args, color) {
  const p = spawn(command, args, {
    cwd: path.join(__dirname, dir),
    shell: true,
    stdio: 'pipe',
    env: { ...process.env, FORCE_COLOR: '1' },
  });

  p.stdout.on('data', (data) => {
    process.stdout.write(`${color}[${name}]\x1b[0m ${data}`);
  });

  p.stderr.on('data', (data) => {
    process.stderr.write(`${color}[${name} ERR]\x1b[0m ${data}`);
  });

  p.on('close', (code) => {
    console.log(`${color}[${name}]\x1b[0m exited with code ${code}`);
  });

  processes.push(p);
  return p;
}

// 1. Launch Backend API
runService('BACKEND', 'backend', 'npm', ['run', 'dev'], '\x1b[36m');

// 2. Launch Admin Dashboard
runService('ADMIN', 'admin', 'npm', ['run', 'dev'], '\x1b[35m');

// 3. Launch Frontend xedom-lab
runService('XEDOM-LAB', 'xedom-lab', 'npm', ['run', 'dev'], '\x1b[32m');

// Create Reverse Proxy for 1 Unified Server
const proxy = httpProxy.createProxyServer({ ws: true });

proxy.on('error', (err, req, res) => {
  if (res && res.writeHead) {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end(`Xedom Gateway Error: Service warming up... (${err.message})`);
  }
});

const gatewayServer = http.createServer((req, res) => {
  const url = req.url || '/';

  // Route /api requests to backend
  if (url.startsWith('/api')) {
    proxy.web(req, res, { target: `http://127.0.0.1:${BACKEND_PORT}` });
    return;
  }

  // Route /admin requests to admin dashboard
  if (url.startsWith('/admin')) {
    proxy.web(req, res, { target: `http://127.0.0.1:${ADMIN_PORT}` });
    return;
  }

  // Default: Route everything else to xedom-lab frontend
  proxy.web(req, res, { target: `http://127.0.0.1:${FRONTEND_PORT}` });
});

// Proxy WebSocket connections (HMR)
gatewayServer.on('upgrade', (req, socket, head) => {
  const url = req.url || '';
  if (url.startsWith('/api')) {
    proxy.ws(req, socket, head, { target: `http://127.0.0.1:${BACKEND_PORT}` });
  } else if (url.startsWith('/admin')) {
    proxy.ws(req, socket, head, { target: `http://127.0.0.1:${ADMIN_PORT}` });
  } else {
    proxy.ws(req, socket, head, { target: `http://127.0.0.1:${FRONTEND_PORT}` });
  }
});

gatewayServer.listen(GATEWAY_PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `✨ Unified Gateway Server listening on http://localhost:${GATEWAY_PORT}`);
  console.log('   All apps accessible via unified single server or direct ports:');
  console.log(`   - Main Site : http://localhost:${GATEWAY_PORT}/        or http://localhost:3000`);
  console.log(`   - Admin     : http://localhost:${GATEWAY_PORT}/admin   or http://localhost:3001`);
  console.log(`   - Backend   : http://localhost:${GATEWAY_PORT}/api     or http://localhost:5000`);
});

// Clean up child processes on exit
const cleanup = () => {
  console.log('\nShutting down all Xedom services...');
  processes.forEach((p) => {
    try {
      p.kill('SIGINT');
    } catch {}
  });
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
