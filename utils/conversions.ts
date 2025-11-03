import { BlogTopicsType } from "../lib/types";
import { getAllTopics } from "@services/topics";

// converts ASCII value & back to &
export const cleanUpLink = (link: string) =>
  link
    .split("-")
    .map((p) => (p === "%26" ? "&" : p))
    .join("-");

// converts link to a topic string
export const getTopicFromLink = (link: string) =>
  link
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
