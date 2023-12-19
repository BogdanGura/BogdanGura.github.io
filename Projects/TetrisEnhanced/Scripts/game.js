export class Game
{
    "use strict"

    //Work on the moveLandedTetrominoes Tommorow

    /*Add a new tetromino check list

    1.add a check function that will check if that tetromino
      with its rotation has anything under it (add all of its rotation varients)

    2.Add it to the collision detector. down will get a check function,
     left and right will get their own custom collision depending on a 
     tetromino being added

    3. Shadow collisions will be powered by the check-tetromino name placeholder

    4. Rotation, make possible positions depending on the rotationIndex and
       position

    5.rotation valid custom validation for the tetromino
    */
    
    //! BUG AND FEATURES 
    //!Finish adding multi-clear logichessMisha 

    //Tetrominoes objects

    //Create tetromino objects that will represent 
    //their respected piece on the board
    I = {
        name: "I",
        //Possible spawn position for the tetromino
        spawnPositions: [{
            position: [2, 12, 22, 32],
            tetrominoRotationIndex: 0, //First,Vertical
            rotationIncrement: 11 
            //Value that will rotate a vertical I into a 
            //horizontal I
        }, {
            position: [3, 4, 5, 6],
            tetrominoRotationIndex: 1, //Side (Second)
            rotationIncrement: -11 
            //Value that will rotate a horizontal I into a 
            //vertical I
        }, {
            position: [5, 6, 7, 8],
            tetrominoRotationIndex: 1, //Side (Second)
            rotationIncrement: -11 //Same here 
        }],
        nextPosition: [4, 5, 6, 7]
    }

    O = {
        name: "O",
        //Possible spawn position for the tetromino
        spawnPositions: [{
            position: [4, 5, 14, 15],
            tetrominoRotationIndex: 0
        }, {
            position: [6, 7, 16, 17],
            tetrominoRotationIndex: 0
        }, {
            position: [7, 8, 17, 18],
            tetrominoRotationIndex: 0
        }],
        nextPosition: [5, 6, 9, 10]
    }
    //If shadow doesn't show. Check if the border has solid in the attribute defenition
    T = {
        name: "T",
        //Possible spawn position for the tetromino
        spawnPositions: [{
            position: [11, 12, 13, 2],
            tetrominoRotationIndex: 0
        }, {
            position: [15, 16, 17, 6],
            tetrominoRotationIndex: 0
        }, {
            position: [2, 12, 22, 13],
            tetrominoRotationIndex: 1
        }],
        nextPosition: [6, 9, 10, 11]
    }

    S = {
        name: "S",
        //Possible spawn position for the tetromino
        spawnPositions: [{
            position: [13, 12, 22, 21],
            tetrominoRotationIndex: 0
        }, {
            position: [17, 16, 26, 25],
            tetrominoRotationIndex: 0
        }, {
            position: [2, 12, 13, 23],
            tetrominoRotationIndex: 1
        }],
        nextPosition: [7, 6, 10, 9]
    }

    Z = {
        name: "Z",
        //Possible spawn position for the tetromino
        spawnPositions: [{
            position: [1, 2, 12, 13],
            tetrominoRotationIndex: 0
        }, {
            position: [6, 7, 17, 18],
            tetrominoRotationIndex: 0
        }, {
            position: [3, 13, 12, 22],
            tetrominoRotationIndex: 1
        }],
        nextPosition: [5, 6, 10, 11]
    }

    J = {
        name: "J",
        //Possible spawn position for the tetromino
        spawnPositions: [{
            position: [3, 13, 23, 22],
            tetrominoRotationIndex: 0
        }, {
            position: [7, 17, 27, 26],
            tetrominoRotationIndex: 0
        }, {
            position: [14, 13, 12, 2],
            tetrominoRotationIndex: 1
        }],
        nextPosition: [2, 6, 10, 9]
    }

    L = {
        name: "L",
        //Possible spawn position for the tetromino
        spawnPositions: [{
            position: [3, 13, 23, 24],
            tetrominoRotationIndex: 0
        }, {
            position: [5, 15, 25, 26],
            tetrominoRotationIndex: 0
        }, {
            position: [11, 12, 13, 3],
            tetrominoRotationIndex: 1
        }],
        nextPosition: [1, 5, 9, 10]
    }

    //create and fill the tetrominoesArray
    tetrominoesArray = [this.I, this.J]; //this.I, this.O, this.T, this.S, this.Z

    //Constructor
    constructor()
    {
        //Defines current tetromino property variable
        this.tetrominoPosition = [];
        this.tetrominoColor; //used as tetromino's color
        this.tetrominoRotationIndex = 0;
        this.landedTetrominoes = [];
        this.shadowPosition = [];
        // next tetromino is an object that represents 
        //the next tetromino to be generated
        this.nextTetromino;
    }

    //pick a random tetromino function picks a random tetromino 
    //fron an array of tetrominoes
    pickRandomTetromino()
    {
        //Picking random tetromino
        let tetrominoIndex = Math.floor(Math.random() * this.tetrominoesArray.length);
        let tetromino = this.tetrominoesArray[tetrominoIndex];
        return tetromino;
    }

    clearNextScreen(nextScreen)
    {
        console.log(nextScreen);
        //clear the nextScreen divs
        nextScreen.forEach(screenDiv => {
            screenDiv.classList.remove(this.tetrominoColor);
        });
    }

    renderTheNextTetromino(nextScreen)
    {
        //and outputting the next piece on the sceen
        this.nextTetromino.nextPosition.forEach(boardIndex => {
            nextScreen[boardIndex].classList.add(this.nextTetromino.name);
        });
    }

    //Method that will generate a tetromino
    //that will have a random position and a random color
    generateTetromino(board, nextScreen)
    {
        
        //If its the first time pickRandomTetromino for current and 
        //next
        if(this.nextTetromino === undefined)
        {
            let currentTetromino = this.pickRandomTetromino();
            this.nextTetromino = this.pickRandomTetromino();
            //Tetromino color is the name of the class that has its color
            this.tetrominoColor = currentTetromino.name;

            //Picking tetromino spawn (array with position)
            let positionIndex = Math.floor(Math.random() * currentTetromino.spawnPositions.length);
            console.log(currentTetromino.spawnPositions[positionIndex]);
            this.tetrominoPosition = currentTetromino.spawnPositions[positionIndex].position.slice();
            this.tetrominoRotationIndex = currentTetromino.spawnPositions[positionIndex].tetrominoRotationIndex;

            //Setting each board element the class 'tetromino'
            this.tetrominoPosition.forEach(boardIndex => {
                board[boardIndex].classList.add(this.tetrominoColor, "tetromino");
            });

            console.log(nextScreen);
            this.clearNextScreen(nextScreen);
            
            this.renderTheNextTetromino(nextScreen);
        }
        else
        {
            let currentTetromino = this.nextTetromino;
            this.nextTetromino = this.pickRandomTetromino();
            //Tetromino color is the name of the class that has its color
            this.tetrominoColor = currentTetromino.name;

            //Picking tetromino spawn (array with position)
            let positionIndex = Math.floor(Math.random() * currentTetromino.spawnPositions.length);
            console.log(currentTetromino.spawnPositions[positionIndex]);
            this.tetrominoPosition = currentTetromino.spawnPositions[positionIndex].position.slice();
            this.tetrominoRotationIndex = currentTetromino.spawnPositions[positionIndex].tetrominoRotationIndex;

            console.log("Tetromino position:" + this.tetrominoPosition);

            //Setting each board element the class 'tetromino'
            this.tetrominoPosition.forEach(boardIndex => {
                board[boardIndex].classList.add(this.tetrominoColor, "tetromino");
            });

            

            this.clearNextScreen(nextScreen);

            this.renderTheNextTetromino(nextScreen);
        }
        

    }

    //This function moves tetromino by a passed 
    // parameter
    moveTetromino(direction, board) 
    {
        // Remove the tetromino class from the previous positions
        this.tetrominoPosition.forEach(index => {
            board[index].classList.remove(this.tetrominoColor, "tetromino");
        });
    
        // Update the tetromino positions
        for (let i = 0; i < this.tetrominoPosition.length; i++) {
            this.tetrominoPosition[i] += direction;
        }

        // Add the tetromino class back to the new positions
        this.tetrominoPosition.forEach(index => {
            board[index].classList.add(this.tetrominoColor, "tetromino");
        });

        //Display the shadow of tetromino
        this.displayTetrominoShadow(board);
    }

    //Moves each landed tetromino down 
    //when a line was cleared
    moveLandedTetrominosDown(board, boardWidth, rowsCleared) 
    {   
        console.log(this.landedTetrominoes);
        //loop that will iterate through each tetromino in
        //landed tetrominoes and filter out all of the
        //cleared tetrominoes and will delete tetromino objects
        //with no position

        for(let i = 0; i < this.landedTetrominoes.length; i++)
        {
            let oldPosition = this.landedTetrominoes[i].position.slice(); 
            let newPosition = this.landedTetrominoes[i].position.slice(); 
            //filter out their old cordinates that were cleared
            //using a loop for the rows cleared array
            for (let j = 0; j < rowsCleared.length; j++) 
            {
                //filter out the old position
                newPosition = this.landedTetrominoes[i].position.filter(index => {
                    const startRange = rowsCleared[j] * boardWidth;
                    const endRange = startRange + 9;
                
                    return !(index >= startRange && index <= endRange);
                });

                //After each iteration the new version of position will be set
                //to a new one
                this.landedTetrominoes[i].position = newPosition;

                //and saving the old position before filtering  
                //to remove old styling later
                this.landedTetrominoes[i].oldPosition = oldPosition;
            }

            //If the tetromino position is empty then delete if from the 
            //landed tetrominoes array
            if(this.landedTetrominoes[i].position.length === 0)
            {
                //Deletes the current tetromino if its position
                //only if the i is not a zero to not go into the 
                //negatives
                // is empty
                if(i !== 0)
                {
                    this.landedTetrominoes.splice(i, 1);
                    i--;
                }
                
            }

            //Remove old position styling 
            this.removeStyles(this.landedTetrominoes[i], "old", board);
            //Then add styling to the new one
            this.addStyles(this.landedTetrominoes[i], "new", board);

        }

        //This for loop will increment the tetrominoes position by 10
        //if they have nothing under them
        for(let i = 0; i < this.landedTetrominoes.length; i++)
        {
            let down = 10;
            //Inner function that will run for the amount of rows 
            // cleared that will move down the landed tetrominoes
            for (let j = 0; j < rowsCleared.length; j++) 
            {
                //if that tetromino is a I then run a check_I function on it
                if(this.landedTetrominoes[i].name === "I")
                {
                    if(!this.check_I(this.landedTetrominoes[i], board, 10))
                    {
                        //returns true if their is nothing in the way

                        //loop increments the this.landedTetrominoes[i] position
                        for (let index = 0; index < this.landedTetrominoes[i].position.length; index++) 
                        {
                            //Remove old position styling 
                            this.removeStyles(this.landedTetrominoes[i], "new", board);

                            this.landedTetrominoes[i].position[index] += down;
                            
                            //Then add styling to the new one
                            this.addStyles(this.landedTetrominoes[i], "new", board);
                        }
                    }
                }

                //if that tetromino is a O then run a check_O function on it
                if(this.landedTetrominoes[i].name === "O")
                {
                    if(!this.check_O(this.landedTetrominoes[i], board, 10))
                    {
                        //returns true if their is nothing in the way

                        //loop increments the this.landedTetrominoes[i] position
                        for (let index = 0; index < this.landedTetrominoes[i].position.length; index++) 
                        {
                            //Remove old position styling 
                            this.removeStyles(this.landedTetrominoes[i], "new", board);
                            
                            this.landedTetrominoes[i].position[index] += down;
                            
                            //Then add styling to the new one
                            this.addStyles(this.landedTetrominoes[i], "new", board);
                        }
                    }
                }

                //if that tetromino is a J then run a check_J function on it
                if(this.landedTetrominoes[i].name === "J")
                {
                    if(!this.check_J(this.landedTetrominoes[i], board, 10))
                    {
                        //returns true if their is nothing in the way

                        //loop increments the this.landedTetrominoes[i] position
                        for (let index = 0; index < this.landedTetrominoes[i].position.length; index++) 
                        {
                            //Remove old position styling 
                            this.removeStyles(this.landedTetrominoes[i], "new", board);
                            
                            this.landedTetrominoes[i].position[index] += down;

                            //Then add styling to the new one
                            this.addStyles(this.landedTetrominoes[i], "new", board);
                        }
                        
                    }
                }

                //if that tetromino is a L then run a check_L function on it
                if(this.landedTetrominoes[i].name === "L")
                {
                    if(!this.check_L(this.landedTetrominoes[i], board, 10))
                    {
                        //returns true if their is nothing in the way

                        //loop increments the this.landedTetrominoes[i] position
                        for (let index = 0; index < this.landedTetrominoes[i].position.length; index++) 
                        {
                            //Remove old position styling 
                            this.removeStyles(this.landedTetrominoes[i], "new", board);
                            
                            this.landedTetrominoes[i].position[index] += down;
                            
                            //Then add styling to the new one
                            this.addStyles(this.landedTetrominoes[i], "new", board);
                        }
                    }
                }

                //if that tetromino is a L then run a check_T function on it
                if(this.landedTetrominoes[i].name === "T")
                {
                    if(!this.check_T(this.landedTetrominoes[i], board, 10))
                    {
                        //returns true if their is nothing in the way

                        //loop increments the this.landedTetrominoes[i] position
                        for (let index = 0; index < this.landedTetrominoes[i].position.length; index++) 
                        {
                            //Remove old position styling 
                            this.removeStyles(this.landedTetrominoes[i], "new", board);
                            
                            this.landedTetrominoes[i].position[index] += down;
                        }
                        
                        //Then add styling to the new one
                        this.addStyles(this.landedTetrominoes[i], "new", board);
                    }
                }

                //if that tetromino is a S then run a check_S function on it
                if(this.landedTetrominoes[i].name === "S")
                {
                    if(!this.check_S(this.landedTetrominoes[i], board, 10))
                    {
                        //returns true if their is nothing in the way

                        //loop increments the this.landedTetrominoes[i] position
                        for (let index = 0; index < this.landedTetrominoes[i].position.length; index++) 
                        {
                            //Remove old position styling 
                            this.removeStyles(this.landedTetrominoes[i], "new", board);
                            
                            this.landedTetrominoes[i].position[index] += down;
                            
                            //Then add styling to the new one
                            this.addStyles(this.landedTetrominoes[i], "new", board);
                        }
                    }
                }

                //if that tetromino is a S then run a check_Z function on it
                if(this.landedTetrominoes[i].name === "Z")
                {
                    if(!this.check_Z(this.landedTetrominoes[i], board, 10))
                    {
                        //returns true if their is nothing in the way

                        //loop increments the this.landedTetrominoes[i] position
                        for (let index = 0; index < this.landedTetrominoes[i].position.length; index++) 
                        {
                            //Remove old position styling 
                            this.removeStyles(this.landedTetrominoes[i], "new", board);
                            
                            this.landedTetrominoes[i].position[index] += down;
                            
                            //Then add styling to the new one
                            this.addStyles(this.landedTetrominoes[i], "new", board);
                        }
                    }
                }
            }
            
        }
    }

    //removeStyles function will remove all styles of a tetrominoes
    //object's position
    //old for old position
    //new for newposition
    removeStyles(tetromino, setting, board) 
    {
        //check what position to remove first
        //if old is passed remove the old position
        if(setting === "old")
        {
            tetromino.oldPosition.forEach(index => {
                board[index].classList.remove(`${tetromino.name}`, `${tetromino.name}-shadow`, "tetromino");
            });
        }
        //if new is passed remove the position styles
        else if(setting === "new")
        {
            tetromino.position.forEach(index => {
                board[index].classList.remove(`${tetromino.name}`, `${tetromino.name}-shadow`, "tetromino");
            });
        }
    }
    //addStyles function will add necesery styles for tetrominoes
    //position
    addStyles(tetromino, setting, board)
    {
        if(setting === "old")
        {
            tetromino.oldPosition.forEach(index => {
                board[index].classList.add(tetromino.name, "tetromino");
            });
        }
        //if new is passed remove the position styles
        else if(setting === "new")
        {
            tetromino.position.forEach(index => {
                board[index].classList.add(tetromino.name, "tetromino");
            });
        }
    }
    //checkForLose is a method that will check if player has lost their game of tetris
    checkForLose(board)
    {
        //scan the first row for tetrominoes
        //if it has any return true (game over)
        //else false (game continues)
        let lost = false;

        for(let i = 0; i < 10; i++)
        {
            if(board[i].classList.contains("tetromino"))
            {
                //if tetromino is in the first row
                //instantly return the lost as true
                lost = true;
                return lost;
            }
        }
        //if not returns false for lost
        return lost;
    }
    
    //Rotates the tetromino
    rotate(board)
    {
        let rotated = false;
        let oldPosition = this.tetrominoPosition;
        let newPosition;
        //Check what tetromino it is 
        //and rotate it depending on what its
        //rotation index is

        //Check what piece we are dealing with
        //Vertical I

        //is tetromino horizontal, so it can be turned vertically ?
        if(this.tetrominoColor === "I" && this.tetrominoRotationIndex === 1 && !rotated)
        {   
            newPosition = [this.tetrominoPosition[2] - 20, this.tetrominoPosition[2] - 10, this.tetrominoPosition[2], this.tetrominoPosition[2] + 10];   
            
            if(this.rotationValid(newPosition, board))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 0;
            }
            else{
                console.log(`new position is not valid`);
            } 

        }
        //is tetromino vertical, so it can be turned horizontally ?
        else if(this.tetrominoColor === "I" && this.tetrominoRotationIndex === 0 && !rotated)
        {
            newPosition = [this.tetrominoPosition[2] - 2, this.tetrominoPosition[2] - 1, this.tetrominoPosition[2], this.tetrominoPosition[2] + 1]; 
            
            if(this.rotationValid(newPosition, board))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })

                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 1;
            }
            else{
                console.log(`new position is not valid`);
            } 

        }
        //J tetromino rotations
        else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 0 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] + 11, this.tetrominoPosition[1], this.tetrominoPosition[2] - 11, this.tetrominoPosition[3] - 20];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 1;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 1 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] + 9, this.tetrominoPosition[1], this.tetrominoPosition[2] - 9, this.tetrominoPosition[3] + 2];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old shadow styling from an old shadow position
                this.shadowPosition.forEach(index => {
                    board[index].classList.remove(`${this.tetrominoColor}-shadow`);
                })

                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })

                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 2;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 2 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] - 11, this.tetrominoPosition[1], this.tetrominoPosition[2] + 11, this.tetrominoPosition[3] + 20];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 3;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 3 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] - 9, this.tetrominoPosition[1], this.tetrominoPosition[2] + 9, this.tetrominoPosition[3] - 2];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 0;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        //L tetromino rotations
        else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 0 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] + 9, this.tetrominoPosition[1], this.tetrominoPosition[2] - 9, this.tetrominoPosition[3] - 20];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 1;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 1 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] + 11, this.tetrominoPosition[1], this.tetrominoPosition[2] - 11, this.tetrominoPosition[3] - 2];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 2;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 2 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] - 9, this.tetrominoPosition[1], this.tetrominoPosition[2] + 9, this.tetrominoPosition[3] + 20];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 3;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 3 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] - 11, this.tetrominoPosition[1], this.tetrominoPosition[2] + 11, this.tetrominoPosition[3] + 2];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 0;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        //T tetromino rotations
        else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 0 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] - 9, this.tetrominoPosition[1], this.tetrominoPosition[2] + 9, this.tetrominoPosition[3] + 11];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 1;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 1 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] + 11, this.tetrominoPosition[1], this.tetrominoPosition[2] - 11, this.tetrominoPosition[3] + 9];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 2;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 2 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] + 9, this.tetrominoPosition[1], this.tetrominoPosition[2] - 9, this.tetrominoPosition[3] - 11];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 3;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 3 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] - 11, this.tetrominoPosition[1], this.tetrominoPosition[2] + 11, this.tetrominoPosition[3] - 9];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 0;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        //S tetromino rotations
        else if(this.tetrominoColor === "S" && this.tetrominoRotationIndex === 0 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] - 11, this.tetrominoPosition[1], this.tetrominoPosition[2] - 9, this.tetrominoPosition[3] + 2];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 1;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        else if(this.tetrominoColor === "S" && this.tetrominoRotationIndex === 1 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] + 11, this.tetrominoPosition[1], this.tetrominoPosition[2] + 9, this.tetrominoPosition[3] - 2];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 0;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        //Z tetromino rotations
        else if(this.tetrominoColor === "Z" && this.tetrominoRotationIndex === 0 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] + 2, this.tetrominoPosition[1] + 11, this.tetrominoPosition[2], this.tetrominoPosition[3] + 9];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 1;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }
        else if(this.tetrominoColor === "Z" && this.tetrominoRotationIndex === 1 && !rotated)
        {
            newPosition = [this.tetrominoPosition[0] - 2, this.tetrominoPosition[1] - 11, this.tetrominoPosition[2], this.tetrominoPosition[3] - 9];   
            
            if(this.rotationValid(newPosition, board, oldPosition))
            {
                //Erase the old styling from an old position
                oldPosition.forEach(index => {
                    board[index].classList.remove(this.tetrominoColor, "tetromino");
                })
                
                //Assign a new position to the tetromino
                this.tetrominoPosition = newPosition;
                console.log("Confirmed new position " + this.tetrominoPosition);

                rotated = true;
                this.tetrominoRotationIndex = 0;
            }
            else{
                console.log(`new position is not valid`);
            } 
        }

        //Erase the old styling from an old position
        if(rotated)
        {
            newPosition.forEach(index => {
                board[index].classList.add(this.tetrominoColor, "tetromino");
            })
            console.log("Possible new position " + newPosition);
        }
        
    }
    
    /*
      collisionDetector will check if current tetromino
      is about to hit something or move out of a 
      border.

      If current tetromino pieces have something under them
      aka tetromino class, then return true (that collision is imminent).
      
      if the current tetromino is is about to exit the bounderies return true
      left or right
    */

    //check if the rotation is valid or not
    rotationValid(position, board, oldPosition = [1, 2, 3])
    {
        //true for a valid rotation
        //false for anything else

        //Rotation validation for vertical I to Horizontal
        if(this.tetrominoColor === "I" && this.tetrominoRotationIndex === 0)
        {
            //Check if this position is in bound of the row
            //left and right
            //Check for border row (left)

            //Index of the third central div
            let thirdIndex = position[2];

            //Right
            //if thirdIndex is on the last row
            //or thirdIndex +1 has a tetromino class
            if((thirdIndex - 9) % 10 === 0)
            {
                return false;
            }
            else if(board[thirdIndex + 1].classList.contains("tetromino"))
            {
                return false;
            }
            //Left Checks
            //If the third block is on the last or pre last
            //column then return false
            if(thirdIndex % 10 === 0 || (thirdIndex - 1) % 10 === 0)
            {
                return false;
            }
            else if(board[thirdIndex - 1].classList.contains("tetromino")
                || board[thirdIndex - 2].classList.contains("tetromino"))
            {
                return false;
            }
            else{
                return true;
            }

            
        }

        //Rotation validation for horizontal I to Vertical I
        if(this.tetrominoColor === "I" && this.tetrominoRotationIndex === 1)
        {
            //If 1, 2, 4 squares are occupied
            //then return false
            let firstIndex = position[0];
            let secondIndex = position[1];
            let fourthIndex = position[3];

            //Check if the fourth index has space to be rotated
            let vertFourthIndex = (fourthIndex - 1) + 10;
            
            if(board[firstIndex].classList.contains("tetromino")||
               board[secondIndex].classList.contains("tetromino")||
               board[fourthIndex].classList.contains("tetromino") ||
               board[vertFourthIndex].classList.contains("tetromino") ||
               vertFourthIndex > 199
               )
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        //Rotation verification for J tetromino
        if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 0)
        {
            //Check if the future tetrominoRotationIndex 0 is valid
            //Then check if the new position is in bounds and doesn't have 
            //tetrominoes in its way
            
            //old position variables
            //right check
            let oldCenter = oldPosition[1];

            //New position variables
            let first = position[0];
            let third = position[2];
            let fourth = position[3];
            let gapSpace = fourth - 10;

            //Check border before rotation (right) or (left)
            if((oldCenter - 9) % 10 === 0)
            {
                return false;
            }
            //Tetromino obstacles (checking all divs exept the pivot)
            else if(board[first].classList.contains("tetromino") ||
                    board[third].classList.contains("tetromino") ||
                    board[fourth].classList.contains("tetromino") ||
                    board[gapSpace].classList.contains("tetromino"))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 1)
        {
            let first = position[0];
            let third = position[2];
            let fourth = position[3];
            let gapSpace = first + 1;
            
            
            //Check for any tetrominoes that might be in the 
            //Boundaries are already checked by the collision detector
            if(board[first].classList.contains("tetromino") ||
               board[third].classList.contains("tetromino") ||
               board[fourth].classList.contains("tetromino") ||
               board[gapSpace].classList.contains("tetromino")
              )
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 2)
        {
            //Old position variables
            let centerPivot = oldPosition[1];
            //New position
            let first = position[0];
            let third = position[2];
            let fourth = position[3];
            let gapSpace = first - 10;

            //Check border before rotation (right) or (left)
            if(centerPivot % 10 === 0)
            {
                return false;
            }
            else if(board[first].classList.contains("tetromino") ||
               board[third].classList.contains("tetromino") ||
               board[fourth].classList.contains("tetromino") ||
               board[gapSpace].classList.contains("tetromino")
              )
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 3)
        {
            let first = position[0];
            let third = position[2];
            let fourth = position[3];
            let gapSpace = first - 1;
            
            if((first - 9) % 10 === 0)
            {
                return false;
            }
            else if(board[first].classList.contains("tetromino") ||
               board[third].classList.contains("tetromino") ||
               board[fourth].classList.contains("tetromino") ||
               board[gapSpace].classList.contains("tetromino")
              )
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        //Rotation verification for L tetromino
        if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 0)
        {
            //old position variables
            //right check
            let oldCenter = oldPosition[1];

            //Check border before rotation (right) or (left)
            if(oldCenter % 10 === 0)
            {
                return false;
            }

            let first = position[0];
            let third = position[2];
            let fourth = position[3];
            let gapSpace = first - 10;

            //Tetromino obstacles (checking all divs exept the pivot)
            if(board[first].classList.contains("tetromino") ||
                    board[third].classList.contains("tetromino") ||
                    board[fourth].classList.contains("tetromino") ||
                    board[gapSpace].classList.contains("tetromino"))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 1)
        {
            let first = position[0];
            let third = position[2];
            let fourth = position[3];
            let gapSpace = first + 10;

            //Tetromino obstacles (checking all divs exept the pivot)
            if(board[first].classList.contains("tetromino") ||
                    board[third].classList.contains("tetromino") ||
                    board[fourth].classList.contains("tetromino") ||
                    board[gapSpace].classList.contains("tetromino"))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 2)
        {
            //old position variables
            //right check
            let oldCenter = oldPosition[1];

            //Check border before rotation (right) or (left)
            if((oldCenter - 9) % 10 === 0)
            {
                return false;
            }

            let first = position[0];
            let third = position[2];
            let fourth = position[3];
            let gapSpace = first + 10;

            //Tetromino obstacles (checking all divs exept the pivot)
            if(board[first].classList.contains("tetromino") ||
                    board[third].classList.contains("tetromino") ||
                    board[fourth].classList.contains("tetromino") ||
                    board[gapSpace].classList.contains("tetromino"))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 3)
        {
            let first = position[0];
            let third = position[2];
            let fourth = position[3];
            let gapSpace = first - 10;

            //Tetromino obstacles (checking all divs exept the pivot)
            if(board[first].classList.contains("tetromino") ||
                    board[third].classList.contains("tetromino") ||
                    board[fourth].classList.contains("tetromino") ||
                    board[gapSpace].classList.contains("tetromino"))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        //Rotation verification for T tetromino
        if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 0)
        {
            let third = position[2];
            let gapSpace1 = position[0] - 1;
            let gapSpace2= position[0] + 1;
            let gapSpace3 = position[0] + 1;

            //Tetromino obstacles (checking all divs exept the pivot)
            if(board[third].classList.contains("tetromino") ||
                    board[gapSpace1].classList.contains("tetromino") ||
                    board[gapSpace2].classList.contains("tetromino") ||
                    board[gapSpace3].classList.contains("tetromino"))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 1)
        {
            let second = position[1];
            let third = position[2];
            let gapSpace1 = position[0] - 10;
            let gapSpace2= position[0] + 10;
            let gapSpace3 = position[3] - 1;

            if(second % 10 === 0)
            {
                return false;
            }
            else if(board[third].classList.contains("tetromino"))
            {
                return false;
            }
            else if(board[gapSpace1].classList.contains("tetromino") ||
                    board[gapSpace2].classList.contains("tetromino") ||
                    board[gapSpace3].classList.contains("tetromino"))
            {
                return false
            }
            else
            {
                return true;
            }
        }

        if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 2)
        {
            let third = position[2];
            let gapSpace1 = position[3] + 9;
            let gapSpace2= position[3] - 10;
            let gapSpace3 = position[0] + 1;

            //Tetromino obstacles (checking all divs exept the pivot)
            if(board[third].classList.contains("tetromino") ||
                board[gapSpace1].classList.contains("tetromino") ||
                board[gapSpace2].classList.contains("tetromino") ||
                board[gapSpace3].classList.contains("tetromino"))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 3)
        {
            let first = oldPosition[0];
            let third = position[2];
            let gapSpace1 = position[0] - 10;
            let gapSpace2= position[0] + 10;
            let gapSpace3 = position[3] - 1;

            if((first - 9) % 10 === 0)
            {
                return false;
            }
            //Tetromino obstacles (checking all divs exept the pivot)
            if(board[third].classList.contains("tetromino"))
            {
                return false;
            }
            else if(board[gapSpace1].classList.contains("tetromino"))
            {
                return false;
            }
            else if(board[gapSpace2].classList.contains("tetromino"))
            {
                return false;
            }
            else if(board[gapSpace3].classList.contains("tetromino"))
            {
                return false;
            }
            else
            {
                return true;
            }
              
        }

        //Rotation verification for S tetromino
        if(this.tetrominoColor === "S" && this.tetrominoRotationIndex === 0)
        {
            let aboveBlock = position[1] - 10;
            let fourth = position[3];
            let gapSpace1 = position[0] - 1;
            let gapSpace2= position[0] - 2;

            //Checks if there is space for rotation up top
            if(board[aboveBlock].classList.contains("tetromino") ||
               board[fourth].classList.contains("tetromino"))
            {
                return false;
            }
            //Tetromino obstacles (checking all divs exept the pivot)
            else if(board[gapSpace1].classList.contains("tetromino") ||
                    board[gapSpace2].classList.contains("tetromino"))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        if(this.tetrominoColor === "S" && this.tetrominoRotationIndex === 1)
        {
            let second = position[1];
            let third = position[2];
            let fourth = position[3];
            //let gapSpace1 = position[0] + 10;

            if(second % 10 === 0)
            {
                return false;
            }
            else if(board[third].classList.contains("tetromino"))
            {
                return false
            }
            else if(board[fourth].classList.contains("tetromino"))
            {
                return false
            }
            /* else if(board[gapSpace1].classList.contains("tetromino"))
            {
                return false
            } */
            else
            {
                return true;
            }
        }

        //Rotation verification for Z tetromino
        if(this.tetrominoColor === "Z" && this.tetrominoRotationIndex === 0)
        {
            let first = position[0];
            let fourth = position[3];
            let gapSpace1 = position[3] + 1;
            let gapSpace2= position[1] + 20;
            let upCheck = oldPosition[1] - 10;

            //Checks if there is space for rotation up top
            if(board[first].classList.contains("tetromino") ||
               board[fourth].classList.contains("tetromino"))
            {
                return false;
            }
            //Tetromino obstacles (checking all divs exept the pivot)
            else if(board[gapSpace1].classList.contains("tetromino") ||
                    board[gapSpace2].classList.contains("tetromino") ||
                    board[upCheck].classList.contains("tetromino"))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        if(this.tetrominoColor === "Z" && this.tetrominoRotationIndex === 1)
        {
            let first = position[0];
            let second = position[1];

            if(second % 10 === 0)
            {
                return false;
            }
            else if(board[first].classList.contains("tetromino"))
            {
                return false
            }
            else
            {
                return true;
            }
        }
    }

    collisionDetector(direction, board)
    {
        let collisionResult = "";
        //check what direction was passed

        //if down was passed
        if(direction === 10)
        {
            //if current tetromino has something underneath it 
            //return true
            //or is about to hit the border
            //if any tetromino divs have something underneeth them
            //stop immediately

            //different detection depending on the piece
            //do this if the piece is I is vertical
            if(this.tetrominoColor === "I")
            {
                //Function that checks if tetromino I has 
                //anything under it

                //first parameter is a current tetromino wrapped in an
                //object
                if(this.check_I({
                    position: this.tetrominoPosition,
                    tetrominoRotationIndex: this.tetrominoRotationIndex
                }, board, direction))
                {
                    collisionResult = "landed";
                }
                else{
                    collisionResult = "notlanded"
                }
            }  
            
            //Check O
            if(this.tetrominoColor === "O")
            {
                if(this.check_O({
                    position: this.tetrominoPosition
                }, board, direction))
                {
                    collisionResult = "landed";
                }
                else{
                    collisionResult = "notlanded"
                }
            }

            //Check J
            if(this.tetrominoColor === "J")
            {
                if(this.check_J({
                    position: this.tetrominoPosition,
                    tetrominoRotationIndex: this.tetrominoRotationIndex
                }, board, direction))
                {
                    collisionResult = "landed";
                }
                else{
                    collisionResult = "notlanded"
                }
            }

            //Check L
            if(this.tetrominoColor === "L")
            {
                if(this.check_L({
                    position: this.tetrominoPosition,
                    tetrominoRotationIndex: this.tetrominoRotationIndex
                }, board, direction))
                {
                    collisionResult = "landed";
                }
                else{
                    collisionResult = "notlanded"
                }
            }

            //Check T
            if(this.tetrominoColor === "T")
            {
                if(this.check_T({
                    position: this.tetrominoPosition,
                    tetrominoRotationIndex: this.tetrominoRotationIndex
                }, board, direction))
                {
                    collisionResult = "landed";
                }
                else{
                    collisionResult = "notlanded"
                }
            }

            //Check S
            if(this.tetrominoColor === "S")
            {
                if(this.check_S({
                    position: this.tetrominoPosition,
                    tetrominoRotationIndex: this.tetrominoRotationIndex
                }, board, direction))
                {
                    collisionResult = "landed";
                }
                else{
                    collisionResult = "notlanded"
                }
            }

            //Check Z
            if(this.tetrominoColor === "Z")
            {
                if(this.check_Z({
                    position: this.tetrominoPosition,
                    tetrominoRotationIndex: this.tetrominoRotationIndex
                }, board, direction))
                {
                    collisionResult = "landed";
                }
                else{
                    collisionResult = "notlanded"
                }
            }
        }

        //if left was passed
        //make collision personal fro each tetromino
        if(direction === -1)
        {
            //Vertical I (left)
            if(this.tetrominoColor === "I" && this.tetrominoRotationIndex === 0)
            {
                //Check for border row (left)
                if(this.tetrominoPosition.every(index => {

                    //Check for border by getting the remainder
                    if(index % 10 === 0)
                    {
                        return true;
                    }
                    else{
                        return false;
                    }
                }))
                {
                    collisionResult = "borderLeft";
                }
                //Separate if for checking for tetrominoes 
                //in the way
                else if(this.tetrominoPosition.some(index => {

                    //Checks if there is any tetrominoes in the way
                    if(board[index + direction].classList.contains("tetromino"))
                    {
                        return true
                    }
                    else{
                        return false;
                    }
                }))
                {
                    collisionResult = "borderLeft";
                }
                else{
                    collisionResult = "notlanded";
                }

                
            }
            //Horizontal I
            else if(this.tetrominoColor === "I" && this.tetrominoRotationIndex === 1)
            {
                //The most left div in the position
                let lastLeftIndex = this.tetrominoPosition[0];

                //Check if the left most piece is already at the border
                if(lastLeftIndex % 10 === 0)
                {
                    collisionResult = "borderLeft"; 
                }
                 //Checking for tetrominos in the way
                 else if(board[lastLeftIndex + direction].classList.contains("tetromino"))
                 {
                    collisionResult = "borderLeft"; 
                 }
                 else{
                     collisionResult = "notlanded";
                 }
            }

            //O tetromino check
            else if(this.tetrominoColor === "O")
            {
                //The most left div in the position
                let firstIndex = this.tetrominoPosition[0];
                let thirdIndex = this.tetrominoPosition[2];

                if(firstIndex % 10 === 0 && thirdIndex % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else{
                    collisionResult = "notlanded";
                }
            }

            //J tetromino check (with all its rotation varients) (left)
            else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 0)
            {
                //check one div that petrudes from the left side
                //and the other 2 that follow
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let leftBlock = this.tetrominoPosition[3];

                //If there is a tetromino in the way of that petruding block. Stop
                if(board[leftBlock + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                //Check the first tetrmino that goes after left petruding
                else if(board[first + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                //Check the second tetrmino that goes after left petruding
                else if(board[second + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                //if that left petruding block is on the left border. Stop
                else if(leftBlock % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 1)
            {
                let third = this.tetrominoPosition[2];
                let fourth = this.tetrominoPosition[3];

                //Check if both of these block have tetrominoes in the way
                if(board[third + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                //Check the first tetrmino that goes after left petruding
                else if(board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                //if that left petruding block is on the left border. Stop
                else if(third  % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(fourth % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 2)
            {
                //check 3 blocks that are facing left
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let third = this.tetrominoPosition[2];

                //First check all three if they have tetrominoes in their future location
                if(board[first + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else if(board[second + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else if(board[third + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else if(first % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(second % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(third % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 3)
            {
                //Check 2 block the first one and the last one 
                let first = this.tetrominoPosition[0];
                let last = this.tetrominoPosition[3];

                //Check both for tetrominoes in the future positions
                if(board[first + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else if(board[last + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else if(first % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(last % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }

            }

            //L tetromino check (with all its rotation varients) (left)
            else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 0)
            {
                //Check 3 indexes of they are at the border or ir there 
                //are any tetrminoes in the way
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let third = this.tetrominoPosition[2];

                //check if there at the left border
                if(first % 10 === 0 && second % 10 === 0 && third % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                //Check for tetrominoes
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 1)
            {
                //Check 2 indexes of they are at the border or ir there 
                //are any tetrminoes in the way
                let first = this.tetrominoPosition[0];
                let fourth = this.tetrominoPosition[3];

                //check if there at the left border
                if(first % 10 === 0 || board[first + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else if(board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 2)
            {
                //Check 3 indexes of they are at the border or ir there 
                //are any tetrminoes in the way
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let fourth = this.tetrominoPosition[3];

                //check if there at the left border
                if(fourth % 10 === 0 || board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 3)
            {
                //Check 3 indexes of they are at the border or ir there 
                //are any tetrminoes in the way
                let third = this.tetrominoPosition[2];
                let fourth = this.tetrominoPosition[3];

                //check if there at the left border
                if(third % 10 === 0 || fourth % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(board[third + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }

            //T tetromino check (with all its rotation varients) (left)
            else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 0)
            {
                //Check 3 indexes of they are at the border or ir there 
                //are any tetrminoes in the way
                let first = this.tetrominoPosition[0];
                let fourth = this.tetrominoPosition[3];

                //check if there at the left border
                if(first % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 1)
            {
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let third = this.tetrominoPosition[2];

                //check if there at the left border
                if(second % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 2)
            {
                let third = this.tetrominoPosition[2];
                let fourth = this.tetrominoPosition[3];

                //check if there at the left border
                if(third % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(board[third + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 3)
            {
                let first = this.tetrominoPosition[0];
                let third = this.tetrominoPosition[2];
                let fourth = this.tetrominoPosition[3];

                //check if there at the left border
                if(fourth % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }

            //S tetromino check (with all its rotation varients) (left)
            else if(this.tetrominoColor === "S" && this.tetrominoRotationIndex === 0)
            {
                //Check 3 indexes of they are at the border or ir there 
                //are any tetrminoes in the way
                let second = this.tetrominoPosition[1];
                let fourth = this.tetrominoPosition[3];

                //check if there at the left border
                if(fourth % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(board[second + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "S" && this.tetrominoRotationIndex === 1)
            {
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let fourth = this.tetrominoPosition[3];

                //check if there at the left border
                if(second % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }

            //Z tetromino check (with all its rotation varients) (left)
            else if(this.tetrominoColor === "Z" && this.tetrominoRotationIndex === 0)
            {
                //Check 3 indexes of they are at the border or ir there 
                //are any tetrminoes in the way
                let first = this.tetrominoPosition[0];
                let third = this.tetrominoPosition[2];

                //check if there at the left border
                if(first % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "Z" && this.tetrominoRotationIndex === 1)
            {
                let first = this.tetrominoPosition[0];
                let third = this.tetrominoPosition[2];
                let fourth = this.tetrominoPosition[3];

                //check if there at the left border
                if(third % 10 === 0)
                {
                    collisionResult = "borderLeft";
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderLeft";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
        }

        //if right was passed
        if(direction === 1)
        {
            //if current tetromino has something underneath it 
            //return true
            //or is about to hit the border
            
            //if the the tetromino is about to hit the left border
            // of the game board

            //if atleast one of the tetromino position will be in the last column 
            //return
            if(this.tetrominoColor === "I" && this.tetrominoRotationIndex === 0)
            {
                //check the border first (right)
                if(this.tetrominoPosition.every(index => {
                    
                    //Check the collision for the
                    //right border
                    if((index - 9) % 10 === 0)
                    {
                        return true;
                    }
                }))
                {
                    collisionResult = "borderRight";
                }
                else if(this.tetrominoPosition.some(index => {
                    //Check if there are any tetrominos in a way
                    if(board[index + direction].classList.contains("tetromino"))
                    {
                        return true;
                    }
                }))
                {
                    collisionResult = "borderRight";
                }
                else{
                    collisionResult = "notlanded";
                }
            }
            

            //Horizontal I (right)
            else if(this.tetrominoColor === "I" && this.tetrominoRotationIndex === 1)
            {
                //Since its Horizontal I it needs a different 
                //collision check

                let lastRightIndex = this.tetrominoPosition[3];

                //Last column check (right)
                if((lastRightIndex - 9) % 10 === 0)
                {
                    collisionResult = "borderRight"; 
                }
                else if(board[lastRightIndex + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else{
                    collisionResult = "notlanded";
                }
            }

            //O tetromino check
            else if(this.tetrominoColor === "O")
            {
                //The most left div in the position
                let secondIndex = this.tetrominoPosition[1];
                let fourthIndex = this.tetrominoPosition[3];

                if(((secondIndex - 9) % 10) === 0 && (fourthIndex - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                else{
                    collisionResult = "notlanded";
                }
            }

            //J tetromino check (with all its rotation varients) (right)
            else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 0)
            {
                //check first 3 blocks if they have tetrominoes to their right
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let third = this.tetrominoPosition[2];

                if(board[first + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else if(board[second + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else if(board[third + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else if((first - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                else if((second - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                else if((third - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }

            }
            else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 1)
            {
                //Check the first div and the last div
                let first = this.tetrominoPosition[0];
                let last = this.tetrominoPosition[3];

                if(board[first + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else if(board[last + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else if((first - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 2)
            {
                //1 right petruding tetromino needs a check and 2 others that follow
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let last = this.tetrominoPosition[3];

                if(board[first + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else if(board[second + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else if(board[last + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else if((last - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "J" && this.tetrominoRotationIndex === 3)
            {
                //Check the last 2 divs if they have anything in their way
                //or a border
                let third = this.tetrominoPosition[2];
                let fourth = this.tetrominoPosition[3];

                if(board[third + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else if(board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else if((third - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                else if((fourth - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }

            //L tetromino check (with all its rotation varients) (right)
            else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 0)
            {
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let fourth = this.tetrominoPosition[3];

                //Checks if the fourth index is at the last column before 
                //the border
                if((fourth - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 1)
            {
                let third = this.tetrominoPosition[2];
                let fourth = this.tetrominoPosition[3];

                //Checks if the fourth index is at the last column before 
                //the border
                if((third - 9) % 10 === 0 || (fourth - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[third + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 2)
            {
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let third = this.tetrominoPosition[2];

                //Checks if the fourth index is at the last column before 
                //the border
                if((first - 9) % 10 === 0 || (second - 9) % 10 === 0 || (third - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino") || 
                        board[third + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "L" && this.tetrominoRotationIndex === 3)
            {
                let first = this.tetrominoPosition[0];
                let fourth = this.tetrominoPosition[3];

                //Checks if the fourth index is at the last column before 
                //the border
                if((first - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[first + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else if(board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }

            //T tetromino check (with all its rotation varients) (right)
            else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 0)
            {
                let third = this.tetrominoPosition[2];
                let fourth = this.tetrominoPosition[3];

                //Checks if the fourth index is at the last column before 
                //the border
                if((third - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[third + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 1)
            {
                let first = this.tetrominoPosition[0];
                let third = this.tetrominoPosition[2];
                let fourth = this.tetrominoPosition[3];

                //Checks if the fourth index is at the last column before 
                //the border
                if((fourth - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 2)
            {
                let first = this.tetrominoPosition[0];
                let fourth = this.tetrominoPosition[3];

                //Checks if the fourth index is at the last column before 
                //the border
                if((first - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "T" && this.tetrominoRotationIndex === 3)
            {
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let third = this.tetrominoPosition[2];

                //Checks if the fourth index is at the last column before 
                //the border
                if((first - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }

            //S tetromino check (with all its rotation varients) (right)
            else if(this.tetrominoColor === "S" && this.tetrominoRotationIndex === 0)
            {
                let first = this.tetrominoPosition[0];
                let third = this.tetrominoPosition[2];

                //Checks if the fourth index is at the last column before 
                //the border
                if((first - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "S" && this.tetrominoRotationIndex === 1)
            {
                let first = this.tetrominoPosition[0];
                let third = this.tetrominoPosition[2];
                let fourth = this.tetrominoPosition[3];

                //Checks if the fourth index is at the last column before 
                //the border
                if((fourth - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }

            //Z tetromino check (with all its rotation varients) (right)
            else if(this.tetrominoColor === "Z" && this.tetrominoRotationIndex === 0)
            {
                let second = this.tetrominoPosition[1];
                let fourth = this.tetrominoPosition[3];

                //Checks if the fourth index is at the last column before 
                //the border
                if((fourth - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[second + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            else if(this.tetrominoColor === "Z" && this.tetrominoRotationIndex === 1)
            {
                let first = this.tetrominoPosition[0];
                let second = this.tetrominoPosition[1];
                let fourth = this.tetrominoPosition[3];

                //Checks if the fourth index is at the last column before 
                //the border
                if((first - 9) % 10 === 0)
                {
                    collisionResult = "borderRight";
                }
                //Check if any of them hit tetrominoes
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    collisionResult = "borderRight";
                }
                else
                {
                    collisionResult = "notlanded";
                }
            }
            
        };
        return collisionResult;
    }

    //ColisionDetector for a tetromino shadow
    collisionDetectorShadow(direction, board, shadowPosition)
    {
        let collisionResult = "";

        //check what direction was passed

        //Change the shadow position by incrementing its
        //position by 10 (down) so it starts below the actual tetromino

        //if the shadow position is a certain index
        //don't increment the position
        
        //Check what piece we are dealing with
        //Vertical I
        if(this.tetrominoColor === "I")
        {
            //if its a vertical I
            //then check if there is anything inder the shadow
            // if it is a border

            if(this.check_I({
                position: shadowPosition,
                tetrominoRotationIndex: this.tetrominoRotationIndex
            }, board, direction))
            {
                collisionResult = "landed";
            }
            else{
                collisionResult = "notlanded"
            }
        }

        if(this.tetrominoColor === "O")
        {
            if(this.check_O({
                position: shadowPosition,
                tetrominoRotationIndex: this.tetrominoRotationIndex
            }, board, direction))
            {
                collisionResult = "landed";
            }
            else{
                collisionResult = "notlanded"
            }
        }

        if(this.tetrominoColor === "J")
        {
            if(this.check_J({
                position: shadowPosition,
                tetrominoRotationIndex: this.tetrominoRotationIndex
            }, board, direction))
            {
                collisionResult = "landed";
            }
            else{
                collisionResult = "notlanded"
            }
        }

        if(this.tetrominoColor === "L")
        {
            if(this.check_L({
                position: shadowPosition,
                tetrominoRotationIndex: this.tetrominoRotationIndex
            }, board, direction))
            {
                collisionResult = "landed";
            }
            else{
                collisionResult = "notlanded"
            }
        }

        if(this.tetrominoColor === "T")
        {
            if(this.check_T({
                position: shadowPosition,
                tetrominoRotationIndex: this.tetrominoRotationIndex
            }, board, direction))
            {
                collisionResult = "landed";
            }
            else{
                collisionResult = "notlanded"
            }
        }

        if(this.tetrominoColor === "S")
        {
            if(this.check_S({
                position: shadowPosition,
                tetrominoRotationIndex: this.tetrominoRotationIndex
            }, board, direction))
            {
                collisionResult = "landed";
            }
            else{
                collisionResult = "notlanded"
            }
        }

        if(this.tetrominoColor === "Z")
        {
            if(this.check_Z({
                position: shadowPosition,
                tetrominoRotationIndex: this.tetrominoRotationIndex
            }, board, direction))
            {
                collisionResult = "landed";
            }
            else{
                collisionResult = "notlanded"
            }
        }

        return collisionResult;
    }

    registerLandedTetromino()
    {
        //When tetromino lands, push it to the 
        //landedTetrominoes array for tracking
        //it is also repackaged into an object 
        //because I need to track what teromino it was
        //so i can move it down later
        this.landedTetrominoes.push({
            position: this.tetrominoPosition,
            name: this.tetrominoColor,
            tetrominoRotationIndex: this.tetrominoRotationIndex
        });

       //console.log(this.landedTetrominoes);
    }

    //Displays current tetromino's shadow
    //or where the tetromino will fall
    //with the current direction
    displayTetrominoShadow(board) 
    {
        // Copy the tetromino position array
        // and use it for finding the shadow position
        this.shadowPosition = this.tetrominoPosition.slice();

        //Shadow is removed at the beggining of each 
        // Remove the shadow class from all board cells
        board.forEach(cell => {
            cell.classList.remove(`${this.tetrominoColor}-shadow`);
        });

        //Variable for the shadow to be displayed when it is collided with
        //Something
        let shadowLanded = false;
        // Move the shadow down until it collides with something or reaches the bottom
        for (let i = 0; i < 19; i++) 
        { // Limit to 19 rows (board height - 1)
            let down = 10;

            let collisionResult = this.collisionDetectorShadow(down, board, this.shadowPosition);

            if (collisionResult === "notlanded") 
            {
                console.log(collisionResult + " Shadow");
                // Check if all shadow positions are within the board boundaries
                if (this.shadowPosition.every(index => 
                    {return index + down < board.length}))
                {
                    for (let index = 0; index < this.shadowPosition.length; index++) 
                    {
                        this.shadowPosition[index] += down;
                    }
                } 
                else {
                    // Stop moving down if any shadow position goes out of bounds
                    break;
                }
            } else {
                // Break the loop if collision is detected
                shadowLanded = true;
                break;
            }
        }
        
        //if the final position of the shadow is found (create shadow)
        if (shadowLanded) {
            console.log(`Shadow landed for ${this.tetrominoColor}`);
            console.log("Shadow Position:", this.shadowPosition);
            // Apply the shadow class to the new shadow position
            this.shadowPosition.forEach(index => {
                board[index].classList.add(`${this.tetrominoColor}-shadow`);
            });
        }
        
    }

    //Check fof completed lines
    //returns an array of rows that need to be cleared
    findCompleteRows(board, boardHeight, boardWidth) 
    {
        let completedRows = [];
    
        // Iterate through each row
        for(let row = 0; row < boardHeight; row++) 
        {
            let rowComplete = true;
    
            // Iterate through the cells in the current row
            for(let item = row * boardWidth; item <= (row * boardWidth) + 9; item++) 
            {
                // Check if the cell doesn't have a tetromino class
                if (!board[item].classList.contains("tetromino")) {
                    rowComplete = false;
                    break; // Exit the loop if a cell is not complete
                }
            }
    
            // If the entire row is complete, push it to the completedRows array
            if(rowComplete) {
                completedRows.push(row);
            }
        }
    
        // Return the array of completed rows
        //alert("Number of rows cleared: " + completedRows.length);
        //console.log("Completed rows:" + completedRows);
        return completedRows;
    }
    
    //clearCompleteRows, clear the completed rows
    //from findCompletedRows method
    clearCompleteRows(board, boardWidth, completedRows)
    {
        //!Just remove the class for now, add animation later

        //This nested loop removes all classes from the completed
        //rows, so they turn black as div in a container
        completedRows.forEach(row => {

            for (let item = row * boardWidth; item <= (row * boardWidth) + 9; item++) 
            {
                //Removing all styling from the element
                board[item].classList = [];
            }
        });
        //Call moveLandedTetrominosDown
        this.moveLandedTetrominosDown(board, boardWidth, completedRows);
    }

    //Check functions for each tetromino
    //that have all theiur rotation varients
    //that check if they have space below them

    //Parameter is an array with tetrominoes position
    check_I(tetromino, board, direction)
    {
        //position is newPosition from the clearLandedTetrominoes
        let lastVertDiv = tetromino.position[(tetromino.position.length) - 1];
        let down = 10;
        // Vertical (0)
        if (tetromino.tetrominoRotationIndex === 0) 
        {
            if(tetromino.position.length === 3)
            {
                //check for the 2nd block missing
                let second = tetromino.position[0] + 10;

                //check for the third block which is after the
                //second if second is there
                let third = tetromino.position[1] + 10;

                //if the second block is not there
                if(!board[second].classList.contains("tetromino"))
                {
                    //change the position and return true
                    //the the position won't get incremented

                    //erase the old position
                    this.removeStyles(tetromino, "new", board);

                    //set a new position
                    tetromino.position[0] = second;

                    //add the styling back
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
                else if(!board[third].classList.contains("tetromino"))
                {
                    //erase the old position
                    this.removeStyles(tetromino, "new", board);

                    //set a new position
                    tetromino.position[0] += 10;
                    tetromino.position[1] = third;

                    //add the styling back
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
                //other tetromino checks

            }
            else if(tetromino.position.length === 2)
            {
                let second = tetromino.position[0] + 10;
                let third = tetromino.position[0] + 20;
                let fourth = tetromino.position[0] + 30;

                //separate variables for the logic (1st and 4th missing)
                let first = tetromino.position[0] - 10;
                //S at the end for Special
                let secondS = tetromino.position[1] + 10


                //console.log(`tetromino position: ${tetromino.position}`);

                //check if two middel cubes are missing
                if(!board[second].classList.contains("tetromino") &&
                   !board[third].classList.contains("tetromino"))
                {
                    //change the position and return true
                    //the the position won't get incremented

                    //erase the old position
                    this.removeStyles(tetromino, "new", board);

                    //set a new position
                    tetromino.position[0] = third;

                    //add the styling back
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
                //check if the second and fourth cubes are missing
                //only fourth because second is already present
                else if(board[fourth] !== undefined)
                {
                    if(!board[second].classList.contains("tetromino") &&
                        !board[fourth].classList.contains("tetromino"))
                    {
                        //change the position and return true
                        //the the position won't get incremented

                        //erase the old position
                        this.removeStyles(tetromino, "new", board);

                        //set a new position
                        tetromino.position[0] = third;
                        tetromino.position[1] = fourth;

                        //add the styling back
                        this.addStyles(tetromino, "new", board);

                        return true;
                    }
                }
                //check if the first and last cubes are missing 
                else if(board[first] === undefined && 
                   board[secondS] === undefined)
                {
                    if(!board[first].classList.contains("tetromino") ||
                       !board[secondS].classList.contains("tetromino"))
                        {
                            //change the position and return true
                            //the the position won't get incremented

                            //erase the old position
                            this.removeStyles(tetromino, "new", board);

                            //set a new position
                            tetromino.position[0] += 10;
                            tetromino.position[1] += 10;

                            //add the styling back
                            this.addStyles(tetromino, "new", board);

                            return true;
                        }
                }
                //check if the first cube is missing 
                else if(!board[second].classList.contains("tetromino"))
                {
                    //change the position and return true
                    //the the position won't get incremented

                    //erase the old position
                    this.removeStyles(tetromino, "new", board);

                    //set a new position
                    tetromino.position[0] = second;

                    //add the styling back
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
            }
            // Check if the next row is undefined or has the "tetromino" class
            if (
                board[lastVertDiv + down] === undefined ||
                board[lastVertDiv + down].classList.contains("tetromino")
            ) 
            {
                return true;
            } 
            else {
                return false;
            }
        }
        
        //Horizontal (1)
        if(tetromino.tetrominoRotationIndex === 1)
        {
            if(tetromino.position.some(index => {
                //Add 10 since this I is sideways i won't detect itself
                if(board[index + direction] === undefined)
                {
                    return true;
                }
                if(index >= 190 || board[index + direction].classList.contains("tetromino"))
                {
                    return true;
                }
            }))
            {
                return true;
            }
            else{
                return false;
            }  
        }
    }

    check_O(tetromino, board, direction)
    {
        //if current tetromino is has 3 or more positions
        if(tetromino.position.length === 4)
        {
            //Check the 3rd and 4th
            let thirdIndex = tetromino.position[2];
            let fourthIndex = tetromino.position[3];

            //Add 10 since this I is sideways i won't detect itself
            if(board[thirdIndex + direction] === undefined &&
            board[thirdIndex + direction] === undefined)
            {
                return true;
            }
            else if(thirdIndex >= 190 || board[thirdIndex + direction].classList.contains("tetromino"))
            {
                return true;
            } 
            else if(fourthIndex >= 190 || board[fourthIndex + direction].classList.contains("tetromino"))
            {
                return true;
            } 
            else{
                return false;
            }
        }
        //if less
        else{
            //Check the 1st and 2nd
            let firstIndex = tetromino.position[0];
            let secondIndex = tetromino.position[1];

            //Add 10 since this I is sideways i won't detect itself
            if(board[firstIndex + direction] === undefined &&
            board[firstIndex + direction] === undefined)
            {
                return true;
            }
            else if(firstIndex >= 190 || board[firstIndex + direction].classList.contains("tetromino"))
            {
                return true;
            } 
            else if(secondIndex >= 190 || board[secondIndex + direction].classList.contains("tetromino"))
            {
                return true;
            } 
            else{
                return false;
            }
        }
        
    }

    check_T(tetromino, board, direction)
    {
        //Check at all of the rotation indexes
        if(tetromino.tetrominoRotationIndex === 0)
        {
            if(tetromino.position.length === 4)
            {
                //Check the bottom 3 indexes if they have anything below them
                let one = tetromino.position[0];
                let two = tetromino.position[1];
                let three = tetromino.position[2];

                //then the second last one
                if(board[one + direction] === undefined)
                {
                    return true;
                }
                //Check the first one
                else if(board[one + direction].classList.contains("tetromino") ||
                board[two + direction].classList.contains("tetromino") ||
                board[three + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 1)
            {
                //Check the bottom 1 indexes if they have anything below them
                let three = tetromino.position[0];

                if(board[three + direction] === undefined)
                {
                    return true;
                }
                //Check the first one
                else if(board[three + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            
        }

        if(tetromino.tetrominoRotationIndex === 1)
        {
            if(tetromino.position.length === 4)
            {
                //Check the bottom 2 indexes if they have anything below them
                let three = tetromino.position[2];
                let four = tetromino.position[3];

                if(board[three + direction] === undefined ||
                    board[four + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                //Check the first one
                else if(board[three + direction].classList.contains("tetromino"))
                {
                    return true
                }
                //then the second last one
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 3)
            {
                //Check the bottom 2 indexes if they have anything below them
                let second = tetromino.position[1];
                let fourth = tetromino.position[3];

                if(board[second + direction] === undefined ||
                   board[fourth + direction] === undefined)
                {
                    return false;
                }
                //Check the first one
                else if(board[second + direction].classList.contains("tetromino") ||
                board[fourth + direction].classList.contains("tetromino"))
                {
                    return false;
                }
                //then the second last one
                else
                {
                    return true;
                }
            }
            else if(tetromino.position.length === 2)
            {
                //first and third cubes missing check (variables)
                let first = tetromino.position[0] - 10;
                let third = tetromino.position[0] + 10;

                //if 2nd and 4th cubes are missing (variables)
                let second = tetromino.position[1] - 10;
                let fourth = tetromino.position[1] - 9;

                //if 2nd and 4th cubes are missing
                //third that reperesent the missing 2nd cube (don't change) 
                if(!board[second].classList.contains("tetromino") &&
                   !board[fourth].classList.contains("tetromino"))
                {
                    //erase the old position
                    this.removeStyles(tetromino, "new", board);

                    //set a new position
                    tetromino.position[0] = third;

                    //add the styling back
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
                //first and third cubes missing check
                else if(!board[first].classList.contains("tetromino") &&
                        !board[third].classList.contains("tetromino"))
                {
                    //erase the old position
                    this.removeStyles(tetromino, "new", board);

                    //set a new position
                    tetromino.position[0] += 10;
                    tetromino.position[1] += 10;

                    //add the styling back
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
                //if its a vertical 2 block on top of each other
                else if((tetromino.position[1] - tetromino.position[0]) === 10)
                {
                    let lastBlock  = tetromino.position[1];
                    //check if the last one has anything below it
                    if(board[lastBlock + direction].classList.contains("tetromino") ||
                       board[lastBlock + direction] === undefined)
                    {
                        return true;
                    }
                }
                //if its a horizontal 2 block on each others side
                else
                {
                    let one  = tetromino.position[0];
                    let two  = tetromino.position[1];

                    //check if the last one has anything below it
                    if(board[one + direction].classList.contains("tetromino") ||
                       board[one + direction] === undefined)
                    {
                        return true;
                    }
                    else if(board[two + direction].classList.contains("tetromino") ||
                            board[two + direction] === undefined)
                    {
                        return true;
                    }
                }
            }
            else if(tetromino.position.length === 1)
            {
                //Check the bottom 1 indexes if they have anything below them
                let three = tetromino.position[0];

                if(board[three + direction] === undefined)
                {
                    return true;
                }
                //Check the first one
                else if(board[three + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            
        }

        if(tetromino.tetrominoRotationIndex === 2)
        {  
            if(tetromino.position.length === 4)
            {
                //Check the bottom 3 indexes if they have anything below them
                let one = tetromino.position[0];
                let three = tetromino.position[2];
                let four = tetromino.position[3];

                if(board[four + direction] === undefined)
                {
                    return true;
                }
                //Check the first one
                else if(board[one + direction].classList.contains("tetromino") ||
                board[three + direction].classList.contains("tetromino") ||
                board[four + direction].classList.contains("tetromino"))
                {
                    return true
                }
                //then the second last one
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 3)
            {
                let one = tetromino.position[0];
                let three = tetromino.position[2];

                if(board[one + direction] === undefined)
                {
                    return true;
                }
                //Check the first one
                else if(board[one + direction].classList.contains("tetromino") ||
                board[three + direction].classList.contains("tetromino"))
                {
                    return true
                }
                //then the second last one
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 1)
            {
                //Check the bottom 1 indexes if they have anything below them
                let three = tetromino.position[0];

                if(board[three + direction] === undefined)
                {
                    return true;
                }
                //Check the first one
                else if(board[three + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
        }

        if(tetromino.tetrominoRotationIndex === 3)
        {
            if(tetromino.position.length === 4)
            {
                //Check the bottom 2 indexes if they have anything below them
                let one = tetromino.position[0];
                let four = tetromino.position[3];

                if(board[one + direction] === undefined)
                {
                    return true;
                }
                //Check the first one
                else if(board[one + direction].classList.contains("tetromino") ||
                board[four + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 3)
            {
                //Check the bottom 2 indexes if they have anything below them
                let two = tetromino.position[0];
                let four = tetromino.position[2];

                if(board[two + direction] === undefined)
                {
                    return true;
                }
                //Check the first one
                else if(board[two + direction].classList.contains("tetromino") ||
                board[four + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 2)
            {
                //if 2nd and 4th cubes are missing (variables)
                let second = tetromino.position[0] - 10;
                let fourth = tetromino.position[0] - 9;

                //checking if 1st and third cubes are missing (variables)
                let first = tetromino.position[0] - 10;
                let third = tetromino.position[0] + 10;

                //if 2nd and 4th cubes are missing
                //third that reperesent the missing 2nd cube (don't change) 
                if(!board[second].classList.contains("tetromino") &&
                   !board[fourth].classList.contains("tetromino"))
                {
                    //erase the old position
                    this.removeStyles(tetromino, "new", board);

                    //set a new position
                    tetromino.position[1] += 10;

                    //add the styling back
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
                
                else if(!board[first].classList.contains("tetromino") &&
                        !board[third].classList.contains("tetromino"))
                {
                    //erase the old position
                    this.removeStyles(tetromino, "new", board);

                    //set a new position
                    tetromino.position[0] += 10;
                    tetromino.position[1] += 10;

                    //add the styling back
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
                //if its a vertical 2 block on top of each other
                else if((tetromino.position[0] - tetromino.position[1]) === 10)
                {
                    let lastBlock  = tetromino.position[1];
                    //check if the last one has anything below it
                    if(board[lastBlock + direction].classList.contains("tetromino") ||
                       board[lastBlock + direction] === undefined)
                    {
                        return true;
                    }
                }
                //if its a horizontal 2 block on each others side
                else
                {
                    let one  = tetromino.position[0];
                    let two  = tetromino.position[1];

                    //check if the last one has anything below it
                    if(board[one + direction].classList.contains("tetromino") ||
                       board[one + direction] === undefined)
                    {
                        return true;
                    }
                    else if(board[two + direction].classList.contains("tetromino") ||
                            board[two + direction] === undefined)
                    {
                        return true;
                    }
                }
            }
            else if(tetromino.position.length === 1)
            {
                //Check the bottom 1 indexes if they have anything below them
                let three = tetromino.position[0];

                if(board[three + direction] === undefined)
                {
                    return true;
                }
                //Check the first one
                else if(board[three + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            
        }
    }

    check_S(tetromino, board, direction)
    {
        if(tetromino.tetrominoRotationIndex === 0)
        {
            if(tetromino.position.length === 4)
            {
                //Check the bottom 3 indexes if they have anything below them
                let one = tetromino.position[0];
                let third = tetromino.position[2];
                let fourth = tetromino.position[3];

                //then the second last one
                if(board[fourth + direction] === undefined ||
                board[third + direction] === undefined)
                {
                    return true;
                }
                //Check the first one
                else if(board[one + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 2)
            {
                let first = tetromino.position[0];
                let second = tetromino.position[1];

                if(board[second + direction] === undefined)
                {
                    return true;
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
        }

        if(tetromino.tetrominoRotationIndex === 1)
        {
            if(tetromino.position.length === 4)
            {
                //Check the bottom 3 indexes if they have anything below them
                let second = tetromino.position[1];
                let fourth = tetromino.position[3];

                //then the second last one
                if(board[fourth + direction] === undefined)
                {
                    return true;
                }
                //Check the first one
                else if(board[second + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 3)
            {
                let second = tetromino.position[1];
                let third = tetromino.position[2];
                
                //Variable for checking if the top square is missing
                let first = tetromino.position[1] - 10;

                //Check if the top square is missing
                if(!board[first].classList.contains("tetromino"))
                {
                    //Same logic as a for length four
                    //Check the bottom 3 indexes if they have anything below them
                    let second = tetromino.position[1];
                    let fourth = tetromino.position[3];

                    //then the second last one
                    if(board[fourth + direction] === undefined)
                    {
                        return true;
                    }
                    //Check the first one
                    else if(board[second + direction].classList.contains("tetromino") ||
                            board[fourth + direction].classList.contains("tetromino"))
                    {
                        return true
                    }
                    else
                    {
                        return false;
                    }
                }

                if(board[second + direction] === undefined)
                {
                    return true;
                }
                else if(board[second + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 2)
            {
                //Variables for checking the 2nd and 3rd cube missing
                let second = tetromino.position[0] + 10;
                let third = tetromino.position[0] + 11;

                //Variables for checking the 1st and 4rth cubes missing
                let first = tetromino.position[0] - 10;
                let fourth = tetromino.position[0] + 10;

                //variables for normal 2 cubes falling check
                let one = tetromino.position[0];
                let two = tetromino.position[1];

                if(!board[second].classList.contains("tetromino") &&
                   !board[third].classList.contains("tetromino"))
                {
                    //Remove old position styling 
                    this.removeStyles(tetromino, "new", board);
                            
                    //move down the first block
                    tetromino.position[0] += 10;
                    
                    //Then add styling to the new one
                    this.addStyles(tetromino, "new", board);
                    

                    return true;
                }
                else if(!board[first].classList.contains("tetromino") &&
                        !board[fourth].classList.contains("tetromino"))
                {
                    //Remove old position styling 
                    this.removeStyles(tetromino, "new", board);
                            
                    //move down the first block
                    tetromino.position[0] += 10;
                    tetromino.position[1] += 10;
                    
                    //Then add styling to the new one
                    this.addStyles(tetromino, "new", board);
                    

                    return true;
                }
                //Check for both types of length 2's
                else{
                    //check the first cube if it landed or has something in the 
                    //way
                    if(board[one + direction].classList.contains("tetromino") ||
                       board[one + direction] === undefined)
                    {
                        return true;
                    }
                    //check the second on the same way
                    else if(board[two + direction].classList.contains("tetromino") ||
                            board[two + direction] === undefined)
                    {
                        return true;
                    }
                }
            }
            else if(tetromino.position.length === 1)
            {
                let first = tetromino.position[0];

                if(board[first + direction] === undefined)
                {
                    return true;
                }
                else if(board[first + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
        }
    }

    check_Z(tetromino, board, direction)
    {
        if (tetromino.tetrominoRotationIndex === 0)
        {
            if(tetromino.position.length === 4)
            {
                let first = tetromino.position[0];
                let third = tetromino.position[2];
                let fourth = tetromino.position[3];

                if(board[fourth + direction] === undefined)
                {
                    return true;
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 2)
            {
                let first = tetromino.position[0];
                let second = tetromino.position[1];


                if(board[first + direction] === undefined ||
                   board[second + direction] === undefined)
                {
                    return true;
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }   
        }
        
        if (tetromino.tetrominoRotationIndex === 1)
        {
            if(tetromino.position.length === 4)
            {
                let second = tetromino.position[1];
                let fourth = tetromino.position[3];

                if(board[fourth + direction] === undefined)
                {
                    return true;
                }
                else if(board[second + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 3)
            {
                let first = tetromino.position[1];
                let second = tetromino.position[2];

                if(board[first + direction] === undefined)
                {
                    return true;
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 2)
            {
                //2nd and 3rd cubes are missing check variables
                let second = tetromino.position[0] + 10;
                let third = tetromino.position[0] + 9;

                //1st and 4th cubes are missing check variables
                let first = tetromino.position[0] - 10;
                let fourth = tetromino.position[1] + 10;

                //General length 2 check vars
                let one = tetromino.position[0];
                let two = tetromino.position[1];

                if(board[second] === undefined  ||
                   board[third] === undefined)
                {
                    return true;
                }
                //2nd and 3rd cubes are missing check
                if(!board[second].classList.contains("tetromino") &&
                   !board[third].classList.contains("tetromino"))
                {
                    //Remove old position styling 
                    this.removeStyles(tetromino, "new", board);
                            
                    //move down the first block
                    tetromino.position[0] += 10;
                    
                    //Then add styling to the new one
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
                //1st and 4th cubes are missing check
                else if(!board[first].classList.contains("tetromino") &&
                        !board[fourth].classList.contains("tetromino"))
                {
                    //Remove old position styling 
                    this.removeStyles(tetromino, "new", board);
                            
                    //move down 2 blocks
                    tetromino.position[0] += 10;
                    tetromino.position[1] += 10;
                    
                    //Then add styling to the new one
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
                else 
                {
                    //length 2 check
                    if(board[one + direction].classList.contains("tetromino") || 
                       board[one + direction] === undefined)
                    {
                        return true;
                    }
                    else if(board[two + direction].classList.contains("tetromino") || 
                            board[two + direction] === undefined)
                    {
                        return true;
                    }
                }
            }
            else if(tetromino.position.length === 1)
            {
                let first = tetromino.position[0];

                if(board[first + direction] === undefined)
                {
                    return true;
                }
                else if(board[first + direction].classList.contains("tetromino"))
                {
                    return true
                }
                else
                {
                    return false;
                }
            }
        }
    }

    check_J(tetromino, board, direction)
    {
        //Check at all of the rotation indexes
        if(tetromino.tetrominoRotationIndex === 0)
        {
            //Check if the tetromino is fully intact
            if(tetromino.position.length === 4)
            {
                //Check the bottom 2 indexes if they have anything below them
                let lastOne = tetromino.position[2];
                let lastTwo = tetromino.position[3];

                //Check the first one
                if(board[lastOne + direction] === undefined ||
                board[lastOne + direction].classList.contains("tetromino"))
                {
                    return true
                }
                //then the second last one
                else if(board[lastTwo + direction] === undefined ||
                        board[lastTwo + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 3)
            {
                //vars for checking if the second cube is missing
                let first = tetromino.position[0] + 10;

                //checking if the second cube is missing
                if(!board[first].classList.contains("tetromino"))
                {
                    //Alter the position
                    //erase the old position
                    this.removeStyles(tetromino, "new", board);

                    //set a new position
                    tetromino.position[0] = first;

                    //add the styling back
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
                else
                {
                    //Check the bottom 2 indexes if they have anything below them
                    let lastOne = tetromino.position[1];
                    let lastTwo = tetromino.position[2];

                    //Check the first one
                    if(board[lastOne + direction] === undefined ||
                    board[lastOne + direction].classList.contains("tetromino"))
                    {
                        return true
                    }
                    //then the second last one
                    else if(board[lastTwo + direction] === undefined ||
                            board[lastTwo + direction].classList.contains("tetromino"))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            //if not check it differently
            else if(tetromino.position.length === 2)
            {
                //Check if the remaining 2 indexes if they have anything below them
                let one = tetromino.position[0];
                let two = tetromino.position[1];

                //check if 2 cubes are in a vertical position
                let three = tetromino.position[1] + 10;
                let four = tetromino.position[1] + 9;
                let lastDiv = tetromino.position[1];


                if(board[three] === undefined ||
                   board[four] === undefined)
                {
                    return true;
                }
                else if(!board[three].classList.contains("tetromino") &&
                        !board[four].classList.contains("tetromino"))
                {
                    //checking if something is under the last div

                    if(board[lastDiv + direction] === undefined ||
                       board[lastDiv + direction].classList.contains("tetromino"))
                    {
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                //Check the first one
                else if(board[one + direction] === undefined ||
                   board[one + direction].classList.contains("tetromino"))
                {
                    return true
                }
                //then the second one
                else if(board[two + direction] === undefined ||
                        board[two + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 1)
            {
                let one = tetromino.position[0];

                //check the remaining div of the J tetromino
                if(board[one + direction] === undefined ||
                   board[one + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            
        }

        if(tetromino.tetrominoRotationIndex === 1)
        {
            if(tetromino.position.length === 4 ||
               tetromino.position.length === 3)
            {
                //Check the bottom 3 divs if they have anything under it
                //those are the first 3 indexs
                let first = tetromino.position[0];
                let second = tetromino.position[1];
                let third = tetromino.position[2];

                //Check the first one
                if(board[first + direction] === undefined ||
                board[first + direction].classList.contains("tetromino"))
                {
                    return true
                }
                //then the second last one
                else if(board[second + direction] === undefined ||
                        board[second + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else if(board[third + direction] === undefined ||
                        board[third + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 1)
            {
                let third = tetromino.position[0];

                //check the remaining div of the J tetromino
                if(board[third + direction] === undefined ||
                   board[third + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            
        }

        if(tetromino.tetrominoRotationIndex === 2)
        {   
            if(tetromino.position.length === 4)
            {
                //Just need to check the first index of the div
                //and the last one too
                let first = tetromino.position[0];
                let last = tetromino.position[3];

                if(board[first + direction] === undefined ||
                   board[first + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else if(board[last + direction] === undefined ||
                        board[last + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 3)
            {
                //vars for checking if the second cube is missing
                let second = tetromino.position[0] - 10;

                //checking if the second cube is missing
                if(!board[second].classList.contains("tetromino"))
                {
                    //Remove old position styling 
                    this.removeStyles(tetromino, "new", board);
                            
                    //move down the first block
                    tetromino.position[1] += 10;
                    tetromino.position[2] += 10;
                    
                    //Then add styling to the new one
                    this.addStyles(tetromino, "new", board);

                    return true;
                }
            }
            else if(tetromino.position.length === 2)
            {
                //Just need to check the first index of the div
                //and the last one too
                let third = tetromino.position[2];
                let last = tetromino.position[3];

                //Checking for the third and fourth cube missing
                // fall needs to from the bottom most div (first)
                let three = tetromino.position[1] - 10;
                let four = tetromino.position[1] - 11;

                //Checking for the third and fourth cube missing
                if(!board[three].classList.contains("tetromino") && 
                   !board[four].classList.contains("tetromino"))
                {
                    let bottoCube = tetromino.position[0];

                    //Check if it can fall
                    if(board[bottoCube + direction].classList.contains("tetromino") ||
                       board[third + direction] === undefined)
                    {
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                else if(board[third + direction] === undefined ||
                   board[third + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else if(board[last + direction] === undefined ||
                        board[last + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 1)
            {
                return false;
            }
            
        }

        if(tetromino.tetrominoRotationIndex === 3)
        {
            if(tetromino.position.length === 4)
            {
                //Check the bottom 3 divs if they have anything under it
                //those are the first 3 indexs
                let first = tetromino.position[0];
                let second = tetromino.position[1];
                let last = tetromino.position[3];

                //Check the first one
                if(board[first + direction] === undefined ||
                    board[first + direction].classList.contains("tetromino"))
                    {
                        return true;
                    }
                //then the second last one
                else if(board[second + direction] === undefined ||
                        board[second + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else if(board[last + direction] === undefined ||
                        board[last + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 3)
            {
                //Check the bottom 3 divs if they have anything under it
                //those are the first 3 indexs
                let first = tetromino.position[0];
                let second = tetromino.position[1];
                let third = tetromino.position[2];

                //Check the first one
                if(board[first + direction] === undefined ||
                    board[first + direction].classList.contains("tetromino"))
                    {
                        return true
                    }
                //then the second last one
                else if(board[second + direction] === undefined ||
                        board[second + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else if(board[third + direction] === undefined ||
                        board[third + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 1)
            {
                let lastCube = tetromino.position[0];

                //if there is nothing underneath return true, other wise
                //false
                if(board[lastCube + direction] === undefined)
                {
                    return true;
                }
                else if(board[lastCube + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            
        }
    }

    check_L(tetromino, board, direction)
    {
        //Check at all of the rotation indexes
        if(tetromino.tetrominoRotationIndex === 0)
        {
            if(tetromino.position.length === 4)
            {
                //check the bottom 2 indexes for tetrominoes in the way
                let third = tetromino.position[2];
                let fourth = tetromino.position[3];

                if(board[third + direction] === undefined ||
                   board[fourth + direction] === undefined)
                {
                    return true;
                }
                else if(board[third + direction].classList.contains("tetromino") ||
                        board[fourth + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 2)
            {
                //Check the 2nd block 
                let second = tetromino.position[1];

                if(board[second + direction] === undefined)
                 {
                     return true;
                 }
                 else if(board[second + direction].classList.contains("tetromino"))
                 {
                     return true;
                 }
                 else
                 {
                     return false;
                 }
            }
            else if(tetromino.position.length === 1)
            {
                //Check the 1st block 
                let first = tetromino.position[0];

                if(board[first + direction] === undefined)
                 {
                     return true;
                 }
                 else if(board[first + direction].classList.contains("tetromino"))
                 {
                     return true;
                 }
                 else
                 {
                     return false;
                 }
            }
            
        }

        if(tetromino.tetrominoRotationIndex === 1)
        {
            if(tetromino.position.length === 4)
            {
                //check the bottom 3 indexes for tetrominoes in the way
                let first = tetromino.position[0];
                let second = tetromino.position[1];
                let third = tetromino.position[2];


                if(board[first + direction] === undefined ||
                    board[second + direction] === undefined ||
                    board[third + direction] === undefined)
                {
                    return true;
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                board[second + direction].classList.contains("tetromino") ||
                board[third + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 1)
            {
                //Check the 1st block 
                let fourth = tetromino.position[3];

                if(board[fourth + direction] === undefined)
                 {
                     return true;
                 }
                 else if(board[fourth + direction].classList.contains("tetromino"))
                 {
                     return true;
                 }
                 else
                 {
                     return false;
                 }
            }
            
        }

        if(tetromino.tetrominoRotationIndex === 2)
        {   
            if(tetromino.position.length === 4)
            {
                //check the bottom 2 indexes for tetrominoes in the way
                let first = tetromino.position[0];
                let fourth = tetromino.position[3];

                if(board[first + direction] === undefined)
                {
                    return true;
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                board[fourth + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 3)
            {
                //check the bottom 2 indexes for tetrominoes in the way
                let second = tetromino.position[1];
                let fourth = tetromino.position[2];


                if(board[fourth + direction].classList.contains("tetromino") ||
                   board[second + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else if(board[second + direction] === undefined)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 2)
            {
                let third = tetromino.position[2];
                let fourth = tetromino.position[3];


                if(board[third + direction].classList.contains("tetromino") ||
                   board[fourth + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else if(board[third + direction] === undefined ||
                        board[fourth + direction] === undefined)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            
        }

        if(tetromino.tetrominoRotationIndex === 3)
        {
            if(tetromino.position.length === 4)
            {
                //check the bottom 3 indexes for tetrominoes in the way
                let first = tetromino.position[0];
                let second = tetromino.position[1];
                let fourth = tetromino.position[3];

                if(board[fourth + direction] === undefined)
                {
                    return true;
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                board[second + direction].classList.contains("tetromino") ||
                board[fourth + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(tetromino.position.length === 3)
            {
                //check the bottom 3 indexes for tetrominoes in the way
                let first = tetromino.position[0];
                let second = tetromino.position[1];
                let third = tetromino.position[2];

                if(board[third + direction] === undefined)
                {
                    return true;
                }
                else if(board[first + direction].classList.contains("tetromino") ||
                        board[second + direction].classList.contains("tetromino") ||
                        board[third + direction].classList.contains("tetromino"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            
        }
    }
  }//END OF CLASS
