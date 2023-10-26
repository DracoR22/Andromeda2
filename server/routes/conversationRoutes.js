const express = require("express")
const conversationController = require("../controllers/conversationController")
const { isAuthenticated, isSeller } = require("../middleware/auth")

const router = express.Router()

router.post('/create-new-conversation', isAuthenticated, conversationController.createConversation)
router.get('/get-all-conversation-seller/:id', isSeller, conversationController.getSellerConversations)

module.exports = router