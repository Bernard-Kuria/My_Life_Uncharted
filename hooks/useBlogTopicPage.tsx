"use client";
import { useEffect, useState } from "react";
import { getAllBlogs } from "@services/blogs";

import { getAllTopics } from "@services/topics";

import { cleanUpLink, getTopicMatchingPage } from "@utils/conversions";

import { BlogsType, BlogTopicsType, topic } from "@lib/types";

export const useBlogTopicPage = (blogTopicPage: string) => {
  const [targetBlogs, setTargetBlogs] = useState<BlogsType | undefined>(
    undefined
  );
  const [loaded, setLoaded] = useState(false);
  const [topicPage, setTopicPage] = useState<topic | undefined>(undefined);
  const [allTopics, setAllTopics] = useState<BlogTopicsType | undefined>(
    undefined
  );
  const page = cleanUpLink(blogTopicPage);

  useEffect(() => {
    getTopicMatchingPage(page).then(setTopicPage);
  }, []);

  useEffect(() => {
    getAllBlogs({ topic: topicPage?.title || "" })
      ?.then(setTargetBlogs)
      .finally(() => setLoaded(true));

    getAllTopics().then(setAllTopics);
  }, [topicPage]);

  return { loaded, topicPage, page, targetBlogs, allTopics };
};
