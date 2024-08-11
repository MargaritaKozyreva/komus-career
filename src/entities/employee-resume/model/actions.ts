import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserContext } from "../../../api/dataContext";

export const getEmployeeResume = createAsyncThunk(
  "employeeResumeSlice/getEmployeeResume",
  async (userId: string | null) => {
    if (!userId) {
      const data = await UserContext.getEmployeeResume({ userId: null });
      return data;
    }
    const data = await UserContext.getEmployeeResume({ userId });
    return data;
  }
);
