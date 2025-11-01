"use client";
import { use } from "react";

import { useRouter, useParams } from "next/navigation";

import BlogReading from "@c/BlogReading";
import Comments from "@c/Comments";
import Blogs from "@c/Blogs";

import { useBlogPage } from "@hooks/useBlogPage";

export default function Page({
  params,
}: {
  params: Promise<{ blogpage: string }>;
}) {
  const { blogpage } = use(params);
  const router = useRouter();
  const param = useParams();
  const topicPage = param.blogTopicPage?.toString();

  const { blogs, loaded, topic, backLink } = useBlogPage(topicPage || "");

  if (!loaded) return <div>Loading Blogs</div>;

  return (
    <div className="page-layout grid gap-[30px]">
      <button
        className="cursor-pointer w-fit"
        onClick={() => router.push(`/${backLink}`)}
      >
        &larr; Back
      </button>
      <BlogReading blogId={blogpage} />
      <Comments blogId={blogpage} />
      <strong>More on this topic:</strong>
      <div className="page-layout flex flex-wrap gap-[20px]">
        {blogs
          ? blogs.map((b) => {
              const link = backLink + "/" + b.id;
              return b.blogMeta.topic === topic && b.id !== blogpage ? (
                <Blogs
                  key={b.id}
                  link={link}
                  imageUrl={b.blogMeta.image}
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
