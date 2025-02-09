import { axiosWithAuth } from "../axios.config";

export const getProductCateloriesByDad = (name:string,category:number) => {
  const url = `/list-product-catelories?category_dad=${name}` + (category ? `&category=${category}` : "");

  return axiosWithAuth(url, {
    method: "get",
  });

  };
  export const getinFor = () => {
  return axiosWithAuth(`/getinFor`, {
    method: "get",
  });
};

export const getProducts = () => {
    return axiosWithAuth(`/products`, {
      method: "get",
      
    }
 
  );
  };
export const getProductsByIdCatelogry = (id:number) => {
    return axiosWithAuth(`/products/categories/${id}`, {
      method: "get",
      
    }
 
  );
  };
export const getProductDetail=(id:number)=>{
  return axiosWithAuth(`product-detail/${id}`,{
    method:"get"
  })
}

export const createProduct=(dataCreate:any)=>{
  return axiosWithAuth(`/create-products`,{
    method:"post",
    data:dataCreate
  })
}
export const createInforProduct=(dataCreate:any)=>{
  return axiosWithAuth(`/create-inforproduct`,{
    method:"post",
    data:dataCreate
  })
}
export const deleteProduct=(id:number)=>{
  
  return axiosWithAuth(`/products-delete/${id}`,{
    method:"delete",
  
  })
}
export const getImageProductById=(ids:number[])=>{
  const idsString = JSON.stringify(ids);

  return axiosWithAuth(`/image-product?ids=${encodeURIComponent(idsString)}`, {
      method: "get",
  });
}
export const putProductById=(data:any,id:number)=>{
  return axiosWithAuth(`/products-edit/${id}`,{
    method:"put",
    data
  })
}
export const getProductAdmin=()=>{
  return axiosWithAuth(`/get-products-admin`,{
    method:"get",
    
  })
}


export const createImage = (data: FormData) => {
  return axiosWithAuth.post(`/upload-images`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteImageColors = (id: FormData) => {
  return axiosWithAuth.delete(`/product_colors_delete/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const updateQualityColors = (id: number,data:any) => {
  return axiosWithAuth.put(`/update-quality-product/${id}`, {
   data
  });
};

export const deleteColorsProduct= (id: FormData) => {
  return axiosWithAuth.delete(`/product-color-delete/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}