"use client";

import { usePathname } from "next/navigation";

import Blogs from "@c/Blogs";
import Hero from "@c/Hero";

import { getLinkFromTopic } from "@utils/conversions";

import { useIndex } from "@hooks/useIndex";

export default function Home() {
  const location = usePathname();
  const { topics, loading, error } = useIndex();

  return (
    <div className="grid justify-center mt-[30px] gap-[100px]">
      <Hero />
      <div
        className={`w-[1035px] grid gap-[50px] ${
          location === "/" ? "justify-center text-center" : "text-left"
        } text-(--secondary-blue) section-title hover:border-(--primary-blue)`}
      >
        {location === "/" ? "Browse" : "Other"} Topics
        <div className="flex flex-wrap gap-[20px]">
          {loading ? (
            <p>Loading topics...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            topics.map((b) => {
              const link = getLinkFromTopic(b.title);
              return (
                <Blogs
                  key={b.id}
                  link={link}
                  imageUrl={b.image}
                  topic={b.title}
                  timeStamp={b.timeStamp}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
