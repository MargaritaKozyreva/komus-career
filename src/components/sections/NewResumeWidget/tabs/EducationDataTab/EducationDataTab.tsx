import { useFormik, FormikProvider, FieldArray } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { educationsDataModel } from "../../../../../entities/NewResume";
import { AppDispatch } from "../../../../../state/store";

import { Button as AntButton, Select } from "antd";
import styles from "./EducationDataTab.module.scss";
import { Input, Link } from "@komus/design";
import TextArea from "antd/es/input/TextArea";
import { useResume } from "../../../../../entities/NewResume/ResumeContext";

const { Option } = Select;

export const EducationDataTab: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const resumeContext = useResume(); // Use the context hook

  const formik = useFormik({
    initialValues: resumeContext
      ? resumeContext.resumeData.educationData
      : {
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
    onSubmit: (values, { setSubmitting }) => {
      dispatch(educationsDataModel.actions.addEducationData(values as any))
        .unwrap()
        .then(() => {
          if (resumeContext) {
            resumeContext.setResumeData((prevData) => ({
              ...prevData,
              educationData: values,
            }));
          }
          navigate("/create-resume/params");
        })
        .catch((error) => {
          console.error("Submission error", error);
        })
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <FieldArray
          name="educations"
          render={({ remove, push }) => (
            <>
              {formik.values.educations.map((education, index) => (
                <div key={index} className={styles.borderBlock}>
                  <div className={styles.formGroup}>
                    <label htmlFor={`educations.${index}.institution`}>
                      Учебное заведение
                    </label>
                    <Input
                      name={`educations.${index}.institution`}
                      onChange={formik.handleChange}
                      value={education.institution}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={`educations.${index}.educationLevel`}>
                      Уровень образования
                    </label>
                    <Select
                      id={`educations.${index}.educationLevel`}
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        formik.setFieldValue(
                          `educations.${index}.educationLevel`,
                          value
                        )
                      }
                      value={education.educationLevel}
                    >
                      <Option value="Высшее">Высшее</Option>
                      <Option value="Среднее">Среднее</Option>
                      <Option value="Другое">Другое</Option>
                    </Select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={`educations.${index}.specialization`}>
                      Специальность
                    </label>
                    <Input
                      name={`educations.${index}.specialization`}
                      onChange={formik.handleChange}
                      value={education.specialization}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={`educations.${index}.graduationYear`}>
                      Год окончания
                    </label>
                    <Input
                      name={`educations.${index}.graduationYear`}
                      onChange={formik.handleChange}
                      value={education.graduationYear}
                    />
                  </div>

                  <AntButton htmlType="button" onClick={() => remove(index)}>
                    Удалить
                  </AntButton>
                </div>
              ))}
              <Link
                type="button"
                onClick={() =>
                  push({
                    educationLevel: "",
                    institution: "",
                    specialization: "",
                    graduationYear: "",
                  })
                }
              >
                + Добавить еще одно учебное заведение
              </Link>
            </>
          )}
        />

        <div className={styles.formGroup}>
          <label htmlFor="additionalInfo">Дополнительная информация</label>
          <TextArea
            id="additionalInfo"
            name="additionalInfo"
            onChange={formik.handleChange}
            value={formik.values.additionalInfo}
          />
        </div>

        <div className={styles.formActions}>
          <AntButton onClick={() => navigate("/create-resume/skills")}>
            Назад
          </AntButton>
          <AntButton htmlType="submit">Продолжить</AntButton>
        </div>
      </form>
    </FormikProvider>
  );
};
