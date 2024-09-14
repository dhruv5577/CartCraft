import mongoose from 'mongoose';
import Product from './Model/Product';
import data from './data.js';
import dotenv from 'dotenv'
dotenv.config();


const startData=async()=>{

  try {
    console.log("db connection 1")
    await connect(DB_URI);
    console.log("db connection 2")

    await Product.deleteMany();

    console.log('Products are deleted');

    await Product.insertMany(data)
    process.exit();

  } catch (error) {
    console.log(error.message);
    process.exit()
  }
}

startData();