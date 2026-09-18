'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  GraduationCap, 
  Gift, 
  ArrowRight, 
  CheckCircle2, 
  Send, 
  ChevronDown, 
  Code, 
  Zap, 
  DollarSign, 
  ArrowLeft,
  Share2,
  Check,
  Building2,
  BookOpen
} from 'lucide-react';
import { Button } from '../components/Button';

interface ApplicationData {
  // Step 1
  fullName: string;
  email: string;
  city: string;
  country: string;
  primaryRole: string;
  institution: string;
  githubUrl: string;
  xUrl: string;
  portfolioUrl: string;
  // Step 2
  track: string;
  communityExperience: string;
  currentCommunities: string;
  estimatedReach: string;
  // Step 3
  motivation: string;
  firstInitiative: string;
  featuredWorkUrl: string;
  // Step 4
  agreedCodeOfConduct: boolean;
  agreedCommitment: boolean;
}

const initialFormData: ApplicationData = {
  fullName: '',
  email: '',
  city: '',
  country: '',
  primaryRole: 'student',
  institution: '',
  githubUrl: '',
  xUrl: '',
  portfolioUrl: '',
  track: 'campus',
  communityExperience: '1-2 years',
  currentCommunities: '',
  estimatedReach: '50-200 developers',
  motivation: '',
  firstInitiative: '',
  featuredWorkUrl: '',
  agreedCodeOfConduct: false,
  agreedCommitment: false,
};

