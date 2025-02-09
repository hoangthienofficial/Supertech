import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "../../page/Client/DetailProduct/data";
import {
  createBlog,
  createCommentByIdBlog,
  createLikeBlog,
  deleteBlog,
  deleteCommentByIdBlog,
  editBlog,
  getBlog,
  getBlogAll,
  getCommentByIdBlog,
  getmedia_postAll,
  putCommentByIdBlog,
} from "../../service/Blog/blog.service";

export const getAllBlogThunk = createAsyncThunk("getAllBlogThunk", async () => {
  try {
    const resp = await getBlogAll();
    return resp.data.content.reverse();
  } catch (e) {
    console.log(e);
  }
});

export const getAllBlogmediaThunk = createAsyncThunk(
  "getAllBlogmediaThunk",
  async () => {
    // try {
    //   const resp = await ();
    //   return resp.data.content.reverse();
    // } catch (e) {
    //   console.log(e);
    // }
  }
);

export const getBlogByIdThunk = createAsyncThunk(
  "getBlogByIdThunk",
  async (id: number) => {
    try {
      const resp = await getBlog(id);
      return resp.data.content;
    } catch (e) {
      console.log(e);
    }
  }
);
// Thunk để xóa bài viết
export const deleteBlogThunk = createAsyncThunk(
  "blogs/delete",
  async (id: number, {dispatch}) => {
    try {
      await deleteBlog(id);
      const response = await dispatch(getAllBlogThunk());
     
      return response.payload;
  
    } catch (error) {
      return error;
    }
  }
);
// Thunk để thêm bài viết
export const createBlogThunk = createAsyncThunk(
  "createBlogThunk",
  async (newBlog: any,{dispatch}) => {
    try {
      const resp = await createBlog(newBlog);
        const response = await dispatch(getAllBlogThunk());
     
           return response.payload;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createMediaThunk = createAsyncThunk(
  "createBlogThunk",
  async (newBlog: any) => {
    try {
      const resp = await createBlog(newBlog);
      return resp.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);
export const editBlogThunk = createAsyncThunk(
  "editBlogThunk",
  async (updatedBlog: any, { dispatch }) => {
    try {
      await editBlog(updatedBlog);
      console.log(updatedBlog);
      
      const response = await dispatch(getAllBlogThunk());
      return response.payload;
    } catch (error) {
      throw new Error("Failed to edit blog");
    }
  }
);
export const getCommentByIBlogThunk = createAsyncThunk(
  "getCommentByIBlogThunk",
  async (id: number) => {
    try {
      const resp = await getCommentByIdBlog(id);
      
      // Lấy dữ liệu bình luận
      const comments = resp.data.content;
      
      // Kiểm tra xem có phải là mảng không và sắp xếp theo `comment_date`
      if (Array.isArray(comments)) {
        // Giả sử comment_date là chuỗi kiểu ISO 8601 hoặc timestamp
        comments.sort((a: any, b: any) => {
          const dateA = new Date(a.post_date); // Chuyển thành đối tượng Date
          const dateB = new Date(b.post_date); // Chuyển thành đối tượng Date
          
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
export const deleteCommentByIdBlogThunk = createAsyncThunk(
  "deleteCommentByIdBlogThunk",
  async (data,{dispatch}) => {      
    try {
      const resp = await deleteCommentByIdBlog(data.comment_post_id);
      const response = await dispatch(getCommentByIBlogThunk(data.post_id));

      return response.payload;
    } catch (e) {
      console.log(e);
    }
  },
);
export const createCommentByIdBlogThunk = createAsyncThunk(
  "createCommentByIdBlogThunk",
  async (data,{dispatch}) => {      
    try {
      const resp = await createCommentByIdBlog(data);
      const response = await dispatch(getCommentByIBlogThunk(data.post_id));

      return response.payload;
    } catch (e) {
      console.log(e);
    }
  },
);
export const putCommentByIdBlogThunk = createAsyncThunk(
  "putCommentByIdBlogThunk",
  async (data,{dispatch}) => {      
    try {
      const resp = await putCommentByIdBlog(data,data.comment_post_id);
      const response = await dispatch(getCommentByIBlogThunk(data.post_id));

      return response.payload;
    } catch (e) {
      console.log(e);
    }
  },
);
export const createLikeCommentThunkBlog = createAsyncThunk(
  "createLikeCommentThunkBlog",
  async (data:any,{dispatch}) => {      

      const resp = await createLikeBlog(data.comment_post_id);
   
      
      const response = await dispatch(getCommentByIBlogThunk(data.post_id));

      return response.payload;

    
  },
);
const initialState = {
  listBlog: [],
  mediaPosts: [],
  detailBlog:{},
  listComment: [],

  loading: false,
  error: null,
};

const BlogSlice = createSlice({
  name: "BlogSlice",
  initialState,
  reducers: {
    setListBlog: (state, { payload }) => {
      state.listBlog = payload;
    },
  },

  extraReducers: (builder) => {
   
   
  builder
        .addCase(getAllBlogThunk.fulfilled, (state, { payload }) => {
          state.listBlog = payload;
        })
  builder
        .addCase(getBlogByIdThunk.fulfilled, (state, { payload }) => {
          state.detailBlog = payload;
        })
        .addCase(editBlogThunk.fulfilled, (state, { payload }) => {
          state.listBlog = payload;
        })
        builder
        .addCase(getCommentByIBlogThunk.fulfilled, (state, { payload }) => {
          state.listComment = payload;
        });
   
  },
});
export const { setListBlog } = BlogSlice.actions;

export const blogReducer = BlogSlice.reducer;
