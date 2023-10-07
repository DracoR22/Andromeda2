const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");

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

    const user = await User.create({ name, email, password, avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    } })

    res.status(201).json({
        success: true,
        user
    })
   } catch (error) {
     console.log(error)
   }
  }
}