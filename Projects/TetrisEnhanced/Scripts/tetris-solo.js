//!Don't forget to credit Lucas for achievements
//!Blockhead series

//Bogdan Gura 
//!Date Started: 11/2/2023
//Date Finished:

//Importing Achievement Class
import { Achievement } from "/Projects/TetrisEnhanced/Scripts/achievement.js";

//Importing Game Class
import { Game } from "/Projects/TetrisEnhanced/Scripts/game.js";

//Variables
let gameBoard = document.getElementById("game-board");
//F stands for Field
let clearedLinesF = document.getElementById("rows-cleared");
let pointsScoredF = document.getElementById("points");
let nextTetrominoScreen = document.getElementById("next-tetromino-screen");
let openMenu = document.getElementById("openMenu");
let closeMenu = document.getElementById("closeMenuBtn");
let quitBtn1 = document.getElementById("quitGameBtn1");
let quitBtn2 = document.getElementById("quitGameBtn2");
let popupMenu = document.getElementById("popup-menu");
let popupLost = document.getElementById("popup-lost");
let levelIndicator = document.getElementById("level-indicator");
let btn_down = document.getElementById("btn-down");
let btn_up = document.getElementById("btn-up");
let btn_left = document.getElementById("btn-left");
let btn_right = document.getElementById("btn-right");
let boardPieces;
let nextScreenPieces;
//Actual variables that store the games score
let pointScore = 0;
let rowsCleared = 0;
const game = new Game();
const boardWidth = 10;
const boardHeight = 20;
let gameStopped = false;
let interval;
//Movement directions
const down = 10;
const left = -1;
const right = 1;
//interval speeds
let intervalSpeed = 0;
const level_1 = 450;
const level_2 = 400;
const level_3 = 305;
const fasterSpeed = 200;

//Tetrominoes
//Tetrominoes for Player
let I = {
    name: "I",
    //Possible spawn position for the tetromino
    spawnPositions: [{
        position: [2, 12, 22, 32],
        tetrominoRotationIndex: 0, //First,Vertical
        rotationIncrement: 11 
        //Value that will rotate a vertical I into a 
        //horizontal I
    }, {
        position: [3, 4, 5, 6],
        tetrominoRotationIndex: 1, //Side (Second)
        rotationIncrement: -11 
        //Value that will rotate a horizontal I into a 
        //vertical I
    }, {
        position: [5, 6, 7, 8],
        tetrominoRotationIndex: 1, //Side (Second)
        rotationIncrement: -11 //Same here 
    }],
    nextPosition: [4, 5, 6, 7]
}

let O = {
    name: "O",
    //Possible spawn position for the tetromino
    spawnPositions: [{
        position: [4, 5, 14, 15],
        tetrominoRotationIndex: 0
    }, {
        position: [6, 7, 16, 17],
        tetrominoRotationIndex: 0
    }, {
        position: [7, 8, 17, 18],
        tetrominoRotationIndex: 0
    }],
    nextPosition: [5, 6, 9, 10]
}
//If shadow doesn't show. Check if the border has solid in the attribute defenition
let T = {
    name: "T",
    //Possible spawn position for the tetromino
    spawnPositions: [{
        position: [11, 12, 13, 2],
        tetrominoRotationIndex: 0
    }, {
        position: [15, 16, 17, 6],
        tetrominoRotationIndex: 0
    }, {
        position: [2, 12, 22, 13],
        tetrominoRotationIndex: 1
    }],
    nextPosition: [6, 9, 10, 11]
}

let S = {
    name: "S",
    //Possible spawn position for the tetromino
    spawnPositions: [{
        position: [13, 12, 22, 21],
        tetrominoRotationIndex: 0
    }, {
        position: [17, 16, 26, 25],
        tetrominoRotationIndex: 0
    }, {
        position: [2, 12, 13, 23],
        tetrominoRotationIndex: 1
    }],
    nextPosition: [7, 6, 10, 9]
}

let Z = {
    name: "Z",
    //Possible spawn position for the tetromino
    spawnPositions: [{
        position: [1, 2, 12, 13],
        tetrominoRotationIndex: 0
    }, {
        position: [6, 7, 17, 18],
        tetrominoRotationIndex: 0
    }, {
        position: [3, 13, 12, 22],
        tetrominoRotationIndex: 1
    }],
    nextPosition: [5, 6, 10, 11]
}

let J = {
    name: "J",
    //Possible spawn position for the tetromino
    spawnPositions: [{
        position: [3, 13, 23, 22],
        tetrominoRotationIndex: 0
    }, {
        position: [7, 17, 27, 26],
        tetrominoRotationIndex: 0
    }, {
        position: [14, 13, 12, 2],
        tetrominoRotationIndex: 1
    }],
    nextPosition: [2, 6, 10, 9]
}

