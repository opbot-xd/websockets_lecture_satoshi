import logo from './logo.svg';
import './App.css';
import RoutesD from './RoutesD';
import { PlayerProvider } from './context/PlayerContext.js';
import { WinnerProvider } from './context/WinnerContext.js';
function App() {
  return (
    <>
    <PlayerProvider>
      <WinnerProvider>
        <RoutesD/>
      </WinnerProvider>
    </PlayerProvider>
    </>
  );
}

export default App;
