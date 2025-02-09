import { axiosWithAuth } from '../axios.config';


export const getbank = () => {
    return axiosWithAuth("/autobank", {
        method: "GET",
    });
};

export const updatebank = (id:number, short_name:string, accountName:string, accountNumber:string,on_off:number ) => {
    return axiosWithAuth(`/autobank-update/${id}`, {
        method: "PUT",
        data:  {
            short_name ,
            accountName,
            accountNumber,
            on_off
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
};