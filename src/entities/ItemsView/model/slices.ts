import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DisplayMode = "list" | "grid";

export interface ViewState {
  viewMode: { [key: string]: string };
}

export const initialState: ViewState = {
  viewMode: {
    candidates: "grid",
    vacancies: "list",
  },
};

export const ItemsViewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setViewMode(
      state,
      action: PayloadAction<{ widget: string; mode: DisplayMode }>
    ) {
      const { widget, mode } = action.payload;
      state.viewMode[widget] = mode;
    },
  },
});

export const itemsViewSliceActions = ItemsViewSlice.actions;
export const itemsViewSliceReducers = ItemsViewSlice.reducer;
