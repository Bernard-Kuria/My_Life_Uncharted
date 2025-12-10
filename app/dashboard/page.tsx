"use client";

import Link from "next/link";

import SectionTitle from "@c/SectionTitle";
import Loading from "@app/loading";

import { useDashboard } from "@hooks/useDashboard";
import BlogsSection from "@components/BlogsSection";
import Settings from "@components/Settings";
import { useRequireAuth } from "@hooks/useRequireAuth";

export default function Dashboard() {
  const { section, handleSetSection } = useDashboard();

  const { user, loginLoading, handleLogOut } = useRequireAuth();

  if (loginLoading) return <Loading loading="authenticating..." />;
  if (!user) return null;

  return (
    <div className="flex flex-col justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <div className="text-center lg:text-start grid gap-2.5 lg:flex lg:gap-[50px] items-center px-1">
          <div className="flex-1 lg:flex lg:gap-[50px] items-center">
            <SectionTitle
              title={section === "blogs" ? "My Blogs" : "Settings"}
            />
            {section === "blogs" ? (
              <button className="button">
                <Link href={"/dashboard/new"}>create new blog</Link>
              </button>
            ) : null}
          </div>
          <button className="button" onClick={handleLogOut}>
            logout
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleSetSection}
            className={`${
              section === "blogs"
                ? "bg-(--primary-blue) dark:bg-(--secondary-blue) text-(--secondary-blue)  dark:text-(--primary-blue)"
                : "text-(--primary-blue) dark:text-(--secondary-blue)"
            } border border-(--secondary-blue) rounded-2.5 p-2 h-fit cursor-pointer`}
          >
            Blogs
          </button>

          <button
            onClick={handleSetSection}
            className={`${
              section === "settings"
                ? "bg-(--primary-blue) dark:bg-(--secondary-blue) text-(--secondary-blue)  dark:text-(--primary-blue)"
                : "text-(--primary-blue) dark:text-(--secondary-blue)"
            } border border-(--secondary-blue) rounded-2.5 p-2 h-fit cursor-pointer`}
          >
            Other settings
          </button>
        </div>

        {section === "blogs" ? <BlogsSection /> : <Settings />}
      </div>
    </div>
  );
}
