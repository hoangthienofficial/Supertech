import React, { useEffect, useState } from "react";
import image from '../../assets/new.png';
import oficie from '../../assets/oficie.png';
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { IoIosStar } from "react-icons/io";
import { FaHeart, FaTruck } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { Tooltip } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { useSpring,animated } from "react-spring";
import './product.css'
import TaskEyes from "../../template/Component/Header/Component/Menu/Modal/TaskEyes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createFavouriteProductThunk, getFavouriteProductThunk } from "../../redux/favourite/Favourite.slice";
import { IMG_BACKEND } from "../../constants";
import { formatCurrencyVND } from "../../utils";
import { addItemToCart } from "../../redux/cart/cart.slice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
function ProductItemHot(props) {
  const [isvisibleProduct, setisvisibleProduct] = useState(false);

  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.user.user);

  const totalStars = props?.product?.comment_products?.reduce((total: number, item: any) => {
    // Kiểm tra nếu item.comment_star là một số hợp lệ
    const rating = Number(item.comment_star);
    if (!isNaN(rating)) {
      total += rating;
    }
    return total;
  }, 0);
  const handleAddItem = (product: any) => {
    const productToCart = {
      ...product,
      selectedColor: props.product?.product_colors[0],
      selectedStorage: props.product?.product_colors[0]?.product_storages[0],
      selectedQuantity: props.product?.product_colors[0].product_qualities[0]?.quality_product
    };
    dispatch(addItemToCart(productToCart));

    toast.success('Thêm sản phẩm thành công')
  };
  // Số lượng đánh giá
  const totalComments = props?.product?.comment_products?.length || 0;
  
  // Tính trung bình, kiểm tra để tránh chia cho 0
  const averageStars = totalComments > 0 ? (totalStars / totalComments).toFixed(1) : "0.0";
  const [isFavourited, setIsFavourited] = useState(false); // Theo dõi trạng thái yêu thích của sản phẩm
  const listProductFavourites = useAppSelector((state) => state.listProductFavorites.listFavourite)

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
  return (


<div className="mx-5 relative px-3 py-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border overflow-hidden">
  <div className="absolute top-4 right-4 flex flex-col gap-3">
    {/* Icon yêu thích */}
    <div className="bg-black p-3 text-[1.5rem] rounded-full text-white cursor-pointer hover:bg-gray-800">
      <Tooltip title="Thêm yêu thích">
                  {
                    Array.isArray(listProductFavourites) && listProductFavourites.some(item => item?.user_id == user?.user_id && item.product_id === props.product.product_id)
                      ? <FaHeart onClick={() => handleFavouriteProduct(props.product.product_id)} />
                      : <CiHeart onClick={() => handleFavouriteProduct(props.product.product_id)} />
                  }
                </Tooltip>
    </div>
    {/* Icon xem sản phẩm */}
    <div className="bg-black p-2 rounded-full text-white cursor-pointer hover:bg-gray-800">
      <Tooltip title="Xem tóm tắt sản phẩm">
        <IoEyeOutline onClick={() => setisvisibleProduct(!isvisibleProduct)} className="text-3xl" />
      </Tooltip>
    </div>
  </div>

  {/* Giảm giá */}
  {props.product?.product_discount > 0 ?
        <div className="absolute top-4 left-4 bg-[#7500CF] px-3 py-2 rounded-full text-white text-[1.4rem] font-semibold">
          -{props.product?.product_discount}%
        </div>
        : null}

  {/* Hình ảnh và logo thương hiệu */}
  <div className="flex justify-center my-4">
    <img
      className="h-[200px] p-10  object-contain"
          src={`${IMG_BACKEND}/${props.product?.product_colors[0]?.image?.image_one}`}
      alt="Sản phẩm"
    />
  </div>

  {/* Thông tin sản phẩm */}
  <div className="px-4">
    {/* Badge khuyến mãi */}
            <NavLink to={`/san-pham-chi-tiet/${props.product.product_id}`}>
            <div className="flex items-center justify-start gap-2 mb-2">

<div className="bg-gradient-to-r from-[#DD720B] to-[#EC6D11] text-white rounded-full px-3 py-1 text-base font-medium flex items-center">
  <img src={oficie} alt="" className="w-5 h-5 mr-1" />
  <span>TẶNG PHỤ KIỆN</span>
</div>
</div>

<h3 className="text-[1.5rem] font-bold">{props.product.product_name}</h3>
<div className="flex items-center gap-2 my-2">
<PiCurrencyDollarSimpleFill className="text-gray-500 text-2xl" />
<span className="text-gray-600 text-base">Online giá rẻ quá</span>
</div>

{/* Giá */}
<div className="flex items-center gap-2 my-2 ">
<span className="bg-gray-100 text-[1.2rem] font-medium py-1 px-2 rounded">Trả góp 0%</span>
<span className="line-through text-gray-400 text-[1.3rem]">
    {props.product?.product_discount > 0 ?
                <span className="line-through text-gray-400 ">
                  {formatCurrencyVND(props?.product.product_price + Number(props.product?.product_colors[0]?.product_storages[0]?.storage_price || 0))}
                </span>
                : null}
</span>
</div>
<p className="text-red-600 font-semibold text-[1.7rem]">
      {formatCurrencyVND((Number(props?.product.product_price) + Number(props.product?.product_colors[0]?.product_storages[0]?.storage_price|| 0))* (1 - Number(props?.product.product_discount / 100) ))}
    </p>
{/* Đánh giá và tình trạng */}
<div className="flex justify-between items-center mt-2">
<div className="flex items-center gap-1 text-orange-500 ">
  <span className="font-semibold text-[1.4rem]">{averageStars}</span>
  <IoIosStar className="text-lg" />
  <span className="text-gray-400 text-[1.4rem]">({props?.product?.comment_products?.length})</span>
  </div>
{props.product?.product_colors[0].product_qualities[0]?.quality_product > 10 ? (

<div className="flex text-[1.2rem] items-center text-green-600 font-semibold gap-1">
<FaTruck />
<span>Còn hàng</span>
</div>
           ) : (
             <div className="flex text-[1.2rem] items-center text-yellow-500 font-semibold gap-1">
             <FaTruck />
             <span>Sắp hết hàng</span>
           </div>
           )}
</div>

{/* Nút thêm giỏ hàng */}

    </NavLink>
    <button
className="w-full mt-4 h-12 border border-[#7500CF] text-[#7500CF] text-[1.5rem] font-semibold rounded-md hover:bg-[#7500CF] hover:text-white transition-all"
onClick={() => { handleAddItem(props.product) }}

>
Thêm giỏ hàng
</button>
  </div>

  
</div>


  );
}

export default ProductItemHot;
