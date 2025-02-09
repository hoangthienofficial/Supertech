import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getUserOrderCount } from '../../../../../service/data/data.service'; // Đảm bảo đúng đường dẫn import

function TableChiTieu(props) {
  const [dataTable, setDataTable] = useState([]); // Dữ liệu bảng
  const [loading, setLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);

        // Lấy ngày hôm nay
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString(); // Bắt đầu ngày
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString(); // Kết thúc ngày

        // Gửi yêu cầu API với tham số start và end
        const response = await getUserOrderCount({ limit:props.limit ||5 });

        if (response?.data?.content) {
          const transformedData = response.data.content.map((item) => ({
            key: item.user_id,
            user_name: item.user?.user_name || 'Không rõ',
            money: parseInt(item.totalSpent, 10) || 0,
            total_orders: item.totalOrders || 0,
          
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
  }, []);

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

  ];

  const onChange = (pagination, filters, sorter) => {
    console.log('Pagination:', pagination);
    console.log('Filters:', filters);
    console.log('Sorter:', sorter);
  };
  const totalMoney = dataTable.reduce((acc, item) => acc + item.money, 0);
  const totalOrders = dataTable.reduce((acc, item) => acc + item.total_orders, 0);
  
  
  return (
    <Table
    columns={columns}
    dataSource={dataTable}
    pagination={{ pageSize: 5 }}
    loading={loading}
    size="large"
    onChange={onChange}
    footer={() => (
      <div>
        <strong>Tổng tiền: </strong>{totalMoney.toLocaleString('vi-VN')} VNĐ <br />
        <strong>Tổng số đơn hàng: </strong>{totalOrders}
      </div>
    )}
  />
  );
}

export default TableChiTieu;
