"use client";

import { getLandingPageImageUrls } from "@services/FirestoreStorage";

import { useEffect, useState } from "react";

import { getAllTopics } from "@services/topics";

import { BlogTopicsType } from "@lib/types";

export const useIndex = () => {
  const [topics, setTopics] = useState<BlogTopicsType>([]);
  const [landingPageImages, setLandingPageImages] = useState<string[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingImages, setLoadingImages] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const data: BlogTopicsType = await getAllTopics();

        setTopics(data);
      } catch (err) {
        console.error("Failed to fetch topics:", err);
        setError("Failed to load topics");
      } finally {
        setLoadingTopics(false);
      }
    }

    fetchTopics();
  }, []);

  useEffect(() => {
    async function fetchImages() {
      try {
        const imageUrls: string[] | null = await getLandingPageImageUrls();

        if (imageUrls) setLandingPageImages(imageUrls || []);
      } catch (err) {
        console.error("Failed to fetch images:", err);
        setError("Failed to load images");
      } finally {
        setLoadingImages(false);
      }
    }

    fetchImages();
  }, []);

  return {
    landingPageImages,
    topics,
    loadingTopics,
    loadingImages,
    error,
  };
};
