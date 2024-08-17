const Productctrl={


  //*Get all products
  getAllProduct:async (req,res)=>{
    res.status(200).json({
      message:"Here are all pproducst"
    })
  }

}

module.exports=Productctrl

