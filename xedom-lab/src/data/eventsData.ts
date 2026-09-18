import type { EventData } from '../components/EventCard';

export interface HackathonPanelist {
  name: string;
  role: string;
  company: string;
  avatarText: string;
}

export interface WinningProject {
  place: string;
  name: string;
  prize: string;
  stack: string[];
  description: string;
}

export interface HackathonImage {
  url: string;
  caption: string;
  tag: string;
}

export interface PastHackathon {
  id: string;
  title: string;
  edition: string;
  date: string;
  status: string;
  coverImage: string;
  bannerGradient: string;
  bannerAccent: string;
  participants: string;
  projectsSubmitted: string;
  prizeAwarded: string;
  theme: string;
  summary: string;
  gallery: HackathonImage[];
  panelists: HackathonPanelist[];
  winningProjects: WinningProject[];
  blog: {
    title: string;
    publishedDate: string;
    readTime: string;
    author: string;
    authorRole: string;
    leadParagraph: string;
    sections: {
      heading: string;
      body: string;
    }[];
    highlights: string[];
  };
}

export interface LatestHackathon {
  id: string;
  title: string;
  edition: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Live' | 'Registration Open' | 'Concluded';
  prizePool: string;
  attendeesCount: number;
  platform: string;
  description: string;
  tracks: {
    name: string;
    description: string;
  }[];
  panelists: HackathonPanelist[];
}

export const latestHackathon: LatestHackathon = {
  id: 'hackathon-latest-2026',
  title: 'Xedom Global Hackathon 2026: Open Infrastructure Sprint',
  edition: 'Edition #03 · Flagship Sprint',
  date: 'OCT 24 - 26, 2026',
  time: '48 Hours Continuous Virtual Sprint',
  status: 'Registration Open',
  prizePool: '$15,000 in Grants & Cloud Credits',
  attendeesCount: 780,
  platform: 'Discord Stage + GitHub Classroom',
  description: '48 hours of intense open-source creation. Team up with developers worldwide to build low-latency infrastructure, distributed protocols, compiler tools, and autonomous local-first runtimes.',
  tracks: [
    {
      name: 'High-Throughput Systems & eBPF',
      description: 'Zero-copy networking, custom protocol parsers, kernel telemetry, and distributed messaging.',
    },
    {
      name: 'Local-First & Edge Runtimes',
      description: 'WASM sandboxes, offline sync primitives, and low-latency client-side state engines.',
    },
    {
      name: 'Distributed Storage & Consensus',
      description: 'LSM trees, Raft/Paxos implementations, write-ahead logs, and memory-safe key-value nodes.',
    },
    {
      name: 'Developer Tooling & CLIs',
      description: 'Blazing fast build tools, code review automations, static analyzers, and benchmarking suites.',
    },
  ],
  panelists: [
    {
      name: 'David Kelling',
      role: 'Staff Infrastructure Architect',
      company: 'Cloudflare Workers',
      avatarText: 'DK',
    },
    {
      name: 'Dr. Elena Rostova',
      role: 'Lead Compiler Engineer',
      company: 'LLVM / Rust Foundation',
      avatarText: 'ER',
    },
    {
      name: 'Marcus Chen',
      role: 'Head of Core Systems',
      company: 'Supabase Data Engine',
      avatarText: 'MC',
    },
    {
      name: 'Sophia Lindqvist',
      role: 'Principal Systems Researcher',
      company: 'Open Distributed Collective',
      avatarText: 'SL',
    },
  ],
};

