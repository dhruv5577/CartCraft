import express from 'express';
import OrderController from '../Controllers/Orderctrl.js';
import { isAuthenticatedUser, isAuthorized } from '../Middlewares/isAuth.js';

const OrderRoutes=express.Router();

//Create new order
OrderRoutes.post('/api/v1/order/create',isAuthenticatedUser,OrderController.createneworder);

//get order
OrderRoutes.get('/api/v1/order/getorder/:id',isAuthenticatedUser,OrderController.getorder);

//get user order
OrderRoutes.get('/api/v1/user/getorder',isAuthenticatedUser,OrderController.getuserorder);

//update order
OrderRoutes.put('/api/v1/user/admin/update/:id',isAuthenticatedUser,isAuthorized('admin'),OrderController.updateorder);

//getallorder
OrderRoutes.get('/api/v1/user/admin/getorder',isAuthenticatedUser,isAuthorized('admin'),OrderController.getallorders);

//getallorder
OrderRoutes.delete('/api/v1/user/admin/delete/:id',isAuthenticatedUser,isAuthorized('admin'),OrderController.deleteorder);


export default OrderRoutes;