let L = {
    name: "L",
    //Possible spawn position for the tetromino
    spawnPositions: [{
        position: [3, 13, 23, 24],
        tetrominoRotationIndex: 0
    }, {
        position: [5, 15, 25, 26],
        tetrominoRotationIndex: 0
    }, {
        position: [11, 12, 13, 3],
        tetrominoRotationIndex: 1
    }],
    nextPosition: [1, 5, 9, 10]
}

let tetrominoesArray = [L];//I, O, T, J, L, S, Z

window.addEventListener("DOMContentLoaded", startGame);

//Making 200 divs and appending them to the board
function generateBoard()
{
    for (let i = 0; i < 200; i++) 
    {
        let boardPiece = document.createElement("div");
        gameBoard.appendChild(boardPiece);
    }
}

function generateNextTetrominoScreen(nextTetrominoScreen)
{
    for (let i = 0; i < 12; i++) 
    {
        let boardPiece = document.createElement("div");
        nextTetrominoScreen.appendChild(boardPiece);
    }
}

function startGame()
{
    generateBoard(gameBoard);
    generateNextTetrominoScreen(nextTetrominoScreen);
    boardPieces = document.querySelectorAll("#game-board div");
    nextScreenPieces = document.querySelectorAll("#next-tetromino-screen div");

    //Set the starting level to 1
    levelIndicator.innerText = "1";

    //Create Event listeners for clicks
    window.addEventListener("keydown", control);
    game.generateTetromino(boardPieces, nextScreenPieces, tetrominoesArray);

    //Listener for buttons
    btn_down.addEventListener("mouseup", () => {
        clearInterval(interval);
        intervalSpeed = level_1;
        interval = setInterval(moveOutcome, intervalSpeed);
    });
    
    // Event listener for mousedown to initiate downward movement
    btn_down.addEventListener("mousedown", () => {
        if (game.collisionDetector(down, boardPieces, boardWidth) === "landed") {
            console.log("Tetromino landed");
        } else {
            // Set a faster speed
            intervalSpeed = fasterSpeed;

            // Update the interval with the new speed
            clearInterval(interval);
            interval = setInterval(moveOutcome, intervalSpeed);

            // Move the tetromino immediately
            game.moveTetromino(down, boardPieces);
        }
    });

    btn_left.addEventListener("mousedown", () => {
        //First check if the there won't be any collisions
        if(game.collisionDetector(left, boardPieces, boardWidth) === "borderLeft")
        {
            console.log("Can't move past border (LEFT)");
        }
        else
        {
            game.moveTetromino(left, boardPieces);
        }
    });

    btn_right.addEventListener("mousedown", () => {
        if(game.collisionDetector(right, boardPieces, boardWidth) === "borderRight")
        {
            console.log("Can't move past border (Right)");
        }
        else
        {
            game.moveTetromino(right, boardPieces);
        }
        
    });

    //Rotation when pressing up arrow
    btn_up.addEventListener("mousedown", () => {
        game.rotate(boardPieces);
    });


    //Open menu when the menu button is clicked
    openMenu.addEventListener("click", () => {
        gameStopped = true;
        //close the menu modal
        popupMenu.showModal();
        //Restore the games movement
        clearInterval(interval);
    });

    //Close menu and resume the game when X is clicked
    closeMenu.addEventListener("click", () => {
        gameStopped = false;
        //close the menu modal
        popupMenu.close();
        //Restore the games movement
        interval = setInterval(moveOutcome, intervalSpeed);
    });

    //Event Listener for quit button on both modals
    quitBtn1.addEventListener("click", quit);
    quitBtn2.addEventListener("click", quit);

    intervalSpeed = level_1;
    interval = setInterval(moveOutcome, intervalSpeed);
}

