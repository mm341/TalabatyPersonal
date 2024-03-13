import React, { useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { CalculationGrid, TotalGrid } from "../CheckOut.style";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import CustomDivider from "../../CustomDivider";

import { getAmountWithSign } from "../../../helper-functions/CardHelpers";

const OrderCalculation = (props) => {
  //  props
  const {
    cartList,
    storeData,
    couponDiscount,

    configData,
    orderType,

    usePartialPayment,
    walletBalance,

    payableAmount,
  } = props;
  //  hooks
  const theme = useTheme();
  const { t } = useTranslation();

  //  selectors
  const {
    item_price,
    total,
    discount,
    delivery_charge,
    tips,
    tax,
    coupon_discount_amount,
    addon_price,
    sub_total,
    variation_price,
  } = useSelector((state) => state.cart);
  const { couponInfo } = useSelector((state) => state.profileInfo);

  //  get language direction from localstorage

  let language=undefined
  if(typeof window !=="undefined"){
    language=localStorage.getItem("language-setting")
  }
  
  return (
    <>
      <CalculationGrid container item md={12} xs={12} spacing={1} mt="1rem">
        <Grid item md={8} xs={8}>
          {cartList.length > 1 ? t("Items Price") : t("Item Price")}
        </Grid>
        <Grid item md={4} xs={4} align="right">
          <Typography textTransform="capitalize" align="right">
            {item_price} {configData?.currency_symbol}
          </Typography>
        </Grid>
        {variation_price > 0 ? (
          <>
            <Grid item md={8} xs={8}>
              {t("Variation Price")}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              <Typography textTransform="capitalize" align="right">
                {variation_price} {configData?.currency_symbol}
              </Typography>
            </Grid>
          </>
        ) : null}

        {discount > 0 ? (
          <>
            <Grid item md={8} xs={8}>
              {t("Discount")}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              <Stack
                width="100%"
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.5}
              >
                <Typography>{"(-)"}</Typography>
                <Typography>
                  {discount ? `${discount} ${configData?.currency_symbol}` : null}
                </Typography>
              </Stack>
            </Grid>
          </>
        ) : null}
        <Grid item md={8} xs={8}>
          {t("Subtotal")}
        </Grid>
        <Grid item md={4} xs={4} align="right">
          <Typography textTransform="capitalize" align="right">
            {sub_total} {configData?.currency_symbol}
          </Typography>
        </Grid>
        {addon_price > 0 ? (
          <>
            <Grid item md={8} xs={8}>
              {t("Addons Price")}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              <Typography textTransform="capitalize" align="right">
                {addon_price} {configData?.currency_symbol}
              </Typography>
            </Grid>
          </>
        ) : null}

        {couponInfo ? (
          <>
            <Grid item md={8} xs={8}>
              {t("Coupon Discount")}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              {couponInfo?.coupon_type === "free_delivery" ? (
                <Typography textTransform="capitalize">
                  {t("Free Delivery")}
                </Typography>
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={0.5}
                >
                  <Typography>{"(-)"}</Typography>
                  <Typography>
                    {/* {storeData && cartList && handleCouponDiscount()} */}
                    {Number(coupon_discount_amount)} {configData?.currency_symbol}
                  </Typography>
                </Stack>
              )}
            </Grid>
          </>
        ) : null}
        {tax ? (
          tax ? (
            <>
              <Grid item md={8} xs={8}>
                {t("TAX")} ({storeData?.tax}%{" "}
                {configData?.tax_included === 1 && t("Included")})
              </Grid>
              <Grid item md={4} xs={4} align="right">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={0.5}
                >
                  {configData?.tax_included === 0 && (
                    <Typography>{"(+)"}</Typography>
                  )}
                  <Typography>{tax} {configData?.currency_symbol}</Typography>
                </Stack>
              </Grid>
            </>
          ) : null
        ) : null}
        {orderType === "delivery" || orderType === "schedule_order" ? (
          (Number.parseInt(configData?.dm_tips_status) === 1 && Number(tips)>0) ? (
            <>
              <Grid item md={8} xs={8} sx={{ textTransform: "capitalize" }}>
                {t("Deliveryman tips")}
              </Grid>
              <Grid item md={4} xs={4} align="right">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={0.5}
                >
                  <Typography>{"(+)"}</Typography>
                  <Typography>{tips} {configData?.currency_symbol}</Typography>
                </Stack>
              </Grid>
            </>
          ) : null
        ) : null}

        {configData?.additional_charge_status === 1 ? (
          <>
            <Grid item md={8} xs={8} sx={{ textTransform: "capitalize" }}>
              {configData?.additional_charge_name}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.5}
              >
                <Typography>{"(+)"}</Typography>
                <Typography>
                  {configData?.additional_charge} {configData?.currency_symbol}
                </Typography>
              </Stack>
            </Grid>
          </>
        ) : null}
        {((orderType === "delivery" || orderType === "schedule_order") ) ? (
          <>
            <Grid item md={8} xs={8} sx={{ textTransform: "capitalize" }}>
              {t("Delivery fee")}
            </Grid>
            <Grid item md={4} xs={4} >
              <Typography textAlign={language==="ar"?"left":"right"}>
              {delivery_charge} {configData?.currency_symbol}
              </Typography>
              
            </Grid>
          </>
        ) : null}
        <CustomDivider border="1px" />
        <TotalGrid container md={12} xs={12} mt="1rem">
          <Grid item md={8} xs={8} pl=".5rem">
            <Typography fontWeight="bold" color={theme.palette.primary.main}>
              {t("Total")}
            </Typography>
          </Grid>
          <Grid item md={4} xs={4} align="right">
            <Typography color={theme.palette.primary.main} align="right">
              {storeData && cartList && `${total} ${configData?.currency_symbol}`}
            </Typography>
          </Grid>
        </TotalGrid>
        {usePartialPayment && payableAmount > walletBalance ? (
          <>
            <Grid item md={8} xs={8} sx={{ textTransform: "capitalize" }}>
              {t("Paid by wallet")}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.5}
              >
                <Typography>{"(-)"}</Typography>
                <Typography>{walletBalance} {configData?.currency_symbol}</Typography>
              </Stack>
            </Grid>
          </>
        ) : null}
        {usePartialPayment && payableAmount > walletBalance ? (
          <>
            <Grid item md={8} xs={8}>
              {t("Due Payment")}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.5}
              >
                <Typography>
                  {totalAmountAfterPartial} {configData?.currency_symbol}
                </Typography>
              </Stack>
            </Grid>
          </>
        ) : null}
      </CalculationGrid>
    </>
  );
};

OrderCalculation.propTypes = {};

export default OrderCalculation;
