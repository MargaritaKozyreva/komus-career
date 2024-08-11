import styles from "./CandidateItem.module.scss";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import starSvg from "../../../assets/star.svg";
import starYellowSvg from "../../../assets/star-yellow.svg";
import { CandidateType } from "../../../types/candidates";
import { AppDispatch, RootState } from "../../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { candidatesModel } from "../../../entities/Candidates";
import Spinner from "../../ui/Spinner";

interface VacancyProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

const CandidateItem: React.FC<VacancyProps & { candidate: CandidateType }> = ({
  candidate,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { favoritePending } = useSelector(
    (state: RootState) => state.candidates
  );

  const handleFavoriteClick = (candidateId: string) => {
    dispatch(candidatesModel.actions.addCandidateInFavorite(candidateId));
  };

  return (
    <tr className={styles.container}>
      <td className={styles.posted}>{candidate.postedDate}</td>
      <td>
        <p className={styles.avatar}>
          <img src={candidate.userAvatar} alt="avatar" />
        </p>
        <p className={styles.position}>{candidate.userPositionName}</p>
        <p className={styles.fullname}>{candidate.userFullname}</p>
        <p className={styles.description}>{candidate.description}</p>
      </td>
      <td>{candidate.contractType}</td>
      <td>{candidate.salaryRange}</td>
      <td>
        {candidate.isStarred ? (
          favoritePending === candidate.id ? (
            <Spinner size="m" />
          ) : (
            <div
              className={styles.star}
              onClick={() => handleFavoriteClick(candidate.id)}
              style={{
                backgroundImage: `url(${starYellowSvg})`,
                cursor: "pointer",
              }}
            />
          )
        ) : favoritePending === candidate.id ? (
          <Spinner size="m" />
        ) : (
          <div
            className={styles.star}
            onClick={() => handleFavoriteClick(candidate.id)}
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

export default CandidateItem;
