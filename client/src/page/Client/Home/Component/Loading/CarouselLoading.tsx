import { Skeleton } from 'antd'
import React from 'react'

function CarouselLoading() {
  return (
    <div className='flex justify-center items-center'>
    <Skeleton.Input
  active
  className='w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px]'
  style={{
    height: "auto",
    minHeight: "80rem",
    maxWidth:"2400px",
    width: "500px",
  }}
/>
    </div>

  )
}

export default CarouselLoading