import { useMutation, useQuery } from "react-query";

import { getCheckOutData } from "../../ApiRoutes";
import MainApi from "../../MainApi";

const getCheckOut = async (formData) => {
  const { data } = await MainApi.post(`${getCheckOutData}`, formData);
  return data;
};
export const useGetCheckoutData = () => {
  return useMutation("getCheckOutData", getCheckOut);
};
