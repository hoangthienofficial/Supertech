import React, { useState } from "react";
import { MdHome, MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

function CustomerCare() {
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
            <span className="text-[#FFFF] bg-[#7500CF] w-[296px] h-[50px] p-6 rounded-[md]">
              Hướng dẫn mua hàng Online
            </span>
            <span className="border p-4 rounded-[md] w-[296px] h-[50px]">
              Chính sách thanh toán
            </span>
            <span className="border p-4 rounded-[md] w-[296px] h-[50px]">
              Chính sách giao hàng
            </span>
          </div>
        </div>
        <div className="grid gap-8 ">
          <span className="text-[32px] font-medium text-[#7500CF]">
            Hướng dẫn mua hàng Online
          </span>
          <span className="text-[#7500CF] text-[16px] font-medium">Cách 1: Hotline</span>
          <span className="text-[16px] font-light">
            Gọi điện đến Hotline <span className="text-[#7500CF]">0313728397</span> từ 8h đến 20h
            tất cả các ngày trong tuần. Nhân viên bán hàng sẽ ghi nhận thông tin đặt hàng của bạn.
          </span>
          <span className="text-[#7500CF] text-[16px] font-medium">Cách 2: Mạng xã hội</span>
          <span className="text-[16px] font-light">
            Truy cập vào trang Facebook hoặc Instagram chính thức của Shop. Chọn mục “Nhắn tin” để
            được nhân viên trực chat tư vấn về các loại sản phẩm và nhận đơn đặt hàng.
          </span>
          <span className="text-[#7500CF] text-[16px] font-medium">Cách 3: Website</span>
          <div className="text-[16px] font-light space-y-2">
            <span>Truy cập vào website</span>
            <span>Tìm kiếm sản phẩm:</span>
            <p className="px-[20px]">
              + Nhập loại sản phẩm bạn mong muốn vào ô tìm kiếm, bạn sẽ có kết quả ngay sau khi
              hoàn thành.
            </p>
            <p>+ Click vào từng danh mục sản phẩm để tìm kiếm</p>
            <p className="px-[20px] text-2xl">
              Với mỗi sản phẩm ưng ý, bạn bấm nút <span className="font-medium">CHỌN MUA</span>,
              sản phẩm sẽ tự động được thêm vào <span className="font-medium">GIỎ HÀNG</span>.
              Tại giỏ hàng, bạn có thể bấm nút “Xoá” nếu muốn huỷ sản phẩm đã chọn. Sau khi đã chọn
              được các loại trái cây cần mua, bấm vào <span className="font-medium">THANH TOÁN</span>,
              và điền đầy đủ, chính xác thông tin cá nhân. Chọn hình thức thanh toán.
            </p>
            <p className="py-[10px]">+ Thanh toán khi nhận hàng</p>
            <p>+ Thanh toán qua cổng Napas bằng thẻ ATM nội địa</p>
            <p>+ Thanh toán qua Momo</p>
            <p className="px-[20px] py-[10px] text-2xl">
              Sau khi điền đầy đủ thông tin và kiểm tra đơn hàng, giá tiền, bạn bấm vào nút{" "}
              <span className="font-medium">HOÀN TẤT ĐƠN HÀNG</span>. Shop sẽ gửi cho bạn email hoặc
              gọi điện xác nhận đơn hàng.
            </p>
          </div>
        </div>
      </div>

      {/* Layout cho Mobile */}
      <div className="lg:hidden w-[80%] m-auto space-y-6">
        {/* FAQ Item 1 */}
        <div
          className={`p-6 bg-white shadow-lg rounded-lg border cursor-pointer flex justify-between items-center ${open !== 1 ? "overflow-hidden" : ""}`}
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
          className={`p-6 bg-white shadow-lg rounded-lg border cursor-pointer flex justify-between items-center ${open !== 2 ? "overflow-hidden" : ""}`}
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
          className={`p-6 bg-white shadow-lg rounded-lg border cursor-pointer flex justify-between items-center ${open !== 3 ? "overflow-hidden" : ""}`}
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

export default CustomerCare;