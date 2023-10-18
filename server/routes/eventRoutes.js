const express = require("express")
const eventController = require("../controllers/eventController")
const { isSeller } = require("../middleware/auth")

const router = express.Router()

router.post('/create-event', eventController.createEvent)
router.get('/get-all-events/:id', eventController.getAllEventProducts)
router.delete('/delete-shop-event/:id', isSeller, eventController.deleteEvent)
router.get('/get-all-events', eventController.allEvents)

module.exports = router