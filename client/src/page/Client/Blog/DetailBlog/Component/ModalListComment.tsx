import React, { useState, useEffect } from "react";
import { Modal, Button, List, Pagination } from "antd";
import ReplyComment from "./RelyComment";
import toast from "react-hot-toast";
import { createCommentRepliesByIdProductThunk, createLikeCommentThunk, deleteCommentByIdThunk, editCommentByIdThunk } from "../../../../../redux/comment/comment.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaRegStar, FaStar } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosReturnRight } from "react-icons/io";
import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import { useAppSelector } from "../../../../../redux/hooks";
import { useAvatar } from "../../../../../hooks/UseAvatar.hook";
import { IMG_BACKEND_USER } from "../../../../../constants";
import { formatDate, formatTimeAgo } from "../../../../../utils";
import { Paths } from "../../../../../router/component/RouterValues";
const ProductModalWithPagination = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Số sản phẩm mặc định mỗi trangyy

  // Theo dõi kích thước cửa sổ
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Nếu kích thước màn hình nhỏ hơn 768px
        setPageSize(4); // Đặt pageSize thành 4
      } else {
        setPageSize(6); // Đặt pageSize thành 6
      }
    };

    handleResize(); // Gọi hàm ngay khi component được mount
    window.addEventListener('resize', handleResize); // Thêm event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Dọn dẹp event listener
    };
  }, []);

  // Lấy danh sách bình luận cho trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentReviews = props.reviews?.slice(startIndex, endIndex);

  // Mở Modal
  const handleOpenModal = () => setIsModalVisible(true);

  // Đóng Modal
  const handleCloseModal = () => setIsModalVisible(false);

  // Thay đổi trang
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const user: any = useAppSelector((state) => state.user.user);
  const login:any=useAppSelector((state)=>state.user.login)
  const [expandedComments, setExpandedComments] = useState<boolean[]>(new Array(props.reviews?.length).fill(false));
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [activeAction, setActiveAction] = useState<{ action: 'edit' | 'reply' | null, index: number | null }>({ action: null, index: null });
  const { avatarStyle, avatarText } = useAvatar({
    userImage: user?.user_image ? `${IMG_BACKEND_USER}/${user.user_image}` : null,
    userName: user?.user_name,
  });
  const handleActionToggle = (index: number, action: 'edit' | 'reply') => {
    // Nếu nhấn cùng một hành động thì tắt nó đi, còn không thì bật hành động mới
    setActiveAction((prevState) => prevState.index === index && prevState.action === action
      ? { action: null, index: null }
      : { action, index });
  };
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleDelete=(data:any)=>{
    
    setActiveDropdown(null);

      dispatch(deleteCommentByIdThunk(data));
  }
  const handleCommentClick = (index: number) => {
    const updatedExpandedComments = [...expandedComments];
    updatedExpandedComments[index] = !updatedExpandedComments[index];
    setExpandedComments(updatedExpandedComments);
  };

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };


  

    // Tính toán chỉ số bắt đầu và kết thúc cho mỗi trang



    // Tính tổng số trang
    const totalReviews = props.reviews?.length || 0;
    const totalPages = Math.ceil(totalReviews / pageSize);
