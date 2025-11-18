"use client";
import { useEffect, useState } from "react";

import { getAllBlogs } from "@services/blogs";

import { getTopicFromLink } from "@utils/conversions";

import { BlogsType } from "@lib/types";
import { addComment, updateComment } from "@services/comments";

export const useBlogPage = (topicPage: string) => {
  const [blogs, setBlogs] = useState<BlogsType | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  // statuses
  const [commentAddStatus, setCommentAddStatus] = useState(false);
  const [commentLikeStatus, setCommentLikeStatus] = useState(false);
  const [addCommentCheck, setAddCommentCheck] = useState<boolean>(true);

  const topic = getTopicFromLink(topicPage);
  const backLink = topicPage;

  useEffect(() => {
    getAllBlogs()
      .then(setBlogs)
      .finally(() => setLoaded(true));
  }, []);

  const handleAddComment = async ({
    blogId,
    comment,
  }: {
    blogId: string;
    comment: string;
  }) => {
    try {
      setCommentAddStatus(true);
      await addComment({ id: blogId, comment: comment, likes: 0 });
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
    docId: string;
    likes: number;
  }) => {
    try {
      setCommentLikeStatus(true);
      await updateComment({ docId: docId, likes: likes });
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setCommentLikeStatus(false);
    }
  };

  return {
    blogs,
    loaded,
    topic,
    backLink,
    handleAddComment,
    handleAddCommentLike,
    commentAddStatus,
    commentLikeStatus,
    addCommentCheck,
    setAddCommentCheck,
  };
};
