import React, { createContext, useState, useContext } from 'react';

   
const PlayerContext = createContext();


export const PlayerProvider = ({ children }) => {
    const [playerName, setPlayerName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [socket_1,setSocket_1] = useState(null)

    return (
        <PlayerContext.Provider value={{ playerName, setPlayerName, teamName, setTeamName, socket_1,setSocket_1 }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = () => {
    return useContext(PlayerContext);
};
