import { useFormik, FormikProvider, FieldArray } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { skillsDataModel } from "../../../../../entities/NewResume";
import { AppDispatch } from "../../../../../state/store";
import {
  NewResumeSkillsDataType,
  DriverLicenseCategoryType,
} from "../../../../../types/newResume";
import { Input, Link, Upload } from "@komus/design";
import {
  Button as AntButton,
  Checkbox,
  Select,
  Upload as AntUpload,
  Form,
  Button,
} from "antd";
import styles from "./SkillsDataTab.module.scss";
import cn from "classnames";
import { httpService } from "../../../../../api/service/service";
import TextArea from "antd/es/input/TextArea";
import { useResume } from "../../../../../entities/NewResume/ResumeContext";

const { Option } = Select;

export const SkillsDataTab: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const resumeContext = useResume(); // Use the context hook

  const formik = useFormik<NewResumeSkillsDataType>({
    initialValues: resumeContext
      ? resumeContext.resumeData.skillsData
      : {
          uniqueSkills: "",
          languages: [
            {
              language: "",
              level: "",
            },
          ],
          driverLicense: [] as DriverLicenseCategoryType[],
          hasOwnCar: false,
          documents: [] as any[],
        },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(skillsDataModel.actions.addSkillsData(values))
        .unwrap()
        .then(() => {
          if (resumeContext) {
            resumeContext.setResumeData((prevData) => ({
              ...prevData,
              skillsData: values,
            }));
          }
          navigate("/create-resume/education");
        })
        .catch((error) => {
          console.error("Submission error", error);
        })
        .finally(() => setSubmitting(false));
    },
  });

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const customRequest = async ({
    file,
    onSuccess,
    onError,
    onProgress,
  }: {
    file: any;
    onSuccess: any;
    onError: any;
    onProgress: any;
  }) => {
    const fmData = new FormData();
    const config: any = {
      headers: { "content-type": "multipart/form-data" },
    };
    fmData.append("file", file);

    try {
      const res = await httpService("POST", "upload_photo", "", fmData, config);

      if (res.status === 200) {
        onSuccess(res.data, file);
      } else {
        onError(new Error("Error in upload"), {
          uid: file.uid,
        });
        console.error(`Error uploading image: ${res.status}`);
      }
    } catch (error) {
      onError(new Error("Error in upload"), {
        uid: file.uid,
      });
      console.error(`Error uploading image: ${error}`);
    }
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={cn(styles.formField)}>
          <label htmlFor="uniqueSkills">
            Если вы владеете специфическими навыками, обязательно напишите о
            них!
          </label>
          <TextArea
            id="uniqueSkills"
            name="uniqueSkills"
            onChange={formik.handleChange}
            value={formik.values.uniqueSkills}
            placeholder="Опишите ваши уникальные навыки"
          />
        </div>

        <FieldArray
          name="languages"
          render={(arrayHelpers) => (
            <div className={styles.languageBlock}>
              {formik.values.languages.map((language, index) => (
                <div key={index} className={styles.borderBlock}>
                  <div className={cn(styles.formField, styles.inputGroup)}>
                    <label htmlFor={`languages.${index}.language`}>Язык</label>
                    <Input
                      name={`languages.${index}.language`}
                      onChange={formik.handleChange}
                      value={language.language}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label htmlFor={`languages.${index}.level`}>Уровень</label>
                    <Select
                      style={{ width: "100%" }}
                      className={styles.customSelect}
                      id={`languages.${index}.level`}
                      onChange={(value) =>
                        formik.setFieldValue(`languages.${index}.level`, value)
                      }
                      value={language.level}
                    >
                      <Option value="beginner">Начальный</Option>
                      <Option value="intermediate">Средний</Option>
                      <Option value="advanced">Продвинутый</Option>
                      <Option value="native">Носитель</Option>
                    </Select>
                  </div>
                  <AntButton
                    onClick={() => arrayHelpers.remove(index)}
                    disabled={formik.values.languages.length < 2}
                  >
                    Удалить
                  </AntButton>
                </div>
              ))}
              <Link
                className={cn(styles.link)}
                type="button"
                onClick={() => arrayHelpers.push({ language: "", level: "" })}
              >
                + Добавить язык
              </Link>
            </div>
          )}
        />

        <div className={cn(styles.formField, styles.driverLicense)}>
          <label htmlFor="driverLicense">
            Выберите категории водительских прав
          </label>
          <Checkbox.Group
            name="driverLicense"
            style={{ marginRight: "30px" }}
            options={[
              { label: "A", value: DriverLicenseCategoryType.A },
              { label: "B", value: DriverLicenseCategoryType.B },
              { label: "C", value: DriverLicenseCategoryType.C },
              { label: "D", value: DriverLicenseCategoryType.D },
              { label: "E", value: DriverLicenseCategoryType.E },
            ]}
            onChange={(checkedValues) =>
              formik.setFieldValue("driverLicense", checkedValues)
            }
            value={formik.values.driverLicense}
          />

          <div>
            <Checkbox
              name="hasOwnCar"
              style={{ width: "100%" }}
              onChange={formik.handleChange}
              checked={formik.values.hasOwnCar}
            >
              Есть собственный автомобиль
            </Checkbox>
          </div>
        </div>

        <div className={styles.formField}>
          <label htmlFor="documents">Прикрепленные документы</label>

          <Form.Item
            name="documents"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload
              description={
                "Файл может быть в формате jpg, png, gif и объемом не более 10 Мегабайт"
              }
              action="https://sdo.komus.net/komus_career_app/api/controller.html?action=upload_documents"
              name="documents"
              fileList={formik.values.documents}
              listType="picture"
              beforeUpload={() => false} // Предотвращаем автоматическую загрузку файла
              onChange={(info) => {

                console.log( info.fileList)
                if (info.fileList.length > 0) {
                  // Обновляем поле формы с файлом
                  formik.setFieldValue("documents", info.fileList);
                } else {
                  formik.setFieldValue("documents", []);
                }
              }}
            >
              <AntButton>Выбрать файл</AntButton>
            </Upload>
          </Form.Item>
          <p>
            Файл может быть в формате jpg, png, gif и объемом не более 10
            Мегабайт
          </p>
        </div>

        <div className={styles.formActions}>
          <Button onClick={() => navigate("/create-resume/experience")}>
            Назад
          </Button>
          <Button htmlType="submit">Продолжить</Button>
        </div>
      </form>
    </FormikProvider>
  );
};
