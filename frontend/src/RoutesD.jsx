import React from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import LandPage from "./pages/LandPage";
import { usePlayerContext } from "./context/PlayerContext.js";
import GamePage from "./pages/GamePage.jsx";
import ResultPage from "./pages/ResultPage.jsx";

function RoutesD() {
  const { playerName, setPlayerName, teamName, setTeamName } = usePlayerContext();
  return (
    <Router>
      <Routes>
        <Route element={<LandPage />} exact path="/"></Route>
        <Route element={playerName!=='' ? <GamePage />:<LandPage/>} exact path="/game"></Route>
        <Route element={playerName!=='' ? <ResultPage />:<LandPage/>} exact path="/result"></Route>
      </Routes>
    </Router>
  );
}

export default RoutesD;