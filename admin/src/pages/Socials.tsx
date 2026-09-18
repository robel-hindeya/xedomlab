import React, { useState } from 'react';
import { ExternalLink, Check, Save } from 'lucide-react';
import { SocialLink } from '../types';
import { api } from '../services/api';

interface SocialsProps {
  socials: SocialLink[];
  onRefresh: () => void;
}

export const Socials: React.FC<SocialsProps> = ({ socials, onRefresh }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentHandle, setCurrentHandle] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  const startEdit = (s: SocialLink) => {
    setEditingId(s.id);
    setCurrentUrl(s.url);
    setCurrentHandle(s.handle);
  };

  const handleSave = async (id: string) => {
    await api.updateSocial(id, { url: currentUrl, handle: currentHandle });
    setEditingId(null);
    setSavedMsg(`Updated ${id}`);
    setTimeout(() => setSavedMsg(''), 2500);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Robel Hindeya's Social & Community Links</h2>
          <p className="text-xs text-neutral-400 font-mono">
            Configured endpoints synced across xedom-lab, backend, and public profiles
          </p>
        </div>

        {savedMsg && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <Check className="w-3.5 h-3.5" />
            <span>{savedMsg}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socials.map((s) => {
          const isEditing = editingId === s.id;
          return (
            <div
              key={s.id}
              className="p-5 rounded-xl border border-neutral-800 bg-[#0a0a0a] hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{s.name}</span>
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400">
                    {s.badge || 'Active'}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 mt-1">{s.description}</p>

                {isEditing ? (
                  <div className="mt-4 space-y-2 font-mono text-xs">
                    <div>
                      <label className="block text-[10px] text-neutral-500 uppercase">Handle</label>
                      <input
                        type="text"
                        value={currentHandle}
                        onChange={(e) => setCurrentHandle(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500 uppercase">Target URL</label>
                      <input
                        type="text"
                        value={currentUrl}
                        onChange={(e) => setCurrentUrl(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 p-3 rounded-lg bg-black border border-neutral-900 space-y-1 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">Handle:</span>
                      <span className="text-neutral-200">{s.handle}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">URL:</span>
                      <span className="text-cyan-400 truncate max-w-[260px]">{s.url}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 text-xs font-mono"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(s.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-white text-black text-xs font-mono font-semibold"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(s)}
                    className="px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
                  >
                    Edit URL
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
