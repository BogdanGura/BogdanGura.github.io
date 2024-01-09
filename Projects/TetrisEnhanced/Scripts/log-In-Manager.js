//Bogdan Gura

//Importing Achievement Class
import { Achievement } from "/Projects/TetrisEnhanced/Scripts/achievement.js";

let inputName  = document.getElementById("input-username");
let playSingle = document.getElementById("playSingle");
let playAI = document.getElementById("playAI");
let achievementBtn = document.getElementById("achievementBtn");
let clearSaveBtn = document.getElementById("clearBtn")
let errorDiv = document.getElementById("error-div");

//States fields
let recordPoints = document.getElementById("recordPoints");
let recordLines = document.getElementById("recordLinesCleared");
let recordTetrominoes = document.getElementById("recordTetrominoes");


//Achievement names for menu 
let achievementNamesMenu = ["'Oh holera, czy Freddy Fazbear ?'", "'Dictator'",
                        "'Polar Bear'", "'The Creator'","'Pain'",
                        "'My Bread and Butter'", "'Data Analyst who is a Snake'"];
//Achievement names for clearing a save
let achievementsNamesClear = ["'A Clean Slate at last'", "'An even clearer slate'",
                          "'An even even clearer slate'"];

//Achievement arrays
let achievementNamesArray = [];

let achievementsClearArray = [];

//Create Listeners && and load saved info
window.onload = loadSave;

//Functions
function createListeners()
{
    playSingle.addEventListener("click", saveAndCheckUserSolo);
    playAI.addEventListener("click", saveAndCheckUserAI);
    achievementBtn.addEventListener("click", saveAchievements);
    clearSaveBtn.addEventListener("click", clearSave);
}

//Functions

//Checking if field is filled before playing function
function saveAndCheckUserSolo() {
    //Username canbe atleast 5 symbols and no 
    //greater than 10 letters
    if(inputName.value && inputName.value.length >= 5 
        && inputName.value.length <= 20)
    {
        //if username exists
        if (localStorage.getItem("username") !== null) 
        {
            //!Before anything check the name achievements for the 
            //!menu
            switch(inputName.value)
            {
                case "HarHarHar": 
                    achievementNamesArray[0].earned = true;
                    break
                case "Lucas": 
                    achievementNamesArray[1].earned = true;
                    break
                case "Aaron": 
                    achievementNamesArray[2].earned = true;
                    break
                case "Bogdan": 
                    achievementNamesArray[3].earned = true;
                    break
                case "Back End": 
                    achievementNamesArray[4].earned = true;
                    break
                case "Java Script": 
                    achievementNamesArray[5].earned = true;
                    break
                case "Python": 
                    achievementNamesArray[6].earned = true;
                    break
            }
            updateLocalStorage(achievementNamesArray, "name-achievements");

            //if username field doesn't correspond to username in 
            // local Storage, orride the previous username 
            //with a new one and start the game
            if (inputName.value !== localStorage.getItem("username")) {
                localStorage.setItem("username", inputName.value);
                window.location.replace("tetris-solo.html");
            }
            else{
                //if the username matches, start the game
                window.location.replace("tetris-solo.html");
            }
        }
        else{
            //if the username in localStorage doesn't exists
            //set it to the fields value and start the game
            localStorage.setItem("username", inputName.value);
            switch(inputName.value)
            {
                case "HarHarHar": 
                    achievementNamesArray[0].earned = true;
                    break
                case "Lucas": 
                    achievementNamesArray[1].earned = true;
                    break
                case "Aaron": 
                    achievementNamesArray[2].earned = true;
                    break
                case "Bogdan": 
                    achievementNamesArray[3].earned = true;
                    break
                case "Back End": 
                    achievementNamesArray[4].earned = true;
                    break
                case "Java Script": 
                    achievementNamesArray[5].earned = true;
                    break
                case "Python": 
                    achievementNamesArray[6].earned = true;
                    break
            }
            updateLocalStorage(achievementNamesArray, "name-achievements");
            window.location.replace("tetris-solo.html");
        }    
    }
    //Under 4 symbols but at least 1
    else if(inputName.value.length < 5 && inputName.value.length >= 1)
    {
        inputName.style.border = "5px red solid";
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "25px";
        errorDiv.innerText = "Username has to be AT LEAST 5 symbols long";
    }
    //Over 10 symbols
    else if(inputName.value.length > 20)
    {
        inputName.style.border = "5px red solid";
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "25px";
        errorDiv.innerText = "Username can't be over 20 symbols";
    }
    //Input is empty
    else{
        inputName.style.border = "5px red solid";
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "25px";
        errorDiv.innerText = "You forgot to type your username :)";
    }
}

