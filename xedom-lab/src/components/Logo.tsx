import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showBadge = false 
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
    xl: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-2 group select-none transition-opacity duration-150 hover:opacity-85 ${className}`}
    >
      <div className={`relative flex items-center justify-center rounded-md bg-neutral-900 border border-neutral-700/80 p-1 group-hover:border-neutral-500 transition-colors ${iconSizes[size]}`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path 
            d="M6 6L11 12L6 18" 
            stroke="#ffffff" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M18 6L13 12L18 18" 
            stroke="#a3a3a3" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
        </svg>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`font-semibold tracking-tight text-white ${textSizes[size]}`}>
          Xedom<span className="text-neutral-400 font-normal ml-0.5">Lab</span>
        </span>
        {showBadge && (
          <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded border border-neutral-800 bg-neutral-900 text-neutral-400 font-medium">
            community
          </span>
        )}
      </div>
    </Link>
  );
};
