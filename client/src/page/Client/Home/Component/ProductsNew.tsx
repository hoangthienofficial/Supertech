import React, { useEffect, useState } from 'react';
import ProductItem from '../../../../components/product/ProductItem';
import ProductLimitOne from './ProductLimitOne';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getProductsThunk } from '../../../../redux/product/product.slice';
import { NavLink } from 'react-router-dom';

function ProductsNew() {
  const listProducts = useAppSelector((state) => state.product?.listProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const [productDiscount, setProductDiscount] = useState([]);
  const [productNew, setProductNew] = useState([]);
  const [productHot, setProductHot] = useState([]);
  
  // State để lưu tab hiện tại
  const [activeTab, setActiveTab] = useState('new'); // Mặc định là 'new'

  useEffect(() => {
    const sortedDiscountedProducts = [...listProducts] // Tạo bản sao của listProducts
      .filter((product) => product.product_discount > 0)
      .sort((a, b) => b.product_discount - a.product_discount)
      .slice(0, 5);
  
    const sortedNewProducts = [...listProducts] // Tạo bản sao của listProducts
      .sort((a, b) => new Date(b.product_date) - new Date(a.product_date)) // Sắp xếp theo ngày
      .slice(0, 5);
  
    const sortedHotProducts = [...listProducts] // Tạo bản sao của listProducts
      .filter((product) => product.product_hot === 1)
      .slice(0, 5);
  
    setProductDiscount(sortedDiscountedProducts);
    setProductNew(sortedNewProducts);
    setProductHot(sortedHotProducts);
  }, [listProducts]);

  // Hàm để lấy danh sách sản phẩm theo tab đang chọn
  const getCurrentProducts = () => {
    if (activeTab === 'new') return productNew;
    if (activeTab === 'hot') return productHot;
    if (activeTab === 'discount') return productDiscount;
    return [];
  };

  // Hàm để lấy className cho tab (màu đỏ khi tab đang active)
  const getTabClassName = (tabName) => {
    return `cursor-pointer text-[2rem] font-semibold ${
      activeTab === tabName ? 'text-red-600' : ''
    }`;
  };

  return (
    <div className=''>
      <div className='flex gap-[1.5rem] items-center justify-center py-[1.5rem]'>
        <h4
          className={getTabClassName('new')}
          onClick={() => setActiveTab('new')}
        >
          Sản phẩm mới nhất
        </h4>
        <h4
          className={getTabClassName('hot')}
          onClick={() => setActiveTab('hot')}
        >
          Sản phẩm bán chạy
        </h4>
        <h4
          className={getTabClassName('discount')}
          onClick={() => setActiveTab('discount')}
        >
          Sản phẩm giảm giá
        </h4>
      </div>
      
      <div className=' grid sm:grid-cols-1 ssm:grid-cols-2 lg:grid-cols-3 mdl:grid-col-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[1rem]'>
    

        {/* Render danh sách sản phẩm theo tab */}
        {getCurrentProducts().map((product) => (
          <div  key={product.id}>
                      <ProductItem product={product}/>

          </div>
        ))}
    
      </div>
    </div>
  );
}

export default ProductsNew;
