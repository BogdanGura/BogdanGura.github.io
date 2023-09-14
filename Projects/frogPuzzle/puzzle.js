//! Start 8/22/23
//*End 8/22/23
//Global Variables
let currentTile;
let otherTile;
const columns = 3;
const rows = 2;

window.onload = setUpPuzzle();

function setUpPuzzle()
{
    //Initilize board 2X3
    for(let i = 0; i < rows; i++)
    {
        for(let j = 0; j < columns; j++)
        {
            let tile = document.createElement("img");
            let board = document.getElementById("board");

            //Define image
            tile.src = "./images/blank.jpg";

            //Add addEvent listeners
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            //Append to board
            board.appendChild(tile);
        }
    }

        //pieces array(random)
        let pieces = [];
        //Loop that fills it with numbers 1-6 which are strings
        for(let i = 1; i <= 6; i++)
        {
            pieces.push(i.toString());
        }

        //Randomize pieces array
        for(let i = 1; i < pieces.length; i++)
        {
          let randomIndex = Math.floor(Math.random() * pieces.length);

            //Swaping values
           let temp = pieces[i];
           pieces[i] = pieces[randomIndex];
           pieces[randomIndex] = temp;
        }

        //Initilize images with pieces array
        for(let i = 0; i < 6; i++)
        {
            let tile = document.createElement("img");
            let piecesSpace = document.getElementById("pieces");

            //Define image
            tile.src = "./images/img" + pieces[i] + ".jpg";
            tile.className = "image";

            //Add addEvent listeners
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            //Append to piecesSpace
            piecesSpace.appendChild(tile);
        }
}//End of setUpFunction

function dragStart() {
    currentTile = this;
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
}

function dragLeave() {
    
}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    //Swapping image's srcs
    let currentImg = currentTile.src;
    let otherImg = otherTile.src;

    currentTile.src = otherImg;
    otherTile.src = currentImg;
}