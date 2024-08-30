import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "../entities/employee/model/slices";
import { vacancyReducers } from "../entities/Vacancy/model/slices";
import { employeeResumeReducers } from "../entities/employee-resume/model/slices";
import { employeeVacancyReducers } from "../entities/employee-vacancy/model/slices";
import { candidatesReducers } from "../entities/Candidates/model/slices";
import { itemsViewSliceReducers } from "../entities/ItemsView/model/slices";
import { workArticlesReducers } from "../entities/WorkArticles/model/slices";
import { expertBlogsReducers } from "../entities/expert-blogs/model/slices";

export const store = configureStore({
  reducer: {
    user: userReducers,
    vacancyes: vacancyReducers,
    employeeVacancyes: employeeVacancyReducers,
    employeeResume: employeeResumeReducers,
    candidates: candidatesReducers,
    view: itemsViewSliceReducers,
    workArticles: workArticlesReducers,
    expertBlogs: expertBlogsReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["userSlice/getUserById/fulfilled"],
        ignoredPaths: ["payload.headers"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
