import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
import multer from 'multer';
let models = initModels(sequelize); 
let inforproduct = models.infor_product; 

const getinforproduct = async (req, res) => {
    try {
        let data = await inforproduct.findAll();
        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};
const getinFor = async (req, res) => {
    try {
      let data = await inforproduct.findAll();
      responseSend(res, data, "Thành công!", 200);
    } catch (error) {
      responseSend(res, "", "Có lỗi xảy ra!");
      console.log(error);
    }
  };
  
const getinforproductById = async (req, res) => {
    try {
        let data = await inforproduct.findByPk(req.params.id);
        if (data) {
            responseSend(res, data, "Thành công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const createinforproduct = async (req, res) => {
    try {
        const {
            infor_screen,
            infor_system,
            infor_cpu,
            infor_ram,
            infor_compan,
            infor_rom,
            infor_frontCamera,
            infor_rearCamera,
            infor_scanning_frequency,
            infor_chip_battery,
            infor_more
        }=req.body
        let newinforproduct = await inforproduct.create({
            infor_screen,
            infor_system,
            infor_cpu,
            infor_ram,
            infor_compan,
            infor_rom,
            infor_frontCamera,
            infor_rearCamera,
            infor_scanning_frequency,
            infor_chip_battery,
            infor_more});
        responseSend(res, newinforproduct, "Thêm Thành công!", 201);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const updateinforproduct = async (req, res) => {
    try {
        let updated = await inforproduct.update(req.body, {
            where: { infor_product: req.params.id }
        });
        if (updated[0] > 0) {
            responseSend(res, updated, "Đã Cập Nhật Thành Công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const deleteinforproduct = async (req, res) => {
    try {
        let deleted = await inforproduct.destroy({
            where: { infor_product: req.params.id }
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
    getinforproduct,
    getinforproductById,
    createinforproduct,
    updateinforproduct,
    deleteinforproduct,
    getinFor
};