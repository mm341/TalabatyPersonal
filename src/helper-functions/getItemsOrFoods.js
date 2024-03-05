import {t} from "i18next";

export const getItemsOrFoods = () => {
  if (typeof window !== "undefined") {
    if (
      JSON.parse(window.localStorage.getItem("module"))?.module_type === "food"
    ) {
      return t("foods");
    } else {
      return t("items");
    }
  }
};

export const getItemsOrFoodsNotAvailable = () => {
  if (typeof window !== "undefined") {
    if (
      JSON.parse(window.localStorage.getItem("module"))?.module_type === "food"
    ) {
      return t("food");
    } else {
      return t("item");
    }
  }
};
