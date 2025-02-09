import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
import { Op } from "sequelize";

let models = initModels(sequelize); 
let favoriteproduct = models.favorite_product; 

const getfavoriteproduct = async (req, res) => {
    try {
        const user_id = req.id;

        let data = await favoriteproduct.findAll({
            where: {
                user_id
            },
            include: [
                {
                    model: models.products,
                    as: "product",
                  include: [
                         {
                           model: models.comment_product,
                           as: "comment_products",
                           include: [
                             {
                               model: models.user,
                               as: "user",
                               attributes: { exclude: ["user_password", "user_phone"] },
                             },
                           ],
                         },
                         {
                           model: models.infor_product,
                           as: "infor_product_infor_product",
                         },
                         {
                           model: models.product_colors,
                           as: "product_colors",
                           include: [
                             {
                               model: models.image_product,
                               as: "image",
                               required: true,
                             },
                             {
                               model: models.product_storage,
                               as: "product_storages",
                             },
                             {
                               model: models.product_quality,
                               as: "product_qualities",
                               where: {
                                 quality_product: { [Op.gt]: 0 }, // Điều kiện: quality_product > 0
                               },
                               required: true, // Sản phẩm phải có chất lượng hợp lệ
                             },
                           ],
                           required: true, // Sản phẩm phải có màu sắc
                         },
                       ],
                }
            ]
        });

        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
        console.log(error);
    }
};

const getfavoriteproductById = async (req, res) => {
    try {
        const user_id=req.id;
 
        let data = await favoriteproduct.findOne({
            where:{
                user_id,
                product_id:req.params.id
            },
            include:[
                {
                    model:models.products,
                    as:"product",
                }
            ]
        });
        if (data) {
            responseSend(res, data, "Thành công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const createDetelefavoriteproduct = async (req, res) => {
    try {
        const user_id=req.id;
        const {product_id}=req.body
        const newCreateFavouriteProduct={
            user_id,
            product_id,
        }
        const existingLike = await favoriteproduct.findOne({
            where: { user_id, product_id },
          });
      
          if (existingLike) {
            
            await existingLike.destroy();
            return         responseSend(res, existingLike, "Xóa Thành công!", 201);

          }
      
        let newfavoriteproduct = await favoriteproduct.create(newCreateFavouriteProduct);
        responseSend(res, newfavoriteproduct, "Thêm Thành công!", 201);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const updatefavoriteproduct = async (req, res) => {
    try {
        let updated = await favoriteproduct.update(req.body, {
            where: { favorite_product_id: req.params.id }
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

const deletefavoriteproduct = async (req, res) => {
    try {
        
        let deleted = await favoriteproduct.destroy({
            where: { favorite_product_id: req.params.id }
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
    getfavoriteproduct,
    getfavoriteproductById,
    createDetelefavoriteproduct,
    updatefavoriteproduct,
    deletefavoriteproduct
};