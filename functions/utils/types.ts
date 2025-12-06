export type ContactForm = {
  message: string;
  email: string;
};

export type BlogType = {
  type: "blogs";
  id: string;
  blogMeta: { topic: string; title: string };
};
