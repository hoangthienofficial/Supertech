import { axiosWithAuth } from "../axios.config"

export const getSearch=(search:string)=>{
    return axiosWithAuth(`/timkiem?tukhoa=${search}`,{
        method: "get"
    })
}

// tuKhoa=${name}