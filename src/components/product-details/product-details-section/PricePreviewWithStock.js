import React from "react";
import { Typography } from "@mui/material";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../../../helper-functions/CardHelpers";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";

const PricePreviewWithStock = (props) => {
  //  props
  const { state, theme, productDetailsData } = props;

  //  selectors
  const { configData } = useSelector((state) => state.configData);

  //  get currencySymbol from cashed configData state
  let currencySymbol;

  if (configData) {
    currencySymbol = configData.currency_symbol;
  }

  const handlePrice = () => {
    if (
      productDetailsData?.price !== productDetailsData?.price_after_discount
    ) {
      return (
        <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
          <Typography
            fontWeight="700"
            color={theme.palette.primary.main}
            sx={{
              fontSize: { xs: "15px", sm: "24px" },
            }}
          >
            {productDetailsData?.price_after_discount}
          </Typography>
          <Typography
            fontWeight="500"
            color={theme.palette.customColor.textGray}
            sx={{ fontSize: { xs: "13px", sm: "16px" } }}
          >
            <del>
              {productDetailsData?.price} {currencySymbol}
            </del>
          </Typography>
        </Stack>
      );
    } else {
      return (
        <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
          <Typography
            fontWeight="700"
            color={theme.palette.primary.main}
            sx={{
              fontSize: { xs: "15px", sm: "24px" },
            }}
          >
            {productDetailsData?.price_after_discount} {currencySymbol}
          </Typography>
        </Stack>
      );
    }
  };

  return <>{handlePrice()}</>;
};

PricePreviewWithStock.propTypes = {};

export default PricePreviewWithStock;
