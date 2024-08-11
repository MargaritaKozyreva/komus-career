import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../state/store";
import VacancyList from "../../../vacancy/ui/VacancyWidget/partials/VacancyList";
import { useEffect } from "react";
import { employeeVacancyModel } from "../../../../../entities/employee-vacancy";
import { WithSkeleton } from "../../../../ui/WithSkeleton";

import styles from "./EmployeeVacancyesResponcesWidget.module.scss";

export function EmployeeVacancyesResponcesWidget() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(employeeVacancyModel.actions.getEmployeeVacancyResponses());
  }, [dispatch]);

  const employeeVacancyes = useSelector(
    (state: RootState) => state.employeeVacancyes
  );

  return (
    <WithSkeleton
      isLoading={employeeVacancyes.isLoading}
      isEmpty={employeeVacancyes.entity === null}
    >
      <div className={styles.container}>
        {employeeVacancyes.entity?.data && (
          <VacancyList vacancys={employeeVacancyes.entity.data} />
        )}
      </div>
    </WithSkeleton>
  );
}
