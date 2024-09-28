import catchasyncerror from "../Middlewares/catchasyncerror.js";
import User from "../Model/User.js";
import bcrypt from 'bcryptjs'
import { delete_f, upload_f } from "../Utils/Imageupload.js";


const Userctrl={
  //Get USer Profile
  getuserprofile:catchasyncerror(async(req,res,next)=>{
    const user=await User.findById(req?.user?._id);

    res.status(200).json({user})
  }),

  //Update Password
  updatepassword:catchasyncerror(async(req,res,next)=>{
    const user=await User.findById(req?.user?._id).select("+password");

    //checka prev pass
    const ismatch=await bcrypt.compare(req.body.pass,user.password);

    if(!ismatch){
      return res.status(400).json({success:false,message:"old password is not correct"})
    }

    user.password=req.body.password;
    user.save();


    res.status(200).json({success:true})
  }),

  //Update profile
  updateprofiiel:catchasyncerror(async(req,res,next)=>{

    const newUser={
      name:req.body.name,
      email:req.body.email
    };

    const user=await User.findByIdAndUpdate(req.user._id,newUser,{new:true})

    res.status(200).json({user})

  }),

  //Get users
  getalluser:catchasyncerror(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({users});
  }),

  //get specific user
  getuserdetails:catchasyncerror(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
      return res.status(400).json({success:false,message:"User is not found"})
    }

    res.status(200).json({user});
  }),

  //Update user details
  updateuserdetails:catchasyncerror(async(req,res,next)=>{

    const newUser={
      name:req.body.name,
      email:req.body.email,
      role:req.body.role
    };

    const user=await User.findByIdAndUpdate(req.params.id,newUser,{new:true})

    res.status(200).json({user})

  }),

  //Delete User
  deleteuser:catchasyncerror(async(req,res,next)=>{

    const user=await User.findById(req.params.id);

    if(!user){
      return res.status(400).json({success:false,message:"User is not found"})
    }


    await user.deleteOne();

    res.status(200).json({success:true})

  }),

  //*upload user logo
  uploadlogo:catchasyncerror(async(req,res,next)=>{


    
    const logoRes=await upload_f(req.body.logo,"CartCraft/Logos");
    if(req?.user?.logo?.url){
      await delete_f(req?.user?.logo?.public_id)
    }
    

    const user=await User.findByIdAndUpdate(req?.user?._id,{logo:logoRes});
    

    return res.status(200).json({success:true,message:'logo is updated'})
  })




}


export default Userctrl;