const errorhandler=(err,req,res,next)=>{
  let error={
    statusCode:err?.statusCode||500,
    message:err?.message||'Internal Server Error'
  };


  if(process.env.NODE_ENV==="DEVELOPMENT"){
    res.status(error.statusCode).json({
    message:err.message,
    error:err,
    stack:err.stack
  })
  }

  if(process.env.NODE_ENV==="PRODUCTION"){
    res.status(error.statusCode).json({
    message:err.message,  
  })
  }


  res.status(statusCode)
  res.json({
    message:err.message,
    stack:err.stack
  })
}

module.exports=errorhandler