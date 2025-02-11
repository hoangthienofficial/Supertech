
import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getcommentpost, getcommentpostById, createcommentpost, updatecommentpost, deletecommentpost } from '../controllers/commentpostController.js';
const commentpostRouter = express.Router();

commentpostRouter.get('/commentpost', getcommentpost);
commentpostRouter.get('/commentpost/:id', getcommentpostById);
commentpostRouter.post('/commentpost-create',middleToken, createcommentpost);
commentpostRouter.put('/commentpost-edit/:id',middleToken, updatecommentpost);
commentpostRouter.delete('/commentpost-delete/:id',middleToken, deletecommentpost);

export default commentpostRouter;