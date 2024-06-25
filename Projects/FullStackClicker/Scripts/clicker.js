//Bogdan Gura
// Elements
let countDownEl = document.getElementById("countdown");
let jsBookImg = document.getElementById("jsBook");
let workImg = document.getElementById("job");
let moneyScoreElement = document.getElementById("moneyScoreElement");
let xpScoreElement = document.getElementById("xpScoreElement");
let storeContainer = document.querySelector(".store-container");
let infoContainer = document.querySelector(".info-container");
let actionContainer = document.querySelector(".actions-menu-container");
let moneyPerSecondField = document.getElementById("money-per-second-field");
let assetViewContainer = document.querySelector(".view-assets-container");
let openMenuBtn = document.getElementById("openMenuBtn");
let menuModal = document.getElementById("popup-menu");
let closeMenuBtn = document.getElementById("popup-menu");
let lostModal = document.getElementById("popup-lost");
let winModal = document.getElementById("popup-won");
let savedBtn = document.getElementById("saved-btn");
let savedText = document.getElementById("saved-text");
let currentBalance = document.getElementById("currentBalance");
let moneyEndGoal = document.getElementById("moneyGoal");

//Sound Elements
let xpClickSound = document.getElementById("clickSoundXP");
let moneyClickSound = document.getElementById("clickSoundMoney");
let clickSoundPurchase = document.getElementById("clickSoundPurchase");

//Element lists
let storeUpgradesList;
//The whole list
let projectsList;

//Timer settings
let minutes = 30;
let minutesInSeconds = minutes * 60;

//Cooldown times for projects (seconds)
const pizzaFormCooldownOriginal = 30;
const toDoListCooldownOriginal = 60;
const frogPuzzleCooldownOriginal = 120;
const clickerGameCooldownOriginal = 180;
const snakeEnhancedCooldownOriginal = 240;
const tetrisEnhancedCooldownOriginal = 360;
const fakeECommerceCooldownOriginal = 600;
let pizzaFormCooldown;
let toDoListCooldown;
let frogPuzzleCooldown;
let clickerGameCooldown; 
let snakeEnhancedCooldown; 
let tetrisEnhancedCooldown;
let fakeECommerceCooldown;

//array with all the cooldowns
let cooldownsArray = [
    pizzaFormCooldownOriginal,
    toDoListCooldownOriginal,
    frogPuzzleCooldownOriginal,
    clickerGameCooldownOriginal,
    snakeEnhancedCooldownOriginal,
    tetrisEnhancedCooldownOriginal,
    fakeECommerceCooldownOriginal
];

//Intervals for each upgrade

//lvl 1 interval
let pizzaFormInterval;
let toDoListInterval;
let frogPuzzleInterval;

//lvl 2 intervals
let clickerGameInterval;
let snakeEnhancedInterval;
let tetrisEnhancedInterval;

//lvl 3 intervals
let fakeECommerceInterval;

//Interval for money per second 
let mpsInterval;

//Interval for clock
let timeInterval;

//Score elements
let moneyScore = 0;
let xpScore = 0;

//Earning Rates for jobs and assets (money)
let fastFoodRate = 4;
let moneyPerSecond = 0;

//Earning goals
let easyMoneyGoal = 300000;
let midMoneyGoal = 750000;
let hardMoneyGoal = 2000000;

let moneyGoal;

//Earning rates for xp
let xpEarningRate = 0;

//Difficulty setting

//Upgrade names array 
let upgradeImgNames = ["CSS/HTML Book", "JS Book Lvl 1",
                       "JS Book Lvl 2", "SQL Book", "PHP Book",
                        "JS Book Lvl 3", "React JS Book", "Ajax Book"];

//Practice projects names
let projectNames = ["Pizza-Order-Form", "To-Do-List", "Frog-Puzzle",
                    "Clicker-Game", "Snake-Enhanced", "Tetris-Enhanced",
                    "Fake-E-Commerce-Store"];

let assetNames = ["Website-with-Games", "E-Commerce-Store",
                  "Neural-Net", "Crypto-Trading-Platform"];

let assetContainerNames = ["Website-with-Games-Container", "E-Commerce-Store-Container",
                            "Neural-Net-Container", "Crypto-Trading-Platform-Container"];

//Upgrade upgrades
let cssHTMLBook = {
    name: "CSS/HTML Book",
    description: "A begginer's guide into the world of web development. (Allows to Earn XP)",
    moneyPrice: 60,
    xpPrice: 0,
    specialRequirments: "NONE",
    bought: false,
    xpBonus: 5,
    lvl: "lvl1",
    class: "upgrade",
    gives: "Allows player to earn xp and adds 5 xp per click to the players xp rate"
}

let jsBookLvl1 = {
    name: "JS Book Lvl 1",
    description: "A begginer's guide to Java Script. (Allows to Earn XP)",
    moneyPrice: 100,
    xpPrice: 0,
    specialRequirments: "NONE",
    bought: false,
    xpBonus: 10,
    lvl: "lvl1",
    class: "upgrade",
    gives: "Allows player to earn xp and adds 10 xp per click to the players xp rate"
}

//lvl 2 upgrades
let jsBookLvl2 = {
    name: "JS Book Lvl 2",
    description: "Intermediate guide to Java Script",
    moneyPrice: 250,
    xpPrice: 0,
    specialRequirments: "JS Book Lvl 1",
    bought: false,
    xpBonus: 20,
    lvl: "lvl2",
    class: "upgrade",
    gives: "Additional 20 XP per click"
}

let sqlTextBook = {
    name: "SQL Book",
    description: "A begginer's guide into the world backend server queries",
    moneyPrice: 350,
    xpPrice: 0,
    specialRequirments: "NONE",
    bought: false,
    xpBonus: 20,
    lvl: "lvl2",
    class: "upgrade",
    gives: "Additional 20 XP per click"
}

let phpTextBook = {
    name: "PHP Book",
    description: "A beginers guide to managing servers and backend applications",
    moneyPrice: 450,
    xpPrice: 0,
    specialRequirments: "NONE",
    bought: false,
    xpBonus: 25,
    lvl: "lvl2",
    class: "upgrade",
    gives: "Additional 25 XP per click"
}

//lvl 3
let jsBookLvl3 = {
    name: "JS Book Lvl 3",
    description: "Advanced guide to Java Script",
    moneyPrice: 750,
    xpPrice: 0,
    specialRequirments: "JS Book Lvl 2",
    bought: false,
    xpBonus: 60,
    lvl: "lvl3",
    class: "upgrade",
    gives: "Additional 60 XP per click"
}

let reactJSBook = {
    name: "React JS Book",
    description: "A begginer's guide to a popular JS library",
    moneyPrice: 950,
    xpPrice: 0,
    specialRequirments: "NONE",
    bought: false,
    xpBonus: 70,
    lvl: "lvl3",
    class: "upgrade",
    gives: "Additional 70 XP per click"
}

let ajaxBook = {
    name: "Ajax Book",
    description: "Ajax is a framework for JS",
    moneyPrice: 1200,
    xpPrice: 0,
    specialRequirments: "NONE",
    bought: false,
    xpBonus: 100,
    lvl: "lvl3",
    class: "upgrade",
    gives: "Additional 100 XP per click"
}

//Projects objects

let pizzaForm = {
    name: "Pizza-Order-Form",
    description: "A simple form to order a pizza",
    moneyPrice: 0,
    xpPrice: 100,
    specialRequirments: "CSS/HTML Book",
    bought: false,
    xpBonus: 500,
    lvl: "lvl1",
    class: "project",
    gives: "5x players XP investment",
    numPurchased: 0
}

let toDoList = {
    name: "To-Do-List",
    description: "A dynamic to do list powered by Java Script",
    moneyPrice: 0,
    xpPrice: 500,
    specialRequirments: "CSS/HTML Book, JS Book Lvl 1",
    bought: false,
    xpBonus: 1500,
    lvl: "lvl1",
    class: "project",
    gives: "Gives 1000 xp for invested 500",
    numPurchased: 0
}

