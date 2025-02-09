import { Steps, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getOrderDetail } from '../../../../redux/order/Order.slice';
import { getDetailOrder } from '../../../../service/order/order.service';
import { formatCurrencyVND, truncateText } from '../../../../utils';
import { Container } from '../../../../components/Style/Container';
import { MdArrowBackIosNew } from 'react-icons/md';
import StepOrderDetai from './component/StepOrderDetai';
import { colorText, IMG_BACKEND } from '../../../../constants';
import { Paths } from '../../../../router/component/RouterValues';
import CancelOrderModal from '../Order/component/ModalCancer';
import './component/css/editTable.css'
function OrderDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const idOrder=Number(id)
 
  
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      render: (text:string, record:any) => {
        return ( 
        <div className='flex gap-[.2rem]'>
          <div className='w-[80px]'>
            <img
                                  src={`${IMG_BACKEND}/${record.image}`}
            
            alt="" />
          </div>
          <div>
           <div className='text-[1.5rem] sm:hidden lg:block  font-semibold mb-[.2rem]'>{record.name}</div> 
           <div className='text-[1.3rem] lg:hidden  font-semibold mb-[.2rem]'>{truncateText(record.name,20)}</div> 
           <div>{record.storage}GB/{record.product_color}</div>
          </div>
          
        </div>
        ) 
       },

      width: '40%',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'product_price',
      render:(text:number,value)=>{
        return (
          <div className='text-customColor font-semibold text-center'>
            
            {formatCurrencyVND(text)}

            
            </div>
        )
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quanlity',
      render:(text:string)=>{
        return (
          <div className=' font-semibold text-center'>{text}</div>
        )
      }

 
    
    },
    {
      title: 'Giảm giá',
      dataIndex: 'product_discount',
      render:(text:string)=>{
        return( <div className='text-red-600 font-semibold text-center'>
          {text}%

        </div>)
      }

 
    
    },
    {
      title: 'Tổng',
      dataIndex: 'total',
      render: (text:string, record:any) => {
        const donGia =+record.product_price;
        const soLuong = +record.quanlity;
        const giamGia = +record.product_discount;
        const tongTien = donGia * soLuong * (1 - giamGia / 100);
       
        return (
          <div className='text-[#FF0000] font-semibold text-center'>
            {formatCurrencyVND(tongTien )}
          </div>
        );
      }

      

 
    
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const dispatch=useAppDispatch()
const [detailOrder,setDetailOrder]=useState([]); 
const [user,setUser]=useState({});

const [order,setOrder]=useState({})
const [listProduct,setListProduct]=useState([]);

const cancelReason = order?.order_statuses?.find(
  (status) => status.order_status == 6
)?.order_status_text_cancel;

console.log(cancelReason); // Output: "Đơn hàng bị hủy do khách yêu cầu"
useEffect(() => {
  const fetchApi = async () => {
    try {
      const resp = await getDetailOrder(idOrder);
      const details = resp.data.content;

      setDetailOrder(details);

      if (details.length > 0) {
        setOrder(details[0]?.order); // Đặt order từ phần tử đầu tiên trong detailOrder
      }

      const products = details.map(detail => ({
        quanlity: detail.detail_order_quality,
        name: detail.product.product_name,
        product_price: detail.detail_order_price,
        product_discount: detail.discount_product,
        product_hot: detail.product.product_hot,
        category_id: detail.product.category_id,
        product_color: detail.product_color,
        storage: detail.product_storage,
        image: detail.img_name,

      }));

      setListProduct(products);
    } catch (e) {
      console.log(e);
    }
  };

  fetchApi();
}, [idOrder]);


const statusIndex = detailOrder[0]?.order?.order_status; 
const currentStatus = colorText.find(item => item.status === statusIndex); 

const statusText = currentStatus  
// const cancelReason = order?.order_statuses?.find(
//   (status) => status.order_status == 6
// )?.order_status_text_cancel;

// console.log(cancelReason);
const navigate=useNavigate();
const handleClickNavigate=()=>{
  navigate(`${Paths.Profile}`)
}

  
return (
    <Container>
      <div className='w-[100%] shadow-lg py-[1.5rem] sm:py-[4rem] leading-10 px-[1rem] sm:px-[3rem] bg-white'>
        <div className='flex flex-col sm:flex-row justify-between items-center border-b pb-[1rem] gap-[.8rem]'>
          <div 
          
          className='text-[1.3rem] cursor-pointer sm:text-[2rem] flex justify-center items-center gap-[.8rem]'
          onClick={()=>{handleClickNavigate()}}
          >
            <MdArrowBackIosNew />
            <div className='text-[1.2rem] sm:text-[1.7rem] sm:hidden md:block'>Trở lại</div>
          </div>
          <div className='flex  flex-col sm:flex-row gap-[.8rem] justify-center items-center'>
            <h3 className='text-[1.3rem] sm:hidden md:block sm:text-[1.7rem] font-semibold sm:border-r sm:px-1'>
              Mã đơn hàng <span className='text-[#0084FF]'>#{detailOrder[0]?.order?.order_id}</span>

            </h3>
            <h3 className='text-[1.3rem] md:text-[1.7rem] md:hidden font-semibold sm:border-r sm:px-1'>
              Mã <span className='text-[#0084FF]'>#{detailOrder[0]?.order?.order_id}</span>

            </h3>
            <p className='text-[1.2rem] sm:hidden md:block sm:text-[1.7rem] font-semibold text-center sm:text-left'>
              Trạng thái vận chuyển: <span className={`text-[${statusText?.color}]`}>{statusText?.text}</span>
            </p>
            <p className='text-[1.2rem] flex justify-center items-center gap-[1rem] md:hidden md:text-[1.7rem] font-semibold text-center sm:text-left'>
              Trạng thái: 
              <Tooltip title={statusText?.text}>
              <div
                style={{ backgroundColor: statusText?.color }}
                className="w-[1.5rem] h-[1.5rem] rounded-[50%]"
              ></div>
            </Tooltip>


             
            </p>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-[.8rem] py-[.8rem] text-center sm:text-left'>
          <p className='text-[1.1rem] sm:text-[1.4rem] font-semibold'>Khuyến mãi: <span>0</span></p>
          <p className='text-[1.1rem] sm:text-[1.4rem] font-semibold sm:hidden md:block'>Phí vận chuyển: <span>0</span></p>
          <p className='text-[1.1rem] sm:text-[1.4rem] font-semibold'>
            Tổng tiền: <span className='text-[red]'>{formatCurrencyVND(detailOrder[0]?.order?.order_total+30000)}</span>
          </p>
        </div>
        <div className='flex flex-col lg:flex-row justify-between gap-[2rem]'>
          <div className='w-full lg:w-[49%]'>
           
            <div className='mb-[1.5rem]'>
              <h4 className='font-semibold text-[1.5rem] sm:text-[1.7rem] mb-[1rem]'>Phương thức thanh toán</h4>
              <div className='shadow-md p-[1.5rem] sm:p-[2rem]'>
                <p className='text-[1.4rem] sm:text-[1.6rem] font-semibold'>
                  Thanh toán: <span>{order?.order_pay==0 ? "Thanh toán tại nhà" : "Đã thanh toán"}</span>
                </p>
              </div>
            </div>
            <div>
            <h4 className='font-semibold text-[1.7rem] mb-[1rem]'>Địa chỉ giao hàng</h4>
            <div className='h-[10rem] shadow-md p-[2rem]'>
            <p className='text-[1.6rem] font-semibold'>Địa chỉ: <span>{detailOrder[0]?.order?.address}</span></p>
            <p className='text-[1.6rem] mt-[1rem] font-semibold'>Số điện thoại: <span>{detailOrder[0]?.order?.phone_number}</span></p>
            </div>
            </div>
            
            <div className='mt-[1.5rem]'>
            <h4 className='font-semibold text-[1.7rem] mb-[1rem]'>Tổng thanh toán</h4>
            <div className='h-[100%] shadow-md p-[2rem]'>
            <p className='text-[1.7rem]  py-[1rem]'>Tổng tiền hàng: <span className='font-semibold'>{formatCurrencyVND(detailOrder[0]?.order?.order_total)}</span></p>
            <p className='text-[1.7rem]  py-[1rem]'>Tổng tiền ship: <span className='font-semibold'>30.000</span></p>
            <p className='text-[1.7rem]  py-[1rem]'>Giảm giá: <span className='font-semibold'>{order?.discount_discount?.discount_percent || 0}%</span></p>
            <p className='text-[1.7rem]  py-[1rem]'>Thành tiền: <span className='font-semibold'>{formatCurrencyVND(Number(order?.order_total) * (1 - Number(order?.discount_discount?.discount_percent / 100 ||0)) + 30000)}</span></p>
        
            </div>
            </div>
          </div>
          <div className='w-full lg:w-[49%]'>
            <div className="w-[100%] bg-white shadow-md rounded-lg p-4 sm:p-8">
              <h3 className="text-[1.6rem] sm:text-[1.8rem] font-semibold text-gray-800 mb-6">
                Trình trạng đơn hàng
              </h3>
              <StepOrderDetai order={detailOrder[0]?.order}/>
            </div>
            {(order?.order_status >= 4 && order?.order_status <= 5) && (


              <div className="w-[100%] bg-white shadow-md rounded-lg p-4 sm:p-8 mt-[3rem]">
                <h3 className="text-[1.6rem] sm:text-[1.8rem] font-semibold text-gray-800 mb-6">
                 Trình trạng đơn hàng
                </h3>
                <p className='text-[1.4rem] sm:text-[1.6rem]  font-semibold       '>
              {order?.order_status==5 ? "Không nhận hàng" :"Giao hàng thành công" }

                </p>
              </div>
            )}
            {order?.order_status == 6 && (
              <div className="w-[100%] bg-white shadow-md rounded-lg p-4 sm:p-8 mt-[3rem]">
                <h3 className="text-[1.6rem] sm:text-[1.8rem] font-semibold text-gray-800 mb-6">
                  Lý do hủy đơn hàng
                </h3>
                <p className='text-[1.4rem] sm:text-[1.6rem]'>{cancelReason}</p>
              </div>
            )}
          </div>
        </div>
        <div className='mt-[3rem] table-detail-order '>
        
        </div>
        <div className='editTable'>
          <Table 
          columns={columns} 
          dataSource={listProduct} 
          pagination={false} 
          scroll={{ x: 1000 }} // Đặt chiều rộng tối thiểu (min-width) cho bảng

          rowKey="name" // hoặc một thuộc tính duy nhất khác
        />
        </div>
        
        {order?.order_status < 2 ?   <div className='rounded-lg mt-[1rem]'>
          <CancelOrderModal orderId={order.order_id}>Huỷ đơn hàng</CancelOrderModal>
        </div>: "" }
      
      </div>
      
    </Container>
  )
}

export default OrderDetail