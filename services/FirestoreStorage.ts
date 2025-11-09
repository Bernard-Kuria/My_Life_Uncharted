import { app } from "@lib/firebase";

import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

export async function getImgUrl(imageName: string) {
  const topicImgRef = ref(storage, imageName);
  try {
    return await getDownloadURL(topicImgRef);
  } catch (error) {
    console.error("Error fetching topic image URL:", error);
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
