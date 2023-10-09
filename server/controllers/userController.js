const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwt");

//----------------------------------------//Create Activation Token//------------------------------------------//
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
  };

module.exports = {
 //---------------------------------------------//Register User//-----------------------------------------------//
 register: async (req, res, next) => {
   try {
    const { name, email, password, avatar } = req.body

    // Check If Other User Already Has That Email
    const userEmail = await User.findOne({ email })

    if(userEmail) {
        return next(new ErrorHandler("User already exists", 400))
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "AndromedaAv",
        width: 150
      });

    const user = { name, email, password, avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    }}

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    // Send Activation Email
    try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- ${user.email} to activate your account!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

   } catch (error) {
    return next(new ErrorHandler(error.message, 400));
   }
  },

  //--------------------------------------------//Activate User//----------------------------------------------//
  activateUser: (catchAsyncErrors(async(req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 401));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })),
  //--------------------------------------------//Login User//----------------------------------------------//
  loginUser: (catchAsyncErrors(async(req, res, next) => {
    try {
      const { email, password } = req.body

      if(!email || !password) {
        return next(new ErrorHandler("Please fill all the fields", 400))
      }

      // Check If User Exists
      const user = await User.findOne({ email }).select("+password")

      if(!user) {
        return next(new ErrorHandler("User does not exist"))
      }

      // Check If Password Is Correct
      const isPasswordValid = await user.comparePassword(password)

      if(!isPasswordValid) {
        return next(new ErrorHandler("Please provide correct info", 400))
      }

      sendToken(user, 201, res)
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })),

  //--------------------------------------------//Get User//----------------------------------------------//
  getUser: (catchAsyncErrors(async(req, res, next) => {
    try {
      const user = await User.findById(req.user.id)

      if(!user) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      res.status(200).json({
        success: true,
        user
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }))
}