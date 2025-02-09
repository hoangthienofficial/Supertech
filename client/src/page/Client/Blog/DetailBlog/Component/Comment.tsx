import { useEffect, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosReturnRight } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { createCommentRepliesByIdProductThunk, createLikeCommentThunk, deleteCommentByIdThunk, editCommentByIdThunk } from '../../../../../redux/comment/comment.slice';
import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import { useAppSelector } from '../../../../../redux/hooks';
import { BiSolidLike } from 'react-icons/bi';
import ReplyComment from './RelyComment';
import { formatDate, formatTimeAgo } from '../../../../../utils';
import toast from 'react-hot-toast';
import { IMG_BACKEND_USER } from '../../../../../constants';
import { useAvatar } from '../../../../../hooks/UseAvatar.hook';
import { useNavigate } from 'react-router-dom';
import ProductModalWithPagination from './ModalListComment';
import { Paths } from '../../../../../router/component/RouterValues';
import { createLikeCommentThunkBlog, deleteCommentByIdBlogThunk, putCommentByIdBlogThunk } from '../../../../../redux/blogredux/blog.slice';

function Comment(props: any) {
  const user: any = useAppSelector((state) => state.user.user);
  const login: any = useAppSelector((state) => state.user.login);
  const [expandedComments, setExpandedComments] = useState<boolean[]>(new Array(props.reviews?.length).fill(false));
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [activeAction, setActiveAction] = useState<{ action: 'edit' | 'reply' | null, index: number | null }>({ action: null, index: null });
  const [filteredComments, setFilteredComments] = useState<any[]>([]);

  const { avatarStyle, avatarText } = useAvatar({
    userImage: user?.user_image ? `${IMG_BACKEND_USER}/${user.user_image}` : null,
    userName: user?.user_name,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(props.reviews);
  const handleLike = async (id: number, idProduct: number) => {
    if (!login) {
      toast.error("Bạn cần đăng nhập!");
      navigate(`${Paths.Login}`);
      return;
    }
    let resp = {
      comment_post_id: id,
      post_id: idProduct
    };
    dispatch(createLikeCommentThunkBlog(resp))


  }
  useEffect(() => {
    setFilteredComments(props.reviews && Array.isArray(props.reviews) ? props.reviews : []);
  }, [props.reviews]);

  const handleActionToggle = (index: number, action: 'edit' | 'reply') => {
    setActiveAction((prevState) => prevState.index === index && prevState.action === action
      ? { action: null, index: null }
      : { action, index });
  };

  const handleDelete = (data: any) => {
    setActiveDropdown(null);
    // console.log(data);
    
    dispatch(deleteCommentByIdBlogThunk(data));
  };

  const handleCommentClick = (index: number) => {
    const updatedExpandedComments = [...expandedComments];
    updatedExpandedComments[index] = !updatedExpandedComments[index];
    setExpandedComments(updatedExpandedComments);
  };

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

 

  const CommentSchema = Yup.object().shape({
    commentText: Yup.string().required('Nội dung bình luận không được để trống').min(5, 'Nội dung phải có ít nhất 5 ký tự'),
  });

  return (
    <div>
      <div className="py-4 px-[1rem] md:px-[2rem] bg-white">
        <div className="flex justify-between flex-wrap">
          {filteredComments.slice(0, 6)?.map((review, index) => {
            return (
              <div className="flex items-start space-x-4 mt-[1rem] w-full md:w-[48%]" key={index}>
                <div
                  className={`flex text-[2.5rem] w-[5rem] h-[5rem] items-center justify-center rounded-full ${review?.user?.user_image ? "bg-cover bg-center bg-no-repeat" : "bg-[#F62682] text-[16px] text-white "} `}
                  style={{
                    backgroundImage: review?.user?.user_image ? `url(${IMG_BACKEND_USER}/${review.user.user_image})` : "none",
                  }}
                >
                  {!review?.user?.user_image && review?.user?.user_name ? review.user.user_name[0].toUpperCase() : null}
                </div>
                <div className="flex w-[100%] justify-between">
                  <div className="w-[100%]">
                    <div className="flex justify-between">
                      <div>
                            <h3 className="font-bold text-[2rem] flex  gap-[1rem] items-center">{review.user?.user_name} 
                                                   
                                               
                                          
                                                   
                                                   </h3> 
                        
                        {activeAction.index === index && activeAction.action === 'edit' ? (
                          <Formik
                            initialValues={{ commentText: review.comment_content }}
                            validationSchema={CommentSchema}
                            onSubmit={(values, { resetForm }) => {
                              const updatedComment = {
                                comment_post_id: review.comment_post_id,
                                post_id: review.post_id,
                                comment_content: values.commentText,
                              };

                              dispatch(putCommentByIdBlogThunk(updatedComment));
                              resetForm();
                              setActiveAction({ action: null, index: null });
                            }}
                          >
                            {({ errors, touched }) => (
                              <FormikForm className="flex items-center gap-2 w-full text-[1.8rem]">
                                <Field
                                  name="commentText"
                                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Chỉnh sửa bình luận..."
                                />
                                <button
                                  type="submit"
                                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                  Lưu
                                </button>
                              </FormikForm>
                            )}
                          </Formik>
                        ) : (
                          <p className="text-[1.8rem] text-gray-800">{review?.comment_content}</p>
                        )}
                      </div>

                      <div className="flex justify-between items-center flex-col text-[1.8rem] text-gray-500 mt-2 space-x-3">
                        <div className="flex gap-[.5rem] ">
                          <span>{formatTimeAgo(review?.comment_date)}</span>
                          <div className="relative">
                            {login ? (
                              <BsThreeDots
                                className="cursor-pointer"
                                onClick={() => handleDropdownToggle(index)}
                              />
                            ) : (
                              <div></div>
                            )}
                            {activeDropdown === index && (
                              <div className="w-[120px] text-[1.5rem] bg-white rounded-lg shadow-lg absolute right-0 mt-2 p-2">
                                <div className="flex flex-col space-y-2">
                                  {review.user_id === user.user_id ? (
                                    <>
                                      <button
                                        onClick={() => handleActionToggle(index, 'edit')}
                                        className="text-blue-500 hover:text-blue-700 transition-colors"
                                      >
                                        Chỉnh sửa
                                      </button>
                                      <button
                                        onClick={() => handleDelete(review)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                      >
                                        Xoá
                                      </button>
                                    </>
                                  ) : (
                                    <span className="text-gray-400 text-center">Không có quyền</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                 
                      </div>
                    </div>
                    

                    <div className="flex items-center justify-between">
                      {expandedComments[index] && (
                        <div className="pl-8">
                          <ReplyComment replies={review?.replies_comment_products} productId={review?.post_id} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='flex justify-center items-center'>
          {filteredComments.length === 0 ? '' : <ProductModalWithPagination reviews={filteredComments} />}
        </div>
        {filteredComments.length === 0 && (
          <div className="text-center text-[1.5rem] text-gray-500 mt-4">
            Chưa có người dùng bình luận
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;