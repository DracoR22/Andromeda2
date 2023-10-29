const express = require("express")
const orderController = require("../controllers/orderController")
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth")

const router = express.Router()

router.post('/create-order', orderController.createOrder)
router.get('/admin-all-orders', isAuthenticated, isAdmin("Admin"), orderController.getAllOrdersAdmin)
router.get('/get-all-orders/:userId', orderController.allOrders)
router.get('/get-seller-all-orders/:shopId', orderController.sellerOrders)
router.put('/update-order-status/:id', isSeller, orderController.updateOrderStatus)
router.put('/order-refund/:id', orderController.requestRefund)
router.put('/order-refund-success/:id', isSeller, orderController.acceptRefund)

module.exports = router