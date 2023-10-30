const express = require("express")
const ErrorHandler = require("./middleware/error")
const cookieParser = require("cookie-parser")
const cors = require("cors")

// Routes
const userRoutes = require("./routes/userRoutes")
const shopRoutes = require("./routes/shopRoutes")
const productRoutes = require("./routes/productRoutes")
const eventRoutes = require("./routes/eventRoutes")
const couponCodeRoutes = require("./routes/couponCodeRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const orderRoutes = require("./routes/orderRoutes")
const conversationRoutes = require("./routes/conversationRoutes")
const messageRoutes = require("./routes/messageRoutes")
const withdrawRoutes = require("./routes/withdrawRoutes")

const app = express()

app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(cors({
    origin: ['https://andromeda-pearl.vercel.app', 'http://localhost:3000'],
    credentials: true
}))

// Routes
app.use("/api/v2/user", userRoutes)
app.use("/api/v2/shop", shopRoutes)
app.use("/api/v2/product", productRoutes)
app.use("/api/v2/event", eventRoutes)
app.use("/api/v2/coupon", couponCodeRoutes)
app.use("/api/v2/payment", paymentRoutes)
app.use("/api/v2/order", orderRoutes)
app.use("/api/v2/conversation", conversationRoutes)
app.use("/api/v2/message", messageRoutes)
app.use("/api/v2/withdraw", withdrawRoutes)

// Test Api
// app.use("/", (req, res) => {
//     res.send("Api is working")
// })

// Middleware Calls
app.use(ErrorHandler)

module.exports = app