export const pastHackathons: PastHackathon[] = [
  {
    id: 'past-hackathon-2025',
    title: 'Xedom Hackathon 2025: Edge Computing & Local AI',
    edition: 'Edition #02 · Spring 2025',
    date: 'MAY 16 - 18, 2025',
    status: 'Completed',
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    bannerGradient: 'from-neutral-900 via-neutral-950 to-black',
    bannerAccent: '#e5e5e5',
    participants: '680 builders',
    projectsSubmitted: '124 submissions',
    prizeAwarded: '$10,000 USD distributed',
    theme: 'Local-First Runtimes & Offline Neural Inference',
    summary: 'An international 48-hour sprint exploring autonomous offline-first runtimes, WebAssembly sandboxes, and low-resource local neural models.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        caption: 'Midnight collaborative sprint: Builders fine-tuning offline WebAssembly runtimes',
        tag: 'Hack Room',
      },
      {
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
        caption: 'WasmMesh winning team presenting their zero-trust micro-proxy architecture',
        tag: 'Demo Day',
      },
      {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        caption: 'Panel review session: Dr. Elena Rostova and Alex Vance auditing memory footprints',
        tag: 'Judges Panel',
      },
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        caption: 'Live peer code-review circle before the final grant distribution announcement',
        tag: 'Finalist Review',
      },
    ],
    panelists: [
      {
        name: 'Alex Vance',
        role: 'Principal Systems Architect',
        company: 'Edge Protocol Foundation',
        avatarText: 'AV',
      },
      {
        name: 'Dr. Elena Rostova',
        role: 'Compiler Contributor',
        company: 'Rust Foundation',
        avatarText: 'ER',
      },
      {
        name: 'Takuya Sato',
        role: 'Staff Embedded Engineer',
        company: 'Neural Edge Lab',
        avatarText: 'TS',
      },
      {
        name: 'Mira Patel',
        role: 'Distributed Database Lead',
        company: 'Neon / Postgres Core',
        avatarText: 'MP',
      },
    ],
    winningProjects: [
      {
        place: '1st Place Winner ($5,000)',
        name: 'WasmMesh',
        prize: '$5,000 Grant',
        stack: ['Rust', 'WebAssembly', 'QUIC'],
        description: 'A zero-trust service mesh executing sandboxed micro-proxies inside WebAssembly runtimes with microsecond routing latency.',
      },
      {
        place: '2nd Place Winner ($3,000)',
        name: 'LocalAgentFS',
        prize: '$3,000 Grant',
        stack: ['C++', 'POSIX', 'LLVM'],
        description: 'A virtualized copy-on-write filesystem allowing local LLMs to manipulate codebases safely with rollback snapshots.',
      },
      {
        place: '3rd Place Winner ($2,000)',
        name: 'EdgeKV',
        prize: '$2,000 Grant',
        stack: ['Go', 'Raft', 'eBPF'],
        description: 'A peer-to-peer distributed key-value store synchronizing edge nodes over UDP broadcast with sub-millisecond failover.',
      },
    ],
    blog: {
      title: 'How 680 Engineers Built the Future of Local-First Edge Runtimes in 48 Hours',
      publishedDate: 'MAY 22, 2025',
      readTime: '6 min read',
      author: 'Xedom Editorial Team',
      authorRole: 'Engineering Community Lead',
      leadParagraph: 'Over the weekend of May 16th to 18th, 680 developers across 34 countries logged onto the Xedom Lab Discord and GitHub org to build what many considered impractical: running production-grade neural pipelines and zero-trust service meshes on edge devices with zero external cloud dependencies.',
      sections: [
        {
          heading: 'The Challenge: Moving Past Cloud Centralization',
          body: 'Modern cloud infrastructure has become increasingly centralized, incurring high latency, ballooning egress costs, and persistent privacy vulnerabilities. Edition #02 challenged participants to invert this model by building tools that run directly on consumer silicon, edge gateways, and browser WASM threads.',
        },
        {
          heading: 'Standout Engineering Implementations',
          body: 'Judges reviewed 124 code submissions evaluated on architecture cleanliness, memory footprint, test coverage, and benchmark verification. WasmMesh took first place by demonstrating dynamic live-reloading of WebAssembly proxy modules with zero dropped TCP packets across a simulated 10,000-node cluster.',
        },
        {
          heading: 'Judges Feedback & Technical Takeaways',
          body: 'Dr. Elena Rostova noted: "What stood out most was how mature low-level Rust and Go tooling has become in the developer community. Rather than building demo web wrappers, teams submitted custom memory allocators, lock-free ring buffers, and formal consensus models."',
        },
      ],
      highlights: [
        '124 repositories submitted to open-source GitHub Classroom',
        'Over 8,400 commits and 420 pull requests merged over 48 hours',
        'All 3 winning projects are continuing under Xedom builder incubator grants',
        '100% of submitted code published under MIT or Apache 2.0 open-source licenses',
      ],
    },
  },
  {
    id: 'past-hackathon-2024',
    title: 'Xedom Hackathon 2024: Systems & Memory Safety Sprint',
    edition: 'Edition #01 · Fall 2024',
    date: 'NOV 08 - 10, 2024',
    status: 'Completed',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    bannerGradient: 'from-neutral-950 via-neutral-900 to-black',
    bannerAccent: '#a3a3a3',
    participants: '510 builders',
    projectsSubmitted: '92 submissions',
    prizeAwarded: '$8,000 USD distributed',
    theme: 'Lock-Free Structures, Custom Allocators & Safe Kernels',
    summary: 'The inaugural Xedom Lab sprint focused on rewriting critical infrastructure primitives with strict memory safety guarantees and high-throughput concurrency.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        caption: 'High-throughput IPC stress-test cluster running across bare-metal nodes',
        tag: 'Infrastructure',
      },
      {
        url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
        caption: 'Live profiling and flamegraph verification for lock-free ring buffer benchmarks',
        tag: 'Benchmarks',
      },
      {
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
        caption: 'Torben Lindholm and Devon Reed analyzing thread-sanitizer data race traces',
        tag: 'Judges Panel',
      },
      {
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        caption: 'ZeroPipe 1st place team demonstrating 14.8 million ops/sec sustained throughput',
        tag: 'Winner Demo',
      },
    ],
    panelists: [
      {
        name: 'Torben Lindholm',
        role: 'Linux Kernel Contributor',
        company: 'Systems Research Lab',
        avatarText: 'TL',
      },
      {
        name: 'Sarah Jenkins',
        role: 'Lead Security Researcher',
        company: 'ZeroDay Collective',
        avatarText: 'SJ',
      },
      {
        name: 'Devon Reed',
        role: 'Core Maintainer',
        company: 'Tokio Async Team',
        avatarText: 'DR',
      },
      {
        name: 'Kaito Tanaka',
        role: 'Infrastructure Architect',
        company: 'High-Frequency Systems',
        avatarText: 'KT',
      },
    ],
    winningProjects: [
      {
        place: '1st Place Winner ($4,000)',
        name: 'ZeroPipe',
        prize: '$4,000 Grant',
        stack: ['Rust', 'Shared Memory', 'SIMD'],
        description: 'A zero-copy inter-process communication bus achieving 14.8 million messages/sec using memory-mapped ring buffers and atomic CAS primitives.',
      },
      {
        place: '2nd Place Winner ($2,500)',
        name: 'SafeAlloc',
        prize: '$2,500 Grant',
        stack: ['Zig', 'Embedded', 'Bare Metal'],
        description: 'A statically bounded arena memory allocator designed for safety-critical microcontrollers with zero runtime fragmentation.',
      },
      {
        place: '3rd Place Winner ($1,500)',
        name: 'KubeSafe',
        prize: '$1,500 Grant',
        stack: ['eBPF', 'Go', 'Linux Kernel'],
        description: 'An eBPF-powered kernel tracer that detects heap corruption and buffer overruns in containerized microservices without adding latency overhead.',
      },
    ],
    blog: {
      title: 'Zero Memory Leaks, 14M Messages/Sec: Retrospective on Xedom 2024',
      publishedDate: 'NOV 15, 2024',
      readTime: '5 min read',
      author: 'Xedom Editorial Team',
      authorRole: 'Systems Track Lead',
      leadParagraph: 'When we announced the Systems & Memory Safety Sprint in late 2024, our goal was simple: prove that low-level systems engineering can thrive in a fast-paced hackathon setting without compromising on mechanical sympathy, benchmarking rigor, and thread safety.',
      sections: [
        {
          heading: 'A Focus on Low-Level Primitives',
          body: 'Unlike mainstream hackathons where frontend wrappers dominate, 88% of teams in Xedom 2024 wrote their core modules in Rust, Zig, or modern C++20. The evaluation criteria required full thread-sanitizer (TSan) passing test suites and flame graph profiles under stress.',
        },
        {
          heading: 'ZeroPipe: Redefining IPC Throughput',
          body: 'The winning project, ZeroPipe, caught the unanimous vote of all 4 judges. By designing a cache-line aligned ring buffer with SIMD vectorized bulk reads, the team achieved near-theoretical memory bandwidth limits on standard x86 and ARM servers.',
        },
        {
          heading: 'Community Impact & Open Legacy',
          body: 'Judge Torben Lindholm remarked: "The rigor displayed by these teams was extraordinary. Seeing builders implement lock-free queues and eBPF probes in 48 hours reminds us why community-driven engineering collectives are so vital."',
        },
      ],
      highlights: [
        '92 production-ready repositories launched',
        'Zero reported thread-sanitizer data races in top 10 finalists',
        'Over 14.8M ops/sec verified in the benchmark battle arena',
        '6 open-source RFC proposals contributed to upstream repositories',
      ],
    },
  },
];

