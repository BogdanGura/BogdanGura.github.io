//Name: Bogdan Gura

//! Started 10/19/2023
//Finished 10/23/2023

//Importing Achievement Class
import { Achievement } from "/Projects/SnakeGameEnchanced/Scripts/achievement.js";

//Global Variables
let width = 10;
let currentSnake = [37, 38, 39];
let direction = -1; // 1 (right), -1 (left), 10 (up), -10(down) 
let score = 0;
let speed = 0.05;
let intervalTime = 0;
let interval = 0;
let gameOverMessage = "";
//DOM Elements
let board = document.getElementById("board");
let restartBtn1 = document.getElementById("gameRestart1");
let restartBtn2 = document.getElementById("gameRestart2");
let scoreDiv = document.getElementById("score");
let recordScoreDiv = document.getElementById("recordScore");
let popupLost = document.querySelector(".popup-lost");
let popupMenu = document.querySelector(".popup-menu");
let openMenu = document.getElementById("openMenuBtn");
let closeMenu = document.getElementById("closeMenuBtn");
let reasonForLoss = document.getElementById("reasonForLoss");
let quitBtn1 = document.getElementById("quitGameBtn1");
let quitBtn2 = document.getElementById("quitGameBtn2");
let achievementField = document.getElementById("achievementField");
//Buttons
let btnUp = document.getElementById("btn-up");
let btnLeft = document.getElementById("btn-left");
let btnRight = document.getElementById("btn-right");
let btnDown = document.getElementById("btn-down");
//Achievement names array and messages upon unlocking
let achievementNames = ["'First Apple'", "'Bronze Apple'", "'Silver Apple'", "'Gold Apple'",
                       "'Platinum Apple'", "'That was a misclick!'", "'BOOM!!!'", "'OUCH, it hurts'"];

//Message for achievement unlock 
//"Congratulations, you unlocked 'First Apple' Achievement";

let achievementsArray = [];

// Window loading the game
window.addEventListener("DOMContentLoaded", () => {
    // Create a listener for the document so it can
    //listen for clicks and buttons
    document.addEventListener("keyup", control);
    btnUp.addEventListener("click", () => (direction = -width));
    btnDown.addEventListener("click", () => (direction = +width));
    btnLeft.addEventListener("click", () => (direction = -1));
    btnRight.addEventListener("click", () => (direction = 1));

    //Open menu when the menu button is clicked
    openMenu.addEventListener("click", () => {
        //close the menu modal
        popupMenu.showModal();
        //Restore the games movement
        clearInterval(interval);
    });

    //Close menu and resume the game when X is clicked
    closeMenu.addEventListener("click", () => {
        //close the menu modal
        popupMenu.close();
        //Restore the games movement
        interval = setInterval(moveOutcome, intervalTime);
    });

    //Event Listener for quit button on both modals
    quitBtn1.addEventListener("click", quit);
    quitBtn2.addEventListener("click", quit);
    //Check if achievements localeStorage doesn't exists,
    //Board is generated
    generateBoard();
    //Game is started
    startGame();
    // Restart buttons listener (For both modals)
    restartBtn1.addEventListener("click", restart);
    restartBtn2.addEventListener("click", restart);
});

// Functions


function createAchievements() {
    for (let i = 0; i < achievementNames.length; i++) {
        let messageOnCompletion = `Congratulations, you earned ${achievementNames[i]}`;
        // Creating the Achievement Object
        let achievement = new Achievement(achievementNames[i], false, messageOnCompletion);
        // Then push the achievement object into the array
        achievementsArray.push(achievement);
    }
}

