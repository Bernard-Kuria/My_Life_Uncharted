"use client";
import { use, useEffect, useState } from "react";

import { useRouter, useParams } from "next/navigation";

import BlogReading from "@c/BlogReading";
import Comments from "@c/Comments";
import Blogs from "@c/Blogs";

import { useBlogPage } from "@hooks/useBlogPage";
import { getBlogMetaById } from "@services/blogs";
import { Blog } from "@lib/types";

export default function Page({
  params,
}: {
  params: Promise<{ blogpage: string }>;
}) {
  const { blogpage } = use(params);
  const router = useRouter();
  const param = useParams();
  const topicPage = param.blogTopicPage?.toString();

  const [viewed, setViewed] = useState<boolean>(false);

  const {
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
  } = useBlogPage(topicPage || "");

  useEffect(() => {
    const viewedBlogs: string[] = JSON.parse(
      localStorage.getItem("viewedBlogs") || "[]"
    );

    if (viewedBlogs.includes(blogpage)) {
      setViewed(true); // user already viewed
      return; // no need to update views
    }

    async function addView() {
      try {
        const blog = (await getBlogMetaById(blogpage)) as Blog;
        const currentViews = blog.blogMeta.views || 0;

        // increment views
        const newViews = currentViews + 1;
        handleBlogUpdate({ id: blogpage, views: newViews });

        // mark as viewed locally
        const updatedViewed = [...viewedBlogs, blogpage];
        localStorage.setItem("viewedBlogs", JSON.stringify(updatedViewed));

        setViewed(true);
      } catch (err) {
        console.error("Failed to update blog views:", err);
      }
    }

    addView();
  }, [blogpage]);

  if (!loaded) return <div>Loading Blogs</div>;

  return (
    <div className="page-layout grid gap-[30px]">
      <button
        className="cursor-pointer w-fit"
        onClick={() => router.push(`/${backLink}`)}
      >
        &larr; Back
      </button>

      {topicPage && (
        <BlogReading
          topicPage={topicPage}
          blogId={blogpage}
          handleBlogUpdate={handleBlogUpdate}
          addBlogCheck={addBlogCheck}
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
      <div className="page-layout flex flex-wrap gap-[20px]">
        {blogs
          ? blogs.map((b) => {
              const link = backLink + "/" + b.id;
              return b.blogMeta.topic === topic && b.id !== blogpage ? (
                <Blogs
                  key={b.id}
                  link={link}
                  imageUrl={`blog/images/${b.blogMeta.image}`}
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
