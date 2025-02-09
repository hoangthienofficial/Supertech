import React, { useEffect, useState } from "react";

import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { IoIosStar } from "react-icons/io";
import { FaHeart, FaTruck } from "react-icons/fa";

import './product.css';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addItemToCart } from "../../redux/cart/cart.slice";

import { formatCurrencyVND, truncateText } from "../../utils";
import toast from "react-hot-toast";
// import { checkFavouriteProducts, createFavouriteProduct, getFavouriteProducts } from "../../service/product/favourite.service";

import { IMG_BACKEND } from "../../constants";
import { NavLink } from "react-router-dom";
import { Tooltip } from "antd";
import { CiHeart } from "react-icons/ci";
import { createFavouriteProductThunk, getFavouriteProductThunk } from "../../redux/favourite/Favourite.slice";
function ProductItem(props: any) {
  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.user.user);
  const token: any = useAppSelector(state => state.user.token);
  const [isFavourited, setIsFavourited] = useState(false); // Theo dõi trạng thái yêu thích của sản phẩm
  const listProductFavourites = useAppSelector((state) => state.listProductFavorites.listFavourite)

  console.log("sssssss", props?.product.product_price, props.product?.product_colors[0]?.product_storages[0]?.storage_price, props?.product.product_discount)

  // Kiểm tra nếu sản phẩm đã yêu thích khi load trang
  const totalStars = props?.product?.comment_products?.reduce((total: number, item: any) => {
    // Kiểm tra nếu item.comment_star là một số hợp lệ
    const rating = Number(item.comment_star);
    if (!isNaN(rating)) {
      total += rating;
    }
    return total;
  }, 0);

  // Số lượng đánh giá
  const totalComments = props?.product?.comment_products?.length || 0;

  // Tính trung bình, kiểm tra để tránh chia cho 0
  const averageStars = totalComments > 0 ? (totalStars / totalComments).toFixed(1) : "0.0";
   useEffect(() => {
      dispatch(getFavouriteProductThunk());
    }, [dispatch]);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddItem = (product: any) => {
    const productToCart = {
      ...product,
      selectedColor: props.product?.product_colors[0],
      selectedStorage: props.product?.product_colors[0]?.product_storages[0],
      selectedQuantity: props.product?.product_colors[0]?.product_qualities[0]?.quality_product
    };
    dispatch(addItemToCart(productToCart));

    toast.success('Thêm sản phẩm thành công')
  };


  // console.log(props.product?.product_colors[0].product_qualities[0]?.quality_product);

  const handleFavouriteProduct = async (id: number) => {
    try {
      const product = { product_id: id };

      if (isFavourited) {
        // Nếu sản phẩm đã được yêu thích, hủy yêu thích
        await dispatch(createFavouriteProductThunk(product))
      
        setIsFavourited(false); // Cập nhật trạng thái yêu thích
        // toast.success('Đã bỏ yêu thích sản phẩm!');
      
      } else {
        // Nếu sản phẩm chưa yêu thích, thêm vào yêu thích
        await dispatch(createFavouriteProductThunk(product))

        setIsFavourited(true); // Cập nhật trạng thái yêu thích
        // toast.success('Đã thêm vào yêu thích!');
      }


    } catch (error) {
      toast.error('Có lỗi xảy ra khi thực hiện thao tác yêu thích!');
    }
    
  };
  // console.log(props);

  return (
    <div className="relative py-5 px-2 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
      <div className="absolute top-4 right-4 flex flex-col gap-3">
        {/* Icon yêu thích */}
        <div className="bg-black p-2 text-[1.5rem] rounded-full text-white cursor-pointer hover:bg-gray-800">
          <Tooltip title="Thêm yêu thích">
            {
              Array.isArray(listProductFavourites) && listProductFavourites.some(item => item?.user_id == user?.user_id && item.product_id === props.product.product_id)
                ? <FaHeart onClick={() => handleFavouriteProduct(props.product.product_id)} />
                : <CiHeart onClick={() => handleFavouriteProduct(props.product.product_id)} />
            }
          </Tooltip>
        </div>
      </div>

      {/* Giảm giá */}
      {props.product?.product_discount > 0 ?
        <div className="absolute top-4 left-4 bg-[var(--custom-color)] px-3 py-2 rounded-full text-white text-[1.4rem] font-semibold">
          -{props.product?.product_discount}%
        </div>
        : null}

      {/* Hình ảnh sản phẩm */}
      <NavLink to={`/san-pham-chi-tiet/${props.product.product_id}`} className="flex justify-center my-4">
        <img
          className="w-[300px] h-[200px] p-10 object-contain"
          src={`${IMG_BACKEND}/${props.product?.product_colors[0]?.image?.image_one}`}
          alt="Sản phẩm 1"
        />
      </NavLink>



      {/* Thông tin sản phẩm */}
      <div className="px-4 flex flex-col justify-between h-full">
        <NavLink to={`/san-pham-chi-tiet/${props.product.product_id}`}>
          <div className="flex items-center justify-start gap-2 mb-2">
            <div className="bg-gradient-to-r from-[#DD720B] to-[#EC6D11] text-white rounded-full px-3 py-1 text-lg font-medium flex items-center">
              <span>Tặng phụ kiện</span>
            </div>
          </div>

          <h3 className="text-[1.7rem] font-bold text-ellipsis overflow-hidden sm: hidden lg:block">{props.product.product_name}</h3>
          <h3 className="text-[1.7rem] font-bold text-ellipsis overflow-hidden lg:hidden">{
            truncateText(props.product.product_name, 20)
          }</h3>

          <div className="flex items-center gap-2 my-2">
            <PiCurrencyDollarSimpleFill className="text-gray-500 text-2xl" />
            <span className="text-gray-600 text-[1.2rem]">Online giá rẻ quá</span>
          </div>

          {/* Giá */}
          <div className="flex items-center gap-2 my-2 text-[1.4rem]">
            <span className="bg-gray-100 text-sm font-medium py-1 px-2 rounded">Trả góp 0%</span>
            {props.product?.product_discount > 0 ?
              <span className="line-through text-gray-400 ">

                {/* 10.000 + 5.000 => 15.000 */}
                {formatCurrencyVND(props?.product.product_price + Number(props.product?.product_colors[0]?.product_storages[0]?.storage_price || 0))}
              </span>
              : null}
          </div>
          <p className="text-red-600 font-semibold text-[1.7rem]">
            {formatCurrencyVND((Number(props?.product.product_price) + Number(props.product?.product_colors[0]?.product_storages[0]?.storage_price || 0)) * (1 - Number(props?.product.product_discount / 100)))}
          </p>
          {/* formatCurrencyVND(productDetail?.product_price + Number(objectStorage?.storage_price ||0)) */}
          {/* Đánh giá và tình trạng */}
          <div className="flex justify-between items-center mt-2 text-[1.4rem]">
            <div className="flex items-center gap-1 text-orange-500">
              <span className="font-semibold">{
                averageStars}</span>
              <IoIosStar className="text-xl" />
              <span className="text-gray-400">
                ({props?.product?.comment_products?.length})
                </span>
            </div>
            {props.product?.product_colors[0]?.product_qualities[0]?.quality_product > 10 ? (

              <div className="flex items-center text-green-600 font-semibold gap-1">
                <FaTruck />
                <span>Còn hàng</span>
              </div>
            ) : (
              <div className="flex items-center text-yellow-500 font-semibold gap-1">
                <FaTruck />
                <span>Sắp hết hàng</span>
              </div>
            )}

          </div>
        </NavLink>

        {/* Nút thêm giỏ hàng */}
        <button
          className="w-full mt-4 py-3 border border-[var(--custom-color)] text-[var(--custom-color)] text-[1.6rem] font-semibold rounded-md hover:bg-[#7500CF] hover:text-white transition-all"
          onClick={() => { handleAddItem(props.product) }}
        >
          Thêm giỏ hàng
        </button>
      </div>

      {/* Popup khi xem tóm tắt sản phẩm */}

    </div>
  );
}

export default ProductItem;
