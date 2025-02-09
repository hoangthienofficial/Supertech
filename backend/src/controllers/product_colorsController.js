import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
import cloudinary from '../config/cloudinaryConfig.js';
let models = initModels(sequelize); 
let Products_color = models.product_colors; 
let Image_product = models.image_product;
const getProduct_colors= async (req, res) => {
    try {
        let data = await Products_color.findAll();
        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const getProduct_colorsById = async (req, res) => {
    try {
        let data = await Products_color.findByPk(req.params.id);
        if (data) {
            responseSend(res, data, "Thành công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const createProduct_colors = async (req, res) => {
    try {
        const {
            color,
            quality,
            image_id,
            product_id
        } = req.body;

        const newProduct = await Products_color.create({
            color,
            quality,
            image_id,
            product_id
        });
        responseSend(res, newProduct, "Thêm Thành công!", 201);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const updateProduct_colors = async (req, res) => {
    try {
        const color_id = req.params.id;
        const {
            color,
            quality,
            image_id,
            product_id
        } = req.body;

        const product_color = await Products_color.findByPk(color_id);
        if (!product_color) {
            return res.status(404).json({
                message: "Color not found",
                success: false
            });
        }
        product_color.color = color;
        product_color.quality = quality;
        product_color.image_id = image_id;
        product_color.product_id = product_id;

        await product_color.save();

        responseSend(res, product_color, "Đã Cập Nhật Thành Công!", 200);
    } catch (error) {
        console.error("Error updating product color:", error);
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const deleteProduct_colors = async (req, res) => {
    try {
        const productColor = await Products_color.findOne({
            where: { color_id: req.params.id },
            include: [{
                model: Image_product,
                as: 'image'
            }]
        });

        if (!productColor) {
            responseSend(res, "", "không tìm thấy màu sản phẩm!", 404);
            return;
        }
        const imageFields = ['image_one', 'image_two', 'image_three', 'image_four'];
        if (productColor.image) {
            for (const field of imageFields) {
                const imageId = productColor.image[field];
                if (imageId) {
                    await cloudinary.uploader.destroy(imageId);
                }
            }
        }
        if (productColor.image_id) {
            await Image_product.destroy({
                where: { image_id: productColor.image_id }
            });
        }
        let deleted = await productColor.destroy();
        if (!deleted) {
            responseSend(res, "", "Lỗi khi xóa màu sản phẩm!", 500);
            return;
        }
        const productId = productColor.product_id;
        if (productId) {
            await models.products.destroy({
                where: { product_id: productId }
            });
            responseSend(res, "", "Đã Xóa Thành Công Cả Sản Phẩm Liên Quan!", 200);
        } else {
            responseSend(res, "", "Đã Xóa Thành Công Màu Sản Phẩm, Nhưng Không Tìm Thấy Sản Phẩm Liên Quan Để Xóa!", 200);
        }
    } catch (error) {
        console.error("Lỗi Khi Xóa Màu Sản Phẩm - KIỂU LỖI:", error);
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};
export {
    getProduct_colors,
    getProduct_colorsById,
    createProduct_colors,
    updateProduct_colors,
    deleteProduct_colors
};