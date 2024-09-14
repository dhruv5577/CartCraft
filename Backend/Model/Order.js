import  mongoose from 'mongoose'

const OrderSchema=new mongoose.Schema({
      shippingInfo:{
        address:{
          type:String,
          required:true 
      },
      city:{
        type:String,
        required:true 
    },
    phoneno:{
      type:String,
      required:true 
    },
    zipcode:{
      type:String,
      required:true 
    },
    country:{
      type:String,
      required:true 
    }},

    user:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User",
    },
    orderitems:[
      {
        name:{
          type:String,
          required:true
        },
        quantity:{
          type:String,
          required:true
        },
        image:{
          type:String,
          required:true
        },
        price:{
          type:Number,
          required:true
        },
        product:{
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:"Product",
    
        },
      }
  ],

  paymentmethod:{
    type:String,
    required:true,
    enum:{
      values:["COD","Card"],
      message:'Select Only valid methods'
    }
  },

  paymentinfo:{
    id:String,
    status:String
  },

  itemsprice:{
    type:Number,
    required:true
  },
  taxamount:{
    type:Number,
    required:true
  },
  shippingamount:{
    type:Number,
    required:true
  },
  totalamount:{
    type:Number,
    required:true
  },
  orderstatus:{
    type:String,
    enum:{
      values:["Processing","Shipped","Delivered"],
      message:'Select Only valid methods'
    },
    default:'Processing'
  },
  deliveredat:Date


},{timestamps:true});


export default mongoose.model('Order',OrderSchema)