function saveAndCheckUserAI() {
    //Username canbe atleast 5 symbols and no 
    //greater than 10 letters
    if(inputName.value && inputName.value.length >= 5 
        && inputName.value.length <= 20)
    {
        //if username exists
        if (localStorage.getItem("username") !== null) 
        {
            switch(inputName.value)
            {
                case "HarHarHar": 
                    achievementNamesArray[0].earned = true;
                    break
                case "Lucas": 
                    achievementNamesArray[1].earned = true;
                    break
                case "Aaron": 
                    achievementNamesArray[2].earned = true;
                    break
                case "Bogdan": 
                    achievementNamesArray[3].earned = true;
                    break
                case "Back End": 
                    achievementNamesArray[4].earned = true;
                    break
                case "Java Script": 
                    achievementNamesArray[5].earned = true;
                    break
                case "Python": 
                    achievementNamesArray[6].earned = true;
                    break
            }
            updateLocalStorage(achievementNamesArray, "name-achievements");
            //if username field doesn't correspond to username in 
            // local Storage, orride the previous username 
            //with a new one and start the game
            if (inputName.value !== localStorage.getItem("username")) {
                localStorage.setItem("username", inputName.value);

                //updating the localStorage
                window.location.replace("tetris-vs-ai.html");
            }
            else{
                //if the username matches, start the game
                window.location.replace("tetris-vs-ai.html");
            }
        }
        else{
            //if the username in localStorage doesn't exists
            //set it to the fields value and start the game
            localStorage.setItem("username", inputName.value);
            switch(inputName.value)
            {
                case "HarHarHar": 
                    achievementNamesArray[0].earned = true;
                    break
                case "Lucas": 
                    achievementNamesArray[1].earned = true;
                    break
                case "Aaron": 
                    achievementNamesArray[2].earned = true;
                    break
                case "Bogdan": 
                    achievementNamesArray[3].earned = true;
                    break
                case "Back End": 
                    achievementNamesArray[4].earned = true;
                    break
                case "Java Script": 
                    achievementNamesArray[5].earned = true;
                    break
                case "Python": 
                    achievementNamesArray[6].earned = true;
                    break
            }
            updateLocalStorage(achievementNamesArray, "name-achievements");
            window.location.replace("tetris-vs-ai.html");
        }    
    }
    //Under 4 symbols but at least 1
    else if(inputName.value.length < 5 && inputName.value.length >= 1)
    {
        inputName.style.border = "5px red solid";
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "25px";
        errorDiv.innerText = "Username has to be AT LEAST 5 symbols long";
    }
    //Over 10 symbols
    else if(inputName.value.length > 20)
    {
        inputName.style.border = "5px red solid";
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "25px";
        errorDiv.innerText = "Username can't be over 20 symbols";
    }
    //Input is empty
    else{
        inputName.style.border = "5px red solid";
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "25px";
        errorDiv.innerText = "You forgot to type your username :)";
    }
}

//Loads name achievements and 
//clear history achievements
//into local storage
function saveAchievements()
{
    let nameAchievementsJSON = JSON.stringify(JSON.parse(localStorage.getItem("name-achievements")));
    let clearAchievementsJSON = JSON.stringify(JSON.parse(localStorage.getItem("clear-save-achievements")));

    localStorage.setItem("name-achievements", nameAchievementsJSON);
    localStorage.setItem("clear-save-achievements", clearAchievementsJSON);
}

