import { store } from "../redux/store";

export const getAmountWithSign = (amount) => {
  const stores = store?.getState();
  const { configData } = stores?.configData;

  if (configData?.currency_symbol_direction === "left") {
    return `${configData?.currency_symbol} ${amount}`;
  } else if (configData?.currency_symbol_direction === "right") {
    return `${amount} ${configData?.currency_symbol}`;
  }
  return amount;
};

export const getDiscountedAmount = (
  price,
  discount,
  discountType,
  storeDiscount,
  quantity
) => {
  // console.log(price)
  //product wise discount
  let mainPrice = price;
  let q = quantity ? quantity : 1;
  // if (Number.parseInt(storeDiscount) === 0) {
  //   if (discount > 0) {
  //     if (discountType === "amount") {
  //       mainPrice = price - discount * q;
  //     } else if (discountType === "percent") {
  //       mainPrice = price - (discount / 100) * price;
  //     }
  //   }
  // } else {
  //   mainPrice = price - (storeDiscount / 100) * price;
  // }

  if (discount === 0 && Number.parseInt(storeDiscount) > 0) {
    mainPrice = price * q;

    return mainPrice - (price * Number.parseInt(storeDiscount)) / 100;
  }
  return mainPrice;
};
export const getSelectedAddOn = (add_ons) => {
  let add_on = "";
  if (add_ons?.length > 0) {
    add_ons?.map((item, index) => {
      if (item?.isChecked) {
        add_on += `${index !== 0 ? ", " : ""}${item.name}`;
      }
    });
  }
  return add_on;
};

export const getDiscountAmount = (
  price,
  discount,
  discountType,
  storeDiscount
) => {
  //product wise discount
  let mainPrice = price;
  if (Number.parseInt(storeDiscount) === 0) {
    if (discountType === "amount") {
      mainPrice = discount;
    } else if (discountType === "percent") {
      mainPrice = price * (discount / 100);
    }
  } else {
    if (discountType === "amount") {
      mainPrice = storeDiscount;
    } else if (discountType === "percent") {
      mainPrice = price * (storeDiscount / 100);
    }
  }
  return mainPrice;
};
