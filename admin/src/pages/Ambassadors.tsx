import React, { useState } from 'react';
import { Check, X, Trash2, ExternalLink, GitBranch, Mail } from 'lucide-react';
import { AmbassadorApplication } from '../types';
import { api } from '../services/api';

interface AmbassadorsProps {
  ambassadors: AmbassadorApplication[];
  onRefresh: () => void;
}

export const Ambassadors: React.FC<AmbassadorsProps> = ({ ambassadors, onRefresh }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filtered = ambassadors.filter((a) => (filter === 'all' ? true : a.status === filter));

  const handleStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    await api.updateAmbassadorStatus(id, status);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this applicant?')) {
      await api.deleteAmbassador(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Ambassador & Fellowship Applications</h2>
          <p className="text-xs text-neutral-400 font-mono">
            {ambassadors.length} total applications submitted
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded capitalize transition-colors ${
                filter === tab
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="p-5 rounded-xl border border-neutral-800 bg-[#0a0a0a] hover:border-neutral-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold text-white">{app.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${
                      app.status === 'approved'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : app.status === 'pending'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-neutral-500" />
                    {app.email}
                  </span>
                  <span>·</span>
                  <span className="text-neutral-300 font-medium">{app.track}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 self-start">
                {app.status !== 'approved' && (
                  <button
                    onClick={() => handleStatus(app.id, 'approved')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-mono border border-emerald-500/20 transition-colors"
                  >
                    <Check className="w-3 h-3" />
                    <span>Approve</span>
                  </button>
                )}

                {app.status !== 'rejected' && (
                  <button
                    onClick={() => handleStatus(app.id, 'rejected')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 text-xs font-mono border border-neutral-800 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    <span>Reject</span>
                  </button>
                )}

                <button
                  onClick={() => handleDelete(app.id)}
                  className="p-1.5 rounded hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Application Reason */}
            <div className="mt-3 p-3 rounded-lg bg-black border border-neutral-900 text-xs text-neutral-300 font-mono">
              <span className="text-[10px] uppercase text-neutral-500 block mb-1">
                Statement of intent:
              </span>
              {app.reason}
            </div>

            {/* Links */}
            <div className="mt-3 flex items-center gap-4 text-xs font-mono text-neutral-400">
              {app.githubUrl && (
                <a
                  href={app.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white"
                >
                  <GitBranch className="w-3 h-3" />
                  <span>GitHub</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
              {app.xUrl && (
                <a
                  href={app.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white"
                >
                  <span>X Handle</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
              <span className="text-[10px] text-neutral-500 ml-auto">
                Submitted {new Date(app.submittedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
