"use client";
import { useEffect, useState } from "react";

import { getAllBlogs } from "@services/blogs";

import { getTopicFromLink } from "@utils/conversions";

import { BlogsType } from "@lib/types";

export const useBlogPage = (topicPage: string) => {
  const [blogs, setBlogs] = useState<BlogsType | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  const topic = getTopicFromLink(topicPage);
  const backLink = topicPage;

  useEffect(() => {
    getAllBlogs()
      .then(setBlogs)
      .finally(() => setLoaded(true));
  }, []);

  return { blogs, loaded, topic, backLink };
};
