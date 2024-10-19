import React, { createContext, useState, useContext } from 'react';

   
const PlayerContext = createContext();


export const PlayerProvider = ({ children }) => {
    const [playerName, setPlayerName] = useState('');
    const [teamName, setTeamName] = useState('');

    return (
        <PlayerContext.Provider value={{ playerName, setPlayerName, teamName, setTeamName }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = () => {
    return useContext(PlayerContext);
};
