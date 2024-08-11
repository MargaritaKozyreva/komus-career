import React from "react";
import styles from "./BlogCard.module.scss";

import { ExpertBlogType } from "../../../types/expertBlog";

interface BlogCardProps {
  blog: ExpertBlogType;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className={styles.blogCard}>
      <img src={blog.img} alt={blog.description} className={styles.blogImage} />
      <div className={styles.blogContent}>
        <p className={styles.blogPostedDate}>{blog.postedDate}</p>
        <p className={styles.blogDescription}>{blog.description}</p>
      </div>
    </div>
  );
};
