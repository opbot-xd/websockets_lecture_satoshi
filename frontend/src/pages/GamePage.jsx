import { useEffect, useState } from "react"
import { usePlayerContext } from "../context/PlayerContext.js"
import SocketIOClient from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import { useWinnerContext } from "../context/WinnerContext.js";

function GamePage(){
  const navigate = useNavigate()
  const[Loading,isLoading] = useState(true)
  const [winner1,setWinner1] = useState(null)
  const [list_of_winners1,setListOfWinners1] = useState([])
  let blue_bar = 50;
  let red_bar = 50;
  const {playerName,setPlayerName,teamName, setTeamName, socket_1, setSocket_1} = usePlayerContext();
  const {winner, setWinner, list_of_winners,setListOfWinners} = useWinnerContext();



  useEffect(()=>{
    const socket = SocketIOClient('http://localhost:5000')
    setSocket_1(socket)
    console.log(socket)
    console.log('yaha tak aa gye hai')
    socket.on('added_to_team',(data)=>{
      console.log(data)
      if(data.team==='red_team'){
        setTeamName('red')
        socket.emit('joined_now',{team:'red',name:playerName})
      }
      else if(data.team==='blue_team'){
        setTeamName('blue')
        socket.emit('joined_now',{team:'red',name:playerName})
      }
    })

    socket.on('game_start',(message)=>{
      console.log(message)
      isLoading(false)
    })  

    socket.on('current_score',(gameData)=>{
      blue_bar = gameData.red_bar_value
      red_bar = gameData.blue_bar_value
    })

    socket.on('game_over',(data)=>{
      setWinner1(data.winner)
      setListOfWinners1(data.list_of_winners)
      setWinner(data.winner)
      setListOfWinners(data.list_of_winners)
      navigate('/results')
    })
  },[]);

  function pull_the_rope(){
    socket_1.emit('pull',{team:teamName})
  }

  if (isLoading){
    return(<>
      <h1>Game is Starting Please Wait!</h1>
    </>)
  };

  if(winner!==null){
    return(<>
      <h1>Game Over! And the winner is ...</h1>
    </>)
  }

  if(!isLoading){
    return(<>
      <div style={{width:`${blue_bar}px`}}></div>
      <div style={{width:`${red_bar}px`}}></div>
      <button onClick={pull_the_rope} >PULL FOR YOUR TEAM</button>
      <div></div>
    </>)
  }

}

export default GamePage