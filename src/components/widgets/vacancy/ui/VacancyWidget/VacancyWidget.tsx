import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../state/store";
import { WithSkeleton } from "../../../../ui/WithSkeleton";
import styles from "./VacancyWidget.module.scss";
import { itemsViewModel } from "../../../../../entities/ItemsView";
import { ToggleView } from "../../../../common/ToggleView";
import { vacancyModel } from "../../../../../entities/Vacancy";
import VacancyList from "./partials/VacancyList";
import VacancyCards from "./partials/VacancyCards";
import { Pagination } from "../../../../common/Pagination";

export type VacancyWidgetProps = {
  page?: number;
  limit?: number;
  query?: string;
};

export const VacancyWidget: React.FC<VacancyWidgetProps> = ({
  page,
  limit,
  query,
}) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(vacancyModel.actions.getVacancies({ page, limit, query }));
  }, [dispatch, query]);
  
  const vacancyesState = useSelector(
    (state: { vacancyes: vacancyModel.slices.VacancyState }) => state.vacancyes
  );

  const displayMode = useSelector(
    (state: { view: itemsViewModel.slices.ViewState }) =>
      state.view.viewMode["vacancies"]
  );

  let content;
  if (vacancyesState.entity) {
    content =
      displayMode === "grid" ? (
        <VacancyCards vacancys={vacancyesState.entity.data} limit={limit} />
      ) : (
        <VacancyList vacancys={vacancyesState.entity.data} limit={limit} />
      );
  }

  return (
    <div className={styles.widgetContainer}>
      <WithSkeleton
        isLoading={vacancyesState.isLoading}
        isEmpty={vacancyesState.entity === null}
      >
        <div className={styles.widgetWrapperContainer}>
          <h3 className={styles.widgetTitle}>ВАКАНСИИ</h3>
          <ToggleView widget="vacancies" />
          {content}
          <Pagination />
        </div>
      </WithSkeleton>
    </div>
  );
};
