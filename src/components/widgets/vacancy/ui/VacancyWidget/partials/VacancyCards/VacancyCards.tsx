import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./VacancyCards.module.scss";
import graphicImgSvg from "../../../../../../../assets/graphic-1.svg";
import { VacancyType } from "../../../../../../../types/vacancys";
import { VacancyCard } from "../../../../../../ui/VacancyCard";

interface VacancyCardsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  vacancys: VacancyType[];
  isShowAllCandidatesCard?: boolean;
  limit?: number;
}

const VacancyCards: React.FC<VacancyCardsProps> = ({
  vacancys,
  limit,
  isShowAllCandidatesCard,
}) => {
  const displayedVacancyes = limit ? vacancys.slice(0, limit) : vacancys;
  return (
    <div className={styles.container}>
      {displayedVacancyes.length > 0 && (
        <div className={styles.widgetWrapperCards}>
          {displayedVacancyes.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
          {isShowAllCandidatesCard && (
            <div className={styles.allCandidatesCard}>
              <img src={graphicImgSvg} alt={"all-candidates"} />
              <span>Все вакансии</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VacancyCards;
