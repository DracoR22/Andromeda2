const express = require("express")
const conversationController = require("../controllers/conversationController")
const { isAuthenticated, isSeller } = require("../middleware/auth")

const router = express.Router()

router.post('/create-new-conversation', isAuthenticated, conversationController.createConversation)
router.get('/get-all-conversation-seller/:id', isSeller, conversationController.getSellerConversations)
router.get('/get-all-conversation-user/:id', isAuthenticated, conversationController.getUserConversations)
router.put('/update-last-message/:id', conversationController.updateLastMessage)

module.exports = router