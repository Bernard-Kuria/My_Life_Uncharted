import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSettings } from "@hooks/useSettings";

import {
  dragHandler,
  dragLeaveHandler,
  dropHandler,
  onFileChange,
} from "@lib/Draftify/mediaHooks/mediaInteractions";
import { getWordAfterColon, getWordBeforeColon } from "@utils/conversions";
import { useRequireAuth } from "@hooks/useRequireAuth";

export default function MediaUploader() {
  const {
    blogTopics,
    landingPageImages,
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
    handleTopicImageUpload,
    mergingTopicAndImage,
    topicType,
    setTopicType,
    newTopic,
    setNewTopic,
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
  } = useSettings();

  const {
    handleSavePassword,
    message,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
  } = useRequireAuth();

  return (
    <div className="flex flex-col gap-[10px] w-full">
      {/* changing the images */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[10px] items-center">
          <strong>Change main page and blog topic images</strong>
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
          {!blogTopics ||
            (Object.keys(landingPageImages).length === 0 && (
              <div className="text-sm text-(--primary-blue)">
                loading blog topics...
              </div>
            ))}
        </div>

        {blogTopics && (
          <div className="border border-(--secondary-blue) p-2 rounded-[10px] flex flex-col gap-[10px] h-[400px]">
            <div className="grid">
              Select the image to replace:
              <select
                className="border border-(--secondary-blue) p-1"
                onChange={(e) => {
                  setImageName(e.target.value);
                  setError(null);
                }}
                required
              >
                <option value="">select image</option>
                {landingPageImages &&
                  Object.entries(landingPageImages).map(([path, imageName]) => (
                    <option key={path} value={path + ":" + imageName}>
                      {path}
                    </option>
                  ))}
                {topics &&
                  Object.entries(topics).map(([topic, imageName]) => (
                    <option
                      key={topic}
                      value={"topic:" + imageName}
                    >{`image for topic: ${topic}`}</option>
                  ))}
              </select>
            </div>

            {file || url ? (
              type === "image" ? (
                <div className="relative w-full h-[250px] flex text-blue-600 font-medium border-blue-200">
                  <Image
                    src={
                      file instanceof File
                        ? URL.createObjectURL(file)
                        : url || ""
                    }
                    alt="preview"
                    fill
                    sizes="250px"
                    className="media object-contain"
                    unoptimized
                  />
                </div>
              ) : type === "video" ? (
                <div className="w-full h-[250px] flex text-blue-600 font-medium border-blue-200">
                  <video autoPlay muted controls className="media">
                    <source
                      src={
                        file instanceof File
                          ? URL.createObjectURL(file)
                          : url || ""
                      }
                      type="video/mp4"
                    />
                  </video>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-gray-500 text-center">
                  <FontAwesomeIcon icon={["fas", "file"]} size="2x" />
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
                    <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
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
                  handleTopicImageUpload({
                    id:
                      (imageName &&
                        getWordBeforeColon(imageName) === "topic" &&
                        blogTopics.find(
                          (topic) =>
                            topic.image === getWordAfterColon(imageName)
                        )?.id) ||
                      "",
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
                Reselect Image
              </button>
            </div>
          </div>
        )}
      </div>

      {/* modifying adding topic section */}
      <div className="flex flex-col gap-[10px]">
        <strong>Add, remove or modify topics</strong>
        <div className="flex flex-col gap-[10px] border border-(--secondary-blue) rounded-[10px] p-2">
          <div>{`Select "modify existing topic" or "new topic" topic`}</div>
          {modifyTopicStatus && (
            <div className="text-(--primary-blue)">{modifyTopicStatus}</div>
          )}
          <div className="grid md:flex gap-[10px] w-full">
            <button
              className={`border rounded-[10px] p-2 w-full ${
                topicType === "modify"
                  ? "bg-(--primary-blue) text-(--secondary-blue) border-(--primary-blue)"
                  : "border-(--secondary-blue) text-(--primary-blue)"
              }`}
              onClick={() => setTopicType("modify")}
            >
              Modify existing topic
            </button>
            <button
              className={`border rounded-[10px] p-2 w-full ${
                topicType === "new"
                  ? "bg-(--secondary-blue) text-(--primary-blue) border-(--secondary-blue)"
                  : "border-(--secondary-blue) text-(--secondary-blue)"
              }`}
              onClick={() => setTopicType("new")}
            >
              New topic
            </button>
            <button
              className={`border rounded-[10px] p-2 w-full ${
                topicType === "delete"
                  ? "bg-red-500 text-white border-red-500"
                  : "border-(--secondary-blue) text-red-500"
              }`}
              onClick={() => setTopicType("delete")}
            >
              Delete topic
            </button>
          </div>

          {(topicType == "modify" || topicType === "delete") && (
            <select
              className="border border-(--secondary-blue) w-full p-1"
              onChange={(e) => {
                setTopicModify(
                  blogTopics?.find((topic) => topic.title === e.target.value)
                );
                setModifyTopicStatus("");
              }}
              required
            >
              <option value="">select topic</option>
              {blogTopics &&
                blogTopics.map((topic) => (
                  <option key={topic.id} value={topic.title}>
                    {topic.title}
                  </option>
                ))}
            </select>
          )}

          {(topicType === "modify" || topicType === "new") && (
            <input
              type="text"
              className="p-1 w-full border border-(--secondary-blue) rounded-[10px]"
              placeholder="new topic name"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
            />
          )}

          <div className="flex gap-[10px] w-full">
            {(topicType === "modify" || topicType === "new") && (
              <button
                className="border rounded-[10px] p-2 h-fit cursor-pointer w-full text-(--primary-blue)"
                onClick={handleTopicUpdate}
              >
                {topicType === "modify" ? "Update" : "Create"} topic
              </button>
            )}
            {topicType === "delete" && (
              <button
                className="border rounded-[10px] p-2 h-fit cursor-pointer w-full text-red-500"
                onClick={handleTopicRemove}
              >
                Remove topic
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modifying and creating milestiones */}
      <div className="flex flex-col gap-[10px]">
        <strong>Modify milestones</strong>
        <div className="flex flex-col gap-[10px] border border-(--secondary-blue) rounded-[10px] p-2">
          <select
            className="border border-(--secondary-blue) w-full p-1"
            onChange={(e) => {
              const topic = e.target.value as keyof typeof milestones | "null";
              setMilestoneTopic(topic !== "null" ? topic : null);
              setEditableMilestones(
                topic !== "null" ? [...milestones[topic]] : []
              );
              setUpdateMilestoneStatus("");
            }}
            required
          >
            <option value="null">select topic</option>
            {topics &&
              Object.entries(topics).map(([topic, imageName]) => (
                <option key={imageName} value={topic}>
                  {topic}
                </option>
              ))}
          </select>

          <div className="grid gap-[10px] border-style">
            <div className="flex gap-[10px]">
              {milestoneTopic
                ? "milestones for: " + milestoneTopic
                : "Please select topic first"}

              <div className="text-(--primary-blue)">
                {updateMilestoneStatus}
              </div>
            </div>

            {milestoneTopic && milestoneTopic !== null ? (
              editableMilestones.map((milestone, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-[10px]">
                  <input
                    className="border-style"
                    value={milestone.title}
                    onChange={(e) => {
                      const newArr = [...editableMilestones];
                      newArr[idx] = { ...newArr[idx], title: e.target.value };
                      setEditableMilestones(newArr);
                    }}
                  />

                  <input
                    className="border-style"
                    value={milestone.value}
                    onChange={(e) => {
                      const newArr = [...editableMilestones];
                      newArr[idx] = { ...newArr[idx], value: e.target.value };
                      setEditableMilestones(newArr);
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="grid grid-cols-2 gap-[10px]">
                <input className="border-style" />
                <input className="border-style" />
                <input className="border-style" />
                <input className="border-style" />
                <input className="border-style" />
                <input className="border-style" />
                <input className="border-style" />
                <input className="border-style" />
              </div>
            )}
          </div>

          <button
            className="border-style cursor-pointer hover:bg-(--secondary-blue) hover:text-(--primary-blue)"
            onClick={handleMilestoneUpdate}
          >
            Update milestones
          </button>
        </div>
      </div>

      {/* Edit Password */}
      <div className="grid gap-[10px]">
        <strong>Edit password</strong>
        <div className="border-style grid gap-[10px]">
          Enter old password
          <input
            type="password"
            placeholder="old password"
            className="border-style"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          Enter new password
          <input
            type="password"
            placeholder="new password"
            className="border-style"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="border-style cursor-pointer hover:bg-(--secondary-blue) hover:text-(--primary-blue)"
            onClick={handleSavePassword}
          >
            Save password
          </button>
          {message && <div className="text-(--primary-blue)">{message}</div>}
        </div>
      </div>
    </div>
  );
}
