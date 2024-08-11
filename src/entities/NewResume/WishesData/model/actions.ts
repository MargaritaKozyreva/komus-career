import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResumeContext } from "../../../../api/dataContext";
import { NewResumeWishesDataType } from "../../../../types/newResume";

export const addWishesData = createAsyncThunk(
  "WishesDataSlice/addWishesData",
  async (wishesData: NewResumeWishesDataType, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(wishesData)) {
        if (Array.isArray(value)) {
          formData.append(key, value.join(", "));
        } else {
          formData.append(key, String(value));
        }
      }

      const response = await ResumeContext.sendWishesData({ formData });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
