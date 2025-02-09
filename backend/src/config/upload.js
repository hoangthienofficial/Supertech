
import multer from 'multer';

// Cấu hình Multer
export const upload = multer({
  storage: multer.memoryStorage(),  // Sử dụng memoryStorage thay vì diskStorage
  fileFilter: (req, file, callback) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(file.originalname.toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return callback(null, true); // Cho phép file loại hình ảnh
    } else {
      callback(new Error('Chỉ chấp nhận tệp hình ảnh!'));
    }
  }
});
// xóa hình folter
export const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Lỗi khi xóa file:', err);
      } else {
        console.log('Đã xóa file thành công:', filePath);
      }
    });
  };