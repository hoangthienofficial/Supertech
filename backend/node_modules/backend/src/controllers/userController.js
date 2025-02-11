import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import { sendMail } from "../config/mail.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcryptjs";
import {
  createToken,
  createTokenRef,
  decodeToken,
  verifyToken,
} from "../config/jwt.js";
import { deleteFile, upload } from "../config/upload.js";
import path from "path";
import nodemailer from "nodemailer";
import { Op } from "sequelize";
import { startOfWeek, endOfWeek } from "date-fns";
import jwt from "jsonwebtoken";

let models = initModels(sequelize);
let User = models.user;
const refreshTokens = [];

const getUser = async (req, res) => {
  try {
    let data = await User.findAll();
    responseSend(res, data, "Thành công!", 200);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    res.status(500).json({
      message: "Lỗi",
      success: false,
    });
  }
};
const getNewCustomersThisWeek = async (req, res) => {
  try {
    const today = new Date();

    // Tính ngày bắt đầu và kết thúc tuần hiện tại
    const thisWeekStart = startOfWeek(today, { weekStartsOn: 1 }); // Thứ Hai
    const thisWeekEnd = endOfWeek(today, { weekStartsOn: 1 }); // Chủ Nhật

    // Truy vấn dữ liệu từ DB
    const newCustomers = await User.findAll({
      where: {
        user_time: {
          [Op.between]: [thisWeekStart, thisWeekEnd], // Từ đầu tuần đến cuối tuần
        },
      },
    });

    // Trả về danh sách khách hàng mới
    return res.status(200).json({
      success: true,
      data: newCustomers,
    });
  } catch (error) {
    console.error("Error fetching new customers:", error);
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi lấy danh sách khách hàng mới.",
    });
  }
};
const register = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;
    let user_time = new Date();

    const user = await User.findOne({ where: { user_email } });
    if (user) {
      return responseSend(res, { success: false }, "Email đã tồn tại", 200);
    }
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const newUser = await User.create({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_role: 11,
      user_time,
    });
    await sendVerificationEmail(newUser.user_email, newUser.user_id);

    responseSend(
      res,
      {
        success: true,
      },
      "Đăng kí thành công!",
      201
    );
  } catch (e) {
    console.log(e);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng với email đã cung cấp
    const user = await User.findOne({ where: { user_email: email.trim() } }); // Sử dụng trim() để loại bỏ khoảng trắng
    if (!user) {
      console.log("No user found with that email");
      return res.status(200).json({
        message: "Sai email hoặc mật khẩu",
        success: false,
      });
    }

    // Kiểm tra xem email đã được xác thực chưa
    if (!user.is_verified) {
      await sendVerificationEmail(user.user_email, user.user_id);

      return res.status(200).json({
        message: "Vui lòng xác thực email trước khi đăng nhập.",
        success: false,
      });
    }

    // Kiểm tra mật khẩu
    const isPasswordMatch = await bcrypt.compare(password, user.user_password);

    if (!isPasswordMatch) {
      return res.status(200).json({
        message: "Sai email hoặc mật khẩu",
        success: false,
      });
    }

    // Tạo thông tin người dùng và token
    const userDetail = {
      user_id: user.user_id,
      user_role: user.user_role,
    };
    const token = createToken(userDetail);
    const tokenRef = createTokenRef(userDetail);

    return responseSend(
      res,
      {
        token: token,
        refreshToken: tokenRef,
        success: true,
      },
      "Thành công!",
      200
    );
  } catch (e) {
    console.error("Error in login:", e);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
const resetToken = async (req, res) => {
  try {
    let { token } = req.body;
    console.log("token", token);
    let errorToken = verifyToken(token);
    // console.log(token);
    if (errorToken != null && errorToken.name != "TokenExpiredError") {
      responseSend(res, "", "Not Authorize !", 200);
      return;
    }
    // check refesh token con2 hang k
    //UserId: lay tu token
    let { data } = decodeToken(token);
    // console.log(data);
    let getUser = await User.findByPk(data.user_id);
    console.log(data);

    // console.log(getUser.dataValues.refresh_token);
    // if(checkTokenRef(getUser.dataValues.refresh_token)!=null){
    //     responseSend(res,"","Not Authorize !",200);
    //     return
    // }else{
    //     console.log("thanh cong");
    // }
    //create token
    let tokenNew = createToken({
      user_id: getUser.dataValues.user_id,
    });
    // // login thành công
    console.log(tokenNew);
    responseSend(res, tokenNew, "Thành công !", 200);
  } catch (e) {
    console.log(e);

    console.error("Error in resetToken:", e);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const loginFacebook = async (req, res) => {
  try {
    const { face_app_id, name, email, id } = req.body; // Lấy id từ req.body

    // Kiểm tra xem người dùng đã tồn tại chưa
    let checkUser = await User.findOne({
      where: {
        email, // Kiểm tra dựa trên email thay vì id
      },
    });

    // Nếu người dùng chưa tồn tại, tạo một người dùng mới
    if (!checkUser) {
      const newUser = {
        email,
        pass_word: "", // Mật khẩu có thể để trống cho người dùng đăng nhập bằng Facebook
        user_name: name,
        avatar: "", // Có thể cập nhật thêm sau này nếu có URL của avatar
        user_role: 1, // Có thể điều chỉnh dựa trên quyền hạn của người dùng
      };
      checkUser = await User.create(newUser); // Tạo người dùng mới
    }

    // Tạo token cho người dùng
    const token = createToken({
      userId: checkUser.user_id, // Sử dụng user_id từ checkUser
      role: checkUser.user_role, // Sử dụng user_role từ checkUser
    });

    // Đăng nhập thành công
    return responseSend(res, token, "Thành công!", 200);
  } catch (error) {
    console.error("Login Facebook error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
const userDetail = async (req, res) => {
  try {
    const user_id = req.id;

    const user = await User.findByPk(user_id, {
      attributes: { exclude: ["user_password"] },
    });

    responseSend(res, user, "Thành công!", 200);
  } catch (e) {
    console.log(e);
  }
};
const updateUser = async (req, res) => {
  try {
    const user_id = req.id;
    const { user_name, user_address, user_phone, gender, date } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Cập nhật các thuộc tính của user
    user.user_name = user_name;
    user.user_address = user_address;
    user.user_phone = user_phone;
    user.user_gender = gender;
    user.user_birth = date;

    // Lưu thay đổi vào database
    await user.save();

    responseSend(res, user, "Cập nhận thành công!", 200);
  } catch (error) {
    console.error("Error updating user:", error);
    responseSend(res, "", "Có lỗi xảy ra!", 500);
  }
};
const deleteEmployee = async (req, res) => {
  console.log(req.params.id);

  try {
    let deleted = await User.destroy({
      where: { user_id: req.params.id },
    });
    if (deleted) {
      let data = await User.findAll();
      responseSend(res, data, "Thành công!", 200);
    } else {
      responseSend(res, "", "không tìm thấy !", 404);
    }
  } catch (e) {
    console.error("Error deleting user:", e);
    responseSend(res, "", "Có loii xảy ra!", 500);
  }
};
const updateImage = async (req, res) => {
  try {
    const user_id = req.id;
    console.log("user_id", user_id);

    const user = await User.findByPk(user_id);

    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Lỗi khi upload file hình ảnh" });
      }

      if (user.user_image) {
        const filePath = path.join("public", "img", user.user_image); // Đường dẫn đầy đủ của file cần xóa
        deleteFile(filePath);
      }
      const image = req.file ? `${req.file.filename}` : "";
      user.user_image = image;
      const result = await user.save();

      if (result) {
        responseSend(res, user, "Cập nhật thành công!", 200);
      } else {
        responseSend(res, null, "Thêm thất bại!", 500);
      }
    });
  } catch (e) {}
};
// Logout
const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

// Bước 1: Xác thực mật khẩu cũ
const verifyOldPassword = async (req, res) => {
  try {
    const user_id = req.id; // ID của user được lấy từ token xác thực (JWT)
    const { oldPassword } = req.body; // Mật khẩu cũ người dùng nhập

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      user.user_password
    );
    if (!isPasswordMatch) {
      return responseSend(res, null, "Mật khẩu cũ không chính xác", 200);
    }

    responseSend(res, null, "Thành công!", 200);
  } catch (error) {
    console.error(error);
    responseSend(res, "", "Có lỗi xảy ra!", 500);
  }
};
const changePassword = async (req, res) => {
  try {
    const user_id = req.id;
    const { newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "Mật khẩu mới và xác nhận mật khẩu không khớp" });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.user_password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};
function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const forgetCheckMail = async (req, res) => {
  try {
    let { email } = req.body;

    // Check if email exists
    let user = await User.findOne({ where: { user_email: email } });
    if (!user) return responseSend(res, "", "Email không tồn tại", 404);

    let code = generateRandomString(6); // Generate OTP
    let expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 10);

    // Hash the code for security
    // const hashedCode = await bcrypt.hash(code, 10);

    // Save code to database
    await models.code.create({
      user_id: user.user_id,
      code: code,
      create_at: new Date(),
      expired: expirationTime,
    });

    // Send email
    await sendMail(email, "Lấy lại mật khẩu", code);

    // Send success response
    return responseSend(res, true, "Code sent successfully", 200);
  } catch (error) {
    console.error("Error in forgetCheckMail:", error);
    return responseSend(res, "", "Internal server error", 500);
  }
};

const forgetCheckCode = async (req, res) => {
  try {
    // Lấy mã từ yêu cầu
    let { code } = req.body;
    console.log(code);

    // Kiểm tra mã trong cơ sở dữ liệu
    let checkCode = await models.code.findOne({
      where: { code: code },
    });

    if (!checkCode) {
      return responseSend(res, false, "Code không đúng", 200);
    }

    // Kiểm tra xem mã có hết hạn hay không
    const currentTime = new Date();
    if (currentTime > checkCode.dataValues.create_at) {
      // Nếu mã đã hết hạn, xóa nó và trả về thông báo
      await models.code.destroy({
        where: { code_id: checkCode.dataValues.code_id },
      });
      return responseSend(res, false, "Code đã hết hạn", 200);
    }

    // Nếu mã hợp lệ, xóa mã khỏi cơ sở dữ liệu
    await models.code.destroy({
      where: { code_id: checkCode.dataValues.code_id },
    });

    // Trả về phản hồi thành công
    return responseSend(res, true, "Code hợp lệ", 200);
  } catch (error) {
    // Bắt lỗi và gửi phản hồi lỗi
    console.error("Error in forgetCheckCode:", error);
    return responseSend(res, false, "Internal server error", 500);
  }
};
const resetPasswordNoToken = async (req, res) => {
  try {
    let { email, newPassword } = req.body;

    // Check if the email exists
    let checkEmail = await User.findOne({
      where: { user_email: email },
    });

    if (!checkEmail) {
      return responseSend(res, "", "Email không tồn tại", 404);
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    checkEmail.user_password = hashedPassword;
    await checkEmail.save();

    // Return success response
    return responseSend(res, true, "Mật khẩu đã được cập nhật", 200);
  } catch (error) {
    console.error("Error in resetPasswordNoToken:", error);
    return responseSend(res, "", "Internal server error", 500);
  }
};

//

const sendVerificationEmail = async (userEmail, userId) => {
  try {
    // Tạo token xác thực với userId
    const token = jwt.sign({ userId }, "BI_MAT", { expiresIn: "1h" }); // Token có thời hạn 1 giờ

    // Tạo URL xác thực
    const verificationUrl = `https://dichvumang86.cloud/verify-email?token=${token}`;

    const htmlContent = `
      <h1>Xác thực tài khoản của bạn</h1>
      <p>Chào bạn,</p>
      <p>Vui lòng bấm vào liên kết dưới đây để xác thực tài khoản của bạn:</p>
      <a href="${verificationUrl}">Xác thực tài khoản</a>
    `;

    // Gửi email
    const emailResult = await sendMail(
      userEmail,
      "Xác thực tài khoản",
      "Vui lòng xác thực tài khoản của bạn",
      htmlContent
    );

    if (emailResult) {
      console.log("Email xác thực đã được gửi");
    }
  } catch (error) {
    console.error("Lỗi khi gửi email xác thực:", error);
  }
};
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query; // Lấy token từ query params

    // Xác minh token
    jwt.verify(token, "BI_MAT", async (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .send("Token xác thực không hợp lệ hoặc đã hết hạn.");
      }

      // Nếu token hợp lệ, bạn có thể cập nhật trạng thái xác thực của người dùng trong DB
      const { userId } = decoded;
      console.log(userId);

      // Ví dụ: cập nhật userIsVerified thành true
      await models.user.update(
        { is_verified: true },
        { where: { user_id: userId } }
      );

      res.status(200).send("Xác thực thành công! Bạn có thể đăng nhập.");
    });
  } catch (error) {
    console.error("Lỗi xác thực email:", error);
    res.status(500).send("Có lỗi xảy ra khi xác thực email.");
  }
};

