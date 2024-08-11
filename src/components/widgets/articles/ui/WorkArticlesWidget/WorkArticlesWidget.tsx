import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { workArticlesModel } from "../../../../../entities/WorkArticles";
import { AppDispatch, RootState } from "../../../../../state/store";
import { WithSkeleton } from "../../../../ui/WithSkeleton";

import styles from "./WorkArticlesWidget.module.scss";
import { ArticleCard } from "../../../../ui/ArticleCard";

export const WorkArticlesWidget = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(workArticlesModel.actions.getWorkArticles());
  }, [dispatch]);

  const workArticlesState = useSelector(
    (state: RootState) => state.workArticles
  );

  const mainArticle = workArticlesState.entity?.data.find(
    (article) => article.main
  );
  const otherArticles = workArticlesState.entity?.data.filter(
    (article) => !article.main
  );

  return (
    <div className={styles.widgetContainer}>
      <WithSkeleton
        isLoading={workArticlesState.isLoading}
        isEmpty={workArticlesState.entity === null}
      >
        <div className={styles.widgetWrapperContainer}>
          <h3 className={styles.widgetTitle}>Статьи о работе</h3>
          {mainArticle && (
            <ArticleCard key={mainArticle.id} article={mainArticle} />
          )}
          {otherArticles && otherArticles.length > 0 && (
            <>
              <h4 className={styles.previousArticlesTitle}>Предыдущие</h4>
              <ul className={styles.previousArticlesList}>
                {otherArticles.map((article) => (
                  <li key={article.id} className={styles.previousArticleItem}>
                    <a
                      href={article.url}
                      className={styles.previousArticleLink}
                    >
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </WithSkeleton>
    </div>
  );
};
