"use client";

import { use, useState } from "react";
import Link from "next/link";

import Draftify from "@c/Draftify";
import SectionTitle from "@c/SectionTitle";

import { useCreateModify } from "@hooks/useCreateModify";

export default function CreateModifyBlog({
  params,
}: {
  params: Promise<{ createModify: string }>;
}) {
  const { createModify } = use(params);

  const {
    selectedTopic,
    setSelectedTopic,
    selectedTags,
    setSelectedTags,
    topicList,
    tagList,
    loading,
    error,
    blogContent,
    handleTagChange,
    handleAddBlog,
    handleSaveDraft,
    handleDelete,
    handleUpdateBlog,
    addStatus,
    updateStatus,
    deleteStatus,
  } = useCreateModify(createModify);

  if (loading) return <div>Loading topics and tags...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <SectionTitle
          title={createModify === "new" ? "Create Blog" : "Modify Blog"}
        />
        <Link className="cursor-pointer w-fit" href={"../dashboard"}>
          &larr; Back
        </Link>

        {blogContent && (
          <Draftify
            data={
              createModify === "new"
                ? [
                    {
                      id: "",
                      type: "",
                      content: "",
                    },
                  ]
                : blogContent
            }
          />
        )}

        <div className="flex gap-[100px]">
          {/* Topic Selector */}
          <div className="grid gap-[20px]">
            Select Topic
            <select
              className="border p-2"
              name="topics"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="" disabled>
                Select a topic
              </option>
              {topicList.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Tag Selector */}
          <div className="grid gap-[20px]">
            Select Tag
            <div className="flex gap-[5px] border p-1">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="p-1 rounded-[10px] bg-[linear-gradient(45deg,var(--primary-blue)_0%,var(--background))]"
                >
                  {tag}
                </div>
              ))}
              <select
                name="tags"
                value=""
                onChange={(e) =>
                  handleTagChange(e, selectedTags, setSelectedTags)
                }
              >
                <option value="" disabled>
                  Select a tag
                </option>
                {tagList.map(
                  (tag, idx) =>
                    !selectedTags.includes(tag) && (
                      <option key={idx} value={tag}>
                        {tag}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
        </div>

        {createModify === "new" ? (
          <div className="flex justify-between">
            <button
              className="border p-2 text-(--primary-blue) border-(--primary-blue) hover:bg-(--primary-blue) hover:text-white cursor-pointer"
              onClick={handleAddBlog}
            >
              {addStatus ? "Adding" : "Add New Post"}
            </button>
            <button
              className="border p-2 text-(--secondary-blue) border-(--secondary-blue) hover:bg-(--secondary-blue) hover:text-white cursor-pointer"
              onClick={handleSaveDraft}
            >
              {updateStatus ? "Saving" : "Save as Draft"}
            </button>
            <button
              className="border p-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
              onClick={handleDelete}
            >
              {deleteStatus ? "Deleting" : "Delete Draft"}
            </button>
          </div>
        ) : (
          <div className="flex justify-between">
            <button
              className="border p-2 text-(--primary-blue) border-(--primary-blue) hover:bg-(--primary-blue) hover:text-white cursor-pointer"
              onClick={handleUpdateBlog}
            >
              Update Post
            </button>
            <button
              className="border p-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
              onClick={handleDelete}
            >
              Delete this post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
