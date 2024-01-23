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
  NameHandler,
  isLoading,
  signUpFormik,
}) => {
  const lanDirection = getLanguage() ? getLanguage() : "ltr";
  return (
    <NoSsr>
      <CustomStackFullWidth alignItems="center" spacing={{ xs: 3, md: 4 }}>
        <CustomTextFieldWithFormik
          required
          label={t("Name")}
          touched={signUpFormik.touched.name}
          errors={signUpFormik.errors.name}
          fieldProps={signUpFormik.getFieldProps("name")}
          onChangeHandler={NameHandler}
          value={signUpFormik.values.name}
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
