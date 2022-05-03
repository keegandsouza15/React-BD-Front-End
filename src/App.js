import React from "react";

import Header from "./components/Header"
import Game from "./components/Game"
import HighScoresTable from "./components/HighScoresTable"

class App extends React.Component {
  constructor(props) {
    super (props)

    this.state = {username: "", score: 0, gameOver: false };
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
  
  }

  handleUsernameSubmit(event) {
      this.setState({username: event.target[0].value})
      event.preventDefault();
  }


  render() {
    return (
      <div className="w3-container">
        <Header/>
        <HighScoresTable/>
        <Game username={this.state.username} 
              handleUsernameSubmit={this.handleUsernameSubmit} />
      </div>
    )
  }
}

export default App;
