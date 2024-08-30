import { VacancyContext } from "../../../api/dataContext";

export const getVacancy = async (vacancyId: string) => {
  const data = await VacancyContext.getVacancy({ vacancyId });
  return data;
};

export const applyForVacancy = async (vacancyId: string) => {
  const data = await VacancyContext.applyForVacancy({ vacancyId });
  return data;
}

export const saveVacancy = async (vacancy: string) => {
  const data = await VacancyContext.saveVacancy({ vacancy });
  return data;
}