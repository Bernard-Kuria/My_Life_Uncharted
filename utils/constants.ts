import { BlogMeta, Milestone } from "@lib/types/types";

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

export const defaultMilestones: Milestone[] = [
  {
    title: "",
    value: "",
  },
  {
    title: "",
    value: "",
  },
  {
    title: "",
    value: "",
  },
  {
    title: "",
    value: "",
  },
];

export const defaultImgData: { src: string; alt: string; caption: string } = {
  src: "",
  alt: "",
  caption: "",
};

export const defaultVidData: { src: string; provider: string } = {
  src: "",
  provider: "",
};
