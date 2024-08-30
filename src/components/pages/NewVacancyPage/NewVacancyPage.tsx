import React, { useEffect, useState } from "react";
import { VacancyDataType } from "../../../types/vacancys";
import { vacancyModel } from "../../../entities/Vacancy";
import { useParams } from "react-router-dom";

import styles from "./VacancyPage.module.scss";
import { withLayout } from "../../layout/Layout";

export const NewVacancy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [vacancyData, setVacancyData] = useState<VacancyDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applyStatus, setApplyStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await vacancyModel.requests.getVacancy(id || "");
        if (result.status !== 200) {
          throw new Error(`Ошибка: ${result.status}`);
        }
        setVacancyData(result.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleApply = async () => {
    try {
      const response = await vacancyModel.requests.applyForVacancy(id || "");
      if (response.status === 200 && response.data.success) {
        setApplyStatus("Вы успешно откликнулись на вакансию!");
      } else {
        throw new Error("Не удалось откликнуться на вакансию");
      }
    } catch (err) {
      setApplyStatus(`Ошибка: ${(err as Error).message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!vacancyData) {
    return null;
  }

  const { data: vacancy } = vacancyData;

  return (
    <div className={styles.vacancyPage}>
      {vacancy ? (
        <>
          <header className={styles.header}>
            <h3 className={styles.title}>{vacancy.title}</h3>
          </header>
          <div className={styles.sections}>
            <section className={styles.details}>
              <h2>Вакансия</h2>
              <hr className={styles.divider} />
              <p className={styles.infoText}>
                <span className={styles.infoTitle}>Зарплата: </span>
                {vacancy.salaryRange}
              </p>
              <p className={styles.infoText}>
                <span className={styles.infoTitle}>Подразделение: </span>
                {vacancy.subdivision}
              </p>
              <p className={styles.infoText}>
                <span className={styles.infoTitle}>Регион: </span>
                {vacancy.region}
              </p>
              <p className={styles.infoText}>
                <span className={styles.infoTitle}>График работы: </span>
                {vacancy.workSchedule}
              </p>
              <p className={styles.infoText}>
                <span className={styles.infoTitle}> Испытательный срок: </span>
                {vacancy.hasProbation ? "Есть" : "Без испытательного срока"}
              </p>
              <p className={styles.infoText}>
                <span className={styles.infoTitle}>Уровень должности: </span>
                {vacancy.level}
              </p>
              <p className={styles.infoText}>
                <span className={styles.infoTitle}>Специализации: </span>
                {vacancy.specializations}
              </p>
            </section>
            <section className={styles.requirements}>
              <h2>Требования к кандидату</h2>
              <hr className={styles.divider} />
              <p className={styles.infoText}>
                <span className={styles.infoTitle}>Пол: </span>
                {vacancy.requirements?.sex === "m" ? "Мужской" : "Женский"}
              </p>
              <p className={styles.infoText}>
                <span className={styles.infoTitle}>Возраст: от </span>
                {vacancy.requirements?.age_of} до {vacancy.requirements?.age_to}{" "}
                лет
              </p>
              <p className={styles.infoText}>
                <span className={styles.infoTitle}>
                  Общий стаж работы: не менее{" "}
                </span>
                {vacancy.requirements?.totalWorkExperience} лет
              </p>
              <p className={styles.infoText}>
                <span className={styles.infoTitle}>Уровень образования: </span>
                {vacancy.requirements?.educationLevel}
              </p>
              <p className={styles.infoText}>
                <span className={styles.infoTitle}>
                  Профессиональные навыки:
                </span>
                {vacancy.requirements?.skills || "навыки не указаны"}
              </p>
            </section>
            <section className={styles.additionalInfo}>
              <h2>Дополнительная информация</h2>
              <hr className={styles.divider} />
              <p className={styles.infoText}>{vacancy.additionalInfo}</p>
            </section>
          </div>

          <button className={styles.applyButton} onClick={handleApply}>
            Откликнуться
          </button>
        </>
      ) : (
        <div>No vacancy data</div>
      )}
    </div>
  );
};

export const NewVacancyPage = withLayout(NewVacancy);