let frogPuzzle = {
    name: "Frog-Puzzle",
    description: "A cool frog puzzle with dragable pieces",
    moneyPrice: 0,
    xpPrice: 1000,
    specialRequirments: "CSS/HTML Book, JS Book Lvl 1",
    bought: false,
    xpBonus: 4000,
    lvl: "lvl1",
    class: "project",
    gives: "Gives 4k XP back for 1k investment",
    numPurchased: 0
}

//lvl 2
let clickerGame = {
    name: "Clicker-Game",
    description: "Basic Clicker Game",
    moneyPrice: 0,
    xpPrice: 5000,
    specialRequirments: "JS Book Lvl 2",
    bought: false,
    xpBonus: 20000,
    lvl: "lvl2",
    class: "project",
    gives: "Player gets 20k XP when 5k XP is invested",
    numPurchased: 0
}

let snakeEnhanced = {
    name: "Snake-Enhanced",
    description: "Snake Game with randomly spawning mines",
    moneyPrice: 0,
    xpPrice: 10000,
    specialRequirments: "JS Book Lvl 2",
    bought: false,
    xpBonus: 40000,
    lvl: "lvl2",
    class: "project",
    gives: "Player gets 40k XP when 10k XP is invested",
    numPurchased: 0
}

let tetrisEnhanced = {
    name: "Tetris-Enhanced",
    description: "Tetris with AI bot and 30 achievements",
    moneyPrice: 0,
    xpPrice: 20000,
    specialRequirments: "JS Book Lvl 2",
    bought: false,
    xpBonus: 80000,
    lvl: "lvl2",
    class: "project",
    gives: "Player gets 80k XP when 20k XP is invested",
    numPurchased: 0
}

//Lvl 3 
let fakeECommerce = {
    name: "Fake-E-Commerce-Store",
    description: "A non functional e commerce store",
    moneyPrice: 0,
    xpPrice: 40000,
    specialRequirments: "JS Book Lvl 3",
    bought: false,
    xpBonus: 120000,
    lvl: "lvl3",
    class: "project",
    gives: "Player gets 120k XP when 40k XP is invested",
    numPurchased: 0
}

//Asset objects

//lvl 2
let gamesWebsite = {
    name: "Website-with-Games",
    description: "A website with games that has adds",
    moneyPrice: 500,
    xpPrice: 5000,
    specialRequirments: "JS book lvl 2",
    mps: 10,
    lvl: "lvl2",
    class: "asset",
    gives: "Earns 10 dollars passively",
    numPurchased: 0
}

//lvl 3
let eCommerceStore = {
    name: "E-Commerce-Store",
    description: "A real E Commerce bussiness that makes real money",
    moneyPrice: 5000,
    xpPrice: 25000,
    specialRequirments: "JS Book Lvl 3",
    mps: 250,
    lvl: "lvl3",
    class: "asset",
    gives: "Earns 250 dollars passively",
    numPurchased: 0
}

let neuralNet = {
    name: "Neural-Net",
    description: "Neural Net that will generate income from the internet",
    moneyPrice: 15000,
    xpPrice: 50000,
    specialRequirments: "Js book lvl 3 and Ajax",
    mps: 500,
    lvl: "lvl3",
    class: "asset",
    gives: "Earns 500 dollars passively",
    numPurchased: 0
}

let cryptoTradingPlatform = {
    name: "Crypto-Trading-Platform",
    description: "A website with games that has adds",
    moneyPrice: 250000,
    xpPrice: 100000,
    specialRequirments: "JS lvl 3, Ajax, React JS",
    mps: 25000,
    lvl: "lvl3",
    class: "asset",
    gives: "Earns 25k dollars passively",
    numPurchased: 0
}

//Array of all objects in the game
let allObjects = [
    cssHTMLBook,
    jsBookLvl1,
    jsBookLvl2,
    sqlTextBook,
    phpTextBook,
    jsBookLvl3,
    reactJSBook,
    ajaxBook,
    pizzaForm,
    toDoList,
    frogPuzzle,
    clickerGame,
    snakeEnhanced,
    tetrisEnhanced,
    fakeECommerce,
    gamesWebsite,
    eCommerceStore,
    neuralNet,
    cryptoTradingPlatform
];

window.onload = startGame;

//Listeners for non game objects
function createListenersNonGameObjects()
{
    //Menu listeners
    openMenuBtn.addEventListener("click", ()=>{
        
        //clear all intervals
        clearInterval(pizzaFormInterval);
        clearInterval(toDoListInterval);
        clearInterval(frogPuzzleInterval);
        clearInterval(clickerGameInterval);
        clearInterval(snakeEnhancedInterval);
        clearInterval(tetrisEnhancedInterval);
        clearInterval(fakeECommerceInterval);
        clearInterval(mpsInterval);
        clearInterval(timeInterval);

        //Open Modal
        menuModal.showModal();
    });

    closeMenuBtn.addEventListener("click", ()=>{
        //restart mpsInterval
        mpsInterval = setInterval(mpsTracking, 1000);

        //Restart clock interval
        timeInterval = setInterval(updateCountDown, 1000);

        //Open Modal
        menuModal.close();
    });

    //Creates listener for the js book
    //to play a sound when it is clicked
    jsBookImg.addEventListener("click", () => {
        //Play sound
        xpClickSound.play();

        //Register click
        xpScore = updateCounter(xpScore, xpEarningRate, xpScoreElement);

        console.log(`XP Score: ${xpScore}`);
    });

    //Same for workImg
    workImg.addEventListener("click", () => {
        //Play Sound
        moneyClickSound.play();
        
        //Register click
        moneyScore = updateCounter(moneyScore, fastFoodRate, moneyScoreElement);

        console.log(`XP Score: ${moneyScore}`);
    });

    //Event listener for save button
    savedBtn.addEventListener("click", saveProgress);
}

//all listeners for the objects 
//brand new
function defaultListeners()
{
    //List for all the items needing in an
    //event listene

    console.log(storeUpgradesList);

    //Set listeners for upgrades in the shop

    //CSS/HTML Book
    storeUpgradesList[0].addEventListener("click", () => {
        buyUpgrade("CSS/HTML Book", storeUpgradesList[0])
    });

    storeUpgradesList[1].addEventListener("click", () => {
        buyUpgrade("JS Book Lvl 1", storeUpgradesList[1])
    });

    storeUpgradesList[2].addEventListener("click", () => {
        buyUpgrade("JS Book Lvl 2", storeUpgradesList[2])
    });

    storeUpgradesList[3].addEventListener("click", () => {
        buyUpgrade("SQL Book", storeUpgradesList[3])
    });

    storeUpgradesList[4].addEventListener("click", () => {
        buyUpgrade("PHP Book", storeUpgradesList[4])
    });

    storeUpgradesList[5].addEventListener("click", () => {
        buyUpgrade(jsBookLvl3.name, storeUpgradesList[5])
    });

    storeUpgradesList[6].addEventListener("click", () => {
        buyUpgrade(reactJSBook.name, storeUpgradesList[6])
    });

    storeUpgradesList[7].addEventListener("click", () => {
        buyUpgrade(ajaxBook.name, storeUpgradesList[7])
    });

    //Listeners for projects

    //Pizza Form
    projectsList[0].addEventListener("click", () => {
        buyUpgrade(pizzaForm.name, projectsList[0])
    });

    //To do list
    projectsList[1].addEventListener("click", () => {
        buyUpgrade(toDoList.name, projectsList[1])
    });

    //Frog puzzle
    projectsList[2].addEventListener("click", () => {
        buyUpgrade(frogPuzzle.name, projectsList[2])
    });

    //Pizza Form
    projectsList[3].addEventListener("click", () => {
        buyUpgrade(clickerGame.name, projectsList[3])
    });

    //To do list
    projectsList[4].addEventListener("click", () => {
        buyUpgrade(snakeEnhanced.name, projectsList[4])
    });

    //Frog puzzle
    projectsList[5].addEventListener("click", () => {
        buyUpgrade(tetrisEnhanced.name, projectsList[5])
    });

    //Fake Ecoomerce Website
    projectsList[6].addEventListener("click", () => {
        buyUpgrade(fakeECommerce.name, projectsList[6])
    });

    //Asset listeners

    //Games website
    projectsList[7].addEventListener("click", () => {
        buyUpgrade(gamesWebsite.name, projectsList[7])
    });

    //Ecommerce website
    projectsList[8].addEventListener("click", () => {
        buyUpgrade(eCommerceStore.name, projectsList[8])
    });

    //
    projectsList[9].addEventListener("click", () => {
        buyUpgrade(neuralNet.name, projectsList[9])
    });

    //
    projectsList[10].addEventListener("click", () => {
        buyUpgrade(cryptoTradingPlatform.name, projectsList[10])
    });
}

