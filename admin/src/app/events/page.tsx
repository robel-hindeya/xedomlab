'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Events as EventsView } from '../../pages/Events';
import { EventItem } from '../../types';
import { api } from '../../services/api';

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  const loadEvents = async () => {
    const data = await api.getEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <>
      <Header
        title="Events, Hackathons & Workshops"
        subtitle="Organize systems competitions, bounty tracks, and technical seminars"
        onRefresh={loadEvents}
      />
      <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        <EventsView events={events} onRefresh={loadEvents} />
      </main>
    </>
  );
}
