import  mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import crypto from 'crypto'

const UserSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,'please enter your userdname'],
    maxLength:50
  },
  email:{
    type:String,
    required:[true,'please enter your EMail'],
    unique:true
  },
  password:{
    type:String,
    required:[true,'please enter your Password'],
    minLength:[6,'password must be longer than 6 character'],
    select:false
  },
  logo:{
    id:String,
    url:String
  },
  role:{
    type:String,
    default:"user"
  },
  resetpasstoken:String,
  resetpasstokenexp:Date
},{timestamps:true})

UserSchema.pre('save',async function (next){
  if(!this.isModified("password")){
    next()
  }
  this.password=await bcrypt.hash(this.password,8);

})

//Return token
UserSchema.methods.gettoken=function(){
  return JWT.sign({id:this._id},process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRE_TIME
  })
}

UserSchema.methods.resetpassword=function(){


  const resettoken=crypto.randomBytes(14).toString('hex');

  this.resetpasstoken= crypto.createHash("sha256").update(resettoken).digest('hex');

  //Expire token
  this.resetpasstokenexp=Date.now()+10*60*1000;
  return resettoken;

}


export default mongoose.model("User",UserSchema);