//!Date: 7/24/23
window.addEventListener('load', createListener);

//*Array for tasks
let tasksList = [];

//*Functions
function createListener() 
{
    let button = document.getElementById('btn');

    if(button.addEventListener)
    {
        button.addEventListener('click', addTask, false);
    }
    else if(button.attachEvent)
    {
        button.attachEvent('onclick', addTask, false);
    }
}

function addTask()
{
    let input = document.getElementById('input');
    tasksList.unshift(input.value + " ");
    input.value = "";

    generateList();
}

function generateList()
{
    let list = document.getElementById('list');
    let tasks = document.getElementsByTagName('li');

    //*Checks if there is any li elements in the list
    while(tasks.length > 0)
    {
        for(let i = 0; i < tasks.length; i++)
        {
            list.removeChild(tasks[i]);
        }

    }
    //*After clean up, new list is generated
    if(tasksList.length > 0)
    {
        for(let i = 0; i < tasksList.length; i++)
        {
            let task = document.createElement('li');
            task.innerHTML = tasksList[i];

            //*first Button
            let firstButton = document.createElement('button');
            firstButton.innerHTML = 'first';
            firstButton.style.backgroundColor = 'green';
            firstButton.className = "first";

            //*Last button
            let lastButton = document.createElement('button');
            lastButton.innerHTML = 'last';
            lastButton.style.backgroundColor = 'red';
            lastButton.className = "last";

            //*Appending buttons to the li element
            task.appendChild(firstButton);
            task.appendChild(lastButton);

            //*Appending task to the task list
            list.appendChild(task);
        }

        //*Making attaching event listeners to last and first buttons
        let firstButtons = document.querySelectorAll(".first");
        let lastButtons = document.querySelectorAll(".last");

        //*Attaching event listeners for first buttons
        for(let i = 0; i < firstButtons.length; i++)
        {
            if(firstButtons[i].addEventListener)
            {
                firstButtons[i].addEventListener('click', moveUp, false);
            }
            else if(firstButtons[i].attachEvent)
            {
                firstButtons[i].attachEvent('onclick', moveUp, false);
            }
        }

        //*Attaching event listeners for last buttons
        for(let i = 0; i < lastButtons.length; i++)
        {
            if(lastButtons[i].addEventListener)
            {
                lastButtons[i].addEventListener('click', moveDown, false);
            }
            else if(lastButtons[i].attachEvent)
            {
                lastButtons[i].attachEvent('onclick', moveDown, false);
            }
        }
        
    }
}

function moveUp(evt) 
{
    let callerElement = evt.target || evt.srcElement;
    let parentItem = callerElement.parentNode;
    //*looping to find the task that we clicked on 
    //* to remove it.
    for(let i = 0; i < tasksList.length; i++)
    {
       if(parentItem.innerHTML.search(tasksList[i]) !== -1)
       {
        let removedTask = tasksList.splice(i, 1);
        //*unshifting removedTask to the beggining
        tasksList.unshift(removedTask);
        console.log(removedTask);
       } 
    }
    generateList();
}

function moveDown(evt) 
{
    let callerElement = evt.target || evt.srcElement;
    let parentItem = callerElement.parentNode;

    //*looping to find the task that we clicked on 
    //* to remove it.
    for(let i = 0; i < tasksList.length; i++)
    {
       if(parentItem.innerHTML.search(tasksList[i]) !== -1)
       {
        let removedTask = tasksList.splice(i, 1);
        //*unshifting removedTask to the beggining
        tasksList.push(removedTask);
       }
    }
    generateList();
}