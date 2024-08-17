const express=require('express');
const dotenv=require("dotenv");
const mongoose=require('mongoose');
const ProductRouter = require('./Routes/ProductRoutes');
// const  connectDB  = require('./Utils/DBconnect');
dotenv.config()

const app=express();

// //DB connection

// let DB_URL='';
// console.log('Connecting to MongoDB at:', DB_URL);

// if(process.env.NODE_ENV==='DEVELOPMENT') DB_URL+=
// // if(process.env.NODE_ENV==='PRODUCTION') DB_URL=process.env.MONGO_URL;

// console.log('Connecting to MongoDB at:', DB_URL);

mongoose.connect(process.env.MONGO_LOCAL_URL)
.then(()=>console.log('DB connected')).catch((e)=>console.log(e))



//*Production Routes
app.use('/',ProductRouter);

app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port : ${process.env.PORT}`)
})