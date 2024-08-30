import { withLayout } from "../../layout/Layout";
import { SearchVacancyWidget } from "../../widgets/vacancy/ui/SearchVacancyWidget";
import { SearchEmployeeWidget } from "../../widgets/employee/ui/SearchEmployeeWidget";
import { ServiceWidget } from "../../ui/ServiceWidget";
import { CandidateWidget } from "../../widgets/employee/ui/CandidateWidget";
import { VacancyWidget } from "../../widgets/vacancy/ui/VacancyWidget";
import { WorkArticlesWidget } from "../../widgets/articles/ui/WorkArticlesWidget";
import { ExpertBlogsWidget } from "../../widgets/blogs/ui/ExpertBlogsWidget";

import menIcon from "../../../assets/men-icon.svg";
import searchIcon from "../../../assets/search-icon.svg";
import employeeIcon from "../../../assets/employee-icon.svg";
import vacancyIcon from "../../../assets/vacancy-icon.svg";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.searchWidgets}>
        {<SearchVacancyWidget />}
        {<SearchEmployeeWidget />}
      </div>
      <div className={styles.serviceWidgets}>
        <div>
          <ServiceWidget
            icon={menIcon}
            title="Разместить резюме"
            description={[
              { text: "Мои резюме и отклики", path: "/employee-resume-responce/my-resumes" },
              { text: "Составить резюме", path: "/create-resume" },
              { text: "Примеры резюме", path: "/resume-examples" },
            ]}
          />
          <ServiceWidget
            icon={searchIcon}
            title="Поиск вакансий"
            description={[
              { text: "Каталог вакансий", path: "/vacancies" },
              { text: "Расширенный поиск", path: "/advanced-search" },
              { text: "Работа в подразделениях", path: "/division-jobs" },
            ]}
          />
        </div>
        <div>
          <ServiceWidget
            icon={vacancyIcon}
            title="Разместить вакансию"
            description={[
              { text: "Как разместить вакансию", path: "/how-to-post-vacancy" },
              { text: "Виды вакансий", path: "/types-of-vacancies" },
            ]}
          />
          <ServiceWidget
            icon={employeeIcon}
            title="Поиск сотрудника"
            description={[
              { text: "Расширенный поиск", path: "/employee-advanced-search" },
              { text: "Услуги и сервисы", path: "/services" },
            ]}
          />
        </div>
      </div>
      <div className={styles.vacancyWidgets}>{<VacancyWidget limit={3} />}</div>
      <div className={styles.candidatesWidgets}>
        <CandidateWidget limit={6} />
      </div>
      <div className={styles.careerAndWorkWidgets}>
        <WorkArticlesWidget />
        <ExpertBlogsWidget />
      </div>
    </div>
  );
};

export default withLayout(HomePage);
