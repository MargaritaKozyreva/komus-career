import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import styles from "./App.module.scss";
import VacanciesPage from "./components/pages/VacanciesPage";
import { NewResumePage } from "./components/pages/NewResumePage";
import EmployeeSearchPage from "./components/pages/EmployeeSearchPage";
import {VacancyPage} from "./components/pages/VacancyPage";
import { EmployeeResumesAndResponcesPage } from "./components/pages/EmployeeResumesAndResponcesPage";
import { EmployeeResumePage } from "./components/pages/EmployeeResumePage";


function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="vacancies" element={<VacanciesPage />} />
          <Route path="create-resume/*" element={<NewResumePage />} />
          <Route path="employee-resume-responce/*" element={<EmployeeResumesAndResponcesPage />} />
          <Route path="employee-resume/*" element={<EmployeeResumePage />} />
          <Route path="search-employees" element={<EmployeeSearchPage />} />
          <Route path="vacancy/:id" element={<VacancyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
