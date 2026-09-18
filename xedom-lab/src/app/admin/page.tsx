'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  X,
  Copy,
  MapPin,
  Trophy,
  Save,
  Play,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  PlusCircle,
} from 'lucide-react';
import { GithubIcon } from '../../components/Icons';

type AdminTab =
  | 'dashboard'
  | 'products'
  | 'news'
  | 'events'
  | 'ambassadors'
  | 'subscribers'
  | 'socials'
  | 'api-status';

interface SocialLink {
  id: string;
  name: string;
  platform: string;
  handle: string;
  url: string;
  badge?: string;
  description?: string;
}

interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  version: string;
  status: 'active' | 'beta' | 'rfc';
  githubUrl: string;
  installCommand?: string;
  tags: string[];
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
}

interface EventItem {
  id: string;
  title: string;
  type: string;
  date: string;
  time?: string;
  status: string;
  prizePool?: string;
  location: string;
  description: string;
  registrationUrl?: string;
}

interface AmbassadorApplication {
  id: string;
  name: string;
  email: string;
  githubUrl?: string;
  xUrl?: string;
  track: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source?: string;
}

// Initial fallback data
const initialProducts: Product[] = [
  {
    id: 'edgekv',
    title: 'EdgeKV',
    tagline: 'Ultra-low-latency distributed key-value store built for edge nodes',
    description: 'EdgeKV provides sub-millisecond atomic reads and writes with active-active CRDT consensus across edge worker networks.',
    category: 'Distributed Systems',
    version: 'v0.9.4',
    status: 'active',
    githubUrl: 'https://github.com/robel-hindeya',
    installCommand: 'curl -sSL https://xedomlab.com/install/edgekv.sh | bash',
    tags: ['Go', 'Raft', 'CRDT', 'Edge'],
  },
  {
    id: 'zeropipe',
    title: 'ZeroPipe',
    tagline: 'Zero-copy local IPC message bus over POSIX shared memory',
    description: 'ZeroPipe implements atomic compare-and-swap ring buffers with SIMD vectorized bulk reads for local process communication.',
    category: 'Low-Level & Kernel',
    version: 'v1.2.0',
    status: 'active',
    githubUrl: 'https://github.com/robel-hindeya',
    installCommand: 'cargo add zeropipe',
    tags: ['Rust', 'IPC', 'Shared Memory', 'SIMD'],
  },
  {
    id: 'axiom-mesh',
    title: 'Axiom Mesh',
    tagline: 'Decentralized peer discovery and encrypted NAT traversal overlay',
    description: 'Lightweight overlay mesh with automatic wireguard tunneling, UDP hole punching, and distributed peer table routing.',
    category: 'Networking',
    version: 'v0.6.1-beta',
    status: 'beta',
    githubUrl: 'https://github.com/robel-hindeya',
    installCommand: 'npm i -g @xedom/axiom-mesh',
    tags: ['TypeScript', 'WireGuard', 'P2P'],
  },
];

const initialSocials: SocialLink[] = [
  {
    id: 'x',
    name: 'X (Twitter)',
    platform: 'x',
    handle: '@robelhindeya',
    url: 'https://x.com/robelhindeya',
    badge: 'Social Feed',
    description: 'Engineering highlights, releases, and announcements.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    platform: 'linkedin',
    handle: 'in/robelhindeya',
    url: 'https://www.linkedin.com/in/robelhindeya/',
    badge: 'Network',
    description: 'Professional networking, technical leadership, and collaborations.',
  },
  {
    id: 'discord',
    name: 'Discord',
    platform: 'discord',
    handle: 'discord.gg/xedomlab',
    url: 'https://discord.com/channels/1515283832419520522/1515610695729938482',
    badge: 'Primary Hub',
    description: 'Voice lounges, live coding rooms, and active engineering discussions.',
  },
  {
    id: 'github',
    name: 'GitHub',
    platform: 'github',
    handle: 'robel-hindeya',
    url: 'https://github.com/robel-hindeya',
    badge: 'Open Source',
    description: 'Open source repositories, RFC specifications, and code contributions.',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    platform: 'telegram',
    handle: 't.me/xedomlabs',
    url: 'https://t.me/xedomlabs',
    badge: 'Fast Updates',
    description: 'Fast updates, technical announcements, and regional chat groups.',
  },
];

