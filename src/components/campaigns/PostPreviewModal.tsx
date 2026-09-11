'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  X,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  ExternalLink,
  Hash,
  AtSign,
  BarChart2,
} from 'lucide-react';
import type { Creator, SamplePost } from '@/types';
import { formatNumber } from '@/lib/mock-data';

interface PostPreviewModalProps {
  creator: Creator;
  post: SamplePost;
  sponsorTag: string; // e.g. "@naano_platform"
  onClose: () => void;
}

// Derive hashtags from creator tags
function buildHashtags(tags: string[]): string {
  return tags
    .slice(0, 4)
    .map((t) => `#${t.replace(/[^a-zA-Z0-9]/g, '')}`)
    .join(' ');
}

export default function PostPreviewModal({
  creator,
  post,
  sponsorTag,
  onClose,
}: PostPreviewModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const hashtags = buildHashtags(creator.tags);
  const ctr = ((post.likes / post.impressions) * 100).toFixed(1);
  const engRate = (((post.likes + post.comments + post.reposts) / post.impressions) * 100).toFixed(2);

  const postedDate = new Date(post.postedAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden animate-fade-in-up"
        style={{
          background: '#ffffff',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close button */}
        <button
          id="post-modal-close"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
        >
          <X size={14} className="text-gray-600" />
        </button>

        {/* LinkedIn-style card */}
        <div className="p-4">

          {/* Profile header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="relative flex-shrink-0">
              <Image
                src={creator.avatarUrl}
                alt={creator.name}
                width={48}
                height={48}
                className="rounded-full border-2 border-gray-100 object-cover"
                unoptimized
              />
              {/* LinkedIn verified badge */}
              <div
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                style={{ background: '#0a66c2' }}
              >
                in
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-gray-900 truncate">{creator.name}</span>
                {creator.verified && (
                  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="#0a66c2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
              </div>
              <p className="text-xs text-gray-500 leading-tight line-clamp-2">{creator.headline}</p>
              <p className="text-xs text-gray-400 mt-0.5">{postedDate} · 🌐</p>
            </div>
          </div>

          {/* Post body */}
          <div className="mb-3">
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
              {post.text}
            </p>

            {/* Hashtags */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {creator.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="text-xs font-medium" style={{ color: '#0a66c2' }}>
                  #{tag.replace(/[^a-zA-Z0-9]/g, '')}
                </span>
              ))}
            </div>

            {/* Tagged sponsor */}
            <div
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded"
              style={{ background: 'rgba(10, 102, 194, 0.08)', color: '#0a66c2' }}
            >
              <AtSign size={10} />
              {sponsorTag}
              <span className="text-gray-400 font-normal ml-1">— Sponsored</span>
            </div>
          </div>

          {/* Engagement counts */}
          <div
            className="flex items-center justify-between py-2 border-y text-xs text-gray-500"
            style={{ borderColor: '#e5e7eb' }}
          >
            <div className="flex items-center gap-1">
              <span>👍❤️🎉</span>
              <span>{formatNumber(post.likes)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{formatNumber(post.comments)} comments</span>
              <span>·</span>
              <span>{formatNumber(post.reposts)} reposts</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-1">
            {[
              { icon: ThumbsUp, label: 'Like' },
              { icon: MessageSquare, label: 'Comment' },
              { icon: Repeat2, label: 'Repost' },
              { icon: Send, label: 'Send' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-xs font-medium text-gray-600 transition-colors"
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Attribution panel */}
        <div
          className="px-4 pb-4"
          style={{ borderTop: '1px solid #f1f5f9', marginTop: 4, paddingTop: 12 }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: '#6b7280' }}>
            📊 naano Attribution Metrics
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Impressions', value: formatNumber(post.impressions), color: '#3b82f6' },
              { label: 'Eng. Rate', value: `${engRate}%`, color: '#10b981' },
              { label: 'CTR', value: `${ctr}%`, color: '#6366f1' },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="rounded-lg p-2 text-center"
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
              >
                <p className="text-sm font-bold" style={{ color }}>{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>

          <a
            href={`https://linkedin.com/in/${creator.handle.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors hover:opacity-90"
            style={{ background: '#0a66c2', color: 'white' }}
          >
            <ExternalLink size={12} />
            View Live on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
