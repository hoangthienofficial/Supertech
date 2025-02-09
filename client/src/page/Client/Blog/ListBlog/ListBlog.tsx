import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  getAllBlogmediaThunk,
  getAllBlogThunk,
} from "../../../../redux/blogredux/blog.slice";
import BlogCard from "./BlogCard";
import Sidebar from "./Sidebar";
import { GoSearch } from "react-icons/go";
import "../responsive/Blog.css";

function ListBlog() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ListBlogRedux: any = useAppSelector((state) => state.blog.listBlog);
  const AppDispatch = useAppDispatch();

  

  const [mergedPosts, setMergedPosts] = useState([]);

 
   useEffect(() => {
      AppDispatch(getAllBlogThunk());
      AppDispatch(getAllBlogmediaThunk());
    }, [AppDispatch]);
    useEffect(() => {
      setMergedPosts(ListBlogRedux);
      
    }, [ListBlogRedux]);
    console.log(mergedPosts)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 6;
  const totalPages = Math.ceil(mergedPosts?.length / pageSize);


  const currentPosts = mergedPosts
    ?.filter((post) => post.post_title?.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row-reverse bg-white pt-14 pb-48 px-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 space-y-10">
        <div className="flex mt-9 items-center space-x-2 text-[15px]">
          <div className="flex-1 flex bg-[#00000008] focus:outline-dotted rounded-lg p-[10px]">
            <input
              type="text"
              className="flex-1 text-[15px] outline-none bg-transparent"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
            />
            <GoSearch className="text-[18px]" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Bài viết mới</h2>
          <div className="h-px bg-purple-700 my-4" />
          {currentPosts?.map((post, index) => (
            <Sidebar key={index} props={post} />
          ))}
        </div>
      </div>

      {/* đầu trang */}
      <div className="w-full lg:w-3/4 mt-10 lg:mt-0">
        <h1 className="text-6xl font-medium text-indigo-700 text-center mb-5">
          Blog
        </h1>
        <p className="text-2xl text-center text-gray-600 mb-10 font-light">
          Chào mừng quý khách hàng
        </p>
        <div className="flex flex-wrap gap-5">
          {currentPosts?.map((post, index) => (
            <BlogCard key={index} props={post} />
          ))}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            className="px-8 py-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-[15px]"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Trước
          </button>
          <span className="flex items-center text-[15px]">{`Trang ${currentPage} / ${totalPages}`}</span>
          <button
            className="px-8 py-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-[15px]"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListBlog;
