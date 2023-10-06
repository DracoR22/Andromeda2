const mongoose = require("mongoose")

require("dotenv").config()

const connectDB = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`MongoDB connected`)
    })
}

module.exports = connectDB