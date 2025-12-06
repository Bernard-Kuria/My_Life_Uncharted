"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type {
  Blog,
  Comment,
  FetchedComment,
  FetchedCommentsType,
} from "@lib/types/types";
import { useEffect, useState } from "react";

import { getSpecificBlogComments } from "@services/comments";
import { getBlogMetaById } from "@services/blogs";

export default function Comments({
  blogId,
  handleAddComment,
  handleAddCommentLike,
  commentAddStatus,
  addCommentCheck,
}: {
  blogId: string;
  handleAddComment: (args: {
    blogId: string;
    comment: string;
    comments: number;
  }) => Promise<void>;
  handleAddCommentLike: (args: { docId: string; likes: number }) => void;
  commentAddStatus: boolean;
  addCommentCheck: boolean;
}) {
  const [blog, setBlog] = useState<Blog>();
  const [comments, setComments] = useState<FetchedCommentsType>();
  const [visibleCount, setVisibleCount] = useState<number>(5);

  useEffect(() => {
    async function fetchComments() {
      const comments = await getSpecificBlogComments(blogId);
      setComments(comments as FetchedCommentsType);

      const blog = await getBlogMetaById(blogId);
      setBlog(blog as Blog);
    }

    fetchComments();
  }, [blogId, addCommentCheck]);

  return (
    <div className="detail-text grid gap-[10px]">
      <strong>Comments (Anonymous)</strong>
      <div className="grid gap-[20px]">
        <EditComment
          blogId={blogId}
          handleAddComment={handleAddComment}
          commentAddStatus={commentAddStatus}
          comments={blog?.blogMeta.comments || 0}
        />
        {!comments ? (
          <div>Loading comments</div>
        ) : (
          comments
            .slice(0, visibleCount)
            .map((c: FetchedComment) => (
              <Comment
                key={c.docId}
                id={c.docId}
                comment={c}
                likes={c.likes}
                handleAddCommentLike={handleAddCommentLike}
              />
            ))
        )}

        {comments && visibleCount < comments.length && (
          <button
            className="text-(--primary-blue) text-left cursor-pointer w-fit"
            onClick={() => setVisibleCount((prev) => prev + 5)}
          >
            view more
          </button>
        )}
      </div>
    </div>
  );
}

function EditComment({
  blogId,
  comments,
  handleAddComment,
  commentAddStatus,
}: {
  blogId: string;
  handleAddComment: (args: {
    blogId: string;
    comment: string;
    comments: number;
  }) => Promise<void>;
  comments: number;
  commentAddStatus: boolean;
}) {
  const [comment, setComment] = useState("");

  const submit = () => {
    if (!comment.trim()) return;
    handleAddComment({ blogId, comment, comments: comments + 1 });
    setComment("");
  };

  return (
    <div className="flex gap-[10px]">
      <div className="w-[14px] h-full bg-(--secondary-blue)" />

      <div className="bg-white rounded-[10px] dark:bg-black w-full p-2 flex gap-[10px] items-center">
        <input
          type="text"
          placeholder="Add comment here"
          className="flex-1 w-full focus:outline-none focus:ring-0"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          className="text-(--primary-blue) cursor-pointer rounded-[10px] p-1 h-7 bg-(--secondary-blue) hover:bg-(--primary-blue) hover:text-(--secondary-blue)"
          onClick={submit}
        >
          {commentAddStatus ? "Adding Comment..." : "Add comment"}{" "}
          <FontAwesomeIcon icon={["far", "paper-plane"]} />
        </button>
      </div>
    </div>
  );
}

function Comment({
  id,
  comment,
  likes,
  handleAddCommentLike,
}: {
  id: string;
  comment: Comment;
  likes: number;
  handleAddCommentLike: (args: { docId: string; likes: number }) => void;
}) {
  const [liked, setLiked] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const likedComments = JSON.parse(
      localStorage.getItem("likedComments") || "[]"
    );

    if (likedComments.includes(id)) {
      setLiked(true);
    }
  }, [id]);

  const triggerBounce = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 200);
  };

  const handleLikeClick = () => {
    const newLikes = liked ? likes - 1 : likes + 1;

    setLiked(!liked);
    handleAddCommentLike({
      docId: id,
      likes: newLikes,
    });

    const likedComments = JSON.parse(
      localStorage.getItem("likedComments") || "[]"
    );

    if (!liked) {
      const updated = [...likedComments, id];
      localStorage.setItem("likedComments", JSON.stringify(updated));
    } else {
      const updated = likedComments.filter((c: string) => c !== id);
      localStorage.setItem("likedComments", JSON.stringify(updated));
    }
  };

  return (
    <div className="flex gap-[10px]">
      <div className="w-[14px] h-full bg-(--secondary-blue)"></div>
      <div className="grid gap-[10px] bg-white rounded-[10px] dark:bg-black w-full p-2">
        <div>{comment.comment}</div>
        <div className="flex gap-[10px] items-center">
          {comment.likes}
          <FontAwesomeIcon
            className={`icon-size cursor-pointer ${
              bounce ? "like-bounce" : ""
            } ${liked ? "text-(--secondary-blue)" : "text-(--foreground)"}`}
            icon={["far", "thumbs-up"]}
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
