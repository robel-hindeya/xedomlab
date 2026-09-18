import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { JoinModal } from './components/JoinModal';
import { Home } from './pages/Home';
import { Community } from './pages/Community';
import { Products } from './pages/Products';
import { News } from './pages/News';
import { Events } from './pages/Events';
import { Ambassador } from './pages/Ambassador';

// Scroll to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout({ onOpenJoinModal }: { onOpenJoinModal: () => void }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-neutral-200 antialiased selection:bg-neutral-800 selection:text-white">
      {/* On Home page, the fixed split screen has NO global top navbar (Better Auth layout) */}
      {!isHomePage && <Navbar onOpenJoinModal={onOpenJoinModal} />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onOpenJoinModal={onOpenJoinModal} />} />
          <Route path="/community" element={<Community onOpenJoinModal={onOpenJoinModal} />} />
          <Route path="/ambassador" element={<Ambassador />} />
          <Route path="/ambassador/apply" element={<Ambassador />} />
          <Route path="/products" element={<Products onOpenJoinModal={onOpenJoinModal} />} />
          <Route path="/news" element={<News />} />
          <Route path="/resources" element={<Navigate to="/news" replace />} />
          <Route path="/events" element={<Events onOpenJoinModal={onOpenJoinModal} />} />
          {/* Fallback route */}
          <Route path="*" element={<Home onOpenJoinModal={onOpenJoinModal} />} />
        </Routes>
      </main>

      {/* On Home page, the right scrollable column has its own footer; the left fixed screen stays 100% fixed */}
      {!isHomePage && <Footer />}
    </div>
  );
}

export function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout onOpenJoinModal={() => setIsJoinModalOpen(true)} />

      {/* Global Join Community Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </BrowserRouter>
  );
}

export default App;
