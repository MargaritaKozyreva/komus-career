import styles from "./EmployeeResumeItem.module.scss";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { ResumeData } from "../../../../../../../../../types/employeeResume";


interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

export const EmployeeResumeItem: React.FC<Props & { resume: ResumeData }> = ({
  resume,
}) => {
  return (
    <tr className={styles.container}>
      <td>{resume.personalData.firstName}</td>
      {/* <td>
        <p className={styles.title}><Link to={`/vacancy/${vacancy.id}`}>{vacancy.title}</Link></p>
        <p>{vacancy.description}</p>
      </td> */}
      <td>{resume.paramsData.resumeVisibility}</td>
    </tr>
  );
};
