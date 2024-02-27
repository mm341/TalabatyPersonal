import { Typography } from "@mui/material";
import React from "react";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../helper-functions/CardHelpers";
import { getCurrentModuleType } from "../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../helper-functions/moduleTypes";

const AmountWithDiscountedAmount = ({ item, noPrimaryColor }) => {
  const moduleWiseLayout = () => {
    if (getCurrentModuleType() === ModuleTypes.FOOD) {
      return (
        <Typography
          variant="h5"
          display="flex"
          alignItems="center"
          color={noPrimaryColor ? "red" : "primary.main"}
          flexWrap="wrap"
          gap="5px"
          sx={{
            fontSize: { xs: "13px", sm: "18px" },
            color: (theme) =>
              getCurrentModuleType() === ModuleTypes.FOOD
                ? theme.palette.moduleTheme.food
                : theme.palette.primary.main,
          }}
        >
          {/* {getDiscountedAmount(
            item?.price,
            item?.discount,
            item?.discount_type,
            item?.store_discount,
            item?.quantity
          ) === item?.price ? (
            getAmountWithSign(
              getDiscountedAmount(
                item?.price,
                item?.discount,
                item?.discount_type,
                item?.store_discount,
                item?.quantity
              )
            )
          ) : (
            <>
              <Typography
                fontWeight="400"
                color="text.secondary"
                sx={{ fontSize: { xs: "12px", sm: "13px" } }}
              >
                <del>{getAmountWithSign(item?.price)}</del>
              </Typography>
              {getAmountWithSign(
                getDiscountedAmount(
                  item?.price,
                  item?.discount,
                  item?.discount_type,
                  item?.store_discount,
                  item?.quantity
                )
              )}
            </>
          )} */}

          {item?.price_after_discount !== item?.price ? (
            <>
            <Typography
                fontWeight="500"
                // color="text.secondary"
                // sx={{ fontSize: { xs: "12px", sm: "13px" } }}
              >
                {getAmountWithSign(item?.price_after_discount)}
              </Typography>
              <Typography
                fontWeight="400"
                color="text.secondary"
                sx={{ fontSize: { xs: "12px", sm: "13px" } }}
              >
                <del>{getAmountWithSign(item?.price)}</del>
              </Typography>

              
            </>
          ) : (
            <Typography
              fontWeight="500"
              // fontWeight="400"
              // color="text.secondary"
              // sx={{ fontSize: { xs: "12px", sm: "13px" } }}
            >
              {getAmountWithSign(item?.price)}
            </Typography>
          )}
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="h5"
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          gap="5px"
          sx={{
            fontSize: { xs: "13px", sm: "18px" },
            color: (theme) =>
              noPrimaryColor ? "inherit" : theme.palette.primary.main,
          }}
        >
          {/* {getDiscountedAmount(
            item?.price,
            item?.discount,
            item?.discount_type,
            item?.store_discount,
            item?.quantity
          ) === item?.price ? (
            getAmountWithSign(
              getDiscountedAmount(
                item?.price,
                item?.discount,
                item?.discount_type,
                item?.store_discount,
                item?.quantity
              )
            )
          ) : (
            <>
              {getAmountWithSign(
                getDiscountedAmount(
                  item?.price,
                  item?.discount,
                  item?.discount_type,
                  item?.store_discount,
                  item?.quantity
                )
              )}
              <Typography
                fontWeight="400"
                color="text.secondary"
                sx={{ fontSize: { xs: "12px", sm: "13px" } }}
              >
                <del>{getAmountWithSign(item?.price)}</del>
              </Typography>
            </>
          )} */}
          {item?.price_after_discount !== item?.price ? (
            <>
              <Typography
                fontWeight="500"
                // color="text.secondary"
                // sx={{ fontSize: { xs: "12px", sm: "13px" } }}
              >
                {getAmountWithSign(item?.price_after_discount)}
              </Typography>
              <Typography
                fontWeight="400"
                color="text.secondary"
                sx={{ fontSize: { xs: "12px", sm: "13px" } }}
              >
                <del>{getAmountWithSign(item?.price)}</del>
              </Typography>

            
            </>
          ) : (
            <Typography
              fontWeight="500"
              // fontWeight="400"
              // color="text.secondary"
              // sx={{ fontSize: { xs: "12px", sm: "13px" } }}
            >
              {getAmountWithSign(item?.price)}
            </Typography>
          )}
        </Typography>
      );
    }
  };
  return <>{moduleWiseLayout()}</>;
};

AmountWithDiscountedAmount.propTypes = {};

export default AmountWithDiscountedAmount;
