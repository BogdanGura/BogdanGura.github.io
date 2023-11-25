//!Don't forget to credit Lucas for achievements
//!Blockhead series

//Bogdan Gura 
//!Date Started: 11/2/2023
//Date Finished:

//Importing Achievement Class
import { Achievement } from "/Projects/TetrisEnhanced/Scripts/achievement.js";

//Importing Game Class
import { Game } from "/Projects/TetrisEnhanced/Scripts/game.js";

//Importing Player Class
import { Player } from "/Projects/TetrisEnhanced/Scripts/player.js";

//Importing Player Class
import { AI } from "/Projects/TetrisEnhanced/Scripts/AI.js";


//Variables
let gameBoard = document.getElementById("game-board");
let nextTetrominoScreen = document.getElementById("next-tetromino-screen");
let boardPieces;
let nextScreenPieces;
const game = new Game();
const player = new Player("Bogdan", "Yey I won", "No, I lost")
const boardWidth = 10;
const boardHeight = 20;
let interval;
//Movement directions
const down = 10;
const left = -1;
const right = 1;
//interval speeds
let intervalSpeed = 0;
const normalSpeed = 400;
const fasterSpeed = 300;
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

function generateNextTetrominoScreen()
{
    for (let i = 0; i < 12; i++) 
    {
        let boardPiece = document.createElement("div");
        nextTetrominoScreen.appendChild(boardPiece);
    }
}

function startGame()
{
    generateBoard();
    generateNextTetrominoScreen();
    boardPieces = document.querySelectorAll("#game-board div");
    nextScreenPieces = document.querySelectorAll("#next-tetromino-screen div");

    //Create Event listeners for clicks
    window.addEventListener("keydown", control);
    game.generateTetromino(boardPieces, nextScreenPieces);

    intervalSpeed = normalSpeed;
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

        //Registering landed tetromino
        game.registerLandedTetromino(boardPieces);
        console.log("Tetromino registered");

        //Find completed rows
        let completedRows = game.findCompleteRows(boardPieces, boardHeight, boardWidth);

        //Check if completedRows has any completed rows
        if(completedRows.length > 0)
        {
            //Remove any completed rows for points
            game.clearCompleteRows(boardPieces, boardWidth, completedRows);
        }
        else{
            console.log("No completed rows detected");
        }

        console.log("Tetromino accounter for");
        game.generateTetromino(boardPieces, nextScreenPieces);
        clearInterval(interval);

        console.log("Tetromino generated");
        interval = setInterval(moveOutcome, normalSpeed);
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

//Function that controls tetrominoes movement and
//its rotation
function control(event)
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