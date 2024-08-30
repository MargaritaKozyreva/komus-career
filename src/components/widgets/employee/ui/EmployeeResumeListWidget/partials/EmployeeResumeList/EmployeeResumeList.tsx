import styles from "./EmployeeResumeList.module.scss";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { EmployeeResumeItem } from "./partials/EmployeeResumeItem";
import { ResumeData } from "../../../../../../../types/employeeResume";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  resumes: ResumeData[];
  limit?: number;
}

export const EmployeeResumeList: React.FC<Props> = ({ resumes, limit }) => {
  const displayedEmployeeResumes = limit ? resumes.slice(0, limit) : resumes;

  console.log('###displayedEmployeeResumes ', displayedEmployeeResumes)

  return (
    <div className={styles.container}>
      {displayedEmployeeResumes.length > 0 && (
        <table className={`${styles.vacancyTable}`}>
          <thead className={styles.thead}>
            <tr>
              <th></th>
              <th>Резюме</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {displayedEmployeeResumes.map((resume: ResumeData, i) => (
              <EmployeeResumeItem key={i} resume={resume} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
