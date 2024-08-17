const express=require('express');
const Productctrl = require('../Controllers/Productctrl');

const ProductRouter=express.Router();

ProductRouter.get('/api/v1/Product/getProducts',Productctrl.getAllProduct)

module.exports=ProductRouter