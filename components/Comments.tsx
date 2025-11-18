"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Comment, FetchedComment, FetchedCommentsType } from "@lib/types";
import { useEffect, useState } from "react";

import { getSpecificBlogComments } from "@services/comments";

export default function Comments({
  blogId,
  handleAddComment,
  handleAddCommentLike,
  commentAddStatus,
  addCommentCheck,
  setAddCommentCheck,
}: {
  blogId: string;
  handleAddComment: (args: {
    blogId: string;
    comment: string;
  }) => Promise<void>;
  handleAddCommentLike: (args: { docId: string; likes: number }) => void;
  commentAddStatus: boolean;
  addCommentCheck: boolean;
  setAddCommentCheck: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [comments, setComments] = useState<FetchedCommentsType>();

  useEffect(() => {
    getSpecificBlogComments(blogId).then(setComments);
  }, [blogId, addCommentCheck]);

  return (
    <div className="detail-text grid gap-[10px]">
      <strong>Comments (Anonymous)</strong>
      <div className="grid gap-[20px]">
        <EditComment
          blogId={blogId}
          handleAddComment={handleAddComment}
          commentAddStatus={commentAddStatus}
        />
        {!comments ? (
          <div>Loading comments</div>
        ) : (
          comments.map((c: FetchedComment) => (
            <Comment
              key={c.docId}
              id={c.docId}
              comment={c}
              likes={c.likes}
              handleAddCommentLike={handleAddCommentLike}
              addCommentCheck={addCommentCheck}
              setAddCommentCheck={setAddCommentCheck}
            />
          ))
        )}
      </div>
      <button className="text-(--primary-blue) text-left cursor-pointer w-fit">
        view more
      </button>
    </div>
  );
}

function EditComment({
  blogId,
  handleAddComment,
  commentAddStatus,
}: {
  blogId: string;
  handleAddComment: (args: {
    blogId: string;
    comment: string;
  }) => Promise<void>;
  commentAddStatus: boolean;
}) {
  const [comment, setComment] = useState("");

  const submit = () => {
    if (!comment.trim()) return; // avoid empty comments
    handleAddComment({ blogId, comment });
    setComment(""); // reset input
  };

  return (
    <div className="flex gap-[20px]">
      <div className="w-[14px] h-full bg-(--secondary-blue)" />

      <div className="bg-white dark:bg-black w-full p-2">
        <input
          type="text"
          placeholder="Add comment here"
          className="w-full"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <hr />

        <button
          className="text-(--primary-blue) cursor-pointer"
          onClick={submit}
        >
          {commentAddStatus ? "Adding Comment..." : "Add comment"}
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
  addCommentCheck,
  setAddCommentCheck,
}: {
  id: string;
  comment: Comment;
  likes: number;
  handleAddCommentLike: (args: { docId: string; likes: number }) => void;
  addCommentCheck: boolean;
  setAddCommentCheck: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleLikeClick = () => {
    const newLikes = addCommentCheck ? likes - 1 : likes + 1;
    handleAddCommentLike({ docId: id, likes: newLikes });
    setAddCommentCheck(!addCommentCheck);
  };

  return (
    <div className="flex gap-[20px]">
      <div className="w-[14px] h-full bg-(--secondary-blue)"></div>
      <div className="grid gap-[10px] bg-white dark:bg-black w-full p-2">
        <div className="">{comment.comment}</div>
        <div className="flex gap-[10px] items-center">
          {comment.likes}{" "}
          <FontAwesomeIcon
            className="icon-size cursor-pointer"
            icon={["far", "thumbs-up"]}
            onClick={handleLikeClick}
          />
        </div>
      </div>
    </div>
  );
}
