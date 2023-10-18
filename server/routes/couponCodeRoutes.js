const express = require("express")
const couponCodeController = require("../controllers/couponCodeController")
const { isSeller } = require("../middleware/auth")

const router = express.Router()

router.post('/create-coupon-code', isSeller, couponCodeController.createCoupon)
router.get('/get-coupon/:id', isSeller, couponCodeController.getShopCoupons)

module.exports = router