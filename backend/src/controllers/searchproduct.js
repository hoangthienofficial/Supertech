import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
import { Op } from "sequelize";
// tìm kiếm theo link https://localhost:8080/timkiem?tukhoa="nhập từ khóa"
let models = initModels(sequelize);
let Products = models.products;
const searchProducts = async (req, res) => {
    try {
        const { tukhoa } = req.query;

        // Kiểm tra từ khóa hợp lệ
        if (!tukhoa || tukhoa.trim() === "") {
            return responseSend(res, "", "Từ khóa tìm kiếm không hợp lệ!", 400);
        }

        let products = await Products.findAll({
            where: sequelize.where(
                sequelize.fn('LOWER', sequelize.fn('TRIM', sequelize.col('product_name'))),
                'LIKE',
                '%' + tukhoa.trim().toLowerCase() + '%'
            ),
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
        });

        if (products.length > 0) {
            responseSend(res, products, "Thành công!", 200);
        } else {
            responseSend(res, "", "Không tồn tại sản phẩm nào!", 404);
        }
    } catch (error) {
        console.error(error);
        console.log(error);
        
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

export { searchProducts };