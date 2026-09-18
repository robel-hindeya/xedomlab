import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeSnippet {
  language: string;
  filename?: string;
  code: string;
}

interface CodeBlockProps {
  snippets?: CodeSnippet[];
  title?: string;
  defaultLanguage?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  snippets = [
    {
      language: 'typescript',
      filename: 'project.config.ts',
      code: `import { defineProject } from '@xedom-lab/workspace';

export default defineProject({
  name: 'distributed-cache',
  track: 'Systems / Backend',
  stack: ['Rust', 'Go', 'TypeScript'],
  openForContributions: true,
  lookingFor: ['Kernel engineer', 'Documentation lead'],
});`,
    },
    {
      language: 'bash',
      filename: 'CLI',
      code: `# Initialize your project in the Xedom Lab collective
npx xedom-lab@latest init

# Connect with active builders
xedom peer connect

# Stream real-time diagnostic checks
xedom dev --mesh`,
    }
  ],
  title,
  showLineNumbers = true,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentSnippet = snippets[activeTab] || snippets[0];

  const handleCopy = () => {
    if (!currentSnippet) return;
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentSnippet.code.split('\n');

  return (
    <div className={`rounded-lg border border-neutral-800 bg-[#050505] overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-neutral-900/60 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          {/* Tab buttons */}
          {snippets.length > 1 ? (
            <div className="flex items-center gap-1">
              {snippets.map((snip, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                    activeTab === idx
                      ? 'bg-neutral-800 text-white font-medium border border-neutral-700'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  {snip.filename || snip.language}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Terminal className="w-3.5 h-3.5 text-neutral-400" />
              <span>{title || currentSnippet.filename || currentSnippet.language}</span>
            </div>
          )}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono text-neutral-400 hover:text-white hover:bg-neutral-800 border border-transparent hover:border-neutral-700 transition-all cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-neutral-200" />
              <span className="text-neutral-200 text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-neutral-400" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-3.5 overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed select-text bg-[#000000]">
        <pre className="table w-full">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="table-row hover:bg-neutral-900/40">
                {showLineNumbers && (
                  <span className="table-cell text-right pr-4 select-none text-neutral-600 w-8 text-xs">
                    {idx + 1}
                  </span>
                )}
                <span className="table-cell whitespace-pre text-neutral-300">
                  {line.startsWith('#') || line.startsWith('//') ? (
                    <span className="text-neutral-500 italic">{line}</span>
                  ) : line.includes('import ') || line.includes('export ') || line.includes('from ') || line.includes('const ') || line.includes('def ') || line.includes('async ') || line.includes('await ') ? (
                    <span>
                      {line.split(/(import|from|const|def|async|await|return|if|export)/g).map((part, pIdx) => {
                        if (['import', 'from', 'const', 'def', 'async', 'await', 'return', 'if', 'export'].includes(part)) {
                          return <span key={pIdx} className="text-white font-semibold">{part}</span>;
                        }
                        if (part.includes('"') || part.includes("'") || part.includes('`')) {
                          return <span key={pIdx} className="text-neutral-400">{part}</span>;
                        }
                        return <span key={pIdx}>{part}</span>;
                      })}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
