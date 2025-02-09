import axios from "axios";
import { axiosWithAuth } from "../axios.config";

export const getBlogAll = () => {
  return axiosWithAuth("/posts", {
    method: "get",
  });
};

export const getBlog = (id: number) => {
  return axiosWithAuth(`/posts/${id}`, {
    method: "get",
  });
};

export const getmedia_postAll = () => {
  return axiosWithAuth("/mediapost", {
    method: "get",
  });
};

export const getmedia_post = (id: number) => {
  return axiosWithAuth(`/mediapost/${id}`, {
    method: "get",
  });
};
// Hàm để xóa bài viết và hình ảnh
export const deleteBlog = async (id: number) => {
  return await axiosWithAuth(`/posts-delete/${id}`, { method: "delete" });
};

// Hàm để thêm bài viết
export const createBlog = async (newBlog: any) => {
  try {
    const { post_title, post_content, media_url } = newBlog;
    const data = { post_title, post_content };

    const kq = await axiosWithAuth("/posts-create", {
      method: "post",
      data: data,
    });

    if (!kq.data.content.post_id) {
      throw new Error("Failed to create post.");
    }

    const formData = new FormData();
    formData.append("media_url", media_url);
    formData.append("post_id", kq.data.content.post_id);

    return await axiosWithAuth(`/mediapost-create`, {
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error creating blog or media post", error);
    throw error; // Rethrow or handle further
  }
};
