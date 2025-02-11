import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import cors from "cors";
import axios from "axios";
import { app, server } from "./socker/socker.js";
import routersystem from "./routers/systemRouter.js";
import { authorizeRoles, middleToken } from "./config/jwt.js";

app.use(express.json());
app.use(cookieParser());

app.use(urlencoded({ extended: true }));
app.use(express.static("."));
const corsOptions = {
  origin: ["http://localhost:5173", "https://dichvumang86.net"],
  credentials: true,
};
// cron này chỉ chạy được trên server thôi, local tạm thời ẩn, tuyệt đối ko tắt để hạn chế tình trạng trùng lập cron giữa local

cron.schedule("* * * * *", async () => {
  console.log("Bắt đầu chạy Check Lịch Sử Giao Dịch Api Từ Phía Ngân Hàng!!!");
  try {
    const response1 = await axios.get("http://localhost:8080/");
    console.log("Kết quả từ localhost:", response1.data);
    const response2 = await axios.get(
      "https://dichvumang86.net/cron/baostar.php?type"
    );
    console.log("Kết quả từ dichvumang86:", response2.data);
    const response3 = await axios.get(
      "https://dichvumang86.net/cron/muaspin.php"
    );
    console.log("Kết quả từ Cron Mua Spin:", response3.data);
  } catch (error) {
    console.error("Lỗi khi gọi API:", error.message);
  }
});

app.use(cors(corsOptions));
app.get(
  "/admin/groups",
  middleToken, // Middleware kiểm tra token
  authorizeRoles([0, 1]), // Phân quyền
  (req, res) => {
    res.json({ message: "Chào mừng đến trang admin!" });
  }
);
app.use(routersystem);
server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
