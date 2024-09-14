import User from "../Model/User.js";
import catchasyncerror from "./catchasyncerror.js";
import JWT from 'jsonwebtoken'

export const isAuthenticatedUser = catchasyncerror(async (req, res, next) => {
  const { token } = req.cookies;
  
  
  if (!token) {
    return res.status(404).json({success:false,message:"Login first to access"})
  }

  //console.log('is auth checked')

  const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
  
  req.user = await User.findById(decode.id);
  
  next();
});


export const isAuthorized=(...roles)=>{
    return (req,res,next)=>{
      if(!roles.includes(req.user.role)){
        return res.status(403).json({success:false,message:`${req.user.role} is not allowed for this access`})
      }

      next();
    }
}