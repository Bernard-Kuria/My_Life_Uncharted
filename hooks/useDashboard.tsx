"use client";

import { useState, useEffect } from "react";

import { getAllBlogs } from "@services/blogs";
import { getAllDrafts } from "@services/drafts";
import { getAllTopics } from "@services/topics";

import { BlogsType, BlogTopicsType, draftsType } from "@lib/types";

export const useDashboard = () => {
  const [topics, setTopics] = useState<BlogTopicsType>();
  const [blogsByTopic, setBlogsByTopic] = useState<Record<string, BlogsType>>(
    {}
  );
  const [draftsByTopic, setDraftsByTopic] = useState<
    Record<string, draftsType>
  >({});

  useEffect(() => {
    async function fetchBlogsAndDrafts() {
      const blogsMap: Record<string, BlogsType> = {};
      const draftsMap: Record<string, draftsType> = {};

      const allTopics = await getAllTopics();
      setTopics(allTopics);

      if (allTopics) {
        for (const topic of allTopics) {
          const blogs = await getAllBlogs({
            topic: topic.title,
          });
          const drafts = await getAllDrafts({
            topic: topic.title,
          });

          blogsMap[topic.title] = blogs;
          draftsMap[topic.title] = drafts;
        }
      }

      setBlogsByTopic(blogsMap);
      setDraftsByTopic(draftsMap);
    }

    fetchBlogsAndDrafts();
  }, []);
  return { topics, blogsByTopic, draftsByTopic };
};
