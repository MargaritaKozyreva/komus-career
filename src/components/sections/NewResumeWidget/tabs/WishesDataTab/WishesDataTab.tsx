import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { wishesDataModel } from "../../../../../entities/NewResume";
import { AppDispatch } from "../../../../../state/store";
import {
  NewResumeWishesDataType,
  SalaryPeriod,
  SalaryCurrency,
  Schedule,
} from "../../../../../types/newResume";
import { Input } from "@komus/design";
import { Button } from "antd";

import styles from "./WishesDataTab.module.scss";
import cn from "classnames";
import { Select } from "antd";
import { useResume } from "../../../../../entities/NewResume/ResumeContext";

type WishesDataTabProps = {
  handleGoBack: () => void;
};

export const WishesDataTab: React.FC<WishesDataTabProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const resumeContext = useResume(); // Use the context hook

  const formik = useFormik<NewResumeWishesDataType>({
    initialValues: resumeContext
      ? resumeContext.resumeData.wishesData
      : {
          position: "",
          salary: 0,
          salaryPeriod: SalaryPeriod.Monthly,
          salaryCurrency: SalaryCurrency.Rub,
          positionLevel: "",
          employmentType: Schedule.Office,
          keySkills: [],
        },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(wishesDataModel.actions.addWishesData(values))
        .unwrap()
        .then(() => {
          if (resumeContext) {
            resumeContext.setResumeData((prevData) => ({
              ...prevData,
              wishesData: {
                ...values,
              },
            }));
          }
          navigate("/create-resume/experience");
        })
        .catch((error) => {
          console.error("Submission error", error);
        })
        .finally(() => setSubmitting(false));
    },
  });

  const salaryPeriodOptions: { value: SalaryPeriod; label: string }[] = [
    { value: SalaryPeriod.Annually, label: "в год" },
    { value: SalaryPeriod.Daily, label: "в день" },
    { value: SalaryPeriod.Hourly, label: "в час" },
    { value: SalaryPeriod.Monthly, label: "в месяц" },
    { value: SalaryPeriod.Weekly, label: "в неделю" },
  ];

  const salaryCurrencysOptions: { value: SalaryCurrency; label: string }[] = [
    { value: SalaryCurrency.Rub, label: "рубли" },
    { value: SalaryCurrency.Dollar, label: "доллары" },
    { value: SalaryCurrency.Euro, label: "евро" },
  ];

  const schedulesOptions: { value: Schedule; label: string }[] = [
    { value: Schedule.Remote, label: "удаленно" },
    { value: Schedule.Office, label: "в офисе" },
  ];

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="position">Желаемая должность</label>
        <Input
          required
          id="position"
          name="position"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.position}
        />
      </div>

      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="salary">Зарплата (от) </label>
        <div className={cn(styles.salary)}>
          <Input
            id="salary"
            name="salary"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.salary}
          />
          <Select
            aria-required
            id="salaryCurrency"
            style={{ width: "100%" }}
            className={styles.customSelect}
            onChange={(value) => formik.setFieldValue("salaryCurrency", value)}
            options={salaryCurrencysOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            value={formik.values.salaryCurrency} // bind the value to formik
          />
          <Select
            id="salaryPeriod"
            style={{ width: "100%" }}
            onChange={(value) => formik.setFieldValue("salaryPeriod", value)}
            className={styles.customSelect}
            options={salaryPeriodOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            value={formik.values.salaryPeriod} // bind the value to formik
          />
        </div>
      </div>

      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="positionLevel">Уровень должности</label>
        <Input
          id="positionLevel"
          name="positionLevel"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.positionLevel}
        />
      </div>

      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="employmentType">График работы</label>
        <Select
          id="employmentType"
          style={{ width: "100%" }}
          onChange={(value) => formik.setFieldValue("employmentType", value)}
          className={styles.customSelect}
          options={schedulesOptions.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          value={formik.values.employmentType} // bind the value to formik
        />
      </div>

      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="keySkills">Ключевые слова</label>
        <Input
          id="keySkills"
          name="keySkills"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.keySkills}
        />
      </div>

      <div className={styles.formActions}>
        <Button onClick={() => navigate("/create-resume/personal-data")}>
          Назад
        </Button>
        <Button htmlType="submit">Продолжить</Button>
      </div>
    </form>
  );
};
