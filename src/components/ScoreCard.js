import React from "react"


class ScoreCard extends React.Component{
    constructor(props) {
        super (props)
        this.state = {choosingUsername: ""}

        this.handleUsernameChange = this.handleUsernameChange.bind(this)
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.getHighScorePosition(this.props.score),
            1000
        );
        
    }

    handleUsernameChange(event) {
        this.setState({choosingUsername: event.target.value})
    }

    async getHighScorePosition (score) {
        const api_endpoint = "http://localhost:5000/HighScores/GetPosition" 
        const response = await fetch(api_endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'score' : score})
        })
        const data = await response.text()

        this.setState({score: data})

    }

    render () {

        const username = this.props.username;

        return (
                <div>

                    {this.props.gameRunning == true
                        ? <h4>UserName: {username} </h4>
                        : <form onSubmit={this.props.handleUsernameSubmit}>
                            <label>
                            UserName:
                            <input type="text" value = {this.state.choosingUsername} onChange={this.handleUsernameChange}/>
                            </label>
                            <input type="submit" value="Start"/>
                           </form>         
                    }
                      
                    <h4>Score: {this.props.score}</h4>
                    <h4>currentPosition: {this.state.score}</h4>
                </div>
            )
    }
}

export default ScoreCard