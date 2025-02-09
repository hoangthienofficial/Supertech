import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changeStatusOrder, getDetailOrder, getOrderAll, getOrderByIdUser } from "../../service/order/order.service";



export const getOrderByIdProductThunk = createAsyncThunk(
  "getOrderByIdThunk",
  async ({ searchKey, order_status }: { searchKey: any; order_status: number }) => {
    try {
      const resp = await getOrderByIdUser();
      const result = resp.data.content;

      // Filter results based on searchKey and order_status
      const filteredResults = result.filter((item: any) => {

        // Check if order_id starts with searchKey (convert both to string for comparison)
        const matchesSearchKey = searchKey ? item.order_id.toString().startsWith(searchKey.toString()) : true; 
        const matchesOrderStatus = order_status !== undefined ? item.order_status === order_status : true; // Match order_status if provided

        return matchesSearchKey && matchesOrderStatus; // Return true if both conditions match
      });

      console.log(`Filtered results based on search criteria:`, filteredResults);
      return filteredResults.length > 0 ? filteredResults.reverse() : []; // Return filtered results or an empty array if none found

    } catch (e) {
      console.log(e);
    }
  },
);

export const changeStatusOrderThunk = createAsyncThunk(
  "ChangeStatusOrderThunk",
  async (data: any, { dispatch }) => {
    try {
      // Update the order status
      await changeStatusOrder(data.order_id, data);

      // Dispatch the getOrderByIdProductThunk and wait for it to complete
      const response = await dispatch(getOrderByIdProductThunk({ searchKey: '', order_status: data.status_order }));
      
      // Return the payload of the response if successful
      return response.payload;
    } catch (e) {
      console.log(e);
      throw e; // Optionally re-throw to handle it in the calling code
    }
  },
);


export const getOrderDetail = createAsyncThunk(
  "getOrderDetail",
  async (id:number) => {      
    try {
      const resp = await getDetailOrder(id);

      return resp.data.content.reverse();
    } catch (e) {
      console.log(e);
    }
  },
);

export const getOrderAllThunk = createAsyncThunk(
  "getOrderAllThunk",
  async (order_status:number) => {      
    try {
      const resp = await getOrderAll();
      const result = resp.data.content;

      const filteredResults = result.filter((item: any) => {

        // Check if order_id starts with searchKey (convert both to string for comparison)
        const matchesOrderStatus = order_status !== undefined ? item.order_status === order_status : true; // Match order_status if provided

        return matchesOrderStatus; // Return true if both conditions match
      });

      console.log(`Filtered results based on search criteria:`, filteredResults);
      return filteredResults.length > 0 ? filteredResults : []; // Return filtered results or an empty array if none found

     
    } catch (e) {
      console.log(e);
    }
  },
);
export const changeStatusOrderAdminThunk = createAsyncThunk(
  "changeStatusOrderAdminThunk",
  async (data: any, { dispatch }) => {
    try {
      // Update the order status
      await changeStatusOrder(data.order_id, data);

      // Dispatch the getOrderByIdProductThunk and wait for it to complete
      const response = await dispatch(getOrderAllThunk());
      
      // Return the payload of the response if successful
      return response.payload;
    } catch (e) {
      console.log(e);
      throw e; // Optionally re-throw to handle it in the calling code
    }
  },
);

const initialState = {
  listOrder: [] ,
  detailOrder:[],

  orderId:null
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setOrderId: (state, { payload }) => {
      state.orderId = payload;
    },
    setOrder: (state, { payload }) => {
      state.listOrder = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByIdProductThunk.fulfilled, (state, { payload }) => {
        state.listOrder = payload;
      });
    builder
      .addCase(changeStatusOrderThunk.fulfilled, (state, { payload }) => {
        state.listOrder = payload;
      });
    builder
      .addCase(changeStatusOrderAdminThunk.fulfilled, (state, { payload }) => {
        state.listOrder = payload;
      });
    builder
      .addCase(getOrderDetail.fulfilled, (state, { payload }) => {
        state.detailOrder = payload;
      });
    builder
      .addCase(getOrderAllThunk.fulfilled, (state, { payload }) => {
        state.listOrder = payload;
      });
  
  },




});

export const { setOrderId,setOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
