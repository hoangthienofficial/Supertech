// discount

import { axiosWithAuth } from "../axios.config";

export const getDiscountAll = () => {
    return axiosWithAuth(`/discount`, {
      method: "get",
      
    }
 
  );
  };
export const createUserDiscount = ( data  ) => {
  // create-discount-user
  return axiosWithAuth(`/create-discount-user `, {
    method: "POST",
    data,
  }

);
}
export const  applyUserDiscount = ( data  ) => {
  // create-discount-user
  return axiosWithAuth(`/apply-discount     `, {
    method: "POST",
    data,
  }

);
}