
import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getcommentpost, getcommentpostById, createcommentpost, updatecommentpost, deletecommentpost, getLikeUser, likeComment } from '../controllers/commentpostController.js';
const commentpostRouter = express.Router();

commentpostRouter.get('/commentpost', getcommentpost);
commentpostRouter.get('/comment-post-id/:id', getcommentpostById);
commentpostRouter.post('/commentpost-create',middleToken, createcommentpost);
commentpostRouter.put('/commentpost-edit/:id',middleToken, updatecommentpost);
commentpostRouter.delete('/commentpost-delete/:id',middleToken, deletecommentpost);
commentpostRouter.get('/get-like-blog-user/:id', getLikeUser);

commentpostRouter.post('/create-like-blog/:id',middleToken,likeComment)

export default commentpostRouter;