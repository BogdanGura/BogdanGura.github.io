//Bogdan Gura
// Elements
let countDownEl = document.getElementById("countdown");
let jsBookImg = document.getElementById("jsBook");
let workImg = document.getElementById("job");
let moneyScoreElement = document.getElementById("moneyScoreElement");
let xpScoreElement = document.getElementById("xpScoreElement");
let storeContainer = document.querySelector(".store-container");
let storeUpgradesList;

//Sound Elements
let xpClickSound = document.getElementById("clickSoundXP");
let moneyClickSound = document.getElementById("clickSoundMoney");

//Timer settings
let minutes = 20;
let minutesInSeconds = minutes * 60;

//Score elements
let moneyScore = 0;
let xpScore = 0;

//Earning Rates for jobs and assets (money)
let fastFoodRate = 8;

//Earning rates for xp
let xpEarningRate = 0;

//Upgrade names array 
let upgradeImgNames = ["CSS/HTML Book", "JS Book Lvl 1"];

//Upgrade objects
let cssHTMLBook = {
    name: "CSS/HTML Book",
    moneyPrice: 60,
    xpPrice: 0,
    bought: false,
    xpBonus: 5,
    effects: () =>{
        //Subtract the bying cost first
        moneyScore=-cssHTMLBook.moneyPrice;
        xpScore=-cssHTMLBook.xpPrice;

        //Set the bought to true
        cssHTMLBook.bought = true;

        //Update the xpEarningRate
        xpEarningRate += xpBonus;

        //alert of a succesful buy
        alert("CSS/HTML Book bought succesfully");
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

    storeUpgradesList = document.querySelectorAll(".store-container div");

    //Set listeners for upgrades in the shop

    //CSS/HTML Book
    storeUpgradesList[0].addEventListener("click", () => {
        buyUpgrade("CSS/HTML Book", storeUpgradesList[0])
    });

}

function startGame()
{
    //Fill the store container with upgrades
    generateStoreItems();

    createListeners();

    //Start an interval that runs every second
    setInterval(updateCountDown, 1000);
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

//Generates upgardes in the store container
function generateStoreItems()
{
    for (let i = 0; i < upgradeImgNames.length; i++) 
    {
        //Apends generated divs to the store container
        let storeItem = document.createElement("div");
        let storeItemImg = document.createElement("img");

        //Put the img inside the div and set its alt to the arrays
        //index value
        storeItemImg.alt = upgradeImgNames[i];
        storeItem.appendChild(storeItemImg);

        //Attach the div to the container
        storeContainer.appendChild(storeItem);
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
        //Depending on what it is the effects are applied
        if(itemName === "CSS/HTML Book")
        {
            cssHTMLBook.effects;

            //itemElement removed
            itemElement.remove();
        }
    }
}

//function what will check if you can afford something
//check depends on the parameter passed
function canAfford(itemName)
{
    if(itemName === "CSS/HTML Book")
    {
        //check for sufficient funds and xp
        if(moneyScore >= cssHTMLBook.moneyPrice && 
           xpScore >= cssHTMLBook.xpPrice)
        {
            return true;
        }
        else if(xpScore < cssHTMLBook.xpPrice)
        {
            alert(`Not enogh XP to purchase ${itemName}`);
            return false;
        }
        else if(moneyScore < cssHTMLBook.moneyPrice)
        {
            alert(`Not enogh funds to purchase ${itemName}`);
            return false;
        }
    }
}