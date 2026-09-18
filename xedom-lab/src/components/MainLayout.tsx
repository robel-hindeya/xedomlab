'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useModal } from '../context/ModalContext';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAdminPage = pathname?.startsWith('/admin');
  const { openJoinModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-neutral-200 antialiased selection:bg-neutral-800 selection:text-white">
      {/* On Home page or Admin page, do not render global public navbar */}
      {!isHomePage && !isAdminPage && <Navbar onOpenJoinModal={openJoinModal} />}

      <main className="flex-1">{children}</main>

      {/* On Home page or Admin page, do not render global public footer */}
      {!isHomePage && !isAdminPage && <Footer />}
    </div>
  );
};
