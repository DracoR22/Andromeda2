const express = require("express")

const app = express()

// Test Api
app.get("/", (req, res, next) => {
    res.status(200).json({success: true, message: "Api is working"})
})

module.exports = app