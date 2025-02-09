import React from 'react'

function ListOrder() {
  return (
    <main className="flex-1 p-6">
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">Thông tin đơn hàng</h1>
    </div>
    <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]"> 
      <h5 className="text-center text-gray-500 text-lg font-semibold">
        Đơn hàng chưa được mở
      </h5>
    </div>
  </main>
  )
}

export default ListOrder