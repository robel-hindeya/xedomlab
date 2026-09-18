export interface SocialLink {
  id: string;
  name: string;
  platform: 'x' | 'linkedin' | 'discord' | 'github' | 'telegram';
  handle: string;
  url: string;
  badge?: string;
  description?: string;
}

export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  version: string;
  status: 'active' | 'beta' | 'rfc' | 'archived';
  stars?: number;
  githubUrl: string;
  demoUrl?: string;
  docsUrl?: string;
  installCommand?: string;
  tags: string[];
  createdAt: string;
}

export interface NewsItem {
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

export interface EventItem {
  id: string;
  title: string;
  type: 'Hackathon' | 'Workshop' | 'Meetup' | 'Demo Day';
  date: string;
  time?: string;
  status: 'upcoming' | 'ongoing' | 'past';
  prizePool?: string;
  location: string;
  description: string;
  registrationUrl?: string;
}

export interface AmbassadorApplication {
  id: string;
  name: string;
  email: string;
  githubUrl?: string;
  xUrl?: string;
  portfolioUrl?: string;
  track: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source?: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalNews: number;
  totalEvents: number;
  totalAmbassadors: number;
  pendingAmbassadors: number;
  totalSubscribers: number;
  serverUptime: number;
  status: 'healthy';
}

export type AdminTab = 
  | 'dashboard'
  | 'products'
  | 'news'
  | 'events'
  | 'ambassadors'
  | 'subscribers'
  | 'socials'
  | 'api-status';
