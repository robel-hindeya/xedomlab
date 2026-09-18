'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Ambassadors as AmbassadorsView } from '../../pages/Ambassadors';
import { AmbassadorApplication } from '../../types';
import { api } from '../../services/api';

export default function AmbassadorsPage() {
  const [ambassadors, setAmbassadors] = useState<AmbassadorApplication[]>([]);

  const loadAmbassadors = async () => {
    const data = await api.getAmbassadors();
    setAmbassadors(data);
  };

  useEffect(() => {
    loadAmbassadors();
  }, []);

  return (
    <>
      <Header
        title="Ambassador & Advocate Applications"
        subtitle="Review community leadership submissions and technical writer applications"
        onRefresh={loadAmbassadors}
      />
      <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        <AmbassadorsView ambassadors={ambassadors} onRefresh={loadAmbassadors} />
      </main>
    </>
  );
}
