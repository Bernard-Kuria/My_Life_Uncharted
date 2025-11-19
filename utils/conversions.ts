import { BlogTopicsType, Content } from "../lib/types";
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

// Match search with standard lowercase naming
export const findByType = (type: string, blocksData: Content[]) =>
  blocksData.find((b) => b.type.toLowerCase() === type.toLowerCase())
    ?.content ?? "";

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
