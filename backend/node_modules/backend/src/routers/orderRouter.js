
import express from 'express';
import isAuthenticated from '../config/auth.js';
import { middleToken } from '../config/jwt.js';
import { getorder, getOrderById, createorder, updateorder, deleteorder, changeStatusOrder, getSuccessEmailOrder, getRevenueBetweenDates, getOrderUserTop, getOrderId} from '../controllers/orderController.js';
import { getTop5BestSellingProducts } from '../controllers/detailorderController.js';
const orderRouter = express.Router();

orderRouter.get('/get-order-all', getorder);
orderRouter.get('/order-by-id-user',middleToken, getOrderById);
orderRouter.put("/change-status-order/:id",middleToken,changeStatusOrder)
orderRouter.post('/create-order', middleToken,createorder);
orderRouter.put('/order-edit/:id',middleToken, updateorder);
orderRouter.delete('/order-delete/:id',middleToken, deleteorder);
orderRouter.post('/success-order', getSuccessEmailOrder);
// orderRouter.get('/order-by-id',middleToken, getOrderId);
orderRouter.get('/get-order-revenue', getRevenueBetweenDates);
orderRouter.get('/get-order-by-id/:id', getOrderId);

// orderRouter.post('/get-order-sales', getWeeklySales);
orderRouter.get('/get-user-order-count', getOrderUserTop);
// orderRouter.get('/get-order-today',middleToken, getOrdersForToday);
orderRouter.get('/get-product-top-five', getTop5BestSellingProducts);
export default orderRouter;