//Uses a forloop to check which 
//achivemets were earned and display them 
function displayEarnedAchievements() {
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
//Making 100 divs and appending them to the board
function generateBoard()
{
    for (let i = 0; i < 100; i++) 
    {
        let boardPiece = document.createElement("div");
        board.appendChild(boardPiece);
    }
}

function startGame() {
    let squares = document.querySelectorAll(".board div");

    // Reset the game state
    currentSnake = [37, 38, 39];
    direction = -1;
    intervalTime = 700;
    //Make achivements only if there isnt anything
    //in local Storage 
    if (localStorage.getItem("achievements") === null) {
        createAchievements();
    } else {
        //If achivements already exist fill the 
        //achievementsArray from the localStorage
        //by parsing the JSON tring and then 
        //putting it into the achievementsArray
        let achivementJSONString = localStorage.getItem("achievements");
        achievementsArray = JSON.parse(achivementJSONString);
    }
    
    // Retrieve the recordScore from localStorage and set it in the recordScoreDiv
    let storedRecordScore = localStorage.getItem("recordScore");
    if (storedRecordScore) {
        recordScoreDiv.textContent = storedRecordScore;
    } else {
        recordScoreDiv.textContent = "0"; // Default value if there is no recordScore in localStorage
    }

    // Spawn an apple
    randomApple(squares);

    // Display score
    scoreDiv.innerHTML = score;

    // Set up the snake class on the divs with snake coordinates
    currentSnake.forEach((snakeDivIndex) => {
        squares[snakeDivIndex].classList.add("snake");
    });

    // Set the recurring interval so the snake can move
    interval = setInterval(moveOutcome, intervalTime);
}

//MoveOutcome function
function moveOutcome() {
    let squares = document.querySelectorAll(".board div");

    if (checkForHits(squares)) {
        reasonForLoss.innerText = gameOverMessage;
        popupLost.showModal();

        //Save the score to the local Storage 
        //Check if item exists in localeStorage
        if(localStorage.getItem("recordScore") !== null)
        {
            //If new score is greater than the last one ovveride it
            if(score > Number(localStorage.getItem("recordScore")))
            {
                //Override that old record with a new one
                localStorage.setItem("recordScore", score.toString());
                recordScoreDiv.innerHTML = localStorage.getItem("recordScore");
            }
        }
        //if it doesnt exist, create the item
        else{
            localStorage.setItem("recordScore", score.toString());
            recordScoreDiv.innerHTML = localStorage.getItem("recordScore");
        }

        clearInterval(interval);
    } else {
        //Display Earned achievements
        displayEarnedAchievements();
        //Move snake
        moveSnake(squares);
    }
}

//Moves the snake in the derection chosen
function moveSnake(squares)
{
    let tail = currentSnake.pop();
    //Removing styling from the tail
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    //movement ends
    squares[currentSnake[0]].classList.add("snake");
    //Apple clipping bug fixed (Thanks Kaden. Again)
    eatApple(squares, tail);
}

//Checks if the snake has hit a wall or a mine
function checkForHits(squares)
{
    /* if(
        //Check if snake hit bottom border
        (currentSnake[0] + width >= width * width && direction === width) ||
        //Checking hits on the right
        (currentSnake[0] % width === width -1 && direction === 1) ||
        //Left border
        (currentSnake[0] % width === 0 && direction === -1) ||
        //up border
        (currentSnake[0] - width <= 0 && direction === -width) ||
        //Check if snake bite itself
        (squares[currentSnake[0] + direction].classList.contains("snake"))
    ) */
    if((currentSnake[0] + width >= width * width && direction === width) ||
       (currentSnake[0] % width === width -1 && direction === 1) ||
       (currentSnake[0] % width === 0 && direction === -1) ||
       (currentSnake[0] - width < 0 && direction === -width))
       //Thanks Kaden :)
    {
        //Make multiple phrases input them into an array and select randomly
        gameOverMessage = "You hit matrix walls";
        //Set Border achievement to true
        console.log(achievementsArray[5]);
        console.log(achievementsArray.length);
        achievementsArray[5].earned = true;
        return true;
    }
    if(squares[currentSnake[0] + direction].classList.contains("mine"))
    {
        gameOverMessage = "You blew up on a mine";
        //Set Mine achievement to true
        achievementsArray[6].earned = true;
        return true;
    }
    if(squares[currentSnake[0] + direction].classList.contains("snake"))
    {
        gameOverMessage = "You bit yourself, OUCH";
        //Set Biting yourself achievement to true
        achievementsArray[7].earned = true;
        return true;
    }
    
    //Functionality for hitting a mine
    // statgement what not
    //Return true if hits are detected (I will add mines here too)
    else{
        return false;
    }
}

//Generates an apple at a random postion on the board
function randomApple(squares) {
    let appleIndex;
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake") || 
             squares[appleIndex].classList.contains("mine") ||
             squares[appleIndex].classList.contains("apple"));
    squares[appleIndex].classList.add("apple");
    console.log(`Apple added at ${appleIndex}`);
}