function tooltipListeners()
{
    //Listeners for upgrade's tooltips
    storeUpgradesList.forEach(element =>{
        element.addEventListener("mouseenter", generateInfo);
    });

    storeUpgradesList.forEach(element =>{
        element.addEventListener("mouseleave", removeInfo);
    });

    //Tooltip listeners
    projectsList.forEach(element =>{
        element.addEventListener("mouseenter", generateInfo);
    });

    projectsList.forEach(element =>{
        element.addEventListener("mouseleave", removeInfo);
    });
}

function startGame()
{
    //Get the difficulty setting
    let urlString = window.location.href;
    let url = new URL(urlString);

    // Access individual parameters
    let difficulty = url.searchParams.get('difficulty');

    //Set the prices and time of the session
    //according to difficulty
    setDifficulty(difficulty);

    //set the cooldowns to their new values according to difficulty
    pizzaFormCooldown = cooldownsArray[0];
    toDoListCooldown = cooldownsArray[1];
    frogPuzzleCooldown = cooldownsArray[2];
    clickerGameCooldown = cooldownsArray[3];
    snakeEnhancedCooldown = cooldownsArray[4];
    tetrisEnhancedCooldown = cooldownsArray[5];
    fakeECommerceCooldown = cooldownsArray[6];

    //!Load save here

    //Add event listeners to buttons
    createListenersNonGameObjects();

    if(localStorage.getItem("data") !== null)
    {
        loadSave();

        storeUpgradesList = document.querySelectorAll(".store-container div");
        projectsList = document.querySelectorAll(".actions-menu-container div");

        tooltipListeners();
    }
    else{
        generateStoreItems();

        storeUpgradesList = document.querySelectorAll(".store-container div");
        projectsList = document.querySelectorAll(".actions-menu-container div");

        defaultListeners();
        tooltipListeners();
    }

    //Fill the projects variable
    projects = document.querySelectorAll(".project");

    //Set the mps tracking interval
    mpsInterval = setInterval(mpsTracking, 300);

    //Start an interval that runs every second
    timeInterval = setInterval(updateCountDown, 1000);

    //Show lvl 1 items
    showLvl1();
}

//Generates upgardes in the store container
//and practice projects
function generateStoreItems()
{
    //Generate Upgrades lvl1
    for (let i = 0; i < 2; i++) 
    {
        //Apends generated divs to the store container
        let storeItem = document.createElement("div");
        let storeItemImg = document.createElement("img");

        //Put the img inside the div and set its alt to the arrays
        //index value
        storeItemImg.alt = upgradeImgNames[i];
        storeItem.name = upgradeImgNames[i];
        storeItem.appendChild(storeItemImg);
        storeItem.classList.add("lvl1");
        storeItem.classList.add("upgrade");

        //Attach the div to the container
        storeContainer.appendChild(storeItem);
    }

    //Generate Upgrades lvl2
    for (let i = 2; i < 5; i++) 
    {
        //Apends generated divs to the store container
        let storeItem = document.createElement("div");
        let storeItemImg = document.createElement("img");

        //Put the img inside the div and set its alt to the arrays
        //index value
        storeItemImg.alt = upgradeImgNames[i];
        storeItem.name = upgradeImgNames[i];
        storeItem.appendChild(storeItemImg);
        storeItem.classList.add("lvl2");
        storeItem.classList.add("upgrade");

        //Attach the div to the container
        storeContainer.appendChild(storeItem);
    }

    //Generate Upgrades lvl3
    for (let i = 5; i < upgradeImgNames.length; i++) 
    {
        //Apends generated divs to the store container
        let storeItem = document.createElement("div");
        let storeItemImg = document.createElement("img");

        //Put the img inside the div and set its alt to the arrays
        //index value
        storeItemImg.alt = upgradeImgNames[i];
        storeItem.name = upgradeImgNames[i];
        storeItem.appendChild(storeItemImg);
        storeItem.classList.add("lvl3");
        storeItem.classList.add("upgrade");

        //Attach the div to the container
        storeContainer.appendChild(storeItem);
    }

    //Generate Projects lvl 1
    for (let i = 0; i < 3; i++) 
    {
        //Apends generated divs to the store container
        let projectItem = document.createElement("div");
        let projectItemImg = document.createElement("img");
        let quantity = document.createElement("h1");
        quantity.innerText = "0";
        projectItem.classList.add("project", projectNames[i]);

        //Put the img inside the div and set its alt to the arrays
        //index value
        projectItemImg.alt = projectNames[i];
        projectItem.name = projectNames[i];
        projectItem.appendChild(projectItemImg);
        projectItem.appendChild(quantity);
        projectItem.classList.add("lvl1");

        //Attach the div to the container
        actionContainer.appendChild(projectItem);
    }

    //Generate Projects lvl 2
    for (let i = 3; i < 6; i++) 
    {
        //Apends generated divs to the store container
        let projectItem = document.createElement("div");
        let projectItemImg = document.createElement("img");
        let quantity = document.createElement("h1");
        quantity.innerText = "0";
        projectItem.classList.add("project", projectNames[i]);

        //Put the img inside the div and set its alt to the arrays
        //index value
        projectItemImg.alt = projectNames[i];
        projectItem.name = projectNames[i];
        projectItem.appendChild(projectItemImg);
        projectItem.appendChild(quantity);
        projectItem.classList.add("lvl2");

        //Attach the div to the container
        actionContainer.appendChild(projectItem);
    }

    //Generate Projects lvl 3
    for (let i = 6; i < projectNames.length; i++) 
    {
        //Apends generated divs to the store container
        let projectItem = document.createElement("div");
        let projectItemImg = document.createElement("img");
        let quantity = document.createElement("h1");
        quantity.innerText = "0";
        projectItem.classList.add("project", projectNames[i]);

        //Put the img inside the div and set its alt to the arrays
        //index value
        projectItemImg.alt = projectNames[i];
        projectItem.name = projectNames[i];
        projectItem.appendChild(projectItemImg);
        projectItem.appendChild(quantity);
        projectItem.classList.add("lvl3");

        //Attach the div to the container
        actionContainer.appendChild(projectItem);
    }

    //lvl 2 asset
    let projectItem = document.createElement("div");
    let projectItemImg = document.createElement("img");
    let quantity = document.createElement("h1");
    quantity.innerText = "0";
    projectItem.classList.add("project", assetNames[0]);
    projectItem.classList.add("asset", assetNames[0]);

    //Put the img inside the div and set its alt to the arrays
    //index value
    projectItemImg.alt = assetNames[0];
    projectItem.name = assetNames[0];
    projectItem.appendChild(projectItemImg);
    projectItem.appendChild(quantity);
    projectItem.classList.add("lvl2");

    //Attach the div to the container
    actionContainer.appendChild(projectItem);

    //Generate Assets
    for (let i = 1; i < assetNames.length; i++) 
    {
        //Apends generated divs to the store container
        let projectItem = document.createElement("div");
        let projectItemImg = document.createElement("img");
        let quantity = document.createElement("h1");
        quantity.innerText = "0";
        projectItem.classList.add("project", assetNames[i]);
        projectItem.classList.add("asset", assetNames[i]);

        //Put the img inside the div and set its alt to the arrays
        //index value
        projectItemImg.alt = assetNames[i];
        projectItem.name = assetNames[i];
        projectItem.appendChild(projectItemImg);
        projectItem.appendChild(quantity);
        projectItem.classList.add("lvl3");

        //Attach the div to the container
        actionContainer.appendChild(projectItem);
    }

    //Generate asset icon lvl2
    //create div element
    let viewWindow = document.createElement("div");

    //give it a assetName class name on index
    viewWindow.classList.add(assetContainerNames[0]);
    viewWindow.classList.add("lvl2");

    //append it to the assetView Container
    assetViewContainer.appendChild(viewWindow);

    console.log("View Container created");

    //Generate view asset windows for every asset
    for (let i = 1; i < assetContainerNames.length; i++) 
    {
        let viewWindow = document.createElement("div");

        //give it a assetName class name on index
        viewWindow.classList.add(assetContainerNames[i]);
        viewWindow.classList.add("lvl3");
        console.log("Icon container added");

        //append it to the assetView Container
        assetViewContainer.appendChild(viewWindow);

        console.log("View Container created");
    }
}

