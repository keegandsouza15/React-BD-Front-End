import React from "react"


class ScoreCard extends React.Component{
    constructor(props) {
        super (props)
        this.state = {score: props.score}
        this.state = {username: ""}
        this.state = {userentered: false}

        this.handleChange = this.handleUsernameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.getHighScorePosition(this.props.score),
            1000
        );
    }

    handleUsernameChange(event) {
        console.log('here', event.target.value)
        this.setState({username: event.target.value})
    }

    handleSubmit(event) {
        console.log(this.state.username)
        this.setState({userentered: true})

        event.preventDefault();
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
        return (
                <div className='w3-display-bottommiddle w3-container w3-lime w3-padding'style={{height:"150px", width:"400px"}} >

                    {this.state.userentered
                        ? <h4>UserName: {this.state.username}</h4>
                        : <form onSubmit={this.handleSubmit}>
                            <label>
                            UserName:
                            <input type="text" value={this.state.username} onChange={this.handleChange}/>
                            </label>
                            <input type="submit" value="Submit"/>
                           </form>         
                    }
                      
                    <h4>Score: {this.props.score}</h4>
                    <h4>currentPosition: {this.state.score}</h4>
                </div>
            )
    }
}

export default ScoreCard