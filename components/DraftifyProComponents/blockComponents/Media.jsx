"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  dropHandler,
  dragHandler,
  dragLeaveHandler,
  onFileChange,
} from "../../../lib/Draftify/mediaHooks/mediaInteractions";

import {
  getBlogImgUrl,
  getBlogVideoUrl,
  uploadBlogImage,
  uploadBlogVideo,
  deleteBlogImage,
  deleteBlogVideo,
} from "@services/FirestoreStorage";
import { mediaType } from "@utils/conversions";

export default function MediaEditor({ block, onChange }) {
  const output = useRef(null);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState();
  const [uploadedFileName, setUploadedFileName] = useState(null); // track last uploaded
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const type = mediaType(fileName || url || block.content || "");

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

  // Update block content when a new file is selected
  useEffect(() => {
    if (file) {
      onChange(block.id, file.name);
    }
  }, [file]);

  // Fetch Firebase URL for existing content
  useEffect(() => {
    async function fetchUrl() {
      if (!block.content) return;
      const currentType = mediaType(block.content);
      try {
        if (currentType === "image") setUrl(await getBlogImgUrl(block.content));
        else if (currentType === "video")
          setUrl(await getBlogVideoUrl(block.content));
      } catch (err) {
        console.error("Error fetching topic image URL:", err);
      }
    }
    fetchUrl();
  }, [block.content]);

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

        // Delete previous uploaded file if exists
        if (uploadedFileName && uploadedFileName !== file.name) {
          setDeleting(true);
          if (currentType === "image") await deleteBlogImage(uploadedFileName);
          else if (currentType === "video")
            await deleteBlogVideo(uploadedFileName);
          setDeleting(false);
        }

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

  return (
    <div className="border w-full h-[250px] relative">
      {loading && (
        <div className="absolute top-2 right-2 text-sm text-blue-600">
          Uploading...
        </div>
      )}
      {deleting && (
        <div className="absolute top-2 left-2 text-sm text-red-600">
          Deleting previous file...
        </div>
      )}
      {error && (
        <div className="absolute bottom-2 left-2 text-sm text-red-500">
          {error}
        </div>
      )}

      {file || url ? (
        type === "image" ? (
          <div className="w-full h-[250px] flex text-blue-600 font-medium border-blue-200">
            <img
              src={file instanceof File ? URL.createObjectURL(file) : url}
              alt=""
              className="media"
            />
            <RefreshButton
              file={file}
              url={url}
              uploadedFileName={uploadedFileName}
              setFile={setFile}
              setFileName={setFileName}
              setUrl={setUrl}
              setUploadedFileName={setUploadedFileName}
            />
          </div>
        ) : type === "video" ? (
          <div className="w-full h-[250px] flex text-blue-600 font-medium border-blue-200">
            <video autoPlay muted controls className="media">
              <source
                src={file instanceof File ? URL.createObjectURL(file) : url}
                type="video/mp4"
              />
            </video>
            <RefreshButton
              file={file}
              url={url}
              uploadedFileName={uploadedFileName}
              setFile={setFile}
              setFileName={setFileName}
              setUrl={setUrl}
              setUploadedFileName={setUploadedFileName}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-gray-500 text-center">
            <FontAwesomeIcon icon={["fas", "file"]} size="2x" />
            <p className="text-sm font-medium">wrong format: {fileName}</p>
            <p className="text-sm font-medium">
              accepted formats: png, jpg, jpeg, gif, mp4, webm, ogg
            </p>
            <RefreshButton
              file={file}
              url={url}
              uploadedFileName={uploadedFileName}
              setFile={setFile}
              setFileName={setFileName}
              setUrl={setUrl}
              setUploadedFileName={setUploadedFileName}
            />
          </div>
        )
      ) : (
        <div
          ref={output}
          onDrop={(e) => dropHandler(e, setFile, setFileName)}
          onDragOver={(e) => dragHandler(e, output)}
          onDragLeave={(e) => dragLeaveHandler(e, output)}
          onMouseLeave={(e) => dragLeaveHandler(e, output)}
          className="border-2 border-dashed w-full h-full grid items-center"
        >
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => onFileChange(e, setFile, setFileName)}
          />
          <label
            htmlFor="file"
            className="flex flex-col justify-center items-center text-center gap-[20px] btn-theme-color px-4 py-2 rounded-[10px] cursor-pointer"
          >
            <div className="border rounded-[50%] flex justify-center items-center w-[60px] h-[60px] text-[20px] cursor-pointer">
              <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
            </div>
            <div className="normal-title">
              Drop your{" "}
              {block.type === "image" ? (
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

function RefreshButton({
  file,
  url,
  uploadedFileName,
  setFile,
  setFileName,
  setUrl,
  setUploadedFileName,
}) {
  const [deleting, setDeleting] = useState(false);

  const handleRefresh = async () => {
    const targetFileName = file?.name || uploadedFileName;
    if (!targetFileName) return; // nothing to delete

    setDeleting(true);
    try {
      const currentType = mediaType(file?.name || uploadedFileName);
      if (currentType === "image") await deleteBlogImage(targetFileName);
      else if (currentType === "video") await deleteBlogVideo(targetFileName);

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
    <div className="h-fit border border-dashed cursor-pointer relative">
      <FontAwesomeIcon icon={["fas", "refresh"]} onClick={handleRefresh} />
      {deleting && (
        <span className="absolute top-0 right-0 text-xs text-red-600">
          Deleting...
        </span>
      )}
    </div>
  );
}

export function ImageOutput({ block }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    async function load() {
      if (!block.content) return;
      try {
        const imgUrl = await getBlogImgUrl(block.content);
        setUrl(imgUrl);
      } catch (err) {
        console.error("Failed to load image URL:", err);
      }
    }
    load();
  }, [block.content]);

  return (
    <div key={block.id} className="relative w-full h-[400px]">
      {url ? <img src={url} alt="" className="media" /> : null}
    </div>
  );
}

export function MediaOutput({ block }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    async function load() {
      if (!block.content) return;
      try {
        const videoUrl = await getBlogVideoUrl(block.content);
        setUrl(videoUrl);
      } catch (err) {
        console.error("Failed to load video URL:", err);
      }
    }
    load();
  }, [block.content]);

  return (
    <div key={block.id} className="relative w-full h-[400px] media">
      {url && (
        <video autoPlay muted controls>
          <source src={url} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
