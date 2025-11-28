export type LinesTypes = {
  width?: string;
  height?: string;
  top?: string;
  right?: string;
  left?: string;
  color: string;
  angle: string;
};

export type Content = {
  id: string;
  type: string;
  content: string | string[];
  tableContent?: null;
};

export type BlogContent = {
  id: string;
  blogContent: Content[];
};

export type Topic = {
  id: string;
  image: string;
  title: string;
  timeStamp: string;
};

export type BlogTopicsType = Topic[];

export type BlogMeta = {
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

export type BlogMetaParams = {
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
  type: "blogs";
  id: string;
  blogMeta: BlogMeta;
};

export type BlogsType = Blog[];

export type DraftMeta = {
  image: string;
  topic: string;
  title: string;
  subtitle: string;
  dateCreated: string;
  tags: string[];
};

export type DraftMetaParams = {
  image?: string;
  topic?: string;
  title?: string;
  subtitle?: string;
  dateCreated?: string;
  tags?: string[];
};

export type Draft = {
  type: "draft";
  id: string;
  draftMeta: DraftMeta;
};

export type DraftsType = Draft[];

export type BlogOrDraft = Blog | Draft;

export type AnyMeta = BlogMeta | DraftMeta;

export type FeaturedBlog = {
  id: string;
  topic: string;
};

export type FeaturedBlogType = FeaturedBlog[];

export type Comment = {
  id: string;
  comment: string;
  likes: number;
};

export type FetchedComment = {
  id: string;
  docId: string;
  comment: string;
  likes: number;
};

export type FetchedCommentsType = FetchedComment[];

export type CommentsType = Comment[];

export type Tag = {
  topic: string;
  tags: string[];
};

export type TagsType = Tag[];

export type Milestone = {
  title: string;
  value: number;
};

export type Milestones = {
  topic: string;
  milestones: Milestone[];
};

export type HandleFeaturedType = (id: string, topic: string) => Promise<void>;

export type BlogProps = {
  link: string;
  imageUrl: string;
  topic: string;
  timeStamp: string;
};

export type Subscription = {
  id: string;
  email: string;
  topics: string[];
};

export type Subscriptions = Subscription[];
