let snakeBtn = document.getElementById("snake-btn");
let tetrisBtn = document.getElementById("tetris-btn");
let clickerBtn = document.getElementById("clicker-btn");
let webscraperBtn = document.getElementById("webscraper-btn");


window.onload = () => {
    snakeBtn.addEventListener("click", snakeBtnScroll)
    tetrisBtn.addEventListener("click", tetrisBtnScroll)
    clickerBtn.addEventListener("click", clickerBtnScroll)
    webscraperBtn.addEventListener("click", webscraperBtnScroll)
};

//Scroll functions for each button
function snakeBtnScroll()
{
    scroll(0, 740);
}

function tetrisBtnScroll()
{
    scroll(0, 1600);
}

function clickerBtnScroll()
{
    scroll(0, 2400);
}

function webscraperBtnScroll()
{
    scroll(0, 3320);
}
