"use client";

import { deleteBlogMeta, getAllBlogs } from "@services/blogs";
import { getAllDrafts } from "@services/drafts";
import { getAllTopics } from "@services/topics";

import { BlogsType, BlogTopicsType, DraftsType } from "@lib/types/types";
import { deleteBlogContent } from "@services/blogContent";

import { useState, useRef, useEffect } from "react";
import { mediaType } from "@utils/conversions";
import { uploadBlogImage, deleteBlogImage } from "@services/FirestoreStorage";

const sendDataToDatabase = async (mediaUrl: string | null) => {
  console.log("Simulating sending data to database:", mediaUrl);
};

export const useDashboard = () => {
  const [topics, setTopics] = useState<BlogTopicsType>();
  const [blogsByTopic, setBlogsByTopic] = useState<Record<string, BlogsType>>(
    {}
  );
  const [draftsByTopic, setDraftsByTopic] = useState<
    Record<string, DraftsType>
  >({});
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [reloadBlogs, setReloadBlogs] = useState(false);
  const [deletingBlogStatus, setDeletingBlogStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState<"blogs" | "settings">("blogs");
  const outputRef = useRef<HTMLDivElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const type = mediaType(fileName || url || "");

  // Prevent default drag/drop on window (still needed globally)
  useEffect(() => {
    const handleDrag = (e: Event) => e.preventDefault();
    window.addEventListener("dragover", handleDrag);
    window.addEventListener("drop", handleDrag);
    return () => {
      window.removeEventListener("dragover", handleDrag);
      window.removeEventListener("drop", handleDrag);
    };
  }, []);

  // Handle upload logic (remains mostly the same as before)
  useEffect(() => {
    async function performUpload() {
      if (!file) return;
      // ... [upload logic from previous answer goes here]
      const currentType = mediaType(file.name);
      if (currentType === "unknown") {
        setError("File type not supported");
        setFile(null);
        return;
      }

      setUploading(true);
      setError(null);

      try {
        let downloadURL: string | null = null;
        if (currentType === "image") downloadURL = await uploadBlogImage(file);

        if (!downloadURL) {
          setError("Upload failed");
          setUploading(false);
          return;
        }

        if (uploadedFileName && uploadedFileName !== file.name) {
          setDeleting(true);
          if (currentType === "image") await deleteBlogImage(uploadedFileName);
          setDeleting(false);
        }

        setUrl(downloadURL);
        setUploadedFileName(file.name);
        await sendDataToDatabase(downloadURL);
      } catch (err) {
        if (err instanceof Error)
          setError(`An error occurred during upload: ${err.message}`);
        setFile(null);
      } finally {
        setUploading(false);
      }
    }
    performUpload();
  }, [file, uploadedFileName]);

  // Define a localized refresh handler
  const handleRefresh = async () => {
    const targetFileName = uploadedFileName;
    if (!targetFileName) {
      setFile(null);
      setFileName("");
      if (url) {
        setUrl(null);
        await sendDataToDatabase(null);
      }
      return;
    }

    setDeleting(true);
    try {
      const currentType = mediaType(targetFileName || undefined);
      if (currentType === "image") await deleteBlogImage(targetFileName);

      await sendDataToDatabase(null);

      setFile(null);
      setFileName("");
      setUrl(null);
      setUploadedFileName(null);
    } catch (err) {
      console.error("Error deleting file on refresh:", err);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchBlogsAndDrafts() {
      const blogsMap: Record<string, BlogsType> = {};
      const draftsMap: Record<string, DraftsType> = {};

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
      setLoading(false);
    }

    fetchBlogsAndDrafts();
  }, [reloadBlogs]);

  const handleDelete = async (id: string) => {
    setDeletingBlogStatus(true);
    try {
      await deleteBlogMeta(id);
      await deleteBlogContent(id);
    } catch (error) {
      console.error(error);
    } finally {
      setReloadBlogs((prev) => !prev);
      setDeletingBlogStatus(false);
    }
  };

  const handleSetSection = () => {
    setSection((prev) => (prev === "blogs" ? "settings" : "blogs"));
  };

  return {
    topics,
    blogsByTopic,
    draftsByTopic,
    refreshTrigger,
    setRefreshTrigger,
    handleDelete,
    deletingBlogStatus,
    loading,
    section,
    handleSetSection,
    outputRef,
    file,
    fileName,
    url,
    uploadedFileName,
    uploading,
    deleting,
    error,
    type,
    setFile,
    setFileName,
    setUrl,
    setUploadedFileName,
    handleRefresh,
  };
};
