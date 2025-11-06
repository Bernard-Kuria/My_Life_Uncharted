"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";
import { Blog } from "@lib/types";
import { checkIsFeatured, setFeatured } from "@services/featuredBlogs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type BlogsListProps = {
  blog: Blog;
  refreshTrigger: boolean;
  setRefreshTrigger: Dispatch<SetStateAction<boolean>>;
};

export default function BlogsList({
  blog,
  refreshTrigger,
  setRefreshTrigger,
}: BlogsListProps) {
  const [isFeatured, setIsFeatured] = useState<boolean | undefined>();
  const [loading, setLoading] = useState(false);
  const location = usePathname();
  const { id } = blog;
  const { title, subtitle, views, comments, likes, topic } = blog.blogMeta;

  // ✅ Fetch featured status on mount + when refreshTrigger toggles
  useEffect(() => {
    async function fetchFeaturedStatus() {
      const featured = await checkIsFeatured(id);
      setIsFeatured(featured);
    }
    fetchFeaturedStatus();
  }, [refreshTrigger]);

  // ✅ Handles the toggle logic
  const handleFeatured = async () => {
    try {
      setLoading(true);
      setIsFeatured((prev) => !prev); // optimistic update for instant UI feedback
      await setFeatured(id, topic);
      setRefreshTrigger((prev) => !prev); // trigger re-fetch to confirm real status
    } catch (error) {
      console.error("Error toggling featured:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[200px] flex gap-[10px] border rounded-[10px] flex-1 p-5">
      <Link className="flex-1" href={`${location}/${id}`}>
        <div className="flex-1 flex flex-col gap-[15px]">
          <div className="sub-title">{title}</div>
          <div className="flex-1 blog-font">{subtitle}</div>
        </div>
      </Link>
      <div className="bg-(--foreground)/30 rounded-2xl p-5 flex flex-col justify-between">
        <div className="flex justify-between items-center w-56 h-[15px] detail-text">
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon icon={["far", "eye"]} className="w-[15px]" />{" "}
            {views}
          </div>
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon icon={["far", "comment"]} className="w-[15px]" />
            {comments}
          </div>
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon icon={["far", "heart"]} className="w-[15px]" />{" "}
            {likes}
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleFeatured}
          className={`${isFeatured ? "buttonInverted" : "button"}`}
        >
          {loading
            ? "Updating..."
            : isFeatured
            ? "Featured"
            : "Set as Featured"}
        </button>
      </div>
    </div>
  );
}
