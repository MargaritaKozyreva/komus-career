import { createAsyncThunk } from "@reduxjs/toolkit";
import { VacancyContext } from "../../../api/dataContext";

export const getEmployeeVacancyResponses = createAsyncThunk(
  "employeeVacancySlice/getEmployeeVacancyResponses",
  async () => {
    const data = await VacancyContext.getEmployeeVacancyResponses();
    return data;
  }
);
