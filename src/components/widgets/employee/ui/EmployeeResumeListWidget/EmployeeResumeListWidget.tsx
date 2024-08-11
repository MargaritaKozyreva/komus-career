import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../state/store";
import { useEffect } from "react";
import { WithSkeleton } from "../../../../ui/WithSkeleton";

import styles from "./EmployeeResumeListWidget.module.scss";
import { employeeResumeModel } from "../../../../../entities/employee-resume";
import { EmployeeResumeList } from "./partials/EmployeeResumeList";



export function EmployeeResumeListWidget() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(employeeResumeModel.actions.getEmployeeResume(null));
  }, [dispatch]);

  const employeeResume = useSelector(
    (state: RootState) => state.employeeResume
  );

  return (
    <WithSkeleton
      isLoading={employeeResume.isLoading}
      isEmpty={employeeResume.entity === null}
    >
      <div className={styles.container}>
        {employeeResume.entity?.data && <EmployeeResumeList resumes={employeeResume.entity.data}/>}
      </div>
    </WithSkeleton>
  );
}
