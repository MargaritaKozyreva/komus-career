import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResumeContext } from "../../../../api/dataContext";
import { NewResumeExperienceDataType } from "../../../../types/newResume";

export const addExperienceData = createAsyncThunk(
  "experienceDataSlice/addExperienceData",
  async (experienceData: NewResumeExperienceDataType, { rejectWithValue }) => {
    try {
      const response = await ResumeContext.sendExperienceData({ experienceData });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
