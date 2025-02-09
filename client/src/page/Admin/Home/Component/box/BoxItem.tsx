import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { TbChartBubbleFilled } from 'react-icons/tb';
import { Box } from '../../../DataPageAdmin/DataPageHome';
import { getProductsThunk } from '../../../../../redux/product/product.slice';
import { getOrderAllThunk } from '../../../../../redux/order/Order.slice';
import { getAllUserThunk } from '../../../../../redux/user/user.slice';

function BoxItem() {
    const [onlineCount, setOnlineCount] = useState<number>(0);
const [getNewCustomer,setGetNewCustomer]=useState(0);
const socket = useAppSelector((store) => store.socket.socket); // Lấy socket từ Redux
const dispatch=useAppDispatch()

const listProductAll=useAppSelector((store)=>store.product.listProducts)
const listOrdertAll=useAppSelector((store)=>store.listOrder.listOrder)
const listUserAll=useAppSelector((store)=>store.user.Alluser)

console.log(listOrdertAll);

useEffect(()=>{
    dispatch(getProductsThunk())
    dispatch(getOrderAllThunk(0))
    dispatch(getAllUserThunk());
},[dispatch])
console.log(listProductAll);

useEffect(() => {
  if (!socket) return; // Nếu socket chưa được kết nối thì không làm gì

  // Lắng nghe sự kiện "getOnlineUsersCount"
  socket.on("getOnlineUsersCount", (count: number) => {
    setOnlineCount(count); // Cập nhật số lượng người dùng online
  });

  // Cleanup sự kiện khi component unmount
  return () => {
    socket.off("getOnlineUsersCount");
  };
}, [socket]);

  return (
    <div className='w-full h-[full] grid grid-cols-1 auto-rows-auto gap-[16px] md:grid-cols-2 items-start lg:gap-[12px] lg:grid-cols-4'>
       
    <Box
  id_box_page_home={1}
  title_box_page_home="Khách hàng và admin Online"
  total_box_page_home={onlineCount}
  icon_box_page_home={<TbChartBubbleFilled />}
  symbol=""
/>
    <Box
  id_box_page_home={2}
  title_box_page_home="Khách hàng mới đăng kí"
  total_box_page_home={getNewCustomer}
  icon_box_page_home={<TbChartBubbleFilled />}
  symbol=""
/>
    <Box
  id_box_page_home={2}
  title_box_page_home="Tông sản phẩm"
  total_box_page_home={listProductAll?.length}
  icon_box_page_home={<TbChartBubbleFilled />}
  symbol=""
/>
    <Box
  id_box_page_home={2}
  title_box_page_home="Tông đơn hàng chưa xứ lí"
  total_box_page_home={listOrdertAll?.length}
  icon_box_page_home={<TbChartBubbleFilled />}
  symbol=""
/>
 
</div>
  )
}

export default BoxItem