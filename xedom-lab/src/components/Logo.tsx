import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
      <div className={`relative shrink-0 overflow-hidden rounded-md border border-neutral-700/80 bg-[#242424] transition-colors group-hover:border-neutral-500 ${iconSizes[size]}`}>
        <Image
          src="/xedom-logo.png"
          alt="Xedom logo"
          fill
          sizes="40px"
          className="object-cover"
        />
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
