import catchAsyncError from "../Middlewares/catchasyncerror.js";
import Product from "../Model/Product.js";
import ErrorHandler from '../Utils/ErrorHandler.js'

const Productctrl = {
  //* Get all products
  getAllProduct: catchAsyncError(async (req, res, next) => {
    const product = await Product.find();
    res.status(200).json({
      product,
    });
  }),

  //* Add new product
  AddProduct: catchAsyncError(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(200).json({ product });
  }),

  //* Get a product by ID
  getProduct: catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req?.params?.id);
    if (!product) {
      next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({ product });
  }),

  //* Update product
  updateProduct: catchAsyncError(async (req, res) => {
    let product = await Product.findById(req?.params?.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    // Update logic can be added here
  }),

  //* Delete product
  DeleteProduct: catchAsyncError(async (req, res) => {
    let product = await Product.findById(req?.params?.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    await Product.deleteOne();
    res.status(200).json({ message: "Product is deleted" });
  }),
};

export default Productctrl;
