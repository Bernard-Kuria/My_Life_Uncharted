"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  dropHandler,
  dragHandler,
  dragLeaveHandler,
  onFileChange,
} from "../lib/mediaHooks/mediaInteractions";

import {
  getBlogImgUrl,
  getBlogVideoUrl,
  uploadBlogImage,
  uploadBlogVideo,
  deleteBlogImage,
  deleteBlogVideo,
} from "@services/FirestoreStorage";
import { mediaType } from "@utils/conversions";

export default function MediaEditor({ customBlock, modifyCustom }) {
  const output = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState();
  const [compressing, setCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null); // track last uploaded
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const block = customBlock;

  const type = mediaType(fileName || url || block.data.src || "");

  useEffect(() => {
    setUploadedFileName(block.data.src || null);
  });

  // Prevent default drag/drop on window
  useEffect(() => {
    const handleDrag = (e) => e.preventDefault();
    window.addEventListener("dragover", handleDrag);
    window.addEventListener("drop", handleDrag);
    return () => {
      window.removeEventListener("dragover", handleDrag);
      window.removeEventListener("drop", handleDrag);
    };
  }, []);

  // Fetch Firebase URL for existing content
  useEffect(() => {
    async function fetchUrl() {
      if (!block.data.src) return;
      const currentType = mediaType(block.data.src);
      try {
        if (currentType === "image")
          setUrl(await getBlogImgUrl(block.data.src));
        else if (currentType === "video")
          setUrl(await getBlogVideoUrl(block.data.src));
      } catch (err) {
        console.error("Error fetching topic image URL:", err);
      }
    }
    fetchUrl();
  }, [block.data.src]);

  // Handle upload of a new file
  useEffect(() => {
    async function handleUpload() {
      if (!file) return;

      const currentType = mediaType(file.name);
      if (currentType === "unknown") {
        setError("File type not supported");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let downloadURL = null;

        if (currentType === "image") downloadURL = await uploadBlogImage(file);
        else if (currentType === "video")
          downloadURL = await uploadBlogVideo(file);

        if (!downloadURL) {
          console.log(downloadURL);
          setError("Upload failed");
          return;
        }

        // Update block content when a new file is selected
        modifyCustom({
          customBlockId: customBlock.id,
          data: {
            src: file.name,
            alt: customBlock.data.alt,
            caption: customBlock.data.caption,
          },
        });

        setUrl(downloadURL);
        setUploadedFileName(file.name); // track current uploaded
      } catch (err) {
        console.error(err);
        setError("An error occurred during upload");
      } finally {
        setLoading(false);
      }
    }

    handleUpload();
  }, [file]);

  const handleRefresh = async () => {
    const targetFileName = file?.name || uploadedFileName;
    if (!targetFileName) return; // nothing to delete

    setDeleting(true);
    try {
      const currentType = mediaType(file?.name || uploadedFileName);
      if (currentType === "image") await deleteBlogImage(targetFileName);
      else if (currentType === "video") await deleteBlogVideo(targetFileName);

      modifyCustom(block.id, "");

      // reset state
      setFile(null);
      setFileName("");
      setUrl(undefined);
      setUploadedFileName(null);
    } catch (err) {
      console.error("Error deleting file on refresh:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="border w-full h-[270px] relative">
      {(compressing ||
        (compressionProgress !== null && compressionProgress !== 100)) && (
        <div className="absolute bottom-0 text-sm text-blue-600">
          {`Processing...${
            compressionProgress !== null && compressionProgress
          }%`}
        </div>
      )}
      {loading && (
        <div className="absolute bottom-0 text-sm text-blue-600">
          Uploading...
        </div>
      )}
      {deleting && (
        <div className="absolute bottom-0 text-sm text-red-600">
          Deleting previous/current file...
        </div>
      )}
      {error && (
        <div className="absolute bottom-0 text-sm text-red-500">{error}</div>
      )}

      {file || url ? (
        type === "image" ? (
          <div className="w-full h-[250px] flex text-blue-600 font-medium border-blue-200">
            <img
              src={file instanceof File ? URL.createObjectURL(file) : url}
              alt=""
              className="media"
            />

            <div className="h-fit border border-dashed cursor-pointer relative">
              <FontAwesomeIcon
                icon={["fas", "refresh"]}
                onClick={handleRefresh}
              />
            </div>
          </div>
        ) : type === "video" ? (
          <div className="w-full h-[250px] flex text-blue-600 font-medium border-blue-200">
            <video autoPlay muted controls className="media">
              <source
                src={file instanceof File ? URL.createObjectURL(file) : url}
                type="video/mp4"
              />
            </video>

            <div className="h-fit border border-dashed cursor-pointer relative">
              <FontAwesomeIcon
                icon={["fas", "refresh"]}
                onClick={handleRefresh}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[250px] gap-4 p-4 text-gray-500 text-center">
            <FontAwesomeIcon icon={["fas", "file"]} size="2x" />
            <p className="text-sm font-medium">wrong format: {fileName}</p>
            <p className="text-sm font-medium">
              accepted formats: png, jpg, jpeg, gif, mp4, webm, ogg
            </p>

            <div className="h-fit border border-dashed cursor-pointer relative">
              <FontAwesomeIcon
                icon={["fas", "refresh"]}
                onClick={handleRefresh}
              />
            </div>
          </div>
        )
      ) : (
        <div
          ref={output}
          onDrop={(e) =>
            dropHandler(
              e,
              setFile,
              setFileName,
              setCompressing,
              setCompressionProgress
            )
          }
          onDragOver={(e) => dragHandler(e, output)}
          onDragLeave={(e) => dragLeaveHandler(e, output)}
          onMouseLeave={(e) => dragLeaveHandler(e, output)}
          className="border-2 border-dashed w-full h-[250px] grid items-center"
        >
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) =>
              onFileChange(
                e,
                setFile,
                setFileName,
                setCompressing,
                setCompressionProgress
              )
            }
          />
          <label
            htmlFor="file"
            className="flex flex-col justify-center items-center text-center gap-5 btn-theme-color px-4 py-2 rounded-2.5 cursor-pointer"
          >
            <div className="border rounded-[50%] flex justify-center items-center w-[60px] h-[60px] text-[20px] cursor-pointer">
              <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
            </div>
            <div className="normal-title">
              Drop your{" "}
              {block.type === "custom-1" ? (
                <strong>image/GIF</strong>
              ) : (
                <strong>video</strong>
              )}{" "}
              here
              <div className="normal-text text-(--grey-secondary)">
                or click to browse
              </div>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

export function ImageOutput({ customBlock }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    async function load() {
      if (!customBlock.data.src) return;
      try {
        const imgUrl = await getBlogImgUrl(customBlock.data.src);
        setUrl(imgUrl);
      } catch (err) {
        console.error("Failed to load image URL:", err);
      }
    }
    load();
  }, [customBlock.data.src]);

  return (
    <div key={customBlock.id} className="relative w-full h-[400px]">
      {url ? <img src={url} alt="" className="media" /> : null}
    </div>
  );
}

export function MediaOutput({ customBlock }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    async function load() {
      if (!customBlock.data.src) return;
      try {
        const videoUrl = await getBlogVideoUrl(customBlock.data.src);
        setUrl(videoUrl);
      } catch (err) {
        console.error("Failed to load video URL:", err);
      }
    }
    load();
  }, [customBlock.data.src]);

  return (
    <div key={customBlock.id} className="relative w-full h-[400px]">
      {url && (
        <video autoPlay muted controls className="media">
          <source src={url} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
