const io = require('socket.io')(8900, {
    cors:{
        origin: "http://localhost:3000",
    },
})

let users = [];

const adduser = (userId , socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({userId , socketId})
}

const removeuser = (socketId) => {
    users = users.filter(user=> user.socketId !== socketId)
}

const getuser = (userId) => {
    return users.find(user => user.userId === userId)
}

//user connected
io.on("connection",(socket) => {
    //when connect
    console.log("a user connected")
    //take userId and socketId from user
    socket.on("adduser",(userId) => {
        adduser(userId , socket.id)
        io.emit("getusers",users)
    })

    //send and get messages
socket.on("sendmessage",({senderId , receiverId , text}) => {
    const user = getuser(receiverId);
    io.to(user?.socketId).emit("getmessage",{
        senderId,
        text,
    })
}) 

    //when disconnect
    socket.on("disconnect",() => {
        console.log("a user disconnected");
        removeuser(socket.id);
        io.emit("getusers",users)
    })
})
