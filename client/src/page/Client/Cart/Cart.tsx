import { Container } from "../../../components/Style/Container";
import { FaTrash } from "react-icons/fa";
import { RiCoupon3Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  removeItemFromCart,
  removeAllCart,
  decreaseItemQuantity,
  inCreaseItemQuantity,
} from "../../../redux/cart/cart.slice";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVND, truncateText } from "../../../utils";
import { useEffect, useState } from "react";
import ModalDiscount from "./Component/ModalDiscount";
import { Modal, Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import LoadingCart from "./Component/Loading/LoadingCart";
import { IMG_BACKEND, timeLoading } from "../../../constants";

export default function Cart() {
  const dispatch = useAppDispatch();
  const listCart = useAppSelector((state) => state.cart.listCart);
  const totalItem = useAppSelector((state) => state.cart.totalItems);
  const getDiscount=useAppSelector(state=>state.vourher.discount);
  const getShip=useAppSelector(state=>state.cart.ship);
  


  const handleRemoveItem = (product_id: any) => {
    dispatch(removeItemFromCart({ product_id }));
  };
  const navigate = useNavigate();
  const decreaseItem = (product_id: any) => {
    dispatch(decreaseItemQuantity({ product_id }));
  };
  const inCreaseItem = (product_id: any) => {
    dispatch(inCreaseItemQuantity({ product_id }));
  };
  const removeAllItem = () => {
    dispatch(removeAllCart());
  };
  const handleDecrease = (productId: string, quantity: number) => {
    if (quantity > 1) {
      dispatch(decreaseItemQuantity({ product_id: productId })); // Decrease quantity if more than 1
    } else {
      // Show confirmation when quantity is 1
      Popconfirm.confirm({
        title: "Bạn có chắc muốn xóa sản phẩm này?",
        onConfirm: () => dispatch(removeItemFromCart({ product_id: productId })), // Remove item if confirmed
      });
    }
  };
  const showModal = () => {
    Modal.info({
      title: "Bạn có chắc muốn xóa tất cả sản phẩm?",
      content: (
        <div>
          <p>Bạn sẽ không thể phục hồi lại các sản phẩm đã xóa.</p>
        </div>
      ),
      onOk: removeAllItem,
      okText: "Có",
      cancelText: "Không",
      maskClosable: true,  // Close modal when clicking outside
    });
  };

    // Áp dụng mã giảm giá
  
    const totalPrice = listCart.reduce((total: number, item) => {
      // Tính giá sản phẩm ban đầu cộng thêm giá storage
      const basePriceWithStorage = item.product_price + Number(item?.selectedStorage?.storage_price || 0);
    
      // Tính giảm giá
      const discountAmount = (basePriceWithStorage * item.product_discount) / 100;
    
      // Giá sau khi giảm
      const priceAfterDiscount = basePriceWithStorage - discountAmount;
    
      // Tính tổng giá của sản phẩm (giá sau giảm x số lượng)
      const itemTotalPrice = item.quantity * priceAfterDiscount;
    
      // Cộng dồn vào tổng giá
      return total + itemTotalPrice;
    }, 0);
  const totalPriceWithVoucher = totalPrice * (1 - getDiscount / 100) + getShip;

  // 10000 - (10000 * 10 / 100); mã khuyết mãi
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), timeLoading)
  }, []);

  if (isLoading) {
    return <LoadingCart/>
  }

  return (
    <Container>
  <div className="py-6 text-[1.5rem]">
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="my-[1.5rem] text-[1.5rem] text-gray-600">
        <a href="/" className="text-customColor hover:underline">
          Trang chủ
        </a>
        <span className="mx-2">/</span>
        <span>Giỏ hàng</span>
      </div>

      {/* Responsive Container */}
      <div className="flex flex-col-reverse lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Cart Items */}
        <div className="flex-1 space-y-4 md:space-y-6">
          {/* Header */}
          <div className="bg-white py-3 md:py-5 rounded-lg shadow">
            <div className="flex  items-center px-3 md:px-5 py-3 md:py-5">
              <div className="w-[45%] md:w-[50%] lg:w-[45%]">
                <h2 className="text-[1.4rem] md:text-[1.7rem] font-semibold text-center">Sản phẩm</h2>
              </div>
              <div className="w-[25%] md:w-[25%] lg:w-[20%]">
                <h2 className="text-[1.4rem] md:text-[1.7rem] font-semibold text-center">Số lượng</h2>
              </div>
              <div className="w-[25%] md:w-[20%] lg:w-[25%]">
                <h2 className="text-[1.4rem] md:text-[1.7rem] font-semibold text-center">Tổng giá</h2>
              </div>
              <div className="w-[5%] md:w-[5%] lg:w-[10%]"></div>
            </div>
          </div>

          {/* Cart Items */}
          {listCart.map((item) => (
            <div key={item.product_id} className="bg-white py-3 md:py-5 rounded-lg shadow">
              <div className="flex items-center px-3 md:px-5 py-3 md:py-5">
                <div className="flex gap-2 md:gap-4 w-[45%] md:w-[50%] lg:w-[45%] items-center">
            <div className="w-[6rem] md:w-[8rem] ">
            <img
          src={`${IMG_BACKEND}/${item?.selectedColor?.image?.image_one}`}
                    alt="Product"
                    className="w-[100%] h-[100%] object-cover rounded-lg"
                  />
            </div>
                  <div className="flex-1 leading-10 min-w-0">
                    <h2 className="text-[1.3rem] md:text-[1.5rem]
                    
                    lg:text-[1.7rem] font-semibold line-clamp-2">
                        <Tooltip title={`${item?.product_name}`}>
                        <span className="xmd:block sm:hidden">
                      {truncateText(item?.product_name, 25)}
                      </span>  
                    <span className="xmd:hidden ">
                      {truncateText(item?.product_name, 10)}
                      </span>  
</Tooltip>
                    
                    </h2>
                    <p className="text-gray-500 text-[1.1rem] md:text-[1.3rem]">
                      {item?.selectedStorage ? `${item?.selectedStorage?.storage_price} MB/` : ""}
                      {item?.selectedColor ? `${item?.selectedColor?.color}` : ""}
                    </p>
                    <div className="flex flex-col leading-normal">
                      {item?.product_discount > 0 ? (
                        <span className="text-customColor text-[1.3rem] md:text-[1.6rem] font-medium">
                          {formatCurrencyVND(
                            (Number(item?.product_price) + Number(item?.selectedStorage?.storage_price || 0)) *
                            (1 - Number(item?.product_discount / 100))
                          )}
                          <span className="text-gray-400 line-through text-[1.2rem] md:text-[1.5rem] px-[0.5rem] md:px-[1rem] font-normal">
                            {formatCurrencyVND(item?.product_price + item?.selectedStorage?.storage_price || 0)}
                          </span>
                        </span>
                      ) : (
                        <span className="text-customColor text-[1.3rem] md:text-[1.6rem] font-medium">
                          {formatCurrencyVND(item?.product_price + item?.selectedStorage?.storage_price || 0)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center w-[25%] md:w-[25%] lg:w-[20%]">
  <Popconfirm
    title="Bạn có chắc muốn xóa sản phẩm này?"
    onConfirm={() => handleDecrease(item.product_id, item.quantity)}
    okText="Có"
    cancelText="Không"
  >
    <button
      onClick={() => handleDecrease(item.product_id, item.quantity)}
      className="px-[.65rem] py-2 border border-gray-300 rounded-lg text-[1.4rem] md:text-[1.4rem] lg:text-[1.4rem]"
      >
      -
    </button>
  </Popconfirm>

  <span className="mx-2 font-semibold text-[1.4rem] md:text-[1.4rem] lg:text-[1.4rem]">{item.quantity}</span>

  <button 
    onClick={() => inCreaseItem(item.product_id)} 
    className="px-2 py-2 border border-gray-300 rounded-lg text-[1.4rem] md:text-[1.4rem] lg:text-[1.4rem]">
    +
  </button>
</div>


                {/* Total Price */}
                <div className="w-[25%] md:w-[20%] lg:w-[25%] text-center">
                  <span className="
                  
                  text-customColor text-[1.2rem] md:text-[1.5rem] lg:text-[1.7rem] font-semibold">
                    {formatCurrencyVND(
                      (Number(item?.product_price) + Number(item?.selectedStorage?.storage_price || 0)) *
                      Number(item?.quantity) *
                      (1 - Number(item?.product_discount / 100))
                    )}
                  </span>
                </div>

                {/* Delete Button */}
                <div className=" md:w-[5%] lg:w-[10%] text-center    ">
        
 
    <Popconfirm
    title="Bạn có chắc muốn xóa sản phẩm này?"
    onConfirm={() => handleRemoveItem(item.product_id)}  // Call the remove function on confirmation
    okText="Có"
    cancelText="Không"
    className="cursor-pointer"
  >
      <FaTrash />
      </Popconfirm>


                </div>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button className="px-4 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl text-white bg-customColor font-medium hover:bg-yellow-500 hover:shadow-md hover:text-black transition duration-300 text-[1.3rem] md:text-[1.5rem]">
              Tiếp tục mua sắm
            </button>
            <button
              onClick={showModal}

              className="px-4 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl text-white bg-customColor font-medium hover:bg-red-500 hover:shadow-md hover:text-black transition duration-300 text-[1.3rem] md:text-[1.5rem]">
              Xóa tất cả
            </button>
          </div>
        </div>

{/* Order Summary */}
<div className="w-full lg:w-1/3 bg-white rounded-lg shadow-xl">
  <div className="space-y-3 md:space-y-4 p-4 md:px-7 leading-[3rem] md:leading-[3.7rem]">
    {/* Discount Modal */}
    <div className="flex justify-between items-center">
      <ModalDiscount />
      <span className="font-bold text-customColor"></span>
    </div>

    {/* Title */}
    <h2 className="text-[1.6rem] md:text-[2rem] font-semibold">Thông tin đơn hàng</h2>

    <div className="space-y-2 md:space-y-3">
      {/* Total Price */}
      <div className="flex justify-between mb-3 md:mb-5 font-semibold">
        <span className="text-[1.4rem] md:text-[1.6rem]">Tổng tiền</span>
        <span className="font-bold text-[1.6rem] md:text-[2rem]">
          {formatCurrencyVND(totalPrice)}
        </span>
      </div>

      {/* Total Items */}
      <div className="border-t pt-3 md:pt-5 flex justify-between">
        <span className="text-[1.4rem] md:text-[1.6rem]">Tổng số lượng</span>
        <span className="font-bold text-[1.4rem] md:text-[1.8rem]">{totalItem}</span>
      </div>

      {/* Applied Voucher */}
      <div className="flex justify-between">
        <span className="text-[1.4rem] md:text-[1.6rem]">Voucher đã áp dụng</span>
        <span className="font-bold text-[1.4rem] md:text-[1.8rem]">0</span>
      </div>

      {/* Discount */}
      <div className="flex justify-between">
        <span className="text-[1.4rem] md:text-[1.6rem]">Giảm giá</span>
        <span className="font-bold text-[1.4rem] md:text-[1.7rem] text-black-500">
          {getDiscount || 0} %
        </span>
      </div>

      {/* Shipping Fee */}
      <div className="flex justify-between pb-3 md:pb-5">
        <span className="text-[1.4rem] md:text-[1.6rem]">Phí vận chuyển </span>
        <span className="text-green-600 font-medium text-[1.4rem] md:text-[1.6rem]">
          {formatCurrencyVND(getShip)}
        </span>
      </div>

      {/* Total Payment */}
      <div className="border-t pt-3 md:pt-5 flex justify-between font-semibold">
        <span className="text-[1.5rem] md:text-[2rem]">Cần thanh toán</span>
        <span className="text-red-600 font-semibold text-[1.6rem] md:text-[2.2rem]">
          {formatCurrencyVND(totalPriceWithVoucher)}
        </span>
      </div>

      {/* Note */}
      <div className="flex justify-end items-center text-gray-500 text-[1.2rem] md:text-[1.4rem]">
        <span>Đã bao gồm khuyến mãi, phí vận chuyển và VAT</span>
      </div>
    </div>

    {/* Checkout Button */}
    <div className="pt-3 md:pt-4">
      <button
        onClick={() => {
          navigate("/thanh-toan");
        }}
        className="w-full bg-customColor text-white py-2 md:py-[0.4rem] text-[1.5rem] md:text-[1.7rem] rounded-xl md:rounded-[1.7rem] font-medium hover:bg-opacity-90 transition-all"
      >
        Thanh toán
      </button>
    </div>
  </div>
</div>

      </div>
    </div>
  </div>
</Container>
  );
}

