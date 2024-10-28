import ResultsTile from "../components/resultsTile"
import { usePlayerContext } from "../context/PlayerContext"
import { useWinnerContext } from "../context/WinnerContext"
import { useNavigate } from "react-router-dom"

function ResultPage(){
  const {winner, setWinner, list_of_winners,setListOfWinners} = useWinnerContext()
  const navigate = useNavigate()
  const {playerName, setPlayerName, teamName, setTeamName, socket_1,setSocket_1} = usePlayerContext()
  function backToHome(){
    socket_1.emit('going_to_disconnect',{
      player_name:playerName,
      team_name : teamName
    })
    socket_1.disconnect()
    setSocket_1(null)
    setPlayerName(null)
    setTeamName(null)
    setWinner(null)
    setListOfWinners([])
    navigate('/')

  }
  return(<>
    <ResultsTile winner={winner} list_of_winners = {list_of_winners}/>
    <button onClick={backToHome}>Back to Home</button>
  </>)
}

export default ResultPage