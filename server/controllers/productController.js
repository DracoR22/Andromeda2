const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Product = require("../model/product");
const Shop = require("../model/shop")
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

              // Extract Everything From re.body
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
})
}