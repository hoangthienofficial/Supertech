import React, { useEffect, useState } from 'react';
import ProductItem from '../../../components/product/ProductItem';
import { Breadcrumb, Form, Select, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getCatelogryThunkAll } from '../../../redux/catelogry/catelogry.slice';
import { getProductByCateloriesDad, getProductInForThunk } from '../../../redux/product/product.slice';
import { useLocation } from 'react-router-dom';
import Filter from './Filter';

function ListProduct() {
  const location = useLocation();
  const AppDispatch = useAppDispatch();
  const Datafilter: any = useAppSelector((state) => state.product.Datafilter);
  const listProduct = useAppSelector((state) => state.product.listProduct);
  const categoryDadNames: { [key: number]: string } = {
    1: "Điện thoại",
    2: "Laptop",
    3: "Sạc dự phòng",
    4: "Sạc/Cáp sạc",
    5: "Ốp Lưng",
    6: "Tai Nghe",
    7: "Cáp Chuyển Đổi",
  };

  const [StatusSelect, setStatusSelect] = useState("Sắp xếp theo");
  const [ShowProduct, setShowProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm loading state

  const handleStatusSelect = (value: string) => {
    setStatusSelect(value);
  };

  useEffect(() => {
    if (Datafilter != null) {
      setShowProduct(Datafilter);
    }
  }, [Datafilter]);

  useEffect(() => {
    if (StatusSelect === "desc") {
      setShowProduct([...ShowProduct]?.sort((a, b) => b.product_price - a.product_price));
    } else if (StatusSelect === "asc") {
      setShowProduct([...ShowProduct]?.sort((a, b) => a.product_price - b.product_price));
    }
  }, [ShowProduct, StatusSelect]);

  useEffect(() => {
    setShowProduct(listProduct);
  }, [listProduct]);

  const catelogries = useAppSelector((state) => state.category.AlllistCatelories as []);

  const dispatch = useAppDispatch();
  const [dataCate, setDataCate] = useState<any>({});
  useEffect(() => {
    try {
      dispatch(getCatelogryThunkAll());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category_dad = searchParams.get('category_dad');
    const category = searchParams.get('category');
    setDataCate({
      category_dad,
      category,
    });
    AppDispatch(getProductInForThunk());
  }, [AppDispatch, location.search]);

  useEffect(() => {
    AppDispatch(getProductByCateloriesDad(dataCate));
  }, [AppDispatch, dataCate]);

  // Thêm state loading để theo dõi quá trình tải dữ liệu
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Dữ liệu đã được tải xong sau 2000ms
    }, 2000); // Giả lập việc tải dữ liệu mất 2000ms
  }, []);

  return (
    <div className='w-[80%] m-auto'>
      <Breadcrumb
        items={[
          {
            title: <a href=''>Trang chủ</a>,
          },
          {
            title: "Danh sách sản phẩm",
          },
        ]}
      />
      <div>
        <div className='my-[5px] flex gap-4'>
          <div className='cursor-pointer text-[1.8rem] justify-center items-center gap-[.3rem] h-[3.5rem] flex w-[9rem]'>
{
  loading ? (<Skeleton.Input/>): (            <Filter data={{ catelogries: catelogries, listProduct: listProduct, dataCate: dataCate }} />
  )
}          </div>
        </div>
        <div className='my-[5px] w-[100%]'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-[1rem]'>
              {loading ? (
                <Skeleton.Input active style={{ width: 300, height: 30 }} />
              ) : (
                <h4 className='text-[1.8rem] mt-[.5rem] font-semibold'>
                  Danh mục
                  {' ' + categoryDadNames[dataCate.category_dad]}
                  {Datafilter?.length !== 0 ? ` có ${ShowProduct?.length} kết quả sản phẩm ` : `Không có kết quả`}
                </h4>
              )}
            </div>
            <div className='w-[200px]'>
              {loading ? (
                <Skeleton.Button active style={{ width: 100 }} />
              ) : (
                <Form.Item>
                  <Select value={StatusSelect} onChange={handleStatusSelect}>
                    <Select.Option value="asc">Giá tăng dần</Select.Option>
                    <Select.Option value="desc">Giá giảm dần</Select.Option>
                  </Select>
                </Form.Item>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 min-[426px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
        {/* Sử dụng Skeleton nếu đang loading */}
        {loading ? (
          [...Array(12)].map((_, index) => (
            <div key={index} className='col-span-1'>
              <Skeleton active loading={loading} />
            </div>
          ))
        ) : ShowProduct?.length > 0 ? (
          ShowProduct?.map((item) => <ProductItem key={item.id} product={item} />)
        ) : (
          <div className='col-span-6 text-[30px] font-bold flex items-center justify-center h-[80vh]'>
            <span>Không tìm thấy sản phẩm mà bạn yêu cầu</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListProduct;
