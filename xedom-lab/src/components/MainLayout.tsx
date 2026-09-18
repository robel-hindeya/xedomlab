'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useModal } from '../context/ModalContext';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { openJoinModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-neutral-200 antialiased selection:bg-neutral-800 selection:text-white">
      {/* On Home page, the fixed split screen has NO global top navbar (Better Auth layout) */}
      {!isHomePage && <Navbar onOpenJoinModal={openJoinModal} />}

      <main className="flex-1">{children}</main>

      {/* On Home page, the right scrollable column has its own footer; the left fixed screen stays 100% fixed */}
      {!isHomePage && <Footer />}
    </div>
  );
};
