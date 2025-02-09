// Bill.js
import React, { useEffect, useState } from "react";
import { Container } from "../../../components/Style/Container";
import { Button, Steps, Table, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getOrderDetail } from "../../../redux/order/Order.slice";
import { getDetailOrder } from "../../../service/order/order.service";
import StepOrderDetail from "../User/OrderDetail/component/StepOrderDetai";
import { formatCurrencyVND, formatDate, truncateText } from "../../../utils";
import { NavLink, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { colorText, IMG_BACKEND } from "../../../constants";

function Bill(props) {
  const orderId:any=useAppSelector((state)=>state.listOrder.orderId)
  const orderDetail=useAppSelector((state)=>state.listOrder.detailOrder)
  const [order,setOrder]=useState({})
  const [detailOrder,setDetailOrder]=useState([]); 

  const [listProduct,setListProduct]=useState([]);
  const dispatch=useAppDispatch();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resp = await getDetailOrder(orderId);
        const details = resp.data.content;
  
        // Cập nhật detailOrder
        setDetailOrder(details);
  
        if (details.length > 0) {
          // Cập nhật order nếu có dữ liệu
          setOrder(details[0].order);
  
          // Cập nhật danh sách sản phẩm từ detailOrder
          const products = details.map(detail => ({
            quanlity: detail.detail_order_quality,
            name: detail.product.product_name,
            product_price: detail.detail_order_price,
            product_discount: detail.discount_product,
            product_hot: detail.product.product_hot,
            image: detail.img_name,
            product_color: detail.product_color,
            storage: detail.product_storage,
            category_id: 2,
          }));
  
          setListProduct(products);
        }
      } catch (e) {
        console.error(e);
      }
    };
  
    fetchApi();
  }, [orderId]);
  // console.log(order.discount_discount.discount_percent);
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
           <div className='text-[1.5rem] sm:hidden lg:inline-block  font-semibold mb-[.2rem]'>{truncateText(record.name,25)}</div> 
           <div className='text-[1.3rem] lg:hidden   font-semibold mb-[.2rem]'>{truncateText(record.name,20)}</div> 
           <div className="">{record.product_color}</div>
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
            
            {formatCurrencyVND(text * (1 - Number(value?.product_discount / 100 ||0)))}

            
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
            {formatCurrencyVND(tongTien + 30000)}
          </div>
        );
      }

      

 
    
    },
  ];
  console.log(orderDetail);
  const totalPrice = detailOrder.reduce((total:number, item) => {
    const discountAmount = Number(item.detail_order_price * item.discount_product) / 100; // Tính giảm giá
    const priceAfterDiscount = Number(item.detail_order_price) - Number(discountAmount); // Tính giá sau giảm
    const itemTotalPrice = Number(item.detail_order_quality) *   Number(priceAfterDiscount); // Tính tổng giá của item
    return itemTotalPrice; // Cộng dồn vào total
  }, 0);
  const getDiscount=Number(order?.discount_discount?.discount_percent) || 0
  const totalPriceWithVoucher =Number(totalPrice) * (1 -  Number(getDiscount) / 100) + 30000;
  const navigate=useNavigate();
  return (
    <Container>
         <div className=' leading-10 py-6 text-[1.5rem]'>
            <div className="my-[1.5rem] text-[1.5rem] text-gray-600">
              <a href="/" className="text-customColor hover:underline">
                Trang chủ
              </a>
              <span className="mx-2">/</span>
              <span>Xuất hóa đơn</span>
            </div>
      
      <div className="py-6 text-[1.75rem] flex flex-col lg:flex-row gap-10">
        
        {/* Order Progress Tracker */}
        <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-8">
          <h3 className="text-[1.8rem] font-semibold text-gray-800 mb-6">
            Trình trạng đơn hàng 
          </h3>
    
       <StepOrderDetail  order={detailOrder[0]?.order}/>
        </div>

        {/* Order Success Message & Summary */}
        <div className="lg:w-2/3 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col items-start px-8 py-8 rounded-t-3xl bg-green-50 shadow-lg">
            {/* Success Message Section */}
            <div className="flex sm:flex-col ssm:flex-row sm:justify-center ssm:justify-between items-center w-full mb-6 gap-4">
  <div className="flex items-center gap-5">
    <div className="bg-green-100 p-5 rounded-full">
      <svg
        className="w-10 h-10 text-green-600"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10.94 14.94l5.66-5.66a1 1 0 00-1.41-1.41l-5.25 5.25L8.34 11.7a1 1 0 10-1.41 1.41l3 3a1 1 0 001.41-.17z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
    <div>
      <h2 className="text-[2rem] font-bold text-green-600">
        Đặt hàng thành công
      </h2>
      <p className="text-[1.5rem] text-gray-700 mt-1">
        {detailOrder[0]?.order?.order_pay === 0
          ? "Thanh toán tại nhà"
          : "Đã thanh toán"}
      </p>
    </div>
  </div>
  <button
    className="
      flex justify-center items-center 
      bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-4 rounded-full text-[1.4rem]"
  onClick={()=>{navigate("/")}}
  >
    Tiếp tục <span className="sm:hidden md:block ml-[.5rem]"> mua sắm</span>
  </button>
</div>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-[1.8rem] font-semibold text-gray-800">
                Mã đơn hàng: #{orderId}
                </h3>
                <p className="text-[1.5rem] text-gray-500 mt-[.5rem]">Thời gian đặt: 
                  
                  <span>

                  {formatDate(detailOrder[0]?.order?.order_date)}
                  </span>
               
                   
                   </p>
              </div>
              <div className="text-right">
                <h4 className="text-[1.8rem] font-semibold text-gray-800">Giao hàng đến</h4>
                <p className="text-[1.5rem] text-gray-500 mt-[.5rem]">
                {detailOrder[0]?.order?.address}
                </p>
                <p className="text-[1.5rem] text-gray-500">Dự kiến giao hàng: 19:45</p>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="text-[1.8rem] font-semibold text-gray-800 mb-3">Tổng trị giá (tạm tính)</h4>
              <div className="flex justify-between text-[1.6rem] text-gray-600 mb-1">
                <span>Phí giao hàng:</span>
                <span>30,000₫</span>
              </div>
              <div className="flex justify-between text-[1.6rem] text-gray-600 mb-1">
                <span>Giá sản phẩm:</span>
                <span>{formatCurrencyVND(totalPrice)}</span>
              </div>
            
              <div className="flex justify-between text-[1.6rem] font-semibold text-gray-800 mt-3">
                <span>Giảm giá:</span>
                <span>{getDiscount || 0}%</span>
              </div>
              <div className="flex justify-between text-[1.8rem] font-bold text-green-600 mt-4">
                <span>Tổng cộng:</span>
                <span>{formatCurrencyVND(totalPriceWithVoucher)}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="overflow-x-auto">
 
              <div className="tableEdit w-full overflow-x-auto">
        <Table
          columns={columns}
          dataSource={listProduct}
          rowKey="order_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
          className="mt-[3rem]"
        />
      </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Container>
  );
}

export default Bill;