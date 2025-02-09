import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";

let models = initModels(sequelize); 
let chatModel = models.chat; 

const getchat = async (req, res) => {
    try {
        let data = await chatModel.findAll();
        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const getchatById = async (req, res) => {
    try {
        let data = await chatModel.findByPk(req.params.id);
        if (data) {
            responseSend(res, data, "Thành công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const createchat = async (req, res) => {
    try {
        let newmediapost = await chatModel.create(req.body);
        responseSend(res, newmediapost, "Thêm Thành công!", 201);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const updatechat = async (req, res) => {
    try {
        let updated = await chatModel.update(req.body, {
            where: { chat_id: req.params.id }
        });
        if (updated[0] > 0) {
            let updatedItem = await chatModel.findByPk(req.params.id);
            responseSend(res, updatedItem, "Đã Cập Nhật Thành Công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        console.error("Error updating comment:", error);
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const deletechat = async (req, res) => {
    try {
        let deleted = await chatModel.destroy({
            where: { chat_id: req.params.id } 
        });
        if (deleted) {
            responseSend(res, deleted, "Đã Xóa Thành Công!", 200);
        } else {
            responseSend(res, "", "không tìm thấy !", 404);
        }
    } catch (error) {
        console.log(error.message);
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

export {
    getchat,
    getchatById,
    createchat,
    updatechat,
    deletechat
};