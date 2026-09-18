'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Socials as SocialsView } from '../../pages/Socials';
import { SocialLink } from '../../types';
import { api } from '../../services/api';

export default function SocialsPage() {
  const [socials, setSocials] = useState<SocialLink[]>([]);

  const loadSocials = async () => {
    const data = await api.getSocials();
    setSocials(data);
  };

  useEffect(() => {
    loadSocials();
  }, []);

  return (
    <>
      <Header
        title="Social & Community Channels"
        subtitle="Manage Robel Hindeya's official social endpoints synced across the platform"
        onRefresh={loadSocials}
      />
      <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        <SocialsView socials={socials} onRefresh={loadSocials} />
      </main>
    </>
  );
}
