'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { XIcon } from './Icons';

interface NavLinkItem {
  name: string;
  path: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLinkItem[];
  onOpenJoinModal?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  links,
}) => {
  const pathname = usePathname();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 top-14 z-30 bg-black/98 border-b border-neutral-800 px-4 pt-3 pb-6 lg:hidden shadow-2xl transition-all">
      <div className="flex flex-col space-y-1">
        {links.map((link) => {
          const isActive = link.path === '/' ? pathname === '/' : pathname === link.path || (pathname?.startsWith(link.path + '/') ?? false);
          return (
            <Link
              key={link.name}
              href={link.path}
              onClick={onClose}
              className={`px-3 py-2.5 rounded font-mono text-xs uppercase tracking-wider transition-colors ${
                isActive
                  ? 'text-white bg-neutral-900 border border-neutral-800 font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-col gap-2.5">
        <a
          href="https://x.com/robelhindeya"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 hover:text-white transition-colors"
          aria-label="X @robelhindeya"
        >
          <div className="flex items-center gap-2">
            <XIcon className="w-4 h-4 text-white" />
            <span className="font-semibold text-white">@robelhindeya</span>
          </div>
          <span className="flex items-center gap-1.5 text-neutral-400">
            <ExternalLink className="w-3 h-3" />
          </span>
        </a>
      </div>
    </div>
  );
};
