
import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getPosts, getPostsById, createPosts, updatePosts, deletePosts } from '../controllers/postsController.js';
const PostsRouter = express.Router();

PostsRouter.get('/posts', getPosts);
PostsRouter.get('/posts/:id', getPostsById);
PostsRouter.post('/posts-create',middleToken, createPosts);
PostsRouter.put('/posts-edit/:id',middleToken, updatePosts);
PostsRouter.delete('/posts-delete/:id',middleToken, deletePosts);

export default PostsRouter;