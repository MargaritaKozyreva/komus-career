import { CandidatesDataType } from "../../../types/candidates";
import { httpServiceMock, ResponseResult } from "../../service/service";
import { candidatesData } from './items/candidates';

export class CandidatesData {
  getCandidates(): ResponseResult<CandidatesDataType> {
    const data = httpServiceMock<CandidatesDataType>(candidatesData);
    return data;
  }
}
