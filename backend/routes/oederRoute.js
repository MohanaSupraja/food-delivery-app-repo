import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, userOrders, verifyOrder, adminOrders, updateStatus } from '../controllers/orderController.js';



const orderRouter = express.Router();


orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/userorders', authMiddleware, userOrders)
orderRouter.get('/adminorders', adminOrders)
orderRouter.post('/updatestatus', updateStatus)


export default orderRouter;