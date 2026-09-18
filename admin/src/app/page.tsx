'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Newspaper,
  Calendar,
  Users,
  Mail,
  ArrowUpRight,
  PlusCircle,
} from 'lucide-react';
import { Header } from '../components/Header';
import { StatCard } from '../components/StatCard';
import { DashboardStats } from '../types';
import { api } from '../services/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 3,
    totalNews: 2,
    totalEvents: 2,
    totalAmbassadors: 2,
    pendingAmbassadors: 1,
    totalSubscribers: 2,
    serverUptime: 0,
    status: 'healthy',
  });

  const loadStats = async () => {
    const data = await api.getStats();
    setStats(data);
  };

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header
        title="Mission Control Overview"
        subtitle="Next.js Control Plane · System metrics, microservices & telemetry"
        onRefresh={loadStats}
      />

      <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-6 overflow-y-auto">
        {/* Top Operational Banner */}
        <div className="p-5 rounded-xl border border-neutral-800 bg-gradient-to-r from-neutral-900 to-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                All Systems Operational
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Xedom Lab — Next.js Admin Console
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              Monorepo: [ backend/ :5000 ] · [ admin/ :3001 (Next.js) ] · [ xedom-lab/ :3000 (Next.js) ]
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/products"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-black text-xs font-mono font-semibold hover:bg-neutral-200 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Manage Products</span>
            </Link>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Open Products"
            value={stats.totalProducts}
            change="EdgeKV, ZeroPipe, Axiom"
            icon={Box}
          />
          <StatCard
            label="News & RFCs"
            value={stats.totalNews}
            change="Published articles"
            icon={Newspaper}
          />
          <StatCard
            label="Ambassadors"
            value={stats.totalAmbassadors}
            change={`${stats.pendingAmbassadors} pending review`}
            icon={Users}
          />
          <StatCard
            label="Waitlist & Subs"
            value={stats.totalSubscribers}
            change="Active developers"
            icon={Mail}
          />
        </div>

        {/* Quick Launch & Monorepo Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Unified Full-Stack Architecture
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between h-36">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Port 3000</span>
                  <h4 className="text-sm font-bold text-white mt-1">xedom-lab</h4>
                  <p className="text-xs text-neutral-400 mt-1">Next.js 16 public frontend</p>
                </div>
                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300"
                >
                  <span>Launch Site</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between h-36">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Port 5000</span>
                  <h4 className="text-sm font-bold text-white mt-1">backend</h4>
                  <p className="text-xs text-neutral-400 mt-1">Express & TypeScript REST API</p>
                </div>
                <a
                  href="http://localhost:5000/api/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300"
                >
                  <span>View /api/health</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between h-36">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Port 3001</span>
                  <h4 className="text-sm font-bold text-white mt-1">admin</h4>
                  <p className="text-xs text-neutral-400 mt-1">Next.js App Router Console</p>
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  ● Active Console
                </span>
              </div>
            </div>

            {/* Management Shortcuts */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a]">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                Fast Management Actions
              </h4>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/ambassadors"
                  className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  Review Ambassador Applications ({stats.pendingAmbassadors})
                </Link>
                <Link
                  href="/socials"
                  className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  Manage Robel Hindeya's Social Links
                </Link>
                <Link
                  href="/events"
                  className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  Schedule Hackathons & Workshops
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Server telemetry */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Backend Microservice Status
            </h3>

            <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">API Status:</span>
                <span className="text-emerald-400 font-semibold">Online (200 OK)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Server Uptime:</span>
                <span className="text-white">{stats.serverUptime}s</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Environment:</span>
                <span className="text-white">development</span>
              </div>
              <div className="pt-2 border-t border-neutral-800">
                <Link
                  href="/api-status"
                  className="block text-center w-full py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  Run API Diagnostics &rarr;
                </Link>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a]">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Configured Profiles
              </h4>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="text-neutral-300 flex items-center justify-between">
                  <span>X / Twitter</span>
                  <span className="text-neutral-500">@robelhindeya</span>
                </div>
                <div className="text-neutral-300 flex items-center justify-between">
                  <span>GitHub</span>
                  <span className="text-neutral-500">robel-hindeya</span>
                </div>
                <div className="text-neutral-300 flex items-center justify-between">
                  <span>LinkedIn</span>
                  <span className="text-neutral-500">in/robelhindeya</span>
                </div>
                <div className="text-neutral-300 flex items-center justify-between">
                  <span>Telegram</span>
                  <span className="text-neutral-500">t.me/xedomlabs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
