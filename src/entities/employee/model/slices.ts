
import { UserType } from "../../../types/user";
import { getUserById } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type UserState = {
  entity: UserType | null;
  isLoading: boolean;
  error: string | SerializedError | undefined;
};

const initialState: UserState = {
  entity: null,
  isLoading: false,
  error: undefined,
};

const UserSlices = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const userActions = UserSlices.actions;
export const userReducers = UserSlices.reducer;
