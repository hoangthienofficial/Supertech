
import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getpay, getpayById, createpay, updatepay, deletepay } from '../controllers/payController.js';
const payRouter = express.Router();

payRouter.get('/pay', getpay);
payRouter.get('/pay/:id', getpayById);
payRouter.post('/pay-create',middleToken, createpay);
payRouter.put('/pay-eidt/:id',middleToken, updatepay);
payRouter.delete('/pay-delete/:id',middleToken, deletepay);

export default payRouter;