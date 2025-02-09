import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import { changeStatusOrderAdminThunk } from "../../../../../redux/order/Order.slice";
import { colorText } from "../../../../../constants";

interface OrderStatus {
  order_status_id: number;
  order_status: number;
  order_status_text_cancel?: string | null;
  order_id: number;
  created_at: string;
}

interface ButtonOrderProps {
  orderStatuses: OrderStatus[];
  orderId: number;
}

function ButtonOrder({ orderStatuses, orderId }: ButtonOrderProps) {
  const dispatch = useAppDispatch();
  const [currentOrderStatus, setCurrentOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const latestOrderStatus = orderStatuses
      ?.filter((status) => status.order_id === orderId)
      ?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0];

    if (latestOrderStatus) {
      setCurrentOrderStatus(latestOrderStatus);
    }
  }, [orderStatuses, orderId]);

  const handleClickChangeOrder = async (nextStatus: number, id: number) => {
    setLoading(true);
    const data = {
      order_status: nextStatus,
      order_id: id,
    };

    try {
      await dispatch(changeStatusOrderAdminThunk(data))
      setCurrentOrderStatus((prevStatus) =>
        prevStatus ? { ...prevStatus, order_status: nextStatus } : null
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentColorText = colorText.find(
    (item) => item.status === currentOrderStatus?.order_status
  );

  const getNextStatus = (currentStatus: number) => {
    const nextIndex = colorText.findIndex((item) => item.status === currentStatus) + 1;
    return colorText[nextIndex]?.status || currentStatus;
  };

  const nextStatus = currentOrderStatus ? getNextStatus(currentOrderStatus.order_status) : 0;

  return (
    <div>
      {currentOrderStatus?.order_status === 3 ? (
        // Hiển thị nút khi trạng thái hiện tại là "Đang giao hàng" (3)
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2
               rounded-2xl
              text-white ${loading ? "opacity-50" : ""}`}
            style={{ backgroundColor: "#800080" }}
            onClick={() => handleClickChangeOrder(4, orderId)}
            disabled={loading}
          >
            Thành công
          </button>
          <button
            className={`px-4 py-2 text-white rounded ${loading ? "opacity-50" : ""}`}
            style={{ backgroundColor: "#000000" }}
            onClick={() => handleClickChangeOrder(5, orderId)}
            disabled={loading}
          >
            Không nhận hàng
          </button>
        </div>
      ) : (
        <button
          className={`px-4 py-2 text-white rounded ${loading ? "opacity-50" : ""}`}
          style={{ backgroundColor: currentColorText?.color || "#808080" }}
          disabled={
            loading || 
            currentOrderStatus?.order_status >= 4 // Disable khi trạng thái >= 4
          }
          onClick={() => handleClickChangeOrder(nextStatus, orderId)}
        >
          {loading ? "Đang xử lý..." : currentColorText?.text || "Trạng thái không xác định"}
        </button>
      )}
    </div>
  );
  
}

export default ButtonOrder;
