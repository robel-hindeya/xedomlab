import React, { useState } from 'react';
import { Plus, Trash2, Calendar, MapPin, Trophy, ExternalLink } from 'lucide-react';
import { EventItem } from '../types';
import { api } from '../services/api';

interface EventsProps {
  events: EventItem[];
  onRefresh: () => void;
}

export const Events: React.FC<EventsProps> = ({ events, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Hackathon' | 'Workshop' | 'Meetup' | 'Demo Day'>('Hackathon');
  const [date, setDate] = useState('April 2026');
  const [time, setTime] = useState('18:00 UTC');
  const [status, setStatus] = useState<'upcoming' | 'ongoing' | 'past'>('upcoming');
  const [prizePool, setPrizePool] = useState('$15,000 Bounty Pool');
  const [location, setLocation] = useState('Virtual / Global Discord Hub');
  const [description, setDescription] = useState('');
  const [registrationUrl, setRegistrationUrl] = useState(
    'https://discord.com/channels/1515283832419520522/1515610695729938482'
  );
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    setSubmitting(true);
    await api.createEvent({
      title,
      type,
      date,
      time,
      status,
      prizePool: prizePool || undefined,
      location,
      description,
      registrationUrl,
    });
    setSubmitting(false);
    setShowModal(false);
    setTitle('');
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this event?')) {
      await api.deleteEvent(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Events, Hackathons & Workshops</h2>
          <p className="text-xs text-neutral-400 font-mono">
            {events.length} community events scheduled
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-black text-xs font-mono font-semibold hover:bg-neutral-200 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-5 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between hover:border-neutral-700 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400 uppercase font-semibold">
                  {event.type}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase font-semibold">
                  {event.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mt-3">{event.title}</h3>
              <p className="text-xs text-neutral-400 mt-1">{event.description}</p>

              <div className="mt-4 space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>
                    {event.date} {event.time ? `· ${event.time}` : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{event.location}</span>
                </div>
                {event.prizePool && (
                  <div className="flex items-center gap-2 text-amber-400">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{event.prizePool}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
              {event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300"
                >
                  <span>Registration Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-xs font-mono text-neutral-500">No external link</span>
              )}

              <button
                onClick={() => handleDelete(event.id)}
                className="p-1.5 rounded hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Create Event / Hackathon</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Meetup">Meetup</option>
                    <option value="Demo Day">Demo Day</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Prize / Bounty Pool</label>
                  <input
                    type="text"
                    placeholder="$15,000 Bounty Pool"
                    value={prizePool}
                    onChange={(e) => setPrizePool(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Location / Hub</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Registration URL</label>
                <input
                  type="text"
                  value={registrationUrl}
                  onChange={(e) => setRegistrationUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 rounded bg-neutral-800 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded bg-white text-black font-semibold"
                >
                  {submitting ? 'Creating...' : 'Schedule Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
