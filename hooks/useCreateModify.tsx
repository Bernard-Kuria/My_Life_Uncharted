"use client";

import { nanoid } from "@node_modules/nanoid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { findByType } from "@utils/conversions";
import { defaultBlogContent, defaultMeta } from "@utils/constants";

import {
  AnyMeta,
  Blog,
  BlogContent,
  BlogOrDraft,
  Content,
  Draft,
  TagsType,
} from "@lib/types";
import { useDraftify } from "@lib/Draftify/useDraftify";
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
  getDraftMetaById,
  updateDraftMeta,
} from "@services/drafts";

export function useCreateModify(id: string, type: string) {
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
    undefined
  );
  const [tagStatus, setTagStatus] = useState<boolean | undefined>(undefined);

  // data
  const [blogContent, setBlogContent] = useState<Content[] | null>(null);
  const [blogMeta, setBlogMeta] = useState<AnyMeta | null>(null);

  // hook
  const draftify = useDraftify(blogContent ?? [], setBlogContent);

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
            ? { id: "", blogContent: defaultBlogContent }
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
          setBlogContent(null);
          return;
        }

        setBlogContent(content ?? defaultBlogContent);
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
          err instanceof Error ? err.message : err
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
    setSelectedTags: Dispatch<SetStateAction<string[]>>
  ) => {
    const newTag = e.target.value;
    if (!selectedTags.includes(newTag)) {
      setSelectedTags((prevTags) => [...prevTags, newTag]);
    }
  };

  // Called when adding or updating blogs or drafts

  const updates = () => {
    const blocks = blogContent ?? defaultBlogContent;
    return {
      image: (findByType("image", blocks) as string) ?? "image placeholder",
      topic: selectedTopic,
      title: (findByType("heading", blocks) as string) ?? "title",
      subtitle: (findByType("subheading", blocks) as string) ?? "subtitle",
      dateCreated: getCurrentDateFormatted(),
      tags: selectedTags,
    };
  };

  // Handling blogs

  const handleAddBlog = async () => {
    const BlogId = nanoid();

    if (!blogContent) {
      console.error("No blog content found, aborting...");
      return;
    }

    try {
      setAddBlogStatus(true);
      await addBlogContent({ id: BlogId, blogContent: blogContent });
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
    if (!blogMeta || !blogContent) {
      console.error("No blog content found, aborting...");
      return;
    }

    try {
      setUpdateBlogStatus(true);
      await updateBlogContent({ id: id, blogContent: blogContent });
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
    } finally {
      setDeleteStatus(false);
    }
  };

  // handling drafts

  const handleAddDraft = async () => {
    const BlogId = nanoid();

    if (!blogContent) {
      console.error("No blog content found, aborting...");
      return;
    }

    try {
      setAddDraftStatus(true);
      await addBlogContent({ id: BlogId, blogContent: blogContent });
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
    if (!blogMeta || !blogContent) {
      console.error("No blog content found, aborting...");
      return;
    }

    try {
      setUpdateDraftStatus(true);
      await updateBlogContent({ id: id, blogContent: blogContent });
      await updateDraftMeta({
        id: id,
        draftMeta: updates(),
      });
    } finally {
      setUpdateDraftStatus(false);
    }
  };

  return {
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
    blogContent,
    handleTagChange,
    handleAddBlog,
    handleAddDraft,
    handleDelete,
    handleUpdateBlog,
    addBlogStatus,
    addDraftStatus,
    updateBlogStatus,
    updateDraftStatus,
    deleteStatus,
    handleUpdateDraft,
    draftify,
  };
}
