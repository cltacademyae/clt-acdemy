"use client";
import { BLOG_POSTS } from "@/const/data";
import React, { useEffect, useState } from "react";
import { BlogPostCard } from "./blogCard";
import { BlogSidebar } from "./blogSidebar";
import { Post, User } from "@/types";
import PostModal from "./PostModal";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { postPath } from "@/lib/getBlogPosts";

const BlogsListing = ({ initialPosts }: { initialPosts?: Post[] }) => {
  // Seed with server-fetched posts so they render in the SSR HTML (SEO).
  const [posts, setPosts] = useState<Post[]>(initialPosts ?? []);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setPost } = useUIStore();
  // Sync with Backend
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`,
      );
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        setPosts(BLOG_POSTS);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setPosts(BLOG_POSTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Server already provided posts; only fetch client-side if none came through.
    if (!initialPosts || initialPosts.length === 0) fetchPosts();
    else setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section className="container mt-20 min-h-screen mx-auto px-4 max-w-7xl pb-20">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          <div className="lg:w-2/3">
            {posts.map((post) => (
              <BlogPostCard
                onClick={() => {
                  setPost(post);
                  router.push(postPath(post));
                }}
                key={post._id}
                post={post}
              />
            ))}
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-28">
              <BlogSidebar posts={posts} />
            </div>
          </div>
        </div>
      </section>
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </>
  );
};

export default BlogsListing;
