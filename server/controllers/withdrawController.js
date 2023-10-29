const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Withdraw = require("../model/withdraw");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop")
const sendMail = require("../utils/sendMail")

module.exports = {
//-------------------------------------------//Create Withdraw Request//-----------------------------------------//
createWithdrawRequest: catchAsyncErrors(async(req, res, next) => {
    try {
        const { amount } = req.body

        const seller = await Shop.findById(req.seller._id)

       if(amount > seller.availableBalance) {
        return next(new ErrorHandler("Balance insuficient", 400));
       } else {
        await Withdraw.create({
            seller,
            amount
        })

        seller.availableBalance = seller.availableBalance - amount

        await seller.save()
       }

       // Send Email
       try {
        await sendMail({
           email: seller.email,
           subject:"Withdraw Request",
           message: `Hello ${seller.name}, your withdraw request of ${amount}$ is processing. Your request will take between 3 and 7 days to process`
        })
       } catch (error) {
        return next(new ErrorHandler(error.message, 500));
       }

        res.status(201).json({
            success: true,
            message: "Withdraw created"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})
}