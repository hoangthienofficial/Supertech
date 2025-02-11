
import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";  
import initModels from "../models/init-models.js";
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';
import path from 'path';
let models = initModels(sequelize); 
let setting = models.setting;

const getSetting  = async (req, res) => {
    try {
        let data = await setting.findAll();
        responseSend(res, data, "Thành Công !", 200);
    } catch (err) { 
        console.error(err);
        responseSend(res, "","Có lỗi xảy ra", 500);
    }

}
const getSettingById = async (req, res) => {
    try {
        const settingId = req.params.id; 
        const data = await setting.findByPk(settingId); 

        if (data) {
            responseSend(res, data, "Thành công!", 200); 
            responseSend(res, "", "Không tồn tại!", 404); 
        }
    } catch (error) {
        console.error("Error fetching setting by ID:", error); 
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
}

const storage = multer.memoryStorage(); // Sử dụng memoryStorage để lưu file trong bộ nhớ
const upload = multer({ storage: storage }).single('value'); // Tạo middleware multer

const updateSetting = async (req, res) => {
    try {
        // Sử dụng multer để xử lý file upload
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Error uploading file", error: err });
            }

            const settingId = req.params.id; // Lấy ID từ tham số
            const file = req.file; // Lấy file từ req.file

            // Tìm cài đặt theo ID
            const settingToUpdate = await setting.findByPk(settingId);
            if (!settingToUpdate) {
                return res.status(404).json({
                    message: "Setting not found",
                    success: false
                });
            }

            // Nếu ID là 6, xử lý upload ảnh
            if (settingId === '6') {
                // Xóa ảnh cũ trên Cloudinary nếu có
                if (settingToUpdate.value) {
                    await cloudinary.uploader.destroy(settingToUpdate.value); // Xóa ảnh cũ
                }

                // Kiểm tra xem file có tồn tại không
                if (file) {
                    // Tải lên ảnh mới từ buffer vào thư mục Settingweb
                    const uploadResponse = await new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                folder: 'Settingweb', // Chỉ định thư mục để lưu ảnh
                                resource_type: 'auto' // Tự động xác định loại tài nguyên
                            },
                            (error, result) => {
                                if (error) {
                                    return reject(error);
                                }
                                resolve(result);
                            }
                        );

                        // Gửi buffer đến Cloudinary
                        uploadStream.end(file.buffer);
                    });

                    // Lưu tên file ảnh vào database
                    settingToUpdate.value = uploadResponse.public_id; // Lưu public_id của ảnh vào value
                } else {
                    return res.status(400).json({ message: "No file uploaded" }); // Trả về lỗi nếu không có file
                }
            } else {
                // Nếu không phải ID 6, chỉ cập nhật giá trị
                settingToUpdate.value = req.body.value; // Cập nhật giá trị mới
            }

            // Lưu cài đặt
            await settingToUpdate.save(); // Lưu cài đặt

            responseSend(res, settingToUpdate, "Đã Cập Nhật Thành Công!", 200); // Phản hồi thành công
        });
    } catch (error) {
        console.error("Error updating setting:", error);
        responseSend(res, "", "Có lỗi xảy ra!", 500); // Phản hồi lỗi
    }
};



export {
    getSetting,
    getSettingById,
    updateSetting

}