import { Skeleton } from 'antd'
import React from 'react'

function LoadingCatelogry() {
  return (
 <div className='relative'>
  <Skeleton.Input
          active
          size="large"
        //   className="h-[43px] w-[225px] bg-[#6308a8] rounded-t-[.5rem]"
          style={{ borderRadius: '.5rem' }}
        />

     
    </div>
  )
}

export default LoadingCatelogry