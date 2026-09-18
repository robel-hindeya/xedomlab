import React, { useState } from 'react';
import { Plus, Trash2, Newspaper } from 'lucide-react';
import { NewsItem } from '../types';
import { api } from '../services/api';

interface NewsProps {
  news: NewsItem[];
  onRefresh: () => void;
}

export const News: React.FC<NewsProps> = ({ news, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [readTime, setReadTime] = useState('4 min read');
  const [author, setAuthor] = useState('Robel Hindeya');
  const [tags, setTags] = useState('Systems, Rust, Performance');
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setSubmitting(true);
    await api.createNews({
      title,
      summary: summary || title,
      content,
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime,
      author,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setSubmitting(false);
    setShowModal(false);
    setTitle('');
    setContent('');
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this news publication?')) {
      await api.deleteNews(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">News, Announcements & RFCs</h2>
          <p className="text-xs text-neutral-400 font-mono">
            {news.length} published articles and technical drops
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-black text-xs font-mono font-semibold hover:bg-neutral-200 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Publish Article</span>
        </button>
      </div>

      <div className="space-y-3">
        {news.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl border border-neutral-800 bg-[#0a0a0a] hover:border-neutral-700 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400 uppercase">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-neutral-500">{item.date}</span>
                <span className="text-xs font-mono text-neutral-500">· {item.readTime}</span>
                <span className="text-xs font-mono text-neutral-400">· By {item.author}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-neutral-400 line-clamp-2">{item.summary}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {item.tags?.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono text-neutral-500"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleDelete(item.id)}
              className="p-2 rounded hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-colors shrink-0"
              title="Delete article"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Publish New Article / Drop</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ZeroPipe v1.2 Release Notes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Short Summary</label>
                <input
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Content (Markdown / Text)</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Community">Community</option>
                    <option value="RFC">RFC</option>
                    <option value="Release">Release</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 rounded bg-neutral-800 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded bg-white text-black font-semibold"
                >
                  {submitting ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
