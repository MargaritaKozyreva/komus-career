import { UserData } from "./user";
import { CandidatesData } from "./candidates";
import { WorkArticlesData } from "./workArticles";
import { VacancyData } from "./vacancy";
import { ExpertBlogsData } from "./expertBlogs";

export const UserContext = new UserData();
export const VacancyContext = new VacancyData();
export const CandidatesContext = new CandidatesData();
export const WorkArticlesContext = new WorkArticlesData();
export const ExpertBlogsContext = new ExpertBlogsData();
