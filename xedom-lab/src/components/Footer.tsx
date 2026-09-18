import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#000000] border-t border-neutral-900 py-16 sm:py-24 overflow-hidden select-none">
      <div className="w-full text-center px-4">
        <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[14rem] font-black tracking-tighter text-neutral-800/80 hover:text-neutral-600 transition-colors leading-none">
          xedomlab
        </span>
      </div>
    </footer>
  );
};
