"use client";
import { useEffect, useState } from "react";

import { getAllBlogs } from "@services/blogs";
import { getAllTopics } from "@services/topics";
import { getImgName, getImgUrl } from "@services/FirestoreStorage";

import {
  cleanUpLink,
  getBlogMatchingPage,
  mediaType,
} from "@utils/conversions";

import { BlogsType, BlogTopicsType, MediaType, Topic } from "@lib/types/types";

export const useBlogTopicPage = (blogTopicPage: string) => {
  const [targetBlogs, setTargetBlogs] = useState<BlogsType | undefined>(
    undefined
  );
  const [loaded, setLoaded] = useState(false);
  const [topicPage, setTopicPage] = useState<Topic | undefined>(undefined);
  const [allTopics, setAllTopics] = useState<BlogTopicsType | undefined>(
    undefined
  );
  const [image, setImage] = useState<string | null>(null);
  const [imageType, setImageType] = useState<MediaType | null>(null);

  const page = cleanUpLink(blogTopicPage);

  useEffect(() => {
    getBlogMatchingPage(page).then(setTopicPage);
  }, [page]);

  useEffect(() => {
    async function fetchData() {
      try {
        // fetch and save topics
        const allTopics = await getAllTopics();
        if (allTopics) setAllTopics(allTopics);

        // fetch and save blogs
        const allBlogs = await getAllBlogs({ topic: topicPage?.title || "" });
        if (allBlogs) setTargetBlogs(allBlogs);

        // fetch and save image
        const imageUrl = await getImgUrl(`blogTopicImg/${topicPage?.image}`);
        if (imageUrl) setImage(imageUrl);

        // fetch image name
        const imageName = await getImgName(`blogTopicImg/${topicPage?.image}`);
        if (imageName) setImageType(mediaType(imageName));
      } catch (error) {
        console.error(error);
      } finally {
        setLoaded(true);
      }
    }
    fetchData();
  }, [topicPage]);

  return { loaded, topicPage, page, targetBlogs, allTopics, image, imageType };
};
