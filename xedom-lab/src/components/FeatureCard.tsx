import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  className?: string;
  footer?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  badge,
  className = '',
  footer,
}) => {
  return (
    <div className={`relative rounded-lg border border-neutral-800 bg-[#0a0a0a] p-5 hover:border-neutral-700 hover:bg-[#0f0f0f] transition-all flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-neutral-900 border border-neutral-800 text-white">
            <Icon className="w-4 h-4" />
          </div>
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
          {title}
        </h3>
        
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>

      {footer && (
        <div className="mt-4 pt-3 border-t border-neutral-800 text-xs text-neutral-500">
          {footer}
        </div>
      )}
    </div>
  );
};
