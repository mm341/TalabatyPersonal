import { useMutation } from "react-query";
import MainApi from "../../../MainApi";

const offlinePaymentUpdate = async (offlinePaymentData) => {
  const { data } = await MainApi.put("/api/v1/customer/order/offline-payment-update", offlinePaymentData);
  return data;
};

export const useOfflinePaymentUpdate = () => {
  return useMutation("offline_method_update", (offlinePaymentData) => offlinePaymentUpdate(offlinePaymentData), {
   
  });
};