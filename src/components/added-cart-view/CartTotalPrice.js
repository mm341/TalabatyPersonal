import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";

import { useSelector } from "react-redux";

const CartTotalPrice = () => {
  //  selector
  const {total}=useSelector((state)=>state.cart)
  return (
    <>
      <CustomStackFullWidth
        justifyContent="space-between"
        direction="row"
        sx={{ padding: "1.4rem" }}
      >
        <Typography fontSize="14px" fontWeight="500">
          {t("Subtotal")}
        </Typography>
        <Typography fontSize="15px" fontWeight="700">
          {getAmountWithSign(total)}
        </Typography>
      </CustomStackFullWidth>
    </>
  );
};

export default CartTotalPrice;
