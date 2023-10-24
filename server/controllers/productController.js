const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Product = require("../model/product");
const Shop = require("../model/shop")
const Order = require("../model/order")
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary")

module.exports = {
//------------------------------------------------//Create Product//---------------------------------------------//
createProduct: catchAsyncErrors(async(req, res, next) => {
    try {
        // Get The Shop
        const shopId = req.body.shopId
        const shop = await Shop.findById(shopId)

        if(!shop) {
            return next(new ErrorHandler("Shop Id is missing", 400));
        } else {
            // Upload Images
            let images = []

            if (typeof req.body.images === "string") {
                images.push(req.body.images);
              } else {
                images = req.body.images;
              }
            
              const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                  folder: "products",
                });
            
                imagesLinks.push({
                  public_id: result.public_id,
                  url: result.secure_url,
                });
              }

              // Extract Everything From req.body
              const productData = req.body;
              // Set The Product Images To Be Our Array
              productData.images = imagesLinks;
              // Set The Product Shop To Our Shop Variable
              productData.shop = shop;

              // Create The Product
              const product = await Product.create(productData)

              res.status(201).json({
                success: true,
                product,
              });
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}),
//--------------------------------------------//Get All Shop Products//------------------------------------------//
getAllShopProducts: catchAsyncErrors(async(req, res, next) => {
  try {
    
    const products = await Product.find({ shopId: req.params.id })

    res.status(201).json({
      success: true,
      products
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),
//------------------------------------------------//Delete Product//----------------------------------------------//
deleteProduct: catchAsyncErrors(async(req, res, next) => {
  try {
    // Get Product By Id Using Params
    const productId = req.params.id

    const product = await Product.findByIdAndDelete(productId)

    if(!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    // Remove All Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    res.status(201).json({
      success: true,
      message: "Product has been deleted"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//-----------------------------------------------//Get All Products//---------------------------------------------//
getAllProducts: catchAsyncErrors(async(req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })

    res.status(201).json({
      success: true,
      products
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),


//--------------------------------------------//Create Product Review//------------------------------------------//
createReview: catchAsyncErrors(async(req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;
 
    const product = await Product.findById(productId)

    const review = {
      user,
      rating,
      comment,
      productId,
    };

    const isReviewed = product.reviews.find((rev) => rev.user._id === req.user._id);

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    await Order.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: "Reviewed succesfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
}