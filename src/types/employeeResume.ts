type PersonalData = {
  fatherName: string;
  lastName: string;
  firstName: string;
  regionOfResidence: string;
  gender: string;
  birthDate: string;
  isHiddenBirthDate: boolean;
  isShowYearBirthDate: boolean;
  maritalStatus: string;
  citizenship: string;
  subwayStation: string;
  address: string;
  phone: string;
  additionalPhone: string;
  email: string;
  photo: string;
  telegram: string;
};

type WishesData = {
  position: string;
  salary: number;
  salaryPeriod: string;
  salaryCurrency: string;
  positionLevel: string;
  employmentType: string;
  keySkills: string[];
};

type Experience = {
  organizationName: string;
  position: string;
  positionLevel: string;
  responsibilities: string;
  startDate: {
    month: string;
    year: string;
  };
  endDate: {
    month: string;
    year: string;
  };
  isCurrent: boolean;
};

type ExperienceData = {
  experiences: Experience[];
  totalDuration: {
    years: number;
    months: number;
  };
  recommendations: string;
};

type Language = {
  language: string;
  level: string;
};

type DocumentData = {
  uid: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: object;
  thumbUrl: string;
};

type SkillsData = {
  uniqueSkills: string;
  languages: Language[];
  driverLicense: string[];
  hasOwnCar: boolean;
  documents: DocumentData[];
};

type Education = {
  educationLevel: string;
  institution: string;
  specialization: string;
  graduationYear: string;
};

type EducationData = {
  educations: Education[];
  additionalInfo: string;
};

type ParamsData = {
  activityDuration: string;
  resumeVisibility: string;
};

export type ResumeData = {
  personalData: PersonalData;
  wishesData: WishesData;
  experienceData: ExperienceData;
  skillsData: SkillsData;
  educationData: EducationData;
  paramsData: ParamsData;
};

export type EmployeeResumeType = {
    data: ResumeData[];
};
