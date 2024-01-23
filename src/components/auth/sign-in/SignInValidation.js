import React from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const SignUpValidation = () => {
  const { t } = useTranslation();
  const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
  };
  return Yup.object({
    phone: Yup.string()
      .required(t("Please give a phone number"))
      .min(12, t("number must be 12 digits"))
      .matches(
        /^(201|01|00201)[0-2,5]{1}[0-9]{8}$|^(009665|9665|9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
        t("The phone format is invalid.")
      ),
    // password: Yup.string()
    //   //.min(8, t("Password is too short - should be 8 chars minimum."))
    //   .required(t("Password is required"))
    // .matches(/[0-9]/, getCharacterValidationError("digit"))
    //  .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    //  .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    // .matches(/[`!@#$%^&*(),.?":{}|<>]/, getCharacterValidationError("symbol")),
    // tandc: Yup.boolean().oneOf([true], 'Message'),
    // termsOfService:Yup.boolean()
    //     .oneOf([true], "You must accept the terms and conditions").required(t("Password is required"))
  });
};

export default SignUpValidation;
