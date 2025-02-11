
import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getchat, getchatById, createchat, updatechat, deletechat } from '../controllers/chatController.js';
const chatRouter = express.Router();
 
chatRouter.get('/chat', getchat);
chatRouter.get('/chat/:id', getchatById);
chatRouter.post('/chat-create',middleToken, createchat);
chatRouter.put('/chat-edit/:id',middleToken, updatechat);
chatRouter.delete('/chat-delete/:id',middleToken, deletechat);

export default chatRouter;