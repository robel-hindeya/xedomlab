import React, { useState } from 'react';
import { Trash2, Copy, Check, Download, Mail } from 'lucide-react';
import { Subscriber } from '../types';
import { api } from '../services/api';

interface SubscribersProps {
  subscribers: Subscriber[];
  onRefresh: () => void;
}

export const Subscribers: React.FC<SubscribersProps> = ({ subscribers, onRefresh }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = () => {
    const emails = subscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Remove subscriber?')) {
      await api.deleteSubscriber(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Waitlist & Drops Subscribers</h2>
          <p className="text-xs text-neutral-400 font-mono">
            {subscribers.length} total active subscribers
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied All' : 'Copy All Emails'}</span>
        </button>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-[#0a0a0a] overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-black/50 border-b border-neutral-800 text-neutral-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-5 py-3">Email Address</th>
              <th className="px-5 py-3">Subscribed At</th>
              <th className="px-5 py-3">Source Channel</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-neutral-900/40 transition-colors">
                <td className="px-5 py-3.5 text-white font-medium flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{sub.email}</span>
                </td>
                <td className="px-5 py-3.5 text-neutral-400">
                  {new Date(sub.subscribedAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-3.5">
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400">
                    {sub.source || 'web'}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="p-1 rounded hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-colors"
                    title="Remove subscriber"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
