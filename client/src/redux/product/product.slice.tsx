import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createInforProduct, createProduct, deleteProduct, getinFor, getProductAdmin, getProductCateloriesByDad, getProductDetail, getProducts, putProductById, updateQualityColors } from "../../service/product/product.service";

export const getProductByCateloriesDad = createAsyncThunk(
  "getProductByCateloriesDad",
  async (name: any) => {
    try {
      console.log(name.category);
      const resp = await getProductCateloriesByDad(name.category_dad, name.category);
      return resp.data.content;


    } catch (e) {
      console.log(e);
    }
  },
);

export const getProductsThunk = createAsyncThunk(
  "getProductsThunk",
  async () => {
    try {
      const resp = await getProducts();
      return resp.data.content;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getProductsAdminThunk = createAsyncThunk(
  "getProductsAdminThunk",
  async (searchKey: string) => {
    try {

      const resp = await getProductAdmin();
      const result = resp.data.content;
      if (searchKey.trim()) {
        const filteredResults = result.filter((item: any) =>
          item.product_name.toLowerCase().includes(searchKey.toLowerCase())
        );
        return filteredResults;
      } else {
        // Return all results if no search key is provided
        return result.reverse();
      }
      // return resp.content.reverse();
    } catch (e) {
      console.log(e);
    }
  },
);

export const createProductAdminThunk = createAsyncThunk(
  "createProductAdminThunk",
  async (dataCreate: any, { dispatch }) => {
    try {
      await createProduct(dataCreate);
      const response = await dispatch(getProductsAdminThunk(''));
      return response.payload;
    } catch (e) {
      console.log(e);
    }
  },
);
export const createInforProductAdminThunk = createAsyncThunk(
  "createInforProductAdminThunk",
  async (dataCreate: any, { dispatch }) => {
    try {
      await createInforProduct(dataCreate);
      const response = await dispatch(getProductsAdminThunk(''));
      return response.payload;
    } catch (e) {
      console.log(e);
    }
  },
);
export const putInforProductAdminThunk = createAsyncThunk(
  "putInforProductAdminThunk",
  async (dataCreate: any, { dispatch }) => {
    try {
      await putProductById(dataCreate, dataCreate.product_id);
      const response = await dispatch(getProductsAdminThunk(''));
      return response.payload;
    } catch (e) {
      console.log(e);
    }
  },
);

export const updateQualityProductAdminThunk = createAsyncThunk(
  "updateQualityProductAdminThunk",
  async (dataCreate: any, { dispatch }) => {
    try {

      await updateQualityColors(dataCreate.color_id, dataCreate);
      const response = await dispatch(getProductsAdminThunk(''));
      return response.payload;
    } catch (e) {
      console.log(e);
    }
  },
);
export const deleteProductAdminThunk = createAsyncThunk(
  "deleteProductAdminThunk",
  async (id: number, { dispatch }) => {
    try {
      await deleteProduct(id);
      const response = await dispatch(getProductsAdminThunk(''));
      return response.payload;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getProductByIdThunk = createAsyncThunk(
  "getProductByIdThunk",
  async (id: number) => {
    try {
      const resp = await getProductDetail(id);
      return resp.data.content;
    } catch (e) {
      console.log(e);
    }
  },
);
export const getProductInForThunk = createAsyncThunk(
  "getProductInForThunk",
  async () => {
    try {
      const resp = await getinFor();
      return resp.data.content;
    } catch (e) {
      console.log(e);
    }
  })

const initialState = {
  listProduct: [],
  listProducts: [],
  listAdminProducts: [],
  productDetail: {},
  productColors: [],
  listProductStorage: [],
  listProductsColors: [],
  Datafilter: null,
  listProductsAll: [],
  inforProduct: []

};

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    setDatafilterSlice: (state, { payload }) => {
      state.Datafilter = payload;
    },
    setProduct: (state, { payload }) => {
      state.listProduct = payload;
    },

    setProductColors: (state, { payload }) => {
      state.productColors.push(payload);

    },
    setListProductColors: (state, { payload }) => {
      state.listProductsColors = payload; // Thay thế mảng hiện tại bằng mảng mới

    },
    clearProductColors: (state) => {
      state.productColors = []; // Reset danh sách
    },
    setProductStorage: (state, { payload }) => {
      state.listProductStorage.push(payload);
    },
    removeProductsFromColors: (state, { payload }) => {
      // Lọc và loại bỏ object có image_id bằng với payload
      state.productColors = state.productColors.filter(
        (item) => item.image_id !== payload
      );
    },

    removeAllProductColors: (state) => {
      state.productColors = [];
      state.listProductsColors = []
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductByCateloriesDad.fulfilled, (state, { payload }) => {
        state.listProduct = payload;
      })
    builder
      .addCase(getProductsThunk.fulfilled, (state, { payload }) => {
        state.listProducts = payload;
      })
    builder
      .addCase(getProductsAdminThunk.fulfilled, (state, { payload }) => {
        state.listAdminProducts = payload;
      })
    builder
      .addCase(getProductByIdThunk.fulfilled, (state, { payload }) => {
        state.productDetail = payload;
      })
    builder
      .addCase(createInforProductAdminThunk.fulfilled, (state, { payload }) => {
        state.productDetail = payload;
      })
    builder
      .addCase(deleteProductAdminThunk.fulfilled, (state, { payload }) => {
        state.listAdminProducts = payload;
      });
    builder
      .addCase(putInforProductAdminThunk.fulfilled, (state, { payload }) => {
        state.listAdminProducts = payload;
      });

    builder
      .addCase(getProductInForThunk.fulfilled, (state, { payload }) => {
        state.inforProduct = payload;
      });
  },
});

export const { setProduct, setProductColors, setDatafilterSlice, setListProductColors, removeAllProductColors, setProductStorage, removeProductsFromColors } = ProductSlice.actions;

export const productReducer = ProductSlice.reducer;