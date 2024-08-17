const express=require('express');
const Productctrl = require('../Controllers/Productctrl');

const ProductRouter=express.Router();

ProductRouter.get('/api/v1/product/getproducts',Productctrl.getAllProduct);

ProductRouter.post('/api/v1/product/admin/addproduct',Productctrl.AddProduct);

ProductRouter.get('/api/v1/product/:id',Productctrl.getProduct);

ProductRouter.put('/api/v1/product/admin/:id',Productctrl.updateProduct);

ProductRouter.delete('/api/v1/product/admin/:id',Productctrl.DeleteProduct);

module.exports=ProductRouter