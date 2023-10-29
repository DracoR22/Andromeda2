const express = require("express")
const withdrawController = require("../controllers/withdrawController")
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth")

const router = express.Router()

router.post('/create-withdraw-request', isSeller, withdrawController.createWithdrawRequest)
router.get('/get-all-withdraw-request', isAuthenticated, isAdmin("Admin"), withdrawController.allWithdraws)
router.put('/update-withdraw-request/:id', isAuthenticated, isAdmin("Admin"), withdrawController.updateWithdraw)

module.exports = router