"use client";

import { getAllTopics, updateTopic } from "@services/topics";

import { BlogTopicsType, Topic } from "@lib/types/types";

import { useState, useRef, useEffect } from "react";
import { mediaType } from "@utils/conversions";
import {
  deleteBlogImage,
  deleteBlogTopicImage,
  uploadBlogTopicImage,
} from "@services/FirestoreStorage";

const sendDataToDatabase = async (mediaUrl: string | null) => {
  console.log("Simulating sending data to database:", mediaUrl);
};

export const useSettings = () => {
  const [topics, setTopics] = useState<Record<string, string> | undefined>();
  const [blogTopics, setBlogTopics] = useState<BlogTopicsType | undefined>();
  const [refreshTopics, setRefreshTopics] = useState(false);
  const [section, setSection] = useState<"blogs" | "settings">("settings");
  const outputRef = useRef<HTMLDivElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>("");
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mergingTopicAndImage, setMergingTopicAndImage] = useState(false);

  const type = mediaType(fileName || url || "");
  type TopicsMapType = Record<string, string>;

  useEffect(() => {
    const handleDrag = (e: Event) => e.preventDefault();
    window.addEventListener("dragover", handleDrag);
    window.addEventListener("drop", handleDrag);
    return () => {
      window.removeEventListener("dragover", handleDrag);
      window.removeEventListener("drop", handleDrag);
    };
  }, []);

  useEffect(() => {
    getAllTopics().then((fetchedTopicsArray: BlogTopicsType) => {
      setBlogTopics(fetchedTopicsArray);

      const topicsMap: TopicsMapType = fetchedTopicsArray.reduce(
        (acc: TopicsMapType, topic: Topic) => {
          acc[topic.title] = topic.image;
          return acc;
        },
        {} as TopicsMapType // Initialize accumulator as an empty object
      );

      setTopics(topicsMap);
    });
  }, [refreshTopics]);

  const handleSettingsImageUpload = async ({
    imageName,
    id,
  }: {
    imageName: string;
    id: string;
  }) => {
    console.log("id:", id);
    console.log("imageName:", imageName);
    console.log("uploaded file name:", fileName);

    if (!id || !imageName) {
      setError("Please select or reselect the image to replace");
      return;
    }

    // Check if image is uploaded
    if (!file) {
      setError("Please upload file first");
      return;
    }

    // Validate file type
    const currentType = mediaType(file.name);
    if (mediaType(file.name) === "unknown") {
      setError("File type not supported");
      setFile(null);
      return;
    }

    setError(null);

    try {
      let newImageName: string | null = null;

      //  If image, upload to images
      if (currentType === "image") {
        setUploading(true);
        newImageName = await uploadBlogTopicImage(file);
        setUploading(false);
      }

      //   Confirm uploaded image
      if (!newImageName) {
        setError("Upload failed");
        setUploading(false);
        return;
      }

      console.log("new image name:", newImageName);

      //   If prev image and new image don't match name, delete prev image
      if (imageName !== fileName) {
        setDeleting(true);
        if (currentType === "image") await deleteBlogTopicImage(imageName);
        setDeleting(false);
      }

      //   Set new url for state checking
      setUrl(newImageName);
      setUploadedFileName(file.name);

      //   Confirm topics database has the correct image reference
      setMergingTopicAndImage(true);
      await updateTopic({ id: id, image: newImageName });
      setMergingTopicAndImage(false);

      //   Resetting the image and image section inputs
      setImageName("");
      setFile(null);
      setUrl("");
      setFileName("");
    } catch (err) {
      if (err instanceof Error)
        setError(`An error occurred during upload: ${err.message}`);
      setFile(null);
    } finally {
      setRefreshTopics((prev) => !prev);
    }
  };

  // Define a localized refresh handler
  const handleRemove = async () => {
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

  const handleSetSection = () => {
    setSection((prev) => (prev === "blogs" ? "settings" : "blogs"));
  };

  return {
    blogTopics,
    imageName,
    setImageName,
    topics,
    refreshTrigger,
    setRefreshTrigger,
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
    setError,
    type,
    setFile,
    setFileName,
    setUrl,
    setUploadedFileName,
    handleRemove,
    handleSettingsImageUpload,
    mergingTopicAndImage,
  };
};
