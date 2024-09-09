import express from 'express';
import Productctrl from '../Controllers/Productctrl.js';
import  { isAuthenticatedUser, isAuthorized}  from '../Middlewares/isAuth.js';

const ProductRouter = express.Router();

// Route to get all products
ProductRouter.get('/api/v1/product/getproducts',Productctrl.getAllProduct);

// Route to add a new product (admin)
ProductRouter.post('/api/v1/product/admin/addproduct',isAuthenticatedUser,isAuthorized("admin"), Productctrl.AddProduct);

// Route to get a product by ID
ProductRouter.get('/api/v1/product/:id', Productctrl.getProduct);

// Route to update a product by ID (admin)
ProductRouter.put('/api/v1/product/admin/:id',isAuthenticatedUser,isAuthorized("admin"), Productctrl.updateProduct);

// Route to delete a product by ID (admin)
ProductRouter.delete('/api/v1/product/admin/:id',isAuthenticatedUser,isAuthorized("admin"), Productctrl.DeleteProduct);

export default ProductRouter;
