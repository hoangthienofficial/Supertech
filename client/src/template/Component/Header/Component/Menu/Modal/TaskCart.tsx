import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiMinus } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { decreaseItemQuantity, inCreaseItemQuantity, removeItemFromCart } from '../../../../../../redux/cart/cart.slice';
import { formatCurrencyVND, truncateText } from '../../../../../../utils';
import img from '../../../../../../assets/pngwing.com 1.png';
import toast from 'react-hot-toast';
import { Paths } from '../../../../../../router/component/RouterValues';
import { IMG_BACKEND } from '../../../../../../constants';

interface TaskCart {
  onClose: () => void;
}

function TaskCart({ onClose }: TaskCart) {
  const dispatch = useAppDispatch();
  const listCart = useAppSelector((state) => state.cart.listCart);
  const totalItem = useAppSelector((state) => state.cart.totalItems);

  const handleRemoveItem = (product_id: any) => {
    dispatch(removeItemFromCart({ product_id }));
    toast.success('Xóa sản phẩm thành công!');
  };

  const decreaseItem = (product_id: any) => {
    dispatch(decreaseItemQuantity({ product_id }));
  };

  const inCreaseItem = (product_id: any) => {
    dispatch(inCreaseItemQuantity({ product_id }));
  };

  const totalPrice = listCart.reduce((total: number, item) => {
    const basePriceWithStorage = item.product_price + Number(item?.selectedStorage?.storage_price || 0);
    const discountAmount = (basePriceWithStorage * item.product_discount) / 100;
    const priceAfterDiscount = basePriceWithStorage - discountAmount;
    return total + item.quantity * priceAfterDiscount;
  }, 0);

  const navigate = useNavigate();

  // Hàm ngăn chặn sự kiện đóng khi nhấp vào nội dung bên trong TaskCart
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className='w-[350px] h-[100vh] bg-[#E5E5E5] absolute top-0 right-0'         onClick={stopPropagation} // Ngăn chặn sự kiện click lan ra ngoài

>
      <div className='w-[100%] py-[2rem] px-[1rem] flex justify-between items-center'>
        <div className='text-[1.8rem] font-semibold'>
          GIỎ HÀNG
        </div>
        <div className='text-[2rem] ' onClick={onClose}>
          <IoMdClose />
        </div>
      </div>
      {listCart.length > 0 ? (
        <div>
          <div className='bg-[white] px-2 py-[1rem]'>
            {listCart.map((item) => (
              <div key={item.product_id} className='flex gap-[1rem] py-[1rem] px-4 border border-[#cecdcd] rounded-[20px]'>
                <div className='w-[90px] m-auto'>
                  <img
                    className='w-[100%]'
          src={`${IMG_BACKEND}/${item?.selectedColor?.image?.image_one}`}
                    alt=""
                  />
                </div>
                <div className='w-[65%]'>
                  <h3 className='text-[1.6rem] font-semibold'>
                    {truncateText(item?.product_name, 20)}
                  </h3>
                  <p className='text-[1.5rem] mt-[.5rem]'>
                    {item?.selectedStorage != undefined ? `${item?.selectedStorage?.storage} GB/` : ''}
                    {item?.selectedColor != undefined ? `${item?.selectedColor?.color}` : ''}
                  </p>
                  <div className='py-[.5rem]'>
                    {item?.product_discount > 0 ? (
                      <span className="text-customColor text-[1.6rem] font-medium">
                        {formatCurrencyVND(
                          (Number(item?.product_price) + Number(item?.selectedStorage?.storage_price || 0)) *
                            (1 - Number(item?.product_discount / 100))
                        )}
                        <span className="text-gray-400 line-through text-[1.5rem] px-[1rem] font-normal">
                          {formatCurrencyVND(item?.product_price + item?.selectedStorage?.storage_price || 0)}
                        </span>
                      </span>
                    ) : (
                      <span className="text-customColor text-[1.6rem] font-medium">
                        {formatCurrencyVND(item?.product_price + item?.selectedStorage?.storage_price || 0)}
                      </span>
                    )}
                  </div>
                  <div className='text-[1.6rem] border border-[var(--custom-color)] flex items-center w-[40%] justify-between rounded-lg shadow-md p-2 bg-white'>
                    <div
                      className='border text-[1.7rem]  hover:bg-[var(--custom-color)] hover:text-white transition duration-200 ease-in-out'
                      onClick={() => decreaseItem(item.product_id)}
                    >
                      <FiMinus />
                    </div>
                    <div className='text-center font-semibold'>{item.quantity}</div>
                    <div
                      className='border text-[1.7rem]  hover:bg-[var(--custom-color)] hover:text-white transition duration-200 ease-in-out'
                      onClick={() => inCreaseItem(item.product_id)}
                    >
                      <GoPlus />
                    </div>
                  </div>
                </div>
                <div className='text-[2rem]  text-[var(--custom-color)]' onClick={() => handleRemoveItem(item.product_id)}>
                  <FaTrash />
                </div>
              </div>
            ))}
            <div className='flex justify-end pt-6'>
              <h4 className='text-[1.5rem] font-semibold'>Tổng đơn: <span>{formatCurrencyVND(totalPrice)}</span></h4>
            </div>
          </div>
          <div className='w-[100%] bg-[var(--custom-color)] py-[1rem] px-[1rem]  rounded-[20px]'>
            <div className='text-[1.5rem] text-white text-center' onClick={() => navigate(`${Paths.Cart}`)}>
              Xem Giỏ Hàng
            </div>
          </div>
        </div>
      ) : (
        <div className='text-[1.5rem] flex justify-center flex-col items-center'>
          <img src={img} alt="" className='w-[20rem]' />
          <div className='text-[1.7rem] py-5'>Chưa có sản phẩm trong giỏ hàng</div>
          <button className='w-[10rem] h-[3.5rem] bg-customColor text-white'>Quay lại</button>
        </div>
      )}
    </div>
  );
}

export default TaskCart;
