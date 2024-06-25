//Bogdan Gura
let inputName  = document.getElementById("input-username");
let recordScore = document.getElementById("recordScore");
let playBtn = document.getElementById("playBtn");
let clearSaveBtn = document.getElementById("clearBtn")
let errorDiv = document.getElementById("error-div");
let recordScoreField = document.getElementById("recordScore");

//Create Listeners && and load saved info
window.onload = loadSave;

//Functions
function createListeners()
{
    playBtn.addEventListener("click", saveAndCheckUser);
    clearSaveBtn.addEventListener("click", clearSave);
}

//Functions

//Checking if field is filled before playing function
function saveAndCheckUser() {
    //Username canbe atleast 5 symbols and no 
    //greater than 10 letters
    if(inputName.value && inputName.value.length >= 5 
        && inputName.value.length <= 20)
    {
        //if username exists
        if (localStorage.getItem("username") !== null) {
            //if username field doesn't correspond to username in 
            // local Storage, orride the previous username 
            //with a new one and start the game
            if (inputName.value !== localStorage.getItem("username")) {
                localStorage.setItem("username", inputName.value);
                window.location.replace("/Projects/SnakeGameEnchanced/Html/snake-game.html");
            }
            else{
                //if the username matches, start the game
                window.location.replace("/Projects/SnakeGameEnchanced/Html/snake-game.html");
            }
        }
        else{
            //if the username in localStorage doesn't exists
            //set it to the fields value and start the game
            localStorage.setItem("username", inputName.value);
            window.location.replace("/Projects/SnakeGameEnchanced/Html/snake-game.html");
        }    
    }
    //Under 4 symbols but at least 1
    else if(inputName.value. length < 5 && inputName.value.length >= 1)
    {
        inputName.style.border = "5px #8B0000 solid";
        errorDiv.style.color = "#8B0000";
        errorDiv.style.fontSize = "25px";
        errorDiv.innerText = "Username has to be AT LEAST 5 symbols long";
    }
    //Over 10 symbols
    else if(inputName.value. length > 20)
    {
        inputName.style.border = "5px #8B0000 solid";
        errorDiv.style.color = "#8B0000";
        errorDiv.style.fontSize = "25px";
        errorDiv.innerText = "Username can't be over 20 symbols";
    }
    //Input is empty
    else{
        inputName.style.border = "5px #8B0000 solid";
        errorDiv.style.color = "#8B0000";
        errorDiv.style.fontSize = "25px";
        errorDiv.innerText = "You forgot to type your username :)";
    }
}

//loads info from locale storage to the 
//main page
//loads info from local storage to the main page
function loadSave() {
    // Load the saved username
    inputName.value = localStorage.getItem("username");

    // Load the record score or set it to 0 if not found
    const savedRecordScore = localStorage.getItem("recordScore");
    recordScoreField.innerText = savedRecordScore !== null ? savedRecordScore : "0";

    // Create Listeners
    createListeners();
}

//Clears the local storage
function clearSave()
{
    //Clearing save
    localStorage.removeItem("username");
    localStorage.removeItem("recordScore");
    localStorage.removeItem("achievements");
    //Removing previous username from the field
    inputName.value = "";
    recordScore.innerText = "0";
    //Notifying text apears that save was cleared
    errorDiv.style.color = "rgb(30, 255, 0)";
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