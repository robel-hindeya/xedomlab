import React, { useState } from 'react';
import { 
  Trophy, 
  Check, 
  Calendar, 
  Award, 
  Users, 
  ArrowRight, 
  BookOpen, 
  Code, 
  Camera,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/Button';
import { PastHackathonModal } from '../components/PastHackathonModal';
import { 
  latestHackathon, 
  pastHackathons 
} from '../data/eventsData';
import type { PastHackathon } from '../data/eventsData';

interface EventsProps {
  onOpenJoinModal?: () => void;
}

export const Events: React.FC<EventsProps> = () => {
  const [selectedPastHackathon, setSelectedPastHackathon] = useState<PastHackathon | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredEventName, setRegisteredEventName] = useState<string | null>(null);

  const handleRegisterLatest = () => {
    setRegisteredEventName(latestHackathon.title);
    setIsRegistered(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-neutral-200">
      
      {/* ========================================================= */}
      {/* 1. TOP HEADER                                             */}
      {/* ========================================================= */}
      <section className="relative pt-16 pb-12 border-b border-neutral-800 bg-[#000000]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 mb-6">
            <Trophy className="w-3.5 h-3.5 text-neutral-300" />
            <span>Xedom Lab Hackathons</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Build together in real time.
          </h1>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            48-hour competitive software sprints, open-source builder grants, live code reviews, and retrospectives.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. LATEST HACKATHON (FLAGSHIP UPCOMING SPRINT)             */}
      {/* ========================================================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
            // LATEST HACKATHON
          </span>
          <div className="flex-1 border-t border-neutral-800" />
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#070707] overflow-hidden">
          
          {/* Top Banner Bar */}
          <div className="p-6 sm:p-8 lg:p-10 border-b border-neutral-800 bg-gradient-to-b from-neutral-900/40 via-transparent to-transparent">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-white text-black font-bold">
                    {latestHackathon.status}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-neutral-300 bg-neutral-900 border border-neutral-800">
                    {latestHackathon.edition}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    ● {latestHackathon.attendeesCount} builders registered
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  {latestHackathon.title}
                </h2>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {latestHackathon.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-2">
                  <span className="flex items-center gap-1.5 text-neutral-200">
                    <Calendar className="w-4 h-4 text-neutral-400" />
                    {latestHackathon.date}
                  </span>
                  <span>·</span>
                  <span>{latestHackathon.time}</span>
                  <span>·</span>
                  <span>{latestHackathon.platform}</span>
                </div>
              </div>

              {/* Prize & CTA Card */}
              <div className="p-5 rounded-lg border border-neutral-800 bg-[#0a0a0a] min-w-[260px] space-y-3 shrink-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 uppercase">
                    <Award className="w-3.5 h-3.5 text-neutral-300" />
                    <span>Total Prize Pool</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
                    {latestHackathon.prizePool}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    Grants awarded directly to open-source maintainers.
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    size="md"
                    variant="primary"
                    onClick={handleRegisterLatest}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full justify-center"
                  >
                    Register for Hackathon
                  </Button>

                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-mono text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
                  >
                    <span>Discord Hackathon Room</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Tracks & Judges Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
            
            {/* Tracks Column (2 cols wide) */}
            <div className="lg:col-span-2 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-400">
                <Code className="w-4 h-4 text-neutral-300" />
                <span>Hackathon Engineering Tracks</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {latestHackathon.tracks.map((track, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-neutral-800/80 bg-[#0c0c0c]">
                    <h4 className="text-sm font-bold text-white mb-1">
                      {track.name}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {track.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Judges & Panelists Column */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-400">
                <Users className="w-4 h-4 text-neutral-300" />
                <span>Judges & Panelists</span>
              </div>

              <div className="space-y-3 pt-1">
                {latestHackathon.panelists.map((judge, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg border border-neutral-900 bg-[#0a0a0a]">
                    <div className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center font-mono font-bold text-xs text-white shrink-0">
                      {judge.avatarText}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{judge.name}</div>
                      <div className="text-[11px] text-neutral-400 truncate">{judge.role}</div>
                      <div className="text-[10px] font-mono text-neutral-500 truncate">{judge.company}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. LAST HACKATHONS (EXACTLY 2 PAST HACKATHONS)            */}
      {/* ========================================================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">
              // ARCHIVE & RETROSPECTIVES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Last Hackathons
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400">
              Click any past hackathon to inspect judges, panelists, winners, and full retrospective blog recaps.
            </p>
          </div>
        </div>

        {/* 2 Past Hackathons Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pastHackathons.map((past) => (
            <div
              key={past.id}
              onClick={() => setSelectedPastHackathon(past)}
              className="group rounded-xl border border-neutral-800 bg-[#090909] hover:border-neutral-600 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Card Banner Preview Image with Cover Photo */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden border-b border-neutral-800 bg-neutral-950">
                <img
                  src={past.coverImage}
                  alt={past.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Dark gradient overlay for razor-sharp typography contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/70 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/60 via-transparent to-transparent" />

                {/* Status & Date Badges on top */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md text-neutral-200 border border-neutral-700 font-medium">
                    {past.status}
                  </span>
                  <span className="text-xs font-mono text-neutral-300 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-neutral-800">
                    {past.date}
                  </span>
                </div>

                {/* Title & Edition overlay at bottom of image */}
                <div className="absolute bottom-3.5 left-4 right-4 z-10">
                  <span className="text-[11px] font-mono text-neutral-400 block mb-0.5">
                    {past.edition}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-neutral-100 transition-colors">
                    {past.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2">
                    {past.summary}
                  </p>

                  {/* Stat Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-neutral-850 font-mono text-center">
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white">{past.participants}</div>
                      <div className="text-[10px] text-neutral-500 uppercase">Builders</div>
                    </div>
                    <div className="border-x border-neutral-800">
                      <div className="text-xs sm:text-sm font-bold text-white">{past.projectsSubmitted}</div>
                      <div className="text-[10px] text-neutral-500 uppercase">Projects</div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white">{past.prizeAwarded}</div>
                      <div className="text-[10px] text-neutral-500 uppercase">Prizes</div>
                    </div>
                  </div>

                  {/* Panelists Avatars Teaser & Photo Count */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="font-mono text-[11px] text-neutral-500">Panelists:</span>
                      <div className="flex -space-x-1.5">
                        {past.panelists.map((p, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-mono text-[9px] font-bold text-white"
                            title={`${p.name} (${p.company})`}
                          >
                            {p.avatarText}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-500">
                      <span className="flex items-center gap-1 text-neutral-400">
                        <Camera className="w-3 h-3" />
                        {past.gallery.length} Photos
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {past.blog.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inspect Action Button */}
                <div className="pt-4 border-t border-neutral-850 flex items-center justify-between text-xs font-mono text-white group-hover:text-neutral-200">
                  <span>View Photos, Panelists, Winners & Blog</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* MODALS                                                    */}
      {/* ========================================================= */}
      {/* 1. Past Hackathon Viewer Modal (Image, Info, Panelists, Blog) */}
      <PastHackathonModal
        hackathon={selectedPastHackathon}
        onClose={() => setSelectedPastHackathon(null)}
      />

      {/* 2. Registration Confirmed Modal */}
      {isRegistered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-xl border border-neutral-800 bg-[#0a0a0a] p-6 shadow-2xl">
            <div className="flex items-center gap-1.5 text-neutral-300 text-xs font-mono mb-2">
              <Check className="w-4 h-4 text-white" />
              <span>REGISTRATION CONFIRMED</span>
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight">
              You're registered for the sprint
            </h3>

            <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
              You have secured a spot for <strong className="text-white">{registeredEventName}</strong>. Instructions and classroom invitation will be sent via Discord.
            </p>

            <div className="mt-4 p-3.5 rounded bg-[#050505] border border-neutral-800 space-y-1.5 text-xs font-mono text-neutral-400">
              <div>Event: {registeredEventName}</div>
              <div>Access: Open-Source Builders Cohort</div>
              <div>Platform: Discord Stage + GitHub Classroom</div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                size="sm"
                variant="primary"
                onClick={() => setIsRegistered(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
