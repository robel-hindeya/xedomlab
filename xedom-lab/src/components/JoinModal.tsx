import React, { useState } from 'react';
import { X, MessageSquare, Send, Check, Terminal } from 'lucide-react';
import { Button } from './Button';
import { GithubIcon, XIcon } from './Icons';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg rounded-xl border border-neutral-800 bg-[#0a0a0a] p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Join collective
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight">
          Welcome to Xedom Lab
        </h2>
        
        <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Connect with developers, programmers, and engineers building real-world software and hardware.
        </p>

        {/* Community Channels */}
        <div className="mt-5 space-y-2">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 hover:border-neutral-700 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Discord
                </div>
                <div className="text-xs text-neutral-400">
                  Voice lounges, code pairing & discussions
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-300 px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700">
              Join &rarr;
            </span>
          </a>

          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 hover:border-neutral-700 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Telegram
                </div>
                <div className="text-xs text-neutral-400">
                  Daily announcements, async dev Q&A
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-300 px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700">
              Open &rarr;
            </span>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 hover:border-neutral-700 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
                <GithubIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  GitHub
                </div>
                <div className="text-xs text-neutral-400">
                  Contribute to open repositories & RFCs
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-300 px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700">
              Star &rarr;
            </span>
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 hover:border-neutral-700 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
                <XIcon className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  X (Twitter)
                </div>
                <div className="text-xs text-neutral-400">
                  Engineering highlights and announcements
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-300 px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700">
              Follow &rarr;
            </span>
          </a>
        </div>

        {/* Weekly Drops Subscription */}
        <div className="mt-5 pt-4 border-t border-neutral-800">
          {subscribed ? (
            <div className="p-3 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-mono flex items-center gap-2">
              <Check className="w-4 h-4 text-white" />
              <span>Subscribed. Welcome to weekly Xedom Lab updates.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@domain.com"
                className="flex-1 px-3 py-2 rounded bg-[#050505] border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
              />
              <Button type="submit" size="sm" variant="primary">
                Subscribe
              </Button>
            </form>
          )}
        </div>

        {/* Quick CLI command tip */}
        <div className="mt-3.5 p-2 rounded bg-neutral-950 border border-neutral-850 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-neutral-400" />
            <code>npx xedom-lab@latest init</code>
          </div>
          <span className="text-neutral-500">v1.0.0</span>
        </div>
      </div>
    </div>
  );
};
