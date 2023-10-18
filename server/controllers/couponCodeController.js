const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const CouponCode = require("../model/couponCode");
const ErrorHandler = require("../utils/ErrorHandler");

module.exports = {
//---------------------------------------------//Create Coupon//-----------------------------------------------//
createCoupon: catchAsyncErrors(async(req, res, next) => {
    try {
        // Check If Coupon Code Already Exists
        const isCouponCodeExists = await CouponCode.find({ name: req.body.name })
        if (isCouponCodeExists.length !== 0) {
            return next(new ErrorHandler("Coupon code already exists!", 400));
          }

        const couponCode = await CouponCode.create(req.body)

        res.status(201).json({
            success: true,
            couponCode
        })
    } catch (error) {
       return next(new ErrorHandler(error.message, 500));
    }
}),

//------------------------------------------//Get All Shop Coupons//--------------------------------------------//
getShopCoupons: catchAsyncErrors(async(req, res, next) => {
    try {
        const couponCodes = await CouponCode.find({ shopId: req.seller.id });

        res.status(201).json({
            success: true,
            couponCodes
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})
}