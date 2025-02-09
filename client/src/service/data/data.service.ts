// /get-week-order-sales

import { axiosWithAuth } from "../axios.config";

export const getOrderWeekSales = () => {
    return axiosWithAuth(`/get-week-order-sales`, {
      method: "get",
	
    });
  };
export const getUserOrderCount = ({limit}) => {
    return axiosWithAuth(`/get-user-order-count?limit=${limit}`, {
      method: "get",
	
    });
  };
export const getTopFiveProduct = ({period}:string) => {
    return axiosWithAuth(`/get-product-top-five?period=${period}`, {
      method: "get",
	
    });
  };
export const getTopUserRegister = ({period}:string) => {
    return axiosWithAuth(`/get-user-register?period=${period}`, {
      method: "get",
	
    });
  };
export const getOrderById = (id:number) => {
    return axiosWithAuth(`/get-order-by-id/${id}`, {
      method: "get",
	
    });
  };
export const getOrderRevenue=({ startDate, endDate, period })=>{
  return axiosWithAuth(`/get-order-revenue?startDate=${startDate}&endDate=${endDate}&period=${period}`,{
    method:"get",


  })
}