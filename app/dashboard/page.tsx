"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

import SectionTitle from "@c/SectionTitle";
import BlogsList from "@c/BlogsList";
import DraftList from "@c/DraftList";

import { useDashboard } from "@hooks/useDashboard";

export default function Dashboard() {
  const { topics, blogsByTopic, draftsByTopic } = useDashboard();

  return (
    <div className="grid justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <div className="flex gap-[50px] items-center">
          <SectionTitle title="My Blogs" />
          <button className="button">
            <Link href={"/dashboard/new"}>create new blog</Link>
          </button>
        </div>

        {/* BLOGS */}
        {!topics ? (
          <div>Loading topics</div>
        ) : (
          topics.map((topic) => (
            <div key={topic.id}>
              <div className="sub-title">{topic.title}</div>

              <div className="grid gap-[20px]">
                {(blogsByTopic[topic.title] || []).map((blog) => (
                  <div
                    key={blog.id}
                    className="w-full flex justify-between gap-[10px] items-center"
                  >
                    <BlogsList blog={blog} />
                    <FontAwesomeIcon
                      icon={["fas", "trash"]}
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <hr className="border-gray-500" />

        {/* DRAFTS */}
        <div className="sub-title">Drafts</div>
        {!topics ? (
          <div>Loading topics</div>
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
                    <FontAwesomeIcon
                      icon={["fas", "trash"]}
                      className="hover:text-red-500 cursor-pointer"
                    />
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
