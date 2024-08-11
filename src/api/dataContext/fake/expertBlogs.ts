import { ExpertBlogDataType } from "../../../types/expertBlog";
import { httpServiceMock, ResponseResult } from "../../service/service";
import { expertBlogData } from "./items/expertBlogs";

export class ExpertBlogsData {
  getExpertBlogs(): ResponseResult<ExpertBlogDataType> {
    const data = httpServiceMock<ExpertBlogDataType>(expertBlogData);
    return data;
  }
}
