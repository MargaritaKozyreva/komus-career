import React from "react";
import { Button } from "@komus/design";
import styles from "./EmployeeResumeWidget.module.scss";
import cn from "classnames";
import { Link } from "@komus/design";
import {
  formatSalary,
  getSalaryCurrencyLabel,
  getSalaryPeriodLabel,
  getScheduleLabel,
  getYearDeclension,
  getMonthLabel,
  getGenderLabel,
  getBirthDate,
  getMaritalStatusLabel,
  getEmailLink,
  getFormattedPhone,
  getTelegramLink,
  getPersonShortName,
} from "../../../../../utils/getters";
import { ResumeData } from "../../../../../types/employeeResume";
import {
  Gender,
  MaritalStatus,
  SalaryCurrency,
  SalaryPeriod,
  Schedule,
} from "../../../../../types/newResume";

type Props = {
  resumeData: ResumeData;
  onBack?: () => void;
  onSubmit?: () => void;
  isInTab?: boolean;
};

export const EmployeeResumeWidget: React.FC<Props> = ({
  resumeData,
  onBack,
  onSubmit,
  isInTab = false,
}) => {
  const {
    personalData,
    wishesData,
    experienceData,
    skillsData,
    educationData,
  } = resumeData;

  const age =
    new Date().getFullYear() - new Date(personalData.birthDate).getFullYear();

  return (
    <div className={styles.previewContainer}>
      <div className={styles.sidebar}>
        <div className={styles.photo}>
          <img
            src={personalData.photo}
            alt={getPersonShortName(personalData)}
          />
        </div>
        <h2>{getPersonShortName(personalData)}</h2>
        {wishesData.position ? (
          <h3>
            <h2>{wishesData.position}</h2>
          </h3>
        ) : (
          "Желаемая должность не указана"
        )}
        <p>
          Ожидания:{" "}
          {wishesData.salary
            ? `${formatSalary(wishesData.salary)} ${getSalaryCurrencyLabel(wishesData.salaryCurrency as SalaryCurrency)} ${getSalaryPeriodLabel(wishesData.salaryPeriod as SalaryPeriod)}`
            : "не указано"}
        </p>
        <p>
          График работы:{" "}
          {getScheduleLabel(wishesData.employmentType as Schedule)}
        </p>
        <p>Возраст: {age ? getYearDeclension(age) : "не указано"}</p>
        <p>
          Стаж:
          {experienceData.totalDuration.years > 0 ||
          experienceData.totalDuration.months > 0
            ? ` ${getYearDeclension(experienceData.totalDuration.years)} ${getMonthLabel(experienceData.totalDuration.months)}`
            : " не указан ( или нет )"}
        </p>
        <section className={styles.section}>
          <h4>О себе</h4>
          <p>Пол: {getGenderLabel(personalData.gender as Gender)}</p>
          {!personalData.isHiddenBirthDate ? (
            <p>Дата рождения: {getBirthDate(personalData.birthDate)} </p>
          ) : (
            ""
          )}
          <p>
            Семейное положение:{" "}
            {getMaritalStatusLabel(personalData.maritalStatus as MaritalStatus)}
          </p>
          <p>Гражданство: {personalData.regionOfResidence}</p>
          <p>Ближайшее метро: {personalData.subwayStation}</p>
          <p>Адрес: {personalData.address}</p>
        </section>
        <section className={styles.section}>
          <h4>Контактная информация</h4>
          <p>
            Email:{" "}
            {
              <Link href={getEmailLink(personalData.email)}>
                {personalData.email}
              </Link>
            }
          </p>
          <p>Телефон: {getFormattedPhone(personalData.phone)}</p>
          {personalData.additionalPhone && (
            <p>
              Доп. телефон: {getFormattedPhone(personalData.additionalPhone)}
            </p>
          )}
          {personalData.telegram && (
            <p>
              telegram:{" "}
              <Link href={getTelegramLink(personalData.telegram)}>
                {personalData.telegram}
              </Link>
            </p>
          )}
        </section>
      </div>
      <div className={styles.mainContent}>
        <section className={styles.section}>
          <h3>Опыт работы</h3>
          {experienceData.experiences[0].position === "" ? (
            <p>Не указан</p>
          ) : (
            experienceData.experiences.map((exp, index) => (
              <div key={index} className={styles.experienceBlock}>
                <h4>{`${exp.organizationName}, ${exp.position}`}</h4>
                <p>{`${exp.startDate.month}.${exp.startDate.year} - ${exp.isCurrent ? "н.в." : `${exp.endDate.month}.${exp.endDate.year}`}`}</p>
                <ul className={styles.experienceBlockUl}>
                  {exp.responsibilities.split("\n").map((line, idx) => (
                    <li key={idx}>
                      <p>{line}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </section>
        <section className={styles.section}>
          <h3>Образование</h3>
          {!educationData.educations[0].specialization && <p>Не указано</p>}
          {educationData.educations.length > 0 &&
            educationData.educations.map((edu, index) => (
              <div key={index} className={styles.educationBlock}>
                {edu.institution && (
                  <h4>{`${edu.institution}, ${edu.educationLevel}`}</h4>
                )}
                <p>{edu.specialization}</p>
                <p>{edu.graduationYear}</p>
              </div>
            ))}
        </section>
        <section className={styles.section}>
          <h3>Дополнительно</h3>
          <p>
            Водительские права: категории {skillsData.driverLicense.join(", ")}
          </p>
          <p>
            Знание языков:{" "}
            {skillsData.languages
              .map((lang) => `${lang.language} (${lang.level})`)
              .join(", ")}
          </p>
        </section>
        <section className={styles.section}>
          <h3>Документы</h3>
          {skillsData.documents.length > 0 ? (
            <ul>
              {skillsData.documents.map((doc, index) => (
                <li key={index}>
                  <Link href={doc.thumbUrl} target="_blank">
                    {doc.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Документы не прикреплены.</p>
          )}
        </section>
      </div>
      <div className={styles.actions}>
        {isInTab && onBack && (
          <Button className={styles.buttonAction} onClick={onBack}>
            Назад
          </Button>
        )}
        {isInTab && onSubmit && (
          <Button
            type="default"
            className={cn(styles.buttonAction, styles.buttonActionNext)}
            onClick={onSubmit}
          >
            Разместить
          </Button>
        )}
      </div>
    </div>
  );
};
