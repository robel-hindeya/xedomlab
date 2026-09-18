import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, Box, Check, Terminal } from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';

interface ProductsProps {
  products: Product[];
  onRefresh: () => void;
}

export const Products: React.FC<ProductsProps> = ({ products, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Distributed Systems');
  const [version, setVersion] = useState('v1.0.0');
  const [status, setStatus] = useState<'active' | 'beta' | 'rfc'>('active');
  const [githubUrl, setGithubUrl] = useState('https://github.com/robel-hindeya');
  const [installCommand, setInstallCommand] = useState('');
  const [tags, setTags] = useState('Rust, Systems, Open Source');
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    setSubmitting(true);
    await api.createProduct({
      title,
      tagline,
      description,
      category,
      version,
      status,
      githubUrl,
      installCommand,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setSubmitting(false);
    setShowModal(false);
    setTitle('');
    setDescription('');
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product from catalog?')) {
      await api.deleteProduct(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Product & Engineering Catalog</h2>
          <p className="text-xs text-neutral-400 font-mono">
            {products.length} systems tools published
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-black text-xs font-mono font-semibold hover:bg-neutral-200 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] flex flex-col justify-between hover:border-neutral-700 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white font-mono text-xs font-bold">
                    <Box className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-none">{p.title}</h3>
                    <span className="text-[10px] font-mono text-neutral-500">{p.version}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${
                    p.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : p.status === 'beta'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <p className="text-xs text-neutral-300 font-medium mt-3">{p.tagline}</p>
              <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{p.description}</p>

              {p.installCommand && (
                <div className="mt-3 p-2 rounded bg-black border border-neutral-900 flex items-center gap-1.5 text-[11px] font-mono text-neutral-300">
                  <Terminal className="w-3 h-3 text-neutral-500 shrink-0" />
                  <span className="truncate">{p.installCommand}</span>
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-1">
                {p.tags?.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 text-[10px] font-mono text-neutral-400 border border-neutral-800"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => handleDelete(p.id)}
                className="p-1.5 rounded hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-colors"
                title="Delete product"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Add New Product</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EdgeKV"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Ultra low latency distributed key-value store"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Technical description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Version</label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                  >
                    <option value="active">active</option>
                    <option value="beta">beta</option>
                    <option value="rfc">rfc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">GitHub URL</label>
                <input
                  type="text"
                  required
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Install Command (optional)</label>
                <input
                  type="text"
                  placeholder="cargo add zeropipe"
                  value={installCommand}
                  onChange={(e) => setInstallCommand(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-neutral-200"
                >
                  {submitting ? 'Creating...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
