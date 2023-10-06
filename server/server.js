const app = require("./app");
const connectDB = require("./utils/db");

require("dotenv").config()

// Handling Uncaught Exception Error
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for handling uncaught exception`)
})

// Create Server
const server = app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection Error
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`)
    console.log(`Shutting down the server form unhandled promise rejection`)

    server.close(() => {
        process.exit(1)
    })
})
