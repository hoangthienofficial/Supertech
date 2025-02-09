import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
import { Op } from "sequelize";
import e from "express";
import { uploadFields, uploadImages } from "./uploadController.js";
import cloudinary from "../config/cloudinaryConfig.js";
let models = initModels(sequelize);
let Products = models.products;

const getProducts = async (req, res) => {
  try {
    let data = await Products.findAll({
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

    responseSend(res, data, "Thành công!", 200);
  } catch (error) {
    responseSend(res, "", "Có lỗi xảy ra!", 500);
    console.log(error);
  }
};
const getProductsAdmin = async (req, res) => {
  try {
    let data = await Products.findAll({
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
            },
            {
              model: models.product_storage,
              as: "product_storages",
            },
            {
              model: models.product_quality,
              as: "product_qualities",
            },
          ],
          required: true, // Sản phẩm phải có màu sắc
        },
      ],
    });

    // Lọc các sản phẩm có màu sắc, kho chứa và chất lượng
    //   const filteredData = data.filter(product => {
    //     return product.product_qualities.quality_product> 0; // Kiểm tra có chất lượng
    //   });

    responseSend(res, data, "Thành công!", 200);
  } catch (error) {
    responseSend(res, "", "Có lỗi xảy ra!", 500);
    console.log(error);
  }
};
const getProductsByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Products.findAll({
      where: {
        category_id: categoryId,
      },
      include: [
        {
          model: models.comment_product,
          as: "comment_products",
          include: [
            {
              model: models.user,
              as: "user",
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
            },
            {
              model: models.product_storage,
              as: "product_storages",
              required: false,
            },
            {
              model: models.product_quality,
              as: "product_qualities",
            },
          ],
        },
      ],
    });
    if (products.length > 0) {
      responseSend(res, products, "Thành công!", 200);
    } else {
      responseSend(res, "", "không tồn tại !", 404);
    }
  } catch (error) {
    responseSend(res, "", "Có lỗi xảy ra khi truy vấn sản phẩm", 500);
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  try {
    await models.products.increment("view", {
      by: 1, // Tăng thêm 1
      where: { product_id: req.params.id }, // Áp dụng cho sản phẩm có id được truyền vào
    });
    let data = await Products.findByPk(req.params.id, {
      include: [
        //     {
        //     model: models.comment_product,
        //         as:'comment_products',
        //         include: [
        //             {
        //                 model: models.user,
        //                 as: 'user'
        //             }
        //         ]
        // },
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

            },
            {
              model: models.product_storage,
              as: "product_storages",
              required: false,
            },
            {
              model: models.product_quality,
              as: "product_qualities",
            },
          ],
        },
      ],
    });


    if (data) {
      responseSend(res, data, "Thành công!", 200);
    } else {
      responseSend(res, "", "không tồn tại !", 404);
    }
  } catch (error) {
    console.log(error);
    responseSend(res, "", "Có lỗi xảy ra!", 500);
  }
};
const getProductByIdCatelogryDad = async (req, res) => {
  const { category_dad, category } = req.query;

  try {
    const whereClause = {};

    if (category_dad) {
      whereClause.category_dad = category_dad;
    }

    // Add `category` to the where clause if it exists
    if (category) {
      whereClause.category_id = category;
    }

    const products = await Products.findAll({
   
      include: [
        {
          model: models.categories,
          as: "category",
          where: whereClause,
          attributes: [],
        },
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

    responseSend(res, products, "Products retrieved successfully!", 200);
  } catch (error) {
    responseSend(res, null, "Error retrieving products", 500);
  }
};
const getProductHot = async (req, res) => {
  try {
    const products = await models.products.findAll({
      where: { hot: { [Op.gt]: 0 } }, // Lấy các sản phẩm có trường hot > 0
      order: [["hot", "DESC"]], // Sắp xếp theo trường hot giảm dần
      limit: 8, // Giới hạn 8 sản phẩm
      include: [
        {
          model: models.product_colors,
          as: "product_colors",
          include: [
            {
              model: models.image_product,
              as: "image",
            },
          ],
        },
      ],
    });

    if (products.length > 0) {
      responseSend(res, products, "Thành công!", 200);
    } else {
      responseSend(res, [], "Không có sản phẩm hot!", 404);
    }
  } catch (error) {
    console.error(error);
    responseSend(res, "", "Có lỗi xảy ra!", 500);
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_price,
      product_discount,
      product_hot,

      category_id,

      moTa,
      infor_screen,
      infor_system,
      infor_cpu,
      infor_ram,
      infor_compan,
      image_id,
      infor_frontCamera,
      infor_rearCamera,
      infor_scanning_frequency,
      infor_chip_battery,
      listProductColor = [],
    } = req.body;

    let date = new Date();

    let newinforproduct = await models.infor_product.create({
      infor_screen,
      infor_system,
      infor_cpu,
      infor_ram,
      infor_more: moTa,
      infor_compan,

      infor_frontCamera,
      infor_rearCamera,
      infor_scanning_frequency,
      infor_chip_battery,
    });

    // Create `products` entry
    const newProduct = await Products.create({
      product_name,
      product_price,
      product_star: 0,
      product_discount,
      product_hot,
      product_date: date,
      infor_product: newinforproduct.infor_product,
      category_id,
    });

    // Create entries in `product_colors` and `product_storage`
    if (listProductColor.length > 0) {
      await Promise.all(
        listProductColor.map(async (order) => {
          // Create `product_colors` entry
          const createColors = await models.product_colors.create({
            color: order.color,
            quality: 0,
            product_id: newProduct.product_id,
            image_id: order.image_id,
          });

          // Check if `productStorage` exists within `order` and create `product_storage` entries
          if (order.productStorage && order.productStorage.length > 0) {
            await Promise.all(
              order.productStorage.map(async (storage) => {
                const newProductStorage = await models.product_storage.create({
                  color_id: createColors.color_id,
                  storage: storage.storage, // Link to `product_colors` entry
                  storage_quality: 0, // Replace with actual storage quality field
                  storage_price: storage.storage_price, // Replace with actual storage price field
                  product_id: newProduct.product_id,
                });

                // You can now access `storage_id` from the `newProductStorage`
                const storage_id = newProductStorage.id_storage; // This is the storage_id that you wanted to get

                // quality_id, quality_product, color_id, storage_id, product_id
                await models.product_quality.create({
                  quality_product: order.quantity,
                  color_id: createColors.color_id,
                  storage_id: storage_id, // Pass the storage_id here
                  product_id: newProduct.product_id,
                });
              })
            );
          }
        })
      );
    }

    responseSend(res, newProduct, "Thêm Thành công!", 201);
  } catch (error) {
    console.log(error);
    responseSend(res, "", "Có lỗi xảy ra!", 500);
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_price,
      product_discount,
      product_hot,
      category_id,
      moTa,
      infor_screen,
      infor_system,
      infor_cpu,
      infor_ram,
      infor_compan,
      image_id,
      infor_frontCamera,
      infor_rearCamera,
      infor_scanning_frequency,
      infor_chip_battery,
      listProductColor = [],
    } = req.body;

    const productId = req.params.id;
    console.log(infor_chip_battery);

    // Tìm sản phẩm cần cập nhật
    const product = await Products.findOne({
      where: { product_id: productId },
      include: [
        {
          model: models.infor_product,
          as: "infor_product_infor_product",
        },
        {
          model: models.product_colors,
          as: "product_colors",
          include: [
            { model: models.product_storage, as: "product_storages" },
            { model: models.product_quality, as: "product_qualities" },
          ],
        },
      ],
    });

    if (!product) {
      return responseSend(res, null, "Sản phẩm không tồn tại!", 404);
    }

    // Cập nhật thông tin sản phẩm
    await product.update({
      product_name,
      product_price,
      product_discount,
      product_hot,
      category_id,
    });

    // Cập nhật thông tin liên quan đến sản phẩm
    const productInfo = product.infor_product_infor_product;
    if (productInfo) {
      const createInfo = await productInfo.update({
        infor_screen,
        infor_system,
        infor_cpu,
        infor_ram,
        infor_more: moTa,
        infor_compan,
        infor_frontCamera,
        infor_rearCamera,
        infor_scanning_frequency,
        infor_chip_battery,
      });
      console.log(createInfo);
    }

    // Cập nhật hoặc xóa màu sắc và lưu trữ cũ nếu có
    if (listProductColor.length > 0) {
      await Promise.all(
        listProductColor.map(async (order) => {
          // Kiểm tra và cập nhật màu sắc sản phẩm
          let color = await models.product_colors.findOne({
            where: { product_id: productId, color: order.color },
          });

          if (color) {
            // Nếu có thay đổi image_id, xóa ảnh cũ trên Cloudinary
            if (color.image_id && color.image_id !== order.image_id) {
              await cloudinary.uploader.destroy(color.image_id);
            }

            // Cập nhật image_id mới
            await color.update({
              image_id: order.image_id, // Cập nhật image_id mới
            });
          } else {
            // Tạo màu sắc mới nếu không tìm thấy
            const newColor = await models.product_colors.create({
              color: order.color,
              product_id: productId,
              image_id: order.image_id,
            });

            // Tạo các bản ghi lưu trữ và chất lượng liên quan
            if (order.productStorage && order.productStorage.length > 0) {
              await Promise.all(
                order.productStorage.map(async (storage) => {
                  const newProductStorage = await models.product_storage.create(
                    {
                      color_id: newColor.color_id,
                      storage: storage.storage,
                      storage_quality: 0, // Replace with actual value
                      storage_price: storage.storage_price,
                      product_id: productId,
                    }
                  );

                  await models.product_quality.create({
                    quality_product: storage.quantity,
                    color_id: newColor.color_id,
                    storage_id: newProductStorage.id_storage,
                    product_id: productId,
                  });
                })
              );
            }
          }
        })
      );
    }

    responseSend(res, product, "Cập nhật sản phẩm thành công!", 200);
  } catch (error) {
    console.log("Lỗi khi cập nhật sản phẩm:", error);
    responseSend(res, null, "Có lỗi xảy ra khi cập nhật sản phẩm!", 500);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Tìm sản phẩm với ID từ tham số URL và bao gồm thông tin chi tiết liên quan
    const product = await Products.findOne({
      where: { product_id: productId },
      include: [
        {
          model: models.infor_product, // Quan hệ với infor_product
          as: "infor_product_infor_product",
        },
        {
          model: models.product_colors,
          as: "product_colors",
          include: [
            { model: models.product_storage, as: "product_storages" },
            { model: models.product_quality, as: "product_qualities" },
          ],
        },
      ],
    });

    if (!product) {
      return responseSend(res, null, "Sản phẩm không tồn tại!", 404);
    }

    // Bắt đầu xóa các dữ liệu liên quan đến sản phẩm
    // Xóa tất cả product_quality liên quan đến sản phẩm
    await models.product_quality.destroy({
      where: { product_id: productId },
    });

    // Xóa tất cả product_storage liên quan đến sản phẩm
    await models.product_storage.destroy({
      where: { product_id: productId },
    });

    // Xóa tất cả product_colors liên quan đến sản phẩm
    await models.product_colors.destroy({
      where: { product_id: productId },
    });

    // Xóa infor_product liên quan đến sản phẩm
    if (product.infor_product_infor_product) {
      await models.infor_product.destroy({
        where: {
          infor_product: product.infor_product_infor_product.infor_product,
        },
      });
    }

    // Xóa hình ảnh từ Cloudinary (nếu có)
    const imageFields = ["image_one", "image_two", "image_three", "image_four"];
    for (const productColor of product.product_colors) {
      for (const field of imageFields) {
        const imageId = productColor[field];
        if (imageId) {
          // Xóa hình ảnh từ Cloudinary
          await cloudinary.uploader.destroy(imageId);
        }
      }

      // Xóa bản ghi hình ảnh (image_id) từ cơ sở dữ liệu nếu có
      if (productColor.image_id) {
        await models.image_product.destroy({
          where: { image_id: productColor.image_id },
        });
      }
    }

    // Cuối cùng xóa sản phẩm chính
    await Products.destroy({
      where: { product_id: productId },
    });

    responseSend(res, product, "Xóa sản phẩm thành công!", 200);
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    responseSend(res, null, "Có lỗi xảy ra khi xóa sản phẩm!", 500);
  }
};
const deleteProductColor = async (req, res) => {
  const productIdColor = req.params.id;
  await models.product_quality.destroy({
    where: { color_id: productIdColor },
  });

  // Xóa tất cả product_storage liên quan đến sản phẩm
  await models.product_storage.destroy({
    where: { color_id: productIdColor },
  });

  // Xóa tất cả product_colors liên quan đến sản phẩm
  await models.product_colors.destroy({
    where: { color_id: productIdColor },
  });

  // Xóa hình ảnh từ Cloudinary (nếu có)
    // const imageFields = ['image_one', 'image_two', 'image_three', 'image_four'];
    // for (const productColor of product.product_colors) {
    //     for (const field of imageFields) {
    //         const imageId = productColor[field];
    //         if (imageId) {
    //             // Xóa hình ảnh từ Cloudinary
    //             await cloudinary.uploader.destroy(imageId);
    //         }
    //     }

    //     // Xóa bản ghi hình ảnh (image_id) từ cơ sở dữ liệu nếu có
    //     if (productColor.image_id) {
    //         await models.image_product.destroy({
    //             where: { image_id: productColor.image_id }
    //         });
    //     }
    // }
  responseSend(res, "", "Xóa sản phẩm thành công!", 200);
};
const updateQualityProduct = async (req, res) => {
  try {
    const productColorId = req.params.id;
    const { data } = req.body;

    console.log("Product Color ID:", productColorId);

    // Tìm sản phẩm trong cơ sở dữ liệu
    const product = await models.product_quality.findOne({
      where: { color_id: productColorId },
    });

    const productColor = await models.product_colors.findOne({
      where: { color_id: productColorId },
      include: {
        model: models.product_storage,
        as: "product_storages",
      },
    });

    if (!productColor) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông tin sản phẩm!",
      });
    }

    // Kiểm tra nếu product_storages không rỗng
    if (
      !productColor.product_storages ||
      productColor.product_storages.length === 0
    ) {
      console.log("Không tìm thấy kho. Đang tạo kho mới...");

      // Tự động thêm một kho mới
      const newStorage = await models.product_storage.create({
        product_id: productColor.product_id,
        storage_name: `Kho mặc định cho color_id ${productColorId}`,
      });

      // Gán kho mới vào productColor.product_storages
      productColor.product_storages = [newStorage];
    }

    if (product) {
      // Nếu sản phẩm tồn tại, thực hiện cập nhật
      await product.update({
        quality_product: data.quality_product,
      });
      res.status(200).json({
        success: true,
        message: "Cập nhật sản phẩm thành công!",
      });
    } else {
      // Nếu sản phẩm không tồn tại, tạo mới
      await models.product_quality.create({
        color_id: productColorId,
        storage_id: productColor.product_storages[0].id_storage, // Đảm bảo có kho hợp lệ
        product_id: productColor.product_id,
        quality_product: data.quality_product || 1,
      });
      res.status(201).json({
        success: true,
        message: "Tạo mới sản phẩm thành công!",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi cập nhật sản phẩm!",
    });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  getProductByIdCatelogryDad,
  deleteProductColor,
  getProductsAdmin,
  updateQualityProduct,
  getProductHot
};
