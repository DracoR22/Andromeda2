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
router.put('/update-user-info', isAuthenticated, userController.updateUser)
router.put('/update-avatar', isAuthenticated, userController.updateAvatar)
router.put('/update-user-addresses', isAuthenticated, userController.updateUserAddresses)
router.delete('/delete-user-address/:id', isAuthenticated, userController.deleteUserAddress)
router.put('/update-user-password', isAuthenticated, userController.updatePassword)
router.get('/user-info/:id', userController.userInfo)

module.exports = router