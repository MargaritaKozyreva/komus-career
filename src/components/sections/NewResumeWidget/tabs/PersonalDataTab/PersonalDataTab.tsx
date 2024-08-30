import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { personalDataModel } from "../../../../../entities/NewResume";
import { AppDispatch } from "../../../../../state/store";
import {
  Gender,
  MaritalStatus,
  NewResumePersonalDataType,
} from "../../../../../types/newResume";
import { Button, Checkbox, Form } from "antd";
import { Input, Upload } from "@komus/design";
import styles from "./PersonalDataTab.module.scss";
import cn from "classnames";
import { useResume } from "../../../../../entities/NewResume/ResumeContext";
import moment from "moment";
import { uploadPhoto } from "../../../../../api/photoUpload";
import { useEffect } from "react";

type PersonalDataTabProps = {
  onNext: () => void;
  onPrevious?: () => void;
};

export const PersonalDataTab: React.FC<PersonalDataTabProps> = ({
  onNext,
  onPrevious,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const resumeContext = useResume(); 

  // Call the hook unconditionally
  const formik = useFormik({
    initialValues: resumeContext
      ? resumeContext.resumeData.personalData
      : {
          fatherName: "",
          lastName: "",
          firstName: "",
          regionOfResidence: "",
          gender: "male",
          birthDate: "",
          isHiddenBirthDate: false,
          isShowYearBirthDate: false,
          maritalStatus: "unspecified",
          citizenship: "Россия",
          subwayStation: "",
          address: "",
          phone: "",
          additionalPhone: "",
          email: "",
          photo: "",
          telegram: "",
        },
    onSubmit: async (values, { setSubmitting }) => {
      const formattedValues = {
        ...values,
        birthDate: moment(values.birthDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
      };
      // Upload photo if it's a file object
      // if (
      //   values.photo &&
      //   typeof values.photo === "object" &&
      //   "name" in values.photo
      // ) {
      //   try {
      //     const photoURL = await uploadPhoto(values.photo);
      //     values.photo = photoURL;
      //   } catch (error) {
      //     console.error("Photo upload error:", error);
      //     setSubmitting(false);
      //     return;
      //   }
      // }

      dispatch(
        personalDataModel.actions.addPersonalData(
          formattedValues as NewResumePersonalDataType
        )
      )
        .unwrap()
        .then(() => {
          if (resumeContext) {
            resumeContext.setResumeData((prevData: any) => ({
              ...prevData,
              personalData: formattedValues,
            }));
          }
          onNext();
        })
        .catch((error) => {
          console.error("Submission error", error);
        })
        .finally(() => setSubmitting(false));
    },
  });

  const handleShowBirthDateChange = (e: any) => {
    formik.setFieldValue("isHiddenBirthDate", e.target.checked);

    if (!e.target.checked) {
      formik.setFieldValue("birthDate", "");
      formik.setFieldValue("isShowYearBirthDate", false);
    }
  };

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  if (!resumeContext) {
    return <div>Loading...</div>;
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handlePhotoChange = (info: any) => {
    if (info.fileList.length > 0) {
      // const file = info.fileList[0].originFileObj;
      // formik.setFieldValue("photo", file);

      const file = info.fileList[0].originFileObj;
      const photoURL = URL.createObjectURL(file);
      formik.setFieldValue("photo", photoURL);
    } else {
      formik.setFieldValue("photo", "");
    }
  };

  const genderOptions: { value: Gender; label: string }[] = [
    { value: Gender.Male, label: "Мужской" },
    { value: Gender.Female, label: "Женский" },
    { value: Gender.Unspecified, label: "Не указано" },
  ];

  const maritalStatusOptions: { value: MaritalStatus; label: string }[] = [
    { value: MaritalStatus.Single, label: "Холост (не замужем)" },
    { value: MaritalStatus.Married, label: "Женат (замужем)" },
    { value: MaritalStatus.Unspecified, label: "Не указано" },
  ];

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={cn(styles.inputGroup, styles.formField)}>
        <label htmlFor="lastName">Фамилия</label>
        <Input
          required
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
      </div>

      <div className={cn(styles.inputGroup, styles.formField)}>
        <label htmlFor="firstName">Имя</label>
        <Input
          required
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
      </div>

      <div className={cn(styles.inputGroup, styles.formField)}>
        <label htmlFor="fatherName">Отчество</label>
        <Input
          id="fatherName"
          name="fatherName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.fatherName}
        />
      </div>

      {/* Пол */}
      <div
        className={cn(styles.genderGroup, styles.formField)}
        role="group"
        aria-labelledby="gender-group"
      >
        <label className={styles.genderGroupLabel} htmlFor="gender">
          Пол
        </label>
        <div className={styles.genderGroupWrapper}>
          {genderOptions.map((option) => (
            <label key={option.value} className={styles.radioLabel}>
              <Input
                type="radio"
                name="gender"
                value={option.value}
                checked={formik.values.gender === option.value}
                onChange={formik.handleChange}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Дата рождения */}
      <div className={cn(styles.inputGroup, styles.formField)}>
        <div className={cn(styles.birthDayGroup)}>
          <label htmlFor="birthDate">Дата рождения</label>
          <div className={cn(styles.birthMargin)}>
            {!formik.values.isHiddenBirthDate && (
              <div className={cn(styles.checkboxGroup)}>
                <div className={cn(styles.inputGroup, styles.formField)}>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.birthDate}
                  />
                </div>
                <div>
                  <Checkbox
                    name="isShowYearBirthDate"
                    onChange={(e) =>
                      formik.setFieldValue(
                        "isShowYearBirthDate",
                        e.target.checked
                      )
                    }
                    checked={formik.values.isShowYearBirthDate}
                  >
                    Не показывать год рождения
                  </Checkbox>
                </div>
              </div>
            )}

            <Checkbox
              name="isHiddenBirthDate"
              onChange={handleShowBirthDateChange}
              checked={formik.values.isHiddenBirthDate}
            >
              Не показывать дату рождения
            </Checkbox>
          </div>
        </div>
      </div>

      {/* Семейное положение */}
      <div
        className={cn(
          styles.maritalStatusGroup,
          styles.inputGroup,
          styles.formField
        )}
      >
        <label
          htmlFor="maritalStatus"
          className={styles.maritalStatusGroupLabel}
        >
          Семейное положение
        </label>
        <div className={styles.maritalStatusGroupWrapper}>
          {maritalStatusOptions.map((option) => (
            <label key={option.value} className={styles.radioLabel}>
              <Input
                type="radio"
                name="maritalStatus"
                value={option.value}
                checked={formik.values.maritalStatus === option.value}
                onChange={formik.handleChange}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Гражданство */}
      <div className={cn(styles.inputGroup, styles.formField)}>
        <label htmlFor="citizenship">Гражданство</label>
        {/* <select
          id="citizenship"
          name="citizenship"
          onChange={formik.handleChange}
          value={formik.values.citizenship}
        >
          {citizenshipOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select> */}

        <Input
          id="citizenship"
          name="citizenship"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.citizenship}
        />
      </div>

      {/* Регион проживания */}
      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="regionOfResidence">Регион проживания</label>
        <Input
          required
          id="regionOfResidence"
          name="regionOfResidence"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.regionOfResidence}
        />
      </div>

      {/* Ближайшее метро */}
      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="subwayStation">Ближайшее метро</label>
        <Input
          id="subwayStation"
          name="subwayStation"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.subwayStation}
        />
      </div>

      {/* Адрес */}
      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="address">Адрес</label>
        <Input
          id="address"
          name="address"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
      </div>

      {/* Мобильный телефон */}
      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="phone">Мобильный телефон</label>
        <Input
          required
          id="phone"
          name="phone"
          type="tel"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
      </div>

      {/* Домашний телефон */}
      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="additionalPhone">Домашний телефон</label>
        <Input
          id="additionalPhone"
          name="additionalPhone"
          type="tel"
          onChange={formik.handleChange}
          value={formik.values.additionalPhone}
        />
      </div>

      {/* Электронная почта */}
      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="email">Электронная почта</label>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>

      {/* Telegram */}
      <div className={cn(styles.formField, styles.formGroup)}>
        <label htmlFor="email">Telegram</label>
        <Input
          id="telegram"
          name="telegram"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.telegram}
        />
      </div>

      {/* Фотография */}
      <div className={cn(styles.inputGroup, styles.formField)}>
        <label htmlFor="photo">Ваша фотография</label>
        <div className={styles.wrap}>
          <Form.Item
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload
              description={
                "Файл может быть в формате jpg, png, gif и объемом не более 10 Мегабайт"
              }
              beforeUpload={() => false} // Предотвращаем автоматическую загрузку файла
              onChange={handlePhotoChange}
            ></Upload>
          </Form.Item>
          <div className={styles.photoHint}>
            {/* <div className={styles.checkbox}></div> */}
            <span className={styles.hintText}>
              Если Вы хотите найти хорошую работу, обязательно прикрепите к
              своему резюме фотографию.
            </span>
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        {onPrevious && <Button onClick={onPrevious}>Назад</Button>}
        <Button
          type="default"
          htmlType="submit"
          disabled={formik.isSubmitting}
          className={styles.submitButton}
        >
          Продолжить
        </Button>
      </div>
    </form>
  );
};
