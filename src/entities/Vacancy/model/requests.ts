import { VacancyContext } from "../../../api/dataContext";

export const getVacancy = async (vacancyId: string) => {
  const data = await VacancyContext.getVacancy({ vacancyId });
  return data;
};
