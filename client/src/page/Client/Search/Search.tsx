import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Spin } from 'antd'; // Import Spin từ Ant Design
import ProductItem from '../../../components/product/ProductItem';
import { Breadcrumb } from 'antd';
import './css/customCss.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { getSearchProductThunk } from '../../../redux/search/Search.slice';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('tukhoa');
  const dispatch = useDispatch();

  // Trạng thái loading và dữ liệu
  const [loading, setLoading] = useState(true);
  const [loadingDelay, setLoadingDelay] = useState(true); // Trạng thái loading với delay
  const { listSearch } = useAppSelector((state) => state.search);

  useEffect(() => {
    setLoading(true); // Bật loading khi bắt đầu tải dữ liệu
    dispatch(getSearchProductThunk(query)).finally(() => {
      // Tắt loading sau khi nhận được dữ liệu và sau 2 giây
      setTimeout(() => {
        setLoading(false);
        setLoadingDelay(false); // Sau 2 giây thì hiển thị sản phẩm
      }, 2000); // 2 giây delay
    });
  }, [dispatch, query]);

  return (
    <div className='w-[95%] md:w-[90%] lg:w-[80%] m-auto'>
      <Breadcrumb
        items={[{ title: <a href=''>Trang chủ</a> }, { title: "Tìm kiếm sản phẩm" }]}
      />
      <div>
    

        {/* Hiển thị hiệu ứng loading */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : loadingDelay ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" /> {/* Hiển thị loading trong 2 giây */}
          </div>
        ) : (
          <div>
                <h3 className='text-[2rem] mb-[1rem] font-semibold py-4'>
          Kết quả phù hợp với từ khóa: <span className='text-[#7500CF]'>{query}</span>
        </h3>
        <div className='grid grid-cols-1 min-[426px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 '>
            {listSearch?.length ? (
              listSearch.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))
            ) : (
              <div className="leading-10 col-span-6 flex flex-col items-center justify-center text-center py-20">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/009/417/132/original/ecommerce-icon-empty-yellow-shopping-cart-3d-illustration-free-png.png"
                  alt="Không tìm thấy sản phẩm"
                  className="w-[15rem] h-[15rem] mb-4"
                />
                <h2 className="text-3xl font-semibold text-gray-800">Không có mặt hàng này</h2>
                <p className="text-gray-500 mt-2">
                  Chúng tôi không tìm thấy sản phẩm nào phù hợp với tìm kiếm của bạn.
                </p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="text-2xl mt-6 px-10 py-3 font-medium bg-customColor text-white rounded-xl hover:bg-indigo-800"
                >
                  Trở về trang chủ
                </button>
              </div>
            )}
          </div>
          </div>
       
        )}
      </div>
    </div>
  );
}

export default Search;
