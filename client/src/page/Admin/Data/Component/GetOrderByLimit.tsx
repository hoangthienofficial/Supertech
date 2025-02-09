import React, { useEffect, useState } from 'react';
import { getUserOrderCount } from '../../../../service/data/data.service';
import { Button, Modal, Table } from 'antd';
import { Bar } from 'react-chartjs-2';
import { MdCalendarMonth } from 'react-icons/md';

function GetOrderByLimit() {
  const [dataTable, setDataTable] = useState([]); // Dữ liệu bảng
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(1);
  
  // Hàm mở modal
  const openModal = () => {
    setOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);

        // Gửi yêu cầu API với tham số limit
        const response = await getUserOrderCount({ limit: limit || 5 });

        if (response?.data?.content) {
          const transformedData = response.data.content.map((item) => ({
            key: item.user_id,
            user_name: item.user?.user_name || 'Không rõ',
            money: parseInt(item.totalSpent, 10) || 0,
            total_orders: item.totalOrders || 0,
            address: "N/A",
          }));
          setDataTable(transformedData);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, [limit]);

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'user_name',
      key: 'name',
    },
    {
      title: 'Số Tiền Mua Hàng',
      dataIndex: 'money',
      key: 'money',
      sorter: (a, b) => a.money - b.money,
      render: (money) => money.toLocaleString('vi-VN') + ' VNĐ',
    },
    {
      title: 'Số Đơn Hàng',
      dataIndex: 'total_orders',
      key: 'total_orders',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const totalMoney = dataTable.reduce((acc, item) => acc + item.money, 0);
  const totalOrders = dataTable.reduce((acc, item) => acc + item.total_orders, 0);

  // Chart data for Bar
  const chartData = {
    labels: dataTable.map(item => item.user_name),
    datasets: [{
      label: 'Số đơn hàng',
      data: dataTable.map(item => item.total_orders),
      backgroundColor: '#7500CF',
      borderColor: '#7500CF',
      borderWidth: 1,
    }],
  };

  // Options for the bar chart
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="bg-white w-full lg:w-[100%] p-12 box-border shadow-lg rounded-xl text-[13px] font-medium flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-white linear-gradient1 rounded-lg p-[15px] gap-[7px]">
            <MdCalendarMonth />
            <span>Top 5 sản phẩm mua nhiều nhất</span>
          </div>
          <div className="mb-4">
            <label htmlFor="limit" className="mr-2">Chọn thời gian: </label>
            <select 
              id="limit" 
              value={limit} 
              onChange={(e) => setLimit(e.target.value)} 
              className="p-2 border rounded"
            >
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        
        {/* Bảng dữ liệu */}
        <div className="flex-1">
          <Table
            columns={columns}
            dataSource={dataTable}
            pagination={{ pageSize: 5 }}
            loading={loading}
            size="large"
            footer={() => (
              <div>
                <strong>Tổng tiền: </strong>{totalMoney.toLocaleString('vi-VN')} VNĐ <br />
                <strong>Tổng số đơn hàng: </strong>{totalOrders}
              </div>
            )}
          />

          <div className="flex gap-[1rem]">
            <Button color="primary" onClick={openModal}>
              Hiển thị biểu đồ
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onCancel={closeModal}
        footer={null}
        maskClosable={true} // Cho phép đóng modal khi click vào backdrop
        width={500} // Điều chỉnh kích thước modal nếu cần
      >
        {/* Render Bar chart */}
        <Bar data={chartData} options={chartOptions} />
        
        <Button
          variant="outlined"
          onClick={closeModal}
          style={{ marginTop: "20px" }}
        >
          Đóng
        </Button>
      </Modal>
    </div>
  );
}

export default GetOrderByLimit;
