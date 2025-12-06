"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Blog } from "@lib/types/types";
import { getLinkFromTopic, getTopicFromLink } from "@utils/conversions";
import { getImgUrl } from "@services/FirestoreStorage";

export default function BlogCards({
  location,
  blog,
  imageType,
}: {
  location: string;
  blog: Blog;
  imageType: "image" | "video" | "unknown" | null;
}) {
  const { image, title, views, likes, comments } = blog.blogMeta;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    getImgUrl(`blog/images/${image}`).then(setImageUrl);
  }, [image]);

  return (
    <Link
      key={blog.id}
      href={`${getLinkFromTopic(getTopicFromLink(location))}/${blog.id}`}
    >
      <div className="w-full border flex flex-col justify-between border-gray-400 h-fit">
        <div className="relative h-[250px] overflow-hidden">
          {imageUrl && imageType ? (
            imageType === "image" ? (
              <Image
                src={imageUrl}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
            ) : imageType === "video" ? (
              <div className="w-full h-[250px] flex text-blue-600 font-medium border-blue-200">
                <video autoPlay muted className="media">
                  <source src={imageUrl} type="video/mp4" />
                </video>
              </div>
            ) : null
          ) : null}
        </div>
        <div className="grid gap-[10px] p-[20px]">
          <div className="h-[65px] overflow-hidden sub-title text-(--secondary-blue)">
            {title}
          </div>
          <div className="flex justify-between border-t border-gray-600 detail-text pt-[10px]">
            <div>
              <FontAwesomeIcon className="icon-size" icon={["far", "eye"]} />
              {"  "}
              {views}
            </div>
            <div className="flex gap-[10px] items-center">
              <FontAwesomeIcon className="icon-size" icon={["far", "heart"]} />{" "}
              {likes}
            </div>
            <div className="flex gap-[10px] items-center">
              <FontAwesomeIcon
                className="icon-size"
                icon={["far", "message"]}
              />{" "}
              {comments}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
