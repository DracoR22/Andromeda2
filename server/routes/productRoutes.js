const express = require("express")
const productController = require("../controllers/productController")
const { isSeller, isAuthenticated } = require("../middleware/auth")

const router = express.Router()

router.post('/create-product', productController.createProduct)
router.get('/get-all-products-shop/:id', productController.getAllShopProducts)
router.delete('/delete-shop-product/:id', isSeller, productController.deleteProduct)
router.get('/get-all-products', productController.getAllProducts)
router.put('/create-new-review',isAuthenticated, productController.createReview)

module.exports = router