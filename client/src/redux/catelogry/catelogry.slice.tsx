import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCategory, deleteCategory, getCatelogry, getCatelogryDad, getCatelogryDadById, putCategory } from "../../service/catelogry/catelogry.service";
import toast from "react-hot-toast";

export const getCatelogryThunkAll = createAsyncThunk(
  "getCatelogryThunkAll",
  async () => {
    try {
      const resp = await getCatelogry();
      return resp.data.content;

    } catch (e) {
      console.log(e);
    }
  }
)

export const getCatelogryThunk = createAsyncThunk(
  "getCatelogryThunk",
  async (searchKey:string) => {
    try {
      const resp = await getCatelogry();
      const result = resp.data.content;
      if (searchKey.trim()) {
        const filteredResults = result.filter((item:any) =>
          item.category_name.toLowerCase().includes(searchKey.toLowerCase())
        );
        return filteredResults;
      } else {
        // Return all results if no search key is provided
        return result.reverse();
      }
    } catch (e) {
      console.log(e);
    }
  },
);
export const createCategoryThunk=createAsyncThunk("createCategoryThunk",
  async(data:any,{dispatch})=>{
    try{
      const resp = await createCategory(data);
      const response = await dispatch(getCatelogryThunk(''));

      return response.payload;
    }catch(e){
      console.log(e);
    }
  }
)
export const deleteCategoryThunk=createAsyncThunk("deleteCategoryThunk",
  async(id:any[],{dispatch})=>{
    try{
      const resp = await deleteCategory(id);
      if(resp.data?.message=='Đã Xóa Thành Công!'){
        toast.success("Xóa loại thành công");
        
      }else{
        toast.error(resp.data.message);
        
      }
 const response = await dispatch(getCatelogryThunk(''));

        return response.payload;
   
    }catch(e){
      console.log(e);
    }
  }
)
export const putCategoryThunk=createAsyncThunk("putCategoryThunk",
  async(category:any,{dispatch})=>{
    try{
      const resp = await putCategory(category,category.id);
      const response = await dispatch(getCatelogryThunk(''));

      return response.payload;
    }catch(e){
      console.log(e);
    }
  }
)
export const getCatelogryDadThunk = createAsyncThunk(
  "getCatelogryDadThunk",
  async () => {
    try {
      const resp = await getCatelogryDad();
      return resp.data.content;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getCatelogryDadByIdThunk = createAsyncThunk(
  "getCatelogryDadByIdThunk",
  async (id: number) => {
    try {
      const resp = await getCatelogryDadById(id);
      return resp.data.content;

    } catch (e) {
      console.log(e);
    }
  }
)


const initialState = {
  catelogryDad: [],
  AlllistCatelories: [],

  listCatelories:[],
};

const CatelogrySlice = createSlice({
  name: "CatelogrySlice",
  initialState,
  reducers: {
    setCatelogry: (state, { payload }) => {
      state.catelogryDad = payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(getCatelogryThunkAll.fulfilled, (state, { payload }) => {
      state.AlllistCatelories = payload;
    })
    builder
    .addCase(getCatelogryDadByIdThunk.fulfilled, (state, { payload }) => {
      state.catelogryDad = payload;
    })
    builder
      .addCase(getCatelogryThunk.fulfilled, (state, { payload }) => {
        state.listCatelories = payload;
      })
    builder
      .addCase(getCatelogryDadThunk.fulfilled, (state, { payload }) => {
        state.catelogryDad = payload;
      })
    builder
      .addCase(deleteCategoryThunk.fulfilled, (state, { payload }) => {
        state.listCatelories = payload;
      })
    builder
      .addCase(createCategoryThunk.fulfilled, (state, { payload }) => {
        state.listCatelories = payload;
      })
    builder
      .addCase(putCategoryThunk.fulfilled, (state, { payload }) => {
        state.listCatelories = payload;
      })

  },
});

export const { setCatelogry } = CatelogrySlice.actions;

export const categoryReducer = CatelogrySlice.reducer;