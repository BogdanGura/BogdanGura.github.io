/*    JavaScript 7th Edition
     Chapter 3
     Chapter case

     Tipton Turbines
     Program to display games results in a web table
     Author: Bogdan Gura
     Date:   4/11/2024 

     Filename: js03.js
 */

// Days of the week
let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday"];

//Window listeners
window.addEventListener("load", addWeekDays);
window.addEventListener("load", showGames);

//Function to write weekday names into a calendar
function addWeekDays() {
    let i = 0; //initial counter value

    //Getting the collection of heading cells
    let headingCells = document.getElementsByTagName("th");

    //Write each of the seven days into a cell
    while(i < 7) {
        headingCells[i].innerHTML = weekDays[i];

        //Increment the counter
        i++;
    }
}

//Function that will write game information into calendar
function showGames() {
    for(let i = 0; i < gameDates.length; i++) {
        let gameInfo = "";

        //Open paragraph
        switch(gameResults[i]) {
            case "W":
                gameInfo += "<p class='win'>";
                break;
            case "L":
                gameInfo += "<p class='lose'>";
                break;
            case "S":
                gameInfo += "<p class='suspended'>";
                break;
            case "P":
                gameInfo += "<p class='postponed'>";
                break;
        }

        //Display the game location
        if(gameLocations[i] === "h") {
            gameInfo += "vs. ";
        } else if(gameLocations[i] === "a") {
            gameInfo += "@ ";
        }

        //Include the opponent
        gameInfo += gameOpponents[i] + "<br>";

        //Include results and score
        gameInfo += gameResults[i] + ": (" + runsScored[i] + " - " + runsAllowed[i] + ")";

        //Display Innings
        if(gameInnings[i] < 5) {
            gameInfo += " [" + gameInnings[i] + "]***";
        } else if(gameInnings[i] < 9) {
            gameInfo += " [" + gameInnings[i] + "]*";
        } else if(gameInnings[i] > 9) {
            gameInfo += " [" + gameInnings[i] + "]";
        }

        //Close paragraph
        gameInfo += "</p>"

        //Write info to the table cell
        let tableCell = document.getElementById(gameDates[i]);
        tableCell.insertAdjacentHTML("beforeEnd", gameInfo);
    }
}