export const eventsList: EventData[] = [
  {
    id: 'evt-1',
    title: latestHackathon.title,
    date: latestHackathon.date,
    time: latestHackathon.time,
    type: 'Hackathon',
    description: latestHackathon.description,
    platform: latestHackathon.platform,
    attendeesCount: latestHackathon.attendeesCount,
    status: latestHackathon.status,
    tags: ['hackathon', 'opensource', 'grants', 'systems'],
  },
  {
    id: 'evt-2',
    title: 'Zero to Production: Building Distributed Systems in Go',
    date: 'NOV 06, 2026',
    time: '17:00 UTC (2 hrs)',
    type: 'Workshop',
    description: 'Live interactive coding workshop implementing the Raft consensus algorithm and a replicated write-ahead log from scratch.',
    platform: 'Discord Stage & YouTube Live',
    attendeesCount: 310,
    status: 'Registration Open',
    tags: ['go', 'distributed-systems', 'workshop'],
  },
  {
    id: 'evt-3',
    title: 'Weekly Builder Demo Day & Architecture Teardown',
    date: 'EVERY FRIDAY',
    time: '18:00 UTC',
    type: 'Community meetup',
    description: 'Community members demo real projects they built this week. Get instant constructive feedback, code reviews, and find collaborators.',
    platform: 'Discord Voice Stage #lounge',
    attendeesCount: 145,
    status: 'Registration Open',
    tags: ['demoday', 'feedback', 'showcase'],
  },
];
