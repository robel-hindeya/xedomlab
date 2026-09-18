import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { XIcon } from './Icons';

interface NavbarProps {
  onOpenJoinModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'README', path: '/' },
    { name: 'COMMUNITY', path: '/community' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'NEWS', path: '/news' },
    { name: 'EVENTS', path: '/events' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-150 border-b border-neutral-800 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md'
            : 'bg-black'
        }`}
      >
        <div className="w-full h-14 flex items-stretch justify-between">
          {/* Logo container */}
          <div className="flex items-center px-4 sm:px-6 border-r border-neutral-800">
            <Logo size="md" showBadge={true} />
          </div>

          {/* Center / Desktop Navigation tabs */}
          <nav className="hidden lg:flex items-stretch flex-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `flex items-center px-4 xl:px-5 border-r border-neutral-800 font-mono text-xs uppercase tracking-wider transition-colors duration-150 ${
                    isActive
                      ? 'text-white bg-neutral-900/60 font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center">
            <a
              href="https://x.com/xedomlab"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 h-full px-4 border-l border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:bg-neutral-900/40 transition-colors group"
              aria-label="Follow X @xedomlab"
            >
              <XIcon className="w-3.5 h-3.5 text-white" />
              <span className="font-semibold text-white">@xedomlab</span>
              <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 group-hover:text-neutral-300 transition-colors">
                14.2k
              </span>
            </a>

            {/* Mobile Toggle */}
            <div className="flex lg:hidden items-center px-3 border-l border-neutral-800 h-full">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
        onOpenJoinModal={onOpenJoinModal}
      />
    </>
  );
};
