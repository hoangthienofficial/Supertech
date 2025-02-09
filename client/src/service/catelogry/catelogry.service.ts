import { axiosWithAuth } from "../axios.config";
import { TPayloadCategory } from "./catelogry.type";

export const getCatelogry = () => {
    return axiosWithAuth("/categories", {
      method: "get",
      
    }
 
  );
  };
export const createCategory = (data:TPayloadCategory) => {
    return axiosWithAuth("/categories-create", {
      method: "post",
      data
    }
 
  );
  };
  export const deleteCategory = (ids: number[]) => {
    // Chuyển mảng ID thành chuỗi JSON
    const idsString = JSON.stringify(ids);
  
    return axiosWithAuth(`/categories-delete?ids=${encodeURIComponent(idsString)}`, {
      method: "delete",
    });
  };
export const putCategory = (data:TPayloadCategory,id:number) => {
    return axiosWithAuth(`/categories-edit/${id}`, {
      method: "put",
    data  
    }

 
  );
  };
export const getCatelogryDad = () => {
    return axiosWithAuth("/categories_dad", {
      method: "get",
      
    }
 
  );
  };
  export const getCatelogryDadById=(id:number)=>{
    return axiosWithAuth(`/categories_dad/${id}`, {
      method: "get",
      
    }
 
  );
  }