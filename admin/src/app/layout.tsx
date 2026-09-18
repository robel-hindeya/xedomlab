import type { Metadata } from 'next';
import '../index.css';
import { Sidebar } from '../components/Sidebar';

export const metadata: Metadata = {
  title: 'Xedom Lab — Admin Console',
  description: 'Mission control plane for Xedom Lab systems and developer platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-neutral-100 flex min-h-screen antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {children}
        </div>
      </body>
    </html>
  );
}
