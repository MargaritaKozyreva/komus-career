import { DetailedHTMLProps, HTMLAttributes } from "react";
import { CandidateType } from "../../../../../../../types/candidates";
import styles from "./CandidateCards.module.scss";
import { CandidateCard } from "../../../../../../ui/CandidateCard";
import graphicImgSvg from "../../../../../../../assets/graphic-1.svg";

interface CandidateCardsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  candidates: CandidateType[];
  isShowAllCandidatesCard: boolean;
  limit?: number;
}

const CandidateCards: React.FC<CandidateCardsProps> = ({
  candidates,
  limit,
  isShowAllCandidatesCard,
}) => {
  const displayedCandidates = limit ? candidates.slice(0, limit) : candidates;
  return (
    <div className={styles.container}>
      {displayedCandidates.length > 0 && (
        <div className={styles.widgetWrapperCards}>
          {displayedCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
          {isShowAllCandidatesCard && (
            <div className={styles.allCandidatesCard}>
              <img src={graphicImgSvg} alt={"all-candidates"} />
              <span>Все кандидаты</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateCards;
