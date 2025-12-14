"use client";

import Loading, { SectionLoading } from "@app/loading";

import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

import BlogsList from "@c/BlogsList";
import DraftList from "@c/DraftList";

import { useDashboard } from "@hooks/useDashboard";
import Link from "@node_modules/next/link";

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
              ) : blogsByTopic[topic.title].length > 0 ? (
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
              ) : (
                <div>
                  {`No blogs for this topic. Click `}
                  <Link
                    href={"/dashboard/new"}
                    className="text-(--secondary-blue)"
                  >
                    here
                  </Link>
                  {` to start adding.`}
                </div>
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
              {draftsByTopic[topic.title].length > 0 ? (
                (draftsByTopic[topic.title] || []).map((blog) => (
                  <div
                    key={blog.id}
                    className="w-full flex justify-between gap-2.5 items-center"
                  >
                    <DraftList blog={blog} />
                    {deletingBlogStatus ? (
                      <SectionLoading loading="loading drafts..." />
                    ) : (
                      <FontAwesomeIcon
                        icon={["fas", "trash"]}
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleDelete(blog.id)}
                      />
                    )}
                  </div>
                ))
              ) : (
                <div>
                  {`No drafts for this topic. Click `}
                  <Link
                    href={"/dashboard/new"}
                    className="text-(--secondary-blue)"
                  >
                    here
                  </Link>
                  {` to start adding.`}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
