import { Empty, Select, Table } from 'antd';
import React, { useState } from 'react';
import { BsFillBoxSeamFill, BsPinMap } from 'react-icons/bs';
import { FaAmazonPay } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { PiUserList } from 'react-icons/pi';
import ReactQuill from 'react-quill';
import { datanganhang } from '../../User/Component/Databank';

function AdminOrderEdit() {
    const [ButtonIcon, setButtonIcon] = useState(1);
    const [value, setValue] = useState('')
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


    const phuongthuc = [
        { id: 1, label: 'Thanh toán khi nhận hàng' },
        { id: 2, label: 'Chuyển khoản' },
    ]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ButtonIconFunction = (key: any) => {
        setButtonIcon(key);
    };

    const columns = [
        {
            title: 'Sản Phẩm',
            dataIndex: 'product',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quality',
        },
    ];

    const data: [] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [bank, setBank] = useState<any | null>(null); // Thay đổi từ {} thành null
    console.log(bank);

    const options = datanganhang.map(item => ({
        value: item.code,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={item?.logo}
                    alt={item?.label}
                    style={{ width: '50px', marginRight: '8px' }}
                />
                {item.label}
            </div>

        ),

    }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBankChange = (value: any) => {
        const codebank = datanganhang.find(data => data.code === value);
        if (codebank) {
            setBank(codebank);
        }


    }

    return (
        <div className='flex-1 bg-slate-200 grid xl:grid-cols-[22%_1fr] gap-5 auto-rows-[minmax(50px,auto)] p-12'>
            <div className='relative'>
                <div className='bg-white box-border sticky top-[48px] w-full flex flex-col p-[24px] gap-6 shadow-lg cursor-pointer rounded-xl'>
                    {[1, 2, 3, 4].map((num) => (
                        <div
                            key={num}
                            onClick={() => ButtonIconFunction(num)}

                            className={`flex text-[20px] p-[12px] rounded-lg transition-all duration-300 ${ButtonIcon === num ? 'bg-[#6b676721]' : 'bg-transparent'} gap-4 items-center`}
                        >
                            <div className={`w-[50px] h-[50px] justify-center flex items-center ${ButtonIcon === num ? 'linear-gradient' : 'bg-[#6b676721]'} box-shadow rounded-full transition-all duration-300`}>
                                {num === 1 && <BsFillBoxSeamFill className={`transition-colors duration-300 ${ButtonIcon === num ? 'text-white' : 'text-[#5857574d]'}`} />}
                                {num === 2 && <PiUserList className={`transition-colors duration-300 ${ButtonIcon === num ? 'text-white' : 'text-[#5857574d]'}`} />}
                                {num === 3 && <BsPinMap className={`transition-colors duration-300 ${ButtonIcon === num ? 'text-white' : 'text-[#5857574d]'}`} />}
                                {num === 4 && <FaAmazonPay className={`transition-colors duration-300 ${ButtonIcon === num ? 'text-white' : 'text-[#5857574d]'}`} />}
                            </div>
                            <div className='flex flex-col gap-3 text-[14px] font-semibold'>
                                <span>{num === 1 ? 'Sản phẩm đã chọn' : num === 2 ? 'Thông tin chi tiết' : num === 3 ? 'Địa chỉ' : 'Thanh toán'}</span>
                                <span className='text-[12px] font-medium'>
                                    {num === 1 ? 'Sản phẩm trong danh sách' : num === 2 ? 'Vui lòng nhập thông tin chi tiết' : num === 3 ? 'Địa chỉ nhận hàng' : 'Vui lòng chọn phương thức thanh toán'}
                                </span>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            <div className='bg-white rounded-xl grid leading-[3] gap-7 h-auto p-[24px] shadow-lg'>
                <div className='flex flex-col gap-6'>
                    <span className='text-[24px] font-medium'>Danh sách sản phẩm</span>
                    <div className='w-full h-auto gap-3 flex'>
                        <div className='w-full flex bg-[#7e7e7e25] transition-all duration-200 cursor-pointer hover:bg-[#7e7e7e1a] items-center rounded-xl gap-4'>
                            <input className='w-full outline-none cursor-pointer px-[20px] text-[14px] bg-transparent h-full' placeholder='Vui lòng nhập sản phẩm của bạn...' type="text" />
                            <IoSearchOutline className='text-[18px] w-[50px]' />
                        </div>
                        <button className='w-[153.83px] rounded-xl h-[48px] bg-[#1677FF] text-[14px] font-medium text-[white]'>
                            Tìm kiếm
                        </button>
                    </div>
                    <div>
                        <Table
                            className='flex-1'
                            columns={columns}
                            dataSource={data}
                            size='large'
                            pagination={{ pageSize: 10 }}
                            locale={{
                                emptyText: <Empty description="No data available" />,
                            }}
                        />
                    </div>
                    <div className='w-full flex justify-end text-[20px] font-medium'>
                        <span>Tổng tiền : 99.999.999 VNĐ</span>
                    </div>


                </div>
                <div className='grid grid-cols-3 h-auto gap-5'>
                    <span className='text-[24px] font-medium col-span-3'>Thông tin chi tiết</span>
                    <div className='w-full h-auto gap-3 flex flex-col text-[#7e7e7eb6] '>
                        <label htmlFor="" className='text-[14px] font-medium'>Tên người đặt hàng</label>
                        <div className='w-full flex bg-[#7e7e7e25] transition-all duration-200 cursor-pointer hover:bg-[#7e7e7e1a] items-center rounded-xl gap-4'>
                            <input className='w-full outline-none cursor-pointer px-[20px] text-[14px] bg-transparent h-[48px]' placeholder='Vui lòng nhập tên của bạn...' type="text" />
                        </div>
                    </div>
                    <div className='w-full h-auto gap-3 flex flex-col text-[#7e7e7eb6] '>
                        <label htmlFor="" className='text-[14px] font-medium'>Email</label>
                        <div className='w-full flex bg-[#7e7e7e25] transition-all duration-200 cursor-pointer hover:bg-[#7e7e7e1a] items-center rounded-xl gap-4'>
                            <input className='w-full outline-none cursor-pointer px-[20px] text-[14px] bg-transparent h-[48px]' placeholder='Vui lòng nhập email của bạn...' type="text" />
                        </div>
                    </div>
                    <div className='w-full h-auto gap-3 flex flex-col text-[#7e7e7eb6] '>
                        <label htmlFor="" className='text-[14px] font-medium'>Số điện thoại</label>
                        <div className='w-full flex bg-[#7e7e7e25] transition-all duration-200 cursor-pointer hover:bg-[#7e7e7e1a] items-center rounded-xl gap-4'>
                            <input className='w-full outline-none cursor-pointer px-[20px] text-[14px] bg-transparent h-[48px]' placeholder='Vui lòng nhập số điện thoại của bạn...' type="text" />
                        </div>
                    </div>
                    <div className='w-full gap-3 flex flex-col text-[#7e7e7eb6] col-span-3 '>
                        <label htmlFor="" className='text-[14px] font-medium'>Địa chỉ cùa bạn</label>
                        <div className='w-full h-full flex transition-all duration-200 cursor-pointer  items-center rounded-xl gap-4'>
                            <ReactQuill
                                theme='snow'
                                value={value}
                                onChange={setValue}
                                modules={{
                                    toolbar: toolbarOptions,
                                }}
                                className=' w-full transition-all ease-in-out duration-500 rounded-lg text-sm p-2'
                            />
                        </div>
                    </div>


                </div>
                <div className='grid grid-cols-3 h-auto gap-5'>
                    <span className='text-[24px] font-medium col-span-3'>Thanh toán</span>
                    <div className='w-full h-auto gap-3 flex flex-col col-span-3 text-[#7e7e7eb6] '>
                        <label htmlFor="" className='text-[14px] font-medium'>Phương thức thanh toán</label>
                        <div className='w-full flex bg-[#7e7e7e25] transition-all duration-200 cursor-pointer hover:bg-[#7e7e7e1a] items-center rounded-xl gap-4'>
                            <Select
                                showSearch
                                placeholder="Vui lòng chọn phương thức... "
                                optionFilterProp="label"
                                options={phuongthuc}
                                className='h-[48px] w-full bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px]  outline-none  '

                            />
                        </div>
                    </div>
                    <div className='w-full h-auto gap-3 flex flex-col col-span-3 text-[#7e7e7eb6] '>
                        <label htmlFor="" className='text-[14px] font-medium'>Email</label>
                        <div className='w-full flex bg-[#7e7e7e25] transition-all duration-200 cursor-pointer hover:bg-[#7e7e7e1a] items-center rounded-xl gap-4'>
                            <Select
                                showSearch
                                placeholder="Vui lòng chọn ngân hàng"
                                optionFilterProp="label"
                                onChange={handleBankChange}
                                options={
                                    options
                                }
                                className='h-[48px] w-full bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] outline-none'
                            />                               </div>
                    </div>
                    <div className='w-full h-auto gap-3 flex flex-col  col-span-3 text-[#7e7e7eb6] '>
                        <label htmlFor="" className='text-[14px] font-medium'>Họ tên thẻ</label>
                        <div className='w-full flex bg-[#7e7e7e25] transition-all duration-200 cursor-pointer hover:bg-[#7e7e7e1a] items-center rounded-xl gap-4'>
                            <input className='w-full outline-none cursor-pointer px-[20px] text-[14px] bg-transparent h-[48px]' placeholder='Vui lòng nhập tên trên thẻ của bạn...' type="text" />
                        </div>
                    </div>
                    <div className='w-full h-auto gap-3 flex flex-col  col-span-2 text-[#7e7e7eb6] '>
                        <label htmlFor="" className='text-[14px] font-medium'>Mã số ngân hàng</label>
                        <div className='w-full flex bg-[#7e7e7e25] transition-all duration-200 cursor-pointer hover:bg-[#7e7e7e1a] items-center rounded-xl gap-4'>
                            <input className='w-full outline-none cursor-pointer px-[20px] text-[14px] bg-transparent h-[48px]' placeholder='Vui lòng nhập số thẻ của bạn...' type="text" />
                        </div>
                    </div>
                    <div className='w-full h-auto gap-3 flex flex-col  col-span-1 text-[#7e7e7eb6] '>
                        <label htmlFor="" className='text-[14px] font-medium'>CVV</label>
                        <div className='w-full flex bg-[#7e7e7e25] transition-all duration-200 cursor-pointer hover:bg-[#7e7e7e1a] items-center rounded-xl gap-4'>
                            <input className='w-full outline-none cursor-pointer px-[20px] text-[14px] bg-transparent h-[48px]' placeholder='Vui lòng nhập số CVV của bạn...' type="text" />
                        </div>
                    </div>



                </div>
              
                <div className='w-full h-auto gap-5'>

                    <button className='w-full h-[48px] rounded-lg text-[14px] shadow-lg flex justify-center items-center linear-gradient text-[white] font-medium'>Thêm tài khoản</button>



                </div>

            </div>
        </div>
    );
}

export default AdminOrderEdit;