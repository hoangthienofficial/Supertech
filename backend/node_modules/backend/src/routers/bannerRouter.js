
import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getbanner, getbannerById, createbanner, updatebanner, deletebanner } from '../controllers/bannerController.js';
const bannerRouter = express.Router();

bannerRouter.get('/banner', getbanner);
bannerRouter.get('/banner/:id', getbannerById);
bannerRouter.post('/banner-create',middleToken, createbanner);
bannerRouter.put('/banner-edit/:id',middleToken, updatebanner);
bannerRouter.delete('/banner-delete/:id',middleToken, deletebanner);

export default bannerRouter;