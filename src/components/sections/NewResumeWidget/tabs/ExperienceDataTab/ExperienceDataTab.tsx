import { useFormik, FormikProvider, FieldArray } from "formik";
import { useDispatch } from "react-redux";

import { experienceDataModel } from "../../../../../entities/NewResume";
import { AppDispatch } from "../../../../../state/store";
import { NewResumeExperienceDataType } from "../../../../../types/newResume";
import { Input, Link } from "@komus/design";

import styles from "./ExperienceDataTab.module.scss";
import cn from "classnames";
import {
  Checkbox,
  DatePicker,
  Select,
  Button as AntButton,
  Button,
} from "antd";

import moment from "moment";
import "moment/locale/ru";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useResume } from "../../../../../entities/NewResume/ResumeContext";

moment.locale("ru");

type ExperienceDataTabProps = {
  onNext: () => void;
  onPrevious: () => void;
};

export const ExperienceDataTab: React.FC<ExperienceDataTabProps> = ({
  onNext,
  onPrevious,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const resumeContext = useResume(); 

  const convertToMoment = (date: { month: string; year: string }) => {
    if (date.month && date.year) {
      return moment(`${date.month}-${date.year}`, "MM-YYYY");
    }
    return null;
  };

  const formik = useFormik<NewResumeExperienceDataType>({
    initialValues: resumeContext
      ? resumeContext.resumeData.experienceData
      : {
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
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        experiences: values.experiences.map((exp) => ({
          ...exp,
          startDate: exp.startDate
            ? {
                month: exp.startDate.month,
                year: exp.startDate.year,
              }
            : { month: "", year: "" },
          endDate: exp.endDate
            ? {
                month: exp.endDate.month,
                year: exp.endDate.year,
              }
            : { month: "", year: "" },
        })),
      };

      dispatch(experienceDataModel.actions.addExperienceData(formattedValues));
      if (resumeContext) {
        resumeContext.setResumeData((prevData) => ({
          ...prevData,
          experienceData: formattedValues,
        }));
      }
      onNext();
    },
  });

  const updateTotalDuration = () => {
    let totalMonths = 0;

    formik.values.experiences.forEach((experience) => {
      if (
        experience.startDate.month &&
        experience.startDate.year &&
        (experience.endDate?.month || experience.isCurrent)
      ) {
        const start = moment(
          `${experience.startDate.month}-${experience.startDate.year}`,
          "MM.YYYY"
        );
        const end = experience.isCurrent
          ? moment()
          : moment(
              `${experience.endDate?.month}-${experience.endDate?.year}`,
              "MM.YYYY"
            );
        totalMonths += end.diff(start, "months", true);
      }
    });
    formik.setFieldValue("totalDuration.years", Math.floor(totalMonths / 12));
    formik.setFieldValue("totalDuration.months", Math.round(totalMonths % 12));
  };

  useEffect(() => {
    updateTotalDuration();
  }, [formik.values.experiences]);

  const handleDateChange = (field: string, date: any) => {
    const [month, year] = date ? [date.month() + 1, date.year()] : ["", ""];
    formik.setFieldValue(field, {
      month: month.toString(),
      year: year.toString(),
    });
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <FieldArray
          name="experiences"
          render={(arrayHelpers) => (
            <>
              {formik.values.experiences.map((experience, index) => (
                <div key={index} className={styles.experienceBlock}>
                  <div className={cn(styles.inputGroup, styles.formField)}>
                    <label htmlFor={`experiences.${index}.organizationName`}>
                      Название организации
                    </label>
                    <Input
                      name={`experiences.${index}.organizationName`}
                      onChange={formik.handleChange}
                      value={experience.organizationName}
                    />
                  </div>

                  <div className={cn(styles.inputGroup, styles.formField)}>
                    <label htmlFor={`experiences.${index}.position`}>
                      Должность
                    </label>
                    <Input
                      name={`experiences.${index}.position`}
                      onChange={formik.handleChange}
                      value={experience.position}
                    />
                  </div>

                  <div className={cn(styles.formField)}>
                    <label htmlFor={`experiences.${index}.responsibilities`}>
                      Обязанности и достижения
                    </label>
                    <TextArea
                      name={`experiences.${index}.responsibilities`}
                      onChange={formik.handleChange}
                      value={experience.responsibilities}
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`experiences.${index}.startDate`}>
                      Период работы с:
                    </label>

                    <div className={styles.pickerWrapper}>
                      <span className={styles.workPeriod}>
                        Выбрано - {experience.startDate.month}.
                        {experience.startDate.year}
                      </span>
                      <DatePicker.MonthPicker
                        id={`experiences[${index}].startDate`}
                        name={`experiences[${index}].startDate`}
                        format="MM.YYYY"
                        onChange={(date) =>
                          handleDateChange(
                            `experiences[${index}].startDate`,
                            date
                          )
                        }
                      />
                    </div>

                    <Checkbox
                      name={`experiences[${index}].isCurrent`}
                      onChange={(e) => {
                        formik.setFieldValue(
                          `experiences[${index}].isCurrent`,
                          e.target.checked
                        );
                        updateTotalDuration();
                      }}
                      checked={experience.isCurrent}
                    >
                      По настоящее время
                    </Checkbox>
                  </div>

                  {!experience.isCurrent && (
                    <>
                      <div className={styles.formField}>
                        <label htmlFor={`experiences.${index}.endDate.month`}>
                          по:
                        </label>

                        <div className={styles.pickerWrapper}>
                          <span className={styles.workPeriod}>
                            Выбрано - {experience.endDate.month}.
                            {experience.endDate.year}
                          </span>
                          <DatePicker.MonthPicker
                            id={`experiences[${index}].endDate`}
                            name={`experiences[${index}].endDate`}
                            format="MM.YYYY"
                            onChange={(date) =>
                              handleDateChange(
                                `experiences[${index}].endDate`,
                                date
                              )
                            }
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <AntButton
                    disabled={formik.values.experiences.length < 2}
                    onClick={() => {
                      arrayHelpers.remove(index);
                      updateTotalDuration();
                    }}
                  >
                    Удалить
                  </AntButton>
                </div>
              ))}
              <Link
                className={cn(styles.link)}
                type="button"
                onClick={() => {
                  arrayHelpers.push({
                    organizationName: "",
                    position: "",
                    positionLevel: "",
                    responsibilities: "",
                    startDate: { month: "", year: "" },
                    endDate: { month: "", year: "" },
                    isCurrent: false,
                  });
                  updateTotalDuration();
                }}
              >
                + Добавить еще одно место работы
              </Link>
              <div className={styles.formField}>
                <label htmlFor="recommendations">Общий стаж</label>
                <Input
                  className={styles.totalDuration}
                  name="totalDuration.years"
                  type="number"
                  readOnly
                  value={formik.values.totalDuration.years}
                  placeholder="Общее количество лет"
                  addonAfter="года"
                />
                <Input
                  className={styles.totalDuration}
                  name="totalDuration.months"
                  type="number"
                  readOnly
                  value={formik.values.totalDuration.months}
                  placeholder="Общее количество месяцев"
                  addonAfter="месяцев"
                />
              </div>

              <div className={styles.formField}>
                <div>
                  <label htmlFor="recommendations">Рекомендации</label>
                  <p className={styles.recommendationsDesc}>
                    Eсли у вас есть рекомендации с предыдущих мест работы,
                    укажите название организации и представителя с контактной
                    информацией.
                  </p>
                </div>

                <TextArea
                  name="recommendations"
                  onChange={formik.handleChange}
                  value={formik.values.recommendations}
                  placeholder="Рекомендации"
                />
              </div>
            </>
          )}
        />

        <div className={styles.formActions}>
          <Button onClick={onPrevious}>Назад</Button>
          <Button htmlType="submit">Продолжить</Button>
        </div>
      </form>
    </FormikProvider>
  );
};
