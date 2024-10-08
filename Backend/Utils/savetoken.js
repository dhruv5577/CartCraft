export default (user,statuscode,res)=>{
  
  const token=user.gettoken();

  const options={

    expires:new Date(Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000),
    httpOnly:true
  }

  res.status(statuscode).cookie("token",token,options).json({token})

}