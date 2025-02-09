
import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getmediapost, getmediapostById, createmediapost, updatemediapost, deletemediapost } from '../controllers/mediapostController.js';
const mediapostRouter = express.Router();

mediapostRouter.get('/mediapost', getmediapost);
mediapostRouter.get('/mediapost/:id', getmediapostById);
mediapostRouter.post('/mediapost-create',middleToken, createmediapost);
mediapostRouter.put('/mediapost-edit/:id',middleToken, updatemediapost);
mediapostRouter.delete('/mediapost-delete/:id',middleToken, deletemediapost);

export default mediapostRouter;