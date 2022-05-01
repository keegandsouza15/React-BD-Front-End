import React from "react"


class ScoreCard extends React.Component{
    constructor(props) {
        super (props)
        this.state = {score: props.score}
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.getHighScorePosition(this.props.score),
            1000
        );
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
        console.log(data)

        this.setState({score: data})

    }

    render () {
        return (
                <div className='w3-display-bottommiddle w3-container w3-lime w3-padding'style={{height:"150px", width:"400px"}} >            
                    <h4>UserName: Keegan</h4>
                    <h4>Score: {this.props.score}</h4>
                    <h4>currentPosition: {this.state.score}</h4>
                </div>
            )
    }
}

export default ScoreCard