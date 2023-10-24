const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")

require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = {
    //---------------------------------------------//Create Payment//--------------------------------------------//
    payment: catchAsyncErrors(async(req, res, next) => {
        try {
            const myPayment = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: "USD",
                metadata: {
                    company: "Andromeda"
                }
            })

            res.status(201).json({
                success: true,
                client_secret: myPayment.client_secret
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }),

//-----------------------------------------//Send Stripe Publishable Key//----------------------------------------//
publishableKey: catchAsyncErrors(async(req, res, next) => {
   res.status(201).json({ stripeApikey: process.env.STRIPE_API_KEY })
})
}