import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomTextFieldWithFormik from "../../form-fields/CustomTextFieldWithFormik";
import CustomPhoneInput from "../../custom-component/CustomPhoneInput";
import { t } from "i18next";
import { NoSsr } from "@mui/material";
import { getLanguage } from "../../../helper-functions/getLanguage";

const SignUpForm = ({
  configData,
  handleOnChange,
  FNameHandler,
  LNameHandler,
  isLoading,
  signUpFormik,
}) => {
  const lanDirection = getLanguage() ? getLanguage() : "ltr";
  return (
    <NoSsr>
      <CustomStackFullWidth alignItems="center" spacing={{ xs: 3, md: 4 }}>
      <CustomTextFieldWithFormik
          required
          label={t("First Name")}
          touched={signUpFormik.touched.f_name}
          errors={signUpFormik.errors.f_name}
          fieldProps={signUpFormik.getFieldProps("f_name")}
          onChangeHandler={FNameHandler}
          value={signUpFormik.values.f_name}
        />
        <CustomTextFieldWithFormik
          required
          label={t("Last Name")}
          touched={signUpFormik.touched.l_name}
          errors={signUpFormik.errors.l_name}
          fieldProps={signUpFormik.getFieldProps("l_name")}
          onChangeHandler={LNameHandler}
          value={signUpFormik.values.l_name}
        />

        <CustomPhoneInput
          isLoading={isLoading}
          value={signUpFormik.values.phone}
          onHandleChange={handleOnChange}
          initCountry={configData?.country}
          touched={signUpFormik.touched.phone}
          errors={signUpFormik.errors.phone}
          lanDirection={lanDirection}
        />
      </CustomStackFullWidth>
    </NoSsr>
  );
};

export default SignUpForm;
