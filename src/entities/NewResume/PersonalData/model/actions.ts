import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResumeContext } from "../../../../api/dataContext";
import { NewResumePersonalDataType } from "../../../../types/newResume";

export const addPersonalData = createAsyncThunk(
  "personalDataSlice/addPersonalData",
  async (personalData: NewResumePersonalDataType, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(personalData)) {
        if (typeof value === 'boolean') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }

      const response = await ResumeContext.sendPersonalData({ formData });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
