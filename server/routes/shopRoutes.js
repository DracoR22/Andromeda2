const express = require("express")
const shopController = require("../controllers/shopController")
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth")

const router = express.Router()

router.post('/create-shop', shopController.createShop)
router.post('/activation', shopController.activateShop)
router.post('/login-shop', shopController.loginShop)
router.get('/get-seller', isSeller, shopController.getShop)
router.get('/logout', shopController.LogoutShop)
router.get('/get-shop-info/:id', shopController.getShopInfo)
router.put('/update-shop-avatar', isSeller, shopController.updateShopAvatar)
router.put('/update-seller-info', isSeller, shopController.updateShopInfo)
router.get('/admin-all-sellers', isAuthenticated, isAdmin("Admin"), shopController.allSellersAdmin)
router.delete('/delete-seller/:id', isAuthenticated, isAdmin("Admin"), shopController.deleteSellerAdmin)
router.put('/update-payment-method', isSeller, shopController.updateWithdraw)
router.delete('/delete-withdraw-method', isSeller, shopController.deleteWithdraw)

module.exports = router