export const Ambassador: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const perks = [
    {
      icon: DollarSign,
      title: 'Event & Meetup Micro-Grants',
      description: 'Receive $250 to $1,000 per event to cover venue rentals, high-speed WiFi, catering, and guest speaker travel.',
      badge: 'Financial Backing',
    },
    {
      icon: Gift,
      title: 'Ambassador Welcome Crate',
      description: 'Exclusive custom gear including an ambassador mechanical keyboard kit, heavyweight hoodie, metal badge, and sticker bundles for attendees.',
      badge: 'Limited Swag',
    },
    {
      icon: Zap,
      title: 'Direct Core Team Channel',
      description: 'Bi-weekly roadmap briefings with Xedom Lab staff engineers, direct Slack/Discord access, and early previews of unreleased software.',
      badge: 'Internal Access',
    },
    {
      icon: Award,
      title: 'Official Spotlight & Credentials',
      description: 'Verified ambassador badge on xedom.dev, profile listing in our global directory, and official speaker endorsements for conferences.',
      badge: 'Recognition',
    },
    {
      icon: Code,
      title: 'Cloud & Cluster Compute Quota',
      description: 'Dedicated GPU/CPU cloud credits and enterprise tool licenses to run hands-on technical workshops and student hackathons.',
      badge: 'Infrastructure',
    },
    {
      icon: GraduationCap,
      title: 'Career & Mentorship Pipeline',
      description: '1-on-1 resume reviews, system design mock interviews with tech leads, and priority referrals to partner engineering teams.',
      badge: 'Career Growth',
    },
  ];

  const tracks = [
    {
      id: 'campus',
      title: 'Campus Ambassador',
      target: 'University & College Students',
      description: 'Establish Xedom Lab developer clubs, run campus hack days, and bridge academic theory with modern production tooling.',
      icon: GraduationCap,
    },
    {
      id: 'meetup',
      title: 'City & Meetup Lead',
      target: 'Regional Community Organizers',
      description: 'Host monthly technical talks, code pairings, and architecture deep dives for working engineers in your metropolitan hub.',
      icon: Building2,
    },
    {
      id: 'content',
      title: 'Technical Educator & Writer',
      target: 'Bloggers, Streamers & Educators',
      description: 'Author rigorous system design articles, create video tutorials, and publish open-source boilerplate architectures.',
      icon: BookOpen,
    },
    {
      id: 'opensource',
      title: 'Open Source Evangelist',
      target: 'Maintainers & Contributors',
      description: 'Lead bug squashes, organize contributor sprints, and review pull requests across Xedom Lab public repositories.',
      icon: Code,
    },
  ];

  const faqs = [
    {
      question: 'Who is eligible to apply for the Ambassador Program?',
      answer: 'Anyone with a passion for software engineering and community building. We accept university students, boot camp graduates, full-time software engineers, engineering managers, and independent creators worldwide. You do not need 10 years of experience; we prioritize authentic enthusiasm and collaborative leadership.',
    },
    {
      question: 'What is the expected time commitment?',
      answer: 'We estimate approximately 3 to 5 hours per month. This typically involves organizing or co-hosting one monthly event/pairing session, attending a 30-minute monthly cohort sync, and engaging with peers in the private ambassador channel.',
    },
    {
      question: 'Are ambassadors required to pay any fees?',
      answer: 'Never. The program is 100% free. In fact, Xedom Lab provides financial micro-grants ($250-$1,000) to cover event expenses, pizza, and workshop supplies, as well as complimentary hardware and gear.',
    },
    {
      question: 'Can there be multiple ambassadors in the same university or city?',
      answer: 'Yes! Major cities and large university campuses often benefit from co-leads. We encourage collaborative organizing, pairing up to host larger joint hackathons and multi-track workshops.',
    },
    {
      question: 'What happens after I submit my application?',
      answer: 'Our community team reviews applications on a rolling weekly basis. If selected for the next round, you will be invited to a 20-minute casual video chat to discuss your community ideas. Accepted ambassadors receive their welcome crate and onboarding packet within 10 days.',
    },
    {
      question: 'How long does the ambassadorship term last?',
      answer: 'Terms run for one calendar year with an optional renewal. Active ambassadors in good standing can renew annually and transition into senior Ambassador Mentor roles.',
    },
  ];

  const handleInputChange = (field: keyof ApplicationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return !!(formData.fullName.trim() && formData.email.trim() && formData.country.trim() && formData.city.trim());
    }
    if (step === 2) {
      return !!(formData.track && formData.communityExperience);
    }
    if (step === 3) {
      return !!(formData.motivation.trim().length >= 30 && formData.firstInitiative.trim().length >= 20);
    }
    if (step === 4) {
      return formData.agreedCodeOfConduct && formData.agreedCommitment;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      const applySection = document.getElementById('apply-form');
      if (applySection) {
        applySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `XEDOM-AMB-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedId(generatedId);
      setCurrentStep(5);
      const applySection = document.getElementById('apply-form');
      if (applySection) {
        applySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  };

  const handleSharePage = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-neutral-200">
      
      {/* ========================================================= */}
      {/* 1. HERO BANNER                                            */}
      {/* ========================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-neutral-850 overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#000000]">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-300 bg-neutral-900 border border-neutral-800 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cohort 2026 Applications Open</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">Global Initiative</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight">
            Xedom Lab <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              Ambassador Program
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Lead technical workshops, organize student and regional hackathons, mentor rising engineers, and represent Xedom Lab in your local developer ecosystem.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#apply-form"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-mono font-bold text-black bg-white hover:bg-neutral-200 transition-all shadow-lg cursor-pointer"
            >
              <span>Apply for Cohort 2026</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleSharePage}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied' : 'Share Program'}</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 pt-8 border-t border-neutral-900 grid grid-cols-2 md:grid-cols-4 gap-6 text-left sm:text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">32+</div>
              <div className="text-xs text-neutral-500 font-mono mt-1 uppercase tracking-wider">Countries Represented</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">$1,000</div>
              <div className="text-xs text-neutral-500 font-mono mt-1 uppercase tracking-wider">Max Event Grant</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">3-5 hrs</div>
              <div className="text-xs text-neutral-500 font-mono mt-1 uppercase tracking-wider">Monthly Commitment</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">Rolling</div>
              <div className="text-xs text-neutral-500 font-mono mt-1 uppercase tracking-wider">Admissions Cycle</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PROGRAM PILLARS & TRACKS                               */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 border-b border-neutral-850 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">
              // CHOOSE YOUR TRACK
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Where can you make the biggest impact?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400">
              Ambassadors specialize in the tracks matching their unique strengths and local communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.id}
                  className="p-6 rounded-xl border border-neutral-800 bg-[#090909] hover:border-neutral-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                      {track.target}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {track.title}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-neutral-900">
                    <span className="text-[11px] font-mono text-neutral-500">
                      Eligible for full program grants
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. BIG TECH PERKS & BENEFITS                              */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 border-b border-neutral-850 bg-[#000000]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">
              // AMBASSADOR PERKS
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              We invest directly in your community.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400">
              Big tech company resources, funding, and mentorship to ensure your local events succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-neutral-800 bg-[#080808] hover:border-neutral-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 uppercase tracking-wider">
                        {perk.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight">
                      {perk.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SELECTION PROCESS & TIMELINE                           */}
      {/* ========================================================= */}
      <section className="py-16 border-b border-neutral-850 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">
              // HOW IT WORKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Application & Review Roadmap
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-lg border border-neutral-800 bg-[#0a0a0a] space-y-2">
              <span className="text-xs font-mono text-neutral-500 block font-bold">01 / STAGE</span>
              <h3 className="text-sm font-bold text-white">Online Application</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Submit your technical background, community proposal, and past achievements below.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-900">
                Est: 10-15 minutes
              </div>
            </div>

            <div className="p-5 rounded-lg border border-neutral-800 bg-[#0a0a0a] space-y-2">
              <span className="text-xs font-mono text-neutral-500 block font-bold">02 / STAGE</span>
              <h3 className="text-sm font-bold text-white">Portfolio Review</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Our committee inspects your public GitHub, articles, or previous club leadership.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-900">
                Within 3-5 business days
              </div>
            </div>

            <div className="p-5 rounded-lg border border-neutral-800 bg-[#0a0a0a] space-y-2">
              <span className="text-xs font-mono text-neutral-500 block font-bold">03 / STAGE</span>
              <h3 className="text-sm font-bold text-white">20-Min Video Sync</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Casual chat with a Xedom Lab core engineer to align on your planned meetup and goals.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-900">
                1-on-1 Google Meet
              </div>
            </div>

            <div className="p-5 rounded-lg border border-neutral-800 bg-[#0a0a0a] space-y-2">
              <span className="text-xs font-mono text-neutral-500 block font-bold">04 / STAGE</span>
              <h3 className="text-sm font-bold text-white">Crate & Induction</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Welcome gear dispatched, private Slack access granted, and initial micro-grant released.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-900">
                Welcome to Cohort 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. BIG COMPANY APPLICATION PORTAL / MULTI-STEP FORM       */}
      {/* ========================================================= */}
      <section id="apply-form" className="py-20 border-b border-neutral-850 bg-[#000000]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">
              // OFFICIAL ADMISSIONS FORM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Apply to be a Xedom Lab Ambassador
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
              Please complete all steps accurately. All submissions are directly reviewed by the core engineering and community leads.
            </p>
          </div>

          {/* Stepper Progress Bar (Only visible before success) */}
          {currentStep <= 4 && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className={`font-bold ${currentStep >= 1 ? 'text-white' : 'text-neutral-600'}`}>
                  1. Identity & Profiles
                </span>
                <span className={`font-bold ${currentStep >= 2 ? 'text-white' : 'text-neutral-600'}`}>
                  2. Track & Scope
                </span>
                <span className={`font-bold ${currentStep >= 3 ? 'text-white' : 'text-neutral-600'}`}>
                  3. Vision & Proposal
                </span>
                <span className={`font-bold ${currentStep >= 4 ? 'text-white' : 'text-neutral-600'}`}>
                  4. Review & Submit
                </span>
              </div>
              <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-white transition-all duration-300 ease-out"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="rounded-xl border border-neutral-800 bg-[#080808] p-6 sm:p-8 shadow-2xl">
            
            {/* ---------------- STEP 1: IDENTITY ---------------- */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-neutral-850 pb-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Personal Details & Engineering Handles
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Step 1 of 4: Tell us who you are and where you build.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Primary Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="elena@university.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Germany"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      City / Region *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Berlin"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Current Primary Role *
                    </label>
                    <select
                      value={formData.primaryRole}
                      onChange={(e) => handleInputChange('primaryRole', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600 font-mono"
                    >
                      <option value="student">University / College Student</option>
                      <option value="software-engineer">Working Software Engineer</option>
                      <option value="club-lead">Campus Club President / Lead</option>
                      <option value="indie-hacker">Indie Maker / Founder</option>
                      <option value="educator">Lecturer / Bootcamp Instructor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      University or Company / Org
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Technical University of Munich"
                      value={formData.institution}
                      onChange={(e) => handleInputChange('institution', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                    />
                  </div>
                </div>

                <div className="border-t border-neutral-850 pt-4 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Online Presence & Technical Profiles
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                        GitHub Profile
                      </label>
                      <input
                        type="text"
                        placeholder="github.com/handle"
                        value={formData.githubUrl}
                        onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                        X (Twitter) Profile
                      </label>
                      <input
                        type="text"
                        placeholder="x.com/handle"
                        value={formData.xUrl}
                        onChange={(e) => handleInputChange('xUrl', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                        Portfolio / Blog / LinkedIn
                      </label>
                      <input
                        type="text"
                        placeholder="https://yoursite.dev"
                        value={formData.portfolioUrl}
                        onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleNextStep}
                    disabled={!validateStep(1)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Proceed to Step 2
                  </Button>
                </div>
              </div>
            )}

            {/* ---------------- STEP 2: TRACK & SCOPE ---------------- */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-neutral-850 pb-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Select Your Ambassador Focus
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Step 2 of 4: Define your target track and community reach.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-2.5">
                    Select Your Primary Track *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tracks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleInputChange('track', t.id)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          formData.track === t.id
                            ? 'border-white bg-neutral-900 shadow-md'
                            : 'border-neutral-800 bg-[#0c0c0c] hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-white">{t.title}</span>
                          {formData.track === t.id && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                          {t.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Experience Organizing or Mentoring
                    </label>
                    <select
                      value={formData.communityExperience}
                      onChange={(e) => handleInputChange('communityExperience', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600 font-mono"
                    >
                      <option value="First time organizer">First time (eager to start!)</option>
                      <option value="Under 1 year">Under 1 year</option>
                      <option value="1-2 years">1 to 2 years</option>
                      <option value="3+ years">3+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Estimated Audience or Club Size
                    </label>
                    <select
                      value={formData.estimatedReach}
                      onChange={(e) => handleInputChange('estimatedReach', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600 font-mono"
                    >
                      <option value="10-50 developers">10 - 50 developers</option>
                      <option value="50-200 developers">50 - 200 developers</option>
                      <option value="200-500 developers">200 - 500 developers</option>
                      <option value="500+ developers">500+ developers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                    Active Communities or Clubs you currently belong to
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ACM Student Chapter, Rust Berlin Meetup, GDG, local open source group"
                    value={formData.currentCommunities}
                    onChange={(e) => handleInputChange('currentCommunities', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-neutral-850">
                  <Button variant="ghost" size="md" onClick={handlePrevStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleNextStep}
                    disabled={!validateStep(2)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Proceed to Step 3
                  </Button>
                </div>
              </div>
            )}

            {/* ---------------- STEP 3: VISION & PROPOSAL ---------------- */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-neutral-850 pb-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Your Community Vision & Initiatives
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Step 3 of 4: Share your ideas and motivation with our team.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono text-neutral-400">
                      Why do you want to represent Xedom Lab? *
                    </label>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {formData.motivation.length} / min 30 chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what drives you. Why are you passionate about open software and developer collaboration?"
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono text-neutral-400">
                      What is the first event, workshop, or project you'd organize? *
                    </label>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {formData.firstInitiative.length} / min 20 chars
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. A 2-hour hands-on workshop on building distributed microservices in Go, or an intro to open-source contributing for 60 campus students."
                    value={formData.firstInitiative}
                    onChange={(e) => handleInputChange('firstInitiative', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                    Link to a technical project, PR, or blog post you are proud of
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username/project or your blog URL"
                    value={formData.featuredWorkUrl}
                    onChange={(e) => handleInputChange('featuredWorkUrl', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-neutral-850">
                  <Button variant="ghost" size="md" onClick={handlePrevStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleNextStep}
                    disabled={!validateStep(3)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Proceed to Review
                  </Button>
                </div>
              </div>
            )}

            {/* ---------------- STEP 4: REVIEW & SUBMIT ---------------- */}
            {currentStep === 4 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                <div className="border-b border-neutral-850 pb-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Review Application & Formal Commitments
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Step 4 of 4: Verify your application data before submitting to admissions.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-4 rounded-lg bg-[#050505] border border-neutral-800 space-y-3 text-xs font-mono">
                  <div className="flex justify-between border-b border-neutral-900 pb-2">
                    <span className="text-neutral-500">Candidate:</span>
                    <span className="text-white font-bold">{formData.fullName} ({formData.email})</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-900 pb-2">
                    <span className="text-neutral-500">Location:</span>
                    <span className="text-neutral-300">{formData.city}, {formData.country}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-900 pb-2">
                    <span className="text-neutral-500">Selected Track:</span>
                    <span className="text-white uppercase font-bold">{formData.track}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-900 pb-2">
                    <span className="text-neutral-500">Role / Org:</span>
                    <span className="text-neutral-300">{formData.primaryRole} {formData.institution ? `· ${formData.institution}` : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Audience Scope:</span>
                    <span className="text-neutral-300">{formData.estimatedReach}</span>
                  </div>
                </div>

                {/* Agreements */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800 cursor-pointer hover:border-neutral-700">
                    <input
                      type="checkbox"
                      checked={formData.agreedCodeOfConduct}
                      onChange={(e) => handleInputChange('agreedCodeOfConduct', e.target.checked)}
                      className="mt-1 w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-white focus:ring-0 cursor-pointer"
                    />
                    <div className="text-xs text-neutral-300 leading-relaxed font-mono">
                      <strong className="text-white">Code of Conduct:</strong> I agree to uphold an inclusive, welcoming, and harassment-free environment for all developers in the Xedom Lab ecosystem.
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800 cursor-pointer hover:border-neutral-700">
                    <input
                      type="checkbox"
                      checked={formData.agreedCommitment}
                      onChange={(e) => handleInputChange('agreedCommitment', e.target.checked)}
                      className="mt-1 w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-white focus:ring-0 cursor-pointer"
                    />
                    <div className="text-xs text-neutral-300 leading-relaxed font-mono">
                      <strong className="text-white">Community Commitment:</strong> I can dedicate ~3-5 hours per month to organizing events, mentoring peers, and attending cohort syncs.
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-neutral-850">
                  <Button variant="ghost" size="md" type="button" onClick={handlePrevStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    disabled={!validateStep(4) || isSubmitting}
                    rightIcon={isSubmitting ? undefined : <Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Ambassador Application'}
                  </Button>
                </div>
              </form>
            )}

            {/* ---------------- STEP 5: SUCCESS RECEIPT ---------------- */}
            {currentStep === 5 && (
              <div className="text-center py-8 space-y-5 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                    APPLICATION SUCCESSFULLY LODGED
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Welcome to the Cohort 2026 Pool!
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. We have received your application for the <strong className="text-white uppercase">{formData.track}</strong> track.
                  </p>
                </div>

                {/* Receipt Box */}
                <div className="p-4 rounded-lg bg-[#050505] border border-neutral-800 text-left max-w-md mx-auto font-mono text-xs space-y-2">
                  <div className="flex justify-between border-b border-neutral-900 pb-2">
                    <span className="text-neutral-500">Application ID:</span>
                    <span className="text-white font-bold">{submittedId}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-900 pb-2">
                    <span className="text-neutral-500">Status:</span>
                    <span className="text-amber-400 font-bold">Under Review (Queue #24)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Next Communication:</span>
                    <span className="text-neutral-300">Within 3 business days</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/community"
                    className="px-5 py-2.5 rounded-lg text-xs font-mono font-bold bg-white text-black hover:bg-neutral-200 transition-all"
                  >
                    Back to Community
                  </Link>
                  <button
                    onClick={() => {
                      setFormData(initialFormData);
                      setCurrentStep(1);
                    }}
                    className="px-5 py-2.5 rounded-lg text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 hover:text-white transition-all cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. FAQ ACCORDION                                          */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">
              // QUESTIONS & ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-neutral-800 bg-[#0a0a0a] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/40 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed border-t border-neutral-850 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center text-xs font-mono text-neutral-500">
            Have a custom sponsorship or campus inquiry? Contact{' '}
            <a href="mailto:ambassadors@xedom.dev" className="text-neutral-300 underline hover:text-white">
              ambassadors@xedom.dev
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
