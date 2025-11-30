"use client";

import Link from "next/link";

import SectionTitle from "@c/SectionTitle";

import { useDashboard } from "@hooks/useDashboard";
import BlogsSection from "@components/BlogsSection";
import Settings from "@components/Settings";

export default function Dashboard() {
  const { section, handleSetSection } = useDashboard();

  return (
    <div className="flex flex-col justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <div className="text-center lg:text-start grid lg:flex gap-[10px] lg:gap-[50px] items-center">
          <SectionTitle title={section === "blogs" ? "My Blogs" : "Settings"} />
          <button className="button">
            <Link href={"/dashboard/new"}>create new blog</Link>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-[10px]">
          <button
            onClick={handleSetSection}
            className={`${
              section === "blogs"
                ? "bg-(--primary-blue) dark:bg-(--secondary-blue) text-(--secondary-blue)  dark:text-(--primary-blue)"
                : "text-(--primary-blue) dark:text-(--secondary-blue)"
            } border border-(--secondary-blue) rounded-[10px] p-2 h-fit cursor-pointer`}
          >
            Blogs
          </button>

          <button
            onClick={handleSetSection}
            className={`${
              section === "settings"
                ? "bg-(--primary-blue) dark:bg-(--secondary-blue) text-(--secondary-blue)  dark:text-(--primary-blue)"
                : "text-(--primary-blue) dark:text-(--secondary-blue)"
            } border border-(--secondary-blue) rounded-[10px] p-2 h-fit cursor-pointer`}
          >
            Other settings
          </button>
        </div>

        {section === "blogs" ? <BlogsSection /> : <Settings />}
      </div>
    </div>
  );
}
