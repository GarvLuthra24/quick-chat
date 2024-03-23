const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('../server/routes/userRoutes')
const messageRoute = require('../server/routes/messageRoutes')
const socket = require('socket.io')

// making an app using the express function
const app = express()

require("dotenv").config()

app.use(cors({credentials: true}))
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "true");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json())
app.use('/api/message', messageRoute)
app.use('/api/auth',userRoutes)


// console.log('hi')

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Database Connection Successful!')
})
.catch((err) => console.log(err.message))


const server = app.listen(process.env.PORT , () => {
    console.log(`Server Started at Port: ${process.env.PORT}`)
})


const io = socket(server , {
    cors:{
        origin:process.env.FRONTEND_URL,
        Credentials: true
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket
    socket.on('add-user' , (userId) => {
        onlineUsers.set(userId , socket.id)
    })

    socket.on('send-message' , (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-receive' , data.message)
        }
    })
})











