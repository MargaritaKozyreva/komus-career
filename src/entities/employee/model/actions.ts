import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserContext } from "../../../api/dataContext";

export const getCurrentUser = createAsyncThunk(
  "userSlice/getCurrentUser",
  async () => {
    const data = await UserContext.getCurrentUser();
    return data;
  }
);
export const getUserById = createAsyncThunk(
  "userSlice/getUserById",
  async (userId: string | null) => {
    if (!userId) {
      const data = await UserContext.getUserById({ userId: null });
      return data;
    }
    const data = await UserContext.getUserById({ userId });
    return data;
  }
);
