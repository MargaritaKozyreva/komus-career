import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styles from "./NewResumePage.module.scss";
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

import { ResumeProvider } from "../../../entities/NewResume/ResumeContext";
import { withLayout } from "../../layout/Layout";

const NewResume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lastTab, setLastTab] = useState("");

  useEffect(() => {
    return () => {
      setLastTab(location.pathname);
    };
  }, [location]);

  const handleGoBack = () => {
    if (lastTab) {
      navigate(lastTab);
    } else {
      navigate("/create-resume/personal-data");
    }
  };

  return (
    <ResumeProvider>
      <div className={styles.newResumePage}>
        <div className={styles.title}>
          <h3>Новое резюме</h3>
        </div>
        <div className={styles.newResumePageWrapper}>
          <div className={styles.tabs}>
            <NavLink
              to={`/create-resume/personal-data`}
              className={({ isActive }) =>
                isActive ? cn(styles.tab, styles.activeTab) : styles.tab
              }
            >
              Личные данные
            </NavLink>
            <NavLink
              to={`/create-resume/wishes`}
              className={({ isActive }) =>
                isActive ? cn(styles.tab, styles.activeTab) : styles.tab
              }
            >
              Пожелания
            </NavLink>
            <NavLink
              to={`/create-resume/experience`}
              className={({ isActive }) =>
                isActive ? cn(styles.tab, styles.activeTab) : styles.tab
              }
            >
              Опыт
            </NavLink>
            <NavLink
              to={`/create-resume/skills`}
              className={({ isActive }) =>
                isActive ? cn(styles.tab, styles.activeTab) : styles.tab
              }
            >
              Навыки
            </NavLink>
            <NavLink
              to={`/create-resume/education`}
              className={({ isActive }) =>
                isActive ? cn(styles.tab, styles.activeTab) : styles.tab
              }
            >
              Образование
            </NavLink>
            <NavLink
              to={`/create-resume/params`}
              className={({ isActive }) =>
                isActive ? cn(styles.tab, styles.activeTab) : styles.tab
              }
            >
              Параметры
            </NavLink>
            <NavLink
              to={`/create-resume/preview`}
              className={({ isActive }) =>
                isActive ? cn(styles.tab, styles.activeTab) : styles.tab
              }
            >
              Предпросмотр
            </NavLink>
          </div>

          <Routes>
            <Route index element={<PersonalDataTab />} />
            <Route path="personal-data" element={<PersonalDataTab />} />
            <Route
              path="wishes"
              element={<WishesDataTab handleGoBack={handleGoBack} />}
            />
            <Route
              path="experience"
              element={<ExperienceDataTab handleGoBack={handleGoBack} />}
            />
            <Route path="skills" element={<SkillsDataTab />} />
            <Route path="education" element={<EducationDataTab />} />
            <Route path="params" element={<ParamsDataTab />} />
            <Route path="preview" element={<PreviewDataTab />} />
          </Routes>
        </div>
      </div>
    </ResumeProvider>
  );
};

export const NewResumePage = withLayout(NewResume);
