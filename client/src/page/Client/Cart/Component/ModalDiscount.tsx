import { message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { RiCoupon3Fill } from 'react-icons/ri';
import { applyUserDiscount, getDiscountAll } from '../../../../service/vourcher/voucher.service';
import { useAppDispatch } from '../../../../redux/hooks';
import { setDiscoutCart, setDiscoutId } from '../../../../redux/cart/voucher.slice';

function ModalDiscount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [getVoucher, setGetVoucher] = useState<any[]>([]);

  // Hiển thị modal
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  // Lấy dữ liệu mã giảm giá từ API
  useEffect(() => {
    const getApiVoucher = async () => {
      const response = await getDiscountAll();
      setGetVoucher(response.data.content);
    };
    getApiVoucher();
  }, []);

  const dispatch = useAppDispatch();

  // Áp dụng mã giảm giá
  const handleApplyDiscount = async (voucherCode: string, discountPercent: number, id: number) => {
    setDiscountCode(voucherCode);  // Lưu mã giảm giá
    setIsModalOpen(false);

    try {
      // Gọi API để áp dụng mã giảm giá
      const response = await applyUserDiscount({
        discountId: id
      });

      // Kiểm tra nếu thành công, cập nhật Redux và thông báo
      if (response.status === 200) {
        setDiscount(discountPercent);  // Cập nhật phần trăm giảm giá trong state nếu API thành công
        dispatch(setDiscoutId(id)); // Cập nhật ID mã giảm giá trong Redux
        dispatch(setDiscoutCart(+discountPercent)); // Cập nhật phần trăm giảm giá trong Redux

        message.success(`Mã giảm giá ${voucherCode} đã được áp dụng với ${discountPercent}%`);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      setDiscount(0);  // Đặt lại discount nếu có lỗi
      message.error('Áp dụng mã giảm giá thất bại. Vui lòng thử lại.');
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={showModal}
        className="
        
        justify-between flex items-center shadow-sm rounded-lg my-[1.2rem]
        
        px-5 py-2 sm:w-[100%] ssm:w-1/2 hover:shadow-md transition-shadow
        
        "
      >
        Chọn mã giảm giá
        <span className="text-customColor">
          <RiCoupon3Fill />
        </span>
      </button>

      <Modal
        title="Mã giảm giá"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {getVoucher.map((voucher, i) => (
          <div key={i} className="w-full px-4 mb-6">
            <div className="bg-white shadow-lg p-12 relative">
              <div className="absolute top-1 left-[-5px] flex flex-col space-y-1">
                {Array(5).fill().map((_, j) => (
                  <p key={`left-${i}-${j}`} className="bg-white border border-white rounded-full w-6 h-5"></p>
                ))}
              </div>

              <div className="absolute top-1 right-[-5px] flex flex-col space-y-1">
                {Array(5).fill().map((_, j) => (
                  <p key={`right-${i}-${j}`} className="bg-white border border-white rounded-full w-6 h-5"></p>
                ))}
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-2xl font-bold text-[var(--custom-color)]">VOUCHER</h3>
                  <div className="text-[var(--custom-color)] text-xl">{voucher.condition}</div>
                </div>
              </div>

              <div className="flex items-baseline text-4xl font-extrabold text-[var(--custom-color)]">
                <h1>Giảm {voucher.discount_percent}%</h1>
              </div>

              <div className="flex justify-between items-center mt-4 text-xl text-[var(--custom-color)] font-medium">
                <span>mã: {voucher.discount_name}</span>
                <button
                  className="border border-[var(--custom-color)] px-4 py-2 rounded-md hover:bg-[var(--custom-color)] hover:text-white"
                  onClick={() => handleApplyDiscount(voucher.discount_name, voucher.discount_percent, voucher.discount_id)}
                >
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        ))}
      </Modal>

      {/* Hiển thị phần trăm giảm giá nếu có */}
      {discount > 0 && (
        <div className="mt-4 text-xl font-bold text-[var(--custom-color)]">
          Mã giảm giá đã áp dụng: {discount}% Giảm giá
        </div>
      )}
    </>
  );
}

export default ModalDiscount;
