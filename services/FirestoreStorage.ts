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

export async function getLandingPageImageUrls(): Promise<string[]> {
  const landingPageImages: string[] = [];
  try {
    const landingPageImagesRef = await listAll(
      ref(storage, "landingPageImages")
    );

    if (landingPageImagesRef) {
      await Promise.all(
        landingPageImagesRef.items.map(async (imgRef) => {
          console.log(imgRef);
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

/**
 * Uploads an image to Firebase Storage and returns its download URL.
 * @param file - The File or Blob to upload.
 * @param folderPath - The path in storage where the image should be saved.
 * @returns Promise<string | null> - The image's download URL or null if failed.
 */
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
