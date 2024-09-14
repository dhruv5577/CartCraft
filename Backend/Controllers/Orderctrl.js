import catchasyncerror from "../Middlewares/catchasyncerror.js";
import Order from "../Model/Order.js";
import Product from "../Model/Product.js";



const OrderController={

  //!create new order
  createneworder:catchasyncerror(async(req,res,next)=>{

    const {orderitems,
           shippingInfo,
           itemsprice,
           taxamount,
           shippingamount,
           totalamount,
           paymentmethod,
           paymentinfo
          }=req.body;

  const order=await Order.create({
    orderitems,
    shippingInfo,
    itemsprice,
    taxamount,
    shippingamount,
    totalamount,
    paymentmethod,
    paymentinfo,
    user:req.user._id,
  });

  res.status(200).json({order})
  }),

  //!get order
  getorder:catchasyncerror(async(req,res,next)=>{

    const order=await Order.findById(req.params.id);

    if(!order){
      return res.status(404).json({success:false,message:"No order found of this id"})
    }

    res.status(200).json({order})
  }),

  //!get all orders of user 
  getuserorder:catchasyncerror(async(req,res,next)=>{

    const orders=await Order.find({user:req.user._id}).populate("user","name email");

    if(!orders){
      return res.status(404).json({success:false,message:"No order found of this id"})
    }

    res.status(200).json({orders})
  }),

  //!get all orders of user 
  getallorders:catchasyncerror(async(req,res,next)=>{

    const orders=await Order.find()

    if(!orders){
      return res.status(404).json({success:false,message:"No order found of this id"})
    }

    res.status(200).json({orders})
  }),

  //!update order 
  updateorder:catchasyncerror(async(req,res,next)=>{

    const order=await Order.findById(req.params.id)

    if(!order){
      return res.status(404).json({success:false,message:"No order found of this id"})
    }

    if(order?.orderstatus==='Delivered'){
      return res.status(404).json({success:false,message:"Order is al ready deliverd"})
    }

    order?.orderitems?.forEach(async(or)=>{
      const product=await Product.findById(or?.product?.toString());
      if(!product){
        return res.status(404).json({success:false,message:"No product found"})
      }
      product.stock=product.stock-or.quantity
      await product.save({validateBeforeSave:false});
    })

    order.orderstatus=req.body.status;
    order.deliveredat=Date.now()
    await order.save();

    res.status(200).json({order})
  }),


  //!delete order
  deleteorder:catchasyncerror(async(req,res,next)=>{

    const order=await Order.findById(req.params.id)

    if(!order){
      return res.status(404).json({success:false,message:"No order found of this id"})
    }

    await order.deleteOne()

    res.status(200).json({success:true})
  }),

}

export default OrderController;