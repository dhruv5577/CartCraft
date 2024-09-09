import catchasyncerror from "../Middlewares/catchasyncerror.js";
import User from "../Model/User.js";
import bcrypt from 'bcryptjs'
import savetoken from "../Utils/savetoken.js";


const Authcontroller={

  //*Register User
  registeruser:catchasyncerror(async(req,res,next)=>{
    const {name,email,password}=req.body;
    //console.log('hey')

    const user=await User.create({
      name,email,password
    });
    //console.log(user)

     //const token=user.gettoken();
    //console.log('Generated Token:', token);

    //res.status(200).json({token})

  savetoken(user,201,res)
  }),


  //*Login USer
  loginuser:catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password){
      //next(new ErrorHandler('Email or password is not entered',400));
      return res.status(400).json({success:false,message:"Email or password is not entered"})
    }
    

    //find user in db
    const user=await User.findOne({email}).select("+password");
    
    if(!user){
      return res.status(400).json({success:false,message:"User not found"})
    }

    
    //Password check
    const ismatch=await bcrypt.compare(password,user.password);

    if(!ismatch){
      return res.status(400).json({success:false,message:"Invalid credentials"})
    }

     //const token=user.gettoken();

    //res.status(200).json({token})
    savetoken(user,200,res);

  }),

  //*Logout ctrl
  logout:catchasyncerror(async(req,res,next)=>{
    res.cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly:true
    })
    res.status(200).json({message:"user has been logout successfully"})
  })


}

export default Authcontroller;