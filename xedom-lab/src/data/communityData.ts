import { Code2, Hammer, Cpu, Terminal, Users, Sparkles, BookOpen, GitPullRequest, MessageSquare, Zap, Globe } from 'lucide-react';
import { LinkedinIcon } from '../components/Icons';

export const communityCategories = [
  {
    category: 'Software Developers',
    subtitle: 'Code craftsmanship & scalable systems',
    description: 'From web interfaces to distributed databases, software developers build the digital infrastructure of modern products.',
    icon: Code2,
    tracks: ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps'],
    stat: '1,420+ active coders',
    linkTo: '/community',
  },
  {
    category: 'Builders & Founders',
    subtitle: 'Shipping products & side projects',
    description: 'Makers turning ideas into working prototypes, launching micro-SaaS products, and crafting open-source developer tooling.',
    icon: Hammer,
    tracks: ['Startups', 'SaaS', 'Open Source', 'Side Projects', 'Indie Hacking'],
    stat: '640+ products launched',
    linkTo: '/community',
  },
  {
    category: 'Hardware & AI Engineers',
    subtitle: 'Physical computing, robotics & intelligence',
    description: 'Pioneers working on edge computing, custom silicon, microcontrollers, embedded firmware, and neural model architectures.',
    icon: Cpu,
    tracks: ['Hardware', 'Robotics', 'AI / ML', 'IoT', 'Embedded Systems'],
    stat: '380+ engineering labs',
    linkTo: '/community',
  },
];

export const communityValues = [
  {
    icon: Hammer,
    title: 'Action over talk',
    description: 'We believe real understanding comes from writing code, breaking things, debugging root causes, and shipping actual working software.',
  },
  {
    icon: GitPullRequest,
    title: 'Radical open collaboration',
    description: 'Everything we build is meant to be shared. Open source, transparent architectures, and free exchange of knowledge empower everyone.',
  },
  {
    icon: Sparkles,
    title: 'Craftsmanship & quality',
    description: 'Speed matters, but maintainability, security, and elegance matter more. We take pride in clean code, crisp design, and rock-solid systems.',
  },
  {
    icon: Users,
    title: 'Zero gatekeeping',
    description: 'Whether you just wrote your first line of Python or maintain Linux kernel patches, your questions and contributions are equally respected.',
  },
];

export const communityActivities = [
  {
    icon: Terminal,
    title: 'Weekly Builder Demo Days',
    frequency: 'Every Friday · 18:00 UTC',
    description: 'Show what you shipped this week. Get candid peer code reviews, UX feedback, and early adopters for your tools.',
  },
  {
    icon: Zap,
    title: '48-Hour Sprint Hackathons',
    frequency: 'Bi-monthly weekends',
    description: 'Form teams with builders around the world to prototype solutions for real-world technical problems and open-source bounties.',
  },
  {
    icon: BookOpen,
    title: 'System Design Deep Dives',
    frequency: 'Bi-weekly Wednesdays',
    description: 'Interactive teardowns of large-scale architectures: distributed consensus, search indices, local LLMs, and kernel internals.',
  },
  {
    icon: Users,
    title: 'Async Pair Programming',
    frequency: 'Continuous 24/7',
    description: 'Drop into voice lounges with shared terminal sessions to debug tough bugs, review PRs, and build side-by-side.',
  },
];

export const communityChannels = [
  {
    name: 'Discord Server',
    handle: 'discord.gg/xedomlab',
    url: 'https://discord.com/channels/1515283832419520522/1515610695729938482',
    description: 'Voice lounges, live coding rooms, help desks for each engineering track, and casual banter.',
    badge: 'Primary Hub',
    members: 'Active Now',
    icon: MessageSquare,
  },
  {
    name: 'Telegram Community',
    handle: 't.me/xedomlabs',
    url: 'https://t.me/xedomlabs',
    description: 'Fast mobile updates, technical discussions, event announcements, and regional chat groups.',
    badge: 'Fast Updates',
    members: 'Global Broadcast',
    icon: Globe,
  },
  {
    name: 'GitHub Organization',
    handle: 'github.com/robel-hindeya',
    url: 'https://github.com/robel-hindeya',
    description: 'Explore community repositories, RFC specifications, project templates, and contribute code.',
    badge: 'Code & RFCs',
    members: 'Open Source',
    icon: GitPullRequest,
  },
  {
    name: 'X (Twitter)',
    handle: '@robelhindeya',
    url: 'https://x.com/robelhindeya',
    description: 'Highlighting community members, sharing engineering threads, and announcing hackathon winners.',
    badge: 'Social Feed',
    members: 'News & Demos',
    icon: Zap,
  },
  {
    name: 'LinkedIn Network',
    handle: 'linkedin.com/in/robelhindeya',
    url: 'https://www.linkedin.com/in/robelhindeya/',
    description: 'Professional networking, technical leadership posts, collaborations, and career growth.',
    badge: 'Professional',
    members: 'Connect',
    icon: LinkedinIcon,
  },
];
