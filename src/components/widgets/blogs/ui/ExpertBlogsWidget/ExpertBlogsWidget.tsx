import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expertBlogsModel } from "../../../../../entities/expert-blogs";
import { AppDispatch, RootState } from "../../../../../state/store";
import { WithSkeleton } from "../../../../ui/WithSkeleton";

import styles from "./ExpertBlogsWidget.module.scss";
import { ArticleCard } from "../../../../ui/ArticleCard";
import { BlogCard } from "../../../../ui/BlogCard";

export const ExpertBlogsWidget = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(expertBlogsModel.actions.getExpertBlogs());
  }, [dispatch]);

  const expertBlogsState = useSelector((state: RootState) => state.expertBlogs);

  return (
    <div className={styles.widgetContainer}>
      <WithSkeleton
        isLoading={expertBlogsState.isLoading}
        isEmpty={expertBlogsState.entity === null}
      >
        <div className={styles.expertsWidgetContainer}>
          <h3 className={styles.widgetTitle}>БЛОГИ ЭКСПЕРТОВ</h3>
          {expertBlogsState.entity?.data &&
            expertBlogsState.entity?.data.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
      </WithSkeleton>
    </div>
  );
};
