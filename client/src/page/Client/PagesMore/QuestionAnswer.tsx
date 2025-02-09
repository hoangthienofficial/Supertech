import React, { useState } from "react";
import { MdHome, MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

function QuestionAnswer() {
  const [open, setOpen] = useState(null);

  const toggleOpen = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div>
      {/* Breadcrumb (Dùng cho tất cả các kích thước màn hình) */}
      <div className="w-[80%] m-auto flex py">
        <span className="text-[10px] lg:text-[19px] text-[#A0A0A0] flex items-center gap-2">
          <MdHome /> Trang chủ/
        </span>
        <span className="text-[10px] lg:text-[19px] text-[#7500CF]">Chăm sóc khách hàng</span>
      </div>

      {/* Layout cho Desktop */}
      <div className="w-[80%] m-auto grid grid-cols-[30%_1fr] p-10 hidden lg:grid">
        <div>
          <div className="grid text-[16px] font-medium gap-5">
            <span className="text-[#FFFF] bg-[#7500CF] w-[296px] h-[50px] p-6 rounded-[md] shadow-[0_3px_10px_rgba(255,255,255,0.1)]">
              Hướng dẫn mua hàng Online
            </span>
            <span className="border p-4 rounded-[md] w-[296px] h-[50px] shadow-[0_3px_10px_rgba(255,255,255,0.1)]">
              Chính sách thanh toán
            </span>
            <span className="border p-4 rounded-[md] w-[296px] h-[50px] shadow-[0_3px_10px_rgba(255,255,255,0.1)]">
              Chính sách giao hàng
            </span>
          </div>
        </div>

        <div className="grid gap-8">
          <span className=" text-[32px] font-medium text-[#7500CF]">
            {" "}
            Khi gặp vấn đề vấn đề thắc mắc,khiếu nại Shop liên hệ ở đâu
          </span>
          <div className="text-[16px] grid gap-5 font-light ">
            <span className="text-[#7500CF] font-medium">Cách 1: Hotline</span>
            <span className="">
              Gọi điện đến Hotline{" "}
              <span className="text-[#7500CF]">0313728397</span> từ 8h đến 20h
              tất cả các ngày trong tuần. Nhân viên bán hàng sẽ ghi nhận thông
              tin đặt hàng của bạn
            </span>
            <span className="text-[#7500CF] font-medium py-[10px]">
              Cách 2: Mạng xã hội
            </span>
            <span className="px-[20px]">
              Truy cập vào trang Facebook hoặc Instagram chính thức của Shop
              Chọn mục “Nhắn tin” để được nhân viên trực chat tư vấn về các loại
              sản phẩm và nhận đơn đặt hàng
            </span>
            <span className="text-[#7500CF] font-medium py-[10px]">
              Cách 3: Website:
            </span>
            <span className="px-[20px]">
              Truy cập vào website Tìm kiếm sản phẩm:
            </span>
            <span className="px-[20px]">
              + Nhập loại sản phẩm bạn mong muốn vào ô tìm kiếm, bạn sẽ có kết
              quả ngay sau khi hoàn thành.
            </span>
            <span className="px-[20px]">
              + Click vào từng danh mục sản phẩm để tìm kiếm
            </span>
            <span className="px-[20px] text-2xl">
              Với mỗi sản phẩm ưng ý, bạn bấm nút{" "}
              <span className="font-medium">CHỌN MUA</span>, sản phẩm sẽ tự động
              được thêm vào <span className="font-medium">GIỎ HÀNG</span>
              Tại giỏ hàng, bạn có thể bấm nút “Xoá” nếu muốn huỷ sản phẩm đã
              chọn để mua sản phẩm khác Sau khi đã chọn được các loại trái cây
              cần mua, bấm vào <span className="font-medium">THANH TOÁN</span>,
              và điền đầy đủ, chính xác thông tin cá nhân trong bảng thông tin
              Chọn hình thức thanh toán
            </span>
            <span className="px-[20px]"> + Thanh toán khi nhận hàng</span>
            <span className="px-[20px]">
              + Thanh toán qua cổng Napas bằng thẻ ATM nội địa
            </span>
            <span className="px-[20px]"> + Thanh toán qua Momo</span>
            <span className="px-[20px]">
              {" "}
              Sau khi điền đầy đủ thông tin và kiểm tra đơn hàng, giá tiền, bạn
              bấm vào nút{" "}
              <span className=" font-medium">HOÀN TẤT ĐƠN HÀNG</span>{" "}
            </span>
          </div>
        </div>
      </div>

      {/* Layout cho Mobile */}
      <div className="lg:hidden w-[80%] m-auto space-y-6">
        {/* FAQ Item 1 */}
        <div
          className={`p-6 bg-white shadow-[0_3px_10px_rgba(255,255,255,0.1)] rounded-lg border cursor-pointer flex justify-between items-center ${open !== 1 ? "overflow-hidden" : ""}`}
          onClick={() => toggleOpen(1)}
        >
          <div>
            <p className="text-lg font-semibold text-[#7500CF] text-[24px]">Hướng dẫn mua hàng Online</p>
            {open === 1 && (
              <p className="mt-3 text-base text-gray-600 leading-relaxed">
                Gọi điện đến Hotline <span className="text-[#7500CF]">0313728397</span> từ 8h đến 20h tất cả các ngày trong tuần. Nhân viên bán hàng sẽ ghi nhận thông tin đặt hàng của bạn.
              </p>
            )}
          </div>
          <span className="text-[#7500CF] text-2xl">
            {open === 1 ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </span>
        </div>

        {/* FAQ Item 2 */}
        <div
          className={`p-6 bg-white shadow-[0_3px_10px_rgba(255,255,255,0.1)] rounded-lg border cursor-pointer flex justify-between items-center ${open !== 2 ? "overflow-hidden" : ""}`}
          onClick={() => toggleOpen(2)}
        >
          <div>
            <p className="text-lg font-semibold text-[24px]">Chính sách mua hàng</p>
            {open === 2 && (
              <p className="mt-3 text-base text-gray-600 leading-relaxed">
                Truy cập vào trang Facebook hoặc Instagram chính thức của Shop và nhắn tin để được hỗ trợ đặt hàng.
              </p>
            )}
          </div>
          <span className="text-[#7500CF] text-2xl">
            {open === 2 ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </span>
        </div>

        {/* FAQ Item 3 */}
        <div
          className={`p-6 bg-white shadow-[0_3px_10px_rgba(255,255,255,0.1)] rounded-lg border cursor-pointer flex justify-between items-center ${open !== 3 ? "overflow-hidden" : ""}`}
          onClick={() => toggleOpen(3)}
        >
          <div>
            <p className="text-lg font-semibold">Hướng dẫn sử dụng</p>
            {open === 3 && (
              <div className="mt-3 text-base text-gray-600 leading-relaxed space-y-2">
                <p>Truy cập vào website, tìm kiếm sản phẩm, thêm vào giỏ hàng và thanh toán.</p>
                <p>Các hình thức thanh toán:</p>
                <ul className="list-disc ml-6">
                  <li>Thanh toán khi nhận hàng</li>
                  <li>Thanh toán qua Napas</li>
                  <li>Thanh toán qua Momo</li>
                </ul>
              </div>
            )}
          </div>
          <span className="text-[#7500CF] text-2xl">
            {open === 3 ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuestionAnswer;