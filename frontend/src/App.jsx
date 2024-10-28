import logo from './logo.svg';
import './App.css';
import RoutesD from './RoutesD';
import { PlayerProvider } from './context/PlayerContext.js';
import { WinnerProvider } from './context/WinnerContext.js';
import ResultsTile from './components/resultsTile.jsx';
import Test from './pages/testingTile.jsx';
function App() {
  const stringArray = [
    "Sunflower", "Moonlight", "Ocean", "Mountain", "Forest",
    "Desert", "Rainbow", "Thunder", "Lightning", "River",
    "Lake", "Stream", "Waterfall", "Cloud", "Star",
    "Planet", "Galaxy", "Universe", "Comet", "Meteor",
    "Diamond", "Ruby", "Emerald", "Sapphire", "Pearl",
    "Phoenix", "Dragon", "Unicorn", "Griffin", "Pegasus",
    "Wisdom", "Courage", "Strength", "Honor", "Truth",
    "Justice", "Liberty", "Freedom", "Peace", "Harmony",

  ];
  return (
    <>
    <PlayerProvider>
      <WinnerProvider>
        <RoutesD/>
        {/* <ResultsTile winner='red_team' list_of_winners={stringArray}/> */}
        {/* <Test/> */}
      </WinnerProvider>
    </PlayerProvider>
    </>
  );
}

export default App;
