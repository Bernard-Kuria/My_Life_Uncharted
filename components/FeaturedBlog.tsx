"use client";

import Image from "next/image";

import { getFeaturedBlogs } from "@services/featuredBlogs";
import { getBlogMetaById } from "@services/blogs";
import { getLinkFromTopic } from "@utils/conversions";
import Link from "@node_modules/next/link";
import { useEffect, useState } from "react";
import { Blog } from "@lib/types/types";
import { getBlogImgUrl } from "@services/FirestoreStorage";
import { SectionLoading } from "@app/loading";

export default function FeaturedBlog({ topic }: { topic: string }) {
  const [featuredBlog, setFeaturedBlog] = useState<Blog | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    getFeaturedBlogs({ topic: topic })
      .then((e) => {
        getBlogMetaById(e[0].id).then((e) => {
          setFeaturedBlog(e as Blog);
        });
      })
      .finally(() => setLoaded(true));
  }, [topic]);

  useEffect(() => {
    if (featuredBlog) {
      getBlogImgUrl(featuredBlog.blogMeta.image).then(setImage);
    }
  }, [featuredBlog]);

  if (!featuredBlog || !loaded)
    return <SectionLoading loading={"Loading Featured blog"} />;

  return (
    <Link
      href={`/${
        getLinkFromTopic(featuredBlog.blogMeta.topic) + "/" + featuredBlog.id
      }`}
      className="h-full grid grid-rows-[30px_1fr] gap-[10px] lg:gap-[20px] text-white"
    >
      <div className="flex items-center">Featured Blog</div>
      <div className="grid lg:flex gap-[10px] lg:gap-[30px] grid-rows-[200px_1fr]">
        <div className="relative lg:w-[50%]">
          {image && (
            <Image
              src={image}
              alt="Bike Riding"
              fill
              style={{ objectFit: "cover" }}
              className="object-cover"
              unoptimized
            />
          )}
        </div>
        <div className="flex flex-col justify-between lg:w-[50%]">
          <div className="grid">
            <div className="flex gap-1 items-center detail-text">
              <div className="">{featuredBlog.blogMeta.dateCreated}</div>
              <div className="w-0.5 h-0.5 rounded rounded-0.5 bg-white"></div>
              <div className="">{featuredBlog.blogMeta.minsRead} min read</div>
            </div>
            <div className="blog-title">{featuredBlog.blogMeta.title}</div>
            <div className="blog-font">{featuredBlog.blogMeta.subtitle}</div>
          </div>
          <div className="flex gap-1 detail-text border-t border-white pt-[10px]">
            <div className="">{featuredBlog.blogMeta.views} views</div>
            <div className="">{featuredBlog.blogMeta.comments} comments</div>
            <div className="">{featuredBlog.blogMeta.likes} likes</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
