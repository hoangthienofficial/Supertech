import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCity, getDistrictsCity } from "../../service/order/order.service";



export const getDistrictsCityThunk = createAsyncThunk(
  "getDistrictsCityThunk",
  async (cityCode:string) => {
    try {
      const resp = await getDistrictsCity(cityCode);
      const result = resp.data.data.data;
        return result
      // Filter results based on searchKey and city_status
     
    } catch (e) {
      console.log(e);
    }
  },
);
export const getAllCityThunk = createAsyncThunk(
  "getAllCityThunk",
  async () => {
    try {
      const resp = await getAllCity();
      const result = resp.data.data.data;
        return result
      // Filter results based on searchKey and city_status
     
    } catch (e) {
      console.log(e);
    }
  },
);



const initialState = {
  listDataCity: [] ,
    listAllCity:[],
};

const citySlice = createSlice({
  name: "citySlice",
  initialState,
  reducers: {
    setOrderId: (state, { payload }) => {
    //   state.cityId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCityThunk.fulfilled, (state, { payload }) => {
        state.listAllCity = payload;
      });
     
    builder
      .addCase(getDistrictsCityThunk.fulfilled, (state, { payload }) => {
        state.listDataCity = payload;
      });
     
   
  
  },




});

export const { setOrderId } = citySlice.actions;

export const cityReducer = citySlice.reducer;
