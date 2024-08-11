import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../../../ui/SearchBar";
import styles from "./SearchEmployeeWidget.module.scss";
import { DetailedHTMLProps, HTMLAttributes, useState, useEffect } from "react";

interface SearchEmployeeWidgetProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  initialQuery?: string; // Определение пропса для начального запроса
}

export const SearchEmployeeWidget: React.FC<SearchEmployeeWidgetProps> = ({
  initialQuery
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery || "");

  useEffect(() => {
    setQuery(initialQuery || "");
  }, [initialQuery]);

  const handleEmployeeSearch = (query: string) => {
    console.log('Поиск сотрудника:', query);
    navigate(`/search-employees?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className={styles.root}>
      <h3 className={styles.widgetTitle}>ПОИСК СОТРУДНИКА</h3>
      <SearchBar
        placeholder="Поиск..."
        buttonText="Найти"
        onSearch={handleEmployeeSearch}
        onChange={setQuery}
        value={query}
        color="#a280b4"
        widgetText="Например, менеджер или МГУ"
      />
    </div>
  );
};
