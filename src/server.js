const express = require('express');
const app = express();
const http = require('http');
var cors = require('cors')
const { Server } = require("socket.io");
const {addUser,getUsers, getConnectedSockets} = require('./utils/User');

// middleware(s)
app.use(cors())

const server = http.createServer(app);

// initialzie socket connection
const io = new Server(server, {
    cors: {
      origin: "*",
    }
  });

io.on('connection', (socket) => {
  socket.on('new-user',(name)=>{
      addUser({
          id:socket.id,
          name,
          socket
      });
      io.emit('display-users',getUsers())
  });

  socket.on('video-offer',(offer)=>{
   const userSocket = getConnectedSockets()[offer.target]
   userSocket.emit('video-offer',offer);
  });

  socket.on('video-answer',(answer)=>{
    const userSocket = getConnectedSockets()[answer.target];
    userSocket.emit('video-answer',answer);
  });

  socket.on('ice-candidate',(iceCandidate)=>{
    const userSocket = getConnectedSockets()[iceCandidate.target];
    userSocket.emit('ice-candidate',iceCandidate.candidate)
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});