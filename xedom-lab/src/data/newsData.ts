export interface NewsComment {
  id: string;
  author: string;
  handle: string;
  avatarText: string;
  content: string;
  timeAgo: string;
}

export interface NewsPost {
  id: string;
  author: {
    name: string;
    handle: string;
    avatarText: string;
    role: string;
    verified?: boolean;
  };
  timeAgo: string;
  category: 'All' | 'Releases' | 'Engineering' | 'Hackathons' | 'Community';
  title?: string;
  content: string;
  tags: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
  image?: {
    url: string;
    caption?: string;
  };
  linkPreview?: {
    title: string;
    description: string;
    url: string;
    domain: string;
  };
  metrics: {
    likes: number;
    reposts: number;
    replies: number;
  };
  comments: NewsComment[];
}

export const newsCategories = [
  { id: 'All', label: 'All Dispatches', icon: 'zap' },
  { id: 'Releases', label: 'Releases & Tags', icon: 'rocket' },
  { id: 'Engineering', label: 'Engineering Deep Dives', icon: 'cpu' },
  { id: 'Hackathons', label: 'Hackathons & Grants', icon: 'trophy' },
  { id: 'Community', label: 'Community & Demos', icon: 'users' },
] as const;

export const trendingTopics = [
  { tag: '#wasmmesh', count: '1.8k posts', category: 'Engineering' },
  { tag: '#devmesh-v2.4', count: '940 posts', category: 'Releases' },
  { tag: '#zeropipe', count: '1.4k posts', category: 'Engineering' },
  { tag: '#hackathon2026', count: '2.1k posts', category: 'Hackathons' },
  { tag: '#ebpf-bypass', count: '820 posts', category: 'Engineering' },
  { tag: '#localfirst', count: '3.4k posts', category: 'Community' },
];

export const recommendedBuilders = [
  {
    name: 'Dr. Elena Rostova',
    handle: '@erostova',
    avatarText: 'ER',
    role: 'Lead Compiler Engineer · LLVM / Rust',
    following: false,
  },
  {
    name: 'Marcus Chen',
    handle: '@mchen_dev',
    avatarText: 'MC',
    role: 'Core Systems Maintainer · eBPF',
    following: true,
  },
  {
    name: 'Torben Lindholm',
    handle: '@tlindholm',
    avatarText: 'TL',
    role: 'Kernel Contributor · ZeroPipe',
    following: false,
  },
  {
    name: 'Sophia Lindqvist',
    handle: '@sophia_l',
    avatarText: 'SL',
    role: 'Principal Systems Researcher',
    following: false,
  },
];

