import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vacancyModel } from "../../../entities/Vacancy";
import { AppDispatch, RootState } from "../../../state/store";

export const Pagination = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.vacancyes
  );

  console.log(currentPage, totalPages)
  const handlePageChange = (page: any) => {
    dispatch(vacancyModel.slices.vacancyActions.setCurrentPage(page));
    dispatch(vacancyModel.actions.getVacancies({ page }));
  };

  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          disabled={currentPage === i + 1}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
