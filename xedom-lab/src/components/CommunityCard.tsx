import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface CommunityCardProps {
  icon: LucideIcon;
  category: string;
  subtitle: string;
  description: string;
  tracks: string[];
  linkTo?: string;
  stat?: string;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  icon: Icon,
  category,
  subtitle,
  description,
  tracks,
  linkTo = '/community',
  stat,
}) => {
  return (
    <div className="group relative rounded-lg border border-neutral-800 bg-[#0a0a0a] p-5 sm:p-6 flex flex-col justify-between transition-all duration-150 hover:border-neutral-700 hover:bg-[#0f0f0f]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {category}
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>

          <Link
            href={linkTo}
            className="w-7 h-7 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
            aria-label={`Explore ${category}`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
          {description}
        </p>
      </div>

      <div>
        <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-2.5">
          Focus:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tracks.map((track, i) => (
            <span
              key={i}
              className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              {track}
            </span>
          ))}
        </div>

        {stat && (
          <div className="mt-5 pt-3.5 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Guild</span>
            <span className="text-neutral-300 font-medium">
              {stat}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
