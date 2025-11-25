"use client";

import Link from "next/link";

import Loading from "@app/loading";

import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

import SectionTitle from "@c/SectionTitle";
import BlogsList from "@c/BlogsList";
import DraftList from "@c/DraftList";

import { useDashboard } from "@hooks/useDashboard";

export default function Dashboard() {
  const {
    topics,
    blogsByTopic,
    draftsByTopic,
    refreshTrigger,
    setRefreshTrigger,
    handleDelete,
    loading,
    deletingBlogStatus,
  } = useDashboard();

  if (loading) return <Loading loading="Loading topics and blogs..." />;

  return (
    <div className="flex flex-col justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <div className="text-center lg:text-start grid lg:flex gap-[10px] lg:gap-[50px] items-center">
          <SectionTitle title="My Blogs" />
          <button className="button">
            <Link href={"/dashboard/new"}>create new blog</Link>
          </button>
        </div>

        {/* BLOGS */}
        {!topics ? (
          <Loading loading="loading topics" />
        ) : (
          topics.map((topic) => (
            <div key={topic.id}>
              <div className="sub-title">{topic.title}</div>

              <div className="grid gap-[20px]">
                {!blogsByTopic ? (
                  <Loading loading="loading meta data" />
                ) : (
                  (blogsByTopic[topic.title] || []).map((blog) => (
                    <div
                      key={blog.id}
                      className="w-full flex justify-between gap-[5px] items-center"
                    >
                      <BlogsList
                        blog={blog}
                        refreshTrigger={refreshTrigger}
                        setRefreshTrigger={setRefreshTrigger}
                      />
                      <FontAwesomeIcon
                        icon={["fas", "trash"]}
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleDelete(blog.id)}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}

        <hr className="border-gray-500" />

        {/* DRAFTS */}
        <div className="sub-title">Drafts</div>
        {!topics ? (
          <div className="loading topics"></div>
        ) : (
          topics.map((topic) => (
            <div key={topic.id}>
              <div className="sub-title">{topic.title}</div>

              <div className="grid gap-[20px]">
                {(draftsByTopic[topic.title] || []).map((blog) => (
                  <div
                    key={blog.id}
                    className="w-full flex justify-between gap-[10px] items-center"
                  >
                    <DraftList blog={blog} />
                    {deletingBlogStatus ? (
                      <div className="relative w-[40px] h-[40px] rounded-full">
                        <div className="absolute border-4 border-red rounded-full w-full h-full border-l-transparent animate-[rotate_1s_cubic-bezier(0.15,0.61,0.58,0.4)_infinite]"></div>
                        <div className="absolute border-4 border-red rounded-full w-[20px] h-[20px] translate-x-[17.5px] translate-y-[17.5px] border-t-transparent animate-[rotate-reverse_1s_cubic-bezier(0.15,0.61,0.58,0.4)_infinite]"></div>
                      </div>
                    ) : (
                      <FontAwesomeIcon
                        icon={["fas", "trash"]}
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleDelete(blog.id)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
