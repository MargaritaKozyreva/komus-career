import {
  NewResumePersonalDataType,
  NewResumeWishesDataType,
  NewResumeExperienceDataType,
  NewResumeSkillsDataType,
  NewResumeEducationDataType,
  NewResumeParamsDataType,
} from "../../types/newResume";
import { ResponseResult, httpService } from "../service/service";

export class NewResumeData {
  sendPersonalData({
    formData,
  }: {
    formData: FormData;
  }): ResponseResult<NewResumePersonalDataType> {
    const data = httpService<NewResumePersonalDataType>(
      "POST",
      "send_resume_personal_data",
      undefined,
      formData
    );
    return data;
  }

  sendWishesData({
    formData,
  }: {
    formData: FormData;
  }): ResponseResult<NewResumeWishesDataType> {
    const data = httpService<NewResumeWishesDataType>(
      "POST",
      "send_resume_wishes_data",
      undefined,
      formData
    );
    return data;
  }

  sendExperienceData({
    experienceData,
  }: {
    experienceData: NewResumeExperienceDataType;
  }): ResponseResult<NewResumeExperienceDataType> {
    const data = httpService<NewResumeExperienceDataType>(
      "POST",
      "send_resume_experience_data",
      undefined,
      experienceData
    );
    return data;
  }

  sendSkillsData({
    skillsData,
  }: {
    skillsData: NewResumeSkillsDataType;
  }): ResponseResult<NewResumeSkillsDataType> {
    const data = httpService<NewResumeSkillsDataType>(
      "POST",
      "send_resume_skills_data",
      undefined,
      skillsData
    );
    return data;
  }

  sendEducationData({
    educationData,
  }: {
    educationData: NewResumeEducationDataType;
  }): ResponseResult<NewResumeEducationDataType> {
    const data = httpService<NewResumeEducationDataType>(
      "POST",
      "send_resume_educations_data",
      undefined,
      educationData
    );
    return data;
  }
  sendParamsData({
    formData,
  }: {
    formData: FormData;
  }): ResponseResult<NewResumeParamsDataType> {
    const data = httpService<NewResumeParamsDataType>(
      "POST",
      "send_resume_params_data",
      undefined,
      formData
    );
    return data;
  }
}
