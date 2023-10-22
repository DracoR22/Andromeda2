const express = require("express")
const paymentController = require("../controllers/paymentController")

const router = express.Router()

router.post('/payment/process', paymentController.payment)
router.get('/stripeapikey', paymentController.publishableKey)

module.exports = router