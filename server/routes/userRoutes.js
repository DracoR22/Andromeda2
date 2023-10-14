const express = require("express")
const userController = require("../controllers/userController")
const { isAuthenticated } = require("../middleware/auth")
const router = express.Router()

router.post('/create-user', userController.register)
router.post('/activation', userController.activateUser)
router.post('/login-user', userController.loginUser)
router.get('/get-user', isAuthenticated, userController.getUser)
router.post('/social-auth', userController.socialAuth)
router.get('/logout', isAuthenticated, userController.logout)

module.exports = router