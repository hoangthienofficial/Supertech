import express from "express";
import { checkTransactionStatus } from '../controllers/transactionController.js';

const transactionsrouter = express.Router();

transactionsrouter.get("/check-transactions", checkTransactionStatus);

export default transactionsrouter;
