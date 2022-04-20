import Header from "./components/Header"
import Game from "./components/Game"
import PositionCard from "./components/PositionCard"
import HighScoresTable from "./components/HighScoresTable"

function App() {
  return (
    <div className="w3-container">
      <Header/>
      <Game/>
      {/* <HighScoresTable/>
      <PositionCard/> */}
    </div>
  );
}

export default App;
