// import './resultsTile.css'

function Test(){
  const styles = `
  h1{
font-family: "Press Start 2P", system-ui;
font-weight: 400;
font-size: 2.5em;
}

.game_div{
display: flex;
width: 100%;
height: 400px;
flex-direction: row;
justify-content: center;
align-items: center;
box-sizing: border-box;
}

.team_red_div{
height: 100px;
font-size: 1.2em;
padding: 25px 45px;
background-color: #FFC300;
color: red;
border: none;
border-radius: 12px;
font-family: "Press Start 2P", system-ui;
font-weight: 400;
text-transform: uppercase;
letter-spacing: 1px;
position: relative;
transition: all 0.3s ease;
box-shadow: 
  0 6px 0 #ff9900,
  0 8px 10px rgba(0, 0, 0, 0.2);
width: fit-content;
}

.team_blue_div{
height: 100px;
font-size: 1.2em;
padding: 25px 45px;
background-color: #FFC300;
color:blue;
border: none;
border-radius: 12px;
font-family: "Press Start 2P", system-ui;
font-weight: 400;
text-transform: uppercase;
letter-spacing: 1px;
position: relative;
/* transition: all 0.3s ease; */
box-shadow: 
  0 6px 0 #ff9900,
  0 8px 10px rgba(0, 0, 0, 0.2);

}

.game_div , .team_red_div, .team_blue_div,.blue_bar , .red_bar{
display: inline;
}

.blue_bar{
display: inline;
flex: 1;
height: 50px;
width:100px;
/* margin: 0 20px; */
position: relative;
border-radius: 12px;
overflow: hidden;
/* box-shadow: 
    0 6px 0 #080098,
    0 8px 10px rgba(0, 0, 0, 0.2); */
}

.blue-bar::before{
content: '';
position: absolute;
left: 0;
top: 0;
width: 50%;
height: 50px;
background-color: red;
box-shadow: 
    0 6px 0 darkred,
    0 8px 10px rgba(0, 0, 0, 0.2);
}

.blue-bar::after{
content: '';
position: absolute;
right: 0;
top: 0;
width: 50%;
height: 50px;
background-color: blue;
box-shadow: 
    0 6px 0 #080098,
    0 8px 10px rgba(0, 0, 0, 0.2);
}

.game_button {
font-size: 1.2em;
padding: 15px 30px;
background-color: #FFC300;
color: #ff6600;
border: none;
border-radius: 12px;
cursor: pointer;
margin-top: 25px;
font-family: "Press Start 2P", system-ui;
font-weight: 400;
text-transform: uppercase;
letter-spacing: 1px;
position: relative;
transition: all 0.3s ease;
box-shadow: 
  0 6px 0 #ff9900,
  0 8px 10px rgba(0, 0, 0, 0.2);
}

.game_button:hover {
background-color: #FFD700;
transform: translateY(2px);
box-shadow: 
  0 4px 0 #ff9900,
  0 6px 8px rgba(0, 0, 0, 0.2);
}

.game_button:active {
transform: translateY(6px);
box-shadow: 
  0 0 0 #ff9900,
  0 0 0 rgba(0, 0, 0, 0.2);
}
  `

  return(
    <div >
      <style>{styles}</style>
<div className="game_div">
        <div className="team_red_div">Red Team</div>
        <div className="blue_bar"></div>
        <div className="team_blue_div">Blue Team</div>
      </div>
     
      <button className="game_button"  >PULL FOR YOUR TEAM</button>
      </div>
  )
}

export default Test