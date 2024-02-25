import React from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import { getSelectedAddOn } from "../../helper-functions/CardHelpers";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import VisibleVariations from "./FoodVariations";
import { OrderFoodSubtitle } from "../checkout/CheckOut.style";

const VariationContent = ({ cartItem }) => {
  const { t } = useTranslation();
  const handleProduct = () => {
    
    if (cartItem?.variation?.length > 0) {
      return (
        <Stack>
          {cartItem?.item?.choice_options?.map((item, index) => {
            return (
              <Stack key={index}>
                <Typography color="customColor.textGray" fontSize="12px">
                  {item?.title} :{" "}
                  {cartItem?.variation?.[0]?.type.split("-")?.[index]}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      );
    }
  };
  
  const handleFood = () => {
    return (
      <CustomStackFullWidth>
        <VisibleVariations variations={cartItem?.item?.food_variations} t={t} />
        {cartItem?.add_on_ids?.length > 0 && (
          <Stack direction="row" alignItems="center" flexWrap="wrap" gap="5px">
            <OrderFoodSubtitle>{t("Addon")}</OrderFoodSubtitle>
            <OrderFoodSubtitle>:</OrderFoodSubtitle>
            <OrderFoodSubtitle>
              {getSelectedAddOn(cartItem?.item?.addons)}
            </OrderFoodSubtitle>
          </Stack>
        )}
      </CustomStackFullWidth>
    );
  };

  return (
    <div>
      {cartItem?.item?.module_type === "food" ? handleFood() : handleProduct()}
    </div>
  );
};

VariationContent.propTypes = {};

export default VariationContent;
