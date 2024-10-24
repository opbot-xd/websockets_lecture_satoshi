import express from "express"
import cors from "cors"
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const port = 5000
app.use(cors());
app.use(express.json());
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin: "*",
        methods:["GET", "POST"],
    }
})

let players = new Map();
let red_players_name = []
let blue_players_name = []
let blue_bar = 50
let red_bar = 50

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  if(red_players_name.length === 0 || red_players_name.length < blue_players_name.length ){
    socket.join('red_team')
    io.to(socket.id).emit('added_to_team',{team:'red_team'})
    players.set(socket.id,'red');
  }
  else if(blue_players_name.length === 0 || red_players_name.length > blue_players_name.length){
    socket.join('blue_team')
    io.to(socket.id).emit('added_to_team',{team:'blue_team'})
    players.set(socket.id,'blue')
  }

  else if (blue_players_name.length === red_players_name.length && blue_players_name.length !== 1){
    socket.join('blue_team')
    io.to(socket.id).emit('added_to_team',{team:'blue_team'})
    players.set(socket.id,'blue')
  }

  if(red_players_name.length + blue_players_name.length === 2){
    io.emit('game_start','let the game begin')
  }

  socket.on('joined_now',(playerData)=>{
    if(playerData.team==='red'){
      red_players_name.push(playerData.name)
    }
    else if(playerData.team==='blue'){
      blue_players_name.push(playerData.name)
    }
  })

  socket.on('pull',(playerData)=>{
    console.log(playerData)
    if(playerData.team==='red'){
      red_bar++
      blue_bar--
      io.emit('current_score',{
        red_bar_value : red_bar,
        blue_bar_value : blue_bar
      })
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
    }
    else if(playerData.team==='blue'){
      red_bar--
      blue_bar++
      io.emit('current_score',{
        red_bar_value : red_bar,
        blue_bar_value : blue_bar
      })
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
    }
  })

  socket.on('disconnect',()=>{
    console.log('player disconnected !!!')
    players.delete(socket.id)
  })
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

