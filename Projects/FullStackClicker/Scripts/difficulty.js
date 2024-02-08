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