import styles from "./VacancyList.module.scss";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { VacancyType } from "../../../../../../../types/vacancys";
import VacancyItem from "../../../../../../common/VacancyItem";

interface VacancyProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  vacancys: VacancyType[];
  limit?: number;
}

const VacancyList: React.FC<VacancyProps> = ({ vacancys, limit }) => {
  const displayedVacancyes = limit ? vacancys.slice(0, limit) : vacancys;

  return (
    <div className={styles.container}>
      {displayedVacancyes.length > 0 && (
        <table className={`${styles.vacancyTable}`}>
          <thead className={styles.thead}>
            <tr>
              <th>Дата</th>
              <th>Вакансия</th>
              <th>Подразделение</th>
              <th>Зарплата</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayedVacancyes.map((vacancy: VacancyType) => (
              <VacancyItem key={vacancy.id} vacancy={vacancy} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VacancyList;
