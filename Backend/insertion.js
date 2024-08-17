const mongoose=require('mongoose');
const Product = require('./Model/Product');
const data = require('./data');

const package=async()=>{

  try {
    console.log("db connection 1")
    await mongoose.connect("mongodb://localhost:27017/cartcraft");
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

package();