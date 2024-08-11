import { Route, Routes } from "react-router-dom";
import styles from "./EmployeeResumesAndResponcesPage.module.scss";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { withLayout } from "../../layout/Layout";
import { EmployeeResumeListWidget } from "../../widgets/employee/ui/EmployeeResumeListWidget";
import { EmployeeVacancyesResponcesWidget } from "../../widgets/employee/ui/EmployeeVacancyesResponcesWidget";

const EmployeeResumesAndResponces = () => {
  return (
    <div className={styles.EmployeeResumesAndResponcesPage}>
      <div className={styles.title}>
        <h3>МОИ РЕЗЮМЕ И ОТКЛИКИ</h3>
      </div>
      <div className={styles.EmployeeResumesAndResponcesPageWrapper}>
        <div className={styles.tabs}>
          <NavLink
            to={`/employee-resume-responce/my`}
            className={({ isActive }) =>
              isActive ? cn(styles.tab, styles.activeTab) : styles.tab
            }
          >
            МОИ РЕЗЮМЕ
          </NavLink>
          <NavLink
            to={`/employee-resume-responce/responces`}
            className={({ isActive }) =>
              isActive ? cn(styles.tab, styles.activeTab) : styles.tab
            }
          >
            ОТКЛИКИ
          </NavLink>
        </div>

        <Routes>
          <Route index element={<EmployeeResumeListWidget />} />
          <Route path="my" element={<EmployeeResumeListWidget />} />
          <Route path="responces" element={<EmployeeVacancyesResponcesWidget />} />
        </Routes>
      </div>
    </div>
  );
};

export const EmployeeResumesAndResponcesPage = withLayout(EmployeeResumesAndResponces);
