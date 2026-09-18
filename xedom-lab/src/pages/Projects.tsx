import React, { useState } from 'react';
import { Rocket, Plus, Search } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/Button';
import { projectCategories, projectsList } from '../data/projectsData';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filteredProjects = projectsList.filter((proj) => {
    const matchesCategory =
      selectedCategory === 'All' || proj.category === selectedCategory;

    const matchesSearch =
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      proj.builder.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-neutral-200">
      {/* Header */}
      <section className="relative pt-16 pb-12 border-b border-neutral-800 bg-[#000000]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 mb-6">
            <Rocket className="w-3.5 h-3.5 text-neutral-400" />
            <span>Project Showcase</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Built by the community.
          </h1>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Discover real-world open-source software, high-performance developer tooling, and innovative hardware prototypes shipped by Xedom Lab members.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-lg mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, stack, or builder..."
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[#050505] border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-500 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Category Pills & Submit Action */}
        <div className="flex items-center justify-between gap-3 flex-wrap pb-5 border-b border-neutral-800 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-semibold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowSubmitModal(true)}
            leftIcon={<Plus className="w-3.5 h-3.5 text-white" />}
          >
            Submit Project
          </Button>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-5 text-xs font-mono text-neutral-500">
          <span>Displaying {filteredProjects.length} projects</span>
          {selectedCategory !== 'All' && (
            <span>Category: <strong className="text-white">{selectedCategory}</strong></span>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        ) : (
          <div className="p-14 text-center rounded-lg border border-neutral-800 bg-[#050505]">
            <Search className="w-6 h-6 text-neutral-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white">No projects found</h3>
            <p className="mt-1 text-xs text-neutral-500">
              Try adjusting your query or category filter.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="mt-3 text-xs"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Submit Project Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-xl border border-neutral-800 bg-[#0a0a0a] p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Submit Your Project
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              Get your project featured in the Xedom Lab showcase.
            </p>

            {submitted ? (
              <div className="mt-5 p-3 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-mono text-center">
                ✔ Project submitted! It will be reviewed by community maintainers shortly.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  setTimeout(() => {
                    setSubmitted(false);
                    setShowSubmitModal(false);
                  }, 2500);
                }}
                className="mt-4 space-y-3"
              >
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HyperFlow"
                    className="w-full px-3 py-2 rounded bg-[#050505] border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Short Description
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="What does it do?"
                    className="w-full px-3 py-2 rounded bg-[#050505] border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/username/project"
                    className="w-full px-3 py-2 rounded bg-[#050505] border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Live Demo Link (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://myproject.demo"
                    className="w-full px-3 py-2 rounded bg-[#050505] border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSubmitModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Submit
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
