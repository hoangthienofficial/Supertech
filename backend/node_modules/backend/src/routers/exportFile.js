import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getdiscount, getdiscountById, creatediscount, applyDiscount, deletediscount, createUserDiscount } from '../controllers/discountController.js';
import { exportFile, exportFilePDF } from '../controllers/exportFile.js';
const exportFiles = express.Router();

exportFiles.post('/export-excel',exportFile)
exportFiles.post('/export-pdf',exportFilePDF)

export default exportFiles
