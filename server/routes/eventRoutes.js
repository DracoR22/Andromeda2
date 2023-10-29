const express = require("express")
const eventController = require("../controllers/eventController")
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth")

const router = express.Router()

router.post('/create-event', eventController.createEvent)
router.get('/get-all-events/:id', eventController.getAllEventProducts)
router.delete('/delete-shop-event/:id', eventController.deleteEvent)
router.get('/get-all-events', eventController.allEvents)
router.get('/admin-all-events', isAuthenticated, isAdmin("Admin"), eventController.adminAllEvents)

module.exports = router