import imageCompression from "browser-image-compression";
import { mediaType } from "@utils/conversions";

// Shared compression function
async function compressImageIfNeeded(file) {
  // Only compress images
  if (mediaType(file.name) !== "image") return file;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedBlob = await imageCompression(file, options);

    // Ensure we have a File, not just a Blob
    const compressedFile =
      compressedBlob instanceof File
        ? compressedBlob
        : new File([compressedBlob], file.name, { type: file.type });

    return compressedFile;
  } catch (err) {
    console.error("Compression failed; using original file:", err);
    return file; // fallback
  }
}

export async function dropHandler(e, setFile, setFileName, setCompressing) {
  e.preventDefault();
  for (const item of e.dataTransfer.items) {
    if (item.kind === "file") {
      const fileObj = item.getAsFile();
      if (fileObj) {
        setCompressing(true);
        const compressed = await compressImageIfNeeded(fileObj);
        setCompressing(false);
        setFile(compressed);
        setFileName(compressed.name);
      }
    }
  }
}

export async function onFileChange(e, setFile, setFileName, setCompressing) {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    setCompressing(true);
    const compressed = await compressImageIfNeeded(selectedFile);
    setCompressing(false);
    setFile(compressed);
    setFileName(compressed.name);
  }
}

export function dragHandler(e, output) {
  e.preventDefault();
  if (output.current) {
    output.current.style.borderColor = "blue";
  }
}

export function dragLeaveHandler(e, output) {
  e.preventDefault();
  if (output.current) {
    output.current.style.borderColor = "grey";
  }
}
