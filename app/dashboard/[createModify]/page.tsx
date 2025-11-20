"use client";

import { use } from "react";
import Link from "next/link";

import Loading from "@app/loading";

import Draftify from "@c/Draftify";
import SectionTitle from "@c/SectionTitle";

import { useCreateModify } from "@hooks/useCreateModify";
import { toCamelCase } from "@utils/conversions";

export default function CreateModifyBlog({
  params,
}: {
  params: Promise<{ createModify: string }>;
}) {
  const { createModify } = use(params);

  const id = createModify !== "new" ? createModify.slice(0, -5) : "new";
  const type = createModify.slice(-5); // either blogs or draft

  const {
    // data
    selectedTopic,
    setSelectedTopic,
    selectedTags,
    setSelectedTags,
    topicList,
    tagList,
    blogContent,

    // handle functions
    handleTagChange,
    handleAddBlog,
    handleAddDraft,
    handleDelete,
    handleUpdateBlog,
    handleUpdateDraft,

    // statuses
    loading,
    error,
    topicStatus,
    setTopicStatus,
    tagStatus,
    setTagStatus,
    addBlogStatus,
    addDraftStatus,
    updateBlogStatus,
    updateDraftStatus,
    deleteStatus,

    // hook
    draftify,
  } = useCreateModify(id, type);

  if (loading)
    return <Loading loading="loading tags, topics and blog content" />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid justify-center">
      <div className="page-layout flex flex-col gap-[30px]">
        <SectionTitle
          title={
            id === "new"
              ? "Create Blog"
              : `Modify ${type === "blogs" ? "Blog" : "Draft"}`
          }
        />
        <Link className="cursor-pointer w-fit" href={"../dashboard"}>
          &larr; Back
        </Link>

        {blogContent && <Draftify draftify={draftify} />}

        <div className="flex gap-[100px]">
          {/* Topic Selector */}
          <div className="grid gap-[20px]">
            Select Topic{" "}
            <span className="text-sm text-red-500">
              {topicStatus === false && "*required!*"}
            </span>
            <select
              className="border p-2"
              name="topics"
              value={selectedTopic}
              required
              onChange={(e) => {
                setTopicStatus(e.target.value !== "" ? true : false);
                setSelectedTopic(e.target.value);
              }}
            >
              <option value="">Select a topic</option>
              {topicList.map((t, idx) => (
                <option key={idx} value={t}>
                  {toCamelCase(t)}
                </option>
              ))}
            </select>
          </div>

          {/* Tag Selector */}
          <div className="grid gap-[20px]">
            Select Tag{" "}
            <span className="text-sm text-red-500">
              {tagStatus === false && "*atleast one tag is required!*"}
            </span>
            <div className="flex gap-[5px] border p-1">
              {selectedTags &&
                selectedTags.length > 0 &&
                selectedTags.map((tag) => (
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
                onChange={(e) => {
                  setTagStatus(e.target.value !== "" ? true : false);
                  handleTagChange(e, selectedTags, setSelectedTags);
                }}
              >
                <option value="" disabled>
                  Select a tag
                </option>
                {tagList && tagList.length > 0
                  ? tagList.map(
                      (tag, idx) =>
                        selectedTags &&
                        !selectedTags.includes(tag) && (
                          <option key={idx} value={tag}>
                            {tag}
                          </option>
                        )
                    )
                  : null}
              </select>
            </div>
          </div>
        </div>

        {createModify === "new" ? (
          <div className="flex justify-between">
            <button
              className="border p-2 text-(--primary-blue) border-(--primary-blue) hover:bg-(--primary-blue) hover:text-white cursor-pointer"
              onClick={() => {
                if (topicStatus && tagStatus) {
                  return handleAddBlog();
                } else {
                  setTopicStatus((prev) => (prev === true ? true : false));
                  setTagStatus((prev) => (prev === true ? true : false));
                }
              }}
            >
              {addBlogStatus ? "Adding" : "Add New Post"}
            </button>
            <button
              className="border p-2 text-(--secondary-blue) border-(--secondary-blue) hover:bg-(--secondary-blue) hover:text-white cursor-pointer"
              onClick={() => {
                if (topicStatus && tagStatus) {
                  return handleAddDraft();
                } else {
                  setTopicStatus((prev) => (prev === true ? true : false));
                  setTagStatus((prev) => (prev === true ? true : false));
                }
              }}
            >
              {addDraftStatus ? "Saving" : "Save as Draft"}
            </button>
            <Link
              href={"/dashboard"}
              className="border p-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
            >
              ignore this draft
            </Link>
          </div>
        ) : (
          <div className="flex justify-between">
            {type === "blogs" ? (
              <button
                className="border p-2 text-(--primary-blue) border-(--primary-blue) hover:bg-(--primary-blue) hover:text-white cursor-pointer"
                onClick={handleUpdateBlog}
              >
                {updateBlogStatus ? "Updating" : "Update Post"}
              </button>
            ) : (
              <button
                className="border p-2 text-(--primary-blue) border-(--primary-blue) hover:bg-(--primary-blue) hover:text-white cursor-pointer"
                onClick={handleUpdateDraft}
              >
                {updateDraftStatus ? "Updating" : "Update Draft"}
              </button>
            )}
            <button
              className="border p-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
              onClick={handleDelete}
            >
              {deleteStatus ? "Deleting" : "Delete this post"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
