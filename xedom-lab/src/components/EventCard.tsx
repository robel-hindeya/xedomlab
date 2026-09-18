import React from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export interface EventData {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'Hackathon' | 'Workshop' | 'Community meetup' | 'Coding challenge';
  description: string;
  platform: string;
  attendeesCount?: number;
  status: 'Upcoming' | 'Live' | 'Registration Open' | 'Concluded';
  link?: string;
  tags?: string[];
}

interface EventCardProps {
  event: EventData;
  onJoin?: (event: EventData) => void;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onJoin,
  className = '',
}) => {
  return (
    <div className={`rounded-lg border border-neutral-800 bg-[#0a0a0a] p-5 sm:p-6 flex flex-col justify-between transition-all duration-150 hover:border-neutral-700 hover:bg-[#0f0f0f] ${className}`}>
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-neutral-800 bg-neutral-900 text-neutral-300 font-medium">
            {event.type}
          </span>
          <span className="text-[11px] font-mono text-neutral-400">
            {event.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
          {event.description}
        </p>

        {/* Details: Date, Time, Platform */}
        <div className="mt-4 space-y-1.5 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span>{event.date}</span>
            {event.time && <span className="text-neutral-500">· {event.time}</span>}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span>{event.platform}</span>
          </div>
          {event.attendeesCount && (
            <div className="flex items-center gap-2 text-neutral-500">
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>{event.attendeesCount} registered</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-5 pt-3.5 border-t border-neutral-800 flex items-center justify-between gap-3">
        {event.tags && event.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 2).map((t, i) => (
              <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400">
                #{t}
              </span>
            ))}
          </div>
        ) : <div />}

        <Button
          size="sm"
          variant={event.status === 'Registration Open' || event.status === 'Live' ? 'primary' : 'secondary'}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => onJoin ? onJoin(event) : window.open('https://discord.gg/xedomlab', '_blank')}
          className="text-xs font-mono"
        >
          {event.status === 'Registration Open' ? 'Register' : event.status === 'Live' ? 'Join Stream' : 'Details'}
        </Button>
      </div>
    </div>
  );
};
