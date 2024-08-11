import { WorkArticleDataType } from "../../types/workArticle";
import { ResponseResult, httpService } from "../service/service";

export class WorkArticlesData {
  getWorkArticles(): ResponseResult<WorkArticleDataType> {
    const data = httpService<WorkArticleDataType>("GET", "get_work_articles");
    return data;
  }
}
