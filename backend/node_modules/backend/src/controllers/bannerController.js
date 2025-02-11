import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';
import path from 'path';
let models = initModels(sequelize); 
let bannerModel = models.banner; 

const getbanner = async (req, res) => {
    try {
        let data = await bannerModel.findAll();
        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const getbannerById = async (req, res) => {
    try {
        let data = await bannerModel.findByPk(req.params.id);
        if (data) {
            responseSend(res, data, "Thành công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('banner_name');

const createbanner = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error("Upload error:", err);
            return res.status(500).json({ error: 'Error handling the file upload.' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }
        try {
            const file = req.file;
            const originalName = path.parse(file.originalname).name;
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'Banner',
                        resource_type: 'image',
                        public_id: originalName
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(file.buffer);
            });
            const imageName = result.public_id.split('/').pop();
            let newBanner = await bannerModel.create({
                banner_name: imageName,
                status: req.body.status
            });
            responseSend(res, newBanner, "Thêm Thành công!", 201);
        } catch (error) {
            console.error('Error creating banner:', error);
            responseSend(res, "", "Có lỗi xảy ra!", 500);
        }
    });
};


const updatebanner = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error("Upload error:", err);
            return res.status(500).json({ error: 'Error handling the file upload.' });
        }

        try {
            const banner = await bannerModel.findByPk(req.params.id);
            if (!banner) {
                return responseSend(res, "", "Banner không tồn tại!", 404);
            }

            if (req.file) {
                if (banner.banner_name) {
                    await cloudinary.uploader.destroy(`Banner/${banner.banner_name}`);
                }
                const file = req.file;
                const originalName = path.parse(file.originalname).name;
                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream({
                        folder: 'Banner',
                        resource_type: 'image',
                        public_id: originalName
                    }, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    });
                    uploadStream.end(file.buffer);
                });

                if (!result || !result.public_id) {
                    return res.status(500).json({ error: 'Failed to upload image to Cloudinary.' });
                }

                const imageName = result.public_id.split('/').pop();
                banner.banner_name = imageName;
            }
            const updateData = {
                banner_name: banner.banner_name,
                status: req.body.status
            };

            const updated = await bannerModel.update(updateData, {
                where: { banner_id: req.params.id }
            });

            if (updated[0] > 0) {
                const updatedItem = await bannerModel.findByPk(req.params.id);
                responseSend(res, updatedItem, "Đã Cập Nhật Thành Công!", 200);
            } else {
                responseSend(res, "", "Cập nhật không thành công!", 500);
            }
        } catch (error) {
            console.error("Error updating banner:", error);
            responseSend(res, "", "Có lỗi xảy ra!", 500);
        }
    });
};

const deletebanner = async (req, res) => {
    try {
        const banner = await bannerModel.findByPk(req.params.id);
        if (!banner) {
            return responseSend(res, "", "Banner không tồn tại!", 404);
        }
        if (banner.banner_name) {
            await cloudinary.uploader.destroy(`Banner/${banner.banner_name}`, function(error, result) {
                if (error) {
                    console.error("Lỗi khi xóa ảnh trên Cloudinary:", error);
                    return responseSend(res, "", "Có lỗi xảy ra khi xóa ảnh!", 500);
                }
                console.log("Kết quả xóa ảnh trên Cloudinary:", result);
            });
        }
        let deleted = await bannerModel.destroy({
            where: { banner_id: req.params.id }
        });

        if (deleted) {
            responseSend(res, "", "Đã Xóa Thành Công!", 200);
        } else {
            responseSend(res, "", "Không tìm thấy banner để xóa!", 404);
        }
    } catch (error) {
        console.error("Lỗi khi xóa banner:", error);
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

export {
    getbanner,
    getbannerById,
    createbanner,
    updatebanner,
    deletebanner
};