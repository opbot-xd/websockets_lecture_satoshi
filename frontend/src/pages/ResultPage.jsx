import { usePlayerContext } from "../context/PlayerContext"
import { useWinnerContext } from "../context/WinnerContext"
import { useNavigate } from "react-router-dom"

function ResultPage(){
  const {winner, setWinner, list_of_winners,setListOfWinners} = useWinnerContext()
  const navigate = useNavigate()
  const {playerName, setPlayerName, teamName, setTeamName, socket_1,setSocket_1} = usePlayerContext()
  function backToHome(){
    socket_1.emit('disconnect')
    setSocket_1(null)
    setPlayerName(null)
    setTeamName(null)
    setWinner(null)
    setListOfWinners([])
    navigate('/')

  }
  return(<>
    <h1>And the winner is {winner}</h1>
    <ul>
        {list_of_winners.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    <button onClick={backToHome}>Back to Home</button>
  </>)
}

export default ResultPage