//Shows lvl 1 items on screen
function showLvl1()
{
    let lvl1Objects = document.querySelectorAll(".lvl1");

    for (let i = 0; i < lvl1Objects.length; i++) {

        if(lvl1Objects[i].classList.contains("upgrade"))
        {
            lvl1Objects[i].style.display = "inline-block";
        }
        else{
            lvl1Objects[i].style.display = "block";
        }
        
    }
}

//Shows lvl 2 items on screen
function showLvl2()
{
    let lvl2Objects = document.querySelectorAll(".lvl2");

    for (let i = 0; i < lvl2Objects.length; i++) {

        if(lvl2Objects[i].classList.contains("upgrade"))
        {
            lvl2Objects[i].style.display = "inline-block";
        }
        else{
            lvl2Objects[i].style.display = "block";
        }
    }
}

//Shows lvl 3 items on screen
function showLvl3()
{
    let lvl3Objects = document.querySelectorAll(".lvl3");

    for (let i = 0; i < lvl3Objects.length; i++) {

        if(lvl3Objects[i].classList.contains("upgrade"))
        {
            lvl3Objects[i].style.display = "inline-block";
        }
        else{
            lvl3Objects[i].style.display = "block";
        }
    }
}

//Sets the prices of items and time remaining 
//according to past difficulty
function setDifficulty(difficulty)
{
    //divide prices of items by two
    //and multiply time by two
    if(difficulty === "easy")
    {
        //Set Money goal
        moneyGoal = easyMoneyGoal;
        moneyEndGoal.innerText = moneyGoal;

        //Multiply money perclick
        fastFoodRate *= 2;

        //Multiply time by two
        minutesInSeconds *= 2;

        //Set difficulty

        for (let i = 0; i < allObjects.length; i++) 
        {
            allObjects[i].moneyPrice /= 2;
            allObjects[i].xpPrice /= 2;
        }

        //divide all cooldowns by 2
        for (let i = 0; i < cooldownsArray.length; i++) 
        {
            cooldownsArray[i] /= 2;
        }
    }

    if(difficulty === "mid")
    {
        //Money goal
        moneyGoal = midMoneyGoal;
        moneyEndGoal.innerText = moneyGoal;
    }

    //multiply price of items by two
    //
    if(difficulty === "hard")
    {
        //Money goal
        moneyGoal = hardMoneyGoal;
        moneyEndGoal.innerText = moneyGoal;

        //Dividing money perclick
        fastFoodRate /= 2;

        //Dividing time by two
        minutesInSeconds /= 2;

        for (let i = 0; i < allObjects.length; i++) 
        {
            allObjects[i].moneyPrice *= 2;
            allObjects[i].xpPrice *= 2;
        }

        //multiply all cooldowns by 2
        for (let i = 0; i < cooldownsArray.length; i++) 
        {
            cooldownsArray[i] *= 2;
        }
    }
}

function addDivToAssetViewContainer(container, imgSrc)
{
    // let indicator = document.createElement("div");
    let icon = document.createElement("img");
    icon.src = imgSrc;
    // indicator.appendChild(icon);
    container.appendChild(icon);
}

//Function that will increment clicker counters
//for both jobImg and jsBook

//score is the variable that is tracking the particular 
//score (used for both xp and money)
//element is the html element that outputs the number on a '
//screen
function updateCounter(score, rate, element)
{
    //Increment the score by the wage or xp amount
    //for the book bought
    score+=rate;

    //Update the number on the element
    element.innerText = score;

    //Update the score
    return score;
}

//Function updates the timer and runs every
//second
function updateCountDown()
{
    //Check for lose
    if(minutesInSeconds === -1)
    {
        //open lost modal
        lostModal.showModal();

        //end all intervals
        clearInterval(pizzaFormInterval);
        clearInterval(toDoListInterval);
        clearInterval(frogPuzzleInterval);
        clearInterval(clickerGameInterval);
        clearInterval(snakeEnhancedInterval);
        clearInterval(tetrisEnhancedInterval);
        clearInterval(fakeECommerceInterval);
        clearInterval(mpsInterval);
        clearInterval(timeInterval);

        //return from updateCountDown
        return;
    }

    //Getting minutes
    minutes = Math.floor(minutesInSeconds/60);

    //Then Seconds
    seconds = minutesInSeconds % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    //Then setting it on the countdown element
    countDownEl.innerText = `${minutes}:${seconds}`;

    minutesInSeconds--;
}

//StartCount starts the countdown by first
//applying cooldown styling to the element
//and then starting an interval with a function
//that will update the cooldown number until it is zero then the 
//interval is cleared and styling 
function startCooldown(projectElement, projectName, cooldownTime) {
    // Swap styling
    projectElement.classList.remove("project");
    projectElement.classList.add("project-cooldown");

    // Append child with the seconds inside
    let coolDownTimer = document.createElement("p");
    coolDownTimer.classList.add("coolDownDigits");
    coolDownTimer.innerText = `${cooldownTime} seconds`;
    projectElement.appendChild(coolDownTimer);

    // Set an interval that will reduce the number of seconds
    //which interval (variable)
    switch (projectName) 
        {
            //lvl 1 projects
            case pizzaForm.name:
                pizzaFormInterval = setInterval(() => manageCooldown(coolDownTimer, projectName, projectElement), 1000);
                break;

            case toDoList.name:
                toDoListInterval = setInterval(() => manageCooldown(coolDownTimer, projectName, projectElement), 1000);
                break;

            case frogPuzzle.name:
                frogPuzzleInterval = setInterval(() => manageCooldown(coolDownTimer, projectName, projectElement), 1000);
                break;

            //lvl 2 projects
            case clickerGame.name:
                clickerGameInterval = setInterval(() => manageCooldown(coolDownTimer, projectName, projectElement), 1000);
                break;

            case snakeEnhanced.name:
                snakeEnhancedInterval = setInterval(() => manageCooldown(coolDownTimer, projectName, projectElement), 1000);
                break;

            case tetrisEnhanced.name:
                tetrisEnhancedInterval = setInterval(() => manageCooldown(coolDownTimer, projectName, projectElement), 1000);
                break;

            //lvl 3
            case fakeECommerce.name:
                fakeECommerceInterval = setInterval(() => manageCooldown(coolDownTimer, projectName, projectElement), 1000);
                break;
        }
}

//manageCooldown that will accept the element and the 
//cooldown time
function manageCooldown(coolDownElement, projectName, projectElement)
{
    //check if the cooldown is over or not
    
    //lvl 1 projects
    if(pizzaFormCooldown === 0 &&
       projectName === pizzaForm.name)
    {
        //Reset the timer
        pizzaFormCooldown = pizzaFormCooldownOriginal;
        //then clear interval
        //and remove cooldown
        clearInterval(pizzaFormInterval);
        //The remove the project-cooldown class
        //and apply project instead
        //and remove the coolDownElement 'p' tag
        projectElement.classList.remove("project-cooldown");
        projectElement.classList.add("project");
        coolDownElement.remove();
    }
    else if(toDoListCooldown === 0 &&
            projectName === toDoList.name)
    {
        //Reset the timer
        toDoListCooldown = toDoListCooldownOriginal;
        //then clear interval
        //and remove cooldown
        clearInterval(toDoListInterval);
        //The remove the project-cooldown class
        //and apply project instead
        //and remove the coolDownElement 'p' tag
        projectElement.classList.remove("project-cooldown");
        projectElement.classList.add("project");
        coolDownElement.remove();
    }
    else if(frogPuzzleCooldown === 0 &&
            projectName === frogPuzzle.name)
    {
        //Reset the timer
        frogPuzzleCooldown = frogPuzzleCooldownOriginal;
        //then clear interval
        //and remove cooldown
        clearInterval(frogPuzzleInterval);
        //The remove the project-cooldown class
        //and apply project instead
        //and remove the coolDownElement 'p' tag
        projectElement.classList.remove("project-cooldown");
        projectElement.classList.add("project");
        coolDownElement.remove();
    }
    //lvl2 projects
    else if(clickerGameCooldown === 0 &&
        projectName === clickerGame.name)
    {
        //Reset the timer
        clickerGameCooldown = clickerGameCooldownOriginal;
        //then clear interval
        //and remove cooldown
        clearInterval(clickerGameInterval);
        //The remove the project-cooldown class
        //and apply project instead
        //and remove the coolDownElement 'p' tag
        projectElement.classList.remove("project-cooldown");
        projectElement.classList.add("project");
        coolDownElement.remove();
    }
    else if(snakeEnhancedCooldown === 0 &&
        projectName === snakeEnhanced.name)
    {
        //Reset the timer
        snakeEnhancedCooldown = snakeEnhancedCooldownOriginal;
        //then clear interval
        //and remove cooldown
        clearInterval(snakeEnhancedInterval);
        //The remove the project-cooldown class
        //and apply project instead
        //and remove the coolDownElement 'p' tag
        projectElement.classList.remove("project-cooldown");
        projectElement.classList.add("project");
        coolDownElement.remove();
    }
    else if(tetrisEnhancedCooldown === 0 &&
        projectName === tetrisEnhanced.name)
    {
        //Reset the timer
        tetrisEnhancedCooldown = tetrisEnhancedCooldownOriginal;
        //then clear interval
        //and remove cooldown
        clearInterval(tetrisEnhancedInterval);
        //The remove the project-cooldown class
        //and apply project instead
        //and remove the coolDownElement 'p' tag
        projectElement.classList.remove("project-cooldown");
        projectElement.classList.add("project");
        coolDownElement.remove();
    }
    //lvl 3 projects
    else if(fakeECommerceCooldown === 0 &&
        projectName === fakeECommerce.name)
    {
        //Reset the timer
        fakeECommerceCooldown = fakeECommerceCooldownOriginal;
        //then clear interval
        //and remove cooldown
        clearInterval(fakeECommerceInterval);
        //The remove the project-cooldown class
        //and apply project instead
        //and remove the coolDownElement 'p' tag
        projectElement.classList.remove("project-cooldown");
        projectElement.classList.add("project");
        coolDownElement.remove();
    }
    //if not over, reduce the coldownTime
    //Then update the value of the coolDownElement
    else{
        switch (projectName) 
        {
            //lvl 1 
            case pizzaForm.name:
                //Reduce the right cooldown for the 
                //right project
                pizzaFormCooldown--;
                coolDownElement.innerText = "";
                coolDownElement.innerText = `${pizzaFormCooldown} seconds`;
                break;

            case toDoList.name:
                toDoListCooldown--;
                coolDownElement.innerText = "";
                coolDownElement.innerText = `${toDoListCooldown} seconds`;
                break;

            case frogPuzzle.name:
                frogPuzzleCooldown--;
                coolDownElement.innerText = "";
                coolDownElement.innerText = `${frogPuzzleCooldown} seconds`;
                break;
            
            //lvl 2
            case clickerGame.name:
                //Reduce the right cooldown for the 
                //right project
                clickerGameCooldown--;
                coolDownElement.innerText = "";
                coolDownElement.innerText = `${clickerGameCooldown} seconds`;
                break;

            case snakeEnhanced.name:
                snakeEnhancedCooldown--;
                coolDownElement.innerText = "";
                coolDownElement.innerText = `${snakeEnhancedCooldown} seconds`;
                break;

            case tetrisEnhanced.name:
                tetrisEnhancedCooldown--;
                coolDownElement.innerText = "";
                coolDownElement.innerText = `${tetrisEnhancedCooldown} seconds`;
                break;
            
            //Lvl 3 
            case fakeECommerce.name:
                fakeECommerceCooldown--;
                coolDownElement.innerText = "";
                coolDownElement.innerText = `${fakeECommerceCooldown} seconds`;
                break;
        }
    }
}

//all functions for each in game object
// CSS/HTML Book
function cssHTMLBookEffects() {
    moneyScore -= cssHTMLBook.moneyPrice;
    xpScore -= cssHTMLBook.xpPrice;

    cssHTMLBook.bought = true;
    xpEarningRate += cssHTMLBook.xpBonus;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;

    clickSoundPurchase.play();
    removeInfo();
}

// JS Book Lvl 1
function jsBookLvl1Effects() {
    moneyScore -= jsBookLvl1.moneyPrice;
    xpScore -= jsBookLvl1.xpPrice;

    jsBookLvl1.bought = true;
    xpEarningRate += jsBookLvl1.xpBonus;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;

    showLvl2();
    clickSoundPurchase.play();
    removeInfo();
}

// JS Book Lvl 2
function jsBookLvl2Effects() {
    moneyScore -= jsBookLvl2.moneyPrice;
    xpScore -= jsBookLvl2.xpPrice;

    jsBookLvl2.bought = true;
    xpEarningRate += jsBookLvl2.xpBonus;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;

    clickSoundPurchase.play();
    removeInfo();
}

// SQL Book
function sqlTextBookEffects() {
    moneyScore -= sqlTextBook.moneyPrice;
    xpScore -= sqlTextBook.xpPrice;

    sqlTextBook.bought = true;
    xpEarningRate += sqlTextBook.xpBonus;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;

    clickSoundPurchase.play();
    removeInfo();
}

// PHP Book
function phpTextBookEffects() {
    moneyScore -= phpTextBook.moneyPrice;
    xpScore -= phpTextBook.xpPrice;

    phpTextBook.bought = true;
    xpEarningRate += phpTextBook.xpBonus;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;

    showLvl3();
    clickSoundPurchase.play();
    removeInfo();
}

// JS Book Lvl 3
function jsBookLvl3Effects() {
    moneyScore -= jsBookLvl3.moneyPrice;
    xpScore -= jsBookLvl3.xpPrice;

    jsBookLvl3.bought = true;
    xpEarningRate += jsBookLvl3.xpBonus;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;

    clickSoundPurchase.play();
    removeInfo();
}

// React JS Book
function reactJSBookEffects() {
    moneyScore -= reactJSBook.moneyPrice;
    xpScore -= reactJSBook.xpPrice;

    reactJSBook.bought = true;
    xpEarningRate += reactJSBook.xpBonus;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;

    clickSoundPurchase.play();
    removeInfo();
}

// Ajax Book
function ajaxBookEffects() {
    moneyScore -= ajaxBook.moneyPrice;
    xpScore -= ajaxBook.xpPrice;

    ajaxBook.bought = true;
    xpEarningRate += ajaxBook.xpBonus;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;

    clickSoundPurchase.play();
    removeInfo();
}

// Pizza Order Form
function pizzaFormEffects() {
    let quantityField = document.querySelector(".Pizza-Order-Form h1");

    moneyScore -= pizzaForm.moneyPrice;
    xpScore -= pizzaForm.xpPrice;

    pizzaForm.bought = true;
    xpScore += pizzaForm.xpBonus;

    pizzaForm.numPurchased++;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;
    quantityField.innerText = pizzaForm.numPurchased;

    startCooldown(projects[0], pizzaForm.name, pizzaFormCooldown);
}

// To-Do List
function toDoListEffects() {
    let quantityField = document.querySelector(".To-Do-List h1");

    moneyScore -= toDoList.moneyPrice;
    xpScore -= toDoList.xpPrice;

    toDoList.bought = true;
    xpScore += toDoList.xpBonus;

    toDoList.numPurchased++;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;
    quantityField.innerText = toDoList.numPurchased;

    startCooldown(projects[1], toDoList.name, toDoListCooldown);
}

// Frog Puzzle
function frogPuzzleEffects() {
    let quantityField = document.querySelector(".Frog-Puzzle h1");

    moneyScore -= frogPuzzle.moneyPrice;
    xpScore -= frogPuzzle.xpPrice;

    frogPuzzle.bought = true;
    xpScore += frogPuzzle.xpBonus;

    frogPuzzle.numPurchased++;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;
    quantityField.innerText = frogPuzzle.numPurchased;

    startCooldown(projects[2], frogPuzzle.name, frogPuzzleCooldown);
}

// Clicker Game
function clickerGameEffects() {
    let quantityField = document.querySelector(".Clicker-Game h1");

    moneyScore -= clickerGame.moneyPrice;
    xpScore -= clickerGame.xpPrice;

    clickerGame.bought = true;
    xpScore += clickerGame.xpBonus;

    clickerGame.numPurchased++;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;
    quantityField.innerText = clickerGame.numPurchased;

    startCooldown(projects[3], clickerGame.name, clickerGameCooldown);
}

// Snake Enhanced
function snakeEnhancedEffects() {
    let quantityField = document.querySelector(".Snake-Enhanced h1");

    moneyScore -= snakeEnhanced.moneyPrice;
    xpScore -= snakeEnhanced.xpPrice;

    snakeEnhanced.bought = true;
    xpScore += snakeEnhanced.xpBonus;

    snakeEnhanced.numPurchased++;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;
    quantityField.innerText = snakeEnhanced.numPurchased;

    startCooldown(projects[4], snakeEnhanced.name, snakeEnhancedCooldown);
}

// Tetris Enhanced
function tetrisEnhancedEffects() {
    let quantityField = document.querySelector(".Tetris-Enhanced h1");

    moneyScore -= tetrisEnhanced.moneyPrice;
    xpScore -= tetrisEnhanced.xpPrice;

    tetrisEnhanced.bought = true;
    xpScore += tetrisEnhanced.xpBonus;

    tetrisEnhanced.numPurchased++;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;
    quantityField.innerText = tetrisEnhanced.numPurchased;

    startCooldown(projects[5], tetrisEnhanced.name, tetrisEnhancedCooldown);
}

// Fake E-Commerce
function fakeECommerceEffects() {
    let quantityField = document.querySelector(".Fake-E-Commerce-Store h1");

    moneyScore -= fakeECommerce.moneyPrice;
    xpScore -= fakeECommerce.xpPrice;

    fakeECommerce.bought = true;
    xpScore += fakeECommerce.xpBonus;

    fakeECommerce.numPurchased++;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;
    quantityField.innerText = fakeECommerce.numPurchased;

    startCooldown(projects[6], fakeECommerce.name, fakeECommerceCooldown);
}

// Games Website
function gamesWebsiteEffects() {
    let quantityField = document.querySelector(".Website-with-Games h1");
    let viewContainer = document.querySelector(".Website-with-Games-Container");

    addDivToAssetViewContainer(viewContainer, "/Projects/FullStackClicker/images/website-with-games-icon.png");

    moneyScore -= gamesWebsite.moneyPrice;
    xpScore -= gamesWebsite.xpPrice;

    moneyPerSecond += gamesWebsite.mps;

    gamesWebsite.numPurchased++;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;
    quantityField.innerText = gamesWebsite.numPurchased;

    mpsTracking();

    clickSoundPurchase.play();
    removeInfo();
}

// E-Commerce Store
function eCommerceStoreEffects() {
    let quantityField = document.querySelector(".E-Commerce-Store h1");
    let viewContainer = document.querySelector(".E-Commerce-Store-Container");

    addDivToAssetViewContainer(viewContainer, "/Projects/FullStackClicker/images/ecomerce-store-icon.png");

    moneyScore -= eCommerceStore.moneyPrice;
    xpScore -= eCommerceStore.xpPrice;

    moneyPerSecond += eCommerceStore.mps;

    eCommerceStore.numPurchased++;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;
    quantityField.innerText = eCommerceStore.numPurchased;

    mpsTracking();

    clickSoundPurchase.play();
    removeInfo();
}

// Neural Net
function neuralNetEffects() {
    let quantityField = document.querySelector(".Neural-Net h1");
    let viewContainer = document.querySelector(".Neural-Net-Container");

    addDivToAssetViewContainer(viewContainer, "/Projects/FullStackClicker/images/neural-net.icon.png");

    moneyScore -= neuralNet.moneyPrice;
    xpScore -= neuralNet.xpPrice;

    moneyPerSecond += neuralNet.mps;

    neuralNet.numPurchased++;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;
    quantityField.innerText = neuralNet.numPurchased;

    mpsTracking();

    clickSoundPurchase.play();
    removeInfo();
}

// Crypto Trading Platform
function cryptoTradingPlatformEffects() {
    let quantityField = document.querySelector(".Crypto-Trading-Platform h1");
    let viewContainer = document.querySelector(".Crypto-Trading-Platform-Container");

    addDivToAssetViewContainer(viewContainer, "/Projects/FullStackClicker/images/crypto-icon.png");

    moneyScore -= cryptoTradingPlatform.moneyPrice;
    xpScore -= cryptoTradingPlatform.xpPrice;

    moneyPerSecond += cryptoTradingPlatform.mps;

    cryptoTradingPlatform.numPurchased++;

    moneyScoreElement.innerText = moneyScore;
    xpScoreElement.innerText = xpScore;
    quantityField.innerText = cryptoTradingPlatform.numPurchased;

    mpsTracking();

    clickSoundPurchase.play();
    removeInfo();
}

//process the action of bying an upgrade
//checks if player can afford it
//if buy is succesful the upgrade div disapears
//and the effects are activated
function buyUpgrade(itemName, itemElement)
{
    //check if player can afford to buy the item
    if(canAfford(itemName))
    {
        switch (itemName) {
            //Upgrades
            case cssHTMLBook.name:
                cssHTMLBookEffects();
                itemElement.remove();
                break;

            case jsBookLvl1.name:
                jsBookLvl1Effects();
                itemElement.remove();
                break;

            //lvl 2 upgrades
            case jsBookLvl2.name:
                jsBookLvl2Effects();
                itemElement.remove();
                break;

            case sqlTextBook.name:
                sqlTextBookEffects();
                itemElement.remove();
                break;

            case phpTextBook.name:
                phpTextBookEffects();
                itemElement.remove();
                break;

            //Lvl 3 upgrades
            case jsBookLvl3.name:
                jsBookLvl3Effects();
                itemElement.remove();
                break;

            case ajaxBook.name:
                ajaxBookEffects();
                itemElement.remove();
                break;

            case reactJSBook.name:
                reactJSBookEffects();
                itemElement.remove();
                break;

            // Projects
            case pizzaForm.name:
                pizzaFormEffects();
                break;
            
            case toDoList.name:
                toDoListEffects();
                break;
            
            case frogPuzzle.name:
                frogPuzzleEffects();
                break;

            //Lvl 2 projects
            case clickerGame.name:
                clickerGameEffects();
                break;
            
            case snakeEnhanced.name:
                snakeEnhancedEffects();
                break;
            
            case tetrisEnhanced.name:
                tetrisEnhancedEffects();
                break;

            //lvl 3 projects
            case fakeECommerce.name:
                fakeECommerceEffects();
                break;

            //Assets

            //lvl 2
            case gamesWebsite.name:
                gamesWebsiteEffects();
                break;

            //lvl 3
            case eCommerceStore.name:
                eCommerceStoreEffects();
                break;

            case neuralNet.name:
                neuralNetEffects();
                break;

            case cryptoTradingPlatform.name:
                cryptoTradingPlatformEffects();
                break;
        }
    }
}

//function what will check if you can afford something
//check depends on the parameter passed
function canAfford(itemName)
{
    //Upgrades
    if(itemName === cssHTMLBook.name)
    {
        //check for sufficient funds and xp
        if(moneyScore >= cssHTMLBook.moneyPrice && 
           xpScore >= cssHTMLBook.xpPrice)
        {
            return true;
        }
        else{
            return false;
        }
    }
    else if(itemName === jsBookLvl1.name)
    {
            //check for sufficient funds and xp
        if(moneyScore >= jsBookLvl1.moneyPrice && 
            xpScore >= jsBookLvl1.xpPrice)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === jsBookLvl2.name)
    {
        //check for sufficient funds and xp
        if(moneyScore >= jsBookLvl2.moneyPrice && 
            xpScore >= jsBookLvl2.xpPrice && 
            jsBookLvl1.bought === true)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === sqlTextBook.name)
    {
            //check for sufficient funds and xp
        if(moneyScore >= sqlTextBook.moneyPrice && 
            xpScore >= sqlTextBook.xpPrice)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === phpTextBook.name)
    {
        //check for sufficient funds and xp
        if(moneyScore >= phpTextBook.moneyPrice && 
            xpScore >= phpTextBook.xpPrice)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === jsBookLvl3.name)
    {
        //check for sufficient funds and xp
        if(moneyScore >= jsBookLvl3.moneyPrice && 
            xpScore >= jsBookLvl3.xpPrice &&
            jsBookLvl2.bought === true)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === reactJSBook.name)
    {
        //check for sufficient funds and xp
        if(moneyScore >= reactJSBook.moneyPrice && 
            xpScore >= reactJSBook.xpPrice)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === ajaxBook.name)
    {
        //check for sufficient funds and xp
        if(moneyScore >= ajaxBook.moneyPrice && 
            xpScore >= ajaxBook.xpPrice)
         {
             return true;
         }
         else{
            return false;
        }
    }

    //Projects
    if(itemName === pizzaForm.name)
    {
        if(moneyScore >= pizzaForm.moneyPrice && 
           xpScore >= pizzaForm.xpPrice &&
           cssHTMLBook.bought === true)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === toDoList.name)
    {
        if(moneyScore >= toDoList.moneyPrice && 
           xpScore >= toDoList.xpPrice &&
           cssHTMLBook.bought === true &&
           jsBookLvl1.bought === true)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === frogPuzzle.name)
    {
        if(moneyScore >= frogPuzzle.moneyPrice && 
           xpScore >= frogPuzzle.xpPrice &&
           cssHTMLBook.bought === true &&
           jsBookLvl1.bought === true)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === clickerGame.name)
    {
        if(moneyScore >= clickerGame.moneyPrice && 
           xpScore >= clickerGame.xpPrice &&
           jsBookLvl2.bought === true)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === snakeEnhanced.name)
    {
        if(moneyScore >= snakeEnhanced.moneyPrice && 
           xpScore >= snakeEnhanced.xpPrice &&
           jsBookLvl2.bought === true)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === tetrisEnhanced.name)
    {
        if(moneyScore >= tetrisEnhanced.moneyPrice && 
           xpScore >= tetrisEnhanced.xpPrice &&
           jsBookLvl2.bought === true)
         {
             return true;
         }
         else{
            return false;
        }
    }
    else if(itemName === fakeECommerce.name)
    {
        if(moneyScore >= fakeECommerce.moneyPrice && 
           xpScore >= fakeECommerce.xpPrice &&
           jsBookLvl3.bought === true)
         {
             return true;
         }
         else{
            return false;
        }
    }

    //Assets
    if(itemName === gamesWebsite.name)
    {
        if(moneyScore >= gamesWebsite.moneyPrice && 
            xpScore >= gamesWebsite.xpPrice &&
            jsBookLvl2.bought === true)
            {
                return true;
            }
            else{
                return false;
            }
    }
    else if(itemName === eCommerceStore.name)
    {
        if(moneyScore >= eCommerceStore.moneyPrice && 
            xpScore >= eCommerceStore.xpPrice &&
            jsBookLvl3.bought === true)
            {
                return true;
            }
            else{
                return false;
            }
    }
    else if(itemName === neuralNet.name)
    {
        if(moneyScore >= neuralNet.moneyPrice && 
            xpScore >= neuralNet.xpPrice &&
            jsBookLvl3.bought === true &&
            ajaxBook.bought === true)
            {
                return true;
            }
            else{
                return false;
            }
    }
    else if(itemName === cryptoTradingPlatform.name)
    {
        if(moneyScore >= cryptoTradingPlatform.moneyPrice && 
            xpScore >= cryptoTradingPlatform.xpPrice &&
            jsBookLvl3.bought === true &&
            ajaxBook.bought === true &&
            reactJSBook.bought === true)
            {
                return true;
            }
            else{
                return false;
            }
    }

}

//canAffordVIndicator what will switch styling 
//for can-afford class to green for true
//and red for false
function canAffordColorIndicator(boolean)
{
    //if true set styling text to green
    if(boolean)
    {
        return "#00ff00;";
    }
    //else to red
    else{
        return "red";
    }
}

//Generates a tool tip with relevent info inside
//like name, upgrade description
//money price, xp price and can afford
//with a boolean expression and a color 
function generateInfo(event)
{
    //let upgrade selected
    let upgradeSelected;

    //Cheking what upgrade triggered the mouseenter event

    //Upgrades
    if(event.target.name === cssHTMLBook.name)
    {
        upgradeSelected = cssHTMLBook;
    }
    else if(event.target.name === jsBookLvl1.name)
    {
        upgradeSelected = jsBookLvl1;
    }
    else if(event.target.name === jsBookLvl2.name)
    {
        upgradeSelected = jsBookLvl2;
    }
    else if(event.target.name === sqlTextBook.name)
    {
        upgradeSelected = sqlTextBook;
    }
    else if(event.target.name === phpTextBook.name)
    {
        upgradeSelected = phpTextBook;
    }
    else if(event.target.name === jsBookLvl3.name)
    {
        upgradeSelected = jsBookLvl3;
    }
    else if(event.target.name === ajaxBook.name)
    {
        upgradeSelected = ajaxBook;
    }
    else if(event.target.name === reactJSBook.name)
    {
        upgradeSelected = reactJSBook;
    }

    //Projects
    if(event.target.name === pizzaForm.name)
    {
        upgradeSelected = pizzaForm;
    }
    else if(event.target.name === toDoList.name)
    {
        upgradeSelected = toDoList;
    }
    else if(event.target.name === frogPuzzle.name)
    {
        upgradeSelected = frogPuzzle;
    }
    else if(event.target.name === clickerGame.name)
    {
        upgradeSelected = clickerGame;
    }
    else if(event.target.name === snakeEnhanced.name)
    {
        upgradeSelected = snakeEnhanced;
    }
    else if(event.target.name === tetrisEnhanced.name)
    {
        upgradeSelected = tetrisEnhanced;
    }
    else if(event.target.name === fakeECommerce.name)
    {
        upgradeSelected = fakeECommerce;
    }

    //Assets
    if(event.target.name === gamesWebsite.name)
    {
        upgradeSelected = gamesWebsite;
    }
    else if(event.target.name === eCommerceStore.name)
    {
        upgradeSelected = eCommerceStore;
    }
    else if(event.target.name === neuralNet.name)
    {
        upgradeSelected = neuralNet;
    }
    else if(event.target.name === cryptoTradingPlatform.name)
    {
        upgradeSelected = cryptoTradingPlatform;
    }


    //Using upgrade selected generate inner html and 
    //pack it inside of the div
    infoContainer.innerHTML = generateInnerHTMLToolTip(upgradeSelected);
}

//Generates inner HTML for tool tip
function generateInnerHTMLToolTip(upgrade)
{
    console.log(upgrade);
    let innerHTML = `<p>${upgrade.description}</p>
        <p>Money price: <span class='money'>${upgrade.moneyPrice}</span></p>
        <p>XP price: <span class='xp'>${upgrade.xpPrice}</span></p>
        <p>Special Requirements: ${upgrade.specialRequirments}</p>
        <p>Effects: ${upgrade.gives}</p>        
        <p>Can afford: <span style='color:${canAffordColorIndicator(canAfford(upgrade.name))}'>${canAfford(upgrade.name)}</span></p>`;

        return innerHTML;
}

//Money persocond function will add the 
//money per second rate and update the fields
function mpsTracking()
{
    //Check for win
    if(moneyScore >= moneyGoal)
    {
        winModal.showModal();

        //clear all intervals
        clearInterval(pizzaFormInterval);
        clearInterval(toDoListInterval);
        clearInterval(frogPuzzleInterval);
        clearInterval(clickerGameInterval);
        clearInterval(snakeEnhancedInterval);
        clearInterval(tetrisEnhancedInterval);
        clearInterval(fakeECommerceInterval);
        clearInterval(mpsInterval);
        clearInterval(timeInterval);

        return;
    }
    //Display money per second on the mps field
    moneyPerSecondField.innerText = moneyPerSecond;

    //Add the mps rate to the users moneyScore
    moneyScore += moneyPerSecond;

    //Update the money score on the screen
    moneyScoreElement.innerText = moneyScore;

    //Update the money scroe on the goal field
    currentBalance.innerText = moneyScore;

    //If infoContainer innerHtml is "" then replace it with placeholder
    if(infoContainer.innerHTML === "") {
        infoContainer.innerHTML = "<p>Hover over an item or a project to learn more about it.</p>"
    }
}

//Set's upgrades tooltip inner html to ""
function removeInfo()
{
    infoContainer.innerHTML = "";
}

//Loads save from the localStorage
//localStorage names and what they save

//'data' saves all in game objects

//'money' saved the amount of money player earned
//in moneyScore

//'xp' saved xpScore variable xp earned

//mps is saved too as for money per second

//time-left which is number of seconds saved

function loadSave()
{
    //First unpack everithing from the 
    //localStorage

    //data
    let dataJSON = localStorage.getItem("data");
    let data = JSON.parse(dataJSON);

    // Update each object in the allObjects array with data from localStorage
    for (let i = 0; i < allObjects.length; i++) {
        Object.assign(allObjects[i], data[i]);
    }

    //money
    let money = parseInt(localStorage.getItem("money"));

    //moneyGoal
    let moneyGoalReturned = parseInt(localStorage.getItem("money-goal"));

    //fastFood rate
    let moneyRate = parseInt(localStorage.getItem("money-rate"));

    //xp
    let xp = parseInt(localStorage.getItem("xp"));

    //xp-rate
    let xpRate = parseInt(localStorage.getItem("xp-rate"));

    //mps
    let mps = parseInt(localStorage.getItem("mps"));

    //time-left in seconds
    let timeLeft = parseInt(localStorage.getItem("time-left"));

    //Booleans for checking which level is unlocked on not
    let lvl2Unlocked = false;
    let lvl3Unlocked = false;

    //Now set all the non objects to the info fields

    //money set
    moneyScore = money;
    moneyScoreElement.innerText = moneyScore;

    moneyGoal = moneyGoalReturned;
    moneyEndGoal.innerText = parseInt(moneyGoal);

    //fastFoodRate set (money per click)
    fastFoodRate = moneyRate;

    //xp setting
    xpScore = xp;
    xpScoreElement.innerText = xp;

    //xp rate set 
    xpEarningRate = xpRate;

    //set mps
    moneyPerSecond = mps;
    moneyPerSecondField.innerText = moneyPerSecond;

    //timeLeft
    minutesInSeconds = timeLeft;

    //Check if they are unlocked or not

    if(data[0].bought === true)
    {
        cssHTMLBook.bought = true;
    }

    //Check if lvl 2 is unlocked (JS book level 1)
    if(data[1].bought === true)
    {
        lvl2Unlocked = true;
        jsBookLvl1.bought = true;
    }

    if(data[2].bought === true)
    {
        lvl2Unlocked = true;
        jsBookLvl2.bought = true;
    }

    if(data[3].bought === true)
    {
        lvl2Unlocked = true;
        sqlTextBook.bought = true;
    }

    //level 3 unlocked (Php book)
    if(data[4].bought === true)
    {
        lvl3Unlocked = true;
        phpTextBook.bought = true;
    }

    if(data[5].bought === true)
    {
        jsBookLvl3.bought = true;
    }

    if(data[6].bought === true)
    {
        reactJSBook.bought = true;
    }

    if(data[7].bought === true)
    {
        ajaxBook.bought = true;
    }

    //Generate all the saved
    //items from data and give them listeners

    //Generate all the upgrades
    for(let i = 0; i < 8; i++)
    {
        //check if upgrade is not yet bought
        //if it isn't generate it
        if(data[i].bought === false)
        {
            //Apends generated divs to the store container
            let storeItem = document.createElement("div");
            let storeItemImg = document.createElement("img");

            //Put the img inside the div and set its alt to the arrays
            //index value
            storeItemImg.alt = data[i].name;
            storeItem.name = data[i].name;
            storeItem.appendChild(storeItemImg);
            storeItem.classList.add(data[i].lvl);
            storeItem.classList.add(data[i].class);

            //Give storeItem a listener for buying
            //The hover listener will be given in create listeners
            //after the save is loaded
            storeItem.addEventListener("click", () => {
                buyUpgrade(data[i].name, storeItem)
            });

            //Attach the div to the container
            storeContainer.appendChild(storeItem);
        }
    }

    //Generate all projects
    for(let i = 8; i < 15; i++)
    {
        //Apends generated divs to the store container
        let projectItem = document.createElement("div");
        let projectItemImg = document.createElement("img");
        let quantity = document.createElement("h1");
        quantity.innerText = data[i].numPurchased;
        projectItem.classList.add(data[i].class, data[i].name);

        //Put the img inside the div and set its alt to the arrays
        //index value
        projectItemImg.alt = data[i].name;
        projectItem.name = data[i].name;
        projectItem.appendChild(projectItemImg);
        projectItem.appendChild(quantity);
        projectItem.classList.add(data[i].lvl);

        projectItem.addEventListener("click", () => {
            buyUpgrade(data[i].name, projectItem)
        });

        //Attach the div to the container
        actionContainer.appendChild(projectItem);
    }

    //Generate icon containers
    

    //Generate all assets with their inner icons
    for(let i = 15, containerIndex = 0; i < data.length; i++, containerIndex++)
    {      
        //Generate The asset itself first and then
        //Apends generated divs to the store container
        let projectItem = document.createElement("div");
        let projectItemImg = document.createElement("img");
        let quantity = document.createElement("h1");
        quantity.innerText = data[i].numPurchased;
        console.log(data[i].numPurchased);
        projectItem.classList.add("project", data[i].name);
        projectItem.classList.add(data[i].class, data[i].name);

        //Put the img inside the div and set its alt to the arrays
        //index value
        projectItemImg.alt = data[i].name;
        projectItem.name = data[i].name;
        projectItem.appendChild(projectItemImg);
        projectItem.appendChild(quantity);
        projectItem.classList.add(data[i].lvl);

        projectItem.addEventListener("click", () => {
            buyUpgrade(data[i].name, projectItem)
        });

        //Attach the div to the container
        actionContainer.appendChild(projectItem);

        //Create icon container
        let viewWindow = document.createElement("div");

        //give it a assetName class name on index
        viewWindow.classList.add(assetContainerNames[containerIndex]);
        viewWindow.classList.add(data[i].lvl);

        //append it to the assetView Container
        assetViewContainer.appendChild(viewWindow);
        
        //Generate the number of icons according to the numPurchased
        //Find the right container
        let container = document.querySelector(`.${assetContainerNames[containerIndex]}`);

        for (let j = 0; j < data[i].numPurchased; j++) 
        {
            addDivToAssetViewContainer(container, imageSrc);
        }
        
    }

    //Unlock items that were unlocked before
    if(lvl2Unlocked)
    {
        showLvl2();
    }

    if(lvl3Unlocked)
    {
        showLvl3();
    }

}

//Show save text for 3 seconds
function saveProgress()
{
    //Save everithing to the localStorage

    //In game objects
    let dataJSON = JSON.stringify(allObjects);
    
    localStorage.setItem("data", dataJSON);

    //money setting
    localStorage.setItem("money", moneyScore);

    //money earning rate
    localStorage.setItem("money-rate", fastFoodRate);

    //xp setting
    localStorage.setItem("xp", xpScore);

    //Xp earning rate
    localStorage.setItem("xp-rate", xpEarningRate);

    //mps setting
    localStorage.setItem("mps", moneyPerSecond);

    //time-left setting
    localStorage.setItem("time-left", minutesInSeconds);

    //display block on the text 
    savedText.style.display = "block";

    //Save moneyGoal
    localStorage.setItem("money-goal", moneyGoal);

    //start a setTimeout that will hide it in
    //3 seconds
    setTimeout(() =>{
        savedText.style.display = "none";
    }, 3000);
}

