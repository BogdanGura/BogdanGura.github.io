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

//Sound Elements
let xpClickSound = document.getElementById("clickSoundXP");
let moneyClickSound = document.getElementById("clickSoundMoney");
let clickSoundPurchase = document.getElementById("clickSoundPurchase");

//Timer settings
let minutes = 20;
let minutesInSeconds = minutes * 60;

//Cooldown times for projects (seconds)
const pizzaFormCooldownOriginal = 2;
const toDoListCooldownOriginal = 60;
const frogPuzzleCooldownOriginal = 120;
let pizzaFormCooldown = pizzaFormCooldownOriginal;
let toDoListCooldown = toDoListCooldownOriginal;
let frogPuzzleCooldown = frogPuzzleCooldownOriginal;

//Intervals for each upgrade
let pizzaFormInterval;
let toDoListInterval;
let frogPuzzleInterval;

//Score elements
let moneyScore = 0;
let xpScore = 0;

//Earning Rates for jobs and assets (money)
let fastFoodRate = 200;

//Earning rates for xp
let xpEarningRate = 200;

//Upgrade names array 
let upgradeImgNames = ["CSS/HTML Book", "JS Book Lvl 1"];

//Practice projects names
let projectNames = ["Pizza-Order-Form", "To-Do-List", "Frog-Puzzle"];

//Upgrade objects
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
    xpBonus: 3000,
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

window.onload = startGame;

function createListeners()
{
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
    let storeUpgradesList = document.querySelectorAll(".store-container div");
    let projectsList = document.querySelectorAll(".actions-menu-container div");

    console.log(storeUpgradesList);

    //Set listeners for upgrades in the shop

    //CSS/HTML Book
    storeUpgradesList[0].addEventListener("click", () => {
        buyUpgrade("CSS/HTML Book", storeUpgradesList[0])
    });

    storeUpgradesList[1].addEventListener("click", () => {
        buyUpgrade("JS Book Lvl 1", storeUpgradesList[1])
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

    // projectsList[1].addEventListener("click", () => {
    //     buyUpgrade("Dynamic Todo List", projectsList[1])
    // });
    
    // projectsList[2].addEventListener("click", () => {
    //     buyUpgrade("Frog Puzzle", projectsList[2])
    // });

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

    createListeners();

    //Start an interval that runs every second
    setInterval(updateCountDown, 1000);
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
            case pizzaForm.name:
                pizzaFormInterval = setInterval(() => manageCooldown(coolDownTimer, projectName, projectElement), 1000);
                break;

            case toDoList.name:
                toDoListInterval = setInterval(() => manageCooldown(coolDownTimer, projectName, projectElement), 1000);
                break;

            case frogPuzzle.name:
                frogPuzzleInterval = setInterval(() => manageCooldown(coolDownTimer, projectName, projectElement), 1000);
                break;
        }
}

//manageCooldown that will accept the element and the 
//cooldown time
function manageCooldown(coolDownElement, projectName, projectElement)
{
    //check if the cooldown is over or not
    

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
    //if not over, reduce the coldownTime
    //Then update the value of the coolDownElement
    else{
        switch (projectName) 
        {
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
            case cssHTMLBook.name:
                cssHTMLBook.effects();
                itemElement.remove();
                break;

            case jsBookLvl1.name:
                jsBookLvl1.effects();
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

        }
    }
}

//function what will check if you can afford something
//check depends on the parameter passed
function canAfford(itemName)
{
    //Upgrades
    if(itemName === "CSS/HTML Book")
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
    else if(itemName === "JS Book Lvl 1")
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

    //Projects
    if(itemName === "Pizza-Order-Form")
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
    else if(itemName === "To-Do-List")
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
    else if(itemName === "Frog-Puzzle")
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

//Set's upgrades tooltip inner html to ""
function removeInfo()
{
    infoContainer.innerHTML = "";
}

