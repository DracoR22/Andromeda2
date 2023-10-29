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
      const user = await User.findById(req.user._id)

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
  })),

   //--------------------------------------------//Social Auth//----------------------------------------------//
  socialAuth: (catchAsyncErrors(async(req, res, next) => {
    try {
      const { name, email, avatar } = req.body
      const user = await User.findOne({ email })

      if(!user) {
        const newUser = await User.create({ name, email, avatar })
        sendToken(newUser, 200, res)
      } else {
        sendToken(user, 200, res)
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })),

  //-------------------------------------------------//Logout//--------------------------------------------------//
  logout: (catchAsyncErrors(async(req, res, next) => {
    try {
      res.cookie("token", null, {
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
  })),

  //-------------------------------------------//Update User Info//---------------------------------------------//
  updateUser: catchAsyncErrors(async(req, res, next) => {
    try {
      const { email, phoneNumber, name } = req.body

      const userId  = req.user?._id
      const user = await User.findById(userId)

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }


      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user?.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),

  
  //-------------------------------------------//Update User Avatar//---------------------------------------------//
  updateAvatar: catchAsyncErrors(async(req, res, next) => {
    try {
      const { avatar } = req.body

      const userId = req.user?._id
      const user = await User.findById(userId)

      if(avatar && user) {
        if(user?.avatar?.public_id) {
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id)
          const myCloud = await cloudinary.v2.uploader.upload(avatar, { folder: "AndromedaAv", width: 150 })

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
          }
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, { folder: "AndromedaAv", width: 150 })
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
          }
        }
      }

      await user?.save()

      res.status(201).json({
        success: true,
        user
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),

//------------------------------------------//Update User Addresses//-------------------------------------------//
updateUserAddresses: catchAsyncErrors(async(req, res, next) => {
  try {
    const userId = req.user?._id
    const user = await User.findById(userId)

    const sameTypeAddress = user.addresses.find((address) => address.addressType === req.body.addressType)
    if(sameTypeAddress) {
      return next(new ErrorHandler(`${req.body.addressType} address already exists`, 400))
    }

    const existAddress = user.addresses.find(address => address._id === req.body._id)

    if(existAddress) {
      Object.assign(existAddress, req.body)
    } else {
      // Add The New Address To The Array
      user.addresses.push(req.body)
    }

    await user?.save()

    res.status(201).json({
      success: true,
      user
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//------------------------------------------//Delete User Addresses//-------------------------------------------//
deleteUserAddress: catchAsyncErrors(async(req, res, next) => {
  try {
    const userId = req.user?._id
    const addressId = req.params.id

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//------------------------------------------//Update User Password//-------------------------------------------//
updatePassword: catchAsyncErrors(async(req, res, next) => {
  try {
    const user = await User.findById(req.user?._id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.newPassword

    await user.save()

    res.status(201).json({
      success: true,
      message: "Password updated succesfully"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//---------------------------------------//Get Any User Information By Id//--------------------------------------//
userInfo: catchAsyncErrors(async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    res.status(201).json({
      success: true,
      user
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//---------------------------------------------//Get All Users//--------------------------------------------//
allUsersAdmin: catchAsyncErrors(async(req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })

    res.status(201).json({
      success: true,
      users
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//---------------------------------------------//Delete User (Admin)//-------------------------------------------//
deleteUser: catchAsyncErrors(async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user) {
      return next(new ErrorHandler("User to delete not found", 400));
    }

    if(req.params.id === req.user.id) {
      return next(new ErrorHandler("You cant delete your profile from here", 400));
    } else {

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);
  
      await User.findByIdAndDelete(req.params.id)

    }

    res.status(201).json({
      success: true,
      message: "User has been deleted"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
}