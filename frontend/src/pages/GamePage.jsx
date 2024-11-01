import { useEffect, useState } from "react"
import { usePlayerContext } from "../context/PlayerContext.js"
import SocketIOClient from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import { useWinnerContext } from "../context/WinnerContext.js";
import PlayerTile from "../components/playerTile.jsx";
import '../components/playerTile.css'
function GamePage(){
  const navigate = useNavigate()
  const[Loading,setIsLoading] = useState(true)
  const [winner1,setWinner1] = useState(null)
  const [list_of_winners1,setListOfWinners1] = useState([])
  const [blueBar,setBlueBar] = useState(50)
  const {playerName,setPlayerName,teamName, setTeamName, socket_1, setSocket_1} = usePlayerContext();
  const {winner, setWinner, list_of_winners,setListOfWinners} = useWinnerContext();

  useEffect(()=>{
    const socket = SocketIOClient('https://websockets-lecture-satoshi.onrender.com', {
      transports: ['websocket'],
      withCredentials: true,
  });
  
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
    h1 {
      font-family: "Press Start 2P", system-ui;
      font-weight: 400;
      font-size: 2.5em;
      text-align: center;
      margin: 20px 0;
    }
    .plz_wait_now{
      color:black;
    }

    .game_div {
      display: flex;
      width: 80vw;
      height: 200px;
      margin: 40px auto;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }

    .team_red_div, .team_blue_div {
      width: 200px;
      height: 100px;
      text-align:center;
      display:inline;
      font-size: 1.2em;
      padding: 25px;
      background-color: #FFC300;
      border-radius: 12px;
      font-family: "Press Start 2P", system-ui;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 6px 0 #ff9900, 0 8px 10px rgba(0, 0, 0, 0.2);
    }

    .team_red_div {
      color: red;
    }

    .team_blue_div {
      color: blue;
    }

    .blue_bar {
      flex: 1;
      height: 80px;
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
    }

    .blue_bar::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: ${blueBar}%;
      height: 100%;
        background-color: blue;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
      transition: width 0.3s ease;
    }

    .blue_bar::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: ${100 - blueBar}%;
      height: 100%;
            background-color: red;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
      transition: width 0.3s ease;

    }

    .game_button {
      display: block;
      margin: 30px auto;
      font-size: 1.2em;
      padding: 15px 30px;
      background-color: #FFC300;
      color: #ff6600;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-family: "Press Start 2P", system-ui;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      transition: all 0.3s ease;
      box-shadow: 0 6px 0 #ff9900, 0 8px 10px rgba(0, 0, 0, 0.2);
    }

    .game_button:hover {
      background-color: #FFD700;
      transform: translateY(2px);
      box-shadow: 0 4px 0 #ff9900, 0 6px 8px rgba(0, 0, 0, 0.2);
    }

    .game_button:active {
      transform: translateY(6px);
      box-shadow: none;
    }

    .plz_wait_now {
      text-align: center;
      color: #ff6600;
      text-shadow: 2px 2px 0px #FFC300;
    }
  `

  return(<>
    <style>{styles}</style>
    <PlayerTile playerName={playerName} team={teamName} />
    {Loading ? <h1 className="plz_wait_now" style={{color:'black'}}>Game is Starting Please Wait!</h1> :<>
      <div className="game_div">
        <div className="team_red_div"><p style={{marginTop:'45px'}}>Red Team</p></div>
        <div className="blue_bar"></div>
        <div className="team_blue_div"><p style={{marginTop:'45px'}}>Blue Team</p></div>
      </div>
      
      <button className="game_button" onClick={pull_the_rope}>
        PULL FOR YOUR TEAM
      </button>
    </> }
    {winner!==null ? <h1>Game Over! And the winner is ...</h1> : null}
  </>)
}

export default GamePage
