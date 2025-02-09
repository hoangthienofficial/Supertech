import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
import { col, fn, Op } from "sequelize";
import multer from 'multer';
import path from 'path';
import cloudinary from '../config/cloudinaryConfig.js';
let models = initModels(sequelize); 
let categoriesModel = models.categories; 

const getcategories = async (req, res) => {
    try {
        let data = await categoriesModel.findAll();
        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        console.log(error);
        
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};
const getcategory_dad = async (req, res) => {
try {
    let data = await categoriesModel.findAll({
        attributes: ['category_dad'],
        group: ['category_dad'],
        include:[
            {
                model:models.products,
                as:"products",
                
            }
        ]
        
    });
    responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};
const getcategory_dadId = async (req, res) => {
    try {
        const categoryDadId = req.params.id; 
        let data = await categoriesModel.findAll({
            where: { category_dad: categoryDadId }, 
            // attributes: ['category_name'] 
        });
        if (data.length === 0) {
            responseSend(res, "", "Không tìm thấy !", 404);
        } else {
            responseSend(res, data, "Thành công!", 200);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};
const getcategoriesById = async (req, res) => {
    try {
        let data = await categoriesModel.findByPk(req.params.id);
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
const upload = multer({ storage: storage }).single('category_image');

const createcategories = async (req, res) => {
    const { category_name, category_dad } = req.body;
        if (!category_name) {
            return responseSend(res, "", "Tên danh mục là bắt buộc!", 400);
        }
        const date_task = new Date();
        // Tạo danh mục mới
        let newCategory = await categoriesModel.create({
            category_name,
            category_dad: category_dad || null,
            category_date_task: date_task || null,
        });

        responseSend(res, newCategory, "Thêm danh mục thành công!", 201)
   
};


const updatecategories = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error("Lỗi Tải Ảnh:", err);
            return responseSend(res, "", err.message || "Lỗi tải file!", 400);
        }
 
        const { category_name, category_dad, category_task } = req.body;
        if (!category_name) {
            return responseSend(res, "", "Tên danh mục là bắt buộc!", 400);
        }

        try {
  
            const existingCategory = await categoriesModel.findByPk(req.params.id);
            if (!existingCategory) {
                return responseSend(res, "", "Danh mục không tồn tại!", 404);
            }
 
            let newImageName = existingCategory.category_image;
 
            if (req.file) {
 
                if (existingCategory.category_image) {
                    try {
                        await new Promise((resolve, reject) => {
                            cloudinary.uploader.destroy(
                                `Category/${existingCategory.category_image}`, 
                                (error, result) => {
                                    if (error) reject(error);
                                    else resolve(result);
                                }
                            );
                        });
                    } catch (deleteError) {
                        console.error('Lỗi xóa ảnh cũ:', deleteError);
                    }
                }
 
                const file = req.file;
                const originalName = path.parse(file.originalname).name;
                
                const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        {
                            folder: 'Category',
                            resource_type: 'image',
                            public_id: originalName
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    ).end(file.buffer);
                });
 
                newImageName = result.public_id.split('/').pop();
            }
 
            const updateData = {
                category_name,
                category_dad: category_dad || null,
                category_task: category_task || null,
                category_image: newImageName  
            };
 
            let [updated] = await categoriesModel.update(updateData, {
                where: { category_id: req.params.id }
            });
 
            let updatedItem = await categoriesModel.findByPk(req.params.id);

            console.log("Dữ liệu cập nhật:", updatedItem.toJSON()); 

            responseSend(res, updatedItem, "Đã Cập Nhật Thành Công!", 200);
        } catch (error) {
            console.error("Lỗi cập nhật danh mục:", error);

            if (error.name === 'SequelizeValidationError') {
                return responseSend(res, "", "Dữ liệu không hợp lệ!", 400);
            }
            
            responseSend(res, "", "Có lỗi xảy ra!", 500);
        }
    });
};

const deletecategories = async (req, res) => {
    try {
 
        let categoryIds;
 
        if (req.query.ids) {
 
            if (typeof req.query.ids === 'string') {
                try {
                    categoryIds = JSON.parse(req.query.ids);
                } catch (parseError) {
 
                    categoryIds = req.query.ids.split(',').map(id => parseInt(id.trim()));
                }
            } 
 
            else if (Array.isArray(req.query.ids)) {
                categoryIds = req.query.ids.map(id => parseInt(id));
            }
        } 
 
        else if (req.params.id) {
            categoryIds = [parseInt(req.params.id)];
        }
 
        categoryIds = categoryIds.filter(id => !isNaN(id) && id > 0);

        if (!categoryIds || categoryIds.length === 0) {
            return responseSend(res, "", "Không có ID nào để xóa!", 400);
        }
 
        const relatedProducts = await models.products.findAll({
            where: {
                category_id: categoryIds
            }
        });

        if (relatedProducts.length > 0) {
            return responseSend(res, "", "Bạn cần xóa sản phẩm trước khi xóa loại!", 200);
        }
 
        const categoriesToDelete = await categoriesModel.findAll({
            where: {
                category_id: categoryIds
            }
        });
 
        const cloudinaryDeletePromises = categoriesToDelete
            .filter(category => category.category_image)
            .map(category => 
                new Promise((resolve, reject) => {
                    cloudinary.uploader.destroy(
                        `Category/${category.category_image}`, 
                        (error, result) => {
                            if (error) {
                                console.error(`Lỗi xóa ảnh ${category.category_image}:`, error);
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                })
            );
 
        try {
            await Promise.all(cloudinaryDeletePromises);
        } catch (cloudinaryError) {
            console.error('Lỗi xóa ảnh trên Cloudinary:', cloudinaryError);
        }
 
        let deleted = await categoriesModel.destroy({
            where: {
                category_id: categoryIds
            }
        });

        if (deleted) {
            return responseSend(res, deleted, "Đã Xóa Thành Công!", 200);
        } else {
            return responseSend(res, "", "Không tìm thấy danh mục nào để xóa!", 404);
        }
    } catch (error) {
        console.error(error);
        return responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};


export {
    getcategories,
    getcategoriesById,
    createcategories,
    updatecategories,
    deletecategories,
    getcategory_dadId,
    getcategory_dad
};