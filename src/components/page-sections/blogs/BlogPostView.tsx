"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types";
import PostModal from "./PostModal";

// Thin client wrapper so the server-rendered post page can reuse the existing
// PostModal UI and keep its close (back) behaviour.
export default function BlogPostView({
  post,
  breadcrumbs,
  related,
}: {
  post: Post;
  breadcrumbs?: React.ReactNode;
  related?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <PostModal
      post={post}
      breadcrumbs={breadcrumbs}
      related={related}
      onClose={() => router.back()}
    />
  );
}
