import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
import multer from "multer";
import path from "path";
import cloudinary from "../config/cloudinaryConfig.js";
let models = initModels(sequelize);
let mediapost = models.media_post;
let posts = models.posts;

const getmediapost = async (req, res) => {
  try {
    let data = await mediapost.findAll();
    responseSend(res, data, "Thành công!", 200);
  } catch (error) {
    responseSend(res, "", "Có lỗi xảy ra!", 500);
  }
};
const getBlog = async () => {
  try {
    const [postsBlog, mediapostBlog] = await Promise.all([
      posts.findAll(),
      mediapost.findAll(),
    ]);
    const mergedData = postsBlog.map((post) => {
      const media = mediapostBlog.find(
        (media) => media.post_id == post.post_id
      );
      if (media) {
        return {
          ...post.dataValues, // Dữ liệu từ post
          media_url: media.media_url, // Gắn thêm media_url từ mediapost
        };
      }

      return post.dataValues;
    });
    return mergedData;
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (data) => {
  try {
    const Image_cloudinary = await mediapost.findOne({
      where: { post_id: data },
      attributes: ["media_url"],
    });

    await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        `Blog/${Image_cloudinary?.media_url}`,
        (error, result) => {
          if (error) {
            console.error(`Lỗi xóa ảnh ${media?.media_url}:`, error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    await posts.destroy({
      where: { post_id: data },
    });
    await mediapost.destroy({
      where: { post_id: data },
    });
    const [postsBlog, mediapostBlog] = await Promise.all([
      posts.findAll(),
      mediapost.findAll(),
    ]);
    const mergedData = postsBlog.map((post) => {
      const media = mediapostBlog.find(
        (media) => media.post_id == post.post_id
      );
      if (media) {
        return {
          ...post.dataValues,
          media_url: media.media_url,
        };
      }

      return post.dataValues;
    });
    return mergedData;
  } catch (error) {
    console.log(error);
  }
};
const getmediapostById = async (req, res) => {
  try {
    let data = await mediapost.findByPk(req.params.id);
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
const upload = multer({ storage: storage }).single("media_url");
const createmediapost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Upload error:", err);
      return responseSend(res, "", err.message || "Lỗi tải file!", 400);
    }

    if (!req.file) {
      return responseSend(res, "", "Không có file được tải lên!", 400);
    }

    try {
      const file = req.file;
      const originalName = path.parse(file.originalname).name;

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "Blog",
              resource_type: "image",
              public_id: originalName,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(file.buffer);
      });

      const imageName = result.public_id.split("/").pop();
      const date_task = new Date();

      console.log("Request body:", req.body);
      console.log("Post ID:", req.body.post_id);

      let newMediaPost = await mediapost.create({
        media_url: imageName,
        post_id: req.body.post_id,
      });

      responseSend(res, newMediaPost, "Thêm Thành công!", 201);
    } catch (error) {
      console.error("Lỗi tạo media post:", error);

      if (error.name === "SequelizeValidationError") {
        return responseSend(res, "", "Dữ liệu không hợp lệ!", 400);
      }

      responseSend(res, "", "Có lỗi xảy ra khi tạo media post!", 500);
    }
  });
};

const updatemediapost = async (req, res) => {
  upload(req, res, async (err) => {
    // Xử lý lỗi upload
    if (err) {
      console.error("Lỗi Tải Ảnh:", err);
      return responseSend(res, "", err.message || "Lỗi tải file!", 400);
    }

    // Validate dữ liệu
    const { post_id } = req.body;
    if (!post_id) {
      return responseSend(res, "", "Post ID là bắt buộc!", 400);
    }

    try {
      // Tìm media post hiện tại
      const existingMediaPost = await mediapost.findByPk(req.params.id);
      if (!existingMediaPost) {
        return responseSend(res, "", "Media post không tồn tại!", 404);
      }

      // Biến lưu tên ảnh mới
      let newImageName = existingMediaPost.media_url;

      // Nếu có file mới upload
      if (req.file) {
        // Xóa ảnh cũ trên Cloudinary nếu tồn tại
        if (existingMediaPost.media_url) {
          try {
            await new Promise((resolve, reject) => {
              cloudinary.uploader.destroy(
                `Blog/${existingMediaPost.media_url}`,
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              );
            });
          } catch (deleteError) {
            console.error("Lỗi xóa ảnh cũ:", deleteError);
          }
        }

        const file = req.file;
        const originalName = path.parse(file.originalname).name;

        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "Blog",
                resource_type: "image",
                public_id: originalName,
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(file.buffer);
        });

        newImageName = result.public_id.split("/").pop();
      }

      const updateData = {
        post_id,
        media_url: newImageName,
      };

      let [updated] = await mediapost.update(updateData, {
        where: { media_id: req.params.id },
      });

      let updatedItem = await mediapost.findByPk(req.params.id);

      console.log("Dữ liệu cập nhật:", updatedItem.toJSON());

      responseSend(res, updatedItem, "Đã Cập Nhật Thành Công!", 200);
    } catch (error) {
      console.error("Lỗi cập nhật media post:", error);

      if (error.name === "SequelizeValidationError") {
        return responseSend(res, "", "Dữ liệu không hợp lệ!", 400);
      }

      responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
  });
};

const deletemediapost = async (req, res) => {
  try {
    let mediaPostIds;

    if (req.query.ids) {
      if (typeof req.query.ids === "string") {
        try {
          mediaPostIds = JSON.parse(req.query.ids);
        } catch (parseError) {
          mediaPostIds = req.query.ids
            .split(",")
            .map((id) => parseInt(id.trim()));
        }
      } else if (Array.isArray(req.query.ids)) {
        mediaPostIds = req.query.ids.map((id) => parseInt(id));
      }
    } else if (req.params.id) {
      mediaPostIds = [parseInt(req.params.id)];
    }

    mediaPostIds = mediaPostIds.filter((id) => !isNaN(id) && id > 0);

    if (!mediaPostIds || mediaPostIds.length === 0) {
      return responseSend(res, "", "Không có ID nào để xóa!", 400);
    }

    const mediaPostsToDelete = await mediapost.findAll({
      where: {
        media_id: mediaPostIds,
      },
    });

    const cloudinaryDeletePromises = mediaPostsToDelete
      .filter((media) => media.media_url)
      .map(
        (media) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(
              `Blog/${media.media_url}`,
              (error, result) => {
                if (error) {
                  console.error(`Lỗi xóa ảnh ${media.media_url}:`, error);
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
      console.error("Lỗi xóa ảnh trên Cloudinary:", cloudinaryError);
    }

    let deleted = await mediapost.destroy({
      where: {
        media_id: mediaPostIds,
      },
    });

    if (deleted) {
      responseSend(res, deleted, "Đã Xóa Thành Công!", 200);
    } else {
      responseSend(res, "", "Không tìm thấy media post!", 404);
    }
  } catch (error) {
    console.error("Lỗi xóa media post:", error);
    responseSend(res, "", "Có lỗi xảy ra!", 500);
  }
};

export {
  getmediapost,
  getmediapostById,
  createmediapost,
  updatemediapost,
  deletemediapost,
  getBlog,
  deleteBlog,
};
