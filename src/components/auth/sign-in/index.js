import {
  Checkbox,
  FormControlLabel,
  NoSsr,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
  CustomTypographyGray,
} from "../../../styled-components/CustomStyles.style";

import { t } from "i18next";
import { CustomTypography } from "../../landing-page/hero-section/HeroSection.style";
import SignInForm from "./SignInForm";
// import AcceptTermsAndConditions from "../../../../pages/auth/AcceptTermsAndConditions";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-manage/api-error-response/ErrorResponses";
import { useSignIn } from "../../../api-manage/hooks/react-query/auth/useSignIn";
import { useVerifyPhone } from "../../../api-manage/hooks/react-query/forgot-password/useVerifyPhone";
import useGetProfile from "../../../api-manage/hooks/react-query/profile/useGetProfile";
import { useWishListGet } from "../../../api-manage/hooks/react-query/wish-list/useWishListGet";
import {
  SettingsConsumer,
  SettingsProvider,
} from "../../../contexts/settings-context";
import { setUser } from "../../../redux/slices/profileInfo";
import { setWishList } from "../../../redux/slices/wishList";
import { setDefaultLanguage } from "../../../utils/setDefaultLanguage";
import {
  SigninSuccessFull,
  loginSuccessFull,
  moduleSelected,
} from "../../../utils/toasterMessages";
import { ModuleSelection } from "../../landing-page/hero-section/module-selection";
import CustomModal from "../../modal";
import AuthHeader from "../AuthHeader";
import OtpForm from "../sign-up/OtpForm";
import SignUpValidation from "./SignInValidation";
import SocialLogins from "./social-login/SocialLogins";
import useGetAllCartList from "../../../api-manage/hooks/react-query/add-cart/useGetAllCartList";
import { setCartDetailsPrice, setCartList } from "../../../redux/slices/cart";
import { getGuestId } from "../../../helper-functions/getToken";
import { handleProductValueWithOutDiscount } from "../../../utils/CustomFunctions";
import { getModule } from "../../../helper-functions/getLanguage";
import { getSelectedVariations } from "../../header/second-navbar/SecondNavbar";

