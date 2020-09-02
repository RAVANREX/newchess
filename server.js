const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 3000
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)



////////////////////
app.set('views','./views')
app.set('view engine' ,'ejs')

/// set stacic folder
 app.use(express.static(path.join(__dirname,"public")))

 ////////////////////////
 app.use(express.urlencoded({extended:true}))

 const rooms = {}

 app.get('/',(req,res)=>{
  res.render('index')
 })
 app.get('/indexi', (req,res) =>{
  res.render('indexi',{rooms: rooms})
  
 })
 app.get('/singleplayer',(req,res)=>{
  res.render('singleplayer.ejs')
 })
 
app.post('/:room',(req,res) =>{
  if(rooms[req.body.room] != null){
    return res.redirect('/indexi')
  }
  rooms[req.body.room]={users: {}}
  res.redirect(req.body.room)
  //send message that new room created
  io.emit('room-created',req.body.room)
})


app.get('/:room',(req,res)=>{
  if(rooms[req.params.room]==null){
    return res.redirect('/indexi')
  }
  res.render('room',{roomName: req.params.room})
})


// server listen
server.listen(PORT,()=> console.log(`server running on port ${PORT}`))

////////////////////handel asocket connection from web client
var connections = [null,null]
io.on('connection',socket =>{
  socket.on('room',room=>{
    console.log(`room name is ${room}`)
    
    socket.join(room)
    if(io.sockets.adapter.rooms[room].length<=2){
    ///consollog new WS connection
    //console.log('new WS connection')
    /// find avalible player number
    console.log(io.sockets.adapter.rooms[room].length)
    if(io.sockets.adapter.rooms[room].length==1){
    var playerIndex=0;
    connections[1]=null;
    }
    else
    playerIndex=1;

    



    /*let playerIndex =-1
    for(const i in connections){
        if (connections[i] === null){
            playerIndex = i
            break
        }
    }*/

    var v=false;
    //// tell the connectind client what player number they r
    socket.emit('player-number',playerIndex)
    //console.log(`player ${playerIndex} has connected `)
    
    //ignor player 3
    if(playerIndex === -1) 
    return
    connections[playerIndex]=false
    
    //tell everyone what player number just connected
    socket.to(room).broadcast.emit("player-connection",playerIndex)

    // Handle Diconnect
    socket.on('disconnect', () => {
    console.log(`Player ${playerIndex} disconnected`)
    connections[playerIndex] = null
    //Tell everyone what player numbe just disconnected
    socket.to(room).broadcast.emit('player-connection', playerIndex)
    var v=true;
    socket.to(room).broadcast.emit('refresh',v,room);



   ////////////////////////////////////
   
   
  })
  

  //on ready
  socket.on('player-ready', () => {
    socket.to(room).broadcast.emit('enemy-ready',playerIndex)
    connections[playerIndex]=true
  })


  //////////
  //check player connection
  socket.on('check-players', ()=>{
    const players = []
    for(const i in connections){
      connections[i]===null ? players.push({connected:false ,ready:false}) : players.push({connected:true,ready:connections[i]})

    }
    socket.emit('check-players',players)
  })
  


  /////////


  socket.on('sender', send=>{
    //console.log(send)
    socket.to(room).broadcast.emit('reciv', send)
    
  })
  var full=false;

    }
    else{
      var full=true;
      
    }
    socket.emit('server-full',full)



    //////////////////////////////////
  
  
      

  

})
})

