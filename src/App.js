import React from "react";

import Header from "./components/Header"
import Game from "./components/Game"
import HighScoresTable from "./components/HighScoresTable"

class App extends React.Component {
  constructor(props) {
    super (props)

    this.state = {username: "", score: 0, gameRunning: false, gameOver: false};
    
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
    this.updateScore = this.updateScore.bind(this)
    this.handleGameOver = this.handleGameOver.bind(this)
    this.retry = this.retry.bind(this)
  
  }

  handleUsernameSubmit(event) {
      this.setState({username: event.target[0].value})
      this.setState({gameRunning: true})
      event.preventDefault();
  }

  updateScore(newScore) {
    this.setState({score: newScore})
  }

  handleGameOver() {
    this.setState({gameOver: true})
  }

  retry() {
    console.log('retry')
    this.setState({score: 0})
    this.setState({username: ""})
    this.setState({gameOver: false})
    this.setState({gameRunning: false})
  }

 
  render() {
    return (
      <div className="w3-container">
        
        <Header/>
        {this.state.gameOver == true &&
          <div className="w3-red w3-padding">
            <h1 >GameOver</h1>
            <button className="w3-red w3-padding" onClick={this.retry}>Retry</button>
          </div>
      
        }
        
        <HighScoresTable/>
        <Game username={this.state.username}
              score={this.state.score}
              gameRunning={this.state.gameRunning}
              gameOver={this.state.gameOver}
              handleUsernameSubmit={this.handleUsernameSubmit}
              updateScore={this.updateScore}
              handleGameOver={this.handleGameOver}/>
              
      </div>
    )
  }
}

export default App;
