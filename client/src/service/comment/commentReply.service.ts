import { axiosWithAuth } from "../axios.config";



// export const getCommentByIdProduct = (id:number) => {
//     return axiosWithAuth(`/get-comment-by-id-product/${id}`, {
//       method: "get",
	
//     });
//   };
export const createCommentRepliesByIdProduct = (payload:any) => {
    return axiosWithAuth(`/create-replies-comment`, {
      method: "post",
      data:payload
	
    });
  };
export const deleteCommentRepliesByIdProduct = (id:number) => {
    return axiosWithAuth(`/detele-comment-reply/${id}`, {
      method: "delete",
    
	
    });
  };
// export const createLike = (id:number) => {
//     return axiosWithAuth(`/create-like/${id}`, {
//       method: "post",
    
	
//     });
//   };
export const putCommentRepliesByIdProduct = (id:number,payload:any) => {
    return axiosWithAuth(`/put-comment-reply/${id}`, {
      method: "put",
    data:payload
	
    });
  };
