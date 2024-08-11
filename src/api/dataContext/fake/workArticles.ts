import { WorkArticleDataType } from "../../../types/workArticle";
import { httpServiceMock, ResponseResult } from "../../service/service";
import { workArticlesData } from "./items/workArticles";

export class WorkArticlesData {
  getWorkArticles(): ResponseResult<WorkArticleDataType> {
    const data = httpServiceMock<WorkArticleDataType>(workArticlesData);
    return data;
  }
}
