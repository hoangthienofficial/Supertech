import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import ProductItemHot from "../../../../components/product/ProductItemHot";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { getProductsThunk } from "../../../../redux/product/product.slice";
import { Skeleton } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/customSlick.css";

function ProductSale() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: (
      <div className="absolute top-[45%] left-[0] transform translate-x-[50%] z-10 translate-y-[-50%]">
        <div className="w-[3.2rem] h-[3.2rem] rounded-full bg-black flex justify-center items-center opacity-60 hover:opacity-100 cursor-pointer">
          <IoIosArrowBack className="text-[2rem] text-white" />
        </div>
      </div>
    ),
    nextArrow: (
      <div className="absolute top-[45%] right-[0] transform translate-x-[-50%] z-10 translate-y-[-50%]">
        <div className="w-[3.2rem] h-[3.2rem] rounded-full bg-black flex justify-center items-center opacity-60 hover:opacity-100 cursor-pointer">
          <IoIosArrowForward className="text-[2rem] text-white" />
        </div>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1600,
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const listProducts = useAppSelector((state) => state.product.listProducts);
  const dispatch = useAppDispatch();
  const [listProductHot, setListProductHot] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      await dispatch(getProductsThunk());
      // Mô phỏng thời gian tải 2 giây
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 2 giây
    };
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    if (listProducts?.length > 0) {
      const shuffledProducts = [...listProducts]
        .sort((a, b) => b.product_hot - a.product_hot)
        .slice(0, 10);
      setListProductHot(shuffledProducts);
    }
  }, [listProducts]);

  return (
    <div className="w-full my-10 xl:w-[100%] xmd:w-[100%] sm:w-[95%] mx-auto">
      <div className="bg-gradient-to-b from-[#fffccb] to-[#332600] pb-8 md:pb-12 lg:pb-16 px-3 sm:px-4 md:px-5 lg:px-6">
      {isLoading ? (
    // Hiển thị Skeleton cho tiêu đề
    <div className="text-center">
      <Skeleton.Input
        active
        className="w-[50%] sm:w-[70%] md:w-[80%] lg:w-[60%] mx-auto"
        style={{ height: "3rem" }} // Chỉnh chiều cao cho Skeleton ở đây
      />
    </div>
  ) : (
    // Hiển thị tiêu đề khi đã tải xong
    <h1 className="text-[5rem] sm:text-[3rem] md:text-[2rem] lg:text-[3rem] text-brown-300 font-medium p-4 sm:p-6 md:p-8 lg:p-[2.5rem] font-bold text-center">
      SẢN PHẨM NỔI BẬC
    </h1>
  )}
        {isLoading ? (
          // Hiển thị Skeleton khi đang tải
          <Slider className="mx-10" {...settings}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="p-2">
                  <Skeleton.Input
        active
        className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%] mx-auto"
        style={{ height: "40rem" }} // Chỉnh chiều cao cho Skeleton ở đây
      />
              </div>
            ))}
          </Slider>
        ) : (
          // Hiển thị sản phẩm khi đã tải xong
          <Slider className="mx-10" {...settings}>
            {listProductHot.map((item, index) => (
              <ProductItemHot key={index} product={item}></ProductItemHot>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default ProductSale;
