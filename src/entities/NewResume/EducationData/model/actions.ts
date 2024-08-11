import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewResumeEducationDataType } from "../../../../types/newResume";
import { ResumeContext } from "../../../../api/dataContext";

export const addEducationData = createAsyncThunk(
  "educationDataSlice/addEducationData",
  async (educationData: NewResumeEducationDataType, { rejectWithValue }) => {
    try {
      const response = await ResumeContext.sendEducationData({ educationData });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
