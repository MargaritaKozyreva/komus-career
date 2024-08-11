import { DetailedHTMLProps, HTMLAttributes } from "react";
import { CandidateType } from "../../../../../../../types/candidates";
import CandidateItem from "../../../../../../common/CandidateItem";
import styles from "./CandidateList.module.scss";
import { Button } from "@komus/design";
interface CandidateProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  candidates: CandidateType[];
  limit?: number;
}

const CandidateList: React.FC<CandidateProps> = ({ candidates, limit }) => {
  const displayedCandidates = limit ? candidates.slice(0, limit) : candidates;
  return (
    <div className={styles.container}>
      {displayedCandidates.length > 0 && (
        <table className={`${styles.candidateTable}`}>
          <thead className={styles.thead}>
            <tr>
              <th>Дата</th>
              <th>Резюме</th>
              <th>Подразделение</th>
              <th>Зарплата</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayedCandidates.map((candidate: CandidateType) => (
              <CandidateItem key={candidate.id} candidate={candidate} />
            ))}
          </tbody>
        </table>
      )}
      <Button type="default">ЗАГРУЗИТЬ ЕЩЕ</Button>
    </div>
  );
};

export default CandidateList;
