
import express from 'express';
import { getProduct_storage, getProduct_storageById, createProduct_storage, updateProduct_storage, deleteProduct_storage } from '../controllers/productStorage.js';
const product_storageRouter = express.Router();

product_storageRouter.get('/product_storage', getProduct_storage);
product_storageRouter.get('/product_storage/:id', getProduct_storageById);
product_storageRouter.post('/product_storage-create', createProduct_storage);
product_storageRouter.put('/product_storage-edit/:id', updateProduct_storage);
product_storageRouter.delete('/product_storage-delete/:id', deleteProduct_storage);

export default product_storageRouter;