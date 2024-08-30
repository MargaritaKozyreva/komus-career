import { Route, Routes, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const navigateToWishes = () => navigate(`/create-resume/wishes`);
  const navigateToPersonalData = () => navigate(`/create-resume/personal-data`);
  const navigateToExperience = () => navigate(`/create-resume/experience`);
  const navigateToSkills = () => navigate(`/create-resume/skills`);
  const navigateToEducation = () => navigate(`/create-resume/education`);
  const navigateToParams = () => navigate(`/create-resume/params`);
  const navigateToPreview = () => navigate(`/create-resume/preview`);

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
    </ResumeProvider>
  );
};

export const NewResumePage = withLayout(NewResume);
