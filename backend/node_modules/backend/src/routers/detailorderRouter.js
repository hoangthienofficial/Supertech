
import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getdetailorder, getDetailOrderById, createdetailorder, updatedetailorder, deletedetailorder, getUserStats } from '../controllers/detailorderController.js';
const detailorderRouter = express.Router();

detailorderRouter.get('/detailorder', getdetailorder);
detailorderRouter.get('/get-user-register', getUserStats);
detailorderRouter.get('/detail-order/:id', getDetailOrderById);
detailorderRouter.post('/create-detail-order',middleToken, createdetailorder);
detailorderRouter.put('/detailorder-edit/:id',middleToken, updatedetailorder);
detailorderRouter.delete('/detailorder-delete/:id',middleToken, deletedetailorder);

export default detailorderRouter;