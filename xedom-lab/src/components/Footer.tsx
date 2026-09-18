import React from 'react';
import { GithubIcon, XIcon, DiscordIcon, TelegramIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#000000] border-t border-neutral-900 py-12 sm:py-16 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/robel-hindeya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-800 bg-neutral-950 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://x.com/robelhindeya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-800 bg-neutral-950 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <XIcon className="w-3.5 h-3.5" />
            <span>X (Twitter)</span>
          </a>
          <a
            href="https://www.linkedin.com/in/robelhindeya/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-800 bg-neutral-950 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://discord.com/channels/1515283832419520522/1515610695729938482"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-800 bg-neutral-950 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <DiscordIcon className="w-3.5 h-3.5" />
            <span>Discord</span>
          </a>
          <a
            href="https://t.me/xedomlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-800 bg-neutral-950 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <TelegramIcon className="w-3.5 h-3.5" />
            <span>Telegram</span>
          </a>
        </div>

        <div className="w-full text-center">
          <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[14rem] font-black tracking-tighter text-neutral-800/80 hover:text-neutral-600 transition-colors leading-none">
            xedomlab
          </span>
        </div>
      </div>
    </footer>
  );
};