//loads info from locale storage to the 
//main page
//loads info from local storage to the main page
function loadSave() 
{
    console.log(localStorage);
    //Check if achievements exist, if not make them
    //and put them in local storage
    if(localStorage.getItem("name-achievements") === "null" ||
       localStorage.getItem("clear-save-achievements") === "null" ||
       localStorage.getItem("cleared-save-num") === "null" ||
       localStorage.getItem("cleared-save-num") === null)
    {
        // if achievements don't exist, make them
        createAchievements(achievementNamesMenu, achievementNamesArray);
        createAchievements(achievementsNamesClear, achievementsClearArray);

        // Set the cleared-save-num to 0
        localStorage.setItem("cleared-save-num", "0");
    }
    else {
        // Load existing cleared-save-num value
        let existingClearedNum = localStorage.getItem("cleared-save-num");

        // You can log the existing value if needed
        console.log("Existing cleared-save-num:", existingClearedNum);

        //Setting existing array to those
        achievementNamesArray = JSON.parse(localStorage.getItem("name-achievements"));
        achievementsClearArray = JSON.parse(localStorage.getItem("clear-save-achievements"));
    }


    // Load the saved username
    inputName.value = localStorage.getItem("username");

    // Load the record score or set it to 0 if not found
    const linesCleared = localStorage.getItem("linesCleared");
    const placedTetrominoes = localStorage.getItem("placedTetrominoes");
    const pointsEarned = localStorage.getItem("pointsEarned");

    
    //Setting thouse fiels to localStorage values
    //if it exists of course
    if(linesCleared === null &&
       placedTetrominoes === null &&
       pointsEarned === null)
    {
        recordPoints.innerText = "0";
        recordTetrominoes.innerText = "0";
        recordLines.innerText = "0";    
    }
    else{
        recordPoints.innerText = pointsEarned;
        recordTetrominoes.innerText = placedTetrominoes;
        recordLines.innerText = linesCleared;
    }
    
    // Create Listeners
    createListeners();
}

//Clears the local storage
function clearSave()
{
    //Incremet the number in the clearedSaveNum
    //in local storage 
    let incrementedClearedNumber = parseInt(localStorage.getItem("cleared-save-num")) + 1;
    localStorage.setItem("cleared-save-num", incrementedClearedNumber.toString())

    //Check for clear save achievements
    if(localStorage.getItem("cleared-save-num") !== null)
    {
        switch (localStorage.getItem("cleared-save-num")) 
    {
        case "1":
            achievementsClearArray[0].earned = true;  
            break;
        
        case "2":
            achievementsClearArray[1].earned = true;
            break;

        case "3":
            achievementsClearArray[2].earned = true;
            break;
    }
    }
    
    //Clearing save
    localStorage.removeItem("achievements-ai");
    localStorage.removeItem("achievements-general");
    localStorage.removeItem("linesCleared");
    localStorage.removeItem("placedTetrominoes");
    localStorage.removeItem("pointsEarned");
    localStorage.removeItem("name-achievements");
    localStorage.removeItem("username");
    //Removing previous username from the field
    inputName.value = "";
    //Setting stats fiels to zero
    recordPoints.innerText = "0";
    recordTetrominoes.innerText = "0";
    recordLines.innerText = "0";    
    //Notifying text apears that save was cleared
    errorDiv.style.color = "#00ff00"; 
    errorDiv.style.fontSize = "25px";
    errorDiv.innerText = "Save was cleared succesfully"
    //Removing red border
    inputName.style.border = "1px grey solid";
    //Then it disapears after 3 seconds
    //Using set simeout
    setTimeout(() => {
        errorDiv.innerText = "";
    }, 3000);
}

function updateLocalStorage(newArray, itemName)
{
    //new array is stringified
    let newAr = JSON.stringify(newArray);

    //the new array is set under itemName
    localStorage.setItem(itemName, newAr);
}

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