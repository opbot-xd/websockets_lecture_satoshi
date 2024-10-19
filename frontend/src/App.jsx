import logo from './logo.svg';
import './App.css';
import RoutesD from './RoutesD';
import { PlayerProvider } from './context/PlayerContext.js';
function App() {
  return (
    <>
    <PlayerProvider>
      <RoutesD/>
    </PlayerProvider>
    </>
  );
}

export default App;
