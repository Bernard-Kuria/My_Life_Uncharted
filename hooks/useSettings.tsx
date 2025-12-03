"use client";

import { useState, useRef, useEffect } from "react";

import { BlogTopicsType, Milestone, ObjectType, Topic } from "@lib/types/types";

import {
  convertColonToSlash,
  getWordAfterColon,
  getWordBeforeColon,
  mediaType,
  toCamelCase,
} from "@utils/conversions";

import {
  addTopic,
  deleteTopic,
  getAllTopics,
  updateTopic,
} from "@services/topics";
import {
  deleteBlogTopicImage,
  deleteLandingPageImage,
  getMainImgName,
  getSecondaryBottomImgName,
  getSecondaryTopImgName,
  uploadBlogTopicImage,
  uploadLandingPageImage,
} from "@services/FirestoreStorage";
import { updateMilestone } from "@services/milestones";

const milestones = {
  "Life On Wheels": [
    { title: "Towns Visited", value: "8" },
    { title: "Longest Ride in KM", value: "58" },
    { title: "Punctured Tyres", value: "2" },
    { title: "Accidents", value: "2" },
  ],
  "Startups & Ideas": [
    { title: "Startups I own", value: "2" },
    { title: "Startups I share ownership", value: "3" },
    { title: "Hackathons won", value: "2" },
    { title: "Hackathons participated", value: "7" },
  ],
  "Projects & Tech": [
    { title: "Total projects yet", value: "50" },
    { title: "Award winning projects", value: "3" },
    { title: "Biggest failed attempts", value: "52" },
    { title: "Accidents", value: "30" },
  ],
};

