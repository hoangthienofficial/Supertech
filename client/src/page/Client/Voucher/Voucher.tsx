import React, { useEffect, useState } from 'react';
import { getDiscountAll } from '../../../service/vourcher/voucher.service';

const CouponSection = () => {
  // Function to handle copying the coupon code
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => alert(`Code của bạn đã được sao chép: ${code}`))
      .catch(() => alert('Failed to copy the code'));
  };
  const [getVoucher,setGetVoucher]=useState();
  useEffect(()=>{
   const getApiVoucher=async()=>{
      const response=await getDiscountAll();
      setGetVoucher( response.data.content)
    }
    getApiVoucher()
  },[])
  console.log(getVoucher);
  
  return (
    <section className="container mx-auto mt-12 px-4">
      <div className="flex flex-wrap">
        {/* Render 6 coupon items in a responsive layout */}
        {getVoucher.map((_, i) => (
          <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
            {/* Coupon Item */}
            <div className="bg-white shadow-lg p-12 relative">
              {/* Decorative Circles (Left) */}
              <div className="absolute top-1 left-[-5px] flex flex-col space-y-1">
                {Array(5).fill().map((_, j) => (
                  <p key={`left-${i}-${j}`} className="bg-white border border-white rounded-full w-6 h-5"></p>
                ))}
              </div>

              {/* Decorative Circles (Right) */}
              <div className="absolute top-1 right-[-5px] flex flex-col space-y-1">
                {Array(5).fill().map((_, j) => (
                  <p key={`right-${i}-${j}`} className="bg-white border border-white rounded-full w-6 h-5"></p>
                ))}
              </div>

              {/* Coupon Content */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-2xl font-bold text-[#7500CF]">VOUCHER</h3>
                  <div className="text-[#7500CF] text-xl">{_.condition}</div>
                </div>
              </div>

              {/* Voucher Value */}
              <div className="flex items-baseline text-4xl font-extrabold text-[var(--custom-color)]">
                <h1>Giảm {_.discount_percent}%</h1>
               
              </div>

              {/* Coupon Footer with Copy Button */}
              <div className="flex justify-between items-center mt-4 text-xl text-[var(--custom-color)] font-medium">
                <span>mã: {_.discount_name}</span>
                <button 
                  className="border border-[#7500CF] px-4 py-2 rounded-md hover:bg-[var(--custom-color)] hover:text-white"
                  onClick={() => handleCopyCode('W50')}
                >
                  Sao chép
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CouponSection;