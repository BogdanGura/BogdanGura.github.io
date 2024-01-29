//Bogdan Gura
// Elements
let countDownEl = document.getElementById("countdown");
let jsBookImg = document.getElementById("jsBook");
let workImg = document.getElementById("job");
let moneyScoreElement = document.getElementById("moneyScoreElement");
let xpScoreElement = document.getElementById("xpScoreElement");
let storeContainer = document.querySelector(".store-container");
let infoContainer = document.querySelector(".info-container");

//Sound Elements
let xpClickSound = document.getElementById("clickSoundXP");
let moneyClickSound = document.getElementById("clickSoundMoney");
let clickSoundPurchase = document.getElementById("clickSoundPurchase");

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
    description: "A begginer's guide into the world of web development. (Allows to Earn XP)",
    moneyPrice: 60,
    xpPrice: 0,
    bought: false,
    xpBonus: 5,
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
    }
}

let jsBookLvl1 = {
    name: "JS Book Lvl 1",
    description: "A begginer's guide to Java Script. (Allows to Earn XP)",
    moneyPrice: 100,
    xpPrice: 0,
    bought: false,
    xpBonus: 10,
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
        storeItem.name = upgradeImgNames[i];
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
        switch (itemName) {
            case "CSS/HTML Book":
                cssHTMLBook.effects();
                itemElement.remove();
                break;

            case "JS Book Lvl 1":
                jsBookLvl1.effects();
                itemElement.remove();
                break;
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
            // alert(`Not enogh XP to purchase ${itemName}`);
            return false;
        }
        else if(moneyScore < cssHTMLBook.moneyPrice)
        {
            // alert(`Not enogh funds to purchase ${itemName}`);
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
         else if(xpScore < jsBookLvl1.xpPrice)
         {
            //  alert(`Not enogh XP to purchase ${itemName}`);
             return false;
         }
         else if(moneyScore < jsBookLvl1.moneyPrice)
         {
            //  alert(`Not enogh funds to purchase ${itemName}`);
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
    console.log(event);

    //let upgrade selected
    let upgradeSelected;

    //Cheking what upgrade triggered the mouseenter event
    if(event.target.name === "CSS/HTML Book")
    {
        upgradeSelected = cssHTMLBook;
    }
    else if(event.target.name === "JS Book Lvl 1")
    {
        upgradeSelected = jsBookLvl1;
    }

    //Using upgrade selected generate inner html and 
    //pack it inside of the div
    infoContainer.innerHTML = generateInnerHTMLToolTip(upgradeSelected);
}

//Generates inner HTML for tool tip
function generateInnerHTMLToolTip(upgrade)
{
    let innerHTML = `<p>${upgrade.description}</p>
        <p>Money price: <span class='money'>${upgrade.moneyPrice}</span></p>
        <p>XP price: <span class='xp'>${upgrade.xpPrice}</span></p>
        <p>Effects: Allows to earn ${upgrade.xpBonus} experience more per click</p>
        <p>Can afford: <span style='color:${canAffordColorIndicator(canAfford(upgrade.name))}'>${canAfford(upgrade.name)}</span></p>`;

        return innerHTML;
}

//Set's upgrades tooltip inner html to ""
function removeInfo()
{
    infoContainer.innerHTML = "";
}