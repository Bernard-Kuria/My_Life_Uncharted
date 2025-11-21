"use client";
import { useEffect, useState } from "react";

import { getAllBlogs, getBlogMetaById, updateBlogMeta } from "@services/blogs";

import { cleanUpLink, getTopicFromLink } from "@utils/conversions";

import { Blog, BlogContent, BlogsType } from "@lib/types";
import { addComment, updateComment } from "@services/comments";
import { getBlogContentById } from "@services/blogContent";

export const useBlogPage = (blogpage: string, topicPage: string) => {
  const [blogs, setBlogs] = useState<BlogsType | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);
  const [viewed, setViewed] = useState(false);
  const [blog, setBlog] = useState<Blog>();
  const [blogContent, setBlogContent] = useState<BlogContent>();
  const [isMetaLoading, setIsMetaloading] = useState(true);
  const [isContentLoading, setIsContentloading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bounce, setBounce] = useState(false);

  // statuses
  const [commentAddStatus, setCommentAddStatus] = useState(false);
  const [addCommentCheck, setAddCommentCheck] = useState<boolean>(true);
  const [addBlogCheck, setAddBlogCheck] = useState<boolean>(true);

  const topic = getTopicFromLink(topicPage);
  const blogId = blogpage;

  useEffect(() => {
    getAllBlogs()
      .then(setBlogs)
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const viewedBlogs: string[] = JSON.parse(
      localStorage.getItem("viewedBlogs") || "[]"
    );

    if (viewed || viewedBlogs.includes(blogpage)) {
      setViewed(true);
      return;
    }

    async function addView() {
      try {
        const blog = (await getBlogMetaById(blogpage)) as Blog;
        const currentViews = blog.blogMeta.views || 0;

        const newViews = currentViews + 1;
        handleBlogUpdate({ id: blogpage, views: newViews });

        const updatedViewed = [...viewedBlogs, blogpage];
        localStorage.setItem("viewedBlogs", JSON.stringify(updatedViewed));

        setViewed(true);
      } catch (err) {
        console.error("Failed to update blog views:", err);
      }
    }

    addView();
  }, [blogpage]);

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
          title: blog?.blogMeta?.title,
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

  const handleBlogUpdate = async ({
    id,
    views,
    comments,
    likes,
  }: {
    id: string;
    views?: number;
    comments?: number;
    likes?: number;
  }) => {
    try {
      await updateBlogMeta({ id: id, blogMeta: { views, comments, likes } });
      setAddBlogCheck((prev) => !prev);
    } catch (error) {
      console.error(
        `Error updating blog ${views} ${comments} ${likes}}:`,
        error
      );
    }
  };

  const handleAddComment = async ({
    blogId,
    comment,
    comments,
  }: {
    blogId: string;
    comment: string;
    comments: number;
  }) => {
    console.log(comments);
    try {
      setCommentAddStatus(true);
      await addComment({ id: blogId, comment: comment, likes: 0 });
      handleBlogUpdate({ id: blogId, comments: comments });
      setAddBlogCheck((prev) => !prev);
      setAddCommentCheck((prev) => !prev);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setCommentAddStatus(false);
    }
  };

  const handleAddCommentLike = async ({
    docId,
    likes,
  }: {
    likes: number;
    docId: string;
  }) => {
    try {
      await updateComment({ docId: docId, likes: likes });
      setAddCommentCheck((prev) => !prev);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return {
    blogs,
    blog,
    blogContent,
    loaded,
    topic,
    handleBlogUpdate,
    handleAddComment,
    handleAddCommentLike,
    commentAddStatus,
    addBlogCheck,
    addCommentCheck,
    isMetaLoading,
    isContentLoading,
    bounce,
    triggerBounce,
    liked,
    handleLikeClick,
    handleShare,
  };
};
