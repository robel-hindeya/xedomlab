import React from 'react';
import { ExternalLink, Star, GitFork } from 'lucide-react';
import { GithubIcon } from './Icons';

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  category: string;
  techStack: string[];
  builder: {
    name: string;
    avatar?: string;
    role: string;
    githubHandle?: string;
  };
  githubUrl: string;
  demoUrl?: string;
  stars?: number;
  forks?: number;
  featured?: boolean;
}

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className = '',
}) => {
  return (
    <div className={`rounded-lg border border-neutral-800 bg-[#0a0a0a] p-5 flex flex-col justify-between transition-all duration-150 hover:border-neutral-700 hover:bg-[#0f0f0f] ${className}`}>
      <div>
        {/* Card Header: Category & Stats */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium">
            {project.category}
          </span>

          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            {project.stars !== undefined && (
              <span className="inline-flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-neutral-500" />
                {project.stars}
              </span>
            )}
            {project.forks !== undefined && (
              <span className="inline-flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5 text-neutral-500" />
                {project.forks}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white tracking-tight">
          {project.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs text-neutral-400 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="mt-4 flex flex-wrap gap-1">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Builder & Action Buttons */}
      <div className="mt-5 pt-3.5 border-t border-neutral-800 flex items-center justify-between gap-3">
        {/* Builder */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {project.builder.avatar ? (
              <img
                src={project.builder.avatar}
                alt={project.builder.name}
                className="w-full h-full rounded object-cover"
              />
            ) : (
              project.builder.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="truncate">
            <p className="text-xs font-medium text-neutral-200 truncate">
              {project.builder.name}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 hover:text-white hover:border-neutral-600 transition-colors"
              title="View on GitHub"
            >
              <GithubIcon className="w-3 h-3 text-neutral-300" />
              <span>Code</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono text-neutral-200 bg-neutral-900 border border-neutral-800 hover:text-white hover:border-neutral-600 transition-colors"
              title="View Live Demo"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