const initialNews: NewsItem[] = [
  {
    id: 'zeropipe-v12',
    title: 'ZeroPipe v1.2 Released: 40 Million ops/sec on Commodity NVMe',
    summary: 'Our atomic ring buffer engine now scales linearly across 32 cores with zero kernel context switches.',
    content: 'Standard UNIX domain sockets and pipes add substantial syscall overhead. ZeroPipe implements lock-free CAS ring buffers with AVX-512 SIMD vectorization.',
    category: 'Engineering',
    date: 'March 2026',
    readTime: '4 min read',
    author: 'Robel Hindeya',
    tags: ['Rust', 'Systems', 'Performance'],
  },
  {
    id: 'hackathon-spring',
    title: 'Xedom Spring Hackathon 2026: Registration Open',
    summary: 'Join 500+ builders competing for $15,000 in bounties across systems, AI infrastructure, and edge apps.',
    content: 'Teams will build over 48 hours with mentorship from core maintainers and sponsor technical leaders.',
    category: 'Community',
    date: 'March 2026',
    readTime: '3 min read',
    author: 'Xedom Lab Team',
    tags: ['Hackathon', 'Community', 'Bounties'],
  },
];

const initialEvents: EventItem[] = [
  {
    id: 'spring-hack',
    title: 'Xedom Spring Distributed Systems Hackathon',
    type: 'Hackathon',
    date: 'April 18-20, 2026',
    time: '48 Hours Continuous',
    status: 'upcoming',
    prizePool: '$15,000 Bounty Pool',
    location: 'Virtual / Global Discord Hub',
    description: 'Build fast, resilient distributed primitives and micro-services on top of open Xedom specifications.',
    registrationUrl: 'https://discord.com/channels/1515283832419520522/1515610695729938482',
  },
  {
    id: 'rust-workshop',
    title: 'Deep Dive: Lock-Free Shared Memory in Rust',
    type: 'Workshop',
    date: 'March 28, 2026',
    time: '18:00 UTC',
    status: 'upcoming',
    location: 'Discord Voice & Screen Lounge',
    description: 'Hands-on architectural walkthrough of ring buffers, memory barriers, and SIMD reads.',
    registrationUrl: 'https://discord.com/channels/1515283832419520522/1515610695729938482',
  },
];

const initialAmbassadors: AmbassadorApplication[] = [
  {
    id: 'amb-001',
    name: 'Alex Chen',
    email: 'alex.chen@berkeley.edu',
    githubUrl: 'https://github.com/alexchen-dev',
    xUrl: 'https://x.com/alexchen_eng',
    track: 'Campus Lead & Systems Engineer',
    reason: 'Active organizer of our university systems club. Want to host Xedom workshops and build on EdgeKV.',
    status: 'approved',
    submittedAt: '2026-03-12T14:30:00Z',
  },
  {
    id: 'amb-002',
    name: 'Sarah Lindqvist',
    email: 'sarah.l@kth.se',
    githubUrl: 'https://github.com/slindqvist',
    xUrl: 'https://x.com/sarahlindqvist',
    track: 'Technical Writer & Rust Contributor',
    reason: 'Passionate about documenting low-level RFCs and creating interactive code guides for ZeroPipe.',
    status: 'pending',
    submittedAt: '2026-03-15T09:15:00Z',
  },
];

const initialSubscribers: Subscriber[] = [
  { id: 'sub-01', email: 'dev@xedomlab.com', subscribedAt: '2026-01-01T12:00:00Z', source: 'homepage_hero' },
  { id: 'sub-02', email: 'robel@hindeya.org', subscribedAt: '2026-02-10T15:22:00Z', source: 'join_modal' },
];

