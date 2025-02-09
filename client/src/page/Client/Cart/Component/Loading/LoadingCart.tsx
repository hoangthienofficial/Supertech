import React from "react";
import { Skeleton } from "antd";
import { Container } from "../../../../../components/Style/Container";
import { useAppSelector } from "../../../../../redux/hooks";
function LoadingCart() {
      const listCart = useAppSelector((state) => state.cart.listCart);
    
  return (
    <Container>
      <div className="py-6 text-[1.5rem]">
        <div className="mx-auto">
            
          {/* Breadcrumb Skeleton */}
          <Skeleton paragraph={{ rows: 0,width: '50%' }} active />
          
          <div className="flex space-x-6 mt-6">
            
            {/* Left Section (Products List) */}
            <div className="flex-1 space-y-6">
  <div className="bg-white py-3 md:py-5 rounded-lg shadow">
  <Skeleton
    title={{ width: '100 %' }}
    style={{ height: '100%'} }
    paragraph={false}
    active
  />
  </div>

  {/* Header Skeleton */}


  {/* Product Skeleton */}
  {listCart.map((_, idx) => (
    <div key={idx} className="bg-white py-5 rounded-lg shadow space-y-1">
      <div className="flex space-x-6 items-center px-5 py-5">
        {/* Skeleton Image */}
        <Skeleton.Image
          style={{ width: 70, height: 70, borderRadius: '8px' }}  // Điều chỉnh kích thước hình ảnh skeleton
          active
        />

        <div className="flex-1">
          {/* Product Name Skeleton */}
          <Skeleton
            paragraph={{ rows: 2, width: ['90%', '60%'] }}  // Điều chỉnh số dòng và chiều rộng của tên sản phẩm
            active
          />
          {/* Product Button Skeleton */}
          <Skeleton.Button style={{ width: '30%' }} active />
        </div>

        {/* Quantity Skeleton */}
        <Skeleton.Button style={{ width: '10%' }} active />

        {/* Price Skeleton */}
        <Skeleton paragraph={{ rows: 1, width: '20%' }} active />

        {/* Action Button Skeleton */}
        <Skeleton.Button style={{ width: '5%' }} active />
      </div>
    </div>
  ))}

  {/* Action Buttons Skeleton */}
  <div className="flex justify-between">
    <Skeleton.Button style={{ width: '40%' }} active />
    <Skeleton.Button style={{ width: '40%' }} active />
  </div>
</div>

            {/* Right Section (Order Summary) */}
            <div className="w-1/3 h-[550px] sticky top-[10%] bg-white rounded-lg shadow-xl p-7 space-y-4">
              <Skeleton title={{ width: '70%' }} paragraph={false} active />
              <Skeleton paragraph={{ rows: 4, width: '100%' }} active />
              <Skeleton.Button style={{ width: '100%' }} active />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default LoadingCart;