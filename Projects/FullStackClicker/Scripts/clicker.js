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

//Sound Elements
let xpClickSound = document.getElementById("clickSoundXP");
let moneyClickSound = document.getElementById("clickSoundMoney");
let clickSoundPurchase = document.getElementById("clickSoundPurchase");

//Element lists
let storeUpgradesList;
//The whole list
let projectsList;

//Timer settings
let minutes = 20;
let minutesInSeconds = minutes * 60;

//Cooldown times for projects (seconds)
const pizzaFormCooldownOriginal = 30;
const toDoListCooldownOriginal = 60;
const frogPuzzleCooldownOriginal = 120;
const clickerGameCooldownOriginal = 180;
const snakeEnhancedCooldownOriginal = 240;
const tetrisEnhancedCooldownOriginal = 360;
const fakeECommerceCooldownOriginal = 600;
let pizzaFormCooldown = pizzaFormCooldownOriginal;
let toDoListCooldown = toDoListCooldownOriginal;
let frogPuzzleCooldown = frogPuzzleCooldownOriginal;
let clickerGameCooldown = clickerGameCooldownOriginal;
let snakeEnhancedCooldown = snakeEnhancedCooldownOriginal;
let tetrisEnhancedCooldown = tetrisEnhancedCooldownOriginal;
let fakeECommerceCooldown = fakeECommerceCooldownOriginal;

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
let fastFoodRate = 10000;
let moneyPerSecond = 0;

//Earning rates for xp
let xpEarningRate = 10000;

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
    gives: "Allows player to earn xp and adds 5 xp per click to the players xp rate",
    effects: () =>{
        //Subtract the bying cost first
        moneyScore-=cssHTMLBook.moneyPrice;
        xpScore-=cssHTMLBook.xpPrice;

        //Set the bought to true
        cssHTMLBook.bought = true;

        //Update the xpEarningRate
        xpEarningRate += cssHTMLBook.xpBonus;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
}

