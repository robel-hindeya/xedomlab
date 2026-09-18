import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ArrowRight, 
  Terminal, 
  BookOpen, 
  Sparkles, 
  GitPullRequest, 
  MessageSquare, 
  Layers, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { GithubIcon, XIcon, DiscordIcon, TelegramIcon } from '../components/Icons';
import { TrustedBy } from '../components/TrustedBy';
import { MobileMenu } from '../components/MobileMenu';
import { CommunityCard } from '../components/CommunityCard';
import { ProjectCard } from '../components/ProjectCard';
import { EventCard } from '../components/EventCard';
import { communityCategories, communityChannels } from '../data/communityData';
import { projectsList } from '../data/projectsData';
import { eventsList } from '../data/eventsData';

interface HomeProps {
  onOpenJoinModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenJoinModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'README', path: '/' },
    { name: 'COMMUNITY', path: '/community' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'NEWS', path: '/news' },
    { name: 'EVENTS', path: '/events' },
  ];

  return (
    <div className="w-full bg-[#000000] text-neutral-200">
      {/* SPLIT SCREEN CONTAINER: Half Screen Fixed / Half Screen Scroll Down */}
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: 100% FIXED ON DESKTOP                       */}
        {/* Full Viewport Height (h-screen), Physically Fixed to Top */}
        {/* NO NAVBAR, NO FOOTER                                      */}
        {/* WITH AMBIENT DEVELOPER BACKGROUND                         */}
        {/* ========================================================= */}
        <aside className="w-full lg:w-[42%] xl:w-[40%] lg:fixed lg:top-0 lg:left-0 lg:bottom-0 lg:h-screen z-20 bg-[#000000] border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between overflow-hidden">
          
          {/* BACKGROUND LAYERS FOR FIXED SCREEN */}
          <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
            {/* 1. Subtle Dot Matrix & Grid */}
            <div className="absolute inset-0 bg-dot-matrix opacity-35" />
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />

            {/* 2. Soft Radial Vignette - Centered Highlight */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'radial-gradient(ellipse at 50% 45%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 45%, transparent 75%)'
              }}
            />

            {/* 3. Subtle Ambient Monogram Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] opacity-[0.035] select-none">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-white" strokeWidth="1">
                <path d="M6 6L11 12L6 18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 6L13 12L18 18" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="1.5" fill="white" />
              </svg>
            </div>

            {/* 4. Architectural Corner Crosshairs (+) like Better Auth */}
            <div className="absolute top-4 left-4 font-mono text-[11px] text-neutral-800 select-none">+</div>
            <div className="absolute top-4 right-4 font-mono text-[11px] text-neutral-800 select-none">+</div>
            <div className="absolute bottom-4 left-4 font-mono text-[11px] text-neutral-800 select-none">+</div>
            <div className="absolute bottom-4 right-4 font-mono text-[11px] text-neutral-800 select-none">+</div>
          </div>

          {/* FOREGROUND CONTENT */}
          <div className="relative z-10 flex flex-col justify-between h-full p-8 sm:p-12 lg:p-14 xl:p-16">
            {/* Top: Logo Only */}
            <div>
              <Logo size="xl" showBadge={false} />
            </div>

            {/* Center: Motto "Beyond the ordinary" & 1 Button "Join Community" */}
            <div className="my-auto py-12 lg:py-0 space-y-8">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08]">
                Beyond the<br />ordinary.
              </h1>

              <div>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={onOpenJoinModal}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="px-6 py-3.5 text-sm font-medium shadow-sm hover:shadow-md transition-all"
                >
                  Join Community
                </Button>
              </div>
            </div>

            {/* Bottom: Social Media Icons */}
            <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                  aria-label="Discord"
                >
                  <DiscordIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </a>
              </div>

              <span className="text-[11px] text-neutral-500 font-mono">● Open collective</span>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: SCROLLS DOWN                                */}
        {/* Offset by fixed left pane width on desktop: lg:ml-[42%]   */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[58%] xl:w-[60%] lg:ml-[42%] xl:ml-[40%] bg-[#000000] min-w-0 flex flex-col">
          
          {/* Right Column Header: Sticky Navigation Bar */}
          <header className="sticky top-0 z-30 w-full bg-black/95 backdrop-blur-md border-b border-neutral-800">
            <div className="h-14 flex items-stretch justify-between">
              {/* Monospace tab links */}
              <nav className="hidden sm:flex items-stretch flex-1 overflow-x-auto no-scrollbar">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center px-4 xl:px-5 border-r border-neutral-800 font-mono text-xs uppercase tracking-wider transition-colors duration-150 whitespace-nowrap ${
                        isActive
                          ? 'text-white bg-neutral-900/60 font-semibold'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {/* Mobile brand indicator for small viewports */}
              <div className="sm:hidden flex items-center px-4 font-mono text-xs text-neutral-400">
                <span>README</span>
              </div>

              {/* Right actions: X & Join */}
              <div className="flex items-center shrink-0">
                <a
                  href="https://x.com/xedomlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 h-full px-4 border-l border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:bg-neutral-900/40 transition-colors group"
                  aria-label="Follow X @xedomlab"
                >
                  <XIcon className="w-3.5 h-3.5 text-white" />
                  <span className="font-semibold text-white">@xedomlab</span>
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 group-hover:text-neutral-300 transition-colors">
                    14.2k
                  </span>
                </a>

                {/* Mobile Hamburger Toggle */}
                <div className="flex sm:hidden items-center px-3 border-l border-neutral-800 h-full">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                    aria-label="Toggle navigation menu"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Menu Drawer */}
          <MobileMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            links={navLinks}
            onOpenJoinModal={onOpenJoinModal}
          />

          {/* Scrollable Content Container */}
          <div className="divide-y divide-neutral-800/80">
            
            {/* 1. README Section */}
            <section className="p-6 sm:p-8 xl:p-10">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                  <span>README.md</span>
                </div>
                <span className="font-mono text-[11px] text-neutral-600">v1.0.0</span>
              </div>

              {/* Short description for Xedom */}
              <p className="text-sm sm:text-[15px] text-neutral-400 mb-6 leading-relaxed">
                A community for <span className="font-medium text-white">developers and builders</span>. Learn by building real systems, collaborate on open-source software, and push technology <span className="font-medium text-white">beyond the ordinary</span>.
              </p>

              {/* TRUSTED BY: MOVING COMPANY LOGOS MARQUEE (UNDER README) */}
              <TrustedBy className="my-2" />
            </section>

            {/* 2. Built for People Who Build (Guilds) */}
            <section className="p-6 sm:p-8 xl:p-10">
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                  // ECOSYSTEM
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Built for people who build.
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-neutral-400">
                  Find your circle of engineers, share code, and solve hard technical challenges.
                </p>
              </div>

              <div className="space-y-4">
                {communityCategories.map((cat, idx) => (
                  <CommunityCard
                    key={idx}
                    icon={cat.icon}
                    category={cat.category}
                    subtitle={cat.subtitle}
                    description={cat.description}
                    tracks={cat.tracks}
                    stat={cat.stat}
                    linkTo={cat.linkTo}
                  />
                ))}
              </div>
            </section>

            {/* 3. Learn by Building */}
            <section className="p-6 sm:p-8 xl:p-10">
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                  // METHODOLOGY
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Learn by building.
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-neutral-400">
                  Theoretical courses only take you so far. Real mastery happens when you write code and inspect real systems.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-lg border border-neutral-800 bg-[#0a0a0a]">
                  <BookOpen className="w-4 h-4 text-white mb-2" />
                  <h3 className="text-sm font-bold text-white">Practical Deep Dives</h3>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    Step-by-step walkthroughs covering distributed consensus, memory safety, and compiler design.
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-neutral-800 bg-[#0a0a0a]">
                  <Layers className="w-4 h-4 text-white mb-2" />
                  <h3 className="text-sm font-bold text-white">Curated Developer Tooling</h3>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    Hand-picked libraries, architectural cheat sheets, benchmarking suites, and production boilerplate.
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-neutral-800 bg-[#0a0a0a]">
                  <Terminal className="w-4 h-4 text-white mb-2" />
                  <h3 className="text-sm font-bold text-white">Tested Code Examples</h3>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    Real code snippets in TypeScript, Go, Rust, and Python demonstrating production patterns.
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-neutral-800 bg-[#0a0a0a]">
                  <GitPullRequest className="w-4 h-4 text-white mb-2" />
                  <h3 className="text-sm font-bold text-white">Open-Source Contributions</h3>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    Find curated good first issue repositories, propose RFCs, review peer pull requests.
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-neutral-800 bg-[#0a0a0a]">
                  <Sparkles className="w-4 h-4 text-white mb-2" />
                  <h3 className="text-sm font-bold text-white">Weekly Developer Drops</h3>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    Top technical articles, breakdown of emerging tools, and spotlight on member projects.
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-neutral-800 bg-[#0a0a0a]">
                  <MessageSquare className="w-4 h-4 text-white mb-2" />
                  <h3 className="text-sm font-bold text-white">Technical Discussions</h3>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    Discussions about database trade-offs, language paradigms, memory safety, and infrastructure.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Build Something Real (Projects Showcase) */}
            <section className="p-6 sm:p-8 xl:p-10">
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                  // SHOWCASE
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Build something real.
                </h2>
              </div>

              <div className="space-y-4">
                {projectsList.slice(0, 3).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            {/* 5. Build Together (Events & Hackathons) */}
            <section className="p-6 sm:p-8 xl:p-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                    // SESSIONS & HACKATHONS
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Build together.
                  </h2>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  to="/events"
                  className="text-xs font-mono"
                >
                  Schedule &rarr;
                </Button>
              </div>

              <div className="space-y-4">
                {eventsList.slice(0, 2).map((evt) => (
                  <EventCard key={evt.id} event={evt} onJoin={onOpenJoinModal} />
                ))}
              </div>
            </section>

            {/* 6. Community Channels */}
            <section className="p-6 sm:p-8 xl:p-10">
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                  // CONNECT
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Community channels.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {communityChannels.map((chan, idx) => {
                  const Icon = chan.icon;
                  return (
                    <a
                      key={idx}
                      href={chan.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-lg border border-neutral-800 bg-[#0a0a0a] hover:border-neutral-700 hover:bg-[#111111] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-white flex items-center gap-2">
                            <Icon className="w-4 h-4 text-neutral-300" />
                            {chan.name}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500">
                            {chan.badge}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 line-clamp-2">
                          {chan.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                        <span>{chan.handle}</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>

            {/* Right-Pane Footer: Big xedomlab text */}
            <footer className="w-full bg-[#000000] border-t border-neutral-900 py-16 sm:py-24 overflow-hidden select-none">
              <div className="w-full text-center px-4">
                <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-black tracking-tighter text-neutral-800/80 hover:text-neutral-600 transition-colors leading-none">
                  xedomlab
                </span>
              </div>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
};
