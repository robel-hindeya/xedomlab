'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Subscribers as SubscribersView } from '../../pages/Subscribers';
import { Subscriber } from '../../types';
import { api } from '../../services/api';

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const loadSubscribers = async () => {
    const data = await api.getSubscribers();
    setSubscribers(data);
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  return (
    <>
      <Header
        title="Waitlist & Developer Subscribers"
        subtitle="Manage developer newsletters and early-access waitlist signups"
        onRefresh={loadSubscribers}
      />
      <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        <SubscribersView subscribers={subscribers} onRefresh={loadSubscribers} />
      </main>
    </>
  );
}
