import { UserData } from "./user";
import { VacancyData } from "./vacancy";
import { CandidatesData } from "./candidates";
import { WorkArticlesData } from "./workArticles";
import { ExpertBlogsData } from "./expertBlogs";
import { NewResumeData } from "./newResume";

export const UserContext = new UserData();
export const VacancyContext = new VacancyData();
export const CandidatesContext = new CandidatesData();
export const WorkArticlesContext = new WorkArticlesData();
export const ExpertBlogsContext = new ExpertBlogsData();
export const ResumeContext = new NewResumeData();
