export type NewResumePersonalDataType = {
  firstName: string;
  lastName: string;
  /** отчество*/
  fatherName: string;
  gender: Gender;
  birthDate: string;
  isHiddenBirthDate: boolean;
  isShowYearBirthDate: boolean;
  /** семейное положение*/
  maritalStatus: MaritalStatus;
  /** гражданство*/
  citizenship: string;
  /** регион проживания*/
  regionOfResidence: string;
  /**  ближайшее метро*/
  subwayStation: string;
  address: string;
  phone: string;
  /**домашний телефон */
  additionalPhone: string;
  email: string;
  photo: string;
  telegram: string;
};

export type NewResumeWishesDataType = {
  position: string;
  salary: number;
  salaryPeriod: SalaryPeriod;
  salaryCurrency: SalaryCurrency;
  positionLevel: string;
  employmentType: Schedule;
  keySkills: string[];
};
export type NewResumeExperienceDataType = {
  experiences: {
    organizationName: string; // Название организации
    position: string; // Должность
    positionLevel: string; // Уровень должности
    responsibilities: string; // Обязанности и достижения
    startDate: any;
    endDate?: any;
    isCurrent: boolean; // Флаг, указывающий, что работа продолжается по настоящее время
  }[];
  totalDuration: {
    // Общий стаж на этом месте работы
    years: number;
    months: number;
  };
  recommendations: string; // Рекомендации
};

export type NewResumeSkillsDataType = {
  uniqueSkills: string;
  languages: {
    language: string;
    level: string;
  }[];
  driverLicense: DriverLicenseCategoryType[];
  hasOwnCar: boolean;
  documents: any[];
};

export type NewResumeEducationDataType = {
  educations: EducationRecord[]; // Массив записей об образовании
  additionalInfo?: string; // Дополнительная информация
};

export type NewResumeParamsDataType = {
  activityDuration: string; // Срок активности, например "1 год"
  resumeVisibility: ResumeVisibility; // Уровень видимости резюме
};

export enum ResumeVisibility {
  NoOne = "Не видно никому (скрыто)",
  DepartmentOnly = "Видно только департаменту",
  ManagementOnly = "Видно департаменту персонала и руководителям подразделений",
  Everyone = "Видно всем",
}

export type EducationRecord = {
  educationLevel: string; // Уровень образования
  institution: string; // Учебное заведение
  specialization: string; // Специальность
  graduationYear: string; // Год окончания
};

export enum SalaryPeriod {
  Hourly = "hour",
  Daily = "day",
  Weekly = "week",
  Monthly = "month",
  Annually = "year",
}

export enum SalaryCurrency {
  Rub = "rub",
  Dollar = "dollar",
  Euro = "euro",
}
export enum Schedule {
  Remote = "remote",
  Office = "office",
}

export enum DriverLicenseCategoryType {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
}

export enum Gender {
  Male = "male",
  Female = "female",
  Unspecified = "unspecified",
}

export enum MaritalStatus {
  Single = "single",
  Married = "married",
  Unspecified = "unspecified",
}
