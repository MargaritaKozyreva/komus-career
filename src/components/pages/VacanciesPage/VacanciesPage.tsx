import { withLayout } from "../../layout/Layout";
import { SearchVacancyWidget } from "../../widgets/vacancy/ui/SearchVacancyWidget";
import { ServiceWidget } from "../../ui/ServiceWidget";

import menIcon from "../../../assets/men-icon.svg";
import searchIcon from "../../../assets/search-icon.svg";

import styles from "./VacanciesPage.module.scss";
import { VacancyWidget } from "../../widgets/vacancy/ui/VacancyWidget";

const VacanciesPage = () => {
  return (
    <div className={styles.root}>
      {<SearchVacancyWidget />}
      <div className={styles.serviceWidgets}>
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
      <div className={styles.vacancyWidgets}>{<VacancyWidget limit={5} />}</div>
    </div>
  );
};

export default withLayout(VacanciesPage);
