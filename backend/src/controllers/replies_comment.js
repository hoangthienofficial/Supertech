import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";

let models = initModels(sequelize); 
let repliesCommentProduct = models.replies_comment_product; 

const getcommentpost = async (req, res) => {
    try {
        let data = await repliesCommentProduct.findAll();
        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const getcommentpostById = async (req, res) => {
    try {
        let data = await repliesCommentProduct.findByPk(req.params.id);
        if (data) {
            responseSend(res, data, "Thành công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const createRepliesComment = async (req, res) => {
    try {
      const user_id = req.id; // Lấy user_id từ middleware
      const { comment, comment_id } = req.body; // Lấy dữ liệu từ body
  
      // Tạo reply comment mới
      const newComment = await repliesCommentProduct.create({
        user_id,
        comment_id,
        comment,
        repiles_date: new Date()
      });
  

      // Phản hồi về client
      responseSend(res, newComment, "Thêm thành công!", 201);
    } catch (error) {
      console.log("Error creating reply comment:", error); // Log chi tiết lỗi
      responseSend(res, null, "Có lỗi xảy ra!", 500);
    }
  };
  
const updateCommentReply = async (req, res) => {
    try {
        const { comment   } = req.body;
        const newRepliesComment={
            comment
        }
        let updated = await repliesCommentProduct.update(newRepliesComment, {
            where: { id: req.params.id }
        });
        if (updated[0] > 0) {
            let updatedItem = await repliesCommentProduct.findByPk(req.params.id);
            responseSend(res, updatedItem, "Đã Cập Nhật Thành Công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        console.error("Error updating comment:", error);
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const deleteCommentReply = async (req, res) => {
    try {
        let deleted = await repliesCommentProduct.destroy({
            where: { id: req.params.id }
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
    createRepliesComment,
    updateCommentReply,
    deleteCommentReply
};