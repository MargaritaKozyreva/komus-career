import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResumeContext } from "../../../../api/dataContext";
import { NewResumeSkillsDataType } from "../../../../types/newResume";

export const addSkillsData = createAsyncThunk(
  "skillsDataSlice/addSkillsData",
  async (skillsData: NewResumeSkillsDataType, { rejectWithValue }) => {
    try {
      const response = await ResumeContext.sendSkillsData({ skillsData });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
