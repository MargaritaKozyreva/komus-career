import React from "react";
import { VacancyType } from "../../../types/vacancys";
import { AppDispatch, RootState } from "../../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { vacancyModel } from "../../../entities/Vacancy";
import starSvg from "../../../assets/star.svg";
import starYellowSvg from "../../../assets/star-yellow.svg";

import styles from "./VacancyCard.module.scss";
import Spinner from "../Spinner";

interface VacancyCardProps {
  vacancy: VacancyType;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  const dispatch: AppDispatch = useDispatch();

  const { favoritePending } = useSelector(
    (state: RootState) => state.vacancyes
  );

  const handleFavoriteClick = (vacancyId: string) => {
    dispatch(vacancyModel.actions.addVacancyInFavorite(vacancyId));
  };

  return (
    <div className={styles.vacancyCard}>
      <div className={styles.vacancyCardTitle}>
        <p className={styles.postedDate}>{vacancy.postedDate}</p>
        <div>
          {vacancy.isStarred ? (
            favoritePending === vacancy.id ? (
              <Spinner size="m" />
            ) : (
              <div
                className={styles.star}
                onClick={() => handleFavoriteClick(vacancy.id)}
                style={{
                  backgroundImage: `url(${starYellowSvg})`,
                  cursor: "pointer",
                }}
              />
            )
          ) : favoritePending === vacancy.id ? (
            <Spinner size="m" />
          ) : (
            <div
              className={styles.star}
              onClick={() => handleFavoriteClick(vacancy.id)}
              style={{
                backgroundImage: `url(${starSvg})`,
                cursor: "pointer",
              }}
            />
          )}
        </div>
      </div>

      <h3>{vacancy.title}</h3>
      <p className={styles.description}>{vacancy.description}</p>
      <div className={styles.footer}>
        <span className={styles.contractType}>{vacancy.contractType}</span>
        <span className={styles.salaryRange}>{vacancy.salaryRange}</span>
      </div>
    </div>
  );
};
