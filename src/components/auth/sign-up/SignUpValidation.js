import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const SignUpValidation = () => {
  const { t } = useTranslation();

  return Yup.object({
    name: Yup.string().required(t("name is required")),
    // l_name: Yup.string().required(t("Last name is required")),
    // email: Yup.string()
    //   .email(t("Must be a valid email"))
    //   .max(255)
    //   .required(t("Email is required")),
    phone: Yup.string()
      .required(t("Please give a phone number"))
      .min(12, t("number must be 12 digits"))
      .matches(
        /^(201|01|00201)[0-2,5]{1}[0-9]{8}$|^(009665|9665|9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
        t("The phone format is invalid.")
      ),
    // password: Yup.string().min(
    //   6,
    //   t("Password is too short - should be 6 chars minimum.")
    // ),
    // confirm_password: Yup.string()
    //   .required(t("Confirm Password"))
    //   .oneOf([Yup.ref("password"), null], t("Passwords must match")),
    //tandc: Yup.boolean().oneOf([true], "Message"),
  });
};

export default SignUpValidation;
