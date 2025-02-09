import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MdCalendarMonth } from "react-icons/md";
import { Button, Modal, Table } from "antd";
import { getTopFiveProduct } from "../../../service/data/data.service";
import { IMG_BACKEND } from "../../../constants";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { handleExport, handleExportPdf } from "../../../components/exportFile/exportFile";
import dayjs from "dayjs";
import TableChiTieu from "../Home/Component/chart/TableChiTieu";
import GetFiveProductsByDate from "./Component/GetFiveProductsByDate";
import GetOrderByLimit from "./Component/GetOrderByLimit";
import GetTopUserRegister from "./Component/GetTopUserRegister";
import GetOrderTotalByDate from "./Component/GetTotalOrder";

// Đăng ký Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Kiểu dáng Modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

// Cấu hình cột dữ liệu bảng
const columns = [
  {
    title: "Tên Sản Phẩm",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Ngày Đặt Hàng",
    dataIndex: "order_date",
    key: "order_date",
    render: (text) => dayjs(text).format("DD-MM-YYYY"), // Dùng dayjs để định dạng ngày

  },
  {
    title: "Số Lượng",
    dataIndex: "total_quantity",
    key: "total_quantity",
  },
  {
    title: "Giá tiền",
    dataIndex: "order_total",
    key: "order_total",
  },
];

const AdminData = () => {
  
  
  return (

    <div className=" bg-[#f2edf3] p-12">
        <div className="flex gap-6 mb-[1rem]">
            <div className="w-[50%]">
   <GetFiveProductsByDate/> 
</div>
<div className="w-[50%]">
   <GetOrderByLimit/> 
</div>
        </div>
        <div className="flex gap-6">
            <div className="w-[50%]">
   <GetTopUserRegister/> 
</div>
<div className="w-[50%]">
   {/* <GetOrderTotalByDate/>  */}
</div>
        </div>
      {/* Bảng bên trái */}
    

   
    </div>
  );
};

export default AdminData;
