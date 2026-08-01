import React from "react";
import Link from "next/link";
import { Calendar, User, Folder, Clock, ArrowRight } from "lucide-react";
import { Post } from "@/types";
import { getReadTime } from "@/lib/readTime";
import { formatDate } from "@/lib/formatDate";
import { slugify } from "@/lib/getBlogPosts";
import { useWhatsapp } from "@/hooks/useWhatsapp";


interface BlogPostCardProps {
  post: Post;
  onClick: () => void;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onClick }) => {
  const whatsapp = useWhatsapp("blog_cta");
  return (
    <article onClick={onClick} className="bg-white mb-12 flex flex-col group">
      {/* Image Container — linked for crawlability + larger click target */}
      <Link
        href={`/blogs/${slugify(post.title)}`}
        className="relative overflow-hidden rounded-lg mb-6 block"
      >
        <img
          src={post.photo}
          alt={post.title}
          width={1200}
          height={630}
          className="w-full h-64 md:h-96 object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Meta Data */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-gray-700 mb-4">
        <div className="flex items-center gap-1.5 hover:text-red-600 transition-colors cursor-pointer">
          <Calendar size={16} className="text-red-500" />
          <span>{formatDate(post.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1.5 hover:text-red-600 transition-colors cursor-pointer">
          <User size={16} className="text-red-500" />
          <span>
            by <span className="font-semibold text-gray-900">{post.author}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 hover:text-red-600 transition-colors cursor-pointer">
          <Folder size={16} className="text-red-500" />
          <span className="font-semibold text-gray-900">{post.tags[0]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={16} className="text-red-500" />
          <span>{getReadTime(post.content)}</span>
        </div>
      </div>

      {/* Title — real crawlable link; native nav also enables open-in-new-tab */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
        <Link
          href={`/blogs/${slugify(post.title)}`}
          className="hover:text-red-600 transition-colors cursor-pointer"
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt */}
      <p className="text-gray-600 leading-relaxed mb-6">{post.description}</p>

      {/* Enroll Now — drives blog readers to the course sales chat (WhatsApp) */}
      <div>
        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            whatsapp.onClick();
          }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-gray-800 font-medium hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 group"
        >
          Enroll Now
          <ArrowRight
            size={18}
            className="text-red-600 group-hover:text-white transition-colors"
          />
        </a>
      </div>
    </article>
  );
};
