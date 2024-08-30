import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./EmployeeResumePage.module.scss";
import { withLayout } from "../../layout/Layout";
import { EmployeeResumeWidget } from "../../widgets/employee";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { employeeResumeModel } from "../../../entities/employee-resume";

export const EmployeeResume: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id)

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(employeeResumeModel.actions.getEmployeeResume(id || null));
  }, [dispatch, id]);

  const { entity, isLoading, error } = useSelector(
    (state: RootState) => state.employeeResume
  );


  if (isLoading) return <div>Loading...</div>;

  if (!entity) {
    return null;
  }

  const { data: resumes } = entity;

  return (
    <div className={styles.vacancyPage}>
        <EmployeeResumeWidget resumeData={resumes[0]} />
    </div>
  );
};

export const EmployeeResumePage = withLayout(EmployeeResume);
