import React, { useEffect, useState } from 'react'
import GolenWeek from './GolenWeek'

function ListProductSmall() {
  return (
    <div className='mx-auto'>
    <div className="grid 2xl:grid-cols-4 gap-[3rem] lg:grid-cols-3 md:grid-cols-2">
     <div>
      <h3 className='text-[2.2rem] font-semibold mt-[2rem]'>Dành riêng cho bạn</h3>
      <div className='w-[100%] h-[3px] bg-gray-400 rounded-lg relative mt-[1rem]'>
        <div className='w-[30%] h-[3px] bg-[#7500CF] rounded-lg'></div>
      </div>
<GolenWeek/>

    
     </div>
     <div>
      <h3 className='text-[2.2rem] font-semibold mt-[2rem]'>Khuyến mãi</h3>
      <div className='w-[100%] h-[3px] bg-gray-400 rounded-lg relative mt-[1rem]'>
        <div className='w-[30%] h-[3px] bg-[#7500CF] rounded-lg'></div>
      </div>
 
     </div>
     <div>
      <h3 className='text-[2.2rem] font-semibold mt-[2rem]'>Top bán chạy</h3>
      <div className='w-[100%] h-[3px] bg-gray-400 rounded-lg relative mt-[1rem]'>
        <div className='w-[30%] h-[3px] bg-[#7500CF] rounded-lg'></div>
      </div>
   
     </div>
     <div>
      <h3 className='text-[2.2rem] font-semibold mt-[2rem]'>Sản phẩm mới</h3>
      <div className='w-[100%] h-[3px] bg-gray-400 rounded-lg relative mt-[1rem]'>
        <div className='w-[30%] h-[3px] bg-[#7500CF] rounded-lg'></div>
      </div>
   
     </div>

    </div>
      
    </div>
  )
}

export default ListProductSmall