import { axiosWithAuth } from "../axios.config";
export const getAllBanner = () => {
    return axiosWithAuth("/banner", {
        method: "GET",
    });
};
