import React, { useState, useEffect } from 'react';
import { Skeleton } from 'antd'; // Import Skeleton từ Ant Design
import { FaGift, FaMoneyBill } from 'react-icons/fa';
import { FaHeadphonesSimple, FaTruckFast } from 'react-icons/fa6';

function Dis() {
  const [loading, setLoading] = useState(true);

  // Giả lập việc tải dữ liệu trong 2 giây
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Thay đổi trạng thái loading sau 2 giây
    }, 2000);
  }, []);

  return (
    <div className='max-w-screen-xl m-auto py-8 px-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {/* Card 1 */}
        <div className='flex flex-col items-center justify-center text-center p-4'>
          {loading ? (
            <Skeleton.Input active size="large" className="w-[3.5rem] h-[3.5rem] mb-4" />
          ) : (
            <FaTruckFast className='text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] text-[var(--custom-color)]' />
          )}
          {loading ? (
            <Skeleton paragraph={{ rows: 2 }} active />
          ) : (
            <>
              <h3 className='text-[1.2rem] sm:text-[1.5rem] lg:text-[1.8rem] font-semibold mt-4'>
                Giao hàng nhanh chóng
              </h3>
              <p className='text-[1rem] sm:text-[1.2rem] lg:text-[1.4rem] mt-2'>
                Giao hàng nhanh chóng trong vòng 24 giờ
              </p>
            </>
          )}
        </div>

        {/* Card 2 */}
        <div className='flex flex-col items-center justify-center text-center p-4'>
          {loading ? (
            <Skeleton.Input active size="large" className="w-[3.5rem] h-[3.5rem] mb-4" />
          ) : (
            <FaGift className='text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] text-[var(--custom-color)]' />
          )}
          {loading ? (
            <Skeleton paragraph={{ rows: 2 }} active />
          ) : (
            <>
              <h3 className='text-[1.2rem] sm:text-[1.5rem] lg:text-[1.8rem] font-semibold mt-4'>
                Tiết kiệm lớn
              </h3>
              <p className='text-[1rem] sm:text-[1.2rem] lg:text-[1.4rem] mt-2'>
                Cơ hội tiết kiệm cực lớn mỗi ngày
              </p>
            </>
          )}
        </div>

        {/* Card 3 */}
        <div className='flex flex-col items-center justify-center text-center p-4'>
          {loading ? (
            <Skeleton.Input active size="large" className="w-[3.5rem] h-[3.5rem] mb-4" />
          ) : (
            <FaHeadphonesSimple className='text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] text-[var(--custom-color)]' />
          )}
          {loading ? (
            <Skeleton paragraph={{ rows: 2 }} active />
          ) : (
            <>
              <h3 className='text-[1.2rem] sm:text-[1.5rem] lg:text-[1.8rem] font-semibold mt-4'>
                24/7 Hỗ trợ khách hàng
              </h3>
              <p className='text-[1rem] sm:text-[1.2rem] lg:text-[1.4rem] mt-2'>
                Luôn sẵn sàng hỗ trợ bạn mọi lúc
              </p>
            </>
          )}
        </div>

        {/* Card 4 */}
        <div className='flex flex-col items-center justify-center text-center p-4'>
          {loading ? (
            <Skeleton.Input active size="large" className="w-[3.5rem] h-[3.5rem] mb-4" />
          ) : (
            <FaMoneyBill className='text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] text-[var(--custom-color)]' />
          )}
          {loading ? (
            <Skeleton paragraph={{ rows: 2 }} active />
          ) : (
            <>
              <h3 className='text-[1.2rem] sm:text-[1.5rem] lg:text-[1.8rem] font-semibold mt-4'>
                Thanh toán linh hoạt
              </h3>
              <p className='text-[1rem] sm:text-[1.2rem] lg:text-[1.4rem] mt-2'>
                Chấp nhận nhiều phương thức thanh toán
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dis;