export const initialNewsPosts: NewsPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Marcus Chen',
      handle: '@mchen_dev',
      avatarText: 'MC',
      role: 'Core Systems Maintainer',
      verified: true,
    },
    timeAgo: '14m ago',
    category: 'Releases',
    title: 'Xedom DevMesh v2.4.0 is now live! 🚀',
    content: 'We just shipped v2.4.0 of Xedom DevMesh CLI! This release introduces kernel-level eBPF packet bypass and direct STUN/ICE peer negotiation. You can now tunnel localhost dev ports, forward UDP streams, and pair terminal sessions across continents with sub-0.8ms peer latency without a single cloud relay.',
    tags: ['#release', '#devmesh-v2.4', '#ebpf-bypass', '#networking'],
    codeSnippet: {
      language: 'bash',
      code: 'curl -fsSL https://xedom.dev/install.sh | bash\nxedom devmesh tunnel --peer @elena --port 8080',
    },
    linkPreview: {
      title: 'Xedom DevMesh v2.4 Release Notes & Benchmarks',
      description: 'Zero-cloud peer-to-peer workspace tunneling with eBPF bypass and multi-port proxying.',
      url: 'https://docs.xedom.dev/releases/v2.4',
      domain: 'docs.xedom.dev',
    },
    metrics: {
      likes: 342,
      reposts: 78,
      replies: 24,
    },
    comments: [
      {
        id: 'c1',
        author: 'Alex Vance',
        handle: '@avance_sys',
        avatarText: 'AV',
        content: 'Tested the eBPF bypass between Tokyo and SF nodes. Roundtrip dropped from 14ms down to raw fiber limits. Phenomenal work team!',
        timeAgo: '10m ago',
      },
      {
        id: 'c2',
        author: 'Sarah Jenkins',
        handle: '@sjenkins_sec',
        avatarText: 'SJ',
        content: 'Clean wireguard handshake primitives. Audited the memory bounds in the Go transport layer — zero heap allocations during sustained socket streaming.',
        timeAgo: '4m ago',
      },
    ],
  },
  {
    id: 'post-2',
    author: {
      name: 'Xedom Collective',
      handle: '@xedomlab',
      avatarText: 'XL',
      role: 'Official Announcement',
      verified: true,
    },
    timeAgo: '2h ago',
    category: 'Hackathons',
    title: 'Flagship Sprint: Xedom Global Hackathon 2026 Registration Open! 🏆',
    content: 'The countdown begins! 48 hours of uninterrupted open-source creation. We have allocated $15,000 in equity-free builder grants across 4 engineering tracks:\n\n1. High-Throughput Systems & eBPF\n2. Local-First & Edge WASM Runtimes\n3. Distributed Consensus & Storage\n4. Fast Developer Tooling & CLIs\n\nAll repos submitted to GitHub Classroom will receive peer architecture audits from our panel judges.',
    tags: ['#hackathon2026', '#grants', '#opensource', '#systems'],
    image: {
      url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Edition #03 Flagship Sprint — 48-hour virtual builder arena',
    },
    metrics: {
      likes: 684,
      reposts: 215,
      replies: 42,
    },
    comments: [
      {
        id: 'c3',
        author: 'Takuya Sato',
        handle: '@tsato_ml',
        avatarText: 'TS',
        content: 'Building a team for the Edge WASM track! Looking for 1 more Rust systems hacker familiar with AVX-512 quantization.',
        timeAgo: '1h ago',
      },
    ],
  },
  {
    id: 'post-3',
    author: {
      name: 'Dr. Elena Rostova',
      handle: '@erostova',
      avatarText: 'ER',
      role: 'Lead Compiler Engineer',
      verified: true,
    },
    timeAgo: '5h ago',
    category: 'Engineering',
    title: 'WasmMesh Micro-Proxy Stress-Test Results: < 18µs Routing Latency',
    content: 'Published the benchmark flamegraphs from our 10,000-node cluster simulation. By utilizing lock-free shared memory ring buffers between host threads and isolated Wasmtime sandboxes, we eliminated IPC serialization penalties entirely.\n\nKey takeaways:\n• Zero TCP packet drops under 400,000 req/sec pressure\n• Dynamic module hot-reloads execute in 0ms with zero connection reset\n• Memory footprint bounded at 1.4 MB per micro-proxy',
    tags: ['#wasmmesh', '#rust-lang', '#webassembly', '#benchmarks'],
    image: {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      caption: 'Distributed telemetry verification across bare-metal server cluster',
    },
    metrics: {
      likes: 492,
      reposts: 112,
      replies: 31,
    },
    comments: [
      {
        id: 'c4',
        author: 'Torben Lindholm',
        handle: '@tlindholm',
        avatarText: 'TL',
        content: 'The ring buffer alignment to CPU cache lines (64 bytes) made a visible difference in mitigating false sharing. Great paper!',
        timeAgo: '3h ago',
      },
    ],
  },
  {
    id: 'post-4',
    author: {
      name: 'Torben Lindholm',
      handle: '@tlindholm',
      avatarText: 'TL',
      role: 'Kernel Contributor',
      verified: true,
    },
    timeAgo: 'Yesterday',
    category: 'Engineering',
    title: 'ZeroPipe IPC: 14.8 Million Messages/Sec on Linux & FreeBSD',
    content: 'For infrastructure services that communicate across local processes, standard UNIX domain sockets and pipes add substantial syscall overhead. ZeroPipe implements atomic compare-and-swap ring buffers over POSIX shared memory with SIMD vectorized bulk reads.\n\nNow open-sourced under MIT on the collective org: `github.com/xedomlab/zeropipe`.',
    tags: ['#zeropipe', '#lowlevel', '#concurrency', '#rust'],
    codeSnippet: {
      language: 'rust',
      code: '// Zero-copy lock-free ring buffer push\npub fn enqueue_simd(&self, batch: &[Message]) -> Result<(), QueueFull> {\n    let head = self.producer_head.load(Ordering::Relaxed);\n    // Atomic CAS with SIMD boundary pre-fetch\n    ...\n}',
    },
    metrics: {
      likes: 531,
      reposts: 148,
      replies: 39,
    },
    comments: [],
  },
  {
    id: 'post-5',
    author: {
      name: 'Alex Vance',
      handle: '@avance_sys',
      avatarText: 'AV',
      role: 'Distributed Systems Lead',
      verified: true,
    },
    timeAgo: '2 days ago',
    category: 'Community',
    title: 'LocalAgentFS: Safety sandboxes for autonomous coding agents',
    content: 'If you use AI coding agents to refactor large projects, one hallucinated command can destroy your git tree. LocalAgentFS mounts a virtual copy-on-write FUSE layer over your project folder. The AI sees and modifies real files, but all mutations are recorded as AST diffs in memory until you hit `accept`.\n\nTry it out: `npx local-agent-fs mount ./my-project`',
    tags: ['#localfirst', '#aiagents', '#fuse', '#typescript'],
    metrics: {
      likes: 310,
      reposts: 84,
      replies: 18,
    },
    comments: [
      {
        id: 'c5',
        author: 'David Kelling',
        handle: '@dkelling',
        avatarText: 'DK',
        content: 'Saved my workspace three times today alone when testing experimental CLI refactors. This should be standard in every AI agent pipeline.',
        timeAgo: '1 day ago',
      },
    ],
  },
];
