
import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getcategories,getcategory_dad,getcategory_dadId, getcategoriesById, createcategories, updatecategories, deletecategories } from '../controllers/categoriesController.js';
const categoriesRouter = express.Router();

categoriesRouter.get('/categories', getcategories);
categoriesRouter.get('/categories_dad/:id', getcategory_dadId);
categoriesRouter.get('/categories_dad', getcategory_dad);
categoriesRouter.get('/categories/:id', getcategoriesById);
categoriesRouter.post('/categories-create',middleToken, createcategories);
categoriesRouter.put('/categories-edit/:id',middleToken, updatecategories);
categoriesRouter.delete('/categories-delete',middleToken, deletecategories);

export default categoriesRouter;