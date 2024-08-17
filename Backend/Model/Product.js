const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please Enter The Product Name'],
    maxLength:[200,'Product name cannot be that large ']

  },
  price:{
    type:Number,
    required:[true,'Please enter Price Details'],
    maxLength:[6,'Product price cannot have more than 6 digit']
  },
  description:{
    type:String,
    required:[true,'Please enter Price Details'],
   
  },
  ratings:{
    type:Number,
    default:0
  },
  images:[
    {
      _id:{
        type:String,
        required:true
    },

      url:{
        type:String,
        required:true
    }
  }
  ],
  category:{

    type:String,
    required:[true,'Enter Produc Category'],
    enum:{
      values:['Electronics','Accessories','Food','Books','Sports','Home',],
      message:'please select correct Category'
    },

  },

  seller:{
    type:String,
    required:[true,'Enter Product Seller']
  },

  stock:{
    type:Number,
    required:[true,'Enter Product Stock']
  },
  totalreviews:{
    type:Number,
    default:0
  },

  reviews:[
    {
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
      },
      rating:{
        type:Number,
        required:true
      },
      comment:{
        type:String,
        required:true
      }
    }
  ],
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:false
  }

},{
  timestamps:true
})

module.exports=mongoose.model("Product",ProductSchema)