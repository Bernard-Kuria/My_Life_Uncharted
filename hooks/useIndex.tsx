"use client";

import { useEffect, useState } from "react";

import { getAllTopics } from "@services/topics";

import { BlogTopicsType } from "@lib/types";

export const useIndex = () => {
  const [topics, setTopics] = useState<BlogTopicsType>([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    }
    fetchTopics();
  }, []);

  return { topics, loading, error };
};
