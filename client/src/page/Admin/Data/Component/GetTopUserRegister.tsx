import { Button, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Thay đổi từ Doughnut sang Pie
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { MdCalendarMonth } from 'react-icons/md';
import { handleExport, handleExportPdf } from '../../../../components/exportFile/exportFile';
import { getTopUserRegister } from '../../../../service/data/data.service';
import dayjs from 'dayjs';

const columns = [
  {
    title: "Tên Người Dùng",
    dataIndex: "user_name", // Truyền trực tiếp user_name
    key: "user_name",
  },
  {
    title: "Email",
    dataIndex: "user_email", // Truyền trực tiếp user_email
    key: "user_email",
  },
  {
    title: "Ngày Đăng Ký",
    dataIndex: "user_time", // Truyền trực tiếp user_time
    key: "user_time",
    render: (text) => dayjs(text).format("DD-MM-YYYY"), // Định dạng ngày sử dụng dayjs
  },
];

function GetTopUserRegister() {
  const [dataChart, setDataChart] = useState([]); // State để lưu trữ dữ liệu bảng
  const [period, setPeriod] = useState('day'); // State cho thời gian chọn (ngày, tuần, tháng)
  const [open, setOpen] = useState(false); // State để mở/đóng modal
  const [chartData, setChartData] = useState({ labels: [], datasets: [] }); // Dữ liệu cho biểu đồ Pie

  // Hàm mở modal
  const openModal = () => {
    setOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setOpen(false);
  };

  // Hàm lấy dữ liệu từ API
  const fetchApi = async (selectedPeriod) => {
    try {
      const resp = await getTopUserRegister({ period: selectedPeriod });
      const userData = resp.data.topUsers; // Lấy topUsers từ API

      // Chuẩn bị dữ liệu cho bảng
      const formattedData = userData.map((item) => ({
        key: item.user_id,
        user_name: item.user_name,
        user_email: item.user_email,
        user_time: item.user_time, // Thời gian đăng ký
      }));

      // Cập nhật dữ liệu bảng
      setDataChart(formattedData);

      // Chuẩn bị dữ liệu cho biểu đồ Pie
      const labels = userData.map((item) =>
        item.user_name.length > 20
          ? item.user_name.substring(0, 20) + '...'
          : item.user_name
      );
      const data = userData.map(() => 1); // Mỗi người dùng sẽ có giá trị 1, có thể thay đổi tùy theo mục đích

      // Cập nhật dữ liệu cho biểu đồ Pie
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Top Users",
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

  // Gọi API khi component mount hoặc khi thay đổi period
  useEffect(() => {
    fetchApi(period);
  }, [period]);

  // Hàm xuất dữ liệu thành file Excel
  const onExportClick = () => {
    handleExport(dataChart);
  };

  // Hàm xuất dữ liệu thành file PDF
  const onPDFClick = () => {
    handleExportPdf(dataChart);
  };

  return (
    <div>
      {/* Bảng bên trái */}
      <div className="bg-white w-full lg:w-[100%] p-12 box-border shadow-lg rounded-xl text-[13px] font-medium flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-white linear-gradient1 rounded-lg p-[15px] gap-[7px]">
            <MdCalendarMonth />
            <span>Top 5 người dùng chi tiêu nhiều nhất</span>
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
          <Table
            columns={columns}
            dataSource={dataChart}
            pagination={{ pageSize: 5 }}
            size="large"
          />
          <div className="flex gap-[1rem]">
            <Button color="primary" onClick={openModal}>
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
      <Modal
        open={open}
        onCancel={closeModal}
        footer={null}
        maskClosable={true} // Cho phép đóng modal khi click vào backdrop
        width={500} // Điều chỉnh kích thước modal nếu cần
      >
        <Pie data={chartData} /> {/* Sử dụng Pie thay vì Doughnut */}
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
}

export default GetTopUserRegister;
