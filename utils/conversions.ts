import { BlogTopicsType } from "../lib/types/types";
import { getAllTopics } from "@services/topics";

// converts ASCII value "%26" back to normal string "&"
export const cleanUpLink = (link: string) =>
  link
    .split("-")
    .map((p) => (p === "%26" ? "&" : p))
    .join("-");

// converts link to a topic string
export const getTopicFromLink = (link: string) =>
  cleanUpLink(link)
    .split("-")
    .map((p) => (p === "%26" ? "&" : p))
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join(" ");

// converts a topic string into a link
export const getLinkFromTopic = (b: string) =>
  b
    .toLowerCase()
    .split(" ")
    .map((p) => (p === "%26" ? "&" : p))
    .join("-");

// Gets the blogs that corresponds to the topic of that page
export const getBlogMatchingPage = async (page: string) => {
  const topics: BlogTopicsType = await getAllTopics();
  return topics.find((t) => getLinkFromTopic(t.title) === cleanUpLink(page));
};

// Get media url type
export const mediaType = (url?: string) => {
  if (!url || typeof url !== "string") return "unknown";

  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
  ];
  const videoExtensions = [
    ".mp4",
    ".avi",
    ".mov",
    ".wmv",
    ".flv",
    ".mkv",
    ".webm",
  ];

  for (const ext of imageExtensions) {
    if (url.toLowerCase().includes(ext)) return "image";
  }

  for (const ext of videoExtensions) {
    if (url.toLowerCase().includes(ext)) return "video";
  }

  return "unknown";
};

// Camel Case Converter
export const toCamelCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// get string after colon. E.g. "someWord:anotherWord" gives "anotherWord".
export function getWordAfterColon(inputString: string) {
  const colonIndex = inputString.indexOf(":");

  if (colonIndex !== -1) {
    return inputString.substring(colonIndex + 1).trim();
  } else {
    return inputString.trim();
  }
}

// gets string before colon
export function getWordBeforeColon(inputString: string) {
  const colonIndex = inputString.indexOf(":");

  if (colonIndex !== -1) {
    return inputString.substring(0, colonIndex).trim();
  } else {
    return inputString.trim();
  }
}

// convert colon to slash in a string
export const convertColonToSlash = (inputString: string) =>
  inputString.replace(":", "/");
