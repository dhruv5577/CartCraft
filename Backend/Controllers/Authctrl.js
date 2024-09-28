import catchasyncerror from "../Middlewares/catchasyncerror.js";
import User from "../Model/User.js";
import bcrypt from 'bcryptjs'
import savetoken from "../Utils/savetoken.js";
import { Template } from "../Utils/Templete.js";
import MailSend from "../Utils/MailSender.js";
import crypto from 'crypto'


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
  }),


  //*Forgot password
  forgotpass:catchasyncerror(async(req,res,next)=>{
    
    //find user in db
    const user=await User.findOne({email:req.body.email})
    
    if(!user){
      return res.status(404).json({success:false,message:"User not found"})
    }

    
    //Get reset pass token
    const resertoken=user.resetpassword();
    await user.save();

    //reset password url
    const resetURI=`${process.env.CLIENT_URL}/api/v1/password/reset/${resertoken}`

    const msg=Template(user?.name,resetURI);
    try {
        await MailSend({
          email:user.email,
          subject:'CartCraft Acoount password Recovery',
          msg
        });

        res.status(200).json({message:`Email was Sent to: ${user.email}`,})
    } catch (error) {
        user.resetpasstoken=undefined;
        user.resetpasstokenexp=undefined;
        return res.status(404).json({success:false,message:error?.message})
    }
     //const token=user.gettoken();

    //res.status(200).json({token})

  }),

  resetpass:catchasyncerror(async(req,res,next)=>{
    
    const resetpasstoken= crypto.createHash("sha256").update(req.params.token).digest('hex');

    const user =await User.findOne({
    resetpasstoken,
    resetpasstokenexp:{$gt:Date.now()}
    });

    if(!user){
      return res.status(400).json({success:false,message:'reset password token is expired'})
    }

    if(req.body.password!==req.body.confirmpass){
      return res.status(400).json({success:false,message:'Password is not same'})
    }

    user.password=req.user.password

    user.resetpasstoken=undefined;
    user.resetpasstokenexp=undefined;
    
    await user.save();

    savetoken(user,201,res)

  }),

  


}

export default Authcontroller;