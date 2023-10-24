const express = require("express")
const paymentController = require("../controllers/paymentController")

const router = express.Router()

router.post('/process', paymentController.payment)
router.get('/stripeapikey', paymentController.publishableKey)

module.exports = router