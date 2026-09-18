import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import '../index.css';
import { ModalProvider } from '../context/ModalContext';
import { MainLayout } from '../components/MainLayout';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Xedom Lab — A community for developers and builders',
  description:
    'Xedom Lab is a community for developers, programmers, and builders to learn, build real projects, share knowledge, and grow together.',
  icons: {
    icon: '/xedom-logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#000000] text-[#ededed] antialiased selection:bg-[#333333] selection:text-white min-h-screen">
        <ModalProvider>
          <MainLayout>{children}</MainLayout>
        </ModalProvider>
      </body>
    </html>
  );
}
