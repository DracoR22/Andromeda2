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

// Set middleware of CORS 
app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://andromeda-pearl.vercel.app/"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });

// Test Api
app.use("/", (req, res) => {
    res.send("Api is working")
})

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


// Middleware Calls
app.use(ErrorHandler)

module.exports = app