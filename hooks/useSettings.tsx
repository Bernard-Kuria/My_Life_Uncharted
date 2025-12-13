"use client";

import { useState, useRef, useEffect } from "react";

import {
  BlogTopicsType,
  Milestone,
  Milestones,
  MilestonesMap,
  ObjectType,
  Topic,
} from "@lib/types/types";

import {
  convertColonToSlash,
  getWordAfterColon,
  getWordBeforeColon,
  mediaType,
  toCamelCase,
} from "@utils/conversions";
import { defaultMilestones } from "@utils/constants";

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
import {
  addMilestones,
  deleteMilestones,
  getAllMilestones,
  updateMilestone,
} from "@services/milestones";

export const useSettings = () => {
  // elements
  const outputRef = useRef<HTMLDivElement>(null);

  //   data
  const [topics, setTopics] = useState<ObjectType | undefined>();
  const [newTopic, setNewTopic] = useState<string>("");
  const [topicModify, setTopicModify] = useState<Topic | undefined>();
  const [landingPageImages, setLandingPageImages] = useState<ObjectType>({});
  const [blogTopics, setBlogTopics] = useState<BlogTopicsType | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("select image");
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState<string | null>(null);
  const [milestones, setMilestones] = useState<MilestonesMap>({});
  const [editableMilestones, setEditableMilestones] = useState<Milestone[]>([]);
  const [milestoneTopic, setMilestoneTopic] = useState<
    keyof typeof milestones | null
  >(null);

  //   statuses
  const [modifyTopicStatus, setModifyTopicStatus] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState<number | null>(
    null
  );
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mergingTopicAndImage, setMergingTopicAndImage] = useState(false);
  const [refreshTopics, setRefreshTopics] = useState(false);
  const [topicType, setTopicType] = useState<"modify" | "new" | "delete">(
    "modify"
  );
  const [updateMilestoneStatus, setUpdateMilestoneStatus] =
    useState<string>("");

  const type = mediaType(fileName);

  useEffect(() => {
    async function fetchMilestones() {
      try {
        const milestonesArray = await getAllMilestones();

        const milestonesMap: MilestonesMap = milestonesArray.reduce(
          (acc: MilestonesMap, item: Milestones) => {
            acc[item.topic] = item.milestones;
            return acc;
          },
          {}
        );

        setMilestones(milestonesMap);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }

    fetchMilestones();
  }, []);

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

        setModifyTopicStatus("adding default milestones");
        await addMilestones({
          topic: toCamelCase(newTopic),
          milestones: defaultMilestones,
        });

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

        setModifyTopicStatus("deleting associated milestones");
        await deleteMilestones(topicModify.title);

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
            {} as ObjectType
          );

          setTopics(topicsMap);
        }

        const mainImg = await getMainImgName();
        const secondaryTopImg = await getSecondaryTopImgName();
        const secondaryBottomImg = await getSecondaryBottomImgName();

        setLandingPageImages((prev) => ({
          ...prev,
          ...(mainImg ? { "main-image": mainImg } : { "main-image": "" }),
          ...(secondaryTopImg
            ? { "secondary-top-image": secondaryTopImg }
            : { "secondary-top-image": "" }),
          ...(secondaryBottomImg
            ? { "secondary-bottom-image": secondaryBottomImg }
            : { "secondary-bottom-image": "" }),
        }));
      } catch (error) {
        if (error instanceof Error)
          setError(
            error.message + ":" + "it could be that the image doesn't exist."
          );
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

    // Check if the file is done compressing
    if (compressing) {
      setError("Image is still being processed");
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
      setImageName("select image");
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
        await updateMilestone({
          topic: milestoneTopic,
          milestones: editableMilestones,
        });
        setUpdateMilestoneStatus("update successful");
        setTimeout(() => {
          setUpdateMilestoneStatus("");
        }, 1000);
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
    outputRef,
    file,
    fileName,
    url,
    uploading,
    compressing,
    setCompressing,
    compressionProgress,
    setCompressionProgress,
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
