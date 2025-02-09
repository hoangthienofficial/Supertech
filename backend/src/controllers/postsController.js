import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";

let models = initModels(sequelize);
let Posts = models.posts;

const getPosts = async (req, res) => {
    try {
        let data = await Posts.findAll({
            include:[
                {
                    model: models.media_post,
                    as: 'media_posts',
                },
                
            ]
        });
        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const getPostsById = async (req, res) => {
    try {
        const data = await Posts.findByPk(req.params.id, {
            include: [
                {
                    model: models.media_post,
                    as: 'media_posts', // Alias must match your association definition
                },
            ],
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

const createPosts = async (req, res) => {
    try {
        let newPosts = await Posts.create(req.body);
        responseSend(res, newPosts, "Thêm Thành công!", 201);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const updatePosts = async (req, res) => {
    try {
        console.log(req.body);
        
        let updated = await Posts.update(req.body, {
            where: { post_id: req.params.id }
        });
      responseSend(res, updated, "Cập nhật Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const deletePosts = async (req, res) => {
    try {
        let deleted = await Posts.destroy({
            where: { post_id: req.params.id }
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
    getPosts,
    getPostsById,
    createPosts,
    updatePosts,
    deletePosts
};