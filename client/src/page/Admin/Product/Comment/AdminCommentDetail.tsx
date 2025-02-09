/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Popover, Table, Modal } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { IoCloudDownloadOutline } from 'react-icons/io5'
import { GoSearch } from 'react-icons/go'
import { FiFilter } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { CiBookmarkRemove } from 'react-icons/ci'
import { IMG_BACKEND_USER } from '../../../../constants'
import AdminCommentProductDetailAdd from './AdminCommentProductDetailAdd'
import Swal from 'sweetalert2'
import { deleteCommentRepliesByIdThunk, editCommentRepliesByIdThunk, getCommentByIdProductThunk } from '../../../../redux/comment/comment.slice'
import { getProductByIdThunk } from '../../../../redux/product/product.slice'
import toast from 'react-hot-toast'
import { BiSolidEdit } from 'react-icons/bi'
import { Paths } from '../../../../router/component/RouterValues'

interface Comment {
    [key: string]: any;
}

function AdminCommentDetail() {
    const [selectedCheckbox, setSelectedCheckbox] = useState('');
    const [DetailComment, setDetailComment] = useState<Comment[]>([]);
    const [NewDetailComment, NewsetDetailComment] = useState<Comment[]>([]);

    const [PropsDetail, setPropsDetail] = useState<Comment[]>([]);
    const AppDispatch = useAppDispatch();
    const { productId, commentId } = useParams();
    const getCommentById: any = useAppSelector((state) => state.listComment.listComment);
    const [comment, setComment] = useState('');
    const [oneComment, setOneComment] = useState<Comment>({} as Comment);
    const login = useAppSelector((state) => state.user.login);
    const user = useAppSelector((state) => state.user.user);
    const Navigate = useNavigate();
    dayjs.extend(relativeTime);
    dayjs.locale('vi');
    const customLocale = {
        ...dayjs.Ls.vi,
        relativeTime: {
            future: 'trong %s',
            past: '%s trước',
            s: 'vài giây',
            m: '1 phút',
            mm: '%d phút',
            h: '1 giờ',
            hh: '%d giờ',
            d: '1 ngày',
            dd: '%d ngày',
            M: '1 tháng',
            MM: '%d tháng',
            y: '1 năm',
            yy: '%d năm'
        }
    };
    dayjs.locale(customLocale);

    const [ColumsComments, setColumsComments] = useState<any[]>([]);
    const [staffKeys, setStaffKeys] = useState<string[]>([]);

    useEffect(() => {
        if (!isNaN(Number(productId))) {
            AppDispatch(getProductByIdThunk(Number(productId)));
            AppDispatch(getCommentByIdProductThunk(Number(productId)))
        }

    }, [productId, AppDispatch])


    useEffect(() => {
        if (getCommentById && getCommentById.length > 0) {
            const DetailCommentFind = getCommentById.find((comment: any) => comment.comment_id == commentId);
            setDetailComment(DetailCommentFind?.replies_comment_products)
            setPropsDetail(DetailCommentFind);

        }
    }, [commentId, getCommentById])

    useEffect(() => {
        setComment(oneComment.comment)
    }, [oneComment.comment])

    useEffect(() => {
        if (NewDetailComment && NewDetailComment.length > 0) {
            const keys = NewDetailComment.map((comment: Comment) => Object.keys(comment));
            keys.push(['tacvu']);
            setStaffKeys([...new Set(keys.flat())] as string[]);

        }
    }, [NewDetailComment]);
    const [ModalState, setModalState] = useState(false);

    const Update = useCallback((ModalForm: boolean, data: any) => {
        setOneComment(data);
        setComment(data.comment);
        setModalState(!ModalForm);
    }, [])

    const handleEdit = useCallback((ModalForm: boolean, data: any, user: any) => {
        if (user.user_role == data.user.user_role) {
            if (user.user_id != data.user.user_id) {
                toast.error("Bạn không thể sửa bình luận của người cùng cấp!");
                return;
            } else {
                Update(ModalForm, data)
            }
        }

        if (user.user_role != data.user.user_role) {
            if (data.user.user_role == 0) {
                toast.error("Bạn không thể sửa bình luận của Admin!");
                return;
            } else {

                if (user.user_role == 0 || user.user_role == 2) {
                    Update(ModalForm, data)
                } else {
                    if (user.user_id != data.user.user_id) {
                        toast.error("Bạn không thể sửa bình luận của người khác!");
                        return;

                    }
                }
            }

        }
    }, [Update]);

    const handleCommentChange = (e: any) => {
        setComment(e.target.value);
    };

    const handleOk = async (e: any) => {
        e.preventDefault();
        if (!login) {
            toast.error("Bạn cần đăng nhập!");
            Navigate(`${Paths.Login}`);
            return;
        }
        if (comment.length < 5) {
            toast.error("Bạn cần nhập 5 kí tự trở lên")
            return;
        };
        if (productId != '' && oneComment.id != '') {
            const data = {
                product_id: Number(productId),
                comment: comment,
                id: oneComment.id,
            };
            AppDispatch(editCommentRepliesByIdThunk(data));
            toast.success("Chỉnh sửa bình luận thành công");
            setModalState(!ModalState);

        }
    }

    const handleCancel = () => {
        setModalState(!ModalState);
    };

    const renderModal = (ModalForm: boolean) => {
        return (
            <Modal
                title={`Sửa phản hồi ${oneComment.id}`}
                open={ModalForm}
                onCancel={handleCancel}
                onOk={handleOk}
                okText="Sửa"
                cancelText="Hủy bỏ"
            >
                <form onSubmit={handleOk} className='gap-3 flex flex-col'>
                    <div className='flex h-auto col-span-2 flex-col gap-4'>
                        <label htmlFor='comment' className='text-[13px] text-[#81818177] font-medium'>
                            Dữ liệu trả lời ban đầu
                        </label>

                        <input
                            type='text'
                            placeholder='Chưa nhập'
                            className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none'
                            value={oneComment.comment}
                            required
                            disabled
                        />
                    </div>
                    <div className='flex h-auto col-span-2 flex-col gap-4'>
                        <label htmlFor='comment' className='text-[13px] text-[#81818177] font-medium'>
                            Sửa phản hồi của tôi
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
        );
    };


    const Remove = useCallback((data: any) => {
        Swal.fire({
            title: `Xác nhận xóa ${data.id}`,
            text: "Bạn có chắc chắn muốn xóa bình luận này?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
        }).then((result) => {
            if (result.isConfirmed) {
                const DataReplies = {
                    product_id: Number(productId),
                    id: data.id,
                }

                AppDispatch(deleteCommentRepliesByIdThunk(DataReplies));
                Swal.fire({
                    icon: 'success',
                    title: 'Đã Xóa',
                    text: `Bạn đã Xóa ${data.id}`,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Đã Hủy',
                    text: 'Bạn đã hủy thao tác xóa.',
                });
            }

        })
    }, [AppDispatch, productId])

    const handleDelete = useCallback((data: any, user: any) => {



        if (user.user_role == data.user.user_role) {
            if (user.user_id != data.user.user_id) {
                toast.error("Bạn không thể xóa bình luận của người cùng cấp!");
                return;
            } else {
                Remove(data)
            }
        }

        if (user.user_role != data.user.user_role) {
            if (data.user.user_role == 0) {
                toast.error("Bạn không thể xóa bình luận của Admin!");
                return;
            } else {

                if (user.user_role == 0 || user.user_role == 2) {
                    Remove(data)
                } else {
                    if (user.user_id != data.user.user_id) {
                        toast.error("Bạn không thể xóa bình luận của người khác!");
                        return;

                    }
                }
            }

        }


    }, [Remove]);



    useEffect(() => {
        const Colums = staffKeys.map((comment) => {
            switch (comment) {
                case 'id':
                    return {
                        title: 'Nội dung trả lời',
                        key: comment,
                        dataIndex: comment
                    };
                case 'comment':
                    return {
                        title: 'Nội dung trả lời',
                        key: comment,
                        render: (text: any) => (
                            <span>{text.comment}</span>
                        )
                    };
                case 'user':
                    return {
                        title: 'Người dùng',
                        key: comment,
                        render: (user: any) => (
                            <div className="flex items-center gap-5">
                                <img className='rounded-md object-cover' src={user.user.user_image === null || user.user.user_image === undefined ? 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg' : IMG_BACKEND_USER + `/${user.user.user_image}`} alt="" style={{ width: 50, height: 50 }} />
                                <span>{user.user.user_name}</span>
                            </div>
                        )
                    };
                case 'repiles_date':

                    return {
                        title: 'Thời gian trả lời',
                        key: comment,
                        render: (record: any) => {
                            const relativeTime = dayjs(record.comment_date).fromNow();
                            return <span>{relativeTime}</span>;
                        },
                    };


                case 'likes':
                    return {
                        title: 'Likes',
                        key: comment,
                        render: (like: any) => (
                            <div>
                                {like.likes.length}
                            </div>
                        ),
                    };
                case 'tacvu': {

                    return {
                        title: 'Tác Vụ',
                        key: 'tacvu',
                        render: (record: any) => (

                            <div className='flex text-[24px] box-border gap-1 items-center'>
                                <BiSolidEdit
                                    onClick={() => handleEdit(ModalState, record, user)}
                                    className='cursor-pointer text-[#9000ff67] transition-all duration-700 hover:text-[#9000ffcb]'
                                />
                                <CiBookmarkRemove
                                    className='cursor-pointer text-red-300 transition-all duration-700 hover:text-[red]'
                                    onClick={() => handleDelete(record, user)}
                                />
                            </div>
                        ),
                    };
                }

                default:
                    return null;
            }
        }).filter(column => column !== null);

        setColumsComments(Colums);
    }, [ModalState, handleDelete, handleEdit, user, staffKeys]);


    const [valueInputSearch, setvalueInputSearch] = useState('');
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setvalueInputSearch(e.target.value);
    }


    useEffect(() => {
        if (valueInputSearch.trim() === "") {
            NewsetDetailComment(DetailComment);
        } else {
            const sanitizedSearchTerm = valueInputSearch.replace(/\s+/g, '').toLowerCase();

            const filterComment = DetailComment?.filter((item: any) => {
                const IdcommentFilter = item?.id;
                const ContentcommentFilter = item?.comment;
                const userNamefilter = item?.user.user_name;

                const userNameString = (typeof userNamefilter === 'string' || userNamefilter instanceof String) ? userNamefilter : String(userNamefilter || '');
                const ContentcommentFilterString = (typeof ContentcommentFilter === 'string' || ContentcommentFilter instanceof String) ? ContentcommentFilter : String(ContentcommentFilter || '');
                const IdcommentFilterString = (typeof IdcommentFilter === 'number' || IdcommentFilter instanceof Number) ? IdcommentFilter.toString() : String(IdcommentFilter || '');

                return userNameString.replace(/\s+/g, '').toLowerCase().includes(sanitizedSearchTerm) ||
                    ContentcommentFilterString.replace(/\s+/g, '').toLowerCase().includes(sanitizedSearchTerm) ||
                    IdcommentFilterString.replace(/\s+/g, '').toLowerCase().includes(sanitizedSearchTerm);
            });

            NewsetDetailComment(filterComment);


        }
    }, [DetailComment, valueInputSearch])





    useEffect(() => {
        const arrangeArray = [...DetailComment].sort((a: any, b: any) => {
            if (selectedCheckbox === 'new') {
                return new Date(b.repiles_date).getTime() - new Date(a.repiles_date).getTime();
            } else if (selectedCheckbox === 'old') {
                return new Date(a.repiles_date).getTime() - new Date(b.repiles_date).getTime();
            }
            return 0;
        });

        NewsetDetailComment(arrangeArray);
    }, [DetailComment, selectedCheckbox]);






    return (
        <div className='flex  flex-col p-12 gap-5 bg-[#f2edf3]'>
            <div className='flex-1 bg-white flex flex-col rounded-xl shadow-lg'>
                <div className='flex items-center justify-between box-border p-[24px]'>
                    <span className='text-[30px] font-medium text-[#ffd700]'>Phản hồi của bình luận {commentId}</span>
                    <div className='flex gap-3'>
                        <Button className='p-10'>
                            <IoCloudDownloadOutline className='text-[18px]' />
                            Tải về PDF
                        </Button>
                        <AdminCommentProductDetailAdd props={PropsDetail} />

                    </div>
                </div>

                <div className='flex p-[24px] items-center justify-between gap-3'>
                    <div className='flex-1 flex bg-[#00000008] focus:outline-dotted rounded-lg p-[16px]'>
                        <input onChange={handleSearch} type="text" className='flex-1 text-[15px] outline-none bg-transparent' placeholder='Tìm kiếm bình luận sản phẩm...' />
                        <GoSearch className='text-[18px]' />
                    </div>

                    <Popover
                        content={<div className='flex flex-col'>


                            <div className='flex justify-between p-[12px] w-[200px] gap-2'>
                                <label className='text-[14px]'>Mới nhất</label>
                                <Checkbox checked={selectedCheckbox === 'new'} onChange={() => setSelectedCheckbox('new')}></Checkbox>
                            </div>
                            <div className='flex gap-2 justify-between p-[12px]'>
                                <label className='text-[14px]'>Cũ nhất</label>
                                <Checkbox checked={selectedCheckbox === 'old'} onChange={() => setSelectedCheckbox('old')}></Checkbox>
                            </div>


                        </div>}
                        title="Lọc"
                        trigger="click"
                        placement="bottomRight"
                    >
                        <Button className='p-10'>
                            <FiFilter className='text-[18px]' />
                            Lọc
                        </Button>
                    </Popover>
                </div>

                <div className='p-[24px] relative overflow-x-auto h-[1000px] flex flex-col'>
                    <Table
                        className='flex-1'

                        columns={ColumsComments || []}
                        dataSource={Array.isArray(NewDetailComment) ? NewDetailComment : []}

                        size='large'
                        pagination={{ pageSize: 10 }}
                    />

                </div>
            </div>
            {ModalState && renderModal(ModalState)}
        </div>
    )
}

export default AdminCommentDetail