//! 7/29/23
window.addEventListener('load', createListener);

function createListener()
{
    let btn = document.getElementById('btn');

    if(btn.addEventListener)
    {
        btn.addEventListener('click', sendCard, false);
    }
    else if(btn.attachEvent)
    {
        btn.attachEvent('onclick', sendCard, false);
    }
}

function sendCard()
{
    let input = document.getElementById('input');

    location.href = "birthday.htm" 
    + "?message=" 
    + input.value;

    window.open(location.href);
}