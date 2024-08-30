import styles from "./VacancyItem.module.scss";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { VacancyType } from "../../../types/vacancys";
import starSvg from "../../../assets/star.svg";
import starYellowSvg from "../../../assets/star-yellow.svg";
import { AppDispatch, RootState } from "../../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { vacancyModel } from "../../../entities/Vacancy";
import Spinner from "../../ui/Spinner";
import { Link } from "react-router-dom";

interface VacancyProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

const VacancyItem: React.FC<VacancyProps & { vacancy: VacancyType }> = ({
  vacancy,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { favoritePending } = useSelector(
    (state: RootState) => state.vacancyes
  );

  const handleFavoriteClick = (vacancyId: string) => {
    dispatch(vacancyModel.actions.addVacancyInFavorite(vacancyId));
  };

  return (
    <tr className={styles.container}>
      <td>{vacancy.postedDate}</td>
      <td>
        <p className={styles.title}>
          <Link to={`/vacancy/${vacancy.id}`}>{vacancy.title}</Link>
        </p>
        <p>{vacancy.description}</p>
      </td>
      <td>{vacancy.contractType}</td>
      <td>{vacancy.salaryRange}</td>
      <td>
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
      </td>
    </tr>
  );
};

export default VacancyItem;
