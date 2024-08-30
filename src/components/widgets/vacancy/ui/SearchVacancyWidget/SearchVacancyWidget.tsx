import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../../../ui/SearchBar";
import styles from "./SearchVacancyWidget.module.scss";
import { DetailedHTMLProps, HTMLAttributes, useState, useEffect } from "react";

interface SearchVacancyWidgetProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  initialQuery?: string;
}

export const SearchVacancyWidget: React.FC<SearchVacancyWidgetProps> = ({
  initialQuery
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery || "");

  useEffect(() => {
    setQuery(initialQuery || "");
  }, [initialQuery]);

  const handleVacancySearch = (query: string) => {
    console.log('Поиск вакансии:', query);
    navigate(`/search-vacancies?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className={styles.root}>
      <h3 className={styles.widgetTitle}>ПОИСК ВАКАНСИИ</h3>
      <SearchBar
        placeholder="Поиск..."
        buttonText="Найти"
        onSearch={handleVacancySearch}
        onChange={setQuery}
        value={query}
        color="#f6b920"
        widgetText="Например, ТРП или Комус-упаковка"
      />
    </div>
  );
};
