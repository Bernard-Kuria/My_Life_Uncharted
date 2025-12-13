import { app } from "@lib/firebase";

import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const storage = getStorage(app);

export async function getImgUrl(imageName: string) {
  const undefinedCheck = imageName.split("/").includes("undefined");

  if (!undefinedCheck) {
    const topicImgRef = ref(storage, imageName);
    try {
      return await getDownloadURL(topicImgRef);
    } catch (error) {
      console.error("Error fetching topic image URL:", error);
      return null;
    }
  }
  return "undefined image name";
}

export async function getImgName(imageName: string) {
  const undefinedCheck = imageName.split("/").includes("undefined");

  if (!undefinedCheck) {
    const topicImgRef = ref(storage, imageName);
    try {
      return topicImgRef.name;
    } catch (error) {
      console.error("Error fetching topic image URL:", error);
      return null;
    }
  }
  return "undefined image name";
}

/**************** Landing Page Images CRUD*****************/

async function getSingleImageFromFolder(folderName: string) {
  try {
    const folderRef = ref(storage, folderName);
    const items = await listAll(folderRef);

    if (items.items.length === 0) {
      console.error(`No files found in folder: ${folderName}`);
      throw new Error(`No files found in folder: ${folderName}`);
    }

    // Take the first (and only) image inside the folder
    const fileRef = items.items[0];
    return await getDownloadURL(fileRef);
  } catch (err) {
    console.error(`Error fetching image from folder ${folderName}:`, err);
    return null;
  }
}

async function getSingleImageNameFromFolder(folderName: string) {
  try {
    const folderRef = ref(storage, folderName);
    const items = await listAll(folderRef);

    if (items.items.length === 0) {
      console.error(`No files found in folder: ${folderName}`);
      return null;
    }

    // Take the first (and only) image inside the folder
    const fileRef = items.items[0];
    return fileRef.name;
  } catch (err) {
    console.error(`Error fetching image from folder ${folderName}:`, err);
    return null;
  }
}

export async function getMainImgUrl() {
  return getSingleImageFromFolder("landingPageImages/main-image");
}

export async function getSecondaryTopImgUrl() {
  return getSingleImageFromFolder("landingPageImages/secondary-top-image");
}

export async function getSecondaryBottomImgUrl() {
  return getSingleImageFromFolder("landingPageImages/secondary-bottom-image");
}
export async function getMainImgName() {
  return getSingleImageNameFromFolder("landingPageImages/main-image");
}

export async function getSecondaryTopImgName() {
  return getSingleImageNameFromFolder("landingPageImages/secondary-top-image");
}

export async function getSecondaryBottomImgName() {
  return getSingleImageNameFromFolder(
    "landingPageImages/secondary-bottom-image"
  );
}

export async function uploadLandingPageImage({
  file,
  path,
}: {
  file: File | Blob;
  path: string;
}): Promise<string | null> {
  try {
    const storageRef = ref(storage, `landingPageImages/${path}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading landing page image:", error);
    return null;
  }
}

export async function deleteLandingPageImage(path: string): Promise<boolean> {
  try {
    const storageRef = ref(storage, `landingPageImages/${path}`);
    await deleteObject(storageRef);
    return true;
  } catch (err) {
    console.error("Error deleting landing page image:", err);
    return false;
  }
}

/**************** Blog Topic Images CRUD *****************/

export async function uploadBlogTopicImage(
  file: File | Blob
): Promise<string | null> {
  try {
    const fileName = (file as File).name;
    console.log(fileName);
    const storageRef = ref(storage, `blogTopicImg/${fileName}`);
    await uploadBytes(storageRef, file);
    return fileName;
  } catch (error) {
    console.error("Error uploading blog topic image:", error);
    return null;
  }
}

export async function deleteBlogTopicImage(
  ImageName: string
): Promise<boolean> {
  try {
    const storageRef = ref(storage, `blogTopicImg/${ImageName}`);
    await deleteObject(storageRef);
    return true;
  } catch (err) {
    console.error("Error deleting blog topic image:", err);
    return false;
  }
}

/**************** Blog Images CRUD *****************/

export async function getBlogImgUrl(imageName: string) {
  const topicImgRef = ref(storage, `blog/images/${imageName}`);
  try {
    return await getDownloadURL(topicImgRef);
  } catch (error) {
    console.error("Error fetching topic image URL:", error);
    return null;
  }
}

export async function getBlogVideoUrl(imageName: string) {
  const topicImgRef = ref(storage, `blog/videos/${imageName}`);
  try {
    return await getDownloadURL(topicImgRef);
  } catch (error) {
    console.error("Error fetching topic video URL:", error);
    return null;
  }
}

export async function uploadBlogImage(
  file: File | Blob
): Promise<string | null> {
  try {
    const storageRef = ref(storage, `blog/images/${(file as File).name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

export async function uploadBlogVideo(
  file: File | Blob
): Promise<string | null> {
  try {
    const storageRef = ref(storage, `blog/videos/${(file as File).name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading video:", error);
    return null;
  }
}

export async function deleteBlogImage(fullUrl: string): Promise<boolean> {
  try {
    const storageRef = ref(storage, `blog/images/${fullUrl}`);
    await deleteObject(storageRef);
    return true;
  } catch (err) {
    console.error("Error deleting file:", err);
    return false;
  }
}

export async function deleteBlogVideo(fullUrl: string): Promise<boolean> {
  try {
    const storageRef = ref(storage, `blog/videos/${fullUrl}`);
    await deleteObject(storageRef);
    return true;
  } catch (err) {
    console.error("Error deleting file:", err);
    return false;
  }
}
