import React from "react";
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { IoIosStar } from "react-icons/io";
import { FaTruck } from "react-icons/fa";
import { Tooltip } from "antd";
import './laptop.css';

function LaptopItem(props: any) {
  return (
    <div className="relative mx-5 p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border overflow-hidden">
      {/* Giảm giá */}
      {props.product?.product_discount > 0 && (
        <div className="absolute top-4 left-4 bg-[var(--custom-color)] px-3 py-1 rounded-full text-white text-lg font-semibold">
          -{props.product.product_discount}%
        </div>
      )}

      {/* Hình ảnh sản phẩm */}
      <div className="flex justify-center my-4">
        <img
          className="w-full p-10 object-contain"
          src={props.product?.image}
          alt={props.product.product_name}
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="px-4">
        <div className="flex items-center justify-start gap-2 mb-2">
          <div className="bg-gradient-to-r from-[#DD720B] to-[#EC6D11] text-white rounded-full px-3 py-1 text-base font-medium flex items-center">
            <span>Tặng phụ kiện</span>
          </div>
        </div>

        <h3 className="text-xl font-bold">{props.product.product_name}</h3>
        <div className="flex items-center gap-2 my-2">
          <PiCurrencyDollarSimpleFill className="text-gray-500 text-2xl" />
          <span className="text-gray-600 text-base">Online giá rẻ quá</span>
        </div>

        {/* Giá */}
        <div className="flex items-center gap-2 my-2">
          <span className="bg-gray-100 text-sm font-medium py-1 px-2 rounded">Trả góp 0%</span>
          <span className="line-through text-gray-400 text-lg">
            {props.product.original_price}đ
          </span>
        </div>
        <p className="text-red-600 font-semibold text-xl">
          {props.product.discounted_price}đ
        </p>

        {/* Đánh giá và tình trạng */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1 text-orange-500">
            <span className="font-semibold text-lg">{props.product.rating}</span>
            <IoIosStar className="text-lg" />
            <span className="text-gray-400 text-base">({props.product.review_count})</span>
          </div>
          <div className="flex items-center text-green-600 font-semibold text-lg gap-1">
            <FaTruck />
            <span>{props.product.stock_status}</span>
          </div>
        </div>

        {/* Nút thêm giỏ hàng */}
        <button
          className="w-full mt-4 h-12 border border-[var(--custom-color)] text-[var(--custom-color)] text-lg font-semibold rounded-md hover:bg-[var(--custom-color)] hover:text-white transition-all"
        >
          Thêm giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default LaptopItem; 