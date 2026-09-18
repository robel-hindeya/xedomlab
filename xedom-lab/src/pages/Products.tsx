import React from 'react';
import { ArrowUpRight, Globe } from 'lucide-react';

interface ProductsProps {
  onOpenJoinModal?: () => void;
}

export const Products: React.FC<ProductsProps> = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-[#000000] text-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
        
        {/* Title */}
        <div className="mb-8">
          <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase block mb-1.5">
            // PRODUCT
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Products
          </h1>
        </div>

        {/* 1 Small Minimal Box */}
        <div className="max-w-md">
          <a
            href="https://xedom.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-neutral-800 bg-[#080808] p-5 hover:border-neutral-700 hover:bg-[#0c0c0c] transition-all duration-150 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
                  <Globe className="w-4 h-4 text-neutral-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>xedom-web</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-500 block">
                    xedom.dev
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Live</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Official web platform for the Xedom developer collective and open-source workspace.
            </p>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-900 text-[11px] font-mono text-neutral-500">
              <span>Web Platform</span>
              <span className="text-neutral-400 group-hover:text-white transition-colors">
                Visit web →
              </span>
            </div>
          </a>
        </div>

      </div>
    </div>
  );
};
