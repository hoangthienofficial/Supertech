import { Modal } from 'antd';
import React, { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AdminCommentProductEdit(props: any) {
    const data = [
        {
            key: '1',
            date: '2023-10-01',
            content: 'Sản phẩm rất tốt, tôi rất hài lòng!',
            productImage: 'https://product.hstatic.net/1000406564/product/iphone11-tr_3064909d9a634a548fb3657c570f5c80_master.jpg',
            productName: 'Sản Phẩm A',
            userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
            userName: 'Nguyễn Văn A',
            role: 'Khách Hàng',
            rating: 5,
        },
        {
            key: '2',
            date: '2023-10-02',
            content: 'Chất lượng vượt xa mong đợi!',
            productImage: 'https://product.hstatic.net/1000406564/product/iphone11-tr_3064909d9a634a548fb3657c570f5c80_master.jpg',
            productName: 'Sản Phẩm B',
            userImage: 'https://randomuser.me/api/portraits/men/2.jpg',
            userName: 'Trần Văn B',
            role: 'Admin',
            rating: 4,
        },
        {
            key: '3',
            date: '2023-10-03',
            content: 'Tôi không thích sản phẩm này.',
            productImage: 'https://product.hstatic.net/1000406564/product/iphone11-tr_3064909d9a634a548fb3657c570f5c80_master.jpg',
            productName: 'Sản Phẩm C',
            userImage: 'https://randomuser.me/api/portraits/women/1.jpg',
            userName: 'Lê Thị C',
            role: 'Nhân Viên',
            rating: 2,
        },
        {
            key: '4',
            date: '2023-10-04',
            content: 'Dịch vụ khách hàng rất tốt!',
            productImage: 'https://product.hstatic.net/1000406564/product/iphone11-tr_3064909d9a634a548fb3657c570f5c80_master.jpg',
            productName: 'Sản Phẩm D',
            userImage: 'https://randomuser.me/api/portraits/men/3.jpg',
            userName: 'Nguyễn Văn D',
            role: 'Khách Hàng',
            rating: 5,
        },
        {
            key: '5',
            date: '2023-10-05',
            content: 'Tôi sẽ mua lại!',
            productImage: 'https://product.hstatic.net/1000406564/product/iphone11-tr_3064909d9a634a548fb3657c570f5c80_master.jpg',
            productName: 'Sản Phẩm E',
            userImage: 'https://randomuser.me/api/portraits/women/2.jpg',
            userName: 'Trần Thị E',
            role: 'Khách Hàng',
            rating: 4,
        },
        {
            key: '6',
            date: '2023-10-06',
            content: 'Giá cả hợp lý cho chất lượng!',
            productImage: 'https://product.hstatic.net/1000406564/product/iphone11-tr_3064909d9a634a548fb3657c570f5c80_master.jpg',
            productName: 'Sản Phẩm F',
            userImage: 'https://randomuser.me/api/portraits/men/4.jpg',
            userName: 'Lê Văn F',
            role: 'Nhân Viên',
            rating: 5,
        },
        {
            key: '7',
            date: '2023-10-07',
            content: 'Không đúng như quảng cáo.',
            productImage: 'https://product.hstatic.net/1000406564/product/iphone11-tr_3064909d9a634a548fb3657c570f5c80_master.jpg',
            productName: 'Sản Phẩm G',
            userImage: 'https://randomuser.me/api/portraits/women/3.jpg',
            userName: 'Nguyễn Thị G',
            role: 'Khách Hàng',
            rating: 2,
        },
        {
            key: '8',
            date: '2023-10-08',
            content: 'Rất đáng giá!',
            productImage: 'https://product.hstatic.net/1000406564/product/iphone11-tr_3064909d9a634a548fb3657c570f5c80_master.jpg',
            productName: 'Sản Phẩm H',
            userImage: 'https://randomuser.me/api/portraits/men/5.jpg',
            userName: 'Trần Văn H',
            role: 'Nhân Viên',
            rating: 5,
        },
        {
            key: '9',
            date: '2023-10-09',
            content: 'Không thể hài lòng hơn.',
            productImage: 'https://product.hstatic.net/1000406564/product/iphone11-tr_3064909d9a634a548fb3657c570f5c80_master.jpg',
            productName: 'Sản Phẩm I',
            userImage: 'https://randomuser.me/api/portraits/women/4.jpg',
            userName: 'Lê Thị I',
            role: 'Nhân Viên',
            rating: 4,
        },
        {
            key: '10',
            date: '2023-10-10',
            content: 'Sản phẩm tuyệt vời!',
            productImage: 'https://product.hstatic.net/1000406564/product/iphone11-tr_3064909d9a634a548fb3657c570f5c80_master.jpg',
            productName: 'Sản Phẩm J',
            userImage: 'https://randomuser.me/api/portraits/men/6.jpg',
            userName: 'Nguyễn Văn J',
            role: 'Khách Hàng',
            rating: 5,
        },
    ];


    const filterData = data.find((item) => parseInt(props.props) == parseInt(item.key))





    const [isModalOpen, setIsModalOpen] = useState(true);
    const ShowModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        ShowModal();
    }, [props.props])

    return (
        <>
            <Modal title={`Sửa bình luận sản phẩm mới ${filterData?.key}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Thêm"
                cancelText="Hủy bỏ">
                <form action="">
                    <div className='flex h-auto flex-col gap-4'>
                        <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Nội dung bình luận</label>
                        <input type='text' placeholder={`${filterData?.content}`} disabled className='h-[48px] cursor-not-allowed bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' id='ten_sp' name='ten_sp' required />

                    </div>
                    <div className='flex h-auto col-span-2 flex-col gap-4 '>
                        <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Tên người bình luận</label>
                        <input type='text' placeholder={`${filterData?.userName}`} disabled className='h-[48px] cursor-not-allowed bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' id='ten_sp' name='ten_sp' required />

                    </div>
                    <div className='flex h-auto col-span-2 flex-col gap-4 '>
                        <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Vai trò</label>
                        <input type='text' placeholder={`${filterData?.role}`} disabled className='h-[48px] cursor-not-allowed bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' id='ten_sp' name='ten_sp' required />

                    </div>
                    <div className='flex h-auto col-span-2 flex-col gap-4'>
                        <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Tên sản phẩm</label>
                        <input type='text' placeholder={`${filterData?.productName}`} disabled className='h-[48px] cursor-not-allowed bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' id='ten_sp' name='ten_sp' required />
                    </div>
                    <div className='flex h-auto col-span-2 flex-col gap-4'>
                        <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Ngày</label>
                        <input type='text' placeholder={`${filterData?.date}`} disabled className='h-[48px] bg-[#81818113] cursor-not-allowed focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' id='ten_sp' name='ten_sp' required />
                    </div>

                    <div className='flex h-auto col-span-2 flex-col gap-4'>
                        <label htmlFor='ten_sp' className='text-[13px] text-[#81818177] font-medium'>Câu trả lời của tôi</label>
                        <input type='text' placeholder={`Chưa nhập`} className='h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none  ' id='ten_sp' name='ten_sp' required />

                    </div>
                </form>
            </Modal>
        </>
    )
}

export default AdminCommentProductEdit