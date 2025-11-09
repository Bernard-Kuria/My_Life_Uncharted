"use client";
import { use, useEffect } from "react";

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

  const { loaded, topicPage, page, targetBlogs, allTopics, image } =
    useBlogTopicPage(blogTopicPage);

  useEffect(() => {
    console.log(image);
  }, [image]);

  if (!loaded) return <div>Loading Blogs</div>;

  return (
    <div className="relative flex flex-col gap-[20px] w-full">
      {/* Background Image */}
      <div className="absolute w-full h-[calc(100vh-70px)]">
        {image && (
          <Image
            src={image}
            alt={topicPage?.title || "Topic Image"}
            fill
            objectFit="cover"
            priority
            style={{ objectFit: "cover" }}
            unoptimized
          />
        )}
      </div>

      <div className="grid justify-center">
        <div className="grid gap-[20px] w-[1035px]">
          <FeaturedBlog topic={topicPage?.title || ""} />

          <div>
            <div className="sub-title">Recent Posts</div>
            <div className="grid grid-cols-3 gap-[20px]">
              {targetBlogs &&
                targetBlogs.map((blog) => (
                  <BlogCards key={blog.id} location={page} blog={blog} />
                ))}
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
                  imageUrl={`blogTopicImg/${b.image}`}
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