export default function AdminPage() {
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [ambassadors, setAmbassadors] = useState<AmbassadorApplication[]>(initialAmbassadors);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [socials, setSocials] = useState<SocialLink[]>(initialSocials);
  const [backendOnline, setBackendOnline] = useState(false);
  const [latency, setLatency] = useState(0);

  // Modals state
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', tagline: '', description: '', version: 'v1.0.0', githubUrl: 'https://github.com/robel-hindeya', tags: 'Rust, Systems' });
  
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', summary: '', content: '', category: 'Engineering' });

  const [copiedEmails, setCopiedEmails] = useState(false);
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [editSocialUrl, setEditSocialUrl] = useState('');
  const [editSocialHandle, setEditSocialHandle] = useState('');
  const [testingUrl, setTestingUrl] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<any>(null);

  // Ping backend check
  const pingBackend = async () => {
    const start = performance.now();
    try {
      const res = await fetch('/api/health');
      setLatency(Math.round(performance.now() - start));
      if (res.ok) {
        setBackendOnline(true);
        // Attempt to sync products, news, events from backend if available
        try {
          const pRes = await fetch('/api/products');
          if (pRes.ok) {
            const pData = await pRes.json();
            if (pData.data && pData.data.length > 0) setProducts(pData.data);
          }
        } catch {}
      } else {
        setBackendOnline(false);
      }
    } catch {
      setBackendOnline(false);
      setLatency(0);
    }
  };

  useEffect(() => {
    pingBackend();
    const interval = setInterval(pingBackend, 6000);
    return () => clearInterval(interval);
  }, []);

  const pendingAmbassadorsCount = ambassadors.filter((a) => a.status === 'pending').length;

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title) return;
    const p: Product = {
      id: `prod-${Date.now()}`,
      title: newProduct.title,
      tagline: newProduct.tagline,
      description: newProduct.description,
      category: 'Distributed Systems',
      version: newProduct.version,
      status: 'active',
      githubUrl: newProduct.githubUrl,
      tags: newProduct.tags.split(',').map((s) => s.trim()),
    };
    setProducts([p, ...products]);
    setShowProductModal(false);
    setNewProduct({ title: '', tagline: '', description: '', version: 'v1.0.0', githubUrl: 'https://github.com/robel-hindeya', tags: 'Rust, Systems' });
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title) return;
    const item: NewsItem = {
      id: `news-${Date.now()}`,
      title: newNews.title,
      summary: newNews.summary || newNews.title,
      content: newNews.content,
      category: newNews.category,
      date: 'March 2026',
      readTime: '3 min read',
      author: 'Robel Hindeya',
      tags: ['Engineering', 'Release'],
    };
    setNews([item, ...news]);
    setShowNewsModal(false);
    setNewNews({ title: '', summary: '', content: '', category: 'Engineering' });
  };

  const handleStatusAmbassador = (id: string, status: 'approved' | 'rejected') => {
    setAmbassadors(ambassadors.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const handleCopyEmails = () => {
    const text = subscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(text);
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 2000);
  };

  const handleSaveSocial = (id: string) => {
    setSocials(
      socials.map((s) => (s.id === id ? { ...s, url: editSocialUrl, handle: editSocialHandle } : s))
    );
    setEditingSocialId(null);
  };

  const runTestEndpoint = async (url: string) => {
    setTestingUrl(url);
    try {
      const res = await fetch(url);
      const json = await res.json();
      setTestResult({ status: res.status, ok: res.ok, data: json });
    } catch (e: any) {
      setTestResult({ status: 500, ok: false, error: e.message });
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex font-sans">
      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION                                                        */}
      {/* ========================================================================= */}
      <aside className="w-64 bg-black border-r border-neutral-800 flex flex-col shrink-0 h-screen sticky top-0">
        {/* Header Branding */}
        <div className="h-14 border-b border-neutral-800 flex items-center px-5 gap-3">
          <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-black font-mono font-black text-sm">
            X
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white">xedom-admin</span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              Control Plane
            </span>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
            Navigation
          </div>

          {[
            { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products' as AdminTab, label: 'Products & Code', icon: Box },
            { id: 'news' as AdminTab, label: 'News & RFCs', icon: Newspaper },
            { id: 'events' as AdminTab, label: 'Events & Hacks', icon: Calendar },
            {
              id: 'ambassadors' as AdminTab,
              label: 'Ambassadors',
              icon: Users,
              badge: pendingAmbassadorsCount > 0 ? `${pendingAmbassadorsCount} new` : undefined,
            },
            { id: 'subscribers' as AdminTab, label: 'Waitlist & Subs', icon: Mail },
            { id: 'socials' as AdminTab, label: 'Social Channels', icon: Share2 },
            { id: 'api-status' as AdminTab, label: 'API & Health', icon: Activity },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
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
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-neutral-800 bg-[#050505]">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>backend:5000</span>
            <span
              className={`ml-auto w-2 h-2 rounded-full ${
                backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-600'
              }`}
            />
          </div>
          <div className="mt-2 text-[10px] font-mono text-neutral-500 truncate">
            admin: Robel Hindeya
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN VIEW AREA                                                            */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top bar */}
        <header className="h-14 border-b border-neutral-800 bg-black/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-500 uppercase">xedom-lab /</span>
            <span className="text-sm font-bold text-white capitalize">{currentTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={pingBackend}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ping API</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Verified</span>
            </div>
          </div>
        </header>

        {/* Content Tabs */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* ===================================================================== */}
          {/* TAB 1: DASHBOARD OVERVIEW                                            */}
          {/* ===================================================================== */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Operational Banner */}
              <div className="p-5 rounded-xl border border-neutral-800 bg-gradient-to-r from-neutral-900 to-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                      {backendOnline ? 'Full Stack Connected' : 'Local Standalone Mode'}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Xedom Lab Admin Console
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Live endpoint: http://localhost:3000/admin · Microservices: [ backend/ :5000 ] · [ xedom-lab/ :3000 ]
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTab('products')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-black text-xs font-mono font-semibold hover:bg-neutral-200 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Manage Products</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400 uppercase">Products</span>
                    <Box className="w-4 h-4 text-neutral-400" />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white">{products.length}</span>
                    <span className="text-[11px] font-mono text-neutral-500">EdgeKV, ZeroPipe...</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400 uppercase">News & RFCs</span>
                    <Newspaper className="w-4 h-4 text-neutral-400" />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white">{news.length}</span>
                    <span className="text-[11px] font-mono text-neutral-500">Published articles</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400 uppercase">Ambassadors</span>
                    <Users className="w-4 h-4 text-neutral-400" />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white">{ambassadors.length}</span>
                    <span className="text-[11px] font-mono text-amber-400">
                      {pendingAmbassadorsCount} pending
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400 uppercase">Subscribers</span>
                    <Mail className="w-4 h-4 text-neutral-400" />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white">{subscribers.length}</span>
                    <span className="text-[11px] font-mono text-neutral-500">Developers</span>
                  </div>
                </div>
              </div>

              {/* Architecture & Profiles */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Microservice Architecture
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between h-32">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase">Port 3000</span>
                        <h4 className="text-sm font-bold text-white mt-0.5">xedom-lab & /admin</h4>
                        <p className="text-xs text-neutral-400 mt-0.5">Next.js 16 Web & Admin App</p>
                      </div>
                      <Link
                        href="/"
                        className="flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300"
                      >
                        <span>Visit Homepage</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between h-32">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase">Port 5000</span>
                        <h4 className="text-sm font-bold text-white mt-0.5">backend</h4>
                        <p className="text-xs text-neutral-400 mt-0.5">Express + TypeScript REST API</p>
                      </div>
                      <a
                        href="/api/health"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300"
                      >
                        <span>Check /api/health</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Fast Action Buttons */}
                  <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a]">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                      Quick Shortcuts
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setCurrentTab('ambassadors')}
                        className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white"
                      >
                        Review Ambassador Applications ({pendingAmbassadorsCount})
                      </button>
                      <button
                        onClick={() => setCurrentTab('socials')}
                        className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white"
                      >
                        Configure Robel Hindeya's Social Links
                      </button>
                      <button
                        onClick={() => setCurrentTab('events')}
                        className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white"
                      >
                        Schedule Hackathons
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Robel's Socials Card */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Configured Social Profiles
                  </h3>

                  <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] space-y-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                      <span className="text-neutral-400">X (Twitter)</span>
                      <a href="https://x.com/robelhindeya" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                        @robelhindeya
                      </a>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                      <span className="text-neutral-400">LinkedIn</span>
                      <a href="https://www.linkedin.com/in/robelhindeya/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                        in/robelhindeya
                      </a>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                      <span className="text-neutral-400">Discord Hub</span>
                      <a href="https://discord.com/channels/1515283832419520522/1515610695729938482" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                        Active Channel
                      </a>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                      <span className="text-neutral-400">GitHub</span>
                      <a href="https://github.com/robel-hindeya" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                        robel-hindeya
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Telegram</span>
                      <a href="https://t.me/xedomlabs" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                        t.me/xedomlabs
                      </a>
                    </div>

                    <button
                      onClick={() => setCurrentTab('socials')}
                      className="w-full mt-2 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 hover:text-white"
                    >
                      Edit Social Links &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 2: PRODUCTS CATALOG                                              */}
          {/* ===================================================================== */}
          {currentTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Product & Tooling Catalog</h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    {products.length} open-source systems projects published
                  </p>
                </div>
                <button
                  onClick={() => setShowProductModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-black text-xs font-mono font-semibold hover:bg-neutral-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between hover:border-neutral-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-bold text-white">{p.title}</h3>
                          <span className="text-[10px] font-mono text-neutral-500">{p.version}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {p.status}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-300 font-medium mt-2.5">{p.tagline}</p>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{p.description}</p>

                      {p.installCommand && (
                        <div className="mt-3 p-2 rounded bg-black border border-neutral-900 flex items-center gap-1.5 text-[11px] font-mono text-neutral-300 truncate">
                          <Terminal className="w-3 h-3 text-neutral-500 shrink-0" />
                          <span>{p.installCommand}</span>
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-1">
                        {p.tags.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded bg-neutral-900 text-[10px] font-mono text-neutral-400 border border-neutral-800">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Repo</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <button
                        onClick={() => setProducts(products.filter((item) => item.id !== p.id))}
                        className="p-1 rounded hover:bg-red-500/20 text-neutral-500 hover:text-red-400"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Product Modal */}
              {showProductModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl max-w-lg w-full p-6 space-y-4">
                    <h3 className="text-base font-bold text-white">Add New Product</h3>
                    <form onSubmit={handleAddProduct} className="space-y-3 font-mono text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={newProduct.title}
                          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={newProduct.tagline}
                          onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Description</label>
                        <textarea
                          rows={3}
                          required
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowProductModal(false)}
                          className="px-3 py-1.5 rounded bg-neutral-800 text-neutral-300"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="px-4 py-1.5 rounded bg-white text-black font-semibold">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 3: NEWS & RFC DROPS                                              */}
          {/* ===================================================================== */}
          {currentTab === 'news' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">News & Technical RFCs</h2>
                  <p className="text-xs text-neutral-400 font-mono">{news.length} published drops</p>
                </div>
                <button
                  onClick={() => setShowNewsModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-black text-xs font-mono font-semibold hover:bg-neutral-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Article</span>
                </button>
              </div>

              <div className="space-y-3">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase">
                          {item.category}
                        </span>
                        <span>{item.date}</span>
                        <span>· {item.readTime}</span>
                        <span>· By {item.author}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-neutral-400">{item.summary}</p>
                    </div>
                    <button
                      onClick={() => setNews(news.filter((n) => n.id !== item.id))}
                      className="p-1 rounded hover:bg-red-500/20 text-neutral-500 hover:text-red-400 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add News Modal */}
              {showNewsModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl max-w-lg w-full p-6 space-y-4">
                    <h3 className="text-base font-bold text-white">Publish Article / RFC</h3>
                    <form onSubmit={handleAddNews} className="space-y-3 font-mono text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={newNews.title}
                          onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Summary</label>
                        <input
                          type="text"
                          value={newNews.summary}
                          onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Content</label>
                        <textarea
                          rows={4}
                          required
                          value={newNews.content}
                          onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowNewsModal(false)}
                          className="px-3 py-1.5 rounded bg-neutral-800 text-neutral-300"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="px-4 py-1.5 rounded bg-white text-black font-semibold">
                          Publish
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 4: EVENTS & HACKATHONS                                           */}
          {/* ===================================================================== */}
          {currentTab === 'events' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Events & Hackathons</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  {events.length} community events scheduled
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((ev) => (
                  <div key={ev.id} className="p-5 rounded-xl border border-neutral-800 bg-[#0a0a0a] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-neutral-900 text-[10px] font-mono text-neutral-400 uppercase">
                        {ev.type}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">
                        {ev.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{ev.title}</h3>
                    <p className="text-xs text-neutral-400">{ev.description}</p>
                    <div className="space-y-1 text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-900">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{ev.date} · {ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{ev.location}</span>
                      </div>
                      {ev.prizePool && (
                        <div className="flex items-center gap-2 text-amber-400">
                          <Trophy className="w-3.5 h-3.5" />
                          <span>{ev.prizePool}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 5: AMBASSADORS REVIEW                                            */}
          {/* ===================================================================== */}
          {currentTab === 'ambassadors' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Ambassador & Fellowship Applications</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  {ambassadors.length} total applications · {pendingAmbassadorsCount} pending review
                </p>
              </div>

              <div className="space-y-3">
                {ambassadors.map((app) => (
                  <div key={app.id} className="p-5 rounded-xl border border-neutral-800 bg-[#0a0a0a] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{app.name}</h3>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                              app.status === 'approved'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : app.status === 'pending'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-red-500/10 text-red-400'
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-neutral-400 mt-0.5">{app.email} · {app.track}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {app.status !== 'approved' && (
                          <button
                            onClick={() => handleStatusAmbassador(app.id, 'approved')}
                            className="flex items-center gap-1 px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20"
                          >
                            <Check className="w-3 h-3" />
                            <span>Approve</span>
                          </button>
                        )}
                        {app.status !== 'rejected' && (
                          <button
                            onClick={() => handleStatusAmbassador(app.id, 'rejected')}
                            className="flex items-center gap-1 px-3 py-1 rounded bg-neutral-900 text-neutral-400 text-xs font-mono border border-neutral-800"
                          >
                            <X className="w-3 h-3" />
                            <span>Reject</span>
                          </button>
                        )}
                        <button
                          onClick={() => setAmbassadors(ambassadors.filter((a) => a.id !== app.id))}
                          className="p-1 rounded text-neutral-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-black border border-neutral-900 text-xs text-neutral-300 font-mono">
                      <span className="text-[10px] text-neutral-500 block mb-0.5 uppercase">Statement:</span>
                      {app.reason}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
                      {app.githubUrl && (
                        <a href={app.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white">
                          <GithubIcon className="w-3 h-3" />
                          <span>GitHub</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {app.xUrl && (
                        <a href={app.xUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white">
                          <span>X Profile</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 6: WAITLIST & SUBSCRIBERS                                        */}
          {/* ===================================================================== */}
          {currentTab === 'subscribers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Waitlist & Drops Subscribers</h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    {subscribers.length} total active developer signups
                  </p>
                </div>
                <button
                  onClick={handleCopyEmails}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                >
                  {copiedEmails ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmails ? 'Copied All' : 'Copy All Emails'}</span>
                </button>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-[#0a0a0a] overflow-hidden font-mono text-xs">
                <table className="w-full text-left">
                  <thead className="bg-black/50 border-b border-neutral-800 text-neutral-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-5 py-3">Email</th>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Source</th>
                      <th className="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900">
                    {subscribers.map((s) => (
                      <tr key={s.id} className="hover:bg-neutral-900/40">
                        <td className="px-5 py-3 text-white font-medium">{s.email}</td>
                        <td className="px-5 py-3 text-neutral-400">{new Date(s.subscribedAt).toLocaleDateString()}</td>
                        <td className="px-5 py-3">
                          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400">
                            {s.source || 'web'}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            onClick={() => setSubscribers(subscribers.filter((item) => item.id !== s.id))}
                            className="p-1 rounded text-neutral-500 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 7: ROBEL HINDEYA'S SOCIALS                                       */}
          {/* ===================================================================== */}
          {currentTab === 'socials' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Robel Hindeya's Official Social Links</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Configured endpoints synchronized across website headers, footers, join modals, and API
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socials.map((s) => {
                  const isEditing = editingSocialId === s.id;
                  return (
                    <div key={s.id} className="p-5 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white">{s.name}</span>
                          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400">
                            {s.badge}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1">{s.description}</p>

                        {isEditing ? (
                          <div className="mt-3 space-y-2 font-mono text-xs">
                            <input
                              type="text"
                              value={editSocialHandle}
                              onChange={(e) => setEditSocialHandle(e.target.value)}
                              placeholder="Handle"
                              className="w-full px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-white"
                            />
                            <input
                              type="text"
                              value={editSocialUrl}
                              onChange={(e) => setEditSocialUrl(e.target.value)}
                              placeholder="Target URL"
                              className="w-full px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-white"
                            />
                          </div>
                        ) : (
                          <div className="mt-3 p-2.5 rounded bg-black border border-neutral-900 font-mono text-xs space-y-1">
                            <div className="text-neutral-300">
                              <span className="text-neutral-500">Handle: </span>
                              {s.handle}
                            </div>
                            <div className="text-cyan-400 truncate">
                              <span className="text-neutral-500">URL: </span>
                              {s.url}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingSocialId(null)}
                              className="px-2.5 py-1 rounded bg-neutral-800 text-xs font-mono text-neutral-300"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveSocial(s.id)}
                              className="flex items-center gap-1 px-3 py-1 rounded bg-white text-black text-xs font-mono font-semibold"
                            >
                              <Save className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingSocialId(s.id);
                              setEditSocialUrl(s.url);
                              setEditSocialHandle(s.handle);
                            }}
                            className="px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 8: API DIAGNOSTICS & HEALTH                                      */}
          {/* ===================================================================== */}
          {currentTab === 'api-status' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Backend REST API Diagnostics</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Test live microservice connectivity from http://localhost:3000 to backend:5000
                </p>
              </div>

              {/* Status Header */}
              <div className="p-5 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex items-center justify-between font-mono">
                <div className="flex items-center gap-3">
                  {backendOnline ? (
                    <CheckCircle className="w-7 h-7 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-amber-400" />
                  )}
                  <div>
                    <div className="text-sm font-bold text-white">
                      Status: {backendOnline ? 'Online (200 OK)' : 'Offline / Standalone fallback'}
                    </div>
                    <div className="text-xs text-neutral-400">Endpoint: /api/health</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-500">ROUNDTRIP LATENCY</div>
                  <div className="text-base font-bold text-white">{latency} ms</div>
                </div>
              </div>

              {/* Endpoint Runners */}
              <div className="rounded-xl border border-neutral-800 bg-[#0a0a0a] divide-y divide-neutral-900 overflow-hidden font-mono text-xs">
                {[
                  { method: 'GET', path: '/api/health', desc: 'System health probe' },
                  { method: 'GET', path: '/api/products', desc: 'Products list' },
                  { method: 'GET', path: '/api/news', desc: 'News & RFC items' },
                  { method: 'GET', path: '/api/events', desc: 'Events list' },
                  { method: 'GET', path: '/api/socials', desc: 'Social channels' },
                  { method: 'GET', path: '/api/ambassadors', desc: 'Ambassador applications' },
                ].map((ep) => (
                  <div key={ep.path} className="p-3.5 flex items-center justify-between hover:bg-neutral-900/40">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-neutral-900 text-emerald-400 font-bold text-[10px]">
                        {ep.method}
                      </span>
                      <span className="text-white font-medium">{ep.path}</span>
                      <span className="text-neutral-500 text-[11px] hidden sm:inline">· {ep.desc}</span>
                    </div>

                    <button
                      onClick={() => runTestEndpoint(ep.path)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
                    >
                      <Play className="w-3 h-3" />
                      <span>Test Endpoint</span>
                    </button>
                  </div>
                ))}
              </div>

              {testResult && (
                <div className="p-4 rounded-xl border border-neutral-800 bg-black font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Response from {testingUrl}:</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        testResult.ok ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'
                      }`}
                    >
                      HTTP {testResult.status}
                    </span>
                  </div>
                  <pre className="p-3 rounded bg-[#0a0a0a] border border-neutral-900 text-neutral-300 overflow-x-auto max-h-60">
                    {JSON.stringify(testResult.data || testResult.error, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
