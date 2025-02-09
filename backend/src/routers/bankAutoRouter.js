import express from "express";
import {getautobank, updateOrderPay,updateBankAuto } from '../controllers/bankAutoController.js';

const autobankrouter = express.Router();

autobankrouter.get("/autobank", getautobank);
autobankrouter.put("/autobank-update/:id", updateBankAuto);
autobankrouter.put("/update-order-pay/:orderId", updateOrderPay);

export default autobankrouter;
