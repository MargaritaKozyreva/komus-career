import { VacancyesDataType } from "../../../types/vacancys";
import { httpServiceMock, ResponseResult } from "../../service/service";
import { VacancyMockData } from "./items/vacancyes";

export class VacancyData {
    getVacancyes(): ResponseResult<VacancyesDataType> {
    const data = httpServiceMock<VacancyesDataType>(VacancyMockData);
    return data;
  }
}
