import { Game } from '../Scripts/game.js';

export class AI extends Game 
{
    //Constructor
    constructor()
    {
        super();

        this.tetrominoPlaced = false;
    }

    //Finds best placement for a tetromino
    //by using its shadow (this.shadowPosition)
    findBestPlacement(left, right, board)
    {
        //Check what tetromino it is a 
        //calculate the number
        //of rotations and movements to the right
        let movementsToRight;
        //numRotations represents the number
        //of rotations a piece has in general
        let numRotations;

        //an array of objects that represents
        //possible options for a tetromino to be placed
        let placementOptions = [];

        //This option will be used to return tetromino there 
        //before analyzing another rotation
        let vertical_I_starting_Position = [20, 30, 40, 50];

        //an option for placing a tetromino
        //at this location if it didn't pass
        //any checks
        let reserveOption;

        //Check if its a I tetromino
        if(this.tetrominoColor === "I")
        {
            //Setting the numRotations
            numRotations = 2;

            //Then check what rotation index is I
            if(this.tetrominoRotationIndex === 1)
            {
                movementsToRight = 7;
            }
        }
        else if(this.tetrominoColor === "O")
        {
            //Setting the numRotations
            numRotations = 1;
            movementsToRight = 8;
        }

        //For loop gather all possible positions
        //for the placement
        for(let rotation = 0; rotation < numRotations; rotation++)
        {
            //check if tetromino is placed or not
            if(!this.tetrominoPlaced)
            {
                //if not placed

                //During each rotation another loop will
                //check each tetromino shadow position
                //and if it passes a check it is included in the 
                for (let movement = 0; movement < movementsToRight; movement++) 
                {
                    //Have checks for each tetromino
                    if(this.tetrominoColor === "I")
                    {
                        //Have separate checks for each index
                        //of the tetromino
                        //Then check what rotation index is I
                        if(this.tetrominoRotationIndex === 1)
                        {
                            //register and move right when index of movement
                            //is not 6
                            if(movement !== 6)
                            {
                                //check if tetromino should rotate to vertical I

                                //At first check if the layers that it is checking are not undefined
                                if(!(board[this.shadowPosition[2] + 10] === undefined) &&
                                   !(board[this.shadowPosition[2] + 20] === undefined) &&
                                   !(board[this.shadowPosition[2] + 30] === undefined) &&
                                   !(board[this.shadowPosition[2] + 40] === undefined))
                                {
                                    //if these squares are defined, next it checks
                                    //if the squares have tetrominoes in them, all 4 rows
                                    //under index 2
                                    if(board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                       board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                       board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                       board[this.shadowPosition[2] + 10].classList.contains("tetromino"))
                                    {
                                        //if all the checks are met
                                        //then rotate the tetromino
                                        this.rotate(board);
                                        //move the tetromino back to the starting position
                                        this.placeTetromino(vertical_I_starting_Position, board, "move");

                                        //set the new amount of movementsToRight
                                        movementsToRight = 9;

                                        //Add 1 to rotation because it just used one rotation
                                        rotation++

                                        //Remove old varients from the previous rotation
                                        placementOptions = [];

                                        //then exit the inner loop
                                        this.moveTetromino(10, board)
                                        //break;
                                    }
                                }
                                //if its at the bottom already
                                else if(board[this.shadowPosition[0] + 10] === undefined)
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    //move to the right
                                    this.moveTetromino(right, board);
                                }
                                //Checks if the I horizontal has not empty spaces below it
                                else if(board[this.shadowPosition[0] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[1] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[3] + 10].classList.contains("tetromino"))
                                {
                                    //record this position as an option
                                    //by pushing it into the array as an object
                                    this.registerOption(placementOptions);

                                    //and then move the to the right
                                    this.moveTetromino(right, board)
                                }
                                else{
                                    //if no checks matched for a position
                                    //move the tetromino to the right
                                    this.moveTetromino(right, board)
                                }
                            }
                             //if its the final index just register the option
                            //and don't move the tetromino
                            else
                            {
                                this.registerOption(placementOptions);
                            }
                        }
                        //Check for vertical I
                        else
                        {
                            //register and move right when index of movement
                            //is not 6
                            if(movement !== 9)
                            {   
                                //check if there 4 tetrominoes stack back to back 
                                //on left or right
                                if((board[this.shadowPosition[0] + left].classList.contains("tetromino") &&
                                   board[this.shadowPosition[1] + left].classList.contains("tetromino") &&
                                   board[this.shadowPosition[2] + left].classList.contains("tetromino") &&
                                   board[this.shadowPosition[3] + left].classList.contains("tetromino"))
                                   ||
                                   (board[this.shadowPosition[0] + right].classList.contains("tetromino") &&
                                   board[this.shadowPosition[1] + right].classList.contains("tetromino") &&
                                   board[this.shadowPosition[2] + right].classList.contains("tetromino") &&
                                   board[this.shadowPosition[3] + right].classList.contains("tetromino")
                                   )
                                  )
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    //move to the right
                                    this.moveTetromino(right, board);
                                }
                                //check if there 3 tetrominoes stack back to back 
                                //on left or right
                                else if(
                                    (
                                   board[this.shadowPosition[1] + left].classList.contains("tetromino") &&
                                   board[this.shadowPosition[2] + left].classList.contains("tetromino") &&
                                   board[this.shadowPosition[3] + left].classList.contains("tetromino"))
                                   ||
                                   (
                                   board[this.shadowPosition[1] + right].classList.contains("tetromino") &&
                                   board[this.shadowPosition[2] + right].classList.contains("tetromino") &&
                                   board[this.shadowPosition[3] + right].classList.contains("tetromino")
                                   )
                                )
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    //move to the right
                                    this.moveTetromino(right, board);
                                }
                                //check if there 2 tetrominoes stack back to back 
                                //on left or right
                                else if(
                                    (
                                        board[this.shadowPosition[2] + left].classList.contains("tetromino") &&
                                        board[this.shadowPosition[3] + left].classList.contains("tetromino"))
                                        ||
                                        (
                                        board[this.shadowPosition[2] + right].classList.contains("tetromino") &&
                                        board[this.shadowPosition[3] + right].classList.contains("tetromino")
                                    )
                                )
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    //move to the right
                                    this.moveTetromino(right, board);
                                }
                                //check if there 1 tetrominoes stack back to back 
                                //on left or right
                                else if(
                                    (board[this.shadowPosition[3] + left].classList.contains("tetromino"))
                                        ||
                                    (board[this.shadowPosition[3] + right].classList.contains("tetromino"))
                                )
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    //move to the right
                                    this.moveTetromino(right, board);
                                }
                                //check if vertical I is either on the left or right border 
                                else if(this.shadowPosition[0] % 10 === 0 ||
                                        (this.shadowPosition[0] - 9) % 10 === 0)
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    //move to the right
                                    this.moveTetromino(right, board);
                                }
                                else{
                                    //Since its the last movement of the last rotation
                                    //save the current shadow position as a reserveOption
                                    reserveOption = this.shadowPosition.splice();
                                    //if no checks matched for a position
                                    //move the tetromino to the right
                                    this.moveTetromino(right, board)
                                }
                            }
                             //if its the final index just register the option
                            //and don't move the tetromino
                            else
                            {
                                this.registerOption(placementOptions);
                            }
                        }
                    }
                    else if(this.tetrominoColor === "O")
                    {
                        if(movement !== 8)
                        {
                            //if O has full suport of tetrominoes below it
                            //or is at the bottom already
                            if(
                                (board[this.shadowPosition[2] + 10].classList.contains("tetromino") && 
                                 board[this.shadowPosition[2] + 10].classList.contains("tetromino"))
                                ||
                                (this.shadowPosition[2] + 10) === undefined
                              )
                            {
                                //register option
                                this.registerOption(placementOptions);

                                //move to the right
                                this.moveTetromino(right, board);
                            }
                            else{
                                this.moveTetromino(right, board)
                            }
                        }
                        else
                        {
                            this.registerOption(placementOptions);
                        }
                    }
                }
            }
            // if placed
            else{
                //reset the tetrominoPaced boolean
                this.tetrominoPlaced = false;

                //and return
                return;
            }

            //After positions have been recorded
            //for the current rotation 
            //decide if there is any good positions for 
            //a tetromino
            if(placementOptions.length > 0)
            {
                /*if there are position options
                then choose and place the teromino there
                by first sorting option objects by the largest
                placement_Score and the largest one is picked and placed
                */
                placementOptions.sort((a, b)=> b.placement_Score - a.placement_Score);

                //After the array has been sorted
                //choose the first option (largest)
                //and use its .future_position to place 
                //our current tetromino there using
                //place placeTetromino
                let chosenOption = placementOptions[0];

                this.placeTetromino(chosenOption.future_position, board, "place");
            }
            //if no position has been yet good enogh
            //if the tetromino still has rotations left
            //rotate the tetromino
            //if its the last rotation
            //place the teromino in the reserve position
            else{
                this.placeTetromino(reserveOption, board, "place");
            }
        }
    }

    //function that places a the tetrominio into a selected option
    placeTetromino(future_position, board, setting)
    {
        
        //old position of your tetromino
        let oldPosition = this.tetrominoPosition.slice();

        //replace tetromino current position with a  
        //parameter one
        this.tetrominoPosition = future_position;

        //Removes styling
        this.removeStyling(oldPosition, board);

        //adds styling
        this.addStyling(board);

        if(setting === "place")
        {
            //Set the boolean value so the tetromino is placed
            this.tetrominoPlaced = true;
        }
        
    }

    //Function that will return the sum of the array
    arraySum(array)
    {
        let sum = 0;

        array.forEach(element => {
            sum += element;
        });

        return sum;
    }

    //Registers an option in options array
    registerOption(optionsArray)
    {
        let placementOption = 
        {
            future_position: this.shadowPosition.slice()
        };

        //Placement score is a 
        //sum of all the tetromino
        //shadow elements which will decide
        //which option will be picked
        placementOption.placement_Score = this.arraySum(placementOption.future_position);

        optionsArray.push(placementOption);
    }

    //Removes all styling from the 
    //current tetromino
    removeStyling(oldPosition, board)
    {
        //Remove the old position styling
        oldPosition.forEach(element => {
            board[element].classList = [];
        });
    }

    //Adds back all styling to the 
    //current tetromino
    addStyling(board)
    {
        //Add styling back to the new position
        this.tetrominoPosition.forEach(element => {
            board[element].classList.add(`${this.tetrominoColor}`, `tetromino`);
        });
    }
}
