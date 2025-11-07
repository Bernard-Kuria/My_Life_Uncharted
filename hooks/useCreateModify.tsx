"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { blogContent, content, tagsType } from "@lib/types";

import { getAllTags } from "@services/tags";
import {
  addBlogContent,
  deleteBlogContent,
  getBlogContentById,
  updateBlogContent,
} from "@services/blogContent";
import { useDraftify } from "@lib/Draftify/useDraftify";
import { nanoid } from "@node_modules/nanoid";

export function useCreateModify(id: string) {
  const [topicList, setTopicList] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blogContent, setBlogContent] = useState<content | null>(null);
  const { blocksData } = useDraftify([]);
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);
  const [deleteStatus, setDeleteStatus] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) {
          setError("No blog ID provided");
          setLoading(false);
          return;
        }

        const allTags: tagsType = await Promise.resolve(getAllTags());
        const blogContent: blogContent =
          id === "new"
            ? { id: "", blogContent: {} }
            : await getBlogContentById(id);

        const blog = blogContent?.blogContent;

        if (!blog) {
          setError(`Blog with ID ${id} not found`);
          setBlogContent(null);
          return;
        }

        const topicSet = new Set<string>();
        const tagsSet = new Set<string>();

        allTags.map((tagGroup) => {
          topicSet.add(tagGroup.topic);
          tagGroup.tags.map((tag) => tagsSet.add(tag));
        });

        setTopicList(Array.from(topicSet));
        setTagList(Array.from(tagsSet));
        setBlogContent(
          blog ?? [
            {
              id: "",
              type: "",
              content: "",
              tableContent: null,
            },
          ]
        );
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
    const BlogId = nanoid();
    try {
      setAddStatus(true);
      await addBlogContent({ id: BlogId, blogContent: blocksData });
    } catch (error) {
      console.error(error);
    } finally {
      setAddStatus(false);
    }
  };

  const handleSaveDraft = async () => {
    const BlogId = nanoid();
    try {
      setUpdateStatus(true);
      await addBlogContent({ id: BlogId, blogContent: blocksData });
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateStatus(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteStatus(true);
      await deleteBlogContent(id);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteStatus(false);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      setUpdateStatus(true);
      await updateBlogContent({ id: id, blogContent: blocksData });
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateStatus(false);
    }
  };

  return {
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
