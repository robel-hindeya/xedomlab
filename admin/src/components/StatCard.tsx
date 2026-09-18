import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color?: 'emerald' | 'cyan' | 'amber' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  icon: Icon,
}) => {
  return (
    <div className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] hover:border-neutral-700 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-black text-white tracking-tight">{value}</span>
        {change && <span className="text-[11px] font-mono text-neutral-400">{change}</span>}
      </div>
    </div>
  );
};
