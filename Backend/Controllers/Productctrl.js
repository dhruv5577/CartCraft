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



  //* create-update product review
CreateProductReview: catchAsyncError(async (req, res) => {
  const { rating, comment, productid } = req.body;

  // Validate the inputs
  if (!rating || !comment || !productid) {
    return res.status(400).json({
      success: false,
      message: "Please provide rating, comment, and product ID.",
    });
  }

  const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  };

  // Find the product by ID
  const product = await Product.findById(productid);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  // Check if the user has already reviewed this product
  const isReviewed = product.reviews.find(
    (data) => data.user.toString() === req?.user?._id.toString()
  );

  if (isReviewed) {
    // If already reviewed, update the existing review
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    // Otherwise, push the new review
    product.reviews.push(review);
    product.totalreviews = product.reviews.length;
  }

  // Recalculate the overall rating for the product
  product.ratings =
    product.reviews.reduce((total, item) => item.rating + total, 0) /
    product.reviews.length;

  // Save the updated product
  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, message: "Review has been added/updated" });
}),


  //* get products all review
  getallreviews: catchAsyncError(async (req, res,next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
      return res.status(404).json({success:false,message:"Product Not found"})
    }

    
    res.status(200).json({ 
      reviews:product.reviews
    });
  }),


  //!delete the review
  DeleteProductReview: catchAsyncError(async (req, res) => {
    
    // Find the product by ID
    let product = await Product.findById(req.query.productid);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
  
    // Check if the user has already reviewed this product
    const reviews = product?.reviews?.filter(
      (data) => data._id.toString() !== req?.query?.id.toString()
    );


  
    const numofreviews=product.reviews.length


  
    // Recalculate the overall rating for the product
   const ratings =
   numofreviews===0?0:
      product.reviews.reduce((total, item) => item.rating + total, 0) /numofreviews;
  
   product= await Product.findByIdAndUpdate(req.query.productid,{reviews,totalreviews: numofreviews,ratings},{new:true})
  
    res.status(200).json({ success: true, product});
  }),

};

export default Productctrl;
