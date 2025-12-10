"use client";

import Loading from "@app/loading";

import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

import BlogsList from "@c/BlogsList";
import DraftList from "@c/DraftList";

import { useDashboard } from "@hooks/useDashboard";

export default function BlogsSection() {
  const {
    loading,
    topics,
    blogsByTopic,
    draftsByTopic,
    refreshTrigger,
    setRefreshTrigger,
    handleDelete,
    deletingBlogStatus,
  } = useDashboard();

  if (loading) return <Loading loading="Loading topics and blogs..." />;

  return (
    <div className="flex flex-col gap-[30px]">
      {/* BLOGS */}
      {!topics ? (
        <Loading loading="loading topics" />
      ) : (
        topics.map((topic) => (
          <div key={topic.id}>
            <div className="sub-title">{topic.title}</div>

            <div className="grid gap-5">
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

            <div className="grid gap-5">
              {(draftsByTopic[topic.title] || []).map((blog) => (
                <div
                  key={blog.id}
                  className="w-full flex justify-between gap-2.5 items-center"
                >
                  <DraftList blog={blog} />
                  {deletingBlogStatus ? (
                    <div className="relative w-10 h-10 rounded-full">
                      <div className="absolute border-4 border-red rounded-full w-full h-full border-l-transparent animate-[rotate_1s_cubic-bezier(0.15,0.61,0.58,0.4)_infinite]"></div>
                      <div className="absolute border-4 border-red rounded-full w-5 h-5 translate-x-[17.5px] translate-y-[17.5px] border-t-transparent animate-[rotate-reverse_1s_cubic-bezier(0.15,0.61,0.58,0.4)_infinite]"></div>
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
  );
}