//Generates an apple at a random postion on the board
function randomMine(squares)
{
    let mineIndex;
    do{
        mineIndex = Math.floor(Math.random() * squares.length)
    }
    while(squares[mineIndex].classList.contains("snake") ||
          squares[mineIndex].classList.contains("apple") || 
          squares[mineIndex].classList.contains("mine"))

    //After loop ends
    //make apple visible
    squares[mineIndex].classList.add("mine");
    console.log(`Mine planted added at ${mineIndex}`)
}

//apple eating functionality
function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) 
    {
      squares[currentSnake[0]].classList.remove("apple");

      squares[tail].classList.add("snake");
      currentSnake.push(tail);

      randomApple(squares);
      score ++;
      scoreDiv.textContent = score;

      //Check for achievements

      //First apple achievement
      if(score > 0)
      {
        achievementsArray[0].earned = true;
      }
      //Bronze apple (5 apples)
      if(score >= 5)
      {
        achievementsArray[1].earned = true;
      }
      //Silver apple (10 apples)
      if(score >= 10)
      {
        achievementsArray[2].earned = true;
      }
      //Gold apple (15 apples)
      if(score >= 15)
      {
        achievementsArray[3].earned = true;
      }
      //Platinum apple (20 apples)
      if(score >= 20)
      {
        achievementsArray[4].earned = true;
      }

      //Spawn a mine every time a apple is eaten (after the first one is eaten)
      randomMine(squares);

      // Clear the current interval
      clearInterval(interval);

      // Calculate the new interval time and create a new interval
      intervalTime -= intervalTime * speed;
      interval = setInterval(moveOutcome, intervalTime);
    }
}

//Function that sets the direction for the 
//snake when buttons are pressed
function control(event)
{
    //Up, W or up arrow or up button (-10)
    if(event.keyCode === 38 || event.keyCode === 87)
    {
        //If the direction selected before hand
        // isn't down, than register the button
        //if not do nothing
        if(direction !== +width)
        {
            direction = -width;
        }
        else{
            console.log("Can't go backwards");
        }
        //console.log("UP botton is pressed");
    }
    //Left button, a or a left arrow (-1)
    if(event.keyCode === 37 || event.keyCode === 65)
    {
        if(direction !== 1)
        {
            direction = -1;
        }
        else{
            console.log("Can't go backwards");
        }
        //console.log("LEFT botton is pressed");
    }
    //Right button, d or a right arrow (1)
    if(event.keyCode === 39 || event.keyCode === 68)
    {
        if(direction !== -1)
        {
            direction = 1;
        }
        else{
            console.log("Can't go backwards");
        }
        //console.log("RIGHT botton is pressed");
    }
    //Down button, s or a down arrow (+10)
    if(event.keyCode === 40 || event.keyCode === 83)
    {
        if(direction !== -width)
        {
            direction = +width;
        }
        else{
            console.log("Can't go backwards");
        }
        
        //console.log("DOWN botton is pressed");
    }
}

//Restart function restarts the whole
//game if player chooses to play
//again
function restart() {
    // Clear the game interval
    clearInterval(interval);

    board.innerHTML = "";
    //Save the score before erasing it
    score = 0;
    // Close all modals
    popupLost.close();
    popupMenu.close();
    
    // Start up the game again
    generateBoard();
    startGame();
}

//The quit function runs when the player
//wants to exit the snake game
//quit function saves the achievements
//into local storage via JSON string
//the whole achievements array
//then it opens the menu.html
function quit(){
    //Making achievementsArray into a JSON String
    const achievementArrayJSON = JSON.stringify(achievementsArray);
    //The setting it recordScore name and value of achievementArrayJSON
    localStorage.setItem("achievements", achievementArrayJSON);

    //Send the user back to the menu
    window.location.replace("menu.html");
}