const SignIn = ({ configData }) => {
  //  hooks
  const router = useRouter();
  const previousRouteName = router.query.from;
  const guestId = getGuestId();
  const dispatch = useDispatch();
  const [openModuleSelection, setOpenModuleSelection] = useState(false);
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [otpData, setOtpData] = useState({ phone: "" });
  const [mainToken, setMainToken] = useState(null);
  const [isApiCalling, setIsApiCalling] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const theme = useTheme();
  const textColor = theme.palette.whiteContainer.main;

  //  get data from localstorage

  let userDatafor = undefined;
  if (typeof window !== "undefined") {
    userDatafor = JSON.parse(localStorage.getItem("userDatafor"));
  }
  const getModule = () => {
    return JSON.parse(window.localStorage.getItem("module"));
  };

  let location = undefined;
  let isModuleSelected = undefined;
  let lanDirection = undefined;
  let languageSetting;
  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
    isModuleSelected = JSON.parse(localStorage.getItem("module"));
    lanDirection = JSON.parse(localStorage.getItem("settings"));
    languageSetting = JSON.parse(localStorage.getItem("language-setting"));
  }
  const cartListSuccessHandler = (res) => {
    dispatch(setCartDetailsPrice(res));
    if (res) {
      dispatch(setCartDetailsPrice(res));
      dispatch(setCartList(res?.carts));
    }
  };

  const {
    data,
    refetch: cartListRefetch,
    isLoading,
  } = useGetAllCartList(cartListSuccessHandler);
  const userOnSuccessHandler = (res) => {
    dispatch(setUser(res));
    
  };

  //  handel form validation with formik

  const loginFormik = useFormik({
    initialValues: {
      phone: "",

      tandc: false,
    },
    validationSchema: SignUpValidation(),
    onSubmit: async (values, helpers) => {
      try {
        if (isRemember) {
          localStorage.setItem("userDatafor", JSON.stringify(values));
        }
        formSubmitHandler(values);
      } catch (err) {}
    },
  });

  const handleOnChange = (value) => {
    loginFormik.setFieldValue("phone", value);
  };

  useEffect(() => {
    if (otpData?.phone !== "") {
      setOpenOtpModal(true);
    }
  }, [otpData]);

  const onSuccessHandler = (response) => {
    dispatch(setWishList(response));
    setIsApiCalling(false);
  };

  const { data: userData, refetch: profileRefetch } =
    useGetProfile(userOnSuccessHandler);
  const { refetch: wishlistRefetch, isLoading: isLoadingWishlist } =
    useWishListGet(onSuccessHandler);

  const handleTokenAfterSignUp = async (response) => {
    if (response) {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response?.token);
        await profileRefetch();
        await wishlistRefetch();
      }
      toast.success(t(SigninSuccessFull));
      if (location && !isModuleSelected) {
        setOpenModuleSelection(true);
      } else {
        if (previousRouteName) {
          router.push("/home");
        } else if (previousRouteName === "/order") {
          router.push("/home");
        } else {
          await router.back();
        }
      }
    }
  };
  const handleCloseModuleModal = (item) => {
    if (item) {
      toast.success(t(moduleSelected));
      if (previousRouteName) {
        router.push("/home");
      } else {
        router.back();
      }
    }
    setOpenModuleSelection(false);
  };

  const handleError = () => {
    setIsApiCalling(false);
  };
  const { mutate, isLoading: loadingRequest } = useSignIn(handleError);
  const formSubmitHandler = (values) => {
    setIsApiCalling(true);

    const signInData = {
      phone: `+${values.phone.toString()}`,
      guest_id: guestId,
    };
    mutate(signInData, {
      onSuccess: async (response) => {
        if (configData?.customer_verification) {
          if (Number.parseInt(response?.is_phone_verified) === 1) {
          } else {
            setOtpData({ phone: `+${values.phone}` });
            setMainToken(response);
          }
        } else {
        }
      },
      onError: onErrorResponse,
    });
  };

  const { mutate: otpVerifyMutate, isLoading: isLoadingOtpVerifyApi } =
    useVerifyPhone();
  const otpFormSubmitHandler = (values) => {
    const onSuccessHandler = (res) => {
      handleTokenAfterSignUp(res);
      toast.success(res?.message);
      setOpenOtpModal(false);
    };
    otpVerifyMutate(values, {
      onSuccess: onSuccessHandler,
      onError: onSingleErrorResponse,
    });
  };

  const handleFormBasedOnDirection = () => (
    <SignInForm
      configData={configData}
      handleOnChange={handleOnChange}
      loginFormik={loginFormik}
      lanDirection={lanDirection?.direction}
    />
  );
  const rememberMeHandleChange = (e) => {
    if (e.target.checked) {
      setIsRemember(true);
    } else {
      localStorage.removeItem("userDatafor");
    }
  };

  return (
    <>
      <NoSsr>
        <CustomStackFullWidth
          justifyContent="center"
          alignItems="center"
          pb="80px"
          mt="30px"
        >
          <Box maxWidth="500px" width="100%">
            <CustomPaperBigCard>
              <CustomStackFullWidth spacing={2}>
                <AuthHeader configData={configData} title={t("Sign In")} />
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={loginFormik.handleSubmit}
                >
                  <CustomStackFullWidth spacing={2}>
                    {handleFormBasedOnDirection()}
                    <CustomStackFullWidth
                      justifyContent="space-between"
                      alignItems="center"
                      direction="row"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="remember"
                            color="primary"
                            onChange={rememberMeHandleChange}
                          />
                        }
                        label={
                          <CustomTypography fontSize="14px">
                            {t("Remember me")}
                          </CustomTypography>
                        }
                      />
                      {/* <Link href="/forgot-password">
                        {t("Forgot password?")}
                      </Link> */}
                    </CustomStackFullWidth>
                    {/*<AcceptTermsAndConditions*/}
                    {/*  handleCheckbox={handleCheckbox}*/}
                    {/*  formikType={loginFormik}*/}
                    {/*/>*/}
                    <CustomStackFullWidth spacing={2}>
                      <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={loadingRequest}
                        sx={{ color: textColor }}
                      >
                        {t("Sign In")}
                      </LoadingButton>
                      {configData?.social_login?.length > 0 &&
                        configData?.social_login?.some(
                          (item) => item.status === true
                        ) && (
                          <CustomStackFullWidth
                            alignItems="center"
                            justifyContent="center"
                            spacing={1}
                          >
                            <CustomTypographyGray nodefaultfont="true">
                              {t("Or")}
                            </CustomTypographyGray>
                            <CustomTypography>
                              {t("Login with")}
                            </CustomTypography>
                            <SocialLogins
                              socialLogin={configData?.social_login}
                            />
                          </CustomStackFullWidth>
                        )}

                      <Typography
                        sx={{
                          a: {
                            "&:hover": {
                              letterSpacing: "0.03em",
                            },
                          },
                        }}
                      >
                        {t("Don't have an account?")}{" "}
                        <Link
                          href="/auth/sign-up"
                          style={{
                            color: theme.palette.primary.main,
                            textDecoration: "underline",
                          }}
                        >
                          {t("Sign Up")}
                        </Link>
                      </Typography>
                    </CustomStackFullWidth>
                  </CustomStackFullWidth>
                </form>
              </CustomStackFullWidth>
            </CustomPaperBigCard>
          </Box>
        </CustomStackFullWidth>
      </NoSsr>
      {openModuleSelection && (
        <ModuleSelection
          location={location}
          closeModal={handleCloseModuleModal}
          disableAutoFocus
        />
      )}
      <CustomModal
        handleClose={() => setOpenOtpModal(false)}
        openModal={openOtpModal}
      >
        <OtpForm
          data={otpData}
          formSubmitHandler={otpFormSubmitHandler}
          isLoading={isLoadingOtpVerifyApi}
        />
      </CustomModal>
    </>
  );
};

export default SignIn;
