import express from "express"
import cors from "cors"
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const port = 5000
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));
app.use(express.json());
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
})

let players = new Map();
let players_with_name = new Map();
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

  socket.on('joined_now',(playerData)=>{
    console.log(playerData.team)
    if(playerData.team==='red'){
    console.log('red team mein aa gya')
      red_players_name.push(playerData.name)
      players_with_name.set(socket.id,playerData.name)
      console.log(red_players_name)
    }
    else if(playerData.team==='blue'){
      console.log('blue team mein aa gya')
      blue_players_name.push(playerData.name)
      players_with_name.set(socket.id,playerData.name)
      console.log(blue_players_name)
    }
    if(blue_players_name.length + red_players_name.length === 2){
      console.log(blue_players_name.length + red_players_name.length)
      io.emit('game_start','let the game begin')
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
      if(red_bar>=100){
        console.log(red_players_name)
        io.emit('game_over',{
          winner:'red_team',
          list_of_winners : red_players_name
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
      if(blue_bar>=100){
        console.log(blue_players_name)
        io.emit('game_over',{
          winner:'blue_team',
          list_of_winners : blue_players_name
        })
      }
    }
  })

  socket.on('disconnect',()=>{
    var playerTeam = players.get(socket.id);
    var playerName = players_with_name.get(socket.id);
    if (playerTeam && playerName) {
      if (playerTeam === 'red') {
        red_players_name = red_players_name.filter(name => name !== playerName);
        console.log(`Removed ${playerName} from red team`);
      } else if (playerTeam === 'blue') {
        blue_players_name = blue_players_name.filter(name => name !== playerName);
        console.log(`Removed ${playerName} from blue team`);
      }
    }
    console.log('player disconnected !!!')
    console.log(socket.id)
    players.delete(socket.id)
    players_with_name.delete(socket.id)
  })

  socket.on('going_to_disconnect',(deleteData)=>{
    console.log('player disconnected !!!')

    players.delete(socket.id)
    if(deleteData.team_name === 'red'){
      var index = red_players_name.indexOf(deleteData.player_name)
      red_players_name.splice(index,1)
      console.log('deleted')
      console.log(red_players_name)
    }
    else if(deleteData.team_name === 'blue'){
      var index = blue_players_name.indexOf(deleteData.player_name)
      blue_players_name.splice(index,1)
      console.log('deleted')
      console.log(blue_players_name)
    }
  })
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

