export type linesTypes = {
  width?: string;
  height?: string;
  top?: string;
  right?: string;
  left?: string;
  color: string;
  angle: string;
};

export type content = {
  id: string;
  type: string;
  content: string;
  tableContent?: null;
};

export type blogContent = {
  id: string;
  blogContent: content[];
};

export type topic = {
  id: string;
  image: string;
  title: string;
  timeStamp: string;
};

export type BlogTopicsType = topic[];

export type blogMeta = {
  image: string;
  topic: string;
  title: string;
  subtitle: string;
  dateCreated: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  minsRead: number;
};

export type blogMetaParams = {
  image?: string;
  topic?: string;
  title?: string;
  subtitle?: string;
  dateCreated?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  views?: number;
  minsRead?: number;
};

export type Blog = {
  id: string;
  blogMeta: blogMeta;
};

export type BlogsType = Blog[];

export type featuredBlog = {
  id: string;
  topic: string;
};

export type featuredBlogType = featuredBlog[];

export type draft = {
  id: string;
  draftMeta: {
    image: string;
    topic: string;
    title: string;
    subtitle: string;
    dateCreated: string;
    tags: string[];
  };
};

export type draftsType = draft[];

export type comment = {
  id: string;
  comment: string;
  likes: number;
};

export type commentsType = comment[];

export type tag = {
  topic: string;
  tags: string[];
};

export type tagsType = tag[];

export type milestone = {
  title: string;
  value: number;
};

export type Milestones = {
  topic: string;
  milestones: milestone[];
};

export type handleFeaturedType = (id: string, topic: string) => Promise<void>;

export type BlogProps = {
  link: string;
  imageUrl: string;
  topic: string;
  timeStamp: string;
};

// Draftify Types
export type tableContent = {
  head: { id: number; content: string }[];
  body: { id: number[]; content: string }[];
};
