import { useEffect } from "react";
import { io, Socket } from "socket.io-client"; // Import type Socket nếu cần
import { setSocket } from "../redux/socket/socker.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TpayloadUser } from "../service/user/user.type";
import { setListBlog } from "../redux/blogredux/blog.slice";

const UseSocket = () => {
  const { user } = useAppSelector((store) => store.user); // Lấy user từ Redux
  const AppDispatch = useAppDispatch();

  useEffect(() => {
    console.log("User:", user); // Kiểm tra xem user có giá trị hay không
    if (!user) return; // Nếu user chưa đăng nhập thì không tiếp tục kết nối socket

    const socket: Socket = io("https://dichvumang86.cloud", {
      query: { user_id: user.user_id }, // Gửi user_id trong query
      transports: ["websocket"], // Sử dụng websocket làm phương thức truyền tải
    });

    socket.on("connect", () => {
      console.log(`Connected to Socket.IO server with ID: ${socket.id}`);
      AppDispatch(setSocket(socket)); // Lưu socket vào Redux
    });

    socket.on("GetAllBlog", (data) => {
      AppDispatch(setListBlog(data));
    });
    socket.on("ClickGetAllBlog", (data) => {
      console.log(data);
      AppDispatch(setListBlog(data));
    });
    // Dọn dẹp socket khi component unmount hoặc user thay đổi
    return () => {
      if (socket) {
        socket.disconnect(); // Ngắt kết nối socket
        console.log(`Socket disconnected: ${socket.id}`);
        AppDispatch(setSocket(null)); // Xóa socket khỏi Redux
      }
    };
  }, [user, AppDispatch]); // Chạy lại khi user hoặc dispatch thay đổi
  return null; // Không render bất kỳ UI nào
};

export default UseSocket;
