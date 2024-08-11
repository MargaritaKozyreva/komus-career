import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResumeContext } from "../../../../api/dataContext";
import { NewResumeParamsDataType } from "../../../../types/newResume";

export const addParamsData = createAsyncThunk(
  "paramsDataSlice/addParamsData",
  async (paramsData: NewResumeParamsDataType, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(paramsData)) {
        if (Array.isArray(value)) {
          formData.append(key, value.join(", "));
        } else {
          formData.append(key, String(value));
        }
      }

      const response = await ResumeContext.sendParamsData({ formData });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
