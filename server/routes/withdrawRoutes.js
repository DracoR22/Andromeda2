const express = require("express")
const withdrawController = require("../controllers/withdrawController")
const { isSeller } = require("../middleware/auth")

const router = express.Router()

router.post('/create-withdraw-request', isSeller, withdrawController.createWithdrawRequest)

module.exports = router