'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  MessageSquare, 
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Award,
  Gift,
  DollarSign,
  Zap
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/Button';
import { GithubIcon } from '../components/Icons';
import { communityValues, communityActivities, communityChannels } from '../data/communityData';

interface CommunityProps {
  onOpenJoinModal: () => void;
}

export const Community: React.FC<CommunityProps> = ({ onOpenJoinModal }) => {
  const whoItsFor = [
    {
      title: 'Aspiring Programmers',
      description: 'Break through the tutorial plateau by working on tangible software and getting unblocked by experienced peers.',
      badge: 'Learn by Doing',
    },
    {
      title: 'Full-time Software Engineers',
      description: 'Exchange notes on system design, benchmark new runtimes, experiment with new stacks, and mentor emerging talent.',
      badge: 'Peer Network',
    },
    {
      title: 'Indie Hackers & Founders',
      description: 'Ship micro-SaaS, developer tools, and niche products with real beta testing and feedback from fellow technical builders.',
      badge: 'Launch & Iterate',
    },
    {
      title: 'Open-Source Maintainers',
      description: 'Find active contributors for your repositories, publish RFCs, and collaborate on shared community libraries.',
      badge: 'Public Software',
    },
  ];

  const featuredContributors = [
    { name: 'Alex Rivera', role: 'Maintainer / Rust Systems', handle: '@arivera', avatar: 'A' },
    { name: 'Elena Rostova', role: 'Audio DSP / C++', handle: '@erostova', avatar: 'E' },
    { name: 'Marcus Chen', role: 'DevOps & Networking', handle: '@mchen', avatar: 'M' },
    { name: 'Sofia Al-Mansoor', role: 'UI / Accessibility', handle: '@sofia_ux', avatar: 'S' },
    { name: 'Tarek Haddad', role: 'Embedded & ESP32', handle: '@thaddad', avatar: 'T' },
    { name: 'Chloe Kim', role: 'ML & Vector Search', handle: '@chloekim', avatar: 'C' },
    { name: 'Julian Vance', role: 'Go & Microservices', handle: '@jvance', avatar: 'J' },
    { name: 'Devon Watts', role: 'Security & Static Analysis', handle: '@dwatts', avatar: 'D' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-neutral-200">
      {/* Community Hero */}
      <section className="relative pt-16 pb-16 md:pt-20 md:pb-24 border-b border-neutral-800 bg-[#000000]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 mb-6">
            <Users className="w-3.5 h-3.5 text-neutral-400" />
            <span>The Builder Collective</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            The home for people who build software.
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Xedom Lab brings together programmers, engineers, and makers across the world to collaborate on real projects, share knowledge, and build open technology.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="md"
              variant="primary"
              onClick={onOpenJoinModal}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Join the Community
            </Button>
            <Button
              size="md"
              variant="secondary"
              href="https://discord.com"
              external={true}
              leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
            >
              Discord Server
            </Button>
          </div>
        </div>
      </section>

      {/* Why Xedom Lab */}
      <section className="py-16 border-b border-neutral-800 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800">
                <span>// MANIFESTO</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                Why we built Xedom Lab.
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Most online tech groups have devolved into spam feeds, self-promotion links, or expensive paywalled courses that don't teach real-world development.
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Xedom Lab was founded on a simple premise: developers learn best by building actual tools, inspecting real architectures, and hacking together. We created an open space where code talks louder than hype, where questions are answered with working pull requests, and where collaboration is default.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-neutral-300">
                    <strong className="text-white">Strictly zero fluff:</strong> Focused entirely on code, engineering principles, and tangible projects.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-neutral-300">
                    <strong className="text-white">Peer code reviews:</strong> Get experienced developers to review your PRs before you deploy.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-neutral-300">
                    <strong className="text-white">Global collaboration:</strong> Team up with engineers across time zones on open-source repositories.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-lg border border-neutral-800 bg-[#0a0a0a] p-5 sm:p-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                  <span className="text-xs font-mono text-neutral-400">community_manifesto.md</span>
                  <span className="text-xs font-mono text-neutral-500">v1.0.0</span>
                </div>

                <div className="space-y-3 font-mono text-xs text-neutral-300 leading-relaxed">
                  <p className="text-neutral-500"># The Xedom Builder Creed</p>
                  <p>1. Talk is cheap. Show me the code.</p>
                  <p>2. Share your knowledge freely without gatekeeping.</p>
                  <p>3. Critique code with empathy and rigorous reasoning.</p>
                  <p>4. Ship early, gather real feedback, iterate fearlessly.</p>
                  <p>5. Support each other's side projects and open-source software.</p>
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                    <span>Signed by community builders worldwide</span>
                    <span className="text-neutral-300">● Open collective</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 border-b border-neutral-800 bg-[#000000]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Audience"
            title="Who belongs in Xedom Lab?"
            subtitle="Whether you are writing your first lines of code or architecting planetary scale databases, there is a seat for you at the bench."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {whoItsFor.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between hover:border-neutral-700 hover:bg-[#0f0f0f] transition-all"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium inline-block mb-3">
                    {item.badge}
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Values */}
      <section className="py-16 border-b border-neutral-800 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Philosophy"
            title="Our Community Values"
            subtitle="The principles that guide how we build, interact, and grow as an engineering ecosystem."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {communityValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-lg border border-neutral-800 bg-[#0a0a0a] flex items-start gap-4 hover:border-neutral-700 transition-all"
                >
                  <div className="w-10 h-10 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {val.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Activities */}
      <section className="py-16 border-b border-neutral-800 bg-[#000000]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Rituals"
            title="Community Activities"
            subtitle="Regular gatherings, pairing sessions, and hackathons designed to keep you building consistently."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {communityActivities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-lg border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between hover:border-neutral-700 transition-all"
                >
                  <div>
                    <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 block mb-1">
                      {act.frequency}
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {act.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Channels */}
      <section className="py-16 border-b border-neutral-800 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Channels"
            title="Join the Discussion"
            subtitle="Choose your preferred platform to connect with developers, ask questions, and share what you are working on."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {communityChannels.map((chan, idx) => {
              const Icon = chan.icon;
              return (
                <a
                  key={idx}
                  href={chan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-lg border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between hover:border-neutral-700 hover:bg-[#111111] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                        {chan.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {chan.name}
                    </h3>
                    <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                      {chan.handle}
                    </p>
                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                      {chan.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-300">
                    <span>Connect</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ambassador Program Section */}
      <section className="py-20 border-b border-neutral-800 bg-[#060606] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-neutral-800 bg-gradient-to-b from-[#0c0c0c] to-[#060606] p-7 sm:p-12 relative overflow-hidden shadow-2xl">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-300 bg-neutral-900 border border-neutral-800 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
                <span>Ambassador Program</span>
                <span className="text-neutral-600">·</span>
                <span className="text-emerald-400 font-bold">Cohort 2026 Open</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Become a Xedom Lab Ambassador.
              </h2>

              <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
                Represent the engineering frontier in your university, city, or open-source ecosystem. Lead workshops, organize campus hackathons, and shape community technology with direct financial backing and mentorship.
              </p>

              {/* 4 Feature Highlights */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#090909] flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Event Micro-Grants</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      $250 to $1,000 grants per meetup for venue rentals, catering, and hackathon prizes.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#090909] flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Welcome Crate</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Custom mechanical keyboard kit, heavyweight hoodie, badge, and attendee swag.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#090909] flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Direct Core Access</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Bi-weekly roadmap briefings with core staff engineers and private Discord access.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#090909] flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Verified Credential</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Profile in the official ambassador directory and speaking endorsements for talks.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 pt-6 border-t border-neutral-850 flex flex-wrap items-center gap-4">
                <Link
                  href="/ambassador#apply-form"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-mono font-bold text-black bg-white hover:bg-neutral-200 transition-all shadow-md"
                >
                  <span>Apply to Ambassador Program</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/ambassador"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-all"
                >
                  <span>Explore Program Perks & Tracks</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Contributors */}
      <section className="py-16 border-b border-neutral-800 bg-[#000000]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Builders"
            title="Featured Community Contributors"
            subtitle="Engineers and makers leading workshops, reviewing community code, and maintaining open-source modules."
          />

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {featuredContributors.map((c, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-neutral-800 bg-[#0a0a0a] flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {c.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{c.name}</p>
                  <p className="text-[10px] text-neutral-400 font-mono truncate">{c.handle}</p>
                  <p className="text-[10px] text-neutral-500 truncate">{c.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="sm"
              href="https://github.com"
              external={true}
              leftIcon={<GithubIcon className="w-3.5 h-3.5" />}
              className="text-xs font-mono"
            >
              Become a Contributor on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-16 bg-[#050505] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Ready to build with us?
          </h2>
          <p className="mt-2 text-neutral-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Join Xedom Lab today. No subscription fees, no promotional noise—just developers building together.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button size="md" variant="primary" onClick={onOpenJoinModal}>
              Join Xedom Lab Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
