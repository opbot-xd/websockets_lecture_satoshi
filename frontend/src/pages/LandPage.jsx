import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandPage.css';  // Make sure this path is correct
import { usePlayerContext } from '../context/PlayerContext';
const LandingPage = () => {
  const [playerName1, setPlayerName1] = useState('');
  const navigate = useNavigate();
  const { playerName, setPlayerName, teamName, setTeamName } = usePlayerContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayerName(playerName1)
    navigate('/game');
  };

  return (
    <div className="game-container">
      <h1>Welcome to the Cute Game!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerName1}
          onChange={(e) => setPlayerName1(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <br />
        <button type="submit">Play Game!</button>
      </form>
    </div>
  );
};

export default LandingPage;