const express = require("express")
const shopController = require("../controllers/shopController")
const { isSeller } = require("../middleware/auth")

const router = express.Router()

router.post('/create-shop', shopController.createShop)
router.post('/activation', shopController.activateShop)
router.post('/login-shop', shopController.loginShop)
router.get('/get-seller', isSeller, shopController.getShop)

module.exports = router