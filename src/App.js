import React from "react";

import Header from "./components/Header"
import Game from "./components/Game"
import HighScoresTable from "./components/HighScoresTable"
import ScoreCard from "./components/ScoreCard"
import GameOver from "./components/GameOver";


class App extends React.Component {
  constructor(props) {
    super (props)

    this.state = {username: "", score: 0, gameRunning: false, gameOver: false};
    
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
    this.updateScore = this.updateScore.bind(this)
    this.handleGameOver = this.handleGameOver.bind(this)
  
  }

  handleUsernameSubmit(event) {
      this.setState({username: event.target[0].value})
      this.setState({gameRunning: true})
      this.setState({gameOver: false})
      event.preventDefault();
  }

  updateScore(newScore) {
    this.setState({score: newScore})
  }

  handleGameOver() {
    this.setState({gameOver: true})
    this.setState({gameRunning: false})
    this.setState({score: 0})
    this.setState({username: ""})
  }

  render() {
    return (
      <div>
        
        <Header/>
      
        <div style={{display:"flex"}}>
          <HighScoresTable/>
          <Game username={this.state.username}
                score={this.state.score}
                gameRunning={this.state.gameRunning}
                gameOver={this.state.gameOver}
                handleUsernameSubmit={this.handleUsernameSubmit}
                updateScore={this.updateScore}
                handleGameOver={this.handleGameOver}/>
        </div>
        {this.state.gameOver == true &&
          <GameOver/>
        }
        <ScoreCard 
          score={this.state.score}
          username={this.state.username}
          gameRunning={this.state.gameRunning}
          handleUsernameSubmit={this.handleUsernameSubmit}/>    
      </div>
    )
  }
}

export default App;
