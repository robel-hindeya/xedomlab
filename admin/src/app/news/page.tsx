'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { News as NewsView } from '../../pages/News';
import { NewsItem } from '../../types';
import { api } from '../../services/api';

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  const loadNews = async () => {
    const data = await api.getNews();
    setNews(data);
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <>
      <Header
        title="News, Announcements & RFCs"
        subtitle="Publish engineering drops, benchmarks, and community notifications"
        onRefresh={loadNews}
      />
      <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        <NewsView news={news} onRefresh={loadNews} />
      </main>
    </>
  );
}