const handleLike=async(id:number,idProduct:number)=>{
  if (!login) {
    toast.error("Bạn cần đăng nhập!");
    navigate(Paths.Login);
    return;
  }
  let resp = {
    id: id,
    product_id: idProduct
};
  dispatch(createLikeCommentThunk(resp))
  console.log(resp);
  
}
  const CommentSchema = Yup.object().shape({
    commentText: Yup.string().required('Nội dung bình luận không được để trống').min(5, 'Nội dung phải có ít nhất 5 ký tự'),
  });
  
  return (
    <div style={{ padding: "20px" }}>
      <Button type="primary"  onClick={handleOpenModal}>
        Xem thêm
      </Button>

      <Modal
        title="Danh sách bình luận"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
        width={1200}
        style={{
            maxHeight: '600px', // Đặt chiều cao tối đa cho modal
            overflowY: 'auto', // Cho phép cuộn khi nội dung vượt quá chiều cao
          }}
      >
        {/* Danh sách sản phẩm */}
    
       
        <div className="flex justify-between flex-wrap h-auto">
          {currentReviews?.map((review, index) => {
              return (
                <div className="flex items-start space-x-4 mt-[1rem] w-full md:w-[48%] sm:w-[100%]" key={index}>
  
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
                              
                              {review?.isPurchase ?                           
                                 <FaCheckCircle className="text-[green]"/>
  : ""}
                     
                              
                              </h3>                       
                               <div className="flex items-center text-[1.5rem]">
                            <div className="ml-2 text-[1.5rem] text-gray-500">{formatDate(review.comment_date)}</div>
                        
                          </div>
                          {activeAction.index === index && activeAction.action === 'edit' ? (
                            <Formik
                              initialValues={{ commentText: review.comment_content }}
                              validationSchema={CommentSchema}
                              onSubmit={(values, { resetForm }) => {
                                const updatedComment = {
                                  comment_id: review.comment_id,
                                  product_id: review.product_id,
                                  comment_content: values.commentText,
                                };
  
                                dispatch(editCommentByIdThunk(updatedComment));  // Gọi API chỉnh sửa bình luận
  
                                // Reset form và đóng action
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
                                  <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                                  >
                                    Hủy
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
                              {
                                login ? (
                                  <BsThreeDots
                                    className="cursor-pointer"
                                    onClick={() => handleDropdownToggle(index)}
                                  />
  
                                ) : (
                                  <div>
  
                                  </div>
                                )
                              }
  
  
                              {activeDropdown === index && (
                                <div className="w-[120px] text-[1.5rem] bg-white rounded-lg shadow-lg absolute right-0 mt-2 p-2">
                                  <div className="flex flex-col space-y-2">
                                    {/* Hiển thị nút "Chỉnh sửa" và "Xóa" nếu là chủ sở hữu bình luận */}
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
  
  
                        {activeAction.index === index && activeAction.action === 'reply' && (
                          <Formik
                            initialValues={{ commentText: '' }} // Giá trị ban đầu từ review.comment_content
                            validationSchema={CommentSchema}
                            onSubmit={(values, { resetForm }) => {
                              if (!login) {
                                toast.error("Bạn cần đăng nhập!");
                                navigate(Paths.Login);
                                return;
                              }
                              if (values.commentText.length < 5) {
                                toast.error("Bạn cần nhập 5 kí tự trở lên")
  
  
                              };
                              const newComment = {
                                comment_id: review.comment_id,
                                product_id: review.product_id,
                                comment: values.commentText, // Gửi giá trị commentText
                              };
  
  
                              dispatch(createCommentRepliesByIdProductThunk(newComment))
  
                              toast.success("Phản hồi thành công")
                              resetForm();
  
                              // Đóng dropdown hoặc hành động sau khi submit (nếu có)
                              setActiveAction({ action: null, index: null });
                            }}
                          >
                            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                              <FormikForm onSubmit={handleSubmit} className="flex items-center gap-2 w-full text-[1.8rem]">
                                <Field
                                  name="commentText" // Tên của trường phải trùng với initialValues
                                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Chỉnh sửa bình luận..."
                                  value={values.commentText} // Bind giá trị vào input
                                  onChange={handleChange}    // Xử lý sự kiện thay đổi giá trị
                                  onBlur={handleBlur}        // Xử lý sự kiện blur
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
                        )}
  
                      </div>
                      {expandedComments[index] && (
                        <div className="pl-8">
                          <ReplyComment replies={review?.replies_comment_products} productId={review?.product_id} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
          })}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center mt-4">
          <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalReviews}
              onChange={(page) => setCurrentPage(page)}
              pageSizeOptions={[4]} // Giới hạn số lượng bình luận mỗi trang
              showSizeChanger={false} // Ẩn tùy chọn thay đổi số trang
              showQuickJumper={false} // Ẩn tùy chọn nhảy nhanh giữa các trang
              disabled={totalReviews <= pageSize} // Tắt phân trang khi không đủ bình luận
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProductModalWithPagination;