const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 8080
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

/// set stacic folder
 app.use(express.static(path.join(__dirname,"public")))

// server listen
server.listen(PORT,()=> console.log(`server running on port ${PORT}`))

////////////////////handel asocket connection from web client
const connections = [null,null]
io.on('connection',socket =>{
    console.log('new WS connection')
    /// find avalible player number
    let playerIndex =-1
    for(const i in connections){
        if (connections[i] == null){
            playerIndex=i
            break
        }
    }

    
    //// tell the connectind client what player number they r
    socket.emit('player-number',playerIndex)
    console.log(`player ${playerIndex} has connected `)
    
    //ignor player 3
    if(playerIndex == -1) return
    
    connections[playerIndex]=false

    //tell everyone what player number just connected
    socket.broadcast.emit("player-connection",playerIndex)


})
