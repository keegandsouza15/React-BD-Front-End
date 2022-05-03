import React from "react"

function ScoreList(props){
    const scores = props.scores;
    const listItems = scores.map((item) => 
        <tr key={item[0]}>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
        </tr>
    )

    return (
        <tbody>{listItems}</tbody>
    )
}

class HighScoreTable extends React.Component {
    constructor(props) {
        super(props)
        this.api = "http://localhost:5000/HighScores/GetTopTen"
        this.state = {scores: []}
    }

    componentDidMount() {
        this.getScores();
        setInterval(this.getScores, 5000)
    }

    getScores = async () => {
        const response = await fetch(this.api)
        const data = await response.json();

        this.setState({scores: data})
    }

    render() {
        return (
            <div className='w3-container w3-display-left' style={{width:"50%", height:"100%"}}>
            <div className='w3-display-container w3-amber w3-display-right w3-margin' style={{width:"400px"}}>
                
                <table className="w3-table">
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Score</th>
                        </tr>
                        
                    </tbody>
                    <ScoreList scores={this.state.scores}/>
                    
                </table>
            </div>
            
            </div>        
        )
    }

}


export default HighScoreTable