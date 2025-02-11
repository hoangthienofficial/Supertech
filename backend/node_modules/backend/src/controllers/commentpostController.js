import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";

let models = initModels(sequelize); 
let commentpostModel = models.comment_posts; 

const getcommentpost = async (req, res) => {
    try {
        let data = await commentpostModel.findAll();
        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const getcommentpostById = async (req, res) => {
    try {
        let data = await commentpostModel.findByPk(req.params.id);
        if (data) {
            responseSend(res, data, "Thành công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const createcommentpost = async (req, res) => {
    try {
        let newmediapost = await commentpostModel.create(req.body);
        responseSend(res, newmediapost, "Thêm Thành công!", 201);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const updatecommentpost = async (req, res) => {
    try {
        let updated = await commentpostModel.update(req.body, {
            where: { comment_post_id: req.params.id }
        });
        if (updated[0] > 0) {
            let updatedItem = await commentpostModel.findByPk(req.params.id);
            responseSend(res, updatedItem, "Đã Cập Nhật Thành Công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        console.error("Error updating comment:", error);
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const deletecommentpost = async (req, res) => {
    try {
        let deleted = await commentpostModel.destroy({
            where: { comment_post_id: req.params.id }
        });
        if (deleted) {
            responseSend(res, deleted, "Đã Xóa Thành Công!", 200);
        } else {
            responseSend(res, "", "không tìm thấy !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

export {
    getcommentpost,
    getcommentpostById,
    createcommentpost,
    updatecommentpost,
    deletecommentpost
};