import { Skeleton } from 'antd'
import React from 'react'

function LoadingHeaderMB() {
  return (
    <div>
    <div className="md:hidden sm:shadow-xl flex justify-center items-center">
      <div className="w-[95%] m-auto">
        <div className="flex items-center justify-between bg-white py-[1rem]">
          {/* Hamburger Menu with Skeleton */}
          <div className="text-[2rem]">
          <Skeleton.Input active size="small" style={{ width: 10}} />

          </div>

          {/* Logo with Skeleton */}
          <h3 className="text-[2rem]">
          <Skeleton.Input active size="small" style={{ width: 60}} />

          </h3>

          {/* Search and Cart with Skeleton */}
          <div className="text-[2rem]">
            {/* Search Icon */}
            <Skeleton.Input active size="small" style={{ width: 30 }} />


            {/* Shopping Cart */}
            {/* <Skeleton.Avatar active size="large" /> */}

          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LoadingHeaderMB