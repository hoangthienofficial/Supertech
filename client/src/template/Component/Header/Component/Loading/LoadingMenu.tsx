import { Skeleton } from 'antd'
import React from 'react'

function LoadingMenu() {
  return (
    <div>
    <ul className="flex items-center">
      {/* Skeleton for "Trang chủ" */}
      <li className="relative md:mr-6">
      <Skeleton.Input active size="default" style={{ width: '100px' }} />

      </li>

      {/* Skeleton for "Giới thiệu" */}
      <li className="relative md:mr-6">
      <Skeleton.Input active size="default" style={{ width: '120px' }} />

      </li>

      {/* Skeleton for "Sản phẩm" */}
      <li
        className="relative md:mr-6"
      
      >
                <Skeleton.Input active size="default" style={{ width: '110px' }} />

      

      </li>

      {/* Skeleton for "Liên hệ" */}
      <li className="relative md:mr-6">
      <Skeleton.Input active size="default" style={{ width: '80px' }} />

      </li>
    </ul>
  </div>
  )
}

export default LoadingMenu