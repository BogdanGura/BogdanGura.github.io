//Bogdan Gura

console.log(localStorage);

let achivementGeneralImgs = document.querySelectorAll(".general-img");
let achivementAiImgs = document.querySelectorAll(".ai-img");
let achivementNamesImgs = document.querySelectorAll(".name-img");
let achivementClearImgs = document.querySelectorAll(".clear-img");

//Logic
window.onload = loadAchivements;


function loadAchivements()
{
    //Loading all achievements that player unlocked
    if(localStorage.getItem("achievements-general") !== "null" &&
       localStorage.getItem("achievements-general") !== null)
    {
        checkAchievements(achivementGeneralImgs, "achievements-general", 17);
    }

    if(localStorage.getItem("achievements-ai") !== "null" &&
       localStorage.getItem("achievements-ai") !== null)
    {
        checkAchievements(achivementAiImgs, "achievements-ai", 2);
    }

    if(localStorage.getItem("name-achievements") !== "null" &&
       localStorage.getItem("name-achievements") !== null)
    {
        console.log(localStorage);
        checkAchievements(achivementNamesImgs, "name-achievements", 7);
    }

    if(localStorage.getItem("clear-save-achievements") !== "null" &&
       localStorage.getItem("clear-save-achievements") !== null)
    {
        checkAchievements(achivementClearImgs, "clear-save-achievements", 3);
    }
}

function checkAchievements(imgArray, storageName, numIterations)
{
    let achivementsArray = JSON.parse(localStorage.getItem(storageName));
    //Check each ahcivement in the array
    //and if its earned (true) then set its 
    //gray scale to 0
    for(let i = 0; i < numIterations; i++)
    {
        if(achivementsArray[i].earned)
        {
            imgArray[i].style.filter = "grayscale(0)";
        }
    }
}
