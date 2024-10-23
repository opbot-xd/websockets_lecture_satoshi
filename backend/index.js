import express from "expressjs"
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const port = 5000
app.use(cors());
app.use(express.json());
const httpServer = createServer(app)
const io = new Server(httpServer)

let players = new Map();
let red_players_name = []
let blue_players_name = []
let blue_bar = 50
let red_bar = 50

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  var n = Math.floor(Math.random()*2)

  if(n == 0){
    socket.join('red_team')
    io.to(socket.id).emit('added_to_team',{team:'red_team'})
    players.set(socket.id,'red');
  }
  else if(n == 1){
    socket.join('blue_team')
    io.to(socket.id).emit('added_to_team',{team:'blue_team'})
    players.set(socket.id,'blue')
  }

  if(players.size === 40){
    io.emit('game_start','let the game begin')
  }

  socket.on('joined_now',(playerData)=>{
    if(playerData.get('team')==='red'){
      red_players_name.push(playerData.get('name'))
    }
    else if(playerData.get('team')==='blue'){
      blue_players_name.push(playerData.get('name'))
    }
  })

  socket.on('pull',(playerData)=>{
    console.log(playerData)
    if(playerData.get('team')==='red'){
      red_bar++
      blue_bar--
      if(red_bar>100){
        io.emit('game_over',{
          winner:'red_team',
          list_of_winners : red_players_name
        })
      }
      else if(blue_bar>100){
        io.emit('game_over',{
          winner:'blue_team',
          list_of_winners : blue_players_name
        })
      }
      io.emit('current_score',{
        red_bar_value : red_bar,
        blue_bar_value : blue_bar
      })
    }
  })

  socket.on('disconnect',()=>{
    console.log('player connected !!!')
    io.to(socket.id).emit('player_disconnected','u got disconnected')
    players.delete(socket.id)
  })





  

  // Handle user joining
  // socket.on('user_join', (playerData) => {
    
  //   io.emit('user_joined', {
  //     userId: socket.id,
  //     username: username,
  //     users: Array.from(users.values())
  //   });
  // });

  socket.on('send_message', (messageData) => {
    const { message } = messageData;
    const username = users.get(socket.id);
    
    io.emit('receive_message', {
      userId: socket.id,
      username: username,
      message: message,
      timestamp: new Date().toISOString()
    });
  });

  // Handle typing status
  socket.on('typing_start', () => {
    const username = users.get(socket.id);
    socket.broadcast.emit('user_typing', { username });
  });

  socket.on('typing_end', () => {
    socket.broadcast.emit('user_stop_typing');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    io.emit('user_left', {
      userId: socket.id,
      username: username,
      users: Array.from(users.values())
    });
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

