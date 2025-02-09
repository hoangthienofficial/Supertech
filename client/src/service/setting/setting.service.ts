import { axiosWithAuth } from '../axios.config';


export const getsetting = () => {
    return axiosWithAuth("/setting", {
        method: "GET",
    });
};
export const getsettingId = (id:number) => {
    return axiosWithAuth(`/setting/${id}`, {
        method: "GET",
    });
};
export const updatesettingId = (id: number, file: File) => {
    const formData = new FormData();
    formData.append('value', file); // Thêm file vào formData với key là 'value'

    return axiosWithAuth(`/settingedit/${id}`, {
        method: "PUT",
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
export const updatesettingallId = (id:number, value:string) => {
    return axiosWithAuth(`/settingedit/${id}`, {
        method: "PUT",
        data: {
            value: value
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
};