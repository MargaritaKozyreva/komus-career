export type WorkArticleType = {
  id: string;
  img: string;
  title: string;
  url: string;
  main?: boolean;
  description: string;
};

export type WorkArticleDataType = {
  data: WorkArticleType[];
};
