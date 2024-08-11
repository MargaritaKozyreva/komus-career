import { UserType } from "../../../types/user";
import { httpServiceMock, ResponseResult } from "../../service/service";
import { userData } from './items/user';

export class UserData {
  getCurrentUser(): ResponseResult<UserType> {
    const data = httpServiceMock<UserType>(userData);
    return data;
  }
  getUserById(payload: { userId: string | null }): ResponseResult<UserType> {
    const data = httpServiceMock<UserType>(userData);
    return data;
  }
}