//Function that runs every second and checks if tetromino
//can move down or side ways
function moveOutcome()
{
    //Check for imminent collision (down)
    if(game.collisionDetector(down, boardPieces, boardWidth) === "landed")
    {
        console.log("Tetromino landed");
        //if landed is returned then it means that 
        //tetromino can't move down anymore and has to 
        //stay and the bottom
        //if so it will be added to the landedTetrominos array
        //and a new tetromino will be generated

        //Check if player LOST
        if(game.checkForLose(boardPieces))
        {
            gameStopped = true;
            //close the menu modal
            popupLost.showModal();
            //Restore the games movement
            clearInterval(interval);
        }
        else
        {
            //Registering landed tetromino
            game.registerLandedTetromino();
            console.log("Tetromino registered");

            //Find completed rows
            let completedRows = game.findCompleteRows(boardPieces, boardHeight, boardWidth);

            //Check if completedRows has any completed rows
            if(completedRows.length > 0)
            {
                //Increment cleared rows and points 
                rowsCleared += completedRows.length;
                //Adding a certain amount of points depending on the amount of lines 
                //cleared
                if(completedRows.length === 1)
                {
                    //if 1 line is cleared add 40 points to the score
                    pointScore += 4000;
                }
                else if(completedRows.length === 2)
                {
                    //if 2 lines were cleared add 100 points to the score
                    pointScore += 100;
                }
                else if(completedRows.length === 3)
                {
                    //if 3 lines are cleared add 300 points to the score
                    pointScore += 300;
                }
                //TETRIS !!!
                else if(completedRows.length === 4)
                {
                    //if tetris is achieved add 1200 points to the score
                    pointScore += 1200;
                }

                //Then check if the player has made enough 
                //points to go to the next level
                //level 1: 0-1499 points
                //level 2: 1500 points
                //level 3 5000 points
                // Update the interval speed based on the current level
                clearInterval(interval);
                if (pointScore >= 5000) {
                    // Level 3
                    levelIndicator.innerText = "3";
                    intervalSpeed = level_3;
                } else if (pointScore >= 1500) {
                    // Level 2
                    levelIndicator.innerText = "2";
                    intervalSpeed = level_2;
                } else {
                    // Level 1
                    levelIndicator.innerText = "1";
                    intervalSpeed = level_1;
                }
                
                interval = setInterval(moveOutcome, intervalSpeed);

                //Then update the values in our points and cleared rows fields
                //Remove any completed rows for points
                clearedLinesF.innerText = rowsCleared;
                pointsScoredF.innerText = pointScore;
                
                animateClearedRows(boardPieces, boardWidth, completedRows);
            }
            else{
                console.log("No completed rows detected");
            }

            console.log("Tetromino accounter for");
            game.generateTetromino(boardPieces, nextScreenPieces, tetrominoesArray);
            clearInterval(interval);

            //Reset the speed of a tetromino
            intervalSpeed = level_1;
            
            console.log("Tetromino generated");
            interval = setInterval(moveOutcome, intervalSpeed);
        }
    }
    else
    {
        //Reset the interval back up (preventing accumilating 
        // intervals)

        console.log("Tetromino is still faling");
        game.moveTetromino(down, boardPieces)
        
    }

    //clearInterval(interval)
}

//A function that runs when the quit button is pressed
//it send the user to the main menu of tetris enhanced
function quit(){
    //Making achievementsArray into a JSON String
    /* const achievementArrayJSON = JSON.stringify(achievementsArray);
    The setting it recordScore name and value of achievementArrayJSON
    localStorage.setItem("achievements", achievementArrayJSON); */

    //Send the user back to the menu
    window.location.replace("menu.html");
}

//Function that controls tetrominoes movement and
//its rotation
function control(event)
{
    //if game is not stopped 
    //proceed
    if(!gameStopped)
    {
        //left
        if(event.keyCode === 65 || event.keyCode === 37)
        {
            console.log("left movement trigger");
            //First check if the there won't be any collisions
            if(game.collisionDetector(left, boardPieces, boardWidth) === "borderLeft")
            {
                console.log("Can't move past border (LEFT)");
            }
            else
            {
                game.moveTetromino(left, boardPieces);
            }
        }
        //right
        if(event.keyCode === 68 || event.keyCode === 39)
        {
            console.log("right movement trigger");
            //First check if the there won't be any collisions
            if(game.collisionDetector(right, boardPieces, boardWidth) === "borderRight")
            {
                console.log("Can't move past border (Right)");
            }
            else
            {
                game.moveTetromino(right, boardPieces);
            }
        }

        //rotate (up)
        if(event.keyCode === 87 || event.keyCode === 38)
        {
            //Rotate the current tetromino using its
            //rotationIndex and rotate it with the 
            //turnValue
            game.rotate(boardPieces);
        }

        //place down faster (doubleDown)
        if(event.keyCode === 83 || event.keyCode === 40)
        {
            console.log("faster down movement trigger");
            //First check if the there won't be any collisions
            if(game.collisionDetector(down, boardPieces, boardWidth) === "landed")
            {
                console.log("Tetromino landed");
            }
            else
            {
                intervalSpeed = fasterSpeed;
                game.moveTetromino(down, boardPieces);
            }
        }
    }
    
}

//Set cleared row animation to all 
//cleared rows
function animateClearedRows(boardPieces, boardWidth, completedRows) 
{
    clearInterval(interval);

    completedRows.forEach(row => {
        for (let item = row * boardWidth; item <= (row * boardWidth) + 9; item++) {
            //Remove other styling
            boardPieces[item].classList = [];
            // Add the flash class to initiate the animation
            boardPieces[item].classList.add("flash");
        }
    });

    // Force reflow to trigger the animation
    void boardPieces[0].offsetWidth;

    setTimeout(() => {
        // Remove the flash class to stop the animation
        completedRows.forEach(row => {
            for (let item = row * boardWidth; item <= (row * boardWidth) + 9; item++) {
                boardPieces[item].classList = [];
            }
        });
        // Remove thouse cleared rows
        game.clearCompleteRows(boardPieces, boardWidth, completedRows);
    }, 250);
}
