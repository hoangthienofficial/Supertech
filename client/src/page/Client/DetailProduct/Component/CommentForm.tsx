import { useEffect, useState } from "react";
import { Rate, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { createCommentByIdProductThunk, setCommentReducer } from "../../../../redux/comment/comment.slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAvatar } from "../../../../hooks/UseAvatar.hook";
import { IMG_BACKEND_USER } from "../../../../constants";
import { getUserThunk } from "../../../../redux/user/user.slice";
import { Paths } from "../../../../router/component/RouterValues";

const { TextArea } = Input;

const CommentForm = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const login = useAppSelector((state) => state.user.login);
  const commentList = useAppSelector((state) => state.listComment.listComment);
  const socket = useAppSelector((state) => state.socket.socket);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { avatarStyle, avatarText } = useAvatar({
    userImage: user?.user_image ? `${IMG_BACKEND_USER}/${user.user_image}` : null,
    userName: user?.user_name,
  });
  console.log(commentList);
  
  useEffect(() => {
    if (socket) {
      socket.on("new_comment", (newComment: any) => {
        dispatch(setCommentReducer([newComment, ...commentList])); // Thêm bình luận mới vào đầu danh sách
      });
    }

    return () => {
      if (socket) {
        socket.off("new_comment");
      }
    };
  }, [socket, commentList, dispatch]);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Vui lòng chọn sao!");
      return;
    }

    if (!login) {
      toast.error("Bạn cần đăng nhập!");
      navigate(`${Paths.Login}`);
      return;
    }

    const newComment = {
      product_id: Number(props.id),
      comment_content: comment,
      comment_star: rating,
    };

    try {
      const resultAction = await dispatch(createCommentByIdProductThunk(newComment));
      if (createCommentByIdProductThunk.fulfilled.match(resultAction)) {
        // const createdComment = resultAction.payload;
        // dispatch(setCommentReducer([...commentList, resultAction]));
        toast.success("Bình luận thành công!");
        setComment("");
        setRating(0);
      } else {
        toast.error("Gửi bình luận thất bại!");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  const isDisabled = !comment.trim();

  return (
    <div className="px-[1rem] md:px-[2rem] bg-white py-[1rem]">
      <h3 className="text-[1.6rem] md:text-[2rem]">Ý kiến của bạn</h3>
      <div className="mt-[1rem] md:mt-[2rem] flex flex-col md:flex-row">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          {login ? (
            <div className="flex h-[80px] md:h-[110px] w-[80px] md:w-[110px] items-center justify-center rounded-full" style={avatarStyle}>
              <div className="text-[1.4rem] md:text-[1.7rem] leading-none text-center">{avatarText}</div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-[80px] md:w-[100px] h-[80px] md:h-[100px] bg-[#F0F0F0] rounded-full">
              <span className="text-[1.6rem] md:text-[2rem] text-[#555] font-bold">User</span>
            </div>
          )}
          <Rate 
            className="mt-2 md:mt-4 text-[1.4rem] md:text-[1.8rem]" 
            onChange={setRating} 
            value={rating}
            style={{ fontSize: 'inherit' }}
          />
        </div>
        <div className="w-full md:w-[90%] md:ml-4">
          <TextArea
            rows={6}
            placeholder="Nhập ý kiến của bạn..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="text-[1.4rem] md:text-[1.6rem]"
          />
          <div className="flex justify-end">
            <button
              className={`py-[0.8rem] md:py-[1rem] px-[1.5rem] md:px-[2rem] text-[1.6rem] md:text-[1.9rem] mt-4 rounded-md ${
                isDisabled ? "bg-gray-400 text-gray-200" : "bg-[#7500CF] text-white"
              }`}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
