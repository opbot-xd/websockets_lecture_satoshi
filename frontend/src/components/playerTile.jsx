import './playerTile.css'

function PlayerTile(props){
  const styles_1 =`
    .player_container {
  background-color: #ffd476;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.1),
    0 6px 6px rgba(0, 0, 0, 0.1),
    inset 0 -5px 12px rgba(0, 0, 0, 0.05);
  text-align: left;
  transform: perspective(1000px) rotateX(2deg);
  border: 2px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position:fixed;
  top:5px;
  right:5px;
}

.player_name, .team_name_red , .team_name_blue{
  font-family: "Press Start 2P", system-ui;
  font-weight: 400;
  color: black;
  font-size: 1em;
}

.red_team_span{
  color: red;
}

.blue_team_span{
  color: blue;
}


  `
 
  return(<>
    <style>{styles_1}</style>
    <div className="player_container">
      <h3  className='player_name'>Name : {props.playerName}</h3>
      {props.team === 'red' ? <h3 className='team_name_red'>Team : <span className='red_team_span'>Red Team</span></h3>:<h3 className='team_name_blue'>Team : <span className='blue_team_span'>Blue Team</span></h3>}
    </div>
    </>
  )
}

export default PlayerTile