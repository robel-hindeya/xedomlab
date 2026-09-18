import {
  Product,
  NewsItem,
  EventItem,
  AmbassadorApplication,
  Subscriber,
  SocialLink,
  DashboardStats,
} from '../types';

const API_BASE = 'http://localhost:5000/api';
const ADMIN_TOKEN = 'xedom-admin-secret-2026';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${ADMIN_TOKEN}`,
};

export const api = {
  // Health
  async getHealth(): Promise<{ status: string; uptime: number; latency: number }> {
    const start = performance.now();
    try {
      const res = await fetch(`${API_BASE}/health`);
      const latency = Math.round(performance.now() - start);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return { status: json.data?.status || 'ok', uptime: json.data?.uptime || 0, latency };
    } catch {
      return { status: 'offline', uptime: 0, latency: 0 };
    }
  },

  // Stats
  async getStats(): Promise<DashboardStats> {
    try {
      const res = await fetch(`${API_BASE}/admin/stats`, { headers });
      if (!res.ok) throw new Error('Failed');
      const json = await res.json();
      return json.data;
    } catch {
      return {
        totalProducts: 3,
        totalNews: 2,
        totalEvents: 2,
        totalAmbassadors: 2,
        pendingAmbassadors: 1,
        totalSubscribers: 2,
        serverUptime: 0,
        status: 'healthy',
      };
    }
  },

  // Social Links
  async getSocials(): Promise<SocialLink[]> {
    try {
      const res = await fetch(`${API_BASE}/socials`);
      if (!res.ok) throw new Error('Failed');
      const json = await res.json();
      return json.data;
    } catch {
      return [
        {
          id: 'x',
          name: 'X (Twitter)',
          platform: 'x',
          handle: '@robelhindeya',
          url: 'https://x.com/robelhindeya',
          badge: 'Social Feed',
          description: 'Engineering highlights and announcements',
        },
        {
          id: 'linkedin',
          name: 'LinkedIn',
          platform: 'linkedin',
          handle: 'in/robelhindeya',
          url: 'https://www.linkedin.com/in/robelhindeya/',
          badge: 'Network',
          description: 'Professional networking and technical leadership',
        },
        {
          id: 'discord',
          name: 'Discord',
          platform: 'discord',
          handle: 'discord.gg/xedomlab',
          url: 'https://discord.com/channels/1515283832419520522/1515610695729938482',
          badge: 'Primary Hub',
          description: 'Voice lounges and engineering pairing rooms',
        },
        {
          id: 'github',
          name: 'GitHub',
          platform: 'github',
          handle: 'robel-hindeya',
          url: 'https://github.com/robel-hindeya',
          badge: 'Open Source',
          description: 'Open source repositories and code contributions',
        },
        {
          id: 'telegram',
          name: 'Telegram',
          platform: 'telegram',
          handle: 't.me/xedomlabs',
          url: 'https://t.me/xedomlabs',
          badge: 'Fast Updates',
          description: 'Fast mobile updates and broadcast chats',
        },
      ];
    }
  },

  async updateSocial(id: string, updates: Partial<SocialLink>): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/socials/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Products
  async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers,
        body: JSON.stringify(product),
      });
      const json = await res.json();
      return json.data || null;
    } catch {
      return null;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
        headers,
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // News
  async getNews(): Promise<NewsItem[]> {
    try {
      const res = await fetch(`${API_BASE}/news`);
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },

  async createNews(news: Omit<NewsItem, 'id'>): Promise<NewsItem | null> {
    try {
      const res = await fetch(`${API_BASE}/news`, {
        method: 'POST',
        headers,
        body: JSON.stringify(news),
      });
      const json = await res.json();
      return json.data || null;
    } catch {
      return null;
    }
  },

  async deleteNews(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/news/${id}`, {
        method: 'DELETE',
        headers,
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Events
  async getEvents(): Promise<EventItem[]> {
    try {
      const res = await fetch(`${API_BASE}/events`);
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },

  async createEvent(event: Omit<EventItem, 'id'>): Promise<EventItem | null> {
    try {
      const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers,
        body: JSON.stringify(event),
      });
      const json = await res.json();
      return json.data || null;
    } catch {
      return null;
    }
  },

  async deleteEvent(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/events/${id}`, {
        method: 'DELETE',
        headers,
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Ambassadors
  async getAmbassadors(): Promise<AmbassadorApplication[]> {
    try {
      const res = await fetch(`${API_BASE}/ambassadors`);
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },

  async updateAmbassadorStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/ambassadors/${id}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status }),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async deleteAmbassador(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/ambassadors/${id}`, {
        method: 'DELETE',
        headers,
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Subscribers
  async getSubscribers(): Promise<Subscriber[]> {
    try {
      const res = await fetch(`${API_BASE}/subscribers`, { headers });
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },

  async deleteSubscriber(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/subscribers/${id}`, {
        method: 'DELETE',
        headers,
      });
      return res.ok;
    } catch {
      return false;
    }
  },
};
