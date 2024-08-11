import React, { createContext, useContext, useState } from "react";
import {
  Gender,
  MaritalStatus,
  NewResumeEducationDataType,
  NewResumeExperienceDataType,
  NewResumeParamsDataType,
  NewResumePersonalDataType,
  NewResumeSkillsDataType,
  NewResumeWishesDataType,
  ResumeVisibility,
  SalaryCurrency,
  SalaryPeriod,
  Schedule,
} from "../../types/newResume";

export type ResumeDataType = {
  personalData: NewResumePersonalDataType;
  wishesData: NewResumeWishesDataType;
  experienceData: NewResumeExperienceDataType;
  skillsData: NewResumeSkillsDataType;
  educationData: NewResumeEducationDataType;
  paramsData: NewResumeParamsDataType;
};

const ResumeContext = createContext<{
  resumeData: ResumeDataType;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeDataType>>;
} | null>(null);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resumeData, setResumeData] = useState<ResumeDataType>({
    personalData: {
      fatherName: "",
      lastName: "",
      firstName: "",
      regionOfResidence: "",
      gender: Gender.Unspecified,
      birthDate: "",
      isHiddenBirthDate: false,
      isShowYearBirthDate: false,
      maritalStatus: MaritalStatus.Unspecified,
      citizenship: "",
      subwayStation: "",
      address: "",
      phone: "",
      additionalPhone: "",
      email: "",
      photo: "",
      telegram: "",
    },
    wishesData: {
      position: "",
      salary: 0,
      salaryPeriod: SalaryPeriod.Monthly,
      salaryCurrency: SalaryCurrency.Rub,
      positionLevel: "",
      employmentType: Schedule.Office,
      keySkills: [],
    },
    experienceData: {
      experiences: [
        {
          organizationName: "",
          position: "",
          positionLevel: "",
          responsibilities: "",
          startDate: { month: "", year: "" },
          endDate: { month: "", year: "" },
          isCurrent: false,
        },
      ],
      totalDuration: {
        years: 0,
        months: 0,
      },
      recommendations: "",
    },
    skillsData: {
      uniqueSkills: "",
      languages: [
        {
          language: "",
          level: "",
        },
      ],
      driverLicense: [],
      hasOwnCar: false,
      documents: [],
    },
    educationData: {
      educations: [
        {
          educationLevel: "",
          institution: "",
          specialization: "",
          graduationYear: "",
        },
      ],
      additionalInfo: "",
    },
    paramsData: {
      activityDuration: "",
      resumeVisibility: ResumeVisibility.NoOne,
    },
  });

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
