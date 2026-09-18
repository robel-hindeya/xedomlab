import React, { useState } from 'react';
import { 
  ThumbsUp,
  MessageSquare, 
  Share2, 
  Terminal, 
  Check, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck,
  Clock 
} from 'lucide-react';
import { Button } from '../components/Button';
import { initialNewsPosts } from '../data/newsData';
import type { NewsPost } from '../data/newsData';

export const News: React.FC = () => {
  const [posts, setPosts] = useState<NewsPost[]>(initialNewsPosts);
  
  // Interactions state
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[postId];
      setPosts((currentPosts) =>
        currentPosts.map((p) =>
          p.id === postId
            ? { ...p, metrics: { ...p.metrics, likes: p.metrics.likes + (isLiked ? 1 : -1) } }
            : p
        )
      );
      return { ...prev, [postId]: isLiked };
    });
  };

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`https://xedom.dev/news#${postId}`);
    setCopiedPostId(postId);
    showToast('Dispatch link copied to clipboard!');
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    showToast('Code snippet copied!');
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    setPosts((current) =>
      current.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: 'You (Peer Builder)',
            handle: '@builder',
            avatarText: 'YO',
            content: text,
            timeAgo: 'Just now',
          };
          return {
            ...p,
            metrics: { ...p.metrics, replies: p.metrics.replies + 1 },
            comments: [newComment, ...p.comments],
          };
        }
        return p;
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    showToast('Reply published to discussion thread');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-neutral-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* CENTER OF NEWS SECTION (CENTERED PC STREAM)                */}
      {/* ========================================================= */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        
        {/* Page Title & Official Admin Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase block">
              // NEWS & DISPATCHES
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800">
              <ShieldCheck className="w-3 h-3 text-neutral-300" />
              <span>Admin & Core Team Dispatches</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            News
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 font-mono">
            Official announcements, release changelogs, and technical updates from Xedom Lab.
          </p>
        </div>

        {/* Stream of News Posts */}
        <div className="space-y-6">
          {posts.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const areCommentsOpen = !!expandedComments[post.id];

            return (
              <article
                key={post.id}
                className="rounded-xl border border-neutral-800 bg-[#090909] hover:border-neutral-700 transition-all overflow-hidden shadow-lg"
              >
                {/* Post Header: News category and Post Time only */}
                <div className="p-5 sm:p-6 pb-3 space-y-3">
                  <div className="flex items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-2 text-neutral-400">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{post.timeAgo}</span>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-neutral-900 text-neutral-300 border border-neutral-800 shrink-0">
                      {post.category}
                    </span>
                  </div>

                  {/* Headline */}
                  {post.title && (
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug pt-1">
                      {post.title}
                    </h3>
                  )}

                  {/* Post Content */}
                  <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line font-sans">
                    {post.content}
                  </div>

                  {/* Code Snippet Box */}
                  {post.codeSnippet && (
                    <div className="rounded-lg border border-neutral-800 bg-[#040404] p-3.5 space-y-2 mt-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pb-1.5 border-b border-neutral-900">
                        <div className="flex items-center gap-1.5">
                          <Terminal className="w-3 h-3 text-neutral-400" />
                          <span>{post.codeSnippet.language}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(post.codeSnippet!.code, post.id)}
                          className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedCodeId === post.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="font-mono text-xs text-neutral-200 overflow-x-auto p-1 leading-relaxed">
                        <code>{post.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Image Embed */}
                  {post.image && (
                    <div className="rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 mt-2">
                      <div className="relative h-56 sm:h-72 w-full overflow-hidden">
                        <img
                          src={post.image.url}
                          alt={post.image.caption || 'Dispatch photo'}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {post.image.caption && (
                        <div className="p-2.5 text-[11px] font-mono text-neutral-400 bg-neutral-950 border-t border-neutral-900">
                          {post.image.caption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Link Preview Embed */}
                  {post.linkPreview && (
                    <a
                      href={post.linkPreview.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg border border-neutral-800 bg-[#050505] p-3 hover:border-neutral-700 transition-colors mt-2"
                    >
                      <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-500 mb-1">
                        <span>{post.linkPreview.domain}</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {post.linkPreview.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                        {post.linkPreview.description}
                      </p>
                    </a>
                  )}

                  {/* Tags list */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Social Interactions Action Bar */}
                <div className="px-5 sm:px-6 py-3 border-t border-neutral-850 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <div className="flex items-center gap-6 sm:gap-8">
                    {/* Like button */}
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isLiked
                          ? 'text-white font-bold'
                          : 'hover:text-white text-neutral-400'
                      }`}
                      aria-label="Like post"
                    >
                      <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current text-white' : ''}`} />
                      <span>{post.metrics.likes}</span>
                    </button>

                    {/* Comments */}
                    <button
                      onClick={() =>
                        setExpandedComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))
                      }
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        areCommentsOpen
                          ? 'text-white font-bold'
                          : 'hover:text-white text-neutral-400'
                      }`}
                      aria-label="View comments"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments.length > 0 ? `${post.comments.length} Comments` : `${post.metrics.replies} Comments`}</span>
                    </button>
                  </div>

                  {/* Right: Share */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleShare(post.id)}
                      className="p-1 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                      title="Share link"
                    >
                      {copiedPostId === post.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expandable Comments Section */}
                {areCommentsOpen && (
                  <div className="p-5 sm:p-6 pt-4 border-t border-neutral-900 bg-[#060606] space-y-4">
                    
                    {/* Reply input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(post.id);
                        }}
                        placeholder="Write a comment..."
                        className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 font-mono"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentInputs[post.id]?.trim()}
                        className="text-xs font-mono"
                      >
                        Reply
                      </Button>
                    </div>

                    {/* Comment Items */}
                    {post.comments.length > 0 ? (
                      <div className="space-y-3 pt-2">
                        {post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="flex items-start gap-3 p-3 rounded-lg bg-[#0a0a0a] border border-neutral-850"
                          >
                            <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-mono text-[10px] text-white shrink-0 mt-0.5 font-bold">
                              {comment.avatarText}
                            </div>
                            <div className="space-y-1 flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">
                                  {comment.author}
                                </span>
                                <span className="text-[11px] font-mono text-neutral-500">
                                  {comment.handle}
                                </span>
                                <span className="text-[10px] font-mono text-neutral-600">
                                  · {comment.timeAgo}
                                </span>
                              </div>
                              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[11px] font-mono text-neutral-500 py-2">
                        No replies yet. Be the first to start the discussion.
                      </div>
                    )}
                  </div>
                )}

              </article>
            );
          })}
        </div>

      </div>

    </div>
  );
};
