import './resultsTile.css'

function ResultsTile(props){
  return(
    <div>
      <h1 className='result_heading1'>Congratulations!</h1>
      {props.winner === 'red_team'?<h1 className='result_heading2'>The Winner is <span className='red_win_span'>Red Team</span></h1>:<h1 className='result_heading2'>The Winner is <span className='blue_win_span'>Blue Team</span></h1>}
      <ul>
        {props.list_of_winners.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ResultsTile