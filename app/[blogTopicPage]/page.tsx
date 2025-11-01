"use client";
import { use } from "react";

import Image from "next/image";

import FeaturedBlog from "@c/FeaturedBlog";
import Milestones from "@c/Milestones";
import Blogs from "@c/Blogs";
import BlogCards from "@c/BlogCard";

import { getLinkFromTopic } from "@utils/conversions";

import { useBlogTopicPage } from "@hooks/useBlogTopicPage";

export default function Page({
  params,
}: {
  params: Promise<{ blogTopicPage: string }>;
}) {
  const { blogTopicPage } = use(params);

  const { loaded, topicPage, page, targetBlogs, allTopics } =
    useBlogTopicPage(blogTopicPage);

  if (!loaded) return <div>Loading Blogs</div>;

  return (
    <div className="relative flex flex-col gap-[20px] w-full">
      {/* Background Image */}
      <div className="absolute w-full h-[calc(100vh-70px)]">
        {topicPage?.image === "" ? (
          ""
        ) : (
          <Image
            src={`${topicPage?.image}`}
            alt={topicPage?.title || "Topic Image"}
            fill
            objectFit="cover"
            priority
          />
        )}
      </div>

      <div className="grid justify-center">
        <div className="grid gap-[20px] w-[1035px]">
          <FeaturedBlog topic={topicPage?.title || ""} />

          <div>
            <div className="sub-title">Recent Posts</div>
            <div className="grid grid-cols-3 gap-[20px]">
              {targetBlogs && (
                <BlogCards location={page} targetBlogs={targetBlogs} />
              )}
            </div>
          </div>
        </div>
      </div>

      <Milestones topic={topicPage?.title} />

      <div className="page-layout">
        <strong>Explore More Topics:</strong>
        <div className="flex flex-wrap gap-[20px]">
          {allTopics &&
            allTopics.map((b) => {
              const link = getLinkFromTopic(b.title);
              return page !== link ? (
                <Blogs
                  key={b.id}
                  link={link}
                  imageUrl={b.image}
                  topic={b.title}
                  timeStamp={b.timeStamp}
                />
              ) : null;
            })}
        </div>
      </div>
    </div>
  );
}
