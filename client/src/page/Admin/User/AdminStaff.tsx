/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Popover, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { BiSolidEdit } from 'react-icons/bi';
import { CiBookmarkRemove } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteStaffThunk, getAllUserThunk } from '../../../redux/user/user.slice';
import { checkRoleAndShowAlert, CheckUpdateUser, Level } from './Component/DataStaff';
import { jwtDecode } from "jwt-decode";
import { Paths } from '../../../router/component/RouterValues';
import { IMG_BACKEND_USER } from '../../../constants';

interface tokenDataClient {
    user_id: number,
    user_role: number
}
interface UserTokenClientInterface extends tokenDataClient {
    data: tokenDataClient
}

function AdminStaff() {
    const Allstaffs: any = useAppSelector((state) => state.user.Alluser);
    const [DataAllstaffs, setDataAllstaffs] = useState<any[]>([]);
    const AppDispatch = useAppDispatch();
    const [staffKeys, setStaffKeys] = useState<string[]>([]);
    const [columns, setColumns] = useState<any[]>([]);
    const [valueInputSearch, setvalueInputSearch] = useState(``);
    const TokenstaffsClient: any = useAppSelector((state) => state.user.token);

    const [RoleStaff, setRoleStaff] = useState<number | undefined>();
    const [IdStaff, setIdStaff] = useState<number | undefined>();

    useEffect(() => {
        if (TokenstaffsClient?.length > 0 || TokenstaffsClient != null) {
            const UserTokenClient: UserTokenClientInterface = jwtDecode(TokenstaffsClient);
            setRoleStaff(UserTokenClient.data.user_role);
            setIdStaff(UserTokenClient.data.user_id);
        }
    }, [TokenstaffsClient]);


    // const [TokenstaffsAdmin, setTokenstaffsAdmin]




    useEffect(() => {
        AppDispatch(getAllUserThunk());
    }, [AppDispatch]);

    useEffect(() => {
        setDataAllstaffs(Allstaffs);
    }, [Allstaffs])





    useEffect(() => {
        if (Allstaffs && Allstaffs.length > 0) {
            const keys = Allstaffs.map((staff: string) => Object.keys(staff));
            keys.push('tacvu');

            setStaffKeys([...new Set(keys.flat())] as string[]);
        }
    }, [Allstaffs])



    const reverseDate = (dateString: string) => {
        if (!dateString) {
            console.error('Invalid date string');
            return;
        }

        const [datePart, timePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('-');

        const formattedDate = `${timePart} ${day}/${month}/${year}`;

        return formattedDate;


    };



    useEffect(() => {




        const ColumnStaffs = staffKeys.map((staff) => {

            switch (staff) {
                case 'user_id':
                    return {
                        title: 'ID',
                        dataIndex: staff,
                        key: staff,
                    };

                case "user_image":
                    return {
                        title: "Hình",
                        dataIndex: staff,
                        key: staff,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        render: (src: any, record: any) => (
                            <>
                                {src ? (
                                    <img
                                        className="rounded-full object-cover"
                                        src={`${IMG_BACKEND_USER}/${src}`}
                                        alt={record.user_name} // Đảm bảo rằng alt chỉ là một chuỗi (tên người dùng)
                                        style={{ width: 50, height: 50 }}
                                    />
                                ) : (
                                    <div
                                        className="rounded-full flex items-center justify-center"
                                        style={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor: 'rgb(37 99 235 / var(--tw-bg-opacity))',
                                            color: 'white',
                                            fontSize: '20px',
                                        }}
                                    >
                                        {record.user_name ? record.user_name.charAt(0).toUpperCase() : '?'} {/* Hiển thị chữ cái đầu tiên từ tên người dùng */}
                                    </div>
                                )}
                            </>
                        ),


                    };
                case 'user_name':
                    return {
                        title: 'Tên',
                        dataIndex: staff,
                        key: staff,
                        render: (text: any) => (
                            <>
                                {
                                    text == "" || text == null ? "Cần Cập Nhật Dữ Liệu" : text
                                }
                            </>
                        ),

                    };

                case 'user_birth':
                    return {
                        title: 'Ngày Sinh Nhật',
                        dataIndex: staff,
                        key: staff,
                        render: (text: any) => (
                            <>
                                {
                                    text == "" || text == null ? "Cần Cập Nhật Dữ Liệu" : reverseDate(text)
                                }
                            </>
                        ),



                    }
                case 'user_phone':
                    return {
                        title: 'Số điện thoại',
                        dataIndex: staff,
                        key: staff,
                        render: (text: any) => (
                            <>
                                {
                                    text == "" || text == null ? "Cần Cập Nhật Dữ Liệu" : text
                                }
                            </>
                        ),

                    }

                case 'user_email':
                    return {
                        title: 'Email',
                        dataIndex: staff,
                        key: staff,
                        render: (text: any) => (
                            <>
                                {
                                    text == "" || text == null ? "Cần Cập Nhật Dữ Liệu" : text
                                }
                            </>
                        ),
                    }

                case 'user_address':
                    return {
                        title: 'Địa Chỉ',
                        dataIndex: staff,
                        key: staff,

                        render: (text: any) => (
                            <>
                                {
                                    text == "" || text == null ? "Cần Cập Nhật Dữ Liệu" : text.replace(/<p>|<\/p>/g, "")
                                }
                            </>
                        ),



                    }
                case 'user_role':
                    return {
                        title: 'Vai trò',
                        dataIndex: staff,
                        key: staff,
                        render: (text: any) => (
                            <div className={`w-[200px] text-white font-medium rounded-md p-2 flex items-center ${text == 11 ? 'bg-[#3aff2085]' : ''} ${text == 10 ? 'bg-[#77757575]' : ''} ${text == 9 ? 'bg-[#1a1c9685]' : ''} ${text == 8 ? 'bg-[#00000093]' : ''} ${text == 7 ? 'bg-[#7c164685]' : ''} ${text == 6 ? 'bg-[#dd741285]' : ''} ${text == 5 ? 'bg-[#ab2af585]' : ''} ${text == 4 ? 'bg-[#f52ac285]' : ''} ${text == 3 ? 'bg-[#3963f085]' : ''} ${text == 2 ? 'bg-[#0eb397d2]' : ''} ${text == 1 ? 'bg-[#b6b30eb7]' : ''} ${text == 0 ? 'bg-[#ff000085]' : ''} gap-4`}>
                                <div className={`w-[10px] ml-4 rounded-full h-[10px] ${text == 11 ? 'bg-[#3aff20]' : ''} ${text == 10 ? 'bg-[#77777798]' : ''} ${text == 9 ? 'bg-[#1a1c96]' : ''} ${text == 8 ? 'bg-[#000000]' : ''} ${text == 7 ? 'bg-[#7c1646]' : ''} ${text == 6 ? 'bg-[#dd7412]' : ''} ${text == 5 ? 'bg-[#ab2af5]' : ''} ${text == 4 ? 'bg-[#f52ac2]' : ''} ${text == 3 ? 'bg-[#3963f0b2]' : ''} ${text == 2 ? 'bg-[#2af5d3]' : ''} ${text == 1 ? 'bg-[#ffd000]' : ''} ${text == 0 ? 'bg-[red]' : ''}`}></div>
                                {text == 11 ? 'Người Dùng' : ''} {text == 10 ? 'Nhân Viên Thử Việc' : ''} {text == 9 ? 'Nhân Viên Bảo Vệ' : ''}
                                {text == 8 ? 'Nhân Viên Kho' : ''}{text == 7 ? 'Nhân Viên Hỗ Trợ' : ''} {text == 6 ? 'Nhân Viên Pháp Lý' : ''}
                                {text == 5 ? 'Nhân Viên Kế Toán' : ''} {text == 4 ? 'Nhân Viên Tiếp Thị' : ''} {text == 3 ? 'Nhân Viên IT' : ''}
                                {text == 2 ? 'Nhân Viên Bán Hàng' : ''} {text == 1 ? 'Nhân Viên Quản Lí' : ''} {text == 0 ? 'Chủ cửa hàng' : ''}
                            </div>
                        ),
                    }
                case 'level':
                    return {
                        title: 'Thăng hạng',
                        dataIndex: staff,
                        key: staff,
                        render: (src: any) => (
                            <div className="flex-1 flex items-center gap-3">
                                {Level(src)}
                            </div>
                        ),
                    }


                case 'tacvu': {
                    return {
                        title: 'Tác Vụ',
                        key: 'tacvu',
                        render: (record: any) => (
                            <div className='flex text-[24px] box-border gap-1 items-center'>
                                <BiSolidEdit
                                    className='cursor-pointer text-[#9000ff67] transition-all duration-700 hover:text-[#9000ffcb]'
                                    onClick={() => handleEdit(record.user_id, record.user_role, RoleStaff, IdStaff)}
                                />
                                <CiBookmarkRemove
                                    className='cursor-pointer text-red-300 transition-all duration-700 hover:text-[red]'
                                    onClick={() => handleDelete(record.user_id, record.user_role, RoleStaff, IdStaff)}
                                />
                            </div>
                        ),
                    };
                }





                default:
                    return null;
            }

        }).filter(col => col !== null);
        setColumns(ColumnStaffs);
    }, [staffKeys]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setvalueInputSearch(e.target.value);
    }

    useEffect(() => {
        if (valueInputSearch.trim() === "") {
            setDataAllstaffs(Allstaffs);
        } else {
            const sanitizedSearchTerm = valueInputSearch.replace(/\s+/g, '').toLowerCase();

            const filteredData = Allstaffs.filter((item: any) => {
                const userName = item?.user_name;
                const userEmail = item?.user_email;
                const userPhone = item?.user_phone;

                const userNameString = (typeof userName === 'string' || userName instanceof String) ? userName : String(userName || '');
                const userEmailString = (typeof userEmail === 'string' || userEmail instanceof String) ? userEmail : String(userEmail || '');
                const userPhoneString = (typeof userPhone === 'string' || userPhone instanceof String) ? userPhone : String(userPhone || '');

                return userNameString.replace(/\s+/g, '').toLowerCase().includes(sanitizedSearchTerm) ||
                    userEmailString.replace(/\s+/g, '').toLowerCase().includes(sanitizedSearchTerm) ||
                    userPhoneString.replace(/\s+/g, '').toLowerCase().includes(sanitizedSearchTerm);
            });

            setDataAllstaffs(filteredData);

        }
    }, [valueInputSearch, Allstaffs]);

    const [selectedCheckbox, setSelectedCheckbox] = useState('');
    const navigate = useNavigate();

    const handleEdit = (key: number, key_role: number, RoleStaff: number | undefined, IdStaff: number | undefined) => {
        if (RoleStaff == 0) {
            if (key == IdStaff && key_role == RoleStaff) {
                Swal.fire({
                    icon: 'info',
                    text: `Đã mở trang sửa cho tài khoản có ID: ${key}`, // Nội dung
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/admin/quan-li-nhan-vien/sua-nhan-vien/${key}`);
                    }
                });

            }
            if (key != IdStaff && key_role == RoleStaff) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Người Đồng Cấp',
                    text: 'Bạn Không Được Sửa Người Đồng Cấp Với Bạn',
                });
            }
            if (key != IdStaff && key_role != RoleStaff) {
                Swal.fire({
                    icon: 'info',
                    text: `Đã mở trang sửa cho tài khoản có ID: ${key}`, // Nội dung
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`${Paths.Admin.PathsAdmin}/${Paths.Admin.EditStaff.replace(':id', key)}`);
                    }
                });
            }
        } else {
            if (RoleStaff != key_role && key != IdStaff) {
                if (RoleStaff != undefined) {
                    CheckUpdateUser(RoleStaff, key_role)

                }
            }
            if (RoleStaff == key_role && key == IdStaff) {
                Swal.fire({
                    icon: 'info',
                    text: `Đã mở trang sửa cho tài khoản có ID: ${key}`, // Nội dung
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`${Paths.Admin.PathsAdmin}/${Paths.Admin.EditStaff.replace(':id', key)}`);
                    }
                });
            }
            if (RoleStaff == key_role && key != IdStaff) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Người Đồng Cấp',
                    text: 'Bạn Không Được Sửa Người Đồng Cấp Với Bạn',
                });
            }


        }

    };

    const removeDeteleStaff = (key: number) => {
        return Swal.fire({
            icon: 'warning',
            showDenyButton: true,
            title: `Bạn Chọn Người Dùng Có ID ${key}`,
            text: `Bạn có chắc muốn xóa ?`,
            confirmButtonText: 'Xóa',
            denyButtonText: 'Hủy',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await AppDispatch(deleteStaffThunk(key));
                    Swal.fire('Đã Xóa!', 'Người dùng đã được xóa thành công.', 'success');
                    
                } catch (error: any) {
                    Swal.fire('Lỗi!', 'Đã có lỗi xảy ra khi xóa người dùng.', error);
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Đã Hủy',
                    text: 'Bạn đã hủy thao tác xóa.',
                });
            }
        });
    }
    const handleDelete = (key: number, key_role: number, RoleStaff: number | undefined, IdStaff: number | undefined) => {
        if (RoleStaff == 0) {

            if (key == IdStaff && key_role == RoleStaff) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Bạn Vẫn Là Chủ',
                    text: 'Bạn không được xóa chính bạn',
                });


            }
            if (key != IdStaff && key_role == RoleStaff) {
                console.log(key);

                return Swal.fire({
                    icon: 'error',
                    title: 'Người Đồng Cấp',
                    text: 'Bạn Không Được Xóa Người Đồng Cấp Với Bạn',
                });
            }
            if (key != IdStaff && key_role != RoleStaff) {
                removeDeteleStaff(key);
            }
        } else {
            if (RoleStaff != key_role && key != IdStaff) {
                if (RoleStaff != undefined) {
                    checkRoleAndShowAlert(RoleStaff, key_role)
                }
            }
            if (RoleStaff == key_role && key == IdStaff) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Bạn Không Được Xóa Chính Bạn',
                });
            }
            if (RoleStaff == key_role && key != IdStaff) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Người Đồng Cấp',
                    text: 'Bạn Không Được Xóa Người Đồng Cấp Với Bạn',
                });
            }


        }
    };
    // const onSelectChange = (selectedRowKeys: any) => {
    //     setSelectedCheckbox(selectedRowKeys);
    //     if (selectedRowKeys.length > 0) {
    //         showModal(selectedRowKeys.length);
    //     }
    // };
    // const showModal = (count: any) => {
    //     Swal.fire({
    //         icon: "info",
    //         title: `Bạn Vừa Chọn ${count} tài khoản`,
    //         text: 'Bạn có muốn tiếp tục?',
    //         showDenyButton: true,
    //         denyButtonText: 'Xóa',
    //         confirmButtonText: 'Sửa',
    //         customClass: {
    //             confirmButton: 'bg-green-700 text-white',
    //             denyButton: 'bg-red-500 text-white',
    //         },
    //         backdrop: true,
    //         allowOutsideClick: false,
    //     }).then((result) => {
    //         if (result.isDenied) {
    //             Swal.fire({
    //                 icon: "warning",
    //                 title: `Bạn có chắc chắn muốn xóa ${count} người này?`,
    //                 showCancelButton: true,
    //                 confirmButtonText: 'Xóa',
    //                 cancelButtonText: 'Hủy',
    //                 customClass: {
    //                     confirmButton: 'bg-red-500 text-white',
    //                     cancelButton: 'bg-gray-500 text-white',
    //                 },
    //             }).then((kq) => {
    //                 if (kq.isConfirmed) {
    //                     Swal.fire('Đã xóa!', '', 'success');
    //                 } else {
    //                     Swal.fire({
    //                         icon: 'error',
    //                         title: 'Đã Hủy',
    //                         text: 'Bạn đã hủy thao tác xóa.',
    //                     });
    //                 }
    //             });
    //         } else if (result.isConfirmed) {
    //             Swal.fire({
    //                 icon: 'info',
    //                 text: `Đã mở trang sửa cho ${count} tài khoản`,
    //                 confirmButtonText: 'OK',
    //             });
    //         }
    //     });
    // };




 

    useEffect(() => {
        console.log('selectedCheckbox', selectedCheckbox)
        console.log(Allstaffs)
        if (selectedCheckbox.toLowerCase() === 'all') {
            setDataAllstaffs(Allstaffs)
        }


        if (selectedCheckbox.toLowerCase() === 'admin') {
            const FilterArrayUserCheckBox = Allstaffs.filter((user: any) => user.user_role == 0)
            console.log('FilterArrayUserCheckBox', FilterArrayUserCheckBox)
            setDataAllstaffs(FilterArrayUserCheckBox)


        }
        if (selectedCheckbox.toLowerCase() === 'staff') {
            const FilterArrayUserCheckBox = Allstaffs.filter((user: any) => user.user_role != 0 && user.user_role != 11)
            console.log('FilterArrayUserCheckBox', FilterArrayUserCheckBox)
            setDataAllstaffs(FilterArrayUserCheckBox)
        }

        if (selectedCheckbox.toLowerCase() === 'new' || selectedCheckbox.toLowerCase() === 'old') {
            const arrangeArray = [...Allstaffs].sort((a: any, b: any) => {
                if (selectedCheckbox === 'new') {
                    return new Date(b.user_time).getTime() - new Date(a.user_time).getTime();
                } else if (selectedCheckbox === 'old') {
                    return new Date(a.user_time).getTime() - new Date(b.user_time).getTime();
                }
                return 0;
            });
            setDataAllstaffs(arrangeArray)

        }



    }, [Allstaffs, selectedCheckbox])


    return (
        <div className='flex flex-col p-12 gap-5 bg-[#f2edf3]'>
            <div className='flex-1 bg-white flex flex-col rounded-xl shadow-lg'>
                <div className='flex items-center justify-between box-border p-[24px]'>
                    <span className='text-[30px] font-medium text-[#ffd700]'>Nhân Viên</span>
                    <div className='flex gap-3'>


                        <Link to={`/admin/quan-li-nhan-vien/tao-nhan-vien-moi`}>

                            <Button className='p-10' type="primary">
                                <AiOutlineUserAdd className='text-[18px]' />
                                Thêm Người Mới
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className='flex p-[24px] items-center justify-between gap-3'>
                    <div className='flex-1 flex bg-[#00000008] focus:outline-dotted rounded-lg p-[16px]'>
                        <input type="text" className='flex-1 text-[15px] outline-none bg-transparent' onChange={handleSearch} placeholder='Tìm kiếm nhân viên hoặc quản trị...' />
                        <GoSearch className='text-[18px]' />
                    </div>


                    <Popover
                        content={<div className='flex flex-col'>
                            <div className='flex gap-2 justify-between p-[12px]'>
                                <label className='text-[14px]'>Tất cả</label>
                                <Checkbox checked={selectedCheckbox === 'all'} onChange={() => setSelectedCheckbox('all')}></Checkbox>
                            </div>
                            <div className='flex gap-2 justify-between p-[12px]'>
                                <label className='text-[14px]'>Admin</label>
                                <Checkbox checked={selectedCheckbox === 'admin'} onChange={() => setSelectedCheckbox('admin')}></Checkbox>
                            </div>
                            <div className='flex gap-2 justify-between p-[12px]'>
                                <label className='text-[14px]'>Nhân Viên</label>
                                <Checkbox checked={selectedCheckbox === 'staff'} onChange={() => setSelectedCheckbox('staff')}></Checkbox>
                            </div>

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

                <div className='p-[24px] relative w-full overflow-x-auto h-[1000px] flex flex-col'>
                    <Table

                        className='flex-1'

                        columns={columns || []}
                        dataSource={Array.isArray(DataAllstaffs) ? DataAllstaffs.filter((staff: any) => staff.user_role != 11).reverse() : []}
                        size='large'
                        pagination={{ pageSize: 10 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminStaff;