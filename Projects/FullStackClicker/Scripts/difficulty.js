//Bogdan Gura
function clearLocalStorageEasy()
{
    localStorage.clear();
    //Locate user to the game
    //with difficulty selected
    window.location.href = "clicker.html?difficulty=easy";
}

function clearLocalStorageMid()
{
    localStorage.clear();
    window.location.href = "clicker.html?difficulty=mid";
}

function clearLocalStorageHard()
{
    localStorage.clear();
    window.location.href = "clicker.html?difficulty=hard";
}

// Variables
let image = document.getElementById("image");
let textArea = document.getElementById("textArea");

// Text describing the difficulty

// Variables for default state
let defaultText = "Select a difficulty to view information about it.";
let defaultImage = "/Projects/FullStackClicker/images/no-selection-icon.png";

// Variables for hovering over easy difficulty
let easyText = "On the easiest difficulty, your time is <span class='good'>doubled</span>, " +
               "prices and cooldowns for projects are <span class='good'>cut in half</span>. " +
               "Your goal is to earn <span class='goal'>$300,000</span> before the timer hits zero.";

let easyImage = "/Projects/FullStackClicker/images/easy-icon.png";

// Variables for hovering over easy difficulty
let mediumText = "On the medium difficulty, your time is not affected and is kept at a default value (30 minutes). " +
                 "Upgrade, project, and cooldown values aren't modified. Your target for this difficulty would be " +
                 "<span class='goal'>$750,000</span>.";

let mediumImage = "/Projects/FullStackClicker/images/medium-icon.png";

// Variables for hovering over easy difficulty
let hardText = "On the hardest difficulty, your time is <span class='bad'>halved</span>, " +
               "prices and cooldowns for projects are <span class='bad'>doubled</span>. " +
               "Your goal is to earn <span class='goal'>$2,000,000</span> before the timer hits zero.";

let hardImage = "/Projects/FullStackClicker/images/hard-icon.png";

// Button listeners

// Easy listeners
document.getElementById("easy").addEventListener("mouseover", easyInfo);
document.getElementById("easy").addEventListener("mouseout", defaultInfo);

// Medium listeners
document.getElementById("medium").addEventListener("mouseover", mediumInfo);
document.getElementById("medium").addEventListener("mouseout", defaultInfo);

// Hard listeners
document.getElementById("hard").addEventListener("mouseover", hardInfo);
document.getElementById("hard").addEventListener("mouseout", defaultInfo);

// functions to display info and no selection to the user about difficulty chosen
function easyInfo() {
    image.src = easyImage;
    textArea.innerHTML = easyText;
}

function mediumInfo() {
    image.src = mediumImage;
    textArea.innerHTML = mediumText;
}

function hardInfo() {
    image.src = hardImage;
    textArea.innerHTML = hardText;
}

// Function that will set the image src and 
// h2 innerHtml to their default states if 
//player is not hovering over any difficulty
function defaultInfo() {
    image.src = defaultImage;
    textArea.innerHTML = defaultText;
}