import { EmployeeVacancyDataType, VacancyesDataType, VacancyDataType } from "../../types/vacancys";
import { ResponseResult, httpService } from "../service/service";

export class VacancyData {
  getVacancies(payload: {
    page?: number;
    limit?: number;
    query?: string;
  }): ResponseResult<VacancyesDataType> {
    const data = httpService<VacancyesDataType>(
      "GET",
      "get_vacancyes",
      `page=${payload.page}&limit=${payload.limit}&query=${payload.query}`
    );
    return data;
  }

  getVacancy(payload: {
    vacancyId: string;
  }): ResponseResult<VacancyDataType> {
    const data = httpService<VacancyDataType>(
      "GET",
      "get_vacancy",
      `vacancy_id=${payload.vacancyId}`
    );
    return data;
  }

  getEmployeeVacancyResponses(): ResponseResult<EmployeeVacancyDataType> {
    const data = httpService<EmployeeVacancyDataType>(
      "GET",
      "get_employee_vacancy_responses",
    );
    return data;
  }
  addVacancyInFavorite(payload: {
    vacancyId: string;
  }): ResponseResult<VacancyDataType> {
    const data = httpService<VacancyDataType>(
      "GET",
      "add_vacancy_in_favorite",
      `vacancy_id=${payload.vacancyId}`
    );
    return data;
  }
}
