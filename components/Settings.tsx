"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

import { useSettings } from "@hooks/useSettings";
import {
  dragHandler,
  dragLeaveHandler,
  dropHandler,
  onFileChange,
} from "@lib/Draftify/mediaHooks/mediaInteractions";

export default function MediaUploader() {
  const {
    blogTopics,
    topics,
    imageName,
    setImageName,
    outputRef,
    file,
    fileName,
    url,
    uploading,
    deleting,
    error,
    setError,
    type,
    setFile,
    setFileName,
    handleRemove,
    handleSettingsImageUpload,
    mergingTopicAndImage,
  } = useSettings();

  return (
    <div className="w-full h-[250px] relative">
      <div className="flex flex-col gap-[10px] h-[400px]">
        <div className="flex gap-[10px] items-center">
          Change main page and blog topic images
          {uploading && (
            <div className="text-sm text-(--primary-blue)">Uploading...</div>
          )}
          {deleting && (
            <div className="text-sm text-red-600">
              Deleting previous file...
            </div>
          )}
          {mergingTopicAndImage && (
            <div className="text-sm text-(--primary-blue)">
              Merging the topic with the new image...
            </div>
          )}
          {error && (
            <div className="text-sm text-red-500">
              {`*`}
              {error}
              {`*`}
            </div>
          )}
          {!blogTopics && (
            <div className="text-sm text-(--primary-blue)">
              loading blog topics...
            </div>
          )}
        </div>

        {blogTopics && (
          <div className="flex flex-col gap-[10px] h-[400px]">
            <div className="grid">
              Select the image to replace:
              <select
                className="border"
                onChange={(e) => {
                  setImageName(e.target.value);
                  setError(null);
                }}
                required
              >
                <option value="">select image</option>
                {topics &&
                  Object.entries(topics).map(([topic, image]) => (
                    <option
                      key={topic}
                      value={image}
                    >{`image for topic: ${topic}`}</option>
                  ))}
              </select>
            </div>

            {file || url ? (
              type === "image" ? (
                <div className="w-full h-[250px] flex text-blue-600 font-medium border-blue-200">
                  <img
                    src={
                      file instanceof File
                        ? URL.createObjectURL(file)
                        : url || ""
                    }
                    alt=""
                    className="media"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-gray-500 text-center">
                  <FontAwesomeIcon icon={faFile} size="2x" />
                  <p className="text-sm font-medium">
                    wrong format: {fileName}
                  </p>
                  <p className="text-sm font-medium">
                    accepted formats: png, jpg, jpeg, gif, mp4, webm, ogg
                  </p>
                </div>
              )
            ) : (
              <div
                ref={outputRef}
                onDrop={(e) => {
                  setError(null);
                  dropHandler(e, setFile, setFileName);
                }}
                onDragOver={(e) => dragHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e, outputRef)}
                onMouseLeave={(e) => dragLeaveHandler(e, outputRef)}
                className="flex-1 border-2 border-(--secondary-blue) border-dashed rounded-[10px] text-(--secondary-blue) w-full grid items-center"
              >
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={(e) => {
                    setError(null);
                    onFileChange(e, setFile, setFileName);
                  }}
                />
                <label
                  htmlFor="file"
                  className="flex flex-col justify-center items-center text-center gap-[20px] btn-theme-color px-4 py-2 rounded-[10px] cursor-pointer"
                >
                  <div className="border rounded-[50%] flex justify-center items-center w-[60px] h-[60px] text-[20px] cursor-pointer">
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                  </div>
                  <div className="normal-title">
                    Drop your image here
                    <div className="normal-text text-(--grey-secondary)">
                      or click to browse
                    </div>
                  </div>
                </label>
              </div>
            )}
            <div className="flex gap-[10px]">
              <button
                className="button flex-1"
                onClick={() =>
                  handleSettingsImageUpload({
                    id:
                      blogTopics.find((topic) => topic.image === imageName)
                        ?.id || "",
                    imageName: imageName || "",
                  })
                }
              >
                Upload
              </button>
              <button
                onClick={handleRemove}
                className="buttonInverted"
                disabled={!file && !url}
                title="Clear file/URL"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
