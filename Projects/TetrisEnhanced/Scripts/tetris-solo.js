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
let achievementField = document.getElementById("achievement-field");
let btn_down = document.getElementById("btn-down");
let btn_up = document.getElementById("btn-up");
let btn_left = document.getElementById("btn-left");
let btn_right = document.getElementById("btn-right");
let boardPieces;
let nextScreenPieces;
//Actual variables that store the games score
let pointScore = 0;
let rowsCleared = 0;
let pointsEarned = 0;
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

//Achievement names array
//just general achievements for tetris

//Blocks placed, lines cleared and points earned are all saved in 
//local storage
let achievementNames = ["'Welcome to Blockville'", "'Novice Blockhead'",
                        "'Certified Blockhead'", "'Champion Blockhead'",
                        "'God like Blockhead'", "'First Line cleared'",
                        "'15 lines cleared'", "'30 lines cleared'",
                        "'45 lines cleared'", "'60 lines cleared'",
                        "'1,000 points'", "'10,000 points'", 
                        "'50,000 points'", "'100,000 points'",
                        "'250,000 points'", "'Double Clear'", 
                        "'Triple Clear'", "'TETRIS'"];

//Array where achievement objects will be stored
let achievementsGeneralArray = [];

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

let tetrominoesArray = [I, O, T, J, L, S, Z];//I, O, T, J, L, S, Z

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

    //Check if achievements already exist or not

    //if it doesnt exist create achevements then
    if(localStorage.getItem("achievements-general") === null)
    {
        //Creates brand new achievements
        createAchievements(achievementNames, achievementsGeneralArray);

        //Instantly set the first achievement "Welcome to blockville to true"
        achievementsGeneralArray[0].earned = true;
    }
    //if it does parse it to the acheivements array from JSON
    else{
        //Get the JSON string for achievements
        let achievementsJSON = localStorage.getItem("achievements-general");

        //Parse it and set it to the achievements array
        achievementsGeneralArray = JSON.parse(achievementsJSON);
    }

    //Check if linesCleared, placedTetrominoes and pointsEarned
    //are present in the localStorage
    if(localStorage.getItem("linesCleared") === null &&
       localStorage.getItem("placedTetrominoes") === null &&
       localStorage.getItem("pointsEarned") === null)
    {
        //if the don't exist set them all to 0
        localStorage.setItem("linesCleared", "0");
        localStorage.setItem("placedTetrominoes", "0");
        localStorage.setItem("pointsEarned", "0");
    }
    else{
        console.log(localStorage);
    }

    intervalSpeed = level_1;
    interval = setInterval(moveOutcome, intervalSpeed);
}

//Achievement Functions
// Functions
function createAchievements(achievementNamesArray, targetArray) 
{
    for (let i = 0; i < achievementNamesArray.length; i++) {
        let messageOnCompletion = `${achievementNamesArray[i]} Achievement Earned`;
        // Creating the Achievement Object
        let achievement = new Achievement(achievementNamesArray[i], false, messageOnCompletion);
        // Then push the achievement object into the array
        targetArray.push(achievement);
    }
}

//Uses a forloop to check which 
//achivemets were earned and display them 
function displayEarnedAchievements(achievementsArray) {
    for (let i = 0; i < achievementsArray.length; i++) {
        if (achievementsArray[i].earned && achievementsArray[i].repeat) {
            achievementField.innerText = achievementsArray[i].messageOnUnlock;
            // Making sure the completed achievement won't log a message
            // When it was completed once
            achievementsArray[i].repeat = false; 

            // Start a setTimeout that will clear the field after 5 seconds
            setTimeout(() => {
                achievementField.innerText = "";
            }, 5000);
        }
    }
}

