"use client";

import { usePathname } from "next/navigation";

import Blogs from "@c/Blogs";
import Hero from "@c/Hero";
import Loading from "@app/loading";

import { getLinkFromTopic, mediaType } from "@utils/conversions";

import { useIndex } from "@hooks/useIndex";

export default function Home() {
  const location = usePathname();
  const {
    mainImg,
    secondaryTopImg,
    secondaryBottomImg,
    topics,
    loadingTopics,
    loadingImages,
    error,
  } = useIndex();

  const loading = loadingTopics || loadingImages;

  if (loading) return <Loading loading="Loading images or topics..." />;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="page-layout flex flex-col justify-center lg:mt-[30px] gap-[20px] lg:gap-[100px]">
      <Hero
        mainImg={mainImg}
        secondaryTopImg={secondaryTopImg}
        secondaryBottomImg={secondaryBottomImg}
      />
      <div
        className={`${
          location === "/" ? "justify-center text-center" : "text-left"
        } text-(--secondary-blue) section-title hover:border-(--primary-blue)`}
      >
        {location === "/" ? "Browse" : "Other"} Topics
        <div className="grid lg:grid-cols-2 gap-[20px]">
          {topics.map((b) => {
            const link = getLinkFromTopic(b.title);
            return (
              <Blogs
                key={b.id}
                link={link}
                imageUrl={`blogTopicImg/${b.image}`}
                imageType={mediaType(b.image)}
                topic={b.title}
                timeStamp={b.timeStamp}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
