import { ExpertBlogDataType } from "../../types/expertBlog";
import { ResponseResult, httpService } from "../service/service";

export class ExpertBlogsData {
  getExpertBlogs(): ResponseResult<ExpertBlogDataType> {
    const data = httpService<ExpertBlogDataType>("GET", "get_expert_blogs");
    return data;
  }
}
