import React, { useEffect, useState } from "react";

function ProductColor(props) {

  useEffect(() => {
    if (props.listProduct?.product_colors?.length > 0) {
      const firstColor = props.listProduct.product_colors[0];
      props.setSelectedColor(firstColor?.color);
      props.onColorChange(firstColor?.color); // Gọi hàm để cập nhật màu cho component cha
    }
  }, [props, props.listProduct, props.onColorChange]);

  const handleColorChange = (color: string) => {
    const newColor = props.listProduct.product_colors.find((item) => item.color === color);
    if (newColor) {
      props.setSelectedColor(newColor.color);
      props.onColorChange(newColor.color); // Gọi hàm để cập nhật màu cho component cha
    }
  };

  return (
    <div className="py-6">
      <h4 className="text-2xl">Chọn màu để xem giá và tình trạng hàng</h4>
   
      <div className="flex flex-wrap gap-4 mt-4">
        {props.listProduct?.product_colors?.map((item) => (
          <div
            key={item.color}
            onClick={() => handleColorChange(item.color)}
            className="flex items-center gap-3 border py-4 px-6 rounded-md cursor-pointer hover:shadow-md"
          >
            <img 
              src="https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/tai_nghe_airpods_max_2024_xanh_1_3aa5c4886e.jpg" 
              alt={item.color} 
              className="w-10 rounded-md"
            />
            <div>
              <h4 className="font-semibold text-lg">{item.color}</h4>
              <p className="text-red-500 font-semibold">20.000.000đ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductColor;