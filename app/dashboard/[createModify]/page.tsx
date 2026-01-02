"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Loading from "@app/loading";

import SectionTitle from "@c/SectionTitle";

import { useCreateModify } from "@hooks/useCreateModify";
import { toCamelCase } from "@utils/conversions";
import DraftifyReact from "@node_modules/draftify-react";
import "draftify-react/styles.css";

export default function CreateModifyBlog({
  params,
}: {
  params: Promise<{ createModify: string }>;
}) {
  const { createModify } = use(params);
  const router = useRouter();

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

    // handle functions
    handleTagChange,
    handleAddBlog,
    handleAddDraft,
    handleDelete,
    handleDeleteDraft,
    handleUpdateBlog,
    handleUpdateDraft,
    handleConvertDraftToBlog,

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
    blocksData,
    modifyBlocks,
  } = useCreateModify(id, type);

  if (loading)
    return <Loading loading="loading tags, topics and blog content" />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="md:flex md:flex-col md:justify-center">
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

        {blocksData && (
          <DraftifyReact blocksData={blocksData} modifyBlocks={modifyBlocks} />
        )}

        <div className="grid md:flex gap-5 md:gap-[100px]">
          {/* Topic Selector */}
          <div className="grid gap-2.5">
            Select Topic{" "}
            <span className="text-sm text-red-500">
              {topicStatus === false && "*required!*"}
            </span>
            <select
              className="border p-2 rounded-[10px]"
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
          <div className="grid gap-2.5">
            Select Tag{" "}
            <span className="text-sm text-red-500">
              {tagStatus === false && "*atleast one tag is required!*"}
            </span>
            <div className="flex gap-[5px] border p-1 rounded-[10px]">
              {selectedTags &&
                selectedTags.length > 0 &&
                selectedTags.map((tag) => (
                  <div
                    key={tag}
                    className="p-1 rounded-[10px] border border-(--primary-blue) text-(--primary-blue) dark:border-(--secondary-blue) dark:text-(--secondary-blue)"
                  >
                    {tag}
                  </div>
                ))}
              <select
                name="tags"
                value=""
                className="w-full"
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
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <button
              className="create-modify-btn text-(--primary-blue) border-(--primary-blue) hover:bg-(--primary-blue)"
              onClick={() => {
                if (topicStatus && tagStatus) {
                  handleAddBlog();
                  router.push("/dashboard");
                } else {
                  setTopicStatus((prev) => (prev === true ? true : false));
                  setTagStatus((prev) => (prev === true ? true : false));
                }
              }}
            >
              {addBlogStatus ? "Adding" : "Add New Blog"}
            </button>
            <button
              className="create-modify-btn text-(--secondary-blue) border-(--secondary-blue) hover:bg-(--secondary-blue)"
              onClick={() => {
                if (topicStatus && tagStatus) {
                  handleAddDraft();
                  router.push("/dashboard");
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
              className="create-modify-btn text-red-500 border-red-500 hover:bg-red-500"
            >
              ignore this draft
            </Link>
          </div>
        ) : (
          <div className="flex md:flex-row justify-between gap-2">
            {type === "blogs" ? (
              <button
                className="create-modify-btn text-(--primary-blue) border-(--primary-blue) hover:bg-(--primary-blue) dark:border-(--secondary-blue) dark:text-(--secondary-blue)"
                onClick={() => {
                  handleUpdateBlog();
                  router.push("/dashboard");
                }}
              >
                {updateBlogStatus ? "Updating" : "Update Blog"}
              </button>
            ) : (
              <button
                className="create-modify-btn text-(--primary-blue) border-(--primary-blue) hover:bg-(--primary-blue) dark:border-(--secondary-blue) dark:text-(--secondary-blue)"
                onClick={() => {
                  handleUpdateDraft();
                  router.push("/dashboard");
                }}
              >
                {updateDraftStatus ? "Updating" : "Update Draft"}
              </button>
            )}
            <button
              className="create-modify-btn text-(--primary-blue) border-(--primary-blue) hover:bg-(--primary-blue) dark:border-(--secondary-blue) dark:text-(--secondary-blue)"
              onClick={() => {
                if (topicStatus && tagStatus) {
                  handleAddBlog();
                  handleConvertDraftToBlog();
                  router.push("/dashboard");
                } else {
                  setTopicStatus((prev) => (prev === true ? true : false));
                  setTagStatus((prev) => (prev === true ? true : false));
                }
              }}
            >
              {addBlogStatus ? "Adding" : "Save as New Blog"}
            </button>
            {type === "blogs" ? (
              <button
                className="create-modify-btn text-red-500 border-red-500 hover:bg-red-500"
                onClick={() => {
                  handleDelete();
                  router.push("/dashboard");
                }}
              >
                {deleteStatus ? "Deleting" : "Delete this Blog"}
              </button>
            ) : (
              <button
                className="create-modify-btn text-red-500 border-red-500 hover:bg-red-500"
                onClick={() => {
                  handleDeleteDraft();
                  router.push("/dashboard");
                }}
              >
                {deleteStatus ? "Deleting" : "Delete this Draft"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
