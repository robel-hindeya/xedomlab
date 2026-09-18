import React, { useState } from 'react';
import { ArrowRight, Users, GitBranch, Copy, Check } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onJoinClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeSnippetTab, setActiveSnippetTab] = useState<'project' | 'mesh' | 'cli'>('project');

  const copyCli = () => {
    navigator.clipboard.writeText('npx xedom-lab@latest');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[420px] radial-blue-glow pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 text-xs font-mono text-blue-300 shadow-sm mb-6 hover:border-blue-400/40 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>A global community for developers & builders</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300 font-semibold flex items-center gap-1">
              Join Open Beta <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Large Clean Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-4xl leading-[1.08]">
            Build. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Learn.</span> Connect.
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
            Xedom Lab is a community for developers, programmers, and builders to learn, build real projects, share knowledge, and grow together.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              onClick={onJoinClick}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Join Xedom Lab
            </Button>

            <Button
              size="lg"
              variant="secondary"
              to="/community"
              className="w-full sm:w-auto"
            >
              Explore Community
            </Button>
          </div>

          {/* Quick CLI snippet pill */}
          <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#0d121f]/90 border border-[#1e293d] px-3.5 py-1.5 rounded-lg">
            <span className="text-slate-500">$</span>
            <span className="text-slate-200">npx xedom-lab@latest</span>
            <button
              onClick={copyCli}
              className="ml-2 text-slate-400 hover:text-blue-300 transition-colors cursor-pointer"
              title="Copy install command"
            >
              {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Developer Visual / Interactive Terminal Showcase */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-[#1e283d] bg-[#090c15] p-2 sm:p-3 shadow-2xl shadow-blue-950/20">
            {/* Top Bar with window controls & tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 border-b border-[#182133] bg-[#0c101a] rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-xs font-mono text-slate-500 hidden sm:inline">
                  xedom-workspace ~ v1.4.0
                </span>
              </div>

              {/* Snippet Tabs */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveSnippetTab('project')}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    activeSnippetTab === 'project'
                      ? 'bg-[#182133] text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  project.config.ts
                </button>
                <button
                  onClick={() => setActiveSnippetTab('mesh')}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    activeSnippetTab === 'mesh'
                      ? 'bg-[#182133] text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  peer_builder.rs
                </button>
                <button
                  onClick={() => setActiveSnippetTab('cli')}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    activeSnippetTab === 'cli'
                      ? 'bg-[#182133] text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  dev-stream.sh
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>284 builders active</span>
              </div>
            </div>

            {/* Code Body & Live Activity Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#070a12] rounded-b-xl overflow-hidden">
              {/* Code Area */}
              <div className="lg:col-span-8 p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-300 border-b lg:border-b-0 lg:border-r border-[#161e30]">
                {activeSnippetTab === 'project' && (
                  <div>
                    <div className="text-slate-500">// 1. Define your open-source project in Xedom Lab</div>
                    <div>
                      <span className="text-rose-400">import</span> {'{'} defineProject {'}'}{' '}
                      <span className="text-rose-400">from</span>{' '}
                      <span className="text-emerald-400">'@xedom-lab/workspace'</span>;
                    </div>
                    <div className="mt-2">
                      <span className="text-rose-400">export default</span> <span className="text-blue-400">defineProject</span>({'{'}
                    </div>
                    <div className="pl-4 text-slate-400">
                      name: <span className="text-emerald-400">'distributed-inference-mesh'</span>,
                    </div>
                    <div className="pl-4 text-slate-400">
                      track: <span className="text-emerald-400">'AI / Systems Engineering'</span>,
                    </div>
                    <div className="pl-4 text-slate-400">
                      stage: <span className="text-amber-400">'Building MVP'</span>,
                    </div>
                    <div className="pl-4 text-slate-400">
                      stack: [<span className="text-emerald-400">'Rust'</span>, <span className="text-emerald-400">'TypeScript'</span>, <span className="text-emerald-400">'Triton'</span>],
                    </div>
                    <div className="pl-4 text-slate-400">
                      openForContributions: <span className="text-rose-400">true</span>,
                    </div>
                    <div className="pl-4 text-slate-400">
                      lookingFor: [<span className="text-emerald-400">'Backend dev'</span>, <span className="text-emerald-400">'UI/UX designer'</span>],
                    </div>
                    <div>{'}'});</div>
                    <div className="mt-3 text-slate-500">// 2. Collaborate directly with builders worldwide</div>
                    <div>
                      <span className="text-slate-400">await</span> workspace.<span className="text-blue-400">syncPeers</span>();
                    </div>
                  </div>
                )}

                {activeSnippetTab === 'mesh' && (
                  <div>
                    <div className="text-slate-500">// Real-time peer connection for distributed pair coding</div>
                    <div>
                      <span className="text-rose-400">use</span> xedom_mesh::{'{'}PeerNode, GuildChannel{'}'};
                    </div>
                    <div className="mt-2">
                      <span className="text-rose-400">pub async fn</span> <span className="text-blue-400">start_pairing_session</span>() {'{'}
                    </div>
                    <div className="pl-4 text-slate-400">
                      <span className="text-rose-400">let</span> node = PeerNode::<span className="text-blue-400">connect</span>(<span className="text-emerald-400">"wss://mesh.xedomlab.org"</span>).<span className="text-rose-400">await</span>?;
                    </div>
                    <div className="pl-4 text-slate-400">
                      println!(<span className="text-emerald-400">"Connected to builder channel: #systems-lab"</span>);
                    </div>
                    <div className="pl-4 text-slate-400">
                      node.<span className="text-blue-400">broadcast_commit</span>(<span className="text-emerald-400">"feat: zero-copy ring buffer"</span>).<span className="text-rose-400">await</span>;
                    </div>
                    <div>{'}'}</div>
                  </div>
                )}

                {activeSnippetTab === 'cli' && (
                  <div>
                    <div className="text-slate-500"># Start local development environment</div>
                    <div className="text-slate-200">$ xedom-lab dev --tunnel</div>
                    <div className="text-blue-400">✔ Syncing peer nodes... [4 connected]</div>
                    <div className="text-emerald-400">✔ Workspace shared on https://live.xedomlab.org/p/8912</div>
                    <div className="text-slate-400 mt-2">Listening for collaborative code changes...</div>
                  </div>
                )}
              </div>

              {/* Live Community Stream Sidebar */}
              <div className="lg:col-span-4 p-4 sm:p-5 bg-[#090d16] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-blue-400" />
                      Live Builder Feed
                    </span>
                    <span className="text-emerald-400 text-[10px]">REAL-TIME</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-2.5 rounded-lg bg-[#0e1320] border border-[#1b253b] text-xs">
                      <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                        <span className="font-semibold text-blue-400">@alex_dev</span>
                        <span>2m ago</span>
                      </div>
                      <p className="text-slate-200">
                        Pushed v0.4 release for <span className="text-blue-300 font-mono">NeuralDoc</span>
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#0e1320] border border-[#1b253b] text-xs">
                      <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                        <span className="font-semibold text-sky-400">@maya_systems</span>
                        <span>12m ago</span>
                      </div>
                      <p className="text-slate-200">
                        Started pairing on <span className="text-blue-300 font-mono">Rust WebGPU</span> shaders
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#0e1320] border border-[#1b253b] text-xs">
                      <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                        <span className="font-semibold text-purple-400">@david_k</span>
                        <span>28m ago</span>
                      </div>
                      <p className="text-slate-200">
                        Submitted project to <span className="text-purple-300 font-mono">Global Hackathon</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1a2337] flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span>Open guilds</span>
                  </div>
                  <span className="text-white font-semibold">12 Tracks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
