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
  return "undefined";
}

/**************** Landing Page Images CRUD*****************/

export async function getLandingPageImageUrls(): Promise<string[]> {
  const landingPageImages: string[] = [];
  try {
    const landingPageImagesRef = await listAll(
      ref(storage, "landingPageImages")
    );

    if (landingPageImagesRef) {
      await Promise.all(
        landingPageImagesRef.items.map(async (imgRef) => {
          const url = await getDownloadURL(imgRef);
          landingPageImages.push(url);
        })
      );
    }

    return landingPageImages;
  } catch (error) {
    console.error("Error listing files:", error);
    return [];
  }
}

export async function uploadLandingPageImage(
  file: File | Blob
): Promise<string | null> {
  try {
    const storageRef = ref(storage, `landingPageImages/${(file as File).name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading landing page image:", error);
    return null;
  }
}

export async function deleteLandingPageImage(
  ImageName: string
): Promise<boolean> {
  try {
    const storageRef = ref(storage, `landingPageImages/${ImageName}`);
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
