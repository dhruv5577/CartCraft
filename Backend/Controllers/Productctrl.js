const Product = require("../Model/Product")

const Productctrl={


  //*Get all products
  getAllProduct:async (req,res)=>{
    const product=await Product.find()
    res.status(200).json({
      product
    })
  },

  //*Add new product
  AddProduct:async(req,res)=>{
     const product=await Product.create(req.body);
     res.status(200).json({product})
  },

  //*get a product by ID
  getProduct:async(req,res)=>{
    const product=await Product.findById(req?.params?.id)
    if(!product){
      return res.send(404).json({
        error:"Product not Found"
      })
    }
    res.status(200).json({product})
 },

 //*update product
 updateProduct:async(req,res)=>{
  let product=await Product.findById(req?.params?.id)
  if(!product){
    return res.send(404).json({
      error:"Product not Found"
    })
  }
},

  //*delete product
  
 DeleteProduct:async(req,res)=>{
  let product=await Product.findById(req?.params?.id)
  if(!product){
    return res.send(404).json({
      error:"Product not Found"
    })
  }

  product=await Product.deleteOne();
  res.status(200).json({message:"Product is deleted"})
}

 }

module.exports=Productctrl

