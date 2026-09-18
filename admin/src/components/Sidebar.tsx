'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Box,
  Newspaper,
  Calendar,
  Users,
  Mail,
  Share2,
  Activity,
  Terminal,
} from 'lucide-react';

interface SidebarProps {
  pendingAmbassadorsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ pendingAmbassadorsCount = 0 }) => {
  const pathname = usePathname();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/products', label: 'Products & Code', icon: Box },
    { path: '/news', label: 'News & RFCs', icon: Newspaper },
    { path: '/events', label: 'Events & Hacks', icon: Calendar },
    {
      path: '/ambassadors',
      label: 'Ambassadors',
      icon: Users,
      badge: pendingAmbassadorsCount > 0 ? `${pendingAmbassadorsCount} new` : undefined,
    },
    { path: '/subscribers', label: 'Waitlist & Subs', icon: Mail },
    { path: '/socials', label: 'Social Channels', icon: Share2 },
    { path: '/api-status', label: 'API & Health', icon: Activity },
  ];

  return (
    <aside className="w-64 bg-black border-r border-neutral-800 flex flex-col shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div className="h-16 border-b border-neutral-800 flex items-center px-5 gap-3">
        <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-black font-mono font-black text-sm">
          X
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-tight text-white">xedom-admin</span>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            Next.js Console
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
          Management
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/'
              ? pathname === '/'
              : pathname === item.path || pathname.startsWith(item.path + '/');

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-colors ${
                isActive
                  ? 'bg-neutral-900 text-white font-semibold border border-neutral-700'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-medium border border-amber-500/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-neutral-800 bg-[#050505]">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>backend:5000</span>
          <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="mt-2 text-[10px] font-mono text-neutral-500 truncate">
          admin: Robel Hindeya
        </div>
      </div>
    </aside>
  );
};
