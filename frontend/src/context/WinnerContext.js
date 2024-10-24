import React, { createContext, useState, useContext } from 'react';

   
const WinnerContext = createContext();


export const WinnerProvider = ({ children }) => {
    const [winner, setWinner] = useState(null);
    const [list_of_winners, setListOfWinners] = useState(null);

    return (
        <WinnerContext.Provider value={{ winner, setWinner, list_of_winners,setListOfWinners }}>
            {children}
        </WinnerContext.Provider>
    );
};

export const useWinnerContext = () => {
    return useContext(WinnerContext);
};
