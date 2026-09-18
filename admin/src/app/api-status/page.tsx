'use client';

import React from 'react';
import { Header } from '../../components/Header';
import { ApiStatus as ApiStatusView } from '../../pages/ApiStatus';

export default function ApiStatusPage() {
  return (
    <>
      <Header
        title="REST API Diagnostics & Status"
        subtitle="Live telemetry, roundtrip latency, and endpoint verification"
      />
      <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        <ApiStatusView />
      </main>
    </>
  );
}
