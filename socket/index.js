const socketIO = require("socket.io")
const http = require("http")
const express = require("express")
const cors = require("cors")

require("dotenv").config()

const app = express()

// Create Socket Server
const server = http.createServer(app)
const io = socketIO(server)

// App Calls
app.use(cors())
app.use(express.json())

// Test Route
app.get('/', (req, res) => {
    res.send("Socket server working")
})

let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId)
}

// Define A Mesaage Object With Seen Property
const createMessage = ({ senderId, receiverId, text, images }) => ({
    senderId,
    receiverId,
    text,
    images,
    seen: false
})

// Create Connection
io.on("connection", (socket) => {
    // When Connected
    console.log("A user connected to socket")

    // Take UserId And SocketId From User
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    // Send And Get Message
    const messages = {}

    socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
        const message = createMessage({ senderId, receiverId, text, images })

        const user = getUser(receiverId)

        // Store The Messages In The 'messages' Object
        if(!messages[receiverId]) {
          messages[receiverId] = [message]
        } else {
            messages[receiverId].push(message)
        }

        // Send The Message To The Receiver
        io.to(user?.socketId).emit("getMessage", message)
    })

    socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
        const user = getUser(senderId)

        // Update The Seen Flag For The Message
        if(messages[senderId]) {
            const message = messages[senderId].find((message) => message.receiverId === receiverId && message.id === messageId)
            if(message) {
                message.seen = true

                // Send A Message Seen Event To The Sender
                io.to(user?.socketId).emit("messageSeen", ({
                    senderId,
                    receiverId,
                    messageId
                }))
            }
        }
    })

    // Update And Get Last Messages
    socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
     io.emit("getLastMessage", {
        lastMessage,
        lastMessageId
       })
    })

    // When User Disconnect From Socket
    socket.on("disconnect", () => {
        console.log("A user has diconnected from socket")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})

// Run Server
server.listen(process.env.PORT || 4000, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})