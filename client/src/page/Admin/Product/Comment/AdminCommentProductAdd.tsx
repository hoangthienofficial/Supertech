import { Button, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { TbPlaylistAdd } from 'react-icons/tb';
import './AdminComment.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { createCommentByIdProductThunk, setCommentReducer } from '../../../../redux/comment/comment.slice';
import { Paths } from '../../../../router/component/RouterValues';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AdminCommentProductAdd(productDetail: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const login = useAppSelector((state) => state.user.login);
    const commentList = useAppSelector((state) => state.listComment.listComment);
    

    const AppDispatch = useAppDispatch();

    const socket = useAppSelector((state) => state.socket.socket);

    const Navigate = useNavigate();

    const ShowModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (socket) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            socket.on("new_comment", (newComment: any) => {
                AppDispatch(setCommentReducer([...commentList, newComment]));
            });
        }

        return () => {
            if (socket) {
                socket.off("new_comment");
            }
        };
    }, [socket, commentList, AppDispatch]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOk = async (e: any) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Vui lòng chọn sao!");
            return;
        }

        if (!login) {
            toast.error("Bạn cần đăng nhập!");
            Navigate(`${Paths.Login}`);
            return;
        }
        const newComment = {
            product_id: productDetail?.props?.product_id,
            comment_content: comment,
            comment_star: rating,
        };
        try {
            const resultAction = await AppDispatch(createCommentByIdProductThunk(newComment));
            if (createCommentByIdProductThunk.fulfilled.match(resultAction)) {
                // const createdComment = resultAction.payload;
                // dispatch(setCommentReducer([...commentList, ...createdComment]));
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

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value: number) => {
        setRating(value);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCommentChange = (e: any) => {
        setComment(e.target.value);
    };

    return (
        <>
            <Button onClick={ShowModal} className='p-10' type="primary">
                <TbPlaylistAdd className='text-[18px]' />
                Bình Luận Sản Phẩm Mới
            </Button>
            <Modal
                title={`Tạo bình luận cho ${productDetail?.props?.product_name}`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Thêm"
                cancelText="Hủy bỏ"
            >
                <form onSubmit={handleOk} className='gap-3 flex flex-col'>
                    <div className='flex h-auto col-span-2 flex-col gap-4'>
                        <label htmlFor='rating' className='text-[13px] text-[#81818177] font-medium'>
                            Chọn số sao đánh giá sản phẩm
                        </label>
                        <Select
                            value={rating}
                            className='h-[48px]'
                            onChange={handleChange}
                            options={[
                                { value: 0, label: 'Chưa đánh giá' },
                                { value: 1, label: '⭐' },
                                { value: 2, label: '⭐⭐' },
                                { value: 3, label: '⭐⭐⭐' },
                                { value: 4, label: '⭐⭐⭐⭐' },
                                { value: 5, label: '⭐⭐⭐⭐⭐' },
                            ]}
                        />
                    </div>
                    <div className='flex h-auto col-span-2 flex-col gap-4'>
                        <label htmlFor='comment' className='text-[13px] text-[#81818177] font-medium'>
                            Bình luận của tôi
                        </label>
                        <input
                            type='text'
                            placeholder='Chưa nhập'
                            className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none'
                            id='comment'
                            name='comment'
                            value={comment}
                            onChange={handleCommentChange}
                            required
                        />
                    </div>
                    <button type="submit" style={{ display: 'none' }}></button>
                </form>
            </Modal>
        </>
    );
}

export default AdminCommentProductAdd;