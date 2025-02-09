import React, { useEffect } from "react";
import { Container } from "../../../../components/Style/Container";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useParams } from "react-router-dom";
import {
  getAllBlogmediaThunk,
  getAllBlogThunk,
  getBlogByIdThunk,
  getCommentByIBlogThunk,
} from "../../../../redux/blogredux/blog.slice";
import DOMPurify from 'dompurify';
import { Link } from "react-router-dom";
// Component Breadcrumbs im
import CommentForm from './Component/CommentForm';
import Comment from './Component/Comment';
import dayjs from "dayjs";
function Breadcrumbs() {
  return (
    <div className="md:text-[1.5rem] md:py-6 px-10">
      <a href="/" className="text-violet-700 hover:underline">
        Trang chủ
      </a>
      <span className="mx-2">/</span>
      <a href="/bai-viet" className="text-violet-700 hover:underline">
        Bài Viết
      </a>
      <span className="mx-2">/</span>
      <span className="text-neutral-700">Chi tiết bài viết</span>
      <div>
        <span className="text-[30px] flex justify-center items-center font-medium text-violet-700">
          Chi tiết bài viết
        </span>
      </div>
    </div>
  );
}

function DetailBlog() {
  const ListBlog = useAppSelector((state) => state.blog.listBlog);
  const mediaPosts = useAppSelector((state) => state.blog.mediaPosts);
  const AppDispatch = useAppDispatch();
  const { id } = useParams();
   
  const numericId = Number(id);

  const getCommentById = useAppSelector((state) => state.blog.listComment);
  
    
  useEffect(() => {
    AppDispatch(getAllBlogThunk());
    AppDispatch(getAllBlogmediaThunk());
  }, [AppDispatch]);

  const mergedPosts = ListBlog.map((post) => {
    const mediaItem = mediaPosts.find((m) => m.post_id === post.post_id);
    return {
      ...post,
      media_url: mediaItem ? mediaItem.media_url : null,
    };
  });

  const Blog = mergedPosts.find((post) => post.post_id === parseInt(id));
console.log(getCommentById);

  useEffect(() => {
    if (id != null) {
      AppDispatch(getCommentByIBlogThunk(parseInt(id)));
    }
  }, [AppDispatch, id]);

  const getRandomPosts = (posts, excludeId, count) => {
    const filteredPosts = posts.filter((post) => post.post_id !== excludeId);
    for (let i = filteredPosts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredPosts[i], filteredPosts[j]] = [
        filteredPosts[j],
        filteredPosts[i],
      ];
    }
    return filteredPosts.slice(0, count);
  };

  const relatedPosts = getRandomPosts(mergedPosts, parseInt(id), 5);
console.log(Blog);

  useEffect(() => {
    const fetchComments = async () => {
      try {
         await (getCommentByIBlogThunk(numericId));
      
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [numericId]);

  return (
    <Container className="bg-white">
      <div className="py-4 md:py-6">
        <Breadcrumbs />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-8 py-4 md:text-[1.5rem] leading-[2rem]">
        <div className="lg:w-[77%] space-y-6 bg-white">
          <h1 className="md:text-5xl font-bold text-gray-900 px-10">
            {Blog?.post_title}
          </h1>
          <div className="my-6 px-10">
            {Blog?.media_posts?.length > 0 && Blog.media_posts[0].media_url ? (
              <img
                src={`https://res.cloudinary.com/dcvkmhlhw/image/upload/v1732821311/Blog/${Blog.media_posts[0].media_url}`}
                alt="Hình ảnh minh họa bài viết"
                className="w-full lg:w-3/4 rounded-md"
              />
            ) : (
              <div className="w-full lg:w-3/4 h-64 bg-gray-300 rounded-md animate-pulse" />
            )}
          </div>
          <div className="flex text-gray-500 text-sm">
            <span className="text-lg md:text-xl px-5">{ dayjs(Blog?.post_date).format('YYYY-MM-DD HH:mm:ss')}</span>
            <span className="text-lg md:text-xl "> <span>💬</span>Sản phẩm tốt</span>
          </div>
          <div className="text-2xl text-gray-700 px-10" style={{ width: '95%' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Blog?.post_content, { WHOLE_DOCUMENT: true }) }} />
        </div>

        <div className="lg:w-[30%] space-y-4">
          
  <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 px-20">
    Bài viết liên quan
  </h3>
  <div className="grid grid-cols-1 gap-4 px-10">
    {relatedPosts.map((post) => (
      <div key={post.post_id} className="my-6 px-10">
        <Link to={`/bai-viet-chi-tiet/${post.post_id}`}>
          {post.media_posts?.length > 0 && post.media_posts[0].media_url ? (
            <img
              src={`https://res.cloudinary.com/dcvkmhlhw/image/upload/v1732821311/Blog/${post.media_posts[0].media_url}`}
              alt={post.post_title}
              className="w-full lg:w-3/4 rounded-md"
            />
          ) : (
            <div className="w-full lg:w-3/4 h-64 bg-gray-300 rounded-md animate-pulse" />
          )}
          <h4 className="text-xl font-medium mt-2">{post.post_title}</h4>
        </Link>
      </div>
    ))}
  </div>
</div>
      </div>
      <Comment reviews={getCommentById}/>
      <CommentForm id={numericId}/>
    </Container>
  );
}

export default DetailBlog;
  