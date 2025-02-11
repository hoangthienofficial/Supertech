import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
import { Op } from "sequelize";
import { io } from "../socker/socker.js";

let models = initModels(sequelize); 
let commentProductModel = models.comment_product; 

const getcommentproduct = async (req, res) => {
    try {
        let data = await commentProductModel.findAll();
        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const getcommentproductById = async (req, res) => {

    try {
        let data = await commentProductModel.findByPk(req.params.id,{
            model: models.user,
            as: 'user' // Bao gồm replies cho mỗi comment
        });
        if (data) {
            responseSend(res, data, "Thành công!", 200);
        } else {
            responseSend(res, [], "Thành công!", 200);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};
const getCommentProductByIdProduct = async (req, res) => {
    try {
      const product_id = req.params.id; // Lấy product_id từ URL
      let data = await commentProductModel.findAll({
        where: {
          product_id: product_id, // Lọc theo product_id
        },
        include: [
          {
            model: models.user, // Kết hợp bảng user
            as: 'user', // Alias cho kết hợp bảng
          },
          {
            model: models.likes, // Kết hợp bảng user
            as: 'likes', // Alias cho kết hợp bảng
          },
          {
            model: models.replies_comment_product, // Kết hợp bảng user
            as: 'replies_comment_products', // Alias cho kết hợp bảng
            include:[
              {
                model: models.user, // Kết hợp bảng user
                as: 'user', // Alias cho kết hợp bảng
              },
              {
                model: models.likes, // Kết hợp bảng user
                as: 'likes', // Alias cho kết hợp bảng
              },
            ]
          },
          
        ],
      });
  
      if (data.length > 0) {
        responseSend(res, data, "Thành công!", 200);
      } else {
        responseSend(res, [], "Thành công!", 200);      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
  };
  const createcommentproduct = async (req, res) => {
    try {
      const user_id = req.id; // Lấy user_id từ middleware xác thực
      const { comment_content, comment_star, product_id } = req.body;
  
     
  
      // Tạo comment mới
      const newComment = await commentProductModel.create({
        user_id,
        product_id,
        comment_content,
        comment_star,
        comment_date: new Date(),
      });
  
      // Lấy dữ liệu bình luận chi tiết để gửi qua Socket.IO
      const fullComment = await commentProductModel.findByPk(newComment.comment_id, {
        include: [
          { model: models.user, as: 'user' },
          { model: models.products, as: 'product' },
        ],
      });
  
      // Phát sự kiện tới các client
      io.emit('new_comment', fullComment);
  
      // Phản hồi lại client
      responseSend(res, newComment, "Thêm thành công!", 201);
    } catch (error) {
      console.error("Error creating comment:", error);
      responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
  };
  

  const updatecommentproduct = async (req, res) => {
    try {
        const user_id = req.id;
        const { comment_content } = req.body;
        console.log(comment_content);
        
        const comment_id = +req.params.id;

        if (!comment_content) {
            return responseSend(res, "", "Nội dung bình luận không được để trống!", 400);
        }

        const newComment = {
            comment_content,
            comment_date: new Date()
        };

        const [updatedCount] = await commentProductModel.update(newComment, {
            where: { comment_id, user_id }
        });

        if (updatedCount > 0) {
            const updatedItem = await commentProductModel.findByPk(comment_id);
            responseSend(res, updatedItem, "Đã Cập Nhật Thành Công!", 200);
        } else {
            responseSend(res, "", "Bình luận không tồn tại hoặc không thuộc về người dùng này!", 404);
        }
    } catch (error) {
        console.error("Error updating comment:", error);
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const deletecommentproduct = async (req, res) => {
    try {
        const id=req.params.id;
    
        
        let deleted = await commentProductModel.destroy({
            where: { comment_id:id}
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
const likeComment = async (req, res) => {


  try {
    const user_id = req.id;
    const commentId = req.params.id;
    // Check if the like already exists
    const existingLike = await models.likes.findOne({
      where: { user_id, comment_id	:commentId },
    });

    if (existingLike) {
      // If like exists, remove it (unlike)
      await existingLike.destroy();
      return res.status(200).json({ message: "Comment unliked" });
    }

    // If not liked yet, create a new like
    await models.likes.create({ user_id, comment_id	:commentId });
    res.status(201).json({ message: "Comment liked" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
const getLikeUser = async (req, res) => {
  try {
    let id=req.params.id;

    
    // Giả sử bạn có model `Like`
    const likes = await models.likes.findAll({
      attributes: ['like_id',"user_id",'comment_id'], // Chỉ lấy cột comment_id

      where: {
        comment_id: {
          [Op.ne]: null, // Điều kiện user_id không phải null
  
        },
        comment_id: id, // Điều kiện comment_id bằng 7

      },
    });

    responseSend(res, likes, "Thành công!", 200);

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu.' });
  }
};
export {
    getcommentproduct,
    getcommentproductById,
    createcommentproduct,
    updatecommentproduct,
    getCommentProductByIdProduct,
    deletecommentproduct,
    likeComment,
    getLikeUser
};