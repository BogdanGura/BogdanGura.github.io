//Bogdan Gura

//All the images, will be set grey scale 100%;
//at the start, if localStorage("achivements")
//isnt empty run through an if statement to color them 
//accordingly

//Images
/* let firstAppleImg = document.getElementById("firstApple");
let bronzeAppleImg = document.getElementById("bronzeApple");
let silverAppleImg = document.getElementById("silverApple");
let goldenAppleImg = document.getElementById("goldenApple");
let platinumAppleImg = document.getElementById("platinumApple");
let thatWasaMisClickImg = document.getElementById("thatWasaMisClick");
let BOOMImg = document.getElementById("BOOM");
let OuchImg = document.getElementById("Ouch"); */
let achivementImgs = document.querySelectorAll("img");

//Logic
window.onload = loadAchivements;


function loadAchivements()
{
    if(localStorage.getItem("achivements") !== null)
    {
        let achivementsArray = JSON.parse(localStorage.getItem("achievements"));
        //Check each ahcivement in the array
        //and if its earned (true) then set its 
        //gray scale to 0
        for(let i = 0; i < 8; i++)
        {
            if(achivementsArray[i].earned)
            {
                achivementImgs[i].style.filter = "grayscale(0)";
            }
        }
    }
}