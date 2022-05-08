
import React from "react";



class Game extends React.Component {
    constructor(props) {
        super(props);

        this.ctx = null;
        this.canvas = null;

        this.borderDY = 0

        //Rectangle Variables
        this.rectangleX = null ;
        this.rectangleY = null ;
        this.rightPressed = false;
        this.leftPressed = false;
        this.borderRectX = 5;

        // // Obstacle Variables
        // var obstacleLength = 7;
        // var obstacleHeight = 7;
        this.obstacleList = [];

        // // Game Variables
        // //var gameOver = false;
        // //var score = 0;
        // var intervalTime = 1000;
        // var myInterval = null;

        this.draw = this.draw.bind(this)
        this.createBorders = this.createBorders.bind(this)
        this.keyDownHandler = this.keyDownHandler.bind(this)
        this.keyUpHandler = this.keyUpHandler.bind(this)
        this.createObstacle = this.createObstacle.bind(this)
        this.game = this.game.bind(this)
        this.obstacles = this.obstacles.bind(this)

        this.drawInterval = null
        this.obstacleInterval = null
        this.obstacleIntervals = []



      }

    componentDidMount(){
        console.log('From component did mount - Game')

        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);



        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d")
        this.borderRightPosX = this.canvas.width - this.borderRectX;

        this.rectangleX = this.canvas.width/2 - 15;
        this.rectangleY = this.canvas.height-30;

        this.createBorders();
    }

    componentDidUpdate(prevProps) {
        console.log("from compenentDidUpdate")
        // if (prevProps.gameRunning !== this.props.gameRunning) {
        //        this.game()
        // }
        if (this.props.gameRunning == true && prevProps.gameRunning !== this.props.gameRunning ){
            this.game()
        }


    }


    getScore() {
        return this.props.score;
    }

    getGameRunning() {
        return this.props.gameRunning;
    }

    // Draws all the elements.
    draw() {
        
        // Updates the score
        let value = this.props.score + 1
        this.props.updateScore(value)

        // Check if the game is not over and draws all the elements.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawRectangle();
        this.createBorders();
        // Moves the Obstacles in the obstacle list.
        for (var i = 0; i < this.obstacleList.length; i++){
            this.moveObstacle (i);
        }
      
        // Moves the rectangle left or right depending on which button is pressed.
        if(this.rightPressed && this.rectangleX < (this.canvas.width - this.borderRectX) - 30) {
            this.rectangleX += 7;            
        }
        else if(this.leftPressed && this.rectangleX > this.borderRectX) {
            this.rectangleX -= 7;
        }
        // Increments the borderMovement position.
        this.borderDY += 5;        
    }

    // Creates moving Borders.
    createBorders () {
            // Border Variables
            var borderRectX = 5;
            var borderRectY = 20;
            var borderLeftPosY = 0;
            var borderRightPosY = 0;
            var borderLeftPosX = 0;
            var borderRightPosX = this.canvas.width-borderRectX;
            const ctx = this.ctx

            // Left Borders
            for (var i = 0; i < 25; i++){
                    ctx.beginPath();
                    ctx.rect(borderLeftPosX, borderLeftPosY + this.borderDY, borderRectX, borderRectY);
                    ctx.fillStyle = "#0024DD";
                    ctx.fill();
                    ctx.closePath();
                    borderLeftPosY += 24
            }

            // // Right Borders
            for (var i = 0; i < 25; i++){
                    ctx.beginPath();
                    ctx.rect(borderRightPosX, borderRightPosY + this.borderDY, borderRectX, borderRectY);
                    ctx.fillStyle = "#0024DD";
                    ctx.fill();
                    ctx.closePath();
                    borderRightPosY += 24
            }
            
            // // Sets the Borders y cordinate to 0. 
            if (this.borderDY >= 20){
                this.borderDY = 0;
            }
    }

    // Draws the rectangle that the player can move
    drawRectangle() {

        const ctx = this.ctx

        ctx.clearRect(this.rectangleX, this.rectangleY, this.rectangleX + 30, this.rectangleY + 30);
        ctx.beginPath();
        ctx.rect (this.rectangleX, this.rectangleY, 30, 30);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // Create an obstacles.
    createObstacle() {
        const ctx = this.ctx


        var obstacleLength = 7;
        var obstacleHeight = 7;
        var obstacleY = 0;
        var obstacleX = Math.floor((Math.random() * (this.canvas.width - (obstacleLength + this.borderRectX)) + 1));
        obstacleX +=this.borderRectX;
        ctx.beginPath();
        ctx.rect(obstacleX, obstacleY, obstacleLength, obstacleHeight);
        ctx.fillStyle = "#8b0000";
        ctx.fill();
        ctx.closePath();
        // Addes the obstacle's cordinates to a list.
        this.obstacleList.push([obstacleX, obstacleY]);
    }

    // Moves a specific Obstacle
    moveObstacle (pos) {
        const ctx = this.ctx

        var obstacleLength = 7;
        var obstacleHeight = 7;

        // Gets the obstacles cordinates from the list.
        var x = this.obstacleList [pos][0];
        var y = this.obstacleList [pos][1];
        y+=7;
        ctx.beginPath();
        ctx.rect(x, y, obstacleLength, obstacleHeight);
        ctx.fillStyle = "#8b0000";
        ctx.fill();
        ctx.closePath(); 
        // Updates the obstacles position.
        this.obstacleList[pos] = [x,y];
        //Checks if the user has hit the obstacle.
        if (y >= this.rectangleY && ((x >= this.rectangleX && x + obstacleLength <= this.rectangleX + 30))){
                this.props.handleGameOver()
                this.clearGame()
                //window.location.reload()
            // if (this.props.username != null){
            //     alert("will push to high score database")
            //     //loadXMLDoc_PUSHTOHIGHSCOREDATABASE(username, score);
            // }
            //         //document.location.reload();
            //         //window.location.replace("game-over.html?username=" + username + "&score="+score);

            //         return;
        }
        // // If the obstacle has moven of screen delete it from the list.    
        if (y > this.canvas.height + obstacleHeight){
            this.obstacleList.splice(pos, 1);
        }
    }

    // Starts the game
    game () {
        this.drawInterval = setInterval (this.draw, 20);
        this.obstacleInterval = setInterval (this.obstacles, 3500)


        this.createObstacle();
    }

    obstacles() {
        console.log(this.obstacleIntervals)
        console.log('here')
        let id = setInterval(this.createObstacle, 1000 + Math.floor(Math.random() * 2000))
        this.obstacleIntervals.push(id)
    }

    clearGame() {
        clearInterval(this.drawInterval)
        clearInterval(this.obstacleInterval)

        for (let id in this.obstacleIntervals){
            console.log(this.obstacleIntervals[id])
            clearInterval(this.obstacleIntervals[id])
        }
        this.obstacleIntervals = []

        this.obstacleList = []
    }

   keyDownHandler(e) {
        if(e.keyCode == 39) {
            this.rightPressed = true;
        }
        else if(e.keyCode == 37) {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if(e.keyCode == 39) {
            this.rightPressed = false;
        }
        else if(e.keyCode == 37) {
            this.leftPressed = false;
        }
    }

    render (){
        return (
                <div onKeyDown={this.keyDownHandler} style={{width:"50%"}}>
                    <div>
                        <canvas id ="myCanvas" width="300" height="500"></canvas>
                    </div>
                </div>
        )
    
}}


export default Game;