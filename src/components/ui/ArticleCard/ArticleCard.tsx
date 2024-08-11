import React from "react";
import styles from "./ArticleCard.module.scss";
import { WorkArticleType } from "../../../types/workArticle";

interface ArticleCardProps {
  article: WorkArticleType;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div
      className={`${styles.articleCard} ${article.main ? styles.mainArticle : ""}`}
    >
      <img
        src={article.img}
        alt={article.title}
        className={styles.articleImage}
      />
      <div className={styles.articleContent}>
        <h4 className={styles.articleTitle}>{article.title}</h4>
        <p className={styles.articleDescription}>{article.description}</p>
      </div>
    </div>
  );
};
