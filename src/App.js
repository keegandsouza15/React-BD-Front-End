import Header from "./components/Header"
import Game from "./components/Game"
import HighScoresTable from "./components/HighScoresTable"

function App() {
  return (
    <div className="w3-container">
      <Header/>
      <HighScoresTable/>
      <Game/>
    </div>
  );
}

export default App;
