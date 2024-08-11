import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../state/store";
import { SearchBar } from "../../../../ui/SearchBar";
import styles from "./SearchVacancyWidget.module.scss";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { vacancyModel } from "../../../../../entities/Vacancy";


interface SearchVacancyWidgetProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

export const SearchVacancyWidget: React.FC<SearchVacancyWidgetProps> = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleVacancySearch = (query: string) => {
    console.log("Поиск вакансии:", query);
    dispatch(vacancyModel.slices.vacancyActions.setSearchQuery(query));
    dispatch(vacancyModel.actions.getVacancies({ page: 1, limit: 10, query: query }));
  };
  return (
    <div className={styles.root}>
      <h3 className={styles.widgetTitle}>ПОИСК ВАКАНСИИ</h3>
      <SearchBar
        placeholder="Поиск..."
        buttonText="Найти"
        onSearch={handleVacancySearch}
        color=" #f6b920" // Цвет для "Поиск вакансий"
        widgetText="Например, ТРП или Комус-упаковка"
      />
    </div>
  );
};
