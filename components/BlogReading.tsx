"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutputBlock from "./DraftifyProComponents/OutputBlock";
import Tooltip from "./DraftifyProComponents/Tooltip";

import { getBlogContentById } from "@services/blogContent";
import { getBlogMetaById } from "@services/blogs";
import { BlogContent, Blog } from "@lib/types";
import { cleanUpLink } from "@utils/conversions";

export default function BlogArea({
  topicPage,
  blogId,
  handleBlogUpdate,
  addBlogCheck,
}: {
  topicPage: string;
  blogId: string;
  handleBlogUpdate: ({
    id,
    views,
    comments,
    likes,
  }: {
    id: string;
    views?: number;
    comments?: number;
    likes?: number;
  }) => void;
  addBlogCheck: boolean;
}) {
  const [blog, setBlog] = useState<Blog>();
  const [blogContent, setBlogContent] = useState<BlogContent>();
  const [isMetaLoading, setIsMetaloading] = useState(true);
  const [isContentLoading, setIsContentloading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const blog = await getBlogMetaById(blogId);
        if (mounted) {
          setBlog(blog as Blog);
        }
      } catch (err) {
        console.error("Failed to load blog meta:", err);
      } finally {
        if (mounted) setIsMetaloading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [blogId, addBlogCheck]);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const content = await getBlogContentById(blogId);

        if (mounted) {
          setBlogContent(content);
        }
      } catch (err) {
        console.error("Failed to load blog content:", err);
      } finally {
        if (mounted) setIsContentloading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [blogId]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/${cleanUpLink(
      topicPage
    )}/${blogId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: blog?.blogMeta?.title || "Check this out",
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      console.log("Link copied to clipboard!");
    } catch (err) {
      console.error("Sharing failed:", err);
    }
  };

  useEffect(() => {
    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");

    if (likedBlogs.includes(blogId)) {
      setLiked(true);
    }
  }, [blogId]);

  const triggerBounce = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 200);
  };

  const handleLikeClick = () => {
    const newLikes = liked
      ? (blog?.blogMeta?.likes || 0) - 1
      : (blog?.blogMeta?.likes || 0) + 1;

    setLiked(!liked);
    handleBlogUpdate({
      id: blogId,
      likes: newLikes,
    });

    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");

    if (!liked) {
      const updated = [...likedBlogs, blogId];
      localStorage.setItem("likedBlogs", JSON.stringify(updated));
    } else {
      const updated = likedBlogs.filter((c: string) => c !== blogId);
      localStorage.setItem("likedBlogs", JSON.stringify(updated));
    }
  };

  if (isMetaLoading && isContentLoading) return <div>Loading Blog...</div>;

  return (
    <div className="flex flex-col gap-[20px] min-h-[1170px] h-fit p-[100px] bg-white dark:bg-black blog-text">
      <div className="flex detail-text">
        <div className="flex-1 flex gap-[30px]">
          <div>{blog?.blogMeta.dateCreated}</div>
          <div>{blog?.blogMeta.minsRead} min read</div>
        </div>
        <div className="flex gap-[10px] items-center cursor-pointer">
          <Tooltip text="Copy link to share">
            <FontAwesomeIcon
              className="icon-size"
              icon={["fas", "share-nodes"]}
              onClick={handleShare}
            />
          </Tooltip>
          {/* <FontAwesomeIcon className="icon-size" icon={["fas", "download"]} /> */}
        </div>
      </div>

      {blogContent ? (
        <div className="flex-1 flex flex-col gap-1">
          <OutputBlock blocksData={blogContent.blogContent} />
        </div>
      ) : (
        <div>No blog data</div>
      )}

      <div className="flex detail-text">
        <div className="flex gap-[30px]">
          <div>
            <strong>{blog?.blogMeta.views}</strong> views
          </div>
          <div>
            <strong>{blog?.blogMeta.comments}</strong> comments
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-[10px] items-center">
          <strong>{blog?.blogMeta.likes}</strong>
          <FontAwesomeIcon
            className={`icon-size cursor-pointer ${
              bounce ? "like-bounce" : ""
            } ${liked ? "text-(--secondary-blue)" : "text-black"}`}
            icon={["far", "heart"]}
            onClick={() => {
              triggerBounce();
              handleLikeClick();
            }}
          />
        </div>
      </div>
    </div>
  );
}
