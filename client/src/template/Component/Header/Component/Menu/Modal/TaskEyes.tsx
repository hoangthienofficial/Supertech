import { Tooltip } from "antd";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { IoStar } from "react-icons/io5";
interface TaskCart {
  onClose: () => void;
}
function TaskEyes({ onClose }: TaskCart) {
  return (
    <div className="w-[100%] h-[100vh] bg-[rgb(0,0,0,0.5)] z-30 top-0 left-0">
      <div className="w-[320px] h-[100vh] bg-[white] absolute top-0 right-0 px-[1.5rem] py-[3rem]">
        <div className="relative">
          <div>
            <img
              src="https://cdn.tgdd.vn/Products/Images/42/303825/iphone-15-plus-512gb-xanh-thumb-600x600.jpg"
              alt=""
            />
          </div>
          <div>
            <h3 className="text-[2rem] font-bold py-[1rem]">
              MacBook Air 13 inch M2 10GPU
            </h3>

            <div className="border border-b-[gray] py-[1rem]">
              <div className="text-[#FC6E2E] text-[1.6rem] font-bold flex gap-[.5rem] items-center">
                <span className="">4.7</span>
                <div className="flex gap-[.1rem]">
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                </div>

                <span className="text-[#2277C6] font-medium">17 đánh giá</span>
                <div className="bg-[#F1F1F1] py-[.5rem] px-[1rem] text-black">
                  <span className="text-[1.2rem] font-medium">Trả góp 0%</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[1.9rem] text-[#DB363B] font-semibold my-5">
                30.000.000đ
                <span
                  className="text-[1.6rem] text-gray-500 ml-2"
                  style={{ textDecoration: "line-through" }}
                >
                  31.990.000đ
                </span>
              </p>
              <div className="text-[1.6rem]">
                <h4 className="text-[1.8rem] font-semibold mb-[1rem]">
                  Cấu hình sản phẩm
                </h4>
                <div className="mt-[.5rem]">Màn hình rộng: 18 inch</div>

                <div className="mt-[.5rem]">Màn hình rộng: 18 inch</div>
                <div className="mt-[.5rem]">Màn hình rộng: 18 inch</div>
              </div>
              <div className="text-[1.6rem] my-[1rem]">
                <h4 className="text-[1.8rem] font-semibold mb-[1rem]">
                  Mô tả sản phẩm
                </h4>
                <p>
                  Sau nhiều thế hệ điện thoại của Apple thì cái tên “Plus” cũng
                  đã chính thức trở lại vào....
                </p>
                <div className="text-[1.5rem] text-[#7500CF] mt-[.5rem]">
                  <span>Xem chi tiết</span>
                </div>
              </div>

              <div className="flex gap-[.5rem] justify-between">
                <div className="text-[1.6rem] border border-[#7500CF] flex px-3 items-center justify-between">
                  <div className="text-[1.7rem] cursor-pointer">
                    <FiMinus />
                  </div>
                  <div className="px-[1rem]">1</div>
                  <div className=" text-[1.7rem] cursor-pointer">
                    <GoPlus />
                  </div>
                </div>
                <div className="bg-[#7500CF] p-[1rem] px-[2.5rem]">
                  <button className="text-white text-[1.5rem]">
                    Thêm giỏ hàng
                  </button>
                </div>

                <div className="text-[2.4rem] cursor-pointer text-[#7500CF] border border-[#7500CF] px-[1rem] flex items-center justify-center ">
                  <Tooltip title="Thêm yêu thích">
                    <CiHeart className="font-semibold" />
                  </Tooltip>
                </div>
              </div>
              <div className="w-[100%] cursor-pointer text-[1.5rem] text-[#7500CF] font-semibold py-4 border border-[#7500CF] mt-[1rem] text-center
              transition-all
              hover:bg-[#7500CF] hover:text-white hover:font-medium
              
              ">
                       Mua Ngay 
              </div>
            </div>
          </div>
          <div  onClick={onClose} className="text-[2rem] absolute top-[-2rem] left-[-1rem] cursor-pointer">
        <IoMdClose />
      </div>
        </div>
 
      </div>
   
    </div>
  );
}

export default TaskEyes;
