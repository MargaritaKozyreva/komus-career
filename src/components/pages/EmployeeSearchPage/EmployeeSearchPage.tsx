import { useLocation } from 'react-router-dom';
import { SearchEmployeeWidget } from '../../widgets/employee/ui/SearchEmployeeWidget';
import { withLayout } from '../../layout/Layout';
import { CandidateWidget } from '../../widgets/employee/ui/CandidateWidget';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const EmployeeSearchPage = () => {
  const queryParam = useQuery();
  const searchQuery = queryParam.get('query');

  // Приведение null к undefined, если searchQuery отсутствует
  const initialQuery = searchQuery || undefined;

  return (
    <div>
      <SearchEmployeeWidget initialQuery={initialQuery} />
      <CandidateWidget searchQuery={initialQuery} />
    </div>
  );
};
export default withLayout(EmployeeSearchPage);