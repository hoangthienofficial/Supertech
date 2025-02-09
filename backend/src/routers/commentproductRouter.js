
import express from 'express';
import { getcommentproduct, getcommentproductById, createcommentproduct, updatecommentproduct, deletecommentproduct, getCommentProductByIdProduct, likeComment, getLikeUser } from '../controllers/commentproductController.js';
import { middleToken } from '../config/jwt.js';
import { createRepliesComment, updateCommentReply, deleteCommentReply } from '../controllers/replies_comment.js';
const commentproductRouter = express.Router();

commentproductRouter.get('/commentproduct', getcommentproduct);
commentproductRouter.get('/commentproduct/:id', getcommentproductById);
commentproductRouter.get('/get-like-user/:id', getLikeUser);

commentproductRouter.post('/create-like/:id',middleToken,likeComment)

commentproductRouter.get("/get-comment-by-id-product/:id",getCommentProductByIdProduct)
commentproductRouter.post('/create-comment', middleToken,createcommentproduct);
commentproductRouter.post("/create-replies-comment",middleToken,createRepliesComment)
commentproductRouter.put('/put-comment/:id',middleToken, updatecommentproduct);
commentproductRouter.put('/put-comment-reply/:id',middleToken, updateCommentReply);
commentproductRouter.delete('/detele-comment/:id',middleToken, deletecommentproduct);
commentproductRouter.delete('/detele-comment-reply/:id',middleToken, deleteCommentReply);

export default commentproductRouter;