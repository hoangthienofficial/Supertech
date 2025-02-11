import express from 'express';
import { uploadFields, uploadImages,updateImages } from '../controllers/uploadController.js';
import { middleToken } from '../config/jwt.js';
const uploadRouter = express.Router();
uploadRouter.post('/upload-images',middleToken, uploadFields, uploadImages);
uploadRouter.put('/updateimageprod',middleToken, uploadFields, updateImages);

export default uploadRouter;