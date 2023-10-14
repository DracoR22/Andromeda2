const express = require("express")
const ErrorHandler = require("./middleware/error")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const userRoutes = require("./routes/userRoutes")
const shopRoutes = require("./routes/shopRoutes")

const app = express()

app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

// Test Api
app.get("/", (req, res, next) => {
    res.status(200).json({success: true, message: "Api is working"})
})

// Routes
app.use("/api/v2/user", userRoutes)
app.use("/api/v2/shop", shopRoutes)

// Middleware Calls
app.use(ErrorHandler)

module.exports = app