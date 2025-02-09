import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import express from 'express';

import { getProduct_colors, getProduct_colorsById, createProduct_colors, updateProduct_colors, deleteProduct_colors } from '../controllers/product_colorsController.js';
const product_colorsRouter = express.Router();

product_colorsRouter.get('/product_colors', getProduct_colors);
product_colorsRouter.get('/product_colors/:id', getProduct_colorsById);
product_colorsRouter.post('/product_colors_create',middleToken, createProduct_colors);
product_colorsRouter.put('/product_colors_edit/:id',middleToken, updateProduct_colors);
product_colorsRouter.delete('/product_colors_delete/:id',middleToken, deleteProduct_colors);


export default product_colorsRouter;