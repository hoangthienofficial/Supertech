import express from 'express';
import { uploadimagesUser, deleteUser,deleteImageCloud } from '../controllers/uploadImageUserController.js';
import { middleToken } from '../config/jwt.js';

const uploadImgUserRouter = express.Router();

uploadImgUserRouter.post('/uploadimguser', middleToken,uploadimagesUser);
uploadImgUserRouter.delete('/deleteuser/:id', deleteUser);
uploadImgUserRouter.delete('/deleteimagecloud/:imageId', deleteImageCloud);
export default uploadImgUserRouter;