"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { nanoid } from "nanoid";

import { toCamelCase } from "@utils/conversions";
import { defaultMeta } from "@utils/constants";

import type { DraftifyBlock } from "draftify-react";

import {
  AnyMeta,
  Blog,
  BlogContent,
  BlogOrDraft,
  Draft,
  TagsType,
} from "@lib/types/types";
import { getCurrentDateFormatted } from "@lib/utils";

import { getAllTags } from "@services/tags";
import {
  addBlogContent,
  deleteBlogContent,
  getBlogContentById,
  updateBlogContent,
} from "@services/blogContent";
import {
  addBlogMeta,
  deleteBlogMeta,
  getBlogMetaById,
  updateBlogMeta,
} from "@services/blogs";
import {
  addDraftMeta,
  deleteDraftMeta,
  getDraftMetaById,
  updateDraftMeta,
} from "@services/drafts";
import { deleteComments } from "@services/comments";
import { DraftifyDocument } from "@node_modules/draftify/dist";

export function useCreateModify(id: string, type: string) {
  // data
  const [draftifyDoc, modifyDoc] = useState<DraftifyDocument>({
    version: "0.0.2",
    blocks: [],
  });
  const [blocksData, modifyBlocks] = useState<DraftifyBlock[]>([]);
  const [blogMeta, setBlogMeta] = useState<AnyMeta | null>(null);

  // topics and tags
  const [topicList, setTopicList] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // statuses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addBlogStatus, setAddBlogStatus] = useState(false);
  const [addDraftStatus, setAddDraftStatus] = useState(false);
  const [updateBlogStatus, setUpdateBlogStatus] = useState(false);
  const [updateDraftStatus, setUpdateDraftStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [topicStatus, setTopicStatus] = useState<boolean | undefined>(
    undefined,
  );
  const [tagStatus, setTagStatus] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) {
          setError("No blog ID provided");
          setLoading(false);
          return;
        }

        // fetching blog content and meta

        const blogContentRes: BlogContent =
          id === "new"
            ? { id: "", blogContent: [] }
            : await getBlogContentById(id);

        const blogOrDraft: BlogOrDraft =
          id === "new"
            ? { type: "blogs", id: "", blogMeta: defaultMeta }
            : type === "blogs"
              ? ((await getBlogMetaById(id)) as Blog)
              : ((await getDraftMetaById(id)) as Draft);

        let meta: AnyMeta;

        if (blogOrDraft.type === "blogs") {
          meta = blogOrDraft.blogMeta;
        } else {
          meta = blogOrDraft.draftMeta;
        }

        const content = blogContentRes?.blogContent;

        if (!content || !meta) {
          setError(`Blog with ID ${id} not found`);
          return;
        }

        modifyDoc((prev) => {
          return { ...prev, blocks: content ?? [] };
        });

        setBlogMeta(meta ?? defaultMeta);

        // fetching tags and topics

        const topicSet = new Set<string>();
        const tagsSet = new Set<string>();
        const allTags: TagsType = await Promise.resolve(getAllTags());

        allTags.map((tagGroup) => {
          topicSet.add(tagGroup.topic);
          tagGroup.tags.map((tag) => tagsSet.add(tag));
        });

        setTopicList(Array.from(topicSet));
        setTagList(Array.from(tagsSet));
      } catch (err) {
        console.error(err);
        console.error(
          "Error fetching tags or blog:",
          err instanceof Error ? err.message : err,
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, type]);

  useEffect(() => {
    if (blogMeta) {
      setSelectedTopic(blogMeta?.topic);
      setSelectedTags(blogMeta?.tags ?? []);
    }
  }, [blogMeta]);

  const handleTagChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    selectedTags: string[],
    setSelectedTags: Dispatch<SetStateAction<string[]>>,
  ) => {
    const newTag = e.target.value;
    if (!selectedTags.includes(newTag)) {
      setSelectedTags((prevTags) => [...prevTags, newTag]);
    }
  };

  // Called when adding or updating blogs or drafts

  const updates = () => {
    const blocks = draftifyDoc.blocks ?? [];

    return {
      image:
        blocks.find((b) => b.type === "image" || b.type === "custom-1")?.data
          .src ?? "image placeholder",
      video:
        blocks.find((b) => b.type === "video" || b.type === "custom-2")?.data
          .src ?? "video placeholder",
      topic: toCamelCase(selectedTopic),
      title: blocks.find((b) => b.type === "heading")?.data.text ?? "title",
      subtitle:
        blocks.find((b) => b.type === "subheading")?.data.text ?? "subtitle",
      dateCreated: getCurrentDateFormatted(),
      tags: selectedTags,
    };
  };

  // Handling blogs

  const handleAddBlog = async () => {
    const BlogId = nanoid();

    if (!draftifyDoc.blocks) {
      console.error("No blog content found, aborting...");
      return;
    }

    try {
      setAddBlogStatus(true);
      await addBlogContent({ id: BlogId, blogContent: draftifyDoc.blocks });
      await addBlogMeta({
        type: "blogs",
        id: BlogId,
        blogMeta: {
          ...updates(),
          minsRead: 2,
          likes: 0,
          comments: 0,
          views: 0,
        },
      });
    } finally {
      setAddBlogStatus(false);
    }
  };

  const handleUpdateBlog = async () => {
    if (!blogMeta || !draftifyDoc.blocks) {
      console.error("No blog content found, aborting...");
      return;
    }

    try {
      setUpdateBlogStatus(true);
      await updateBlogContent({ id: id, blogContent: draftifyDoc.blocks });
      await updateBlogMeta({
        id: id,
        blogMeta: updates(),
      });
    } finally {
      setUpdateBlogStatus(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteStatus(true);
      await deleteBlogMeta(id);
      await deleteBlogContent(id);
      await deleteComments(id);
    } finally {
      setDeleteStatus(false);
    }
  };

  // handling drafts

  const handleAddDraft = async () => {
    const BlogId = nanoid();

    if (!draftifyDoc.blocks) {
      console.error("No blog content found, aborting...");
      return;
    }

    try {
      setAddDraftStatus(true);
      await addBlogContent({ id: BlogId, blogContent: draftifyDoc.blocks });
      await addDraftMeta({
        type: "draft",
        id: BlogId,
        draftMeta: updates(),
      });
    } finally {
      setAddDraftStatus(false);
    }
  };

  const handleUpdateDraft = async () => {
    if (!blogMeta || !draftifyDoc.blocks) {
      console.error("No blog content found, aborting...");
      return;
    }

    try {
      setUpdateDraftStatus(true);
      await updateBlogContent({ id: id, blogContent: draftifyDoc.blocks });
      await updateDraftMeta({
        id: id,
        draftMeta: updates(),
      });
    } finally {
      setUpdateDraftStatus(false);
    }
  };

  const handleConvertDraftToBlog = async () => {
    if (!draftifyDoc.blocks) {
      console.error("No blog content found, aborting...");
      return;
    }

    try {
      setAddBlogStatus(true);
      await addBlogMeta({
        type: "blogs",
        id: id,
        blogMeta: {
          ...updates(),
          minsRead: 2,
          likes: 0,
          comments: 0,
          views: 0,
        },
      });
      await deleteDraftMeta(id);
    } finally {
      setAddBlogStatus(false);
    }
  };

  const handleDeleteDraft = async () => {
    try {
      setDeleteStatus(true);
      await deleteDraftMeta(id);
      await deleteBlogContent(id);
    } finally {
      setDeleteStatus(false);
    }
  };

  return {
    draftifyDoc,
    modifyDoc,
    blocksData,
    modifyBlocks,
    selectedTopic,
    setSelectedTopic,
    topicStatus,
    setTopicStatus,
    selectedTags,
    setSelectedTags,
    tagStatus,
    setTagStatus,
    topicList,
    tagList,
    loading,
    error,
    handleTagChange,
    handleAddBlog,
    handleAddDraft,
    handleDelete,
    handleDeleteDraft,
    handleUpdateBlog,
    handleConvertDraftToBlog,
    addBlogStatus,
    addDraftStatus,
    updateBlogStatus,
    updateDraftStatus,
    deleteStatus,
    handleUpdateDraft,
  };
}
