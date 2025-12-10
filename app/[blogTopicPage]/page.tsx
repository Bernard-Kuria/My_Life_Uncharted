"use client";
import { use } from "react";

import Image from "next/image";

import FeaturedBlog from "@c/FeaturedBlog";
import Milestones from "@c/Milestones";
import Blogs from "@c/Blogs";
import BlogCards from "@c/BlogCard";
import Loading from "@app/loading";

import { getLinkFromTopic, mediaType } from "@utils/conversions";

import { useBlogTopicPage } from "@hooks/useBlogTopicPage";

export default function Page({
  params,
}: {
  params: Promise<{ blogTopicPage: string }>;
}) {
  const { blogTopicPage } = use(params);

  const { loaded, topicPage, page, targetBlogs, allTopics, image, imageType } =
    useBlogTopicPage(blogTopicPage);

  if (!loaded) return <Loading loading="Loading Blogs" />;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Background Image */}
      <div className="absolute w-screen left-0 h-[400px] lg:h-[calc(100vh-70px)]">
        {image &&
          (imageType === "image" ? (
            <Image
              src={image}
              alt={topicPage?.title || "Topic Image"}
              fill
              priority
              style={{ objectFit: "cover" }}
              unoptimized
            />
          ) : imageType === "video" ? (
            <video autoPlay muted className="media w-full h-full">
              <source src={image} type="video/mp4" />
            </video>
          ) : null)}
      </div>

      <div className="page-layout">
        <div className="grid gap-5">
          <div className="w-full h-[430px] lg:h-[400px] mt-[200px] lg:mt-[calc(100vh-270px)] p-5 lg:p-10 z-1 bg-(--primary-blue)/80">
            {topicPage && <FeaturedBlog topic={topicPage?.title || ""} />}
          </div>

          <div>
            <div className="sub-title">Recent Posts</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {targetBlogs &&
                targetBlogs.map((blog) => (
                  <BlogCards
                    key={blog.id}
                    location={page}
                    blog={blog}
                    imageType={imageType}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Milestones topic={topicPage?.title} />

      <div className="page-layout">
        <strong>Explore More Topics:</strong>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allTopics &&
            allTopics.map((b) => {
              const link = getLinkFromTopic(b.title);
              return page !== link ? (
                <Blogs
                  key={b.id}
                  link={link}
                  imageUrl={`blogTopicImg/${b.image}`}
                  imageType={mediaType(b.image)}
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
