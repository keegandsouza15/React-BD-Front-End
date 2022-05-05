import React from "react";

import Header from "./components/Header"
import Game from "./components/Game"
import HighScoresTable from "./components/HighScoresTable"

class App extends React.Component {
  constructor(props) {
    super (props)

    this.state = {username: "", score: 0, gameRunning: false };
    
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
    this.updateScore = this.updateScore.bind(this)
  
  }

  handleUsernameSubmit(event) {
      this.setState({username: event.target[0].value})
      this.setState({gameRunning: true})
      event.preventDefault();
  }

  updateScore(newScore) {
    this.setState({score: newScore})
  }

  render() {
    return (
      <div className="w3-container">
        <Header/>
        <HighScoresTable/>
        <Game username={this.state.username}
              score={this.state.score}
              gameRunning={this.state.gameRunning}
              handleUsernameSubmit={this.handleUsernameSubmit}
              updateScore={this.updateScore}/>
              
      </div>
    )
  }
}

export default App;
