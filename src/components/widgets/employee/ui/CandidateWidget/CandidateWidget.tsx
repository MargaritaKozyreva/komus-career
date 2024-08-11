import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { candidatesModel } from "../../../../../entities/Candidates";
import { AppDispatch } from "../../../../../state/store";
import { WithSkeleton } from "../../../../ui/WithSkeleton";
import { itemsViewModel } from "../../../../../entities/ItemsView";
import { ToggleView } from "../../../../common/ToggleView";
import CandidateList from "./partials/CandidateList";
import CandidateCards from "./partials/CandidateCards";

import styles from "./CandidateWidget.module.scss";

export type CandidateWidgetProps = {
  limit?: number;
  searchQuery?: string; // Добавляем пропс для поискового запроса
};

export const CandidateWidget: React.FC<CandidateWidgetProps> = ({
  limit,
  searchQuery,
}) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(candidatesModel.actions.getCandidates(searchQuery));
  }, [dispatch, searchQuery]); // Добавление searchQuery в зависимости useEffect

  const candidatesState = useSelector(
    (state: { candidates: candidatesModel.slices.CandidatesState }) =>
      state.candidates
  );

  const displayMode = useSelector(
    (state: { view: itemsViewModel.slices.ViewState }) =>
      state.view.viewMode["candidates"]
  );

  // Определение контента на основе состояния и режима отображения
  let content;
  if (candidatesState.entity) {
    content =
      displayMode === "grid" ? (
        <CandidateCards
          candidates={candidatesState.entity}
          limit={limit}
          isShowAllCandidatesCard={true}
        />
      ) : (
        <CandidateList candidates={candidatesState.entity} limit={limit} />
      );
  }

  return (
    <div className={styles.candidateWidgetContainer}>
      <WithSkeleton
        isLoading={candidatesState.isLoading}
        isEmpty={candidatesState.entity === null}
      >
        <div className={styles.widgetWrapperContainer}>
          <h3 className={styles.widgetTitle}>КАНДИДАТЫ</h3>
          <ToggleView widget="candidates" />
          {content}
        </div>
      </WithSkeleton>
    </div>
  );
};
