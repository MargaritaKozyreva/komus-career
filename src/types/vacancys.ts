export type VacancyRequirementsType = {
  sex: 'm' | 'w' | null;  // 'm' для мужского, 'w' для женского, null если не указано
  age_of: number | null;   // минимальный возраст
  age_to: number | null;   // максимальный возраст
  totalWorkExperience: number | null;  // общий стаж работы в годах
  educationLevel: string | null;  // уровень образования
  skills: string | null;  // профессиональные навыки
};

export type VacancyType = {
  id: string;
  title: string;
  salaryRange: string;
  postedDate: string;
  location: string;
  contractType: string;
  description: string;
  isStarred?: boolean;
  subdivision?: string;  // подразделение, например, "Департамент бизнес технологий"
  region?: string;  // регион, например, "Россия"
  workSchedule?: string;  // график работы, например, "Полная занятость"
  hasProbation?: boolean;  // наличие испытательного срока
  level?: string;  // уровень должности, например, "Менеджер по продажам"
  specializations?: string;  // специализация, например, "PR"
  requirements?: VacancyRequirementsType;  // требования к кандидату
  additionalInfo?: string;  // дополнительная информация
};

export type EmployeeVacancyType = VacancyType & {
  date: string;  // дата для вакансии сотрудника
};

export type VacancyesDataType = {
  totalPages: number;
  data: VacancyType[];
};

export type VacancyDataType = {
  data: VacancyType;
};

export type EmployeeVacancyDataType = {
  data: EmployeeVacancyType[];
};
