import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCommentByIdProduct, createLike, deleteCommentByIdProduct, getCommentByIdProduct, putCommentByIdProduct } from "../../service/comment/comment.service";
import { createCommentRepliesByIdProduct, deleteCommentRepliesByIdProduct, putCommentRepliesByIdProduct } from "../../service/comment/commentReply.service";



export const getCommentByIdProductThunk = createAsyncThunk(
  "getCommentByIdThunk",
  async (id: number) => {
    try {
      const resp = await getCommentByIdProduct(id);
      
      // Lấy dữ liệu bình luận
      const comments = resp.data.content;
      
      // Kiểm tra xem có phải là mảng không và sắp xếp theo `comment_date`
      if (Array.isArray(comments)) {
        // Giả sử comment_date là chuỗi kiểu ISO 8601 hoặc timestamp
        comments.sort((a: any, b: any) => {
          const dateA = new Date(a.comment_date); // Chuyển thành đối tượng Date
          const dateB = new Date(b.comment_date); // Chuyển thành đối tượng Date
          
          // Sắp xếp từ mới nhất đến cũ nhất
          return dateB.getTime() - dateA.getTime();
        });
      }

      // Trả về danh sách bình luận đã sắp xếp
      return comments;
    } catch (e) {
      console.log(e);
      return []; // Trả về mảng trống nếu có lỗi
    }
  }
);
export const createCommentByIdProductThunk = createAsyncThunk(
  "createCommentByIdProductThunk",
  async (data,{dispatch}) => {      
    try {
      const resp = await createCommentByIdProduct(data);
      const response = await dispatch(getCommentByIdProductThunk(data.product_id));

      return response.payload;
    } catch (e) {
      console.log(e);
    }
  },
);
export const createCommentRepliesByIdProductThunk = createAsyncThunk(
  "createCommentRepliesByIdProductThunk",
  async (data,{dispatch}) => {      
    try {
      const resp = await createCommentRepliesByIdProduct(data);
      const response = await dispatch(getCommentByIdProductThunk(data.product_id));

      return response.payload;
    } catch (e) {
      console.log(e);
    }
  },
);
export const deleteCommentByIdThunk = createAsyncThunk(
  "deleteCommentByIdThunk",
  async (data:any) => {      
    try {
      const resp = await deleteCommentByIdProduct(data.comment_id);
      const listComment=await getCommentByIdProduct(data.product_id)
      return listComment.data.content.reverse();
    } catch (e) {
      console.log(e);
    }
  },
);
export const deleteCommentRepliesByIdThunk = createAsyncThunk(
  "deleteCommentRepliesByIdThunk",
  async (data:any) => {      
    try {
      const resp = await deleteCommentRepliesByIdProduct(data.id);
      const listComment=await getCommentByIdProduct(data.product_id)
      return listComment.data.content.reverse();
    } catch (e) {
      console.log(e);
    }
  },
);
export const editCommentByIdThunk = createAsyncThunk(
  "editCommentByIdThunk",
  async (data:any) => {      
    console.log("Data received in thunk:", data); // Kiểm tra dữ liệu nhận được trong thunk
   console.log(data.comment_id);
   
      const resp = await putCommentByIdProduct(data.comment_id,data);
   
      
      const listComment=await getCommentByIdProduct(data.product_id)
      return listComment.data.content.reverse();

    
  },
);

export const editCommentRepliesByIdThunk = createAsyncThunk(
  "editCommentRepliesByIdThunk",
  async (data:any) => {      

      const resp = await putCommentRepliesByIdProduct(data.id,data);
   
      
      const listComment=await getCommentByIdProduct(data.product_id)
      return listComment.data.content.reverse();

    
  },
);
export const createLikeCommentThunk = createAsyncThunk(
  "createLikeCommentThunk",
  async (data:any,{dispatch}) => {      

      const resp = await createLike(data.id);
   
      
      const response = await dispatch(getCommentByIdProductThunk(data.product_id));

      return response.payload;

    
  },
);

const initialState = {
  listComment: [],
};

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    setCommentReducer: (state, { payload }) => {
      state.listComment = payload.filter(comment => comment != null);
      
    },
    appendComment: (state, {payload}) => {
      state.listComment = [...state.listComment,payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentByIdProductThunk.fulfilled, (state, { payload }) => {
        state.listComment = payload;
      });
    builder
    .addCase(createCommentByIdProductThunk.fulfilled, (state, { payload }) => {
        state.listComment = payload;
      });
      builder.addCase(deleteCommentByIdThunk.fulfilled, (state, { payload }) => {
        // Filter out the deleted comment from the list
        state.listComment = payload;
      });
      builder.addCase(editCommentByIdThunk.fulfilled, (state, { payload }) => {
        // Filter out the deleted comment from the list
        state.listComment = payload;
      });
      builder.addCase(createCommentRepliesByIdProductThunk.fulfilled, (state, { payload }) => {
        // Filter out the deleted comment from the list
        state.listComment = payload;
      });
      builder.addCase(deleteCommentRepliesByIdThunk.fulfilled, (state, { payload }) => {
        // Filter out the deleted comment from the list
        state.listComment = payload;
      });
      builder.addCase(editCommentRepliesByIdThunk.fulfilled, (state, { payload }) => {
        // Filter out the deleted comment from the list
        state.listComment = payload;
      });
  },




});

export const { setCommentReducer,appendComment } = commentSlice.actions;

export const commentReducer = commentSlice.reducer;
