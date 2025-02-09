import { axiosWithAuth } from "../axios.config";



export const getCommentByIdProduct = (id:number) => {
    return axiosWithAuth(`/get-comment-by-id-product/${id}`, {
      method: "get",
	
    });
  };
export const createCommentByIdProduct = (payload:any) => {
    return axiosWithAuth(`/create-comment`, {
      method: "post",
      data:payload
	
    });
  };
export const deleteCommentByIdProduct = (id:number) => {
    return axiosWithAuth(`/detele-comment/${id}`, {
      method: "delete",
    
	
    });
  };
export const createLike = (id:number) => {
    return axiosWithAuth(`/create-like/${id}`, {
      method: "post",
    
	
    });
  };
export const putCommentByIdProduct = (id:number,payload:any) => {
    return axiosWithAuth(`/put-comment/${id}`, {
      method: "put",
    data:payload
	
    });
  };
