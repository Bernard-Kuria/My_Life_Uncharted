"use client";
import { useEffect, useState } from "react";

import { getAllBlogs, updateBlogMeta } from "@services/blogs";

import { getTopicFromLink } from "@utils/conversions";

import { BlogsType } from "@lib/types";
import { addComment, updateComment } from "@services/comments";

export const useBlogPage = (topicPage: string) => {
  const [blogs, setBlogs] = useState<BlogsType | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  // statuses
  const [commentAddStatus, setCommentAddStatus] = useState(false);
  const [addCommentCheck, setAddCommentCheck] = useState<boolean>(true);
  const [addBlogCheck, setAddBlogCheck] = useState<boolean>(true);

  const topic = getTopicFromLink(topicPage);
  const backLink = topicPage;

  useEffect(() => {
    getAllBlogs()
      .then(setBlogs)
      .finally(() => setLoaded(true));
  }, []);

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
    loaded,
    topic,
    backLink,
    handleBlogUpdate,
    handleAddComment,
    handleAddCommentLike,
    commentAddStatus,
    addBlogCheck,
    addCommentCheck,
  };
};
