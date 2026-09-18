import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, Play, Terminal } from 'lucide-react';
import { api } from '../services/api';

export const ApiStatus: React.FC = () => {
  const [health, setHealth] = useState<{ status: string; uptime: number; latency: number }>({
    status: 'checking',
    uptime: 0,
    latency: 0,
  });
  const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);
  const [endpointResult, setEndpointResult] = useState<any>(null);

  const checkHealth = async () => {
    const res = await api.getHealth();
    setHealth(res);
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  const endpoints = [
    { method: 'GET', path: 'http://localhost:5000/api/health', desc: 'System health & uptime' },
    { method: 'GET', path: 'http://localhost:5000/api/products', desc: 'Product catalog' },
    { method: 'GET', path: 'http://localhost:5000/api/news', desc: 'News & RFC drops' },
    { method: 'GET', path: 'http://localhost:5000/api/events', desc: 'Events & hackathons' },
    { method: 'GET', path: 'http://localhost:5000/api/socials', desc: 'Social channels' },
    { method: 'GET', path: 'http://localhost:5000/api/ambassadors', desc: 'Ambassador applications' },
  ];

  const testEndpoint = async (url: string) => {
    setTestingEndpoint(url);
    try {
      const res = await fetch(url);
      const json = await res.json();
      setEndpointResult({ status: res.status, ok: res.ok, data: json });
    } catch (err: any) {
      setEndpointResult({ status: 500, ok: false, error: err.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Backend Health & API Tester</h2>
          <p className="text-xs text-neutral-400 font-mono">
            Direct inspection of localhost:5000 microservice
          </p>
        </div>

        <button
          onClick={checkHealth}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Ping Now</span>
        </button>
      </div>

      {/* Health Overview Banner */}
      <div className="p-5 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-3">
          {health.status === 'operational' || health.status === 'ok' ? (
            <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />
          )}
          <div>
            <div className="text-sm font-bold text-white capitalize">
              Backend Status: {health.status}
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">
              Target: http://localhost:5000/api/health
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase">Latency</span>
            <span className="text-white font-bold">{health.latency} ms</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase">Server Uptime</span>
            <span className="text-white font-bold">{health.uptime}s</span>
          </div>
        </div>
      </div>

      {/* Endpoints Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Available REST Endpoints
        </h3>

        <div className="rounded-xl border border-neutral-800 bg-[#0a0a0a] divide-y divide-neutral-900 overflow-hidden font-mono text-xs">
          {endpoints.map((ep) => (
            <div
              key={ep.path}
              className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-neutral-900/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-emerald-400 font-bold">
                  {ep.method}
                </span>
                <span className="text-white font-medium truncate">{ep.path}</span>
                <span className="text-neutral-500 text-[11px] hidden md:inline">· {ep.desc}</span>
              </div>

              <button
                onClick={() => testEndpoint(ep.path)}
                disabled={testingEndpoint === ep.path}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs shrink-0"
              >
                <Play className="w-3 h-3" />
                <span>Test Endpoint</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Test Result Inspector */}
      {endpointResult && (
        <div className="p-4 rounded-xl border border-neutral-800 bg-black font-mono text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Response from {testingEndpoint}:</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                endpointResult.ok ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'
              }`}
            >
              HTTP {endpointResult.status}
            </span>
          </div>
          <pre className="p-3 rounded bg-[#0a0a0a] border border-neutral-900 text-neutral-300 overflow-x-auto max-h-60">
            {JSON.stringify(endpointResult.data || endpointResult.error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