//Function that runs every second and checks if tetromino
//can move down or side ways
function moveOutcome()
{
    //Check for any achievements
    displayEarnedAchievements(achievementsGeneralArray);

    //Check for imminent collision (down)
    if(game.collisionDetector(down, boardPieces, boardWidth) === "landed")
    {
        console.log("Tetromino landed");
        //if landed is returned then it means that 
        //tetromino can't move down anymore and has to 
        //stay and the bottom
        //if so it will be added to the landedTetrominos array
        //and a new tetromino will be generated

        //Record that a tetromino have landed and add it to the 
        //landed tetrominoes record in local storage
        let currentPlacesTetrominoes = localStorage.getItem("placedTetrominoes");

        let placedTetrominoesIncremented = parseInt(currentPlacesTetrominoes) + 1;

        //Setting the new number of placed tetrominoes
        localStorage.setItem("placedTetrominoes", placedTetrominoesIncremented.toString());

        //!Then check for block Head achievements
        if(localStorage.getItem("placedTetrominoes") === "10")
        {
            //Set the first achievement in the blockhead series to
            // true
            achievementsGeneralArray[1].earned = true;
        }
        //same for the other achievements in this series
        else if(localStorage.getItem("placedTetrominoes") === "250")
        {
            achievementsGeneralArray[2].earned = true;
        }
        else if(localStorage.getItem("placedTetrominoes") === "500")
        {
            achievementsGeneralArray[3].earned = true;
        }
        else if(localStorage.getItem("placedTetrominoes") === "1000")
        {
            achievementsGeneralArray[4].earned = true;
        }

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
                //Adds the number of cleared rows to 
                //cleared rows in localStorage
                let currentClearedRows = localStorage.getItem("linesCleared");

                let clearedRowsUpdated = parseInt(currentClearedRows) + completedRows.length;

                //Setting the new number of placed tetrominoes
                localStorage.setItem("linesCleared", clearedRowsUpdated.toString());


                //Increment cleared rows and points 
                rowsCleared += completedRows.length;
                //Adding a certain amount of points depending on the amount of lines 
                //cleared
                if(completedRows.length === 1)
                {
                    //number of points earned is saved
                    //to conviniently add it to the 
                    //localStorage field "pointsEarned"
                    pointsEarned = 40;

                    //if 1 line is cleared add 40 points to the score
                    pointScore += 40;
                }
                else if(completedRows.length === 2)
                {
                    pointsEarned = 100;

                    //if 2 lines were cleared add 100 points to the score
                    pointScore += 100;

                    //2 lines cleared mark the double clear
                    //achievement as earned
                    achievementsGeneralArray[15].earned = true;
                }
                else if(completedRows.length === 3)
                {
                    pointsEarned = 300;

                    //if 3 lines are cleared add 300 points to the score
                    pointScore += 300;

                    //Achievement 3 lines cleared
                    achievementsGeneralArray[16].earned = true;
                }
                //TETRIS !!!
                else if(completedRows.length === 4)
                {
                    pointsEarned = 1200;
                    //if tetris is achieved add 1200 points to the score
                    pointScore += 1200;

                    //Achievement for getting a tetris
                    achievementsGeneralArray[17].earned = true;
                }

                //Add pointsEarned if it is greater than zero
                if(pointsEarned > 0)
                {
                    let currentPointsEarned = localStorage.getItem("pointsEarned");

                    let pointsEarnedUpdated = parseInt(currentPointsEarned) + pointsEarned;

                    //Setting the new number of placed tetrominoes
                    localStorage.setItem("pointsEarned", pointsEarnedUpdated.toString());

                    //!After some points were added perform a check and see if 
                    //!any achievements were triggered
                    if(parseInt(localStorage.getItem("pointsEarned")) >= 1000)
                    {
                        //Setting an achievements in the line clear series
                        achievementsGeneralArray[10].earned = true;
                    }
                    else if(parseInt(localStorage.getItem("pointsEarned")) >= 10000)
                    {
                        achievementsGeneralArray[11].earned = true;
                    }
                    else if(parseInt(localStorage.getItem("pointsEarned")) >= 50000)
                    {
                        achievementsGeneralArray[12].earned = true;
                    }
                    else if(parseInt(localStorage.getItem("pointsEarned")) >= 100000)
                    {
                        achievementsGeneralArray[13].earned = true;
                    }
                    else if(parseInt(localStorage.getItem("pointsEarned")) >= 250000)
                    {
                        achievementsGeneralArray[14].earned = true;
                    }
                }

                //!Check for lines cleared (achievements)
                if(parseInt(localStorage.getItem("linesCleared")) >= 1)
                {
                    //Setting an achievements in the line clear series
                    achievementsGeneralArray[5].earned = true;
                }
                else if(parseInt(localStorage.getItem("linesCleared")) >= 15)
                {
                    achievementsGeneralArray[6].earned = true;
                }
                else if(parseInt(localStorage.getItem("linesCleared")) >= 30)
                {
                    achievementsGeneralArray[7].earned = true;
                }
                else if(parseInt(localStorage.getItem("linesCleared")) >= 45)
                {
                    achievementsGeneralArray[8].earned = true;
                }
                else if(parseInt(localStorage.getItem("linesCleared")) >= 60)
                {
                    achievementsGeneralArray[9].earned = true;
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
