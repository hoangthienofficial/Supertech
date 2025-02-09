import { Button, Table, Tooltip, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { changeStatusOrderThunk, getOrderByIdProductThunk } from '../../../../redux/order/Order.slice';
import { formatCurrencyVND, truncateText } from '../../../../utils';
import CancelOrderModal from './component/ModalCancer';
import { colorText } from '../../../../constants';
import dayjs from 'dayjs';
import './css/TableEdit.css';

function Order() {
  const [orderStatus, setOrderStatus] = useState(0); // Default status
  const dispatch = useAppDispatch();
  const listOrder = useAppSelector((state) => state.listOrder.listOrder);
  const searchRef = useRef(null);

  useEffect(() => {
    dispatch(getOrderByIdProductThunk({ searchKey: '', order_status: orderStatus }));
  }, [dispatch, orderStatus]);

  const handleChangeStatus = (id, status) => {
    dispatch(changeStatusOrderThunk({ id, order_status: status, status_order: orderStatus }));
  };

  const columns = [
    {
      title: <div className="whitespace-nowrap">Đơn hàng</div>,
      dataIndex: 'order_id',
      key: 'order_id',
      render: (text) => <NavLink to={"/don-hang-chi-tiet-cua-ban/" + text} className="text-[#0084FF]">#{text}</NavLink>,
    },
    {
      title: <div className="whitespace-nowrap">Ngày mua</div>,
      dataIndex: 'order_date',
      key: 'order_date',
      render: (text) => <div>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</div>,
    },
    {
      title: <div className="whitespace-nowrap">Địa chỉ</div>,
      dataIndex: 'address',
      key: 'address',
      render: (text) => (
        <div className="text-[red] font-semibold">
          <Tooltip title={text}>{truncateText(text, 30)}</Tooltip>
        </div>
      ),
    },
    {
      title: <div className="whitespace-nowrap">Tổng tiền</div>,
      dataIndex: 'order_total',
      key: 'order_total',
      render: (text, record) => (
        <NavLink to={"/don-hang-chi-tiet-cua-ban/" + record.order_id} className="text-[red] font-semibold">
          {formatCurrencyVND(text * (1 - Number(record?.discount_discount?.discount_percent / 100 || 0)))}
        </NavLink>
      ),
    },
    {
      title: <div className="whitespace-nowrap">Trạng thái</div>,
      dataIndex: 'order_status',
      key: 'order_status',
      render: (statusIndex) => {
        const statusItem = colorText[statusIndex] || {};
        return (
          <div className="flex justify-center cursor-pointer">
            <Tooltip title={statusItem.text}>
              <div
                style={{ backgroundColor: statusItem.color }}
                className="w-[1.5rem] h-[1.5rem] rounded-[50%]"
              ></div>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: '',
      key: 'edit',
      render: (text, record) => (
        <div className="flex gap-[.5rem]">
          <Button type="primary">
            <NavLink to={`/don-hang-chi-tiet-cua-ban/${record.order_id}`}>Xem</NavLink>
          </Button>
          {record.order_status <= 2 && <CancelOrderModal orderId={record.order_id} />}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      <h3 className="text-[1.9rem] md:text-[2.2rem] lg:text-[2.5rem] text-customColor font-semibold">
        Quản lý Đơn hàng của bạn
      </h3>

      <div className="py-[1rem] flex flex-wrap gap-[1rem]">
        {[
          { label: 'Đang chờ duyệt', color: '#D32F2F', status: 0 },
          { label: 'Đang chuẩn bị hàng', color: '#FF9800', status: 1 },
          { label: 'Đã chuẩn bị hàng', color: '#0288D1', status: 2 },
          { label: 'Đang giao hàng', color: '#388E3C', status: 3 },
          { label: 'Thành công', color: '#7B1FA2', status: 4 },
          { label: 'Không nhận hàng', color: '#616161', status: 5 },
          { label: 'Hủy hàng', color: '#212121', status: 6 },
        ].map(({ label, color, status }) => (
          <button
            key={status}
            onClick={() => setOrderStatus(status)}
            className="flex items-center gap-2 text-[1.2rem] md:text-[1.5rem]"
          >
            <div style={{ backgroundColor: color }} className="w-4 md:w-6 h-4 md:h-6 rounded-full"></div>
            <span style={{ color }} className="font-semibold">
              {label}
            </span>
          </button>
        ))}
      </div>


      <div className="w-full h-[38px] py-[1rem] inputSearch">
        <Input.Search
          placeholder="Tìm kiếm theo mã đơn hàng"
          allowClear
          onChange={(e) => {
            if (searchRef.current) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
              dispatch(getOrderByIdProductThunk({ searchKey: e.target.value, order_status: orderStatus }));
            }, 400);
          }}
          className="w-full"
        />
      </div>

      <div className="tableEdit w-full overflow-x-auto">
        <Table
          columns={columns}
          dataSource={listOrder}
          rowKey="order_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1000 }}
          className="mt-[3rem]"
        />
      </div>
    </div>
  );
}

export default Order;
