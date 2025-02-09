import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getOrderAllThunk, setOrder } from '../redux/order/Order.slice';

const useSocketCreateOrder = () => {
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state: any) => state.socket.socket);  // Get socket from Redux store
  const getOrderAll = useAppSelector((state) => state.listOrder.listOrder);  // Get all orders from Redux store
 useEffect(()=>{
    dispatch(getOrderAllThunk(0))
  },[dispatch])
  useEffect(() => {
    if (socket) {
      socket.on("createOrder", (newComment: any) => {
        dispatch(setOrder([newComment, ...getOrderAll]));  // Add new order at the beginning
      });
    }

    return () => {
      if (socket) {
        socket.off("createOrder");
      }
    };
  }, [socket, getOrderAll, dispatch]);

  // Return getOrderAll so it can be used in the component
  return { getOrderAll };
};

export default useSocketCreateOrder;
