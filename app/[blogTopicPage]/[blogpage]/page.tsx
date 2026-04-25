"use client";
import { use } from "react";

import { useRouter, useParams } from "next/navigation";

import BlogReading from "@c/BlogReading";
import Comments from "@c/Comments";
import Blogs from "@c/Blogs";
import Loading from "@app/loading";

import { useBlogPage } from "@hooks/useBlogPage";
import { mediaType } from "@utils/conversions";

export default function Page({
  params,
}: {
  params: Promise<{ blogpage: string }>;
}) {
  const { blogpage } = use(params);
  const router = useRouter();
  const param = useParams();
  const topicPage = param.blogTopicPage?.toString();

  const {
    blogs,
    loaded,
    topic,
    handleAddComment,
    handleAddCommentLike,
    commentAddStatus,
    addCommentCheck,
    blogContent,
    isMetaLoading,
    isContentLoading,
    blog,
    liked,
    bounce,
    triggerBounce,
    handleLikeClick,
    handleShare,
  } = useBlogPage(blogpage, topicPage || "");

  if (!loaded) return <Loading loading="Loading Blog" />;

  return (
    <div className="page-layout grid gap-7.5">
      <button
        className="cursor-pointer w-fit detail-text"
        onClick={() => router.push(`/${topicPage}`)}
      >
        &larr; Back
      </button>

      {topicPage && (
        <BlogReading
          blogContent={blogContent}
          isMetaLoading={isMetaLoading}
          isContentLoading={isContentLoading}
          blog={blog}
          liked={liked}
          bounce={bounce}
          triggerBounce={triggerBounce}
          handleLikeClick={handleLikeClick}
          handleShare={handleShare}
        />
      )}

      <Comments
        blogId={blogpage}
        handleAddComment={handleAddComment}
        handleAddCommentLike={handleAddCommentLike}
        commentAddStatus={commentAddStatus}
        addCommentCheck={addCommentCheck}
      />
      <strong>More on this topic:</strong>
      <div className="page-layout grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogs
          ? blogs.map((b) => {
              const link = topicPage + "/" + b.id;
              return b.blogMeta.topic === topic && b.id !== blogpage ? (
                <Blogs
                  key={b.id}
                  link={link}
                  imageUrl={`blog/images/${b.blogMeta.image}`}
                  imageType={mediaType(b.blogMeta.image)}
                  topic={b.blogMeta.title}
                  timeStamp={b.blogMeta.dateCreated}
                />
              ) : null;
            })
          : null}
      </div>
    </div>
  );
}