let jsBookLvl1 = {
    name: "JS Book Lvl 1",
    description: "A begginer's guide to Java Script. (Allows to Earn XP)",
    moneyPrice: 100,
    xpPrice: 0,
    specialRequirments: "NONE",
    bought: false,
    xpBonus: 10,
    gives: "Allows player to earn xp and adds 10 xp per click to the players xp rate",
    effects: () =>{
        //Subtract the bying cost first
        moneyScore-=jsBookLvl1.moneyPrice;
        xpScore-=jsBookLvl1.xpPrice;

        //Set the bought to true
        jsBookLvl1.bought = true;

        //Update the xpEarningRate
        xpEarningRate += jsBookLvl1.xpBonus;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;

        //Show lvl 2 items
        showLvl2();

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
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
    gives: "Additional 20 XP per click",
    effects: () =>{
        //Subtract the bying cost first
        moneyScore-=jsBookLvl2.moneyPrice;
        xpScore-=jsBookLvl2.xpPrice;

        //Set the bought to true
        jsBookLvl2.bought = true;

        //Update the xpEarningRate
        xpEarningRate += jsBookLvl2.xpBonus;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
}

let sqlTextBook = {
    name: "SQL Book",
    description: "A begginer's guide into the world backend server queries",
    moneyPrice: 350,
    xpPrice: 0,
    specialRequirments: "NONE",
    bought: false,
    xpBonus: 20,
    gives: "Additional 20 XP per click",
    effects: () =>{
        //Subtract the bying cost first
        moneyScore-=sqlTextBook.moneyPrice;
        xpScore-=sqlTextBook.xpPrice;

        //Set the bought to true
        sqlTextBook.bought = true;

        //Update the xpEarningRate
        xpEarningRate += sqlTextBook.xpBonus;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
}

let phpTextBook = {
    name: "PHP Book",
    description: "A beginers guide to managing servers and backend applications",
    moneyPrice: 450,
    xpPrice: 0,
    specialRequirments: "NONE",
    bought: false,
    xpBonus: 25,
    gives: "Additional 25 XP per click",
    effects: () =>{
        //Subtract the bying cost first
        moneyScore-=phpTextBook.moneyPrice;
        xpScore-=phpTextBook.xpPrice;

        //Set the bought to true
        phpTextBook.bought = true;

        //Update the xpEarningRate
        xpEarningRate += phpTextBook.xpBonus;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;

        //Show lvl 3 items
        showLvl3();

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
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
    gives: "Additional 60 XP per click",
    effects: () =>{
        //Subtract the bying cost first
        moneyScore-=jsBookLvl3.moneyPrice;
        xpScore-=jsBookLvl3.xpPrice;

        //Set the bought to true
        jsBookLvl3.bought = true;

        //Update the xpEarningRate
        xpEarningRate += jsBookLvl3.xpBonus;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
}

let reactJSBook = {
    name: "React JS Book",
    description: "A begginer's guide to a popular JS library",
    moneyPrice: 950,
    xpPrice: 0,
    specialRequirments: "NONE",
    bought: false,
    xpBonus: 70,
    gives: "Additional 70 XP per click",
    effects: () =>{
        //Subtract the bying cost first
        moneyScore-=reactJSBook.moneyPrice;
        xpScore-=reactJSBook.xpPrice;

        //Set the bought to true
        reactJSBook.bought = true;

        //Update the xpEarningRate
        xpEarningRate += reactJSBook.xpBonus;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
}

let ajaxBook = {
    name: "Ajax Book",
    description: "Ajax is a framework for JS",
    moneyPrice: 1200,
    xpPrice: 0,
    specialRequirments: "NONE",
    bought: false,
    xpBonus: 100,
    gives: "Additional 100 XP per click",
    effects: () =>{
        //Subtract the bying cost first
        moneyScore-=ajaxBook.moneyPrice;
        xpScore-=ajaxBook.xpPrice;

        //Set the bought to true
        ajaxBook.bought = true;

        //Update the xpEarningRate
        xpEarningRate += ajaxBook.xpBonus;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
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
    gives: "5x players XP investment",
    numPurchased: 0,
    effects: () =>{
        let quantityField = document.querySelector(".Pizza-Order-Form h1");

        //Subtract the bying cost first
        moneyScore-=pizzaForm.moneyPrice;
        xpScore-=pizzaForm.xpPrice;

        //Set the bought to true
        pizzaForm.bought = true;

        //Update the xpEarningRate
        xpScore += pizzaForm.xpBonus;

        //increment the numPurchased
        pizzaForm.numPurchased++;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;
        quantityField.innerText = pizzaForm.numPurchased;

        //Play the purchase sound
        //clickSoundPurchase.play();

        //Pass the project element to the function that will
        //give a different styling and start the cooldown timer
        startCooldown(projects[0], pizzaForm.name, pizzaFormCooldown);
    }
}

let toDoList = {
    name: "To-Do-List",
    description: "A dynamic to do list powered by Java Script",
    moneyPrice: 0,
    xpPrice: 500,
    specialRequirments: "CSS/HTML Book, JS Book Lvl 1",
    bought: false,
    xpBonus: 1500,
    gives: "Gives 1000 xp for invested 500",
    numPurchased: 0,
    effects: () =>{
        let quantityField = document.querySelector(".To-Do-List h1");

        //Subtract the bying cost first
        moneyScore-=toDoList.moneyPrice;
        xpScore-=toDoList.xpPrice;

        //Set the bought to true
        toDoList.bought = true;

        //Update the xpEarningRate
        xpScore += toDoList.xpBonus;

        //increment the numPurchased
        toDoList.numPurchased++;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;
        quantityField.innerText = toDoList.numPurchased;

        //Play the purchase sound
        //clickSoundPurchase.play();

        //Pass the project element to the function that will
        //give a different styling and start the cooldown timer
        startCooldown(projects[1], toDoList.name, toDoListCooldown);
    }
}

let frogPuzzle = {
    name: "Frog-Puzzle",
    description: "A cool frog puzzle with dragable pieces",
    moneyPrice: 0,
    xpPrice: 1000,
    specialRequirments: "CSS/HTML Book, JS Book Lvl 1",
    bought: false,
    xpBonus: 2000,
    gives: "Gives 2k XP back for 1k investment",
    numPurchased: 0,
    effects: () =>{
        let quantityField = document.querySelector(".Frog-Puzzle h1");

        //Subtract the bying cost first
        moneyScore-=frogPuzzle.moneyPrice;
        xpScore-=frogPuzzle.xpPrice;

        //Set the bought to true
        frogPuzzle.bought = true;

        //Update the xpEarningRate
        xpScore += frogPuzzle.xpBonus;

        //increment the numPurchased
        frogPuzzle.numPurchased++;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;
        quantityField.innerText = frogPuzzle.numPurchased;

        //Play the purchase sound
        //clickSoundPurchase.play();

        //Pass the project element to the function that will
        //give a different styling and start the cooldown timer
        startCooldown(projects[2], frogPuzzle.name, frogPuzzleCooldown);
    }
}

//lvl 2
let clickerGame = {
    name: "Clicker-Game",
    description: "Basic Clicker Game",
    moneyPrice: 0,
    xpPrice: 5000,
    specialRequirments: "JS Book Lvl 2",
    bought: false,
    xpBonus: 10000,
    gives: "Player gets 10k XP when 5k XP is invested",
    numPurchased: 0,
    effects: () =>{
        let quantityField = document.querySelector(".Clicker-Game h1");

        //Subtract the bying cost first
        moneyScore-=clickerGame.moneyPrice;
        xpScore-=clickerGame.xpPrice;

        //Set the bought to true
        clickerGame.bought = true;

        //Update the xpEarningRate
        xpScore += clickerGame.xpBonus;

        //increment the numPurchased
        clickerGame.numPurchased++;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;
        quantityField.innerText = clickerGame.numPurchased;

        //Play the purchase sound
        //clickSoundPurchase.play();

        //Pass the project element to the function that will
        //give a different styling and start the cooldown timer
        startCooldown(projects[3], clickerGame.name, clickerGameCooldown);
    }
}

let snakeEnhanced = {
    name: "Snake-Enhanced",
    description: "Snake Game with randomly spawning mines",
    moneyPrice: 0,
    xpPrice: 10000,
    specialRequirments: "JS Book Lvl 2",
    bought: false,
    xpBonus: 20000,
    gives: "Player gets 20k XP when 10k XP is invested",
    numPurchased: 0,
    effects: () =>{
        let quantityField = document.querySelector(".Snake-Enhanced h1");

        //Subtract the bying cost first
        moneyScore-=snakeEnhanced.moneyPrice;
        xpScore-=snakeEnhanced.xpPrice;

        //Set the bought to true
        snakeEnhanced.bought = true;

        //Update the xpEarningRate
        xpScore += snakeEnhanced.xpBonus;

        //increment the numPurchased
        snakeEnhanced.numPurchased++;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;
        quantityField.innerText = snakeEnhanced.numPurchased;

        //Play the purchase sound
        //clickSoundPurchase.play();

        //Pass the project element to the function that will
        //give a different styling and start the cooldown timer
        startCooldown(projects[4], snakeEnhanced.name, snakeEnhancedCooldown);
    }
}

let tetrisEnhanced = {
    name: "Tetris-Enhanced",
    description: "Tetris with AI bot and 30 achievements",
    moneyPrice: 0,
    xpPrice: 20000,
    specialRequirments: "JS Book Lvl 2",
    bought: false,
    xpBonus: 40000,
    gives: "Player gets 40k XP when 20k XP is invested",
    numPurchased: 0,
    effects: () =>{
        let quantityField = document.querySelector(".Tetris-Enhanced h1");

        //Subtract the bying cost first
        moneyScore-=tetrisEnhanced.moneyPrice;
        xpScore-=tetrisEnhanced.xpPrice;

        //Set the bought to true
        tetrisEnhanced.bought = true;

        //Update the xpEarningRate
        xpScore += tetrisEnhanced.xpBonus;

        //increment the numPurchased
        tetrisEnhanced.numPurchased++;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;
        quantityField.innerText = tetrisEnhanced.numPurchased;

        //Play the purchase sound
        //clickSoundPurchase.play();

        //Pass the project element to the function that will
        //give a different styling and start the cooldown timer
        startCooldown(projects[5], tetrisEnhanced.name, tetrisEnhancedCooldown);
    }
}

//Lvl 3 
let fakeECommerce = {
    name: "Fake-E-Commerce-Store",
    description: "A non functional e commerce store",
    moneyPrice: 0,
    xpPrice: 45000,
    specialRequirments: "JS Book Lvl 3",
    bought: false,
    xpBonus: 80000,
    gives: "Player gets 80k XP when 45k XP is invested",
    numPurchased: 0,
    effects: () =>{
        let quantityField = document.querySelector(".Fake-E-Commerce-Store h1");

        //Subtract the bying cost first
        moneyScore-=fakeECommerce.moneyPrice;
        xpScore-=fakeECommerce.xpPrice;

        //Set the bought to true
        fakeECommerce.bought = true;

        //Update the xpEarningRate
        xpScore += fakeECommerce.xpBonus;

        //increment the numPurchased
        fakeECommerce.numPurchased++;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;
        quantityField.innerText = fakeECommerce.numPurchased;

        //Play the purchase sound
        //clickSoundPurchase.play();

        //Pass the project element to the function that will
        //give a different styling and start the cooldown timer
        startCooldown(projects[6], fakeECommerce.name, fakeECommerceCooldown);
    }
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
    gives: "Earns 10 dollars passively",
    numPurchased: 0,
    effects: () =>{
        let quantityField = document.querySelector(".Website-with-Games h1");
        let viewContainer = document.querySelector(".Website-with-Games-Container");

        //Add an indicator to the assets viewContainer
        addDivToAssetViewContainer(viewContainer);

        //Subtract the bying cost first
        moneyScore-=gamesWebsite.moneyPrice;
        xpScore-=gamesWebsite.xpPrice;

        //Update the xpEarningRate
        moneyPerSecond += gamesWebsite.mps;

        //increment the numPurchased
        gamesWebsite.numPurchased++;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;
        quantityField.innerText = gamesWebsite.numPurchased;

        mpsTracking();

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
}

//lvl 3
let eCommerceStore = {
    name: "E-Commerce-Store",
    description: "A real E Commerce bussiness that makes real money",
    moneyPrice: 5000,
    xpPrice: 25000,
    specialRequirments: "JS Book Lvl 3",
    mps: 250,
    gives: "Earns 250 dollars passively",
    numPurchased: 0,
    effects: () =>{
        let quantityField = document.querySelector(".E-Commerce-Store h1");
        let viewContainer = document.querySelector(".E-Commerce-Store-Container");

        //Add an indicator to the assets viewContainer
        addDivToAssetViewContainer(viewContainer);

        //Subtract the bying cost first
        moneyScore-=eCommerceStore.moneyPrice;
        xpScore-=eCommerceStore.xpPrice;

        //Update the xpEarningRate
        moneyPerSecond += eCommerceStore.mps;

        //increment the numPurchased
        eCommerceStore.numPurchased++;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;
        quantityField.innerText = eCommerceStore.numPurchased;

        mpsTracking();

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
}

let neuralNet = {
    name: "Neural-Net",
    description: "Neural Net that will generate income from the internet",
    moneyPrice: 15000,
    xpPrice: 50000,
    specialRequirments: "Js book lvl 3 and Ajax",
    mps: 500,
    gives: "Earns 500 dollars passively",
    numPurchased: 0,
    effects: () =>{
        let quantityField = document.querySelector(".Neural-Net h1");
        let viewContainer = document.querySelector(".Neural-Net-Container");

        //Add an indicator to the assets viewContainer
        addDivToAssetViewContainer(viewContainer);

        //Subtract the bying cost first
        moneyScore-=neuralNet.moneyPrice;
        xpScore-=neuralNet.xpPrice;

        //Update the xpEarningRate
        moneyPerSecond += neuralNet.mps;

        //increment the numPurchased
        neuralNet.numPurchased++;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;
        quantityField.innerText = neuralNet.numPurchased;

        mpsTracking();

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
}

let cryptoTradingPlatform = {
    name: "Crypto-Trading-Platform",
    description: "A website with games that has adds",
    moneyPrice: 250000,
    xpPrice: 100000,
    specialRequirments: "JS lvl 3, Ajax, React JS",
    mps: 25000,
    gives: "Earns 25k dollars passively",
    numPurchased: 0,
    effects: () =>{
        let quantityField = document.querySelector(".Crypto-Trading-Platform h1");
        let viewContainer = document.querySelector(".Crypto-Trading-Platform-Container");

        //Add an indicator to the assets viewContainer
        addDivToAssetViewContainer(viewContainer);
        //Subtract the bying cost first
        moneyScore-=cryptoTradingPlatform.moneyPrice;
        xpScore-=cryptoTradingPlatform.xpPrice;

        //Update the xpEarningRate
        moneyPerSecond += cryptoTradingPlatform.mps;

        //increment the numPurchased
        cryptoTradingPlatform.numPurchased++;

        //Update the counters information
        moneyScoreElement.innerText = moneyScore;
        xpScoreElement.innerText = xpScore;
        quantityField.innerText = cryptoTradingPlatform.numPurchased;

        mpsTracking();

        //Play the purchase sound
        clickSoundPurchase.play();

        //Clear the infoContainer of old info
        removeInfo();
    }
}

window.onload = startGame;

function createListeners()
{
    //Menu listeners
    openMenuBtn.addEventListener("click", ()=>{
        //clear mpsInterval
        clearInterval(mpsInterval);

        //Clear time interval too
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

    //List for all the items needing in an
    //event listener
    storeUpgradesList = document.querySelectorAll(".store-container div");
    projectsList = document.querySelectorAll(".actions-menu-container div");

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

    //Listeners for upgrade's tooltips
    storeUpgradesList.forEach(element =>{
        element.addEventListener("mouseenter", generateInfo);
    });

    storeUpgradesList.forEach(element =>{
        element.addEventListener("mouseleave", removeInfo);
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
    //Fill the store container with upgrades
    generateStoreItems();

    //Fill the projects variable
    projects = document.querySelectorAll(".project");

    //Set the mps tracking interval
    mpsInterval = setInterval(mpsTracking, 1000);

    //Start an interval that runs every second
    timeInterval = setInterval(updateCountDown, 1000);

    createListeners();

    //Show lvl 1 items
    showLvl1();
}
//Generates upgardes in the store container
//and practice projects
function generateStoreItems()
{
    //Generate Upgrades
    for (let i = 0; i < upgradeImgNames.length; i++) 
    {
        //Apends generated divs to the store container
        let storeItem = document.createElement("div");
        let storeItemImg = document.createElement("img");

        //Put the img inside the div and set its alt to the arrays
        //index value
        storeItemImg.alt = upgradeImgNames[i];
        storeItem.name = upgradeImgNames[i];
        storeItem.appendChild(storeItemImg);

        //Attach the div to the container
        storeContainer.appendChild(storeItem);
    }

    //Generate Projects
    for (let i = 0; i < projectNames.length; i++) 
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

        //Attach the div to the container
        actionContainer.appendChild(projectItem);
    }

    //Generate Assets
    for (let i = 0; i < assetNames.length; i++) 
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

        //Attach the div to the container
        actionContainer.appendChild(projectItem);
    }

    //Generate view asset windows for every asset
    for (let i = 0; i < assetContainerNames.length; i++) 
    {
        //create div element
        let viewWindow = document.createElement("div");

        //give it a assetName class name on index
        viewWindow.classList.add(assetContainerNames[i]);

        //append it to the assetView Container
        assetViewContainer.appendChild(viewWindow);

        console.log("View Container created");
    }
}

//Shows lvl 1 items on screen
function showLvl1()
{
    //Show upgrades
    storeUpgradesList[0].style.display = "inline-block";
    storeUpgradesList[1].style.display = "inline-block";

    //Show projects
    projectsList[0].style.display = "block";
    projectsList[1].style.display = "block";
    projectsList[2].style.display = "block";
}

//Shows lvl 2 items on screen
function showLvl2()
{
    //Show upgrades
    storeUpgradesList[2].style.display = "inline-block";
    storeUpgradesList[3].style.display = "inline-block";
    storeUpgradesList[4].style.display = "inline-block";

    //Show projects
    projectsList[3].style.display = "block";
    projectsList[4].style.display = "block";
    projectsList[5].style.display = "block";
    projectsList[7].style.display = "block";
}

//Shows lvl 3 items on screen
function showLvl3()
{
    //Show upgrades
    storeUpgradesList[5].style.display = "inline-block";
    storeUpgradesList[6].style.display = "inline-block";
    storeUpgradesList[7].style.display = "inline-block";

    //Show projects
    projectsList[6].style.display = "block";
    projectsList[8].style.display = "block";
    projectsList[9].style.display = "block";
    projectsList[10].style.display = "block";
}

function addDivToAssetViewContainer(container)
{
    let indicator = document.createElement("div");
    container.appendChild(indicator);
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
                cssHTMLBook.effects();
                itemElement.remove();
                break;

            case jsBookLvl1.name:
                jsBookLvl1.effects();
                itemElement.remove();
                break;

            //lvl 2 upgrades
            case jsBookLvl2.name:
                jsBookLvl2.effects();
                itemElement.remove();
                break;

            case sqlTextBook.name:
                sqlTextBook.effects();
                itemElement.remove();
                break;

            case phpTextBook.name:
                phpTextBook.effects();
                itemElement.remove();
                break;

            //Lvl 3 upgrades
            case jsBookLvl3.name:
                jsBookLvl3.effects();
                itemElement.remove();
                break;

            case ajaxBook.name:
                ajaxBook.effects();
                itemElement.remove();
                break;

            case reactJSBook.name:
                reactJSBook.effects();
                itemElement.remove();
                break;

            // Projects
            case pizzaForm.name:
                pizzaForm.effects();
                break;
            
            case toDoList.name:
                toDoList.effects();
                break;
            
            case frogPuzzle.name:
                frogPuzzle.effects();
                break;

            //Lvl 2 projects
            case clickerGame.name:
                clickerGame.effects();
                break;
            
            case snakeEnhanced.name:
                snakeEnhanced.effects();
                break;
            
            case tetrisEnhanced.name:
                tetrisEnhanced.effects();
                break;

            //lvl 3 projects
            case fakeECommerce.name:
                fakeECommerce.effects();
                break;

            //Assets

            //lvl 2
            case gamesWebsite.name:
                gamesWebsite.effects();
                break;

            //lvl 3
            case eCommerceStore.name:
                eCommerceStore.effects();
                break;

            case neuralNet.name:
                neuralNet.effects();
                break;

            case cryptoTradingPlatform.name:
                cryptoTradingPlatform.effects();
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
    //Display money per socond on the mps field
    moneyPerSecondField.innerText = moneyPerSecond;

    //Add the mps rate to the users moneyScore
    moneyScore += moneyPerSecond;

    //Update the money score on the screen
    moneyScoreElement.innerText = moneyScore;
}

//Set's upgrades tooltip inner html to ""
function removeInfo()
{
    infoContainer.innerHTML = "";
}

