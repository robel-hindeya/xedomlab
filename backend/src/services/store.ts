import {
  Product,
  NewsItem,
  EventItem,
  AmbassadorApplication,
  Subscriber,
  SocialLink,
  DashboardStats,
} from '../types/index.js';
import {
  initialProducts,
  initialNews,
  initialEvents,
  initialAmbassadors,
  initialSubscribers,
  initialSocials,
} from '../data/seedData.js';

class DataStore {
  private products: Product[] = [...initialProducts];
  private news: NewsItem[] = [...initialNews];
  private events: EventItem[] = [...initialEvents];
  private ambassadors: AmbassadorApplication[] = [...initialAmbassadors];
  private subscribers: Subscriber[] = [...initialSubscribers];
  private socials: SocialLink[] = [...initialSocials];
  private startTime: number = Date.now();

  // Social Links
  getSocials(): SocialLink[] {
    return this.socials;
  }

  updateSocial(id: string, updates: Partial<SocialLink>): SocialLink | null {
    const index = this.socials.findIndex((s) => s.id === id);
    if (index === -1) return null;
    this.socials[index] = { ...this.socials[index], ...updates };
    return this.socials[index];
  }

  // Products
  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | null {
    return this.products.find((p) => p.id === id) || null;
  }

  createProduct(data: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length < initialLen;
  }

  // News
  getNews(): NewsItem[] {
    return this.news;
  }

  createNews(data: Omit<NewsItem, 'id'>): NewsItem {
    const item: NewsItem = {
      ...data,
      id: `news-${Date.now()}`,
    };
    this.news.unshift(item);
    return item;
  }

  deleteNews(id: string): boolean {
    const initialLen = this.news.length;
    this.news = this.news.filter((n) => n.id !== id);
    return this.news.length < initialLen;
  }

  // Events
  getEvents(): EventItem[] {
    return this.events;
  }

  createEvent(data: Omit<EventItem, 'id'>): EventItem {
    const item: EventItem = {
      ...data,
      id: `event-${Date.now()}`,
    };
    this.events.unshift(item);
    return item;
  }

  deleteEvent(id: string): boolean {
    const initialLen = this.events.length;
    this.events = this.events.filter((e) => e.id !== id);
    return this.events.length < initialLen;
  }

  // Ambassadors
  getAmbassadors(): AmbassadorApplication[] {
    return this.ambassadors;
  }

  createAmbassadorApplication(
    data: Omit<AmbassadorApplication, 'id' | 'status' | 'submittedAt'>
  ): AmbassadorApplication {
    const app: AmbassadorApplication = {
      ...data,
      id: `amb-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    this.ambassadors.unshift(app);
    return app;
  }

  updateAmbassadorStatus(
    id: string,
    status: 'pending' | 'approved' | 'rejected'
  ): AmbassadorApplication | null {
    const index = this.ambassadors.findIndex((a) => a.id === id);
    if (index === -1) return null;
    this.ambassadors[index].status = status;
    return this.ambassadors[index];
  }

  deleteAmbassador(id: string): boolean {
    const initialLen = this.ambassadors.length;
    this.ambassadors = this.ambassadors.filter((a) => a.id !== id);
    return this.ambassadors.length < initialLen;
  }

  // Subscribers
  getSubscribers(): Subscriber[] {
    return this.subscribers;
  }

  addSubscriber(email: string, source: string = 'web'): Subscriber {
    const existing = this.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (existing) return existing;

    const sub: Subscriber = {
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString(),
      source,
    };
    this.subscribers.unshift(sub);
    return sub;
  }

  deleteSubscriber(id: string): boolean {
    const initialLen = this.subscribers.length;
    this.subscribers = this.subscribers.filter((s) => s.id !== id);
    return this.subscribers.length < initialLen;
  }

  // Dashboard Stats
  getStats(): DashboardStats {
    const pendingAmbassadors = this.ambassadors.filter((a) => a.status === 'pending').length;
    const uptimeSeconds = Math.floor((Date.now() - this.startTime) / 1000);

    return {
      totalProducts: this.products.length,
      totalNews: this.news.length,
      totalEvents: this.events.length,
      totalAmbassadors: this.ambassadors.length,
      pendingAmbassadors,
      totalSubscribers: this.subscribers.length,
      serverUptime: uptimeSeconds,
      status: 'healthy',
    };
  }
}

export const store = new DataStore();
