import { EmployeeResumeType } from "../../types/employeeResume";
import { UserType } from "../../types/user";
import { ResponseResult, httpService } from "../service/service";

export class UserData {
  getCurrentUser(): ResponseResult<UserType> {
    const data = httpService<UserType>("GET", "get_current_user");
    return data;
  }
  getUserById(payload: { userId: string | null }): ResponseResult<UserType> {
    const data = httpService<UserType>(
      "GET",
      "get_user_by_id",
      `user_id=${payload.userId}`
    );
    return data;
  }

  getEmployeeResume(payload: { userId: string | null }): ResponseResult<EmployeeResumeType> {
    const data = httpService<EmployeeResumeType>(
      "GET",
      "get_employee_resume",
      `user_id=${payload.userId}`
    );
    return data;
  }
}
