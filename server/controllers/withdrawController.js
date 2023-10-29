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
}),

//-----------------------------------------//Get All Withdraws (Admin)//---------------------------------------//
allWithdraws: catchAsyncErrors(async(req, res, next) => {
    try {
        const withdraws = await Withdraw.find().sort({ createdAt: -1 })

        res.status(201).json({
            success: true,
            withdraws
        })
    } catch (error) {
       return next(new ErrorHandler(error.message, 500));
    }
}),

//---------------------------------------//Update Withdraw Status (Admin)//-------------------------------------//
updateWithdraw: catchAsyncErrors(async(req, res, next) => {
    try {
        const { sellerId } = req.body

        const withdraw = await Withdraw.findByIdAndUpdate(req.params.id, {
            status: "Succeed",
            updatedAt: Date.now()
        }, { new: true })

        const seller = await Shop.findById(sellerId)

        const transection = {
            _id: withdraw._id,
            amount: withdraw.amount,
            updatedAt: withdraw.updatedAt,
            status: withdraw.status
        }

        seller.transections = [...seller.transections, transection]

        await seller.save()

        try {
            await sendMail({
                email: seller.email,
                subject: "Payment confirmation",
                message: `Hello ${seller.name}, your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank institution`
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }

        res.status(201).json({
            success: true,
            withdraw
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})
}