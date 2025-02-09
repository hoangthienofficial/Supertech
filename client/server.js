import express from "express";
import { createServer } from "vite";
import path from "path";

const app = express();

// Xác định môi trường
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  // Chạy Vite Dev Server cho môi trường phát triển
  const vite = await createServer({
    server: { middlewareMode: true },
  });

  app.use(vite.middlewares);
} else {
  // Chạy ứng dụng ở chế độ production (sau khi build)
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// Lắng nghe trên cổng do App Engine cung cấp
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
