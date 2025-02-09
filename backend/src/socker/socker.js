import { Server } from "socket.io";
import express from "express";
import http from "http";
import { deleteBlog, getBlog } from "../controllers/mediapostController.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Cần chắc chắn rằng URL chính xác
    methods: ["GET", "POST"],
  },
});

// Map to track userId -> socketId mapping
const userSocketMap = new Map(); // Sử dụng Map để quản lý socket hiệu quả hơn

// Function to get the socket ID for a given userId
export const getReceiverSocketId = (receiverId) =>
  userSocketMap.get(receiverId);

io.on("connection", (socket) => {
  const userId = socket.handshake.query.user_id; // Lấy user_id từ query params
  if (!userId) {
    console.error("Connection attempt without user_id");
    socket.disconnect(); // Ngắt kết nối nếu thiếu user_id
    return;
  }

  // Thêm userId và socketId vào map
  userSocketMap.set(userId, socket.id);
  console.log(`User connected: userId = ${userId}, socketId = ${socket.id}`);

  // Log danh sách người dùng online
  console.log("Online Users:", Array.from(userSocketMap.keys()));

  // Emit danh sách userId online
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  // Emit số lượng người dùng online tới frontend
  io.emit("getOnlineUsersCount", userSocketMap.size);
 
  socket.on("disconnect", () => {
    console.log(`User disconnected: userId = ${userId}`);
    userSocketMap.delete(userId); // Xóa user khỏi map

    // Log danh sách sau khi user ngắt kết nối
    console.log(
      "Online Users after disconnect:",
      Array.from(userSocketMap.keys())
    );

    // Cập nhật danh sách userId online và số lượng người dùng online
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    io.emit("getOnlineUsersCount", userSocketMap.size);
  });
});

export { app, server, io };
