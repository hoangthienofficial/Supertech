import { Breadcrumb, Checkbox, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { MdFilterAlt } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ProductItem from '../../../components/product/ProductItem';
import { useDispatch } from 'react-redux';
import { getFavouriteProductThunk } from '../../../redux/favourite/Favourite.slice';


function FavoriteProduct() {

  const listProductFavourites=useAppSelector((state)=>state.listProductFavorites.listFavourite)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getFavouriteProductThunk())
  },[dispatch])
  return (
    <div className='w-[95%] leading-10 md:w-[90%] lg:w-[80%] m-auto'>
      <Breadcrumb
        items={[
          {
            title: <a href=''>Trang chủ</a>,
          },
          {
            title: "Sản phẩm yêu thích",
          },
        ]}
      />
      <div>
        <h3 className='text-[2rem] mb-[1rem] font-semibold'>
          Sản Phẩm Yêu Thích <span className='text-[#7500CF]'>{listProductFavourites.length}</span>
        </h3>
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
          <div className='cursor-pointer text-[1.6rem] sm:text-[1.8rem] justify-center items-center gap-[.3rem] h-[3.5rem] flex border border-gray-600 w-full sm:w-[9rem]'>
            <MdFilterAlt />
            <span>Bộ lọc</span>
          </div>
          <div className='cursor-pointer text-[1.6rem] sm:text-[1.8rem] justify-center items-center gap-[.3rem] h-[3.5rem] flex border border-gray-600 w-full sm:w-[6rem]'>
            <span>Giá</span>
          </div>
        </div>
        <div className='mt-[.5rem] w-[100%]'>
          <div className='flex flex-wrap items-center gap-4'>
            <div className='w-full min-[426px]:w-auto'>
              <h4 className='text-[1.6rem] font-semibold'>10 Điện thoại iPhone (Apple)</h4>
            </div>
            <div className='flex items-center gap-4'>
              <Form.Item className='mb-0' valuePropName="checked">
                <Checkbox>Giảm giá</Checkbox>
              </Form.Item>
              <Form.Item className='mb-0' valuePropName="checked">
                <Checkbox>Mới</Checkbox>
              </Form.Item>
            </div>
            <div className='flex items-center gap-2 ml-auto'>
              <span className='text-[1.4rem]'>Sắp xếp theo:</span>
              <Select 
                defaultValue="demo" 
                className='w-[120px]'
                size="large"
              >
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 min-[426px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 2xl:grid-cols-6'>
        {listProductFavourites.length > 0 ? (
          listProductFavourites.map((item) => {
           
            return <ProductItem key={item.product_id} product={item.product} />;
          })
        ) : (
          <div className="leading-10 col-span-6 flex flex-col items-center justify-center text-center py-20">
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/417/132/original/ecommerce-icon-empty-yellow-shopping-cart-3d-illustration-free-png.png" 
            alt="Không tìm thấy sản phẩm"
            className="w-[15rem] h-[15rem] mb-4"
          />
          <h2 className="text-3xl font-semibold text-gray-800">         
            <p>Không có sản phẩm yêu thích</p>
          </h2>
          <p className="text-gray-500 mt-2">
          <p className='text-2xl text-gray-800'>Tất cả các sản phẩm yêu thích của bạn sẽ hiện ở đây</p>
          </p>
          <button
            onClick={() => window.location.href = '/'} // Đổi thành URL bạn muốn
            className="text-2xl mt-6 px-10 py-3 font-medium bg-customColor text-white rounded-xl hover:bg-indigo-800"
          >
            Trở về trang chủ
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteProduct;
