import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MdCalendarMonth } from "react-icons/md";
import { Button, Modal, Table } from "antd";
import { IMG_BACKEND } from "../../../constants";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { handleExport, handleExportPdf } from "../../../../components/exportFile/exportFile";
import dayjs from "dayjs";
import TableChiTieu from "../Home/Component/chart/TableChiTieu";
import { getTopFiveProduct } from "../../../../service/data/data.service";

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

const GetFiveProductsByDate = () => {
  const [dataChart, setDataChart] = useState([]); // State to store the product data for the chart
  const [period, setPeriod] = useState('day'); // State for the selected time period
  const [open, setOpen] = useState(false);
  // Hàm mở modal
  const openModal = () => {
    setOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setOpen(false);
  };

  
  // Function to fetch data from the API
  const fetchApi = async (selectedPeriod) => {
    try {
      const resp = await getTopFiveProduct({ period: selectedPeriod });
      const productData = resp.data.content;

      // Prepare data for the table
      const formattedData = productData.map((item) => ({
        key: item.product_id,
        product_name: item.product.product_name,
        order_date: item.order.order_date,
        total_quantity: item.total_quantity,
        order_total: item.order.order_total,
      }));

      // Set the data for the table
      setDataChart(formattedData);

      // Prepare data for the Doughnut chart
      const labels = productData.map(item => 
        item.product.product_name.length > 20 
          ? item.product.product_name.substring(0, 20) + '...' 
          : item.product.product_name
      );
      const data = productData.map(item => parseInt(item.total_quantity));

      // Dynamically update the chart data
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Top 5 Products",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts or when the period changes
  useEffect(() => {
    fetchApi(period);
  }, [period]);

  // Chart data state for the Doughnut chart
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const onExportClick = () => {
    handleExport(dataChart); 
  };
  const onPDFClick = () => {
    handleExportPdf(dataChart); 
  };
  
  return (
    <div className="">
      {/* Bảng bên trái */}
      <div className="bg-white w-full lg:w-[100%] p-12 box-border shadow-lg rounded-xl text-[13px] font-medium flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-white linear-gradient1 rounded-lg p-[15px] gap-[7px]">
            <MdCalendarMonth />
            <span>Top 5 sản phẩm mua nhiều nhất</span>
          </div>
          <div className="mb-4">
            <label htmlFor="period" className="mr-2">Chọn thời gian: </label>
            <select 
              id="period" 
              value={period} 
              onChange={(e) => setPeriod(e.target.value)} 
              className="p-2 border rounded"
            >
              <option value="day">Ngày</option>
              <option value="week">Tuần</option>
              <option value="month">Tháng</option>
            </select>
          </div>
        </div>
        {/* Bảng dữ liệu */}
        <div className="flex-1">
          <Table columns={columns} dataSource={dataChart} pagination={{ pageSize: 5 }} size="large" />
         <div className="flex gap-[1rem]">
         <Button color="primary" onClick={() => setOpen(true)}>
            Hiển thị biểu đồ
          </Button>
           <Button className="p-5" onClick={onExportClick}>
                      <IoCloudDownloadOutline className="text-[18px]" />
                      Tải file Excel
                    </Button>
                    <Button className="p-5" onClick={onPDFClick}>
                      <IoCloudDownloadOutline className="text-[18px]" />
                      Tải file PDF
                    </Button>
         </div>
        </div>
      </div>
    
     

      {/* Modal chứa biểu đồ */}
      <Modal   open={open}
        onCancel={closeModal}
        footer={null}
        maskClosable={true} // Cho phép đóng modal khi click vào backdrop
        width={500} // Điều chỉnh kích thước modal nếu cần
        >
        <Doughnut data={chartData} />
        <Button
          variant="outlined"
          onClick={() => setOpen(false)}
          style={{ marginTop: "20px" }}
        >
          Đóng
        </Button>
      </Modal>
    </div>
  );
};

export default GetFiveProductsByDate;
