import { useLocation } from "react-router-dom";
import { SearchVacancyWidget } from "../../widgets/vacancy/ui/SearchVacancyWidget";
import { withLayout } from "../../layout/Layout";
import { VacancyWidget } from "../../widgets/vacancy/ui/VacancyWidget";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const VacancySearchPage = () => {
  const queryParam = useQuery();
  const searchQuery = queryParam.get("query");

  const initialQuery = searchQuery || undefined;

  return (
    <div>
      <SearchVacancyWidget initialQuery={initialQuery} />
      <VacancyWidget query={initialQuery} />
    </div>
  );
};

export default withLayout(VacancySearchPage);
