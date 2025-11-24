import { BlogMeta, Content } from "@lib/types/types";
import { nanoid } from "@node_modules/nanoid";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const defaultBlogContent: Content[] = [
  {
    id: nanoid(),
    type: "heading",
    content: "",
    tableContent: null,
  },
];

export const defaultMeta: BlogMeta = {
  image: "",
  topic: "",
  title: "",
  subtitle: "",
  dateCreated: "",
  tags: [],
  likes: 0,
  comments: 0,
  views: 0,
  minsRead: 0,
};
