import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import styles from "./EditResumePage.module.scss";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import {
  PersonalDataTab,
  WishesDataTab,
  ExperienceDataTab,
  SkillsDataTab,
  EducationDataTab,
  ParamsDataTab,
  PreviewDataTab,
} from "../../sections/NewResumeWidget/tabs";

import {
  ResumeDataType,
  ResumeProvider,
  useResume,
} from "../../../entities/NewResume/ResumeContext";
import { withLayout } from "../../layout/Layout";
import { employeeResumeModel } from "../../../entities/employee-resume";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../state/store";

const EditResumeContent = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation();
  const navigate = useNavigate();
  const [lastTab, setLastTab] = useState("");
  const [loading, setLoading] = useState(true);
  const resumeContext = useResume();
  const dispatch: AppDispatch = useDispatch();

  const navigateToWishes = () => navigate(`/edit-resume/${id}/wishes`);
  const navigateToPersonalData = () =>
    navigate(`/edit-resume/${id}/personal-data`);
  const navigateToExperience = () => navigate(`/edit-resume/${id}/experience`);
  const navigateToSkills = () => navigate(`/edit-resume/${id}/skills`);
  const navigateToEducation = () => navigate(`/edit-resume/${id}/education`);
  const navigateToParams = () => navigate(`/edit-resume/${id}/params`);
  const navigateToPreview = () => navigate(`/edit-resume/${id}/preview`);

  useEffect(() => {
    if (!resumeContext) {
      console.error("ResumeContext is not available");
      return;
    }

    const { setResumeData } = resumeContext;

    if (id) {
      dispatch(employeeResumeModel.actions.getEmployeeResume(id))
        .unwrap()
        .then((data) => {
          if (data && data.data.data.length > 0) {
            setResumeData(data.data.data[0] as ResumeDataType);
          }
        })
        .catch((error) => {
          console.error("Failed to load resume:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, dispatch]);

  useEffect(() => {
    return () => {
      setLastTab(location.pathname);
    };
  }, [location]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.newResumePage}>
      <div className={styles.title}>
        <h3>Редактирование резюме</h3>
      </div>
      <div className={styles.newResumePageWrapper}>
        <div className={styles.tabs}>
          <NavLink
            to={`/edit-resume/${id}/personal-data`}
            className={({ isActive }) =>
              isActive ? cn(styles.tab, styles.activeTab) : styles.tab
            }
          >
            Личные данные
          </NavLink>
          <NavLink
            to={`/edit-resume/${id}/wishes`}
            className={({ isActive }) =>
              isActive ? cn(styles.tab, styles.activeTab) : styles.tab
            }
          >
            Пожелания
          </NavLink>
          <NavLink
            to={`/edit-resume/${id}/experience`}
            className={({ isActive }) =>
              isActive ? cn(styles.tab, styles.activeTab) : styles.tab
            }
          >
            Опыт
          </NavLink>
          <NavLink
            to={`/edit-resume/${id}/skills`}
            className={({ isActive }) =>
              isActive ? cn(styles.tab, styles.activeTab) : styles.tab
            }
          >
            Навыки
          </NavLink>
          <NavLink
            to={`/edit-resume/${id}/education`}
            className={({ isActive }) =>
              isActive ? cn(styles.tab, styles.activeTab) : styles.tab
            }
          >
            Образование
          </NavLink>
          <NavLink
            to={`/edit-resume/${id}/params`}
            className={({ isActive }) =>
              isActive ? cn(styles.tab, styles.activeTab) : styles.tab
            }
          >
            Параметры
          </NavLink>
          <NavLink
            to={`/edit-resume/${id}/preview`}
            className={({ isActive }) =>
              isActive ? cn(styles.tab, styles.activeTab) : styles.tab
            }
          >
            Предпросмотр
          </NavLink>
        </div>

        <Routes>
          <Route
            index
            element={<PersonalDataTab onNext={navigateToWishes} />}
          />
          <Route
            path="personal-data"
            element={<PersonalDataTab onNext={navigateToWishes} />}
          />
          <Route
            path="wishes"
            element={
              <WishesDataTab
                onNext={navigateToExperience}
                onPrevious={navigateToPersonalData}
              />
            }
          />
          <Route
            path="experience"
            element={
              <ExperienceDataTab
                onNext={navigateToSkills}
                onPrevious={navigateToWishes}
              />
            }
          />
          <Route
            path="skills"
            element={
              <SkillsDataTab
                onNext={navigateToEducation}
                onPrevious={navigateToExperience}
              />
            }
          />
          <Route
            path="education"
            element={
              <EducationDataTab
                onNext={navigateToParams}
                onPrevious={navigateToSkills}
              />
            }
          />
          <Route
            path="params"
            element={
              <ParamsDataTab
                onNext={navigateToPreview}
                onPrevious={navigateToEducation}
              />
            }
          />
          <Route path="preview" element={<PreviewDataTab />} />
        </Routes>
      </div>
    </div>
  );
};

export const EditResumePage = withLayout(() => (
  <ResumeProvider>
    <EditResumeContent />
  </ResumeProvider>
));
