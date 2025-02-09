

import { Calendar, ConfigProvider, Popover, Select, Upload, UploadFile } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import ImgCrop from 'antd-img-crop';
import { UploadProps } from 'antd/lib';
import './AdminCreateAccout.css'
import { DataRole, DataStaffInterface, imageStaffLevel, StaffGender, StaffInterface, UpdateStaffInterface } from './DataStaff';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
// import { IMG_USER_BACKEND } from '../../../../constants';
import { IoMdCloudUpload } from 'react-icons/io';
import { DeleteImgCloudThunk, getUserThunk, UpdateStaffThunk } from '../../../../redux/user/user.slice';
import { IMG_BACKEND_USER } from '../../../../constants';
import toast from 'react-hot-toast';



function AdminCustomerEdit() {
    const AppDispatch = useAppDispatch();
    const token: string = useAppSelector((state) => state.user.token);



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const staffsData: any = useAppSelector((state) => state.user.Alluser);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const UserDetail: any = useAppSelector((state) => state.user.user);
    const [staff, setStaff] = useState<StaffInterface>({});
    const { id } = useParams();
    const userId = Number(id);
    console.log("UserDetail", UserDetail);

    useEffect(() => {
        AppDispatch(getUserThunk())
    }, [AppDispatch])









    useEffect(() => {
        if (userId) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newObj_staff = { ...staffsData?.find((staff: any) => staff.user_id == userId) };
            newObj_staff.user_password = "";
            setStaff(newObj_staff);
        }
    }, [staffsData, userId]);
    const [tokenStaff, setTokenStaff] = useState('');

    useEffect(() => {
        if (token) {
            const cleanedToken = token.replace(/"/g, '');
            setTokenStaff(cleanedToken);
        }
    }, [token]);


    const [staffData, setstaffData] = useState<StaffInterface>({
        user_name: '',
        user_email: '',
        user_password: '',
        user_address: '',
        user_phone: '',
        user_role: null,
        level: null,
        user_gender: null,
        user_birth: '',
        user_time: '',
        user_image: '',
    });

    useEffect(() => {
        if (staff) {
            setstaffData({
                user_name: staff.user_name || '',
                user_email: staff.user_email || '',
                user_password: staff.user_password || '',
                user_address: staff.user_address || '',
                user_phone: staff.user_phone || '',
                user_role: staff.user_role,
                level: staff.level,
                user_gender: staff.user_gender,
                user_birth: staff.user_birth || '',
                user_time: staff.user_time || '',
                user_image: staff.user_image || '',
            });
        }

    }, [staff]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setstaffData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectOnChange = (value: number, title: string) => {
        setstaffData(prevState => ({
            ...prevState,
            [title]: value,
        }));
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filteredData: StaffInterface = {};

        Object.keys(staffData).forEach(key => {
            if (staffData[key] !== "" && staffData[key] !== null) {
                filteredData[key] = staffData[key];
            }
        });

        if (filteredData["user_password"]) {
            if (filteredData["user_password"] != "") {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const password: any = filteredData["user_password"];
                const hasUppercase = /[A-Z]/.test(password);
                const hasNumber = /\d/.test(password);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                if (!hasUppercase) {

                    toast.error(`Mật khẩu của bạn không chứa kí tự hoa`)
                    return;
                }
                if (!hasNumber) {
                    toast.error(`Mật khẩu của bạn không chứa kí tự số`)

                    return;
                }
                if (!hasSpecialChar) {
                    toast.error(`Mật khẩu của bạn không chứa kí tự đặc biệt`)
                    return;
                }
                const DataStaff: DataStaffInterface = {
                    staffData: filteredData,
                    tokenStaff: tokenStaff,
                };
                SendDataStaffThunk(DataStaff);


            }
        }

        const DataStaff: DataStaffInterface = {
            staffData: filteredData,
            tokenStaff: tokenStaff,
        };
        SendDataStaffThunk(DataStaff);



    };

    const SendDataStaffThunk = async (DataStaff: DataStaffInterface) => {

        const UpdateStaff: UpdateStaffInterface = {
            userId,
            DataStaff
        }



        try {
            const data = await AppDispatch(UpdateStaffThunk(UpdateStaff));
            if (data.payload.success === true) {
                Swal.fire({
                    title: 'Thành công',
                    text: 'Sửa thành công nhân viên',
                    icon: 'success',
                    confirmButtonText: 'Chuyển tới trang quản lý nhân viên',
                    confirmButtonColor: '#008000',
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/admin/quan-li-nhan-vien';
                        }
                    })
            };


        } catch (error) {
            console.log(error);
        }
    }

    const uploadRef = useRef<HTMLDivElement>(null);


    const [fileList, setFileList] = useState<UploadFile[]>([]);
    console.log("fileList", fileList)


    const onChange: UploadProps['onChange'] = async (info) => {
        const { fileList: file } = info;

        const updatedFileList = file.map(file => {
            if (file.originFileObj) {
                file.url = URL.createObjectURL(file.originFileObj);
            }
            return file;
        });

        setFileList(updatedFileList);

        if (file[0].response.statusCode === 200) {
            try {
                const imageUrl = file[0].response.content;
                setstaffData(prevState => ({
                    ...prevState,
                    user_image: imageUrl,
                }));
            } catch (error) {
                console.error("Có lỗi trong khi xử lý phản hồi:", error);
            }
        } else {
            console.error("Tải lên không thành công, mã lỗi:", file[0].response?.statusCode);
        }
    };


    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
    ];


    const OptionsImageStaffLevel = imageStaffLevel.map(item => ({
        value: item.value,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={item?.label}
                    style={{ width: '50px', marginRight: '8px' }}
                />
            </div>
        )
    }))


    const OptionsStaffGender = StaffGender.map(item => ({
        value: item.value,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>{item.label}</span>
            </div>
        )
    }))


    const filteredDataRole = DataRole.filter(role => role.value !== 11);
    const OptionsStaffRole = filteredDataRole.map(role => ({

        value: role.value,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>{role.label}</span>
            </div>
        )
    }))


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valueBirthDate = (value: any) => {
        const formattedDate = value.format('YYYY-MM-DD HH:mm:ss');

        setstaffData(prevState => ({
            ...prevState,
            user_birth: formattedDate,
        }));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valueJoinDate = (value: any) => {
        const formattedDate = value.format('YYYY-MM-DD HH:mm:ss');
        setstaffData(prevState => ({
            ...prevState,
            user_time: formattedDate,
        }));
    };


    const handleInputChangeWord = (value: string) => {
        setstaffData(prevState => ({
            ...prevState,
            user_address: value,
        }));
    };
    return (
        <form action='' onSubmit={handleSubmit} className='flex-1 bg-[#f2edf3]  grid grid-cols-1 xl:grid-cols-2 gap-3 auto-rows-[minmax(50px,_auto)] p-[24px]'>

            <div className='bg-white shadow-lg rounded-xl  p-[12px] gap-8 flex flex-col'>
                <span className='text-[20px] font-semibold'>Tải ảnh  </span>

                <div className='text-[14px] font-medium text-[#9696968e]'>
                    <span>Chọn ảnh sản phẩm hoặc chỉ cần kéo và thả tối đa 1 ảnh tại đây.</span>

                </div>
                <div className='flex- items-center flex justify-center'>
                    <ImgCrop rotationSlider>
                        <Upload.Dragger
                            action="https://dichvumang86.cloud/uploadimguser"
                            listType='picture'
                            fileList={fileList}
                            onChange={onChange}
                            showUploadList={{
                                showRemoveIcon: true
                            }}
                            maxCount={1}
                            accept=".png,.jpg,.jpeg"
                            headers={{
                                token: tokenStaff,
                            }}
                            beforeUpload={(file) => {
                                const isImage = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
                                const isSmallerThan10MB = file.size / 1024 / 1024 < 10; // file size in MB
                                if (!isImage) {
                                    console.log('Chỉ hỗ trợ hình ảnh .jpg, .jpeg, .png');
                                }
                                if (!isSmallerThan10MB) {
                                    console.log('Kích thước tệp không vượt quá 10MB');
                                }
                                return isImage && isSmallerThan10MB;
                            }}
                            name="user_image"
                            onRemove={async () => {
                                try {
                                    const data = {
                                        token: token,
                                        image: staffData.user_image
                                    }
                                    const callRemove = await AppDispatch(DeleteImgCloudThunk(data))

                                    if (callRemove.payload.statusCode === 200) {
                                        Swal.fire({
                                            title: 'Đã bỏ ảnh tải lên',
                                            icon: 'success',
                                            confirmButtonColor: '#008000',
                                        })
                                        if (fileList.length === 1) {
                                            setstaffData(prevState => ({
                                                ...prevState,
                                                user_image: staff.user_image,
                                            }));
                                        }
                                    }

                                } catch (error) {
                                    console.log(error);

                                }

                            }}
                        >
                            <div
                                className={`flex flex-col w-[70rem] h-[40rem] items-center text-gray-300 hover:text-[#8b1da7] hover:font-semibold cursor-pointer transition-all duration-300 justify-center p-6 border-2 border-dashed rounded-lg ${fileList.length > 0 ? 'hidden' : 'block'}`}
                            >
                                {
                                    staff.user_image != null ? (
                                        <img
                                            src={IMG_BACKEND_USER + "/" + staff.user_image}
                                            alt="Uploaded"
                                            className="rounded-lg w-[70rem] h-[35rem] object-cover shadow-lg"
                                        />
                                    ) : (
                                        <>
                                            <p className="text-4xl  " onClick={() => uploadRef.current?.querySelector('input[type="file"]')}>
                                                <IoMdCloudUpload />
                                            </p>
                                            <p className="mt-2 text-lg text-center">Ảnh chưa có vui lòng bấm kéo thả ảnh vào đây</p>
                                        </>
                                    )
                                }
                            </div>

                            <div className={`flex w-[70rem] h-[40rem] items-center  justify-center p-6 border-2 border-dashed rounded-lg ${fileList.length > 0 ? 'block' : 'hidden'}`}>
                                <img src={fileList[0]?.url} alt="Uploaded" className="rounded-lg w-[70rem] h-[35rem] object-cover   shadow-lg" />
                            </div>
                        </Upload.Dragger>
                    </ImgCrop>




                </div>
                <div className='text-[14px] text-[#9696968e]  font-medium'>
                    <span>Định dạng hình ảnh: .jpg, .jpeg, .png, kích thước ưa thích: 1:1, kích thước tệp bị giới hạn ở mức tối đa 10MB.</span>

                </div>

            </div>
            <div className='bg-white shadow-lg rounded-xl p-[12px] gap-3 flex flex-col '>
                <span className='text-[20px] font-semibold'>Thêm Tài Khoản </span>
                <div className=' flex-1 grid grid-cols-3 auto-rows-auto gap-4'>
                    <div className="flex h-auto flex-col gap-4">
                        <label htmlFor="" className="text-[13px] text-[#81818177] font-medium">Tên tài khoản</label>
                        <input
                            onChange={handleInputChange}
                            value={staffData.user_name}
                            name="user_name"
                            placeholder='Không có dữ liệu tên tài khoản'
                            type="text"
                            className="h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#8b1da7c2] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none"
                        />
                    </div>
                    <div className='flex h-auto flex-col gap-4'>
                        <label htmlFor='' className='text-[13px] text-[#81818177] font-medium'>Email</label>
                        <input type='text'
                            onChange={handleInputChange}
                            value={staffData.user_email}

                            name="user_email"
                            placeholder='Không có dữ liệu email'
                            className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#8b1da7c2] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' />

                    </div>
                    {
                        staff.user_id == UserDetail.user_id ? <div className='flex h-auto flex-col gap-4'>
                            <label htmlFor='' className='text-[13px] text-[#81818177] font-medium'>Mật khẩu</label>
                            <input type='text'
                                onChange={handleInputChange}
                                name="user_password"
                                placeholder='Mật Khẩu Được ẨN'
                                value={staffData.user_password}
                                className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#8b1da7c2] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' />

                        </div> : <div className='flex h-auto flex-col gap-4'>
                            <label htmlFor='' className='text-[13px] text-[#81818177] font-medium'>Mật khẩu</label>
                            <input type='text'
                                disabled
                                onChange={handleInputChange}
                                name="user_password"
                                placeholder='Mật Khẩu Được ẨN'
                                value={staffData.user_password}
                                className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#8b1da7c2] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' />

                        </div>
                    }


                    {
                        UserDetail.user_role === 0 ? <div className='flex h-auto flex-col gap-4'>
                            <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Level</label>
                            <Select
                                showSearch
                                optionFilterProp="label"
                                options={
                                    OptionsImageStaffLevel
                                }
                                value={staffData.level}
                                placeholder={staffData.level == null ? 'Chưa có level' : ''}

                                className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px]  outline-none  '
                                onChange={(value) => handleSelectOnChange(value, 'level')}

                            />
                        </div> : <div className='flex h-auto flex-col gap-4'>
                            <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Level</label>
                            <Select
                                showSearch
                                optionFilterProp="label"
                                options={
                                    OptionsImageStaffLevel
                                }
                                value={staffData.level}
                                placeholder={staffData.level == null ? 'Chưa có level' : ''}
                                disabled
                                className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px]  outline-none  '
                                onChange={(value) => handleSelectOnChange(value, 'level')}

                            />
                        </div>
                    }

                    <div className='flex h-auto flex-col gap-4'>
                        <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Điện thoại</label>
                        <input
                            onChange={handleInputChange}
                            name="user_phone"
                            value={staffData.user_phone}

                            placeholder='Không có dữ liệu số điện thoại'
                            type='text' min={0} max={100} className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#8b1da7c2] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' />
                    </div>
                    <div className='flex h-auto flex-col gap-4'>
                        <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Giới tính {staffData.user_gender}</label>
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={OptionsStaffGender}
                            value={staffData.user_gender}
                            placeholder={staffData.user_gender == null ? 'Chưa có dữ liệu giới tính' : ''}

                            onChange={(value) => handleSelectOnChange(value, 'user_gender')}
                            className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px]  outline-none  '
                        />
                    </div>

                    {
                        UserDetail.user_role === 0 ? <div className='flex h-auto flex-col gap-4'>
                            <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Vai trò</label>
                            <Select
                                showSearch

                                optionFilterProp="label"
                                placeholder={staffData.user_role}
                                value={staffData.user_role}
                                options={
                                    OptionsStaffRole
                                }
                                onChange={(value) => handleSelectOnChange(value, 'user_role')}
                                className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] outline-none'
                            />

                        </div> : <div className='flex h-auto flex-col gap-4'>
                            <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Vai trò</label>
                            <Select
                                showSearch

                                optionFilterProp="label"
                                placeholder={staffData.user_role}
                                value={staffData.user_role}
                                options={
                                    OptionsStaffRole
                                }
                                disabled
                                onChange={(value) => handleSelectOnChange(value, 'user_role')}
                                className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] outline-none'
                            />

                        </div>
                    }


                    <div className='flex h-auto flex-col gap-4 '>
                        <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Ngày sinh</label>
                        <Popover placement="bottomRight" trigger={'click'} title={'Lịch'} content={
                            <div className='w-[400px]'>
                                <ConfigProvider>
                                    <Calendar
                                        fullscreen={false}
                                        onChange={valueBirthDate}

                                    />
                                </ConfigProvider>
                            </div>
                        }>
                            <input type='text'
                                placeholder={staffData.user_birth == null || staffData.user_birth == "" ? 'Chưa có dữ liệu ngày sinh' : ''}
                                value={staffData.user_birth} autoComplete='off' className='h-[48px]  bg-[#81818113] focus:text-[white] focus:bg-[#8b1da7c2] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' />
                        </Popover>
                    </div>
                    <div className='flex h-auto flex-col gap-4 '>
                        <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Ngày tham gia</label>
                        <Popover placement="bottomRight" trigger={'click'} title={'Lịch'} content={
                            <div className='w-[400px]'>
                                <ConfigProvider>
                                    <Calendar
                                        fullscreen={false}
                                        onChange={valueJoinDate}

                                    />
                                </ConfigProvider>
                            </div>
                        }>
                            <input type='text' placeholder={staffData.user_time == null || staffData.user_time == "" ? 'Chưa có dữ liệu ngày tham gia' : ''}
                                value={staffData.user_time} autoComplete='off' className='h-[48px]  bg-[#81818113] focus:text-[white] focus:bg-[#8b1da7c2] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' />
                        </Popover>

                    </div>

                    <div className=' col-span-3 flex  flex-col gap-4'>
                        <label htmlFor='ten_sp' className=' text-[13px] text-[#81818177] font-medium'>Địa chỉ</label>
                        <div className="quill-container">
                            <ReactQuill
                                theme="snow"
                                onChange={handleInputChangeWord}
                                modules={{ toolbar: toolbarOptions }}
                                value={staffData.user_address}

                                className=" bg-[#81818113] focus:bg-[#8b1da7c2] transition-all ease-in-out duration-500 rounded-lg text-sm p-2"
                            />
                        </div>
                    </div>






                </div>
            </div>

            <div className='bg-white shadow-lg xl:col-span-3 rounded-xl p-[12px] gap-3 flex flex-col '>
                <button type='submit' className=' text-[16px] mt-4 h-[48px] rounded-lg linear-gradient text-white .box-shadow '>Thêm Tài Khoản</button>

            </div>

        </form >
    );
}

export default AdminCustomerEdit;