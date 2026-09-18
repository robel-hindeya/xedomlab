import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trophy, 
  Users, 
  Code, 
  Award, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  Layers,
  Camera,
  ArrowRight,
  ZoomIn
} from 'lucide-react';
import type { PastHackathon } from '../data/eventsData';

interface PastHackathonModalProps {
  hackathon: PastHackathon | null;
  onClose: () => void;
}

export const PastHackathonModal: React.FC<PastHackathonModalProps> = ({
  hackathon,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'gallery' | 'panelists' | 'blog'>('info');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption: string; tag?: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      }
    };

    if (hackathon) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hackathon, lightboxImage, onClose]);

  // Reset tab and lightbox when hackathon changes
  useEffect(() => {
    setActiveTab('info');
    setLightboxImage(null);
  }, [hackathon?.id]);

  if (!hackathon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] rounded-xl border border-neutral-800 bg-[#080808] text-neutral-200 shadow-2xl flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/90 sticky top-0 z-20">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
            <span className="uppercase tracking-wider font-semibold">{hackathon.edition}</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300">{hackathon.date}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-800/80">
          
          {/* ========================================================= */}
          {/* 1. HERO BANNER IMAGE SECTION                              */}
          {/* ========================================================= */}
          <div className="relative w-full h-56 sm:h-72 overflow-hidden bg-neutral-950">
            <img
              src={hackathon.coverImage}
              alt={hackathon.title}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for ultra-crisp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-neutral-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/85 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-8 sm:right-8 z-10 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-neutral-700 font-medium">
                  {hackathon.status}
                </span>
                <span className="text-xs font-mono text-neutral-300 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded border border-neutral-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  {hackathon.date}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {hackathon.title}
              </h2>
            </div>
          </div>

          {/* Quick Summary & Stat Badges Bar */}
          <div className="p-5 sm:p-6 bg-[#080808] space-y-4">
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
              {hackathon.summary}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-950/70">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono mb-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Builders</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white font-mono">
                  {hackathon.participants}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-950/70">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono mb-1">
                  <Code className="w-3.5 h-3.5" />
                  <span>Submissions</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white font-mono">
                  {hackathon.projectsSubmitted}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-950/70">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Total Prize</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white font-mono">
                  {hackathon.prizeAwarded}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-950/70">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Theme</span>
                </div>
                <div className="text-xs font-semibold text-neutral-300 truncate font-mono" title={hackathon.theme}>
                  {hackathon.theme}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center border-b border-neutral-800 bg-neutral-950 px-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('info')}
              className={`py-3 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'info'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Overview & Winners</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`py-3 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Event Photos ({hackathon.gallery.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('panelists')}
              className={`py-3 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'panelists'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Panelists & Judges ({hackathon.panelists.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`py-3 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'blog'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Blog & Recap</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW & WINNING PROJECTS                        */}
          {/* ========================================================= */}
          {activeTab === 'info' && (
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Event Photos Teaser Strip */}
              <div className="space-y-3 pb-6 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-400">
                    <Camera className="w-3.5 h-3.5 text-neutral-300" />
                    <span>Event Photos & Snapshots</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View all {hackathon.gallery.length} photos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {hackathon.gallery.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxImage(img)}
                      className="group relative h-28 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer"
                      title={img.caption}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-1.5 right-1.5 p-1 rounded bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-3 h-3" />
                      </div>
                      <span className="absolute bottom-1.5 left-1.5 text-[9px] font-mono bg-black/80 px-1.5 py-0.5 rounded text-neutral-300 border border-neutral-700">
                        {img.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Winning Projects Section */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 font-mono text-xs uppercase tracking-wider text-neutral-400">
                    <Trophy className="w-4 h-4 text-neutral-200" />
                    <span>Winning Projects Showcase</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    Selected by panel judges based on architectural depth, memory safety, test coverage, and benchmark verification.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {hackathon.winningProjects.map((project, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-lg border border-neutral-800 bg-[#0a0a0a] hover:border-neutral-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold block mb-1">
                            {project.place}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            {project.name}
                          </h4>
                        </div>

                        <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 self-start sm:self-auto font-semibold">
                          {project.prize}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-900">
                        {project.stack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: EVENT PHOTOS & GALLERY                             */}
          {/* ========================================================= */}
          {activeTab === 'gallery' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono text-xs uppercase tracking-wider text-neutral-400">
                  <Camera className="w-4 h-4 text-neutral-200" />
                  <span>Event Photos & Retrospective Gallery</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Visual highlights from the 48-hour sprint: midnight hacking, live benchmark stress-tests, keynote evaluations, and winner demos.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {hackathon.gallery.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxImage(item)}
                    className="group rounded-lg border border-neutral-800 bg-[#0a0a0a] overflow-hidden hover:border-neutral-700 transition-all cursor-pointer flex flex-col"
                  >
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-900">
                      <img
                        src={item.url}
                        alt={item.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-sm text-white border border-neutral-700">
                          {item.tag}
                        </span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {item.caption}
                      </p>
                      <div className="pt-2 mt-2 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <span>Photo #{idx + 1}</span>
                        <span className="text-neutral-400 group-hover:text-white flex items-center gap-1 transition-colors">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PANELISTS & JUDGES                                 */}
          {/* ========================================================= */}
          {activeTab === 'panelists' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono text-xs uppercase tracking-wider text-neutral-400">
                  <Users className="w-4 h-4 text-neutral-200" />
                  <span>Judges, Mentors & Panelists</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Industry engineers and open-source maintainers who reviewed codebases, hosted technical workshops, and awarded builder grants.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hackathon.panelists.map((panelist, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-lg border border-neutral-800 bg-[#0a0a0a] flex items-start gap-4 hover:border-neutral-700 transition-colors"
                  >
                    {/* Monogram Avatar */}
                    <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center font-mono font-bold text-sm text-white shrink-0">
                      {panelist.avatarText}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-white truncate">
                        {panelist.name}
                      </h4>
                      <div className="text-xs text-neutral-300 truncate">
                        {panelist.role}
                      </div>
                      <div className="text-xs font-mono text-neutral-500 truncate pt-1 border-t border-neutral-900 mt-2">
                        {panelist.company}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: BLOG & RETROSPECTIVE RECAP                         */}
          {/* ========================================================= */}
          {activeTab === 'blog' && (
            <div className="p-6 sm:p-8 space-y-6">
              {/* Blog Header */}
              <div className="border-b border-neutral-800 pb-5">
                <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 mb-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>RETROSPECTIVE BLOG</span>
                  <span>·</span>
                  <span>{hackathon.blog.publishedDate}</span>
                  <span>·</span>
                  <span>{hackathon.blog.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                  {hackathon.blog.title}
                </h3>

                <div className="mt-3 text-xs font-mono text-neutral-400">
                  By <span className="text-neutral-200">{hackathon.blog.author}</span> · {hackathon.blog.authorRole}
                </div>
              </div>

              {/* Lead Paragraph */}
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                {hackathon.blog.leadParagraph}
              </p>

              {/* Key Highlights Bullet list */}
              <div className="p-4 rounded-lg border border-neutral-800 bg-[#050505] space-y-2">
                <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider font-bold block mb-2">
                  Sprint Highlights
                </span>
                {hackathon.blog.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Sections */}
              <div className="space-y-6 pt-2">
                {hackathon.blog.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {section.heading}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Bar */}
        <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>Xedom Lab Open Archive · {hackathon.edition}</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LIGHTBOX FOR FULL IMAGE PREVIEW                           */}
      {/* ========================================================= */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="self-end p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full max-h-[70vh] rounded-xl overflow-hidden border border-neutral-800 bg-black flex items-center justify-center">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.caption}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            <div className="w-full text-center px-4 py-2">
              {lightboxImage.tag && (
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-neutral-800 text-neutral-300 border border-neutral-700 mb-1.5">
                  {lightboxImage.tag}
                </span>
              )}
              <p className="text-sm text-neutral-300 max-w-xl mx-auto">
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
