import catchAsyncError from "../Middlewares/catchasyncerror.js";
import Product from "../Model/Product.js";
import filter from "../Utils/filter.js";

const Productctrl = {
  //* Get all products
  getAllProduct: catchAsyncError(async (req, res) => {
    
    const pagenum = 4;
   

    const filters = new filter(Product, req.query).search().filters();
    
    let products = await filters.query;
    let filtercount = products.length;

    filters.paginate(pagenum);
    products = await filters.query.clone();
    

    if (products.length === 0) {
      return res.status(404).json({success:false,message:"No Product found"})
    }

    

    res.status(200).json({
      pagenum,
      filtercount,
      products,
    });
    
  }),

  //* Add new product
  AddProduct: catchAsyncError(async (req, res) => {
    req.body.user=req.user._id;
    const product = await Product.create(req.body);
    res.status(200).json({ product });
  }),

  //* Get a product by ID
  getProduct: catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req?.params?.id);
    if (!product) {
      return res.status(404).json({success:false,message:"Product Not found"})
    }
    res.status(200).json({ product });
  }),

  //* Update product
  updateProduct: catchAsyncError(async (req, res) => {
    let product = await Product.findById(req?.params?.id);
    if (!product) {
      return res.status(404).json({success:false,message:"Product Not found"})
    }
    // Update logic can be added here
  }),

  //* Delete product
  DeleteProduct: catchAsyncError(async (req, res) => {
    let product = await Product.findById(req?.params?.id);
    if (!product) {
      return res.status(404).json({success:false,message:"Product Not found"})
    }

    await Product.deleteOne();
    res.status(200).json({ message: "Product is deleted" });
  }),
};

export default Productctrl;
