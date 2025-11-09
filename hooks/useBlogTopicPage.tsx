"use client";
import { useEffect, useState } from "react";

import { getAllBlogs } from "@services/blogs";
import { getAllTopics } from "@services/topics";
import { getImgUrl } from "@services/FirestoreStorage";

import { cleanUpLink, getBlogMatchingPage } from "@utils/conversions";

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
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (topicPage)
      getImgUrl(`blogTopicImg/${topicPage?.image}`)
        .then(setImage)
        .then((img) => console.log(img));
  }, [topicPage]);

  const page = cleanUpLink(blogTopicPage);

  useEffect(() => {
    getBlogMatchingPage(page).then(setTopicPage);
  }, [page]);

  useEffect(() => {
    getAllBlogs({ topic: topicPage?.title || "" })
      ?.then(setTargetBlogs)
      .finally(() => setLoaded(true));

    getAllTopics().then(setAllTopics);
  }, [topicPage]);

  return { loaded, topicPage, page, targetBlogs, allTopics, image };
};
