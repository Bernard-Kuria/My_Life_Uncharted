"use client";

import { nanoid } from "@node_modules/nanoid";
import { findByType } from "@utils/conversions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Blog, blogContent, blogMeta, content, tagsType } from "@lib/types";
import { useDraftify } from "@lib/Draftify/useDraftify";

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
import { getCurrentDateFormatted } from "@lib/utils";

export function useCreateModify(id: string) {
  // topics and tags
  const [topicList, setTopicList] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // statuses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);
  const [deleteStatus, setDeleteStatus] = useState<boolean>(false);

  // data
  const [blogContent, setBlogContent] = useState<content[] | null>(null);
  const [blogMeta, setBlogMeta] = useState<blogMeta | null>(null);

  // hook
  const { blocksData } = useDraftify([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) {
          setError("No blog ID provided");
          setLoading(false);
          return;
        }

        // fetching blog content and meta

        const blogContent: blogContent =
          id === "new"
            ? { id: "", blogContent: {} }
            : await getBlogContentById(id);

        const blogMeta: Blog =
          id === "new" ? { id: "", blogMeta: {} } : await getBlogMetaById(id);

        const content = blogContent?.blogContent;
        const meta = blogMeta?.blogMeta;

        if (!content || !meta) {
          setError(`Blog with ID ${id} not found`);
          setBlogContent(null);
          return;
        }

        setBlogContent(
          content ?? [
            {
              id: "",
              type: "",
              content: "",
              tableContent: null,
            },
          ]
        );

        setBlogMeta(
          meta ?? {
            image: "",
            topic: "",
            title: "",
            subtitle: "",
            dateCreated: "",
            tags: [""],
            likes: 0,
            comments: 0,
            views: 0,
            minsRead: 0,
          }
        );

        // fetching tags and topics

        const topicSet = new Set<string>();
        const tagsSet = new Set<string>();
        const allTags: tagsType = await Promise.resolve(getAllTags());

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
  }, [id]);

  useEffect(() => {
    if (blogMeta) {
      setSelectedTopic(blogMeta?.topic);
      setSelectedTags(blogMeta?.tags);
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

  const handleAddBlog = async () => {
    console.log(
      typeof blocksData?.find((data: content) => data.type === "image")?.content
    );

    const BlogId = nanoid();

    if (!blocksData || blocksData.length === 0) {
      console.error("No blocks data found, aborting...");
      return;
    }

    try {
      setAddStatus(true);
      await addBlogContent({ id: BlogId, blogContent: blocksData });
      await addBlogMeta({
        id: BlogId,
        blogMeta: {
          image: findByType("image", blocksData) ?? "image placeholder",
          topic: selectedTopic,
          title: findByType("heading", blocksData) ?? "title",
          subtitle: findByType("subheading", blocksData) ?? "subtitle",
          comments: 0,
          dateCreated: getCurrentDateFormatted(),
          likes: 0,
          minsRead: 2,
          tags: selectedTags,
          views: 0,
        },
      });
    } finally {
      setAddStatus(false);
    }
  };

  const handleSaveDraft = async () => {
    const BlogId = nanoid();

    if (!blocksData || blocksData.length === 0) {
      console.error("No blocks data found, aborting...");
      return;
    }

    try {
      setUpdateStatus(true);
      await addBlogContent({ id: BlogId, blogContent: blocksData });
    } finally {
      setUpdateStatus(false);
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

  const handleUpdateBlog = async () => {
    if (!blogMeta || !blocksData || blocksData.length === 0) {
      console.error("No blocks data found, aborting...");
      return;
    }

    try {
      setUpdateStatus(true);
      await updateBlogContent({ id: id, blogContent: blocksData });
      await updateBlogMeta({
        id: id,
        blogMeta: {
          image: findByType("image", blocksData) ?? "image placeholder",
          topic: selectedTopic,
          title: findByType("heading", blocksData) ?? "title",
          subtitle: findByType("subheading", blocksData) ?? "subtitle",
          dateCreated: getCurrentDateFormatted(),
          tags: selectedTags,
        },
      });
    } finally {
      setUpdateStatus(false);
    }
  };

  return {
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
  };
}
