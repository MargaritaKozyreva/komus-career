import { useFormik, FormikProvider } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paramsDataModel } from "../../../../../entities/NewResume";
import { AppDispatch } from "../../../../../state/store";

import { Button, Radio, Select } from "antd";
import styles from "./ParamsDataTab.module.scss";
import { ResumeVisibility } from "../../../../../types/newResume";
import { useResume } from "../../../../../entities/NewResume/ResumeContext";

import cn from "classnames";

const { Option } = Select;

export const ParamsDataTab: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const resumeContext = useResume(); // Use the context hook

  const formik = useFormik({
    initialValues: resumeContext
      ? resumeContext.resumeData.paramsData
      : {
          activityDuration: "",
          resumeVisibility: ResumeVisibility.NoOne,
        },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(paramsDataModel.actions.addParamsData(values as any))
        .unwrap()
        .then(() => {
          if (resumeContext) {
            resumeContext.setResumeData((prevData) => ({
              ...prevData,
              paramsData: values,
            }));
          }
          navigate("/create-resume/preview");
        })
        .catch((error) => {
          console.error("Submission error", error);
        })
        .finally(() => setSubmitting(false));
    },
  });

  const visibilityOptions = [
    {
      label: ResumeVisibility.NoOne,
      value: ResumeVisibility.NoOne,
      description:
        "Наиболее конфиденциальный вариант настроек видимости. Ваше резюме будет недоступно для просмотра всем работодателям и кадровым агентствам, а также не будет выводиться в результатах поиска по базе данных. Вы сможете откликаться таким резюме на заинтересовавшие вас вакансии сайта HeadHunter. При отклике на конкретную вакансию компании «N», настройки видимости вашего резюме автоматически изменятся на «Не видно никому, кроме: компания «N».",
    },
    {
      label: ResumeVisibility.DepartmentOnly,
      value: ResumeVisibility.DepartmentOnly,
      description:
        "Ваше резюме будет доступно для просмотра всем компаниям и кадровым агентствам, которые зарегистрированы на HeadHunter, за исключением тех, которые вы отметите в специальном окне. Таким резюме вы сможете откликаться на все вакансии сайта HeadHunter, однако те компании, которым вы запретили просматривать свое резюме, не будут иметь к нему доступ через поиск по базе данных и по прямой ссылке. При отклике на конкретную вакансию компании «N», внесенной вами в stop-список, настройки видимости вашего резюме автоматически изменятся, и компания «N» удалится из stop-списка.",
    },
    {
      label: ResumeVisibility.ManagementOnly,
      value: ResumeVisibility.ManagementOnly,
      description:
        "Ваше резюме будет доступно для просмотра всем компаниям и кадровым агентствам, которые зарегистрированы на HeadHunter, за исключением тех, которые вы отметите в специальном окне. Таким резюме вы сможете откликаться на все вакансии сайта HeadHunter, однако те компании, которым вы запретили просматривать свое резюме, не будут иметь к нему доступ через поиск по базе данных и по прямой ссылке. При отклике на конкретную вакансию компании «N», внесенной вами в stop-список, настройки видимости вашего резюме автоматически изменятся, и компания «N» удалится из stop-списка.",
    },
    {
      label: ResumeVisibility.Everyone,
      value: ResumeVisibility.Everyone,
      description:
        "Оптимальный вариант, рекомендуемый для кандидатов в состоянии активного поиска работы. Ваше резюме будет доступно для просмотра всем компаниям и кадровым агентствам, которые зарегистрированы на HeadHunter.",
    },
  ];

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={cn(styles.formGroup, styles.wrap)}>
          <label htmlFor="activityDuration">Срок активности</label>
          <Select
            style={{ width: "100%" }}
            id="activityDuration"
            onChange={(value) =>
              formik.setFieldValue("activityDuration", value)
            }
            value={formik.values.activityDuration}
          >
            <Option value="1 месяц">1 месяц</Option>
            <Option value="3 месяца">3 месяца</Option>
            <Option value="6 месяцев">6 месяцев</Option>
            <Option value="1 год">1 год</Option>
          </Select>
        </div>

        <div className={styles.formGroup}>
          <label>Видимость резюме</label>
          <div style={{ marginBottom: '10px'}}></div>
          <Radio.Group
            name="resumeVisibility"
            onChange={formik.handleChange}
            value={formik.values.resumeVisibility}
          >
            {visibilityOptions.map((option) => (
              <div key={option.value} className={styles.radioOption}>
                <Radio value={option.value}>{option.label}</Radio>
                <div className={styles.radioDescription}>
                  {option.description}
                </div>
              </div>
            ))}
          </Radio.Group>
        </div>

        <div className={styles.formActions}>
          <Button onClick={() => navigate("/create-resume/education")}>
            Назад
          </Button>
          <Button htmlType="submit">Продолжить</Button>
        </div>
      </form>
    </FormikProvider>
  );
};