const createUser = async (req, res) => {
  try {
    const {
      user_name,
      user_email,
      user_password,
      user_address,
      user_phone,
      user_role,
      level,
      user_gender,
      user_birth,
      user_time,
      user_image,
    } = req.body;

    const user = await User.findOne({ where: { user_email } });
    if (user) {
      return responseSend(res, { success: false }, "Email đã tồn tại", 201);
    }
    const hashedPassword = await bcrypt.hash(user_password, 10);
    await User.create({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_address,
      user_phone,
      user_role,
      level,
      user_gender,
      user_birth,
      user_time,
      user_image,
    });
    responseSend(
      res,
      {
        success: true,
      },
      "Thêm thành thành công!",
      200
    );
  } catch (e) {
    console.log(e);
  }
};
const Checkuserdetailadmin = async (req, res) => {
  const user_id = req.params.id;

  const user = await User.findByPk(user_id, {
    attributes: { exclude: ["user_password"] },
  });
  console.log("user", user);

  const token = createToken(user);
  const tokenRef = createTokenRef(user);

  return responseSend(
    res,
    {
      token: token,
      refreshToken: tokenRef,
      success: true,
    },
    "Thành công!",
    200
  );
};

const UpdateUsersAdmin = async (req, res) => {
  try {
    const user_id = req.params.id;

    // Tìm người dùng theo ID
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    for (const [key, value] of Object.entries(req.body)) {
      if (key === "user_password") {
        const hashedPassword = await bcrypt.hash(value, 10);
        user[key] = hashedPassword;
      } else {
        user[key] = value;
      }
    }

    await user.save();

    const userDB = await User.findByPk(user_id);

    const token = createToken(userDB);
    const tokenRef = createTokenRef(userDB);

    return responseSend(
      res,
      {
        token: token,
        refreshToken: tokenRef,
        success: true,
      },
      "Cập Nhật Thành Công!",
      200
    );
  } catch (error) {
    console.error("Error updating user:", error);
    responseSend(res, "", "Có lỗi xảy ra!", 500);
  }
};

export {
  getUser,
  register,
  updateUser,
  login,
  userDetail,
  updateImage,
  changePassword,
  verifyOldPassword,
  logout,
  resetToken,
  loginFacebook,
  forgetCheckMail,
  forgetCheckCode,
  resetPasswordNoToken,
  deleteEmployee,
  getNewCustomersThisWeek,
  verifyEmail,
  createUser,
  Checkuserdetailadmin,
  UpdateUsersAdmin,
};
