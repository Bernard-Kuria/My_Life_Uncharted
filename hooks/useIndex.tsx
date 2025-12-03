"use client";

import {
  getMainImgUrl,
  getSecondaryBottomImgUrl,
  getSecondaryTopImgUrl,
} from "@services/FirestoreStorage";

import { useEffect, useState } from "react";

import { getAllTopics } from "@services/topics";

import { BlogTopicsType } from "@lib/types/types";

export const useIndex = () => {
  const [topics, setTopics] = useState<BlogTopicsType>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [mainImg, setMainImg] = useState<string | undefined>();
  const [secondaryTopImg, setSecondaryTopImg] = useState<string | undefined>();
  const [secondaryBottomImg, setSecondaryBottomImg] = useState<
    string | undefined
  >();
  const [loadingImages, setLoadingImages] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // fetch blog topics
        const data: BlogTopicsType = await getAllTopics();
        setTopics(data);

        // fetch images
        const mainImg: string | null = await getMainImgUrl();
        const secondaryTopImg: string | null = await getSecondaryTopImgUrl();
        const secondaryBottomImg: string | null =
          await getSecondaryBottomImgUrl();

        if (mainImg) setMainImg(mainImg);
        if (secondaryTopImg) setSecondaryTopImg(secondaryTopImg);
        if (secondaryBottomImg) setSecondaryBottomImg(secondaryBottomImg);
      } catch (err) {
        console.error("Failed to fetch topics or images:", err);
        setError("Failed to load topics or images");
      } finally {
        setLoadingTopics(false);
        setLoadingImages(false);
      }
    }

    fetchData();
  }, []);

  return {
    mainImg,
    secondaryTopImg,
    secondaryBottomImg,
    topics,
    loadingTopics,
    loadingImages,
    error,
  };
};
