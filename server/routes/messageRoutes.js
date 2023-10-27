const express = require("express")
const messageController = require("../controllers/messageController")

const router = express.Router()

router.post('/create-new-message', messageController.createMessage)
router.get('/get-all-messages/:id', messageController.getAllMessages)

module.exports = router