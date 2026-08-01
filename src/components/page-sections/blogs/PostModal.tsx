"use client"
import React from "react";
import { Post } from "@/types";
import "react-quill-new/dist/quill.snow.css";
import { IoClose } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa";
import { formatDate } from "@/lib/formatDate";
import { getReadTime } from "@/lib/readTime";

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
  breadcrumbs?: React.ReactNode;
}

// SEO note: title/description/OG/Twitter meta are set server-side in
// app/blogs/[slug]/page.tsx via generateMetadata. Do NOT re-write them here
// on the client — it duplicates/races the server tags that crawlers read.
const PostModal: React.FC<PostModalProps> = ({
  post,
  onClose,
  breadcrumbs,
}) => {
  if (!post) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-8 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-700"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative w-full max-w-6xl
          h-[100dvh] max-h-[100dvh]
          sm:h-full sm:max-h-[92vh]
          overflow-y-auto
          bg-zinc-900 border border-zinc-800
          rounded-none sm:rounded-[3rem]
          shadow-[0_0_100px_rgba(0,0,0,1)]
          animate-in slide-in-from-bottom-20 duration-700
          custom-scrollbar group
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 sm:top-8 sm:right-8
            z-[110]
            w-10 h-10 sm:w-14 sm:h-14
            flex items-center justify-center
            bg-zinc-800/50 backdrop-blur-xl
            hover:bg-zinc-700
            rounded-xl sm:rounded-2xl
            text-zinc-400 hover:text-white
            transition-all shadow-2xl
            border border-zinc-700/50
            active:scale-90
          "
        >
          <IoClose className="text-2xl sm:text-3xl" />
        </button>

        {/* Hero Image */}
        <div
          className="
            relative w-full
            aspect-[4/5] sm:aspect-[21/10]
            overflow-hidden border-b border-zinc-800
          "
        >
          <img
            src={post.photo}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

          {/* Title & Tags */}
          <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-8 md:left-16 right-4 sm:right-16">
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 sm:px-4 sm:py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] bg-primary/50 text-white rounded-xl shadow-[0_10px_20px_-5px_primary]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter">
              {post.title}
            </h1>
          </div>
        </div>

        {breadcrumbs && (
          <div className="[&_nav]:px-4 [&_nav]:sm:px-8 [&_nav]:md:px-20 [&_nav]:text-zinc-400 [&_a]:text-zinc-400 [&_span]:text-zinc-200">
            {breadcrumbs}
          </div>
        )}

        {/* Content */}
        <div className="px-4 sm:px-8 md:px-20 py-10 sm:py-16">
          {/* Author */}
          <div
            className="
              flex flex-col sm:flex-row
              gap-4 sm:gap-6
              sm:items-center
              mb-12 sm:mb-16
              pb-12 sm:pb-16
              border-b border-zinc-800/30
            "
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1.25rem] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-800 shadow-inner">
              <FaUserShield className="text-2xl sm:text-3xl" />
            </div>

            <div>
              <p className="text-zinc-100 font-black text-lg sm:text-xl uppercase tracking-tighter">
                {post.authorDetails?.name || post.author}
              </p>
              <p className="text-zinc-500 text-[10px] sm:text-xs font-black uppercase tracking-widest mt-1">
                <span className="text-primary">
                  {post.authorDetails?.profession || "Trading Mentor"}
                </span>{" "}
                • Published: {formatDate(post.createdAt)} •{" "}
                {getReadTime(post.content)}
              </p>
              {post.updatedAt && post.updatedAt !== post.createdAt && (
                <p className="text-zinc-500 text-[10px] sm:text-xs font-black uppercase tracking-widest mt-1">
                  Last updated: {formatDate(post.updatedAt)}
                </p>
              )}
              {post.authorDetails?.link && (
                <a
                  href={post.authorDetails.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
                >
                  Profile Link
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mx-auto">
            {/* <div className="text-base sm:text-xl text-white/80 bg-primary/5 rounded-xl p-4 sm:p-6 font-light mb-12 sm:mb-16 border-l-4 border-primary/50 pl-6 sm:pl-10 italic">
              {post.description}
            </div> */}

            {/* Rich Content */}
            <div
              className="
                ql-editor rich-content max-w-none
                text-sm sm:text-base
                text-zinc-300
                leading-[1.7] sm:leading-[1.8]
                space-y-10 sm:space-y-8
                font-serif
              "
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
