import { axiosWithAuth } from "../axios.config";
import { TPayloadLogin, TPayloadRegister } from "./auth.type";

export const signup = (payload: TPayloadRegister) => {
    return axiosWithAuth("/register", {
      method: "post",
      data: payload,
    });
  };
  
export const login = (payload: TPayloadLogin) => {
    return axiosWithAuth("/login", {
      method: "post",
      data: payload,
    });
  };
  

  export const resetToken = async (payload:string) => {
    return axiosWithAuth.post("/reset-token", {
        token: payload // Gửi token làm payload trong yêu cầu
    });
};