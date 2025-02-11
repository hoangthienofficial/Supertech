
import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getdiscount, getdiscountById, creatediscount, applyDiscount, deletediscount, createUserDiscount } from '../controllers/discountController.js';
const discountRouter = express.Router();

discountRouter.get('/discount', getdiscount);
discountRouter.get('/discount/:id', getdiscountById);
discountRouter.post('/create-discount-user' ,middleToken                    ,createUserDiscount);
discountRouter.post('/discount-create', creatediscount);
discountRouter. post        ('/apply-discount',middleToken, applyDiscount);
discountRouter.delete('/discount-delete/:id',middleToken, deletediscount);

export default discountRouter;