export const useSettings = () => {
  // elements
  const outputRef = useRef<HTMLDivElement>(null);

  //   data
  const [file, setFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>("");
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState<string | null>(null);

  //   statuses
  const [topics, setTopics] = useState<ObjectType | undefined>();
  const [newTopic, setNewTopic] = useState<string>("");
  const [topicModify, setTopicModify] = useState<Topic | undefined>();
  const [modifyTopicStatus, setModifyTopicStatus] = useState<string>("");
  const [landingPageImages, setLandingPageImages] = useState<ObjectType>({});
  const [blogTopics, setBlogTopics] = useState<BlogTopicsType | undefined>();
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mergingTopicAndImage, setMergingTopicAndImage] = useState(false);
  const [refreshTopics, setRefreshTopics] = useState(false);
  const [topicType, setTopicType] = useState<"modify" | "new" | "delete">(
    "modify"
  );
  const [milestoneTopic, setMilestoneTopic] = useState<
    keyof typeof milestones | null
  >(null);
  const [editableMilestones, setEditableMilestones] = useState<Milestone[]>([]);
  const [updateMilestoneStatus, setUpdateMilestoneStatus] =
    useState<string>("");

  const type = mediaType(fileName);

  // useEffect(() => {
  //   console.log(milestoneTopic);
  // }, [milestoneTopic]);

  async function handleTopicUpdate() {
    try {
      if (topicType === "modify") {
        if (!topicModify) {
          setModifyTopicStatus("select the topic to modify");
          return;
        }

        if (!newTopic) {
          setModifyTopicStatus("type in the new name of the topic");
          return;
        }

        setModifyTopicStatus("updating topic");

        await updateTopic({
          id: topicModify?.id,
          title: toCamelCase(newTopic),
        });

        setModifyTopicStatus("");
      } else if (topicType === "new") {
        if (!newTopic) {
          setModifyTopicStatus("type in the new name of the topic");
          return;
        }

        setModifyTopicStatus("updating topic");
        await addTopic(toCamelCase(newTopic));
        setModifyTopicStatus("");
      }
    } catch (error) {
      if (error instanceof Error)
        setModifyTopicStatus(
          "and error has occured during update:" + error.message
        );
    } finally {
      setRefreshTopics((prev) => !prev);
      setNewTopic("");
      setTopicModify(undefined);
    }
  }

  async function handleTopicRemove() {
    try {
      if (topicType === "delete") {
        if (!topicModify) {
          setModifyTopicStatus("select the topic you want to delete");
          return;
        }

        setModifyTopicStatus("deleting topic");
        await deleteTopic(topicModify?.id);

        if (topicModify.image !== "") {
          setModifyTopicStatus("deleting associated image as well");
          await deleteBlogTopicImage(topicModify?.image);
        }

        setModifyTopicStatus("");
      }
    } catch (error) {
      if (error instanceof Error)
        setModifyTopicStatus(
          "and error has occured during delete:" + error.message
        );
    } finally {
      setRefreshTopics((prev) => !prev);
    }
  }

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
    async function fetchData() {
      try {
        const allTopics = await getAllTopics();

        if (allTopics) {
          setBlogTopics(allTopics);

          const topicsMap: ObjectType = allTopics.reduce(
            (acc: ObjectType, topic: Topic) => {
              acc[topic.title] = topic.image;
              return acc;
            },
            {} as ObjectType // Initialize accumulator as an empty object
          );

          setTopics(topicsMap);
        }

        const mainImg = await getMainImgName();
        const secondaryTopImg = await getSecondaryTopImgName();
        const secondaryBottomImg = await getSecondaryBottomImgName();

        setLandingPageImages((prev) => ({
          ...prev,
          ...(mainImg ? { "main-image": mainImg } : {}),
          ...(secondaryTopImg
            ? { "secondary-top-image": secondaryTopImg }
            : {}),
          ...(secondaryBottomImg
            ? { "secondary-bottom-image": secondaryBottomImg }
            : {}),
        }));
      } catch (error) {
        if (error instanceof Error)
          setError(error.message + ":" + "try refreshing the page");
      }
    }

    fetchData();
  }, [refreshTopics]);

  const handleTopicImageUpload = async ({
    imageName,
    id,
  }: {
    imageName: string;
    id?: string;
  }) => {
    // Check if image to change has been selected
    if (!imageName) {
      setError("Please select or reselect the image to replace");
      return;
    }

    // Check if image is uploaded
    if (!file) {
      setError("Please upload file first");
      return;
    }

    // Validate file type
    if (type === "unknown") {
      setError("File type not supported");
      setFile(null);
      return;
    }

    try {
      let newImageName: string | null = null;

      if (id) {
        setUploading(true);
        newImageName = await uploadBlogTopicImage(file);
        setUploading(false);
      } else {
        setUploading(true);
        await uploadLandingPageImage({
          file: file,
          path: getWordBeforeColon(imageName) + "/" + fileName,
        });
        setUploading(false);
      }

      //   Confirm uploaded image
      if (!newImageName && id) {
        setError("Upload failed");
        setUploading(false);
        return;
      }

      const previousImage = id
        ? getWordAfterColon(imageName)
        : convertColonToSlash(imageName);

      // If there exists a previous image and it's not the current image delete the previous image
      if (previousImage && previousImage !== fileName) {
        if (id) {
          setDeleting(true);
          await deleteBlogTopicImage(previousImage);
          setDeleting(false);
        } else {
          setDeleting(true);
          await deleteLandingPageImage(previousImage);
          setDeleting(false);
        }
      }

      //   Set new url for state checking
      setUrl(newImageName);

      //   Confirm topics database has the correct image reference
      if (id && newImageName) {
        setMergingTopicAndImage(true);
        await updateTopic({ id: id, image: newImageName });
        setMergingTopicAndImage(false);
      }

      //   Resetting the image and image section inputs
      setImageName("");
      setFile(null);
      setUrl(null);
      setFileName("");
    } catch (err) {
      if (err instanceof Error)
        setError(`An error occurred during upload: ${err.message}`);
      setFile(null);
    } finally {
      setRefreshTopics((prev) => !prev);
    }
  };

  const handleRemove = async () => {
    if (fileName || file || url) {
      setFile(null);
      setFileName("");
      setUrl(null);
    }
  };

  const handleMilestoneUpdate = async () => {
    try {
      if (!milestoneTopic) {
        setUpdateMilestoneStatus("Please select topic first");
        return;
      }

      if (milestoneTopic) {
        setUpdateMilestoneStatus("updating milestone");
        updateMilestone({
          topic: milestoneTopic,
          milestones: editableMilestones,
        });
        setTimeout(() => {
          setUpdateMilestoneStatus("update successful");
        }, 1000);
        setUpdateMilestoneStatus("");
      }
    } catch (error) {
      if (error instanceof Error) setUpdateMilestoneStatus(error.message);
    } finally {
    }
  };

  return {
    blogTopics,
    imageName,
    setImageName,
    landingPageImages,
    topics,
    refreshTrigger,
    setRefreshTrigger,
    outputRef,
    file,
    fileName,
    url,
    uploading,
    deleting,
    type,
    error,
    setError,
    setFile,
    setFileName,
    setUrl,
    handleRemove,
    handleTopicImageUpload,
    mergingTopicAndImage,
    topicType,
    setTopicType,
    newTopic,
    setNewTopic,
    topicModify,
    setTopicModify,
    modifyTopicStatus,
    setModifyTopicStatus,
    handleTopicUpdate,
    handleTopicRemove,
    milestoneTopic,
    setMilestoneTopic,
    milestones,
    editableMilestones,
    setEditableMilestones,
    handleMilestoneUpdate,
    updateMilestoneStatus,
    setUpdateMilestoneStatus,
  };
};
