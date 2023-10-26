const express = require("express")
const messageController = require("../controllers/messageController")

const router = express.Router()

router.post('/create-new-message', messageController.createMessage)

module.exports = router