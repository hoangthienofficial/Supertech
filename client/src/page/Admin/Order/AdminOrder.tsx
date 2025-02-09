

import { Button, Checkbox, Popover, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getOrderAllThunk, setOrder } from '../../../redux/order/Order.slice';
import { colorText } from '../../../constants';
import { PathAdmin } from '../../../router/component/RouterValues';
import useSocketCreateOrder from '../../../hooks/CreateOrder.hook';
import { formatCurrencyVND, formatTimeAgo } from '../../../utils';

function AdminOrder() {

  const navigate = useNavigate();
  const [activeOrder, setActiveOrder] = useState(null); // Lưu trữ ID đơn hàng được active

  const handleActive = (orderId) => {
    setActiveOrder(orderId); // Cập nhật đơn hàng được chọn
    // navigate(`/admin/quản-lí-đơn-hàng/quản-lí-đơn-hàng-chi-tiết/${orderId}`);
    navigate(`/admin/${PathAdmin.Orders}/${PathAdmin.OrderDetail.replace(':id', orderId)}`);

  };
  

  const [detailOrder,setDetailOrder]=useState([]); 

  const dispatch=useAppDispatch();

  const socket = useAppSelector((state: any) => state.socket.socket);  // Get socket from Redux store
  const getOrderAll = useAppSelector((state) => state.listOrder.listOrder);  // Get all orders from Redux store
 useEffect(()=>{
    dispatch(getOrderAllThunk(0))
  },[dispatch])
  useEffect(() => {
    if (socket) {
      socket.on("createOrder", (newComment: any) => {
        dispatch(setOrder([newComment, ...getOrderAll]));  // Add new order at the beginning
      });
    }

    return () => {
      if (socket) {
        socket.off("createOrder");
      }
    };
  }, [socket, getOrderAll, dispatch]);

  // Return getOrderAll so it can be used in the component
  
  
  // Trạng thái đang được lọc
  const [filteredOrders, setFilteredOrders] = useState(getOrderAll);



  useEffect(() => {
    setFilteredOrders(getOrderAll); // Cập nhật filteredOrders khi getOrderAll thay đổi
  }, [getOrderAll]);

  // Hàm lọc đơn hàng theo trạng thái
  const handleFilterByStatus = (status) => {
dispatch(getOrderAllThunk(status));
    }
  

  
  return (
    <div className="p-12  text-[2rem] bg-gray-100 h-[100vh] flex">
      <div className='w-[95%] m-auto flex'>
      <div className="flex  gap-[2rem] w-[70%] justify-center items-center">
        <div className="w-[100%] mx-auto">
          <div className="bg-white w-[100%] h-[4rem] px-4 flex justify-center items-center">
            <div className="flex justify-center items-center gap-6">
              {colorText.map((item, index) => (
                <div key={index}             onClick={() => handleFilterByStatus(item.status)}
                className="flex items-center gap-3 cursor-pointer">
                  <Tooltip title={item.text}>
                    <div
                      className="w-[1.5rem] h-[1.5rem] rounded-[50%] flex items-center justify-center"
                      style={{
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </Tooltip>
                  <p className="text-[1.5rem] font-semibold leading-none">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white mt-[2rem] p-6 rounded-lg shadow-lg">
           
            <Outlet />
          </div>
        </div>
      </div>

      <div className="w-[30%] rounded-sm h-[92vh] overflow-y-auto bg-gray-100 flex flex-col">
  <div className="p-3 rounded-lg flex-grow">
    {/* Header */}
    <div className="flex text-[1.4rem] sm:text-[1.6rem] md:text-[1.7rem] justify-between bg-customColor py-[1rem] px-[1rem] text-white">
  <span className="flex-1 text-center">Mã ĐH</span>
  <span className="flex-1 text-center">Trạng thái</span>
  <span className="flex-1 text-center">Tổng tiền</span>
  <span className="flex-1 text-center">Thời gian</span>
</div>


    {/* Order List */}
    {filteredOrders?.map((item) => {
  // Tìm trạng thái mới nhất từ mảng order_statuses
  const latestStatus = item?.order_statuses?.reduce((latest, current) => {
    return new Date(latest.created_at) > new Date(current.created_at) ? latest : current;
  }, item?.order_statuses[0])?.order_status;

  // Tìm màu sắc dựa trên trạng thái mới nhất
  const statusColor =
    colorText.find((color) => color.status === latestStatus)?.color || "#CCCCCC";

  return (
    <div
      key={item.order_id}
      className={`mt-2 text-center text-[1.6rem] px-[2rem] py-[2rem] rounded-lg shadow cursor-pointer ${
        activeOrder === item.order_id
          ? "bg-purple-200 text-purple-700"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => handleActive(item.order_id)}
    >
      <div className="flex justify-between items-center">
        <span className="flex-1 text-center">#{item.order_id}</span>
        <span className="flex-1 text-cente flex justify-center items-center">
          <Tooltip
            title={
              latestStatus
                ? `Trạng thái: ${latestStatus}`
                : "Dữ liệu không tồn tại"
            }
          >
            <div
              className="w-[1.5rem] h-[1.5rem] rounded-[50%]"
              style={{
                backgroundColor: statusColor,
              }}
            />
          </Tooltip>
        </span>
        <span className="flex-1 text-green-500 text-center">
                        {formatCurrencyVND(Number(item?.order_total) * (1 - Number(item?.discount_discount?.discount_percent / 100 ||0)) + 30000)}
          
        </span>
        <span className="flex-1 text-gray-500 text-center">{
          formatTimeAgo(item?.order_date)
          }</span>
      </div>
    </div>
  );
})}

  </div>

 
</div>
      </div>
     
    </div>
  );

}

export default AdminOrder;
