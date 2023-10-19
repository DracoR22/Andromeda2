const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop")
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendShopToken = require("../utils/shopJwt");
const cloudinary = require("cloudinary")

//----------------------------------------//Create Activation Token//------------------------------------------//
const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
  };


module.exports = {
//-------------------------------------------------//Create Shop//----------------------------------------------//
createShop: async(req, res, next) => {
    try {
        const { name, email, password, avatar, address, phoneNumber, zipCode } = req.body
        const sellerEmail = await Shop.findOne({ email })
        if (sellerEmail) {
            return next(new ErrorHandler("User already exists", 400));
          }

          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "ShopAvatars",
          });
      
          const seller = {
            name,
            email,
            password,
            avatar: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            address,
            phoneNumber,
            zipCode,
          };

          const activationToken = createActivationToken(seller);

          const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

          try {
            await sendMail({
              email: seller.email,
              subject: "Activate your Shop",
              message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
            });
            res.status(201).json({
              success: true,
              message: `please check your email:- ${seller.email} to activate your shop!`,
            });
          } catch (error) {
            return next(new ErrorHandler(error.message, 500));
          }
      
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
},

//-------------------------------------------------//Activate Shop//----------------------------------------------//
activateShop: catchAsyncErrors(async(req, res, next) => {
    try {
        const { activation_token } = req.body;
  
        const newSeller = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET
        );
  
        if (!newSeller) {
          return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, avatar, zipCode, address, phoneNumber } = newSeller;
  
        let seller = await Shop.findOne({ email });
  
        if (seller) {
          return next(new ErrorHandler("User already exists", 400));
        }
  
        seller = await Shop.create({
          name,
          email,
          avatar,
          password,
          zipCode,
          address,
          phoneNumber,
        });
  
        sendShopToken(seller, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
}),

//-------------------------------------------------//Login To Shop//----------------------------------------------//
loginShop: catchAsyncErrors(async(req, res, next) => {
    try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
  
        const user = await Shop.findOne({ email }).select("+password");
  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists!", 400));
        }
  
        const isPasswordValid = await user.comparePassword(password);
  
        if (!isPasswordValid) {
          return next(
            new ErrorHandler("Please provide the correct information", 400)
          );
        }
  
        sendShopToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
}),

//-------------------------------------------------//Get Shop//----------------------------------------------//
getShop: catchAsyncErrors(async(req, res, next) => {
    try {
        const seller = await Shop.findById(req.seller._id);
  
        if (!seller) {
          return next(new ErrorHandler("User doesn't exists", 400));
        }
  
        res.status(200).json({
          success: true,
          seller,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
}),

//-------------------------------------------------//Log Out Shop//----------------------------------------------//
LogoutShop: catchAsyncErrors(async(req, res, next) => {
  try {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//-------------------------------------------------//Get Shop Info//----------------------------------------------//
getShopInfo: catchAsyncErrors(async(req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id)

    res.status(201).json({
      success: true,
      shop
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
}