import moment from "moment";
import {
  Gender,
  MaritalStatus,
  SalaryCurrency,
  SalaryPeriod,
  Schedule,
} from "../types/newResume";
import { PersonalData } from "../types/employeeResume";

export const getFormattedPhone = (phone: string) => {
  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  return phone;
};

export const getGenderLabel = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return "Мужской";
    case Gender.Female:
      return "Женский";
    case Gender.Unspecified:
      return "Не указывать";
    default:
      return "";
  }
};

export const getMaritalStatusLabel = (maritalStatus: MaritalStatus) => {
  switch (maritalStatus) {
    case MaritalStatus.Single:
      return "Холост (не замужем)";
    case MaritalStatus.Married:
      return "Женат (замужем)";
    case MaritalStatus.Unspecified:
      return "Не указывать";
    default:
      return "";
  }
};

export const getEmailLink = (email: string) => `mailto:${email}`;

export const getBirthDate = (birthdate: string) => {
   return birthdate ?  moment(birthdate, "YYYY-MM-DD").format("DD.MM.YYYY") : "не указано";
}
 

export const getTelegramLink = (telegram: string) =>
  `https://t.me/${telegram.replace("@", "")}`;

export const getYearDeclension = (years: number) => {
  if (years % 10 === 1 && years % 100 !== 11) {
    return `${years} год`;
  } else if (
    [2, 3, 4].includes(years % 10) &&
    ![12, 13, 14].includes(years % 100)
  ) {
    return `${years} года`;
  } else {
    return `${years} лет`;
  }
};

export function getMonthLabel(months: number): string {
  const lastDigit = months % 10;
  const lastTwoDigits = months % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${months} месяцев`;
  } else if (lastDigit === 1) {
    return `${months} месяц`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${months} месяца`;
  } else {
    return `${months} месяцев`;
  }
}

export const getSalaryPeriodLabel = (period: SalaryPeriod) => {
  switch (period) {
    case SalaryPeriod.Hourly:
      return "в час";
    case SalaryPeriod.Daily:
      return "в день";
    case SalaryPeriod.Weekly:
      return "в неделю";
    case SalaryPeriod.Monthly:
      return "в месяц";
    case SalaryPeriod.Annually:
      return "в год";
    default:
      return "";
  }
};

export const getSalaryCurrencyLabel = (currency: SalaryCurrency) => {
  switch (currency) {
    case SalaryCurrency.Rub:
      return "руб";
    case SalaryCurrency.Dollar:
      return "доллар";
    case SalaryCurrency.Euro:
      return "евро";
    default:
      return "";
  }
};

export const getScheduleLabel = (schedule: Schedule) => {
  switch (schedule) {
    case Schedule.Remote:
      return "удаленно";
    case Schedule.Office:
      return "в офисе";
    default:
      return "";
  }
};

export const formatSalary = (salary: number) => {
  return new Intl.NumberFormat("ru-RU").format(salary);
};


export const getPersonShortName = (person: PersonalData) => {
  return `${person.firstName} ${person.lastName}`
}