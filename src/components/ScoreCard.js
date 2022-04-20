const ScoreCard = ({username, score, currentPosition}) => {

    return (
        <div className='w3-display-bottommiddle w3-container w3-lime w3-padding'style={{height:"150px", width:"400px"}} >            
            <h4>UserName: {username}</h4>
            <h4>Score: {score}</h4>
            <h4>currentPosition: {currentPosition}</h4>
        </div>
       
    )
}

ScoreCard.defaultProps = {
    username: "",
    score: 0,
    currentPosition: NaN
}
export default ScoreCard