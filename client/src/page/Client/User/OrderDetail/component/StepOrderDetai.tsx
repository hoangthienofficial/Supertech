import { Steps } from 'antd';
import React from 'react';
import { formatDate } from '../../../../../utils';

function StepOrderDetail(props: any) {
  const orderData = props.order;

  // Danh sách các bước mặc định
  const statusMap = [
    { status: 0, color: '#FF0000', text: 'Đang chờ duyệt' },       // Màu đỏ
    { status: 1, color: '#FFA500', text: 'Đang chuẩn bị hàng' },  // Màu cam
    { status: 2, color: '#FFFF00', text: 'Đã chuẩn bị hàng' },  
    { status: 3, color: '#008000', text: 'Đang giao hàng' },      // Màu xanh lá
    { status: 4, color: '#800080', text: 'Giao hàng thành công' }, // Màu tím
  ];

  const statusMap1 = [
    { status: 0, color: '#FF0000', text: 'Đang chờ duyệt' },       // Màu đỏ
    { status: 1, color: '#FFA500', text: 'Đang chuẩn bị hàng' },  // Màu cam
    { status: 2, color: '#FFFF00', text: 'Đã chuẩn bị hàng' },  
    { status: 3, color: '#008000', text: 'Đang giao hàng' },      // Màu xanh lá
    { status: 5, color: '#FF4500', text: 'Không nhận hàng' },     // Màu cam đỏ
  ];

  // Danh sách các bước khi đơn hàng bị hủy
  const statusCancelOrderDetail = [
    { title: "Đơn hàng đã được nhận" },
    { title: "Đơn hàng đã được hủy" },
  ];

  // Xây dựng danh sách các bước
  const stepsToShow = 
    orderData?.order_status === 6 ? statusCancelOrderDetail :
    orderData?.order_status === 5 ? statusMap1 :
    statusMap;

  
  // Mảng các bước hiển thị
  let stepsItems = stepsToShow.map((step, index) => {
    const isCancelled = orderData?.order_status === 6;

    if (isCancelled) {
      const cancelTime =
        index === 0
          ? orderData?.order_date
          : orderData?.order_statuses?.find((s) => s?.order_status === 6)?.created_at;

      return {
        title: (
          <div>
            <div>{step.title}</div>
            <div style={{ fontSize: '13px', color: '#888', marginTop: '0' }}>
              {cancelTime ? formatDate(cancelTime) : "Không có thời gian"}
            </div>
          </div>
        ),
        status: index === 0 ? "finish" : "process", // For canceled orders, the first step is finished, others are in progress
      };
    }

    const status = orderData?.order_statuses?.find((s) => s?.order_status === index);
    const statusTime = status?.created_at;

    const isCurrent = orderData?.order_status === index; // Only mark as 'process' if it's the current order status
    const isCompleted = orderData?.order_status > index; // Mark as 'finish' if the order status is greater than current step index

    const stepInfo = statusMap.find((item) => item.status === index);

    // Prevent adding 'Giao hàng thành công' step if order is canceled or marked as 'Không nhận hàng'
    if ((orderData?.order_status === 5 || orderData?.order_status === 6) && stepInfo?.text === 'Giao hàng thành công') {
      return null; // Skip the 'Giao hàng thành công' step
    }

    return {
      title: (
        <div>
          <div>{stepInfo?.text || step.title}</div>
          <div style={{ fontSize: '13px', color: '#888', marginTop: '0' }}>
            {statusTime ? formatDate(statusTime) : "Chưa có thời gian"}
          </div>
        </div>
      ),
      status: isCompleted ? "finish" : isCurrent ? "process" : "wait", // Dynamically set the status based on completion
      style: { color: stepInfo?.color },
    };
  });

  // Đặt bước hiện tại
  const currentStep = orderData?.order_status === 6 ? 1 : orderData?.order_status || 0;

  return (
    <div>
      <Steps
        direction="vertical"
        size="large"
        current={currentStep}
        items={stepsItems.filter(item => item !== null)} // Filter out any null steps
      />
    
    </div>
  );
}

export default StepOrderDetail;
