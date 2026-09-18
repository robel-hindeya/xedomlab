export interface ProductMetric {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'Developer Tooling' | 'AI & Edge Engines' | 'Systems & Networking' | 'Web & Local-First';
  version: string;
  status: 'Production Ready' | 'Active Release' | 'Incubating' | 'Beta';
  stars: number;
  forks: number;
  license: 'MIT' | 'Apache 2.0';
  installCommand: string;
  techStack: string[];
  githubUrl: string;
  docsUrl: string;
  liveUrl?: string;
  metrics: ProductMetric[];
  featured?: boolean;
  architectureHighlight: string;
  maintainer: {
    name: string;
    role: string;
    avatarText: string;
  };
}

export const productCategories = [
  'All Products',
  'Developer Tooling',
  'AI & Edge Engines',
  'Systems & Networking',
  'Web & Local-First',
] as const;

export const productsList: ProductItem[] = [
  {
    id: 'prod-xedom-cli',
    name: 'Xedom DevMesh CLI',
    tagline: 'Zero-cloud peer-to-peer workspace & server synchronizer',
    description: 'Instant local tunneling, live multi-peer port forwarding, and decentralized terminal pairing for distributed engineering teams with zero cloud relay hops.',
    category: 'Developer Tooling',
    version: 'v2.4.0',
    status: 'Production Ready',
    stars: 8420,
    forks: 712,
    license: 'MIT',
    installCommand: 'curl -fsSL https://xedom.dev/install.sh | bash',
    techStack: ['Go', 'WebRTC', 'eBPF', 'Tailscale Wireguard', 'POSIX'],
    githubUrl: 'https://github.com',
    docsUrl: 'https://docs.xedom.dev/devmesh',
    liveUrl: 'https://xedom.dev',
    featured: true,
    architectureHighlight: 'Direct NAT-traversal through STUN/ICE with eBPF kernel bypass achieving < 0.8ms roundtrip latency between peer nodes.',
    metrics: [
      { label: 'Latency', value: '< 0.8ms peer' },
      { label: 'Memory Footprint', value: '14.2 MB' },
      { label: 'Throughput', value: '10 Gbps Wire' },
    ],
    maintainer: {
      name: 'Marcus Chen',
      role: 'Core Systems Maintainer',
      avatarText: 'MC',
    },
  },
  {
    id: 'prod-wasm-mesh',
    name: 'WasmMesh',
    tagline: 'High-performance microsecond service mesh in WebAssembly',
    description: 'Zero-trust sidecar proxies executing dynamic sandboxed WASM modules with zero-downtime hot-reloading and microsecond routing overhead.',
    category: 'Systems & Networking',
    version: 'v1.6.2',
    status: 'Production Ready',
    stars: 5930,
    forks: 480,
    license: 'Apache 2.0',
    installCommand: 'cargo install wasm-mesh-cli',
    techStack: ['Rust', 'WebAssembly', 'QUIC', 'Tokio', 'Wasmtime'],
    githubUrl: 'https://github.com',
    docsUrl: 'https://docs.xedom.dev/wasmmesh',
    featured: true,
    architectureHighlight: 'Zero-copy ring buffer IPC between host OS and isolated WASM runtime instances, eliminating serialization penalties.',
    metrics: [
      { label: 'Routing Overhead', value: '< 18µs' },
      { label: 'Sandbox Isolation', value: '100% Wasmtime' },
      { label: 'Hot Reload', value: '0ms Downtime' },
    ],
    maintainer: {
      name: 'Dr. Elena Rostova',
      role: 'Compiler & WASM Lead',
      avatarText: 'ER',
    },
  },
  {
    id: 'prod-pulse-voice',
    name: 'PulseVoice Edge',
    tagline: 'Local-first offline streaming voice AI for edge hardware',
    description: 'Ultra-compact neural speech-to-text and streaming speech synthesis engine running 100% on consumer silicon and embedded edge devices with sub-65ms latency.',
    category: 'AI & Edge Engines',
    version: 'v2.1.0',
    status: 'Active Release',
    stars: 4720,
    forks: 395,
    license: 'MIT',
    installCommand: 'pip install pulsevoice-runtime',
    techStack: ['C++', 'ONNX Runtime', 'NEON / AVX-512', 'WebAssembly', 'Python'],
    githubUrl: 'https://github.com',
    docsUrl: 'https://docs.xedom.dev/pulsevoice',
    liveUrl: 'https://pulsevoice.demo',
    architectureHighlight: '4-bit integer quantized weight tensors with custom AVX-512 kernel routines allowing 30x real-time inference on Apple Silicon and x86.',
    metrics: [
      { label: 'TTFT Latency', value: '48ms' },
      { label: 'Model Size', value: '38 MB RAM' },
      { label: 'Cloud Dependence', value: '0% (Offline)' },
    ],
    maintainer: {
      name: 'Takuya Sato',
      role: 'Embedded ML Engineer',
      avatarText: 'TS',
    },
  },
  {
    id: 'prod-zero-pipe',
    name: 'ZeroPipe IPC',
    tagline: 'Lock-free shared memory inter-process messaging bus',
    description: 'Ultra-low latency message transport sustaining 14.8 million ops/second using memory-mapped cache-aligned ring buffers and atomic CAS primitives.',
    category: 'Systems & Networking',
    version: 'v1.2.0',
    status: 'Production Ready',
    stars: 3840,
    forks: 310,
    license: 'MIT',
    installCommand: 'cargo add zero-pipe',
    techStack: ['Rust', 'Atomic CAS', 'SIMD', 'Linux shm', 'FreeBSD'],
    githubUrl: 'https://github.com',
    docsUrl: 'https://docs.xedom.dev/zeropipe',
    architectureHighlight: 'Cache-line isolated single-producer multi-consumer queues preventing false sharing across physical CPU cores.',
    metrics: [
      { label: 'Throughput', value: '14.8M msg/s' },
      { label: 'P99 Latency', value: '62 nanoseconds' },
      { label: 'Allocation', value: 'Zero Alloc' },
    ],
    maintainer: {
      name: 'Torben Lindholm',
      role: 'Kernel Systems Architect',
      avatarText: 'TL',
    },
  },
  {
    id: 'prod-local-agent-fs',
    name: 'LocalAgentFS',
    tagline: 'Sandboxed copy-on-write virtual filesystem for AI code agents',
    description: 'A virtualized FUSE / POSIX layer that intercepts AI code modifications, allowing LLM autonomous agents to edit project trees with instant microsecond rollbacks.',
    category: 'AI & Edge Engines',
    version: 'v0.9.4-beta',
    status: 'Beta',
    stars: 2650,
    forks: 184,
    license: 'MIT',
    installCommand: 'npx local-agent-fs mount ./workspace',
    techStack: ['TypeScript', 'Rust', 'FUSE', 'POSIX', 'Tree-Sitter'],
    githubUrl: 'https://github.com',
    docsUrl: 'https://docs.xedom.dev/agentfs',
    architectureHighlight: 'Copy-on-write overlay branch engine recording AST diffs in memory without touching physical SSD blocks until explicitly committed.',
    metrics: [
      { label: 'Snapshot Time', value: '1.2ms' },
      { label: 'Rollback Speed', value: 'Instant (< 1ms)' },
      { label: 'AST Validation', value: 'Integrated' },
    ],
    maintainer: {
      name: 'Alex Vance',
      role: 'Distributed Systems Lead',
      avatarText: 'AV',
    },
  },
  {
    id: 'prod-hyper-query',
    name: 'HyperQuery Engine',
    tagline: 'Columnar analytical SQL engine in browser WebAssembly',
    description: 'Full vectorized analytical query engine running in client-side browser threads. Query multi-gigabyte parquet and CSV datasets with sub-second execution.',
    category: 'Web & Local-First',
    version: 'v1.4.1',
    status: 'Active Release',
    stars: 3190,
    forks: 240,
    license: 'Apache 2.0',
    installCommand: 'npm install @xedom/hyperquery',
    techStack: ['Rust', 'WebAssembly', 'Apache Arrow', 'SIMD', 'TypeScript'],
    githubUrl: 'https://github.com',
    docsUrl: 'https://docs.xedom.dev/hyperquery',
    liveUrl: 'https://hyperquery.io',
    architectureHighlight: 'Direct SIMD vectorized execution over Apache Arrow columnar memory layouts inside shared WebAssembly memory threads.',
    metrics: [
      { label: 'Query Speed', value: '45M rows/sec' },
      { label: 'Bundle Size', value: '420 KB gzip' },
      { label: 'Memory Safety', value: '100% Rust' },
    ],
    maintainer: {
      name: 'Liam Gallagher',
      role: 'Database Engine Engineer',
      avatarText: 'LG',
    },
  },
  {
    id: 'prod-aura-primitives',
    name: 'Aura UI Primitives',
    tagline: 'Headless, unstyled accessible UI building blocks for React 19',
    description: 'High-density unstyled components built strictly for technical dashboards, terminal wrappers, and developer control panels with zero runtime layout shift.',
    category: 'Web & Local-First',
    version: 'v3.0.0',
    status: 'Production Ready',
    stars: 4120,
    forks: 390,
    license: 'MIT',
    installCommand: 'npm install @xedom/aura-ui',
    techStack: ['TypeScript', 'React 19', 'Tailwind CSS v4', 'Vite'],
    githubUrl: 'https://github.com',
    docsUrl: 'https://docs.xedom.dev/aura',
    architectureHighlight: 'Stateless render trees with micro-dispatch state machines ensuring zero wasted React re-renders on high-frequency streaming telemetry.',
    metrics: [
      { label: 'Bundle Weight', value: '8.4 KB' },
      { label: 'Accessibility', value: 'WCAG AAA' },
      { label: 'Keyboards', value: 'Full Focus Trap' },
    ],
    maintainer: {
      name: 'Sofia Al-Mansoor',
      role: 'Design Technologist',
      avatarText: 'SA',
    },
  },
  {
    id: 'prod-edge-kv',
    name: 'EdgeKV Consensus',
    tagline: 'P2P distributed key-value store with sub-millisecond failover',
    description: 'Embedded key-value storage engine synchronizing multi-region edge instances over UDP broadcast using Raft consensus and lock-free LSM trees.',
    category: 'Systems & Networking',
    version: 'v1.0.4',
    status: 'Active Release',
    stars: 2890,
    forks: 215,
    license: 'MIT',
    installCommand: 'go get github.com/xedomlab/edgekv',
    techStack: ['Go', 'Raft Consensus', 'LSM Tree', 'eBPF', 'UDP'],
    githubUrl: 'https://github.com',
    docsUrl: 'https://docs.xedom.dev/edgekv',
    architectureHighlight: 'Write-ahead log compaction with memory-mapped bloom filters for instantaneous multi-node failover without split-brain anomalies.',
    metrics: [
      { label: 'Write Latency', value: '< 1.4ms' },
      { label: 'Consensus Round', value: '1 RTT' },
      { label: 'Crash Recovery', value: 'Zero Data Loss' },
    ],
    maintainer: {
      name: 'Mira Patel',
      role: 'Distributed Database Lead',
      avatarText: 'MP',
    },
  },
];
