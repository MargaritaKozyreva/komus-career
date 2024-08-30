import styles from "./EmployeeResumeItem.module.scss";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { ResumeData } from "../../../../../../../../../types/employeeResume";
import {
  formatSalary,
  getSalaryCurrencyLabel,
  getSalaryPeriodLabel,
  getScheduleLabel,
} from "../../../../../../../../../utils/getters";
import {
  SalaryCurrency,
  SalaryPeriod,
  Schedule,
} from "../../../../../../../../../types/newResume";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

export const EmployeeResumeItem: React.FC<Props & { resume: ResumeData }> = ({
  resume,
}) => {
  const { personalData, wishesData } = resume;
  return (
    <tr className={styles.container}>
      <td>
        <img src={personalData.photo} />
      </td>
      <td>
        <Link to={`/employee-resume`}>{wishesData.position}</Link>
        <p>
          Ожидания:{" "}
          {wishesData.salary
            ? `${formatSalary(wishesData.salary)} ${getSalaryCurrencyLabel(wishesData.salaryCurrency as SalaryCurrency)} ${getSalaryPeriodLabel(wishesData.salaryPeriod as SalaryPeriod)}`
            : "не указано"}
        </p>
        <p> {getScheduleLabel(wishesData.employmentType as Schedule)}</p>
        <Link to={`/edit-resume/${resume.id}/personal-data`}>Редактировать</Link>
      </td>
      <td>{resume.paramsData.resumeVisibility}</td>
    </tr>
  );
};
