
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../state/store";
import { itemsViewModel } from "../../../entities/ItemsView";
import { DisplayMode } from "../../../types/displayModeTypes";
import { CardViewIcon, ListViewIcon } from "../../ui/Icons";
import styles from "./ToggleView.module.scss";

export type ToggleViewProps = {
  widget: "candidates" | "vacancies";
};

export const ToggleView: React.FC<ToggleViewProps> = ({ widget }) => {
  const dispatch: AppDispatch = useDispatch();

  const displayMode = useSelector(
    (state: { view: itemsViewModel.slices.ViewState }) =>
      state.view.viewMode[widget]
  );

  const getIconStyle = (mode: DisplayMode) => {
    return displayMode === mode ? "#F6B920" : "#9B9B9B";
  };

  return (
    <div className={styles.toggleViewContainer}>
      <CardViewIcon
        color={getIconStyle("grid")}
        onClickHandler={() =>
          dispatch(
            itemsViewModel.slices.itemsViewSliceActions.setViewMode({
              mode: "grid",
              widget: widget,
            })
          )
        }
      />

      <ListViewIcon
        color={getIconStyle("list")}
        onClickHandler={() =>
          dispatch(
            itemsViewModel.slices.itemsViewSliceActions.setViewMode({
              mode: "list",
              widget: widget,
            })
          )
        }
      />
    </div>
  );
};
