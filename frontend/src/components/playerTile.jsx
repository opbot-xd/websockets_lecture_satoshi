import './playerTile.css'

function PlayerTile(props){
  return(
    <div className="player_container">
      <h3 className='player_name'>Name : {props.playerName}</h3>
      {props.team === 'red' ? <h3 className='team_name_red'>Team : <span className='red_team_span'>Red Team</span></h3>:<h3 className='team_name_blue'>Team : <span>Blue Team</span></h3>}
    </div>
  )
}

export default PlayerTile