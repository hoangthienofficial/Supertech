

import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { TbPlaylistAdd } from 'react-icons/tb';
import './AdminComment.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { createCommentRepliesByIdProductThunk, setCommentReducer } from '../../../../redux/comment/comment.slice';
import { Paths } from '../../../../router/component/RouterValues';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AdminCommentProductDetailAdd(PropsDetail: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            socket.on("new_replies", (newComment: any) => {
                AppDispatch(setCommentReducer([...commentList, newComment]));
            });
        }

        return () => {
            if (socket) {
                socket.off("new_replies");
            }
        };
    }, [socket, commentList, AppDispatch]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOk = async (e: any) => {
        e.preventDefault();

        if (!login) {
            toast.error("Bạn cần đăng nhập!");
            Navigate(Paths.Login);
            return;
        }
        if (comment.length < 5) {
            toast.error("Bạn cần nhập 5 kí tự trở lên")
            return;
        };
        const newComment = {
            comment_id: PropsDetail?.props?.comment_id,
            product_id: PropsDetail?.props?.product_id,
            comment: comment,
        };
        AppDispatch(createCommentRepliesByIdProductThunk(newComment));
        toast.success("Phản hồi thành công")
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCommentChange = (e: any) => {
        setComment(e.target.value);
    };

    return (
        <>
            <Button onClick={ShowModal} className='p-10' type="primary">
                <TbPlaylistAdd className='text-[18px]' />
                Phản hồi bình luận sản phẩm mới
            </Button>
            <Modal
                title={`Tạo trả lời cho bình luận ${PropsDetail?.props?.comment_id}`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Thêm"
                cancelText="Hủy bỏ"
            >
                <form onSubmit={handleOk} className='gap-3 flex flex-col'>
                    <div className='flex h-auto col-span-2 flex-col gap-4'>
                        <label htmlFor='comment' className='text-[13px] text-[#81818177] font-medium'>
                            Phản hồi của tôi
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

export default AdminCommentProductDetailAdd;