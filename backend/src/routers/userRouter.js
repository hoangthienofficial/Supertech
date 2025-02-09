
import express from 'express';
import {  UpdateUsersAdmin,Checkuserdetailadmin,changePassword, deleteEmployee, forgetCheckCode, forgetCheckMail,createUser, getNewCustomersThisWeek, getUser,login,loginFacebook,logout,register, resetPasswordNoToken, resetToken, updateImage, updateUser, userDetail, verifyEmail, verifyOldPassword } from '../controllers/userController.js';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/reset-token', resetToken);
userRouter.post('/login-facebook', loginFacebook);
userRouter.get("/logout",logout)
userRouter.get('/users',middleToken, getUser );
userRouter.get('/user-detail',middleToken, userDetail);
userRouter.put("/user-update",middleToken,updateUser)
userRouter.post ("/verify-password",middleToken,verifyOldPassword)
userRouter.put ("/change-password",middleToken,changePassword)
userRouter.delete("/remove-employee/:id", middleToken, deleteEmployee);
userRouter.post("/forget-check-mail", forgetCheckMail);
userRouter.post("/forget-check-code", forgetCheckCode);
userRouter.get("/verify-email", verifyEmail);
userRouter.put("/forget-reset-password", resetPasswordNoToken);
userRouter.post("/create-users",middleToken, createUser);
userRouter.get("/get-new-customer-this-week",middleToken,getNewCustomersThisWeek)
userRouter.get("/user_detail_admin/:id", Checkuserdetailadmin);
userRouter.put("/update-users-admin/:id", UpdateUsersAdmin);

export default userRouter;
