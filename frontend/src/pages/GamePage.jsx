import { useEffect, useState } from "react"
import { usePlayerContext } from "../context/PlayerContext.js"
import SocketIOClient from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import { useWinnerContext } from "../context/WinnerContext.js";
import PlayerTile from "../components/playerTile.jsx";

function GamePage(){
  const navigate = useNavigate()
  const[Loading,setIsLoading] = useState(false)
  const [winner1,setWinner1] = useState(null)
  const [list_of_winners1,setListOfWinners1] = useState([])
  const [blueBar,setBlueBar] = useState(50)
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
        console.log('emitting this !')
        socket.emit('joined_now',{team:'red',name:playerName})
        console.log("kar diya joined now event emit")
      }
      else if(data.team==='blue_team'){
        setTeamName('blue')
        console.log('emitting this !')
        socket.emit('joined_now',{team:'blue',name:playerName})
        console.log("kar diya joined now event emit")
      }
    })

    socket.on('game_start',(message)=>{
      console.log(message)
      setIsLoading(false)
    })  

    socket.on('current_score',(gameData)=>{
      console.log( gameData.red_bar_value)
      console.log(gameData.blue_bar_value)
      setBlueBar(gameData.blue_bar_value)
    })

    socket.on('game_over',(data)=>{
      setWinner1(data.winner)
      setListOfWinners1(data.list_of_winners)
      setWinner(data.winner)
      setListOfWinners(data.list_of_winners)
      navigate('/result')
    })
  },[]);

  function pull_the_rope(){
    socket_1.emit('pull',{team:teamName})
  }

  const styles = `
    .blue_bar {
      flex: 1;
      height: 150px;
      margin: 0 20px;
      position: relative;
      border-radius: 12px;
      overflow: hidden;
    }

    .blue_bar::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: ${100 - blueBar}%;
      height: 100%;
      background-color: red;
      box-shadow: 0 6px 0 darkred;
      transition: width 0.3s ease;
    }

    .blue_bar::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: ${blueBar}%;
      height: 100%;
      background-color: blue;
      box-shadow: 0 6px 0 #080098;
      transition: width 0.3s ease;
    }
  }
    `

  return(<>
    <style>{styles}</style>
    {Loading ? <h1 className="plz_wait_now">Game is Starting Please Wait!</h1> :<>
      <PlayerTile playerName={playerName} team={teamName} />
      <div className="game_div">
        <div className="team_red_div">Red Team</div>
        <div className="blue_bar"></div>
        <div className="team_blue_div">Blue Team</div>
      </div>
     
      <button className="game_button" onClick={pull_the_rope} >PULL FOR YOUR TEAM</button>
     </> }
    {winner!==null? <h1>Game Over! And the winner is ...</h1>:null}
  </>)
}

export default GamePage