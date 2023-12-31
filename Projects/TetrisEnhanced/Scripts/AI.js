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
        let starting_position_for_J = [11, 21, 31, 30];
        let starting_position_for_L = [11, 21, 31, 32];
        let starting_position_for_T = [10, 11, 12, 1];
        let starting_position_for_S = [10, 20, 21, 31];
        let starting_position_for_Z = [1, 11, 10, 20];

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
            movementsToRight = 9;
        }
        else if(this.tetrominoColor === "J")
        {
            //Setting the numRotations
            numRotations = 4;
            movementsToRight = 9;
        }
        else if(this.tetrominoColor === "L")
        {
            //Setting the numRotations
            numRotations = 4;
            movementsToRight = 9;
        }
        else if(this.tetrominoColor === "T")
        {
            //Setting the numRotations
            numRotations = 4;
            movementsToRight = 8;
        }
        else if(this.tetrominoColor === "S")
        {
            //Setting the numRotations
            numRotations = 2;
            movementsToRight = 9;
        }
        else if(this.tetrominoColor === "Z")
        {
            //Setting the numRotations
            numRotations = 2;
            movementsToRight = 9;
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
                                        movementsToRight = 11;

                                        //Add 1 to rotation because it just used one rotation
                                        rotation++

                                        //Remove old varients from the previous rotation
                                        placementOptions = [];

                                        //Check for collisions
                                        if(this.collisionDetector(10, board) === "landed")
                                        {
                                            console.log("LANDED");
                                        }
                                        else
                                        {
                                            this.moveTetromino(10, board)
                                        }
                                        //then exit the inner loop
                                        
                                        //break;
                                    }
                                    else{
                                        
                                        //Check for collisions
                                        if(this.collisionDetector(right, board) === "borderRight")
                                        {
                                            console.log("borderRight");
                                        }
                                        else
                                        {
                                            //if no checks matched for a position
                                            //move the tetromino to the right
                                            this.moveTetromino(right, board);
                                        }
                                    }
                                }
                                //if its at the bottom already
                                else if(board[this.shadowPosition[0] + 10] === undefined)
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
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

                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                             //if its the final index just register the option
                            //and don't move the tetromino
                            else
                            {                       
                                if(placementOptions.length === 0)
                                {
                                    //if all the checks are met
                                    //then rotate the tetromino
                                    this.rotate(board);
                                    //move the tetromino back to the starting position
                                    this.placeTetromino(vertical_I_starting_Position, board, "move");

                                    //set the new amount of movementsToRight
                                    movementsToRight = 11;

                                    //Add 1 to rotation because it just used one rotation
                                    rotation++

                                    //Remove old varients from the previous rotation
                                    placementOptions = [];

                                    //Check for collisions
                                    if(this.collisionDetector(10, board) === "landed")
                                    {
                                        console.log("LANDED");
                                    }
                                    else
                                    {
                                        this.moveTetromino(10, board)
                                    }
                                }

                                this.registerOption(placementOptions);
                            }
                        }
                        //Check for vertical I
                        else
                        {
                            //register and move right when index of movement
                            //is not 10
                            if(movement !== 11)
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

                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
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

                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
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

                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
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

                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                //check if vertical I is either on the left or right border 
                                else if(this.shadowPosition[0] % 10 === 0 ||
                                        (this.shadowPosition[0] - 9) % 10 === 0)
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    //Since its the last movement of the last rotation
                                    //save the current shadow position as a reserveOption
                                    reserveOption = this.shadowPosition.slice();

                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
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
                            if((board[this.shadowPosition[2] + 10]) === undefined)
                            {
                                //register option
                                this.registerOption(placementOptions);

                                //Check for collisions
                                if(this.collisionDetector(right, board) === "borderRight")
                                {
                                    console.log("borderRight");
                                }
                                else
                                {
                                    //if no checks matched for a position
                                    //move the tetromino to the right
                                    this.moveTetromino(right, board);
                                }
                            }
                            else if(
                                 board[this.shadowPosition[2] + 10].classList.contains("tetromino") && 
                                 board[this.shadowPosition[3] + 10].classList.contains("tetromino")
                              )
                            {
                                //register option
                                this.registerOption(placementOptions);

                                //Check for collisions
                                if(this.collisionDetector(right, board) === "borderRight")
                                {
                                    console.log("borderRight");
                                }
                                else
                                {
                                    //if no checks matched for a position
                                    //move the tetromino to the right
                                    this.moveTetromino(right, board);
                                }
                            }
                            else if(board[this.shadowPosition[2] + 10].classList.contains("tetromino") || 
                                    board[this.shadowPosition[3] + 10].classList.contains("tetromino")
                                  )
                            {
                                //register option
                                this.registerOption(placementOptions);

                                //Check for collisions
                                if(this.collisionDetector(right, board) === "borderRight")
                                {
                                    console.log("borderRight");
                                }
                                else
                                {
                                    //if no checks matched for a position
                                    //move the tetromino to the right
                                    this.moveTetromino(right, board);
                                }
                            }
                            else{
                                reserveOption = this.shadowPosition.slice();

                                //Check for collisions
                                if(this.collisionDetector(right, board) === "borderRight")
                                {
                                    console.log("borderRight");
                                }
                                else
                                {
                                    //if no checks matched for a position
                                    //move the tetromino to the right
                                    this.moveTetromino(right, board);
                                }
                            }
                        }
                        else
                        {
                            this.registerOption(placementOptions);
                        }
                    }
                    else if(this.tetrominoColor === "J")
                    {
                        if(this.tetrominoRotationIndex === 0)
                        {
                            if(movement !== 8)
                            {
                                //if there is tetromino support
                                //or nothing below
                                if(
                                    (board[this.shadowPosition[2] + 10] === undefined &&
                                     board[this.shadowPosition[3] + 10] === undefined
                                    )
                                    ||
                                    (board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[3] + 10].classList.contains("tetromino")
                                    )
                                  )
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                if(
                                    (board[this.shadowPosition[2] + 10] === undefined &&
                                     board[this.shadowPosition[3] + 10] === undefined
                                    )
                                    ||
                                    (board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[3] + 10].classList.contains("tetromino")
                                    )
                                  )
                                {
                                    this.registerOption(placementOptions);
                                }
                                
                                //Check if placement options is empty then 
                                //move tetromino back to the starting location
                                //and rotate it
                                if(placementOptions.length === 0)
                                {
                                    //move the tetromino back to the starting position
                                    this.placeTetromino(starting_position_for_J, board, "move");

                                    //Rotate it once
                                    this.rotate(board);

                                    //set the new amount of movementsToRight
                                    movementsToRight = 9;

                                    //reset movements
                                    movement = 0;

                                    //Add 1 to rotation because it just used one rotation
                                    rotation++

                                    //Remove old varients from the previous rotation
                                    placementOptions = [];

                                    //Check for collisions
                                    if(this.collisionDetector(10, board) === "landed")
                                    {
                                        console.log("LANDED");
                                    }
                                    else
                                    {
                                        this.moveTetromino(10, board)
                                    }
                                }
                            }
                        }
                        else if(this.tetrominoRotationIndex === 1)
                        {
                            if(movement !== 8)
                            {
                                if(
                                    (board[this.shadowPosition[2] + 10] === undefined &&
                                     board[this.shadowPosition[1] + 10] === undefined &&
                                     board[this.shadowPosition[0] + 10] === undefined
                                    )
                                    ||
                                    (board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[1] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[0] + 10].classList.contains("tetromino")
                                    )
                                  )
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    //Check for collisions
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                if(
                                    (board[this.shadowPosition[2] + 10] === undefined &&
                                     board[this.shadowPosition[1] + 10] === undefined &&
                                     board[this.shadowPosition[0] + 10] === undefined
                                    )
                                    ||
                                    (board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[1] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[0] + 10].classList.contains("tetromino")
                                    )
                                  )
                                  {
                                    this.registerOption(placementOptions);
                                  }
                                
                                //Check if placement options is empty then 
                                //move tetromino back to the starting location
                                //and rotate it
                                if(placementOptions.length === 0)
                                {
                                    //move the tetromino back to the starting position
                                    this.placeTetromino(starting_position_for_J, board, "move");

                                    //reset tetromino index
                                    this.tetrominoRotationIndex = 0;

                                    //Rotate it twice
                                    this.rotate(board);
                                    this.rotate(board);

                                    //Move tetromino to the left to align it properly
                                    if(this.collisionDetector(left, board) === "borderLeft")
                                    {
                                        console.log("borderLeft");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(left, board);
                                    }

                                    //set the new amount of movementsToRight
                                    movementsToRight = 10;

                                    //reset movements
                                    movement = 0;

                                    //Add 1 to rotation because it just used one rotation
                                    rotation++

                                    //Remove old varients from the previous rotation
                                    placementOptions = [];

                                    //Check for collisions
                                    if(this.collisionDetector(10, board) === "landed")
                                    {
                                        console.log("LANDED");
                                    }
                                    else
                                    {
                                        this.moveTetromino(10, board)
                                    }
                                }
                            }
                        }
                        else if(this.tetrominoRotationIndex === 2)
                        {
                            if(movement !== 9)
                            {
                                if(board[this.shadowPosition[3] + 10].classList.contains("tetromino") && 
                                   board[this.shadowPosition[3] + 20].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                if(board[this.shadowPosition[3] + 10].classList.contains("tetromino") && 
                                   board[this.shadowPosition[3] + 20].classList.contains("tetromino"))
                                  {
                                    this.registerOption(placementOptions);
                                  }
                                
                                //Check if placement options is empty then 
                                //move tetromino back to the starting location
                                //and rotate it
                                if(placementOptions.length === 0)
                                {
                                    //move the tetromino back to the starting position
                                    this.placeTetromino(starting_position_for_J, board, "move");

                                    //Rotate it twice
                                    this.rotate(board);
                                    this.rotate(board);
                                    this.rotate(board);

                                    //set the new amount of movementsToRight
                                    movementsToRight = 8;

                                    //reset movements
                                    movement = 0;

                                    //Add 1 to rotation because it just used one rotation
                                    rotation++

                                    //Remove old varients from the previous rotation
                                    placementOptions = [];

                                    //Check for collisions
                                    if(this.collisionDetector(10, board) === "landed")
                                    {
                                        console.log("LANDED");
                                    }
                                    else
                                    {
                                        this.moveTetromino(10, board)
                                    }
                                }
                            }
                        }
                        else if(this.tetrominoRotationIndex === 3)
                        {
                            if(movement !== 8)
                            {
                                if(board[this.shadowPosition[0] + 10].classList.contains("tetromino") &&
                                   board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                //save the reserve position
                                reserveOption = this.shadowPosition.slice();

                                if(board[this.shadowPosition[0] + 10].classList.contains("tetromino") &&
                                   board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                {
                                    this.registerOption(placementOptions);
                                }
                                
                            }
                        }
                    }
                    else if(this.tetrominoColor === "L")
                    {
                        if(this.tetrominoRotationIndex === 0)
                        {
                            if(movement !== 8)
                            {
                                //if there is tetromino support
                                //or nothing below
                                if(
                                    (board[this.shadowPosition[2] + 10] === undefined &&
                                     board[this.shadowPosition[3] + 10] === undefined
                                    )
                                    ||
                                    (board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[3] + 10].classList.contains("tetromino")
                                    )
                                  )
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                if(
                                    (board[this.shadowPosition[2] + 10] === undefined &&
                                     board[this.shadowPosition[3] + 10] === undefined
                                    )
                                    ||
                                    (board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[3] + 10].classList.contains("tetromino")
                                    )
                                  )
                                {
                                    this.registerOption(placementOptions);
                                }
                                
                                //Check if placement options is empty then 
                                //move tetromino back to the starting location
                                //and rotate it
                                if(placementOptions.length === 0)
                                {
                                    //move the tetromino back to the starting position
                                    this.placeTetromino(starting_position_for_L, board, "move");

                                    //Rotate it once
                                    this.rotate(board);

                                    //set the new amount of movementsToRight
                                    movementsToRight = 9;

                                    //reset movements
                                    movement = 0;

                                    //Add 1 to rotation because it just used one rotation
                                    rotation++

                                    //Remove old varients from the previous rotation
                                    placementOptions = [];

                                    //Check for collisions
                                    if(this.collisionDetector(10, board) === "landed")
                                    {
                                        console.log("LANDED");
                                    }
                                    else
                                    {
                                        this.moveTetromino(10, board)
                                    }
                                }
                            }
                        }
                        else if(this.tetrominoRotationIndex === 1)
                        {
                            if(movement !== 8)
                            {
                                if(
                                    (board[this.shadowPosition[2] + 10] === undefined &&
                                     board[this.shadowPosition[1] + 10] === undefined &&
                                     board[this.shadowPosition[0] + 10] === undefined
                                    )
                                    ||
                                    (board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[1] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[0] + 10].classList.contains("tetromino")
                                    )
                                  )
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                if(
                                    (board[this.shadowPosition[2] + 10] === undefined &&
                                     board[this.shadowPosition[1] + 10] === undefined &&
                                     board[this.shadowPosition[0] + 10] === undefined
                                    )
                                    ||
                                    (board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[1] + 10].classList.contains("tetromino") &&
                                     board[this.shadowPosition[0] + 10].classList.contains("tetromino")
                                    )
                                  )
                                  {
                                    this.registerOption(placementOptions);
                                  }
                                
                                //Check if placement options is empty then 
                                //move tetromino back to the starting location
                                //and rotate it
                                if(placementOptions.length === 0)
                                {
                                    //move the tetromino back to the starting position
                                    this.placeTetromino(starting_position_for_L, board, "move");

                                    //reset tetromino index
                                    this.tetrominoRotationIndex = 0;

                                    //Rotate it twice
                                    this.rotate(board);
                                    this.rotate(board);

                                    //Move tetromino to the left to align it properly
                                    //this.moveTetromino(left, board)

                                    //set the new amount of movementsToRight
                                    movementsToRight = 10;

                                    //reset movements
                                    movement = 0;

                                    //Add 1 to rotation because it just used one rotation
                                    rotation++

                                    //Remove old varients from the previous rotation
                                    placementOptions = [];

                                    //Check for collisions
                                    if(this.collisionDetector(10, board) === "landed")
                                    {
                                        console.log("LANDED");
                                    }
                                    else
                                    {
                                        this.moveTetromino(10, board)
                                    }
                                }
                            }
                        }
                        else if(this.tetrominoRotationIndex === 2)
                        {
                            if(movement !== 9)
                            {
                                if(board[this.shadowPosition[3] + 10].classList.contains("tetromino") && 
                                   board[this.shadowPosition[3] + 20].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                if(board[this.shadowPosition[3] + 10].classList.contains("tetromino") && 
                                   board[this.shadowPosition[3] + 20].classList.contains("tetromino"))
                                  {
                                    this.registerOption(placementOptions);
                                  }
                                
                                //Check if placement options is empty then 
                                //move tetromino back to the starting location
                                //and rotate it
                                if(placementOptions.length === 0)
                                {
                                    //move the tetromino back to the starting position
                                    this.placeTetromino(starting_position_for_L, board, "move");

                                    //reset tetromino index
                                    this.tetrominoRotationIndex = 0;
                                    
                                    //Rotate it twice
                                    this.rotate(board);
                                    this.rotate(board);
                                    this.rotate(board);

                                    //set the new amount of movementsToRight
                                    movementsToRight = 8;

                                    //reset movements
                                    movement = 0;

                                    //Add 1 to rotation because it just used one rotation
                                    rotation++

                                    //Remove old varients from the previous rotation
                                    placementOptions = [];

                                    //Check for collisions
                                    if(this.collisionDetector(10, board) === "landed")
                                    {
                                        console.log("LANDED");
                                    }
                                    else
                                    {
                                        this.moveTetromino(10, board)
                                    }
                                }
                            }
                        }
                        else if(this.tetrominoRotationIndex === 3)
                        {
                            if(movement !== 8)
                            {
                                if(board[this.shadowPosition[0] + 10].classList.contains("tetromino") &&
                                   board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                //save the reserve position
                                reserveOption = this.shadowPosition.slice();

                                if(board[this.shadowPosition[0] + 10].classList.contains("tetromino") &&
                                   board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                {
                                    this.registerOption(placementOptions);
                                }
                                
                            }
                        }
                    }
                    else if(this.tetrominoColor === "T")
                    {
                        if(this.tetrominoRotationIndex === 0)
                        {
                            if(movement !== 7)
                            {
                                //check if there is anything under T
                                //border or tetrominos
                                if(board[this.shadowPosition[0] + 10] === undefined &&
                                board[this.shadowPosition[1] + 10] === undefined &&
                                board[this.shadowPosition[2] + 10] === undefined)
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else if(board[this.shadowPosition[0] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[1] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[2] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                if(board[this.shadowPosition[0] + 10] === undefined &&
                                    board[this.shadowPosition[1] + 10] === undefined &&
                                    board[this.shadowPosition[2] + 10] === undefined)
                                {
                                    //register option
                                    this.registerOption(placementOptions);
                                }
                                else if(board[this.shadowPosition[0] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[1] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[2] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);
                                }

                                //Check if possible placements is 0
                                if(placementOptions.length === 0)
                                    {
                                        //move the tetromino back to the starting position
                                        this.placeTetromino(starting_position_for_T, board, "move");

                                        //Rotate it once
                                        this.rotate(board);

                                        //Move tetromino to the left to align it properly
                                        if(this.collisionDetector(left, board) === "borderLeft")
                                        {
                                            console.log("borderLeft");
                                        }
                                        else
                                        {
                                            //if no checks matched for a position
                                            //move the tetromino to the right
                                            this.moveTetromino(left, board);
                                        }

                                        //set the new amount of movementsToRight
                                        movementsToRight = 9;

                                        //reset movements
                                        movement = 0;

                                        //Add 1 to rotation because it just used one rotation
                                        rotation++

                                        //Remove old varients from the previous rotation
                                        placementOptions = [];

                                        //Check for collisions
                                        if(this.collisionDetector(10, board) === "landed")
                                        {
                                            console.log("LANDED");
                                        }
                                        else
                                        {
                                            this.moveTetromino(10, board)
                                        }
                                    } 
                            }
                        }
                        else if(this.tetrominoRotationIndex === 1)
                        {
                            if(movement !== 8)
                            {
                                if(board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                    (
                                    board[this.shadowPosition[2] + 10] === undefined ||
                                    board[this.shadowPosition[2] + 10].classList.contains("tetromino")
                                    )
                                  )
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                if(board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                (
                                 board[this.shadowPosition[2] + 10] === undefined ||
                                 board[this.shadowPosition[2] + 10].classList.contains("tetromino")
                                )
                               )
                                {
                                    //register option
                                    this.registerOption(placementOptions);
                                }

                                if(placementOptions.length === 0)
                                    {
                                        //move the tetromino back to the starting position
                                        this.placeTetromino(starting_position_for_T, board, "move");

                                        //reset the rotation index
                                        this.tetrominoRotationIndex = 0;

                                        //Rotate it twice
                                        this.rotate(board);
                                        this.rotate(board);

                                        //set the new amount of movementsToRight
                                        movementsToRight = 9;

                                        //reset movements
                                        movement = 0;

                                        //Add 1 to rotation because it just used one rotation
                                        rotation++

                                        //Remove old varients from the previous rotation
                                        placementOptions = [];

                                        //Check for collisions
                                        if(this.collisionDetector(10, board) === "landed")
                                        {
                                            console.log("LANDED");
                                        }
                                        else
                                        {
                                            this.moveTetromino(10, board)
                                        }
                                    }
                            }
                        }
                        else if(this.tetrominoRotationIndex === 2)
                        {
                            if(movement !== 8)
                            {
                                if(board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                   board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else
                            {
                                if(board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                   board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);
                                }
                                
                                if(placementOptions.length === 0)
                                    {
                                        //move the tetromino back to the starting position
                                        this.placeTetromino(starting_position_for_T, board, "move");

                                        //reset the rotation index
                                        this.tetrominoRotationIndex = 0;

                                        //Rotate it thrice
                                        this.rotate(board);
                                        this.rotate(board);
                                        this.rotate(board);

                                        //set the new amount of movementsToRight
                                        movementsToRight = 9;

                                        //reset movements
                                        movement = 0;

                                        //Add 1 to rotation because it just used one rotation
                                        rotation++

                                        //Remove old varients from the previous rotation
                                        placementOptions = [];

                                        //Check for collisions
                                        if(this.collisionDetector(10, board) === "landed")
                                        {
                                            console.log("LANDED");
                                        }
                                        else
                                        {
                                            this.moveTetromino(10, board)
                                        }
                                    }
                            }
                        }
                        else if(this.tetrominoRotationIndex === 3)
                        {
                            if(movement !== 8)
                            {
                                if(board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                (
                                 board[this.shadowPosition[0] + 10] === undefined ||
                                 board[this.shadowPosition[0] + 10].classList.contains("tetromino")
                                )
                               )
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                //save the reserve position
                                reserveOption = this.shadowPosition.slice();

                                if(board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                   (
                                    board[this.shadowPosition[0] + 10] === undefined ||
                                    board[this.shadowPosition[0] + 10].classList.contains("tetromino")
                                   )
                                  )
                                {
                                    //register option
                                    this.registerOption(placementOptions);
                                }
                            }
                        }
                        
                    }
                    else if(this.tetrominoColor === "S")
                    {
                        if(this.tetrominoRotationIndex === 0)
                        {
                            if(movement !== 8)
                            {
                                //at the bottom with no tetromino in between
                                if(board[this.shadowPosition[2] + 10] === undefined &&
                                   board[this.shadowPosition[3] + 10] === undefined &&
                                   !board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else if(board[this.shadowPosition[2] + 10] === undefined &&
                                        board[this.shadowPosition[3] + 10] === undefined &&
                                        board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else if(board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                            {
                                //register option
                                this.registerOption(placementOptions);

                                //move to the right
                                this.moveTetromino(right, board);
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                //save the reserve position
                                reserveOption = this.shadowPosition.slice();

                                if(board[this.shadowPosition[2] + 10] === undefined &&
                                    board[this.shadowPosition[3] + 10] === undefined &&
                                    !board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                 {
                                     //register option
                                     this.registerOption(placementOptions);
                                 }
                                 else if(board[this.shadowPosition[2] + 10] === undefined &&
                                         board[this.shadowPosition[3] + 10] === undefined &&
                                         board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                 {
                                     //register option
                                     this.registerOption(placementOptions);
                                 }
                                 else if(board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                         board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                         board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                 {
                                        //register option
                                        this.registerOption(placementOptions);
                                 }
                                 else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                 }
                            }
                        }
                        else if(this.tetrominoRotationIndex === 1)
                        {
                            if(movement !== 8)
                            {
                                if(board[this.shadowPosition[3] + 10] === undefined &&
                                  !board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                {
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else if(board[this.shadowPosition[3] + 10] === undefined &&
                                        board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else if(board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                if(board[this.shadowPosition[3] + 10] === undefined &&
                                    board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                 {
                                     //register option
                                     this.registerOption(placementOptions);
                                 }
                                 else if(!board[this.shadowPosition[3] + 10] === undefined &&
                                         board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                         board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                 {
                                     //register option
                                     this.registerOption(placementOptions);
                                 }

                                 if(placementOptions.length === 0)
                                    {
                                        //move the tetromino back to the starting position
                                        this.placeTetromino(starting_position_for_S, board, "move");

                                        //reset the rotation index
                                        this.tetrominoRotationIndex = 1;

                                        if(this.collisionDetector(right, board) === "borderRight")
                                        {
                                            console.log("borderRight");
                                        }
                                        else
                                        {
                                            //if no checks matched for a position
                                            //move the tetromino to the right
                                            this.moveTetromino(right, board);
                                        }

                                        //Rotate it once
                                        this.rotate(board);

                                        //set the new amount of movementsToRight
                                        movementsToRight = 9;

                                        //reset movements
                                        movement = 0;

                                        //Add 1 to rotation because it just used one rotation
                                        rotation++

                                        //Remove old varients from the previous rotation
                                        placementOptions = [];

                                        if(this.collisionDetector(10, board) === "landed")
                                        {
                                            console.log("LANDED");
                                        }
                                        else
                                        {
                                            this.moveTetromino(10, board)
                                        }
                                    }
                            }
                        }
                    }
                    else if(this.tetrominoColor === "Z")
                    {
                        if(this.tetrominoRotationIndex === 0)
                        {
                            if(movement !== 8)
                            {
                                //at the bottom with no tetromino in between
                                if(board[this.shadowPosition[2] + 10] === undefined &&
                                   board[this.shadowPosition[3] + 10] === undefined &&
                                   !board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else if(board[this.shadowPosition[2] + 10] === undefined &&
                                        board[this.shadowPosition[3] + 10] === undefined &&
                                        board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else if(board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                            {
                                //register option
                                this.registerOption(placementOptions);

                                if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                //save the reserve position
                                reserveOption = this.shadowPosition.slice();

                                if(board[this.shadowPosition[2] + 10] === undefined &&
                                    board[this.shadowPosition[3] + 10] === undefined &&
                                    !board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                 {
                                     //register option
                                     this.registerOption(placementOptions);
                                 }
                                 else if(board[this.shadowPosition[2] + 10] === undefined &&
                                         board[this.shadowPosition[3] + 10] === undefined &&
                                         board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                 {
                                     //register option
                                     this.registerOption(placementOptions);
                                 }
                                 else if(board[this.shadowPosition[2] + 10].classList.contains("tetromino") &&
                                         board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                         board[this.shadowPosition[0] + 10].classList.contains("tetromino"))
                                 {
                                        //register option
                                        this.registerOption(placementOptions);
                                 }
                            }
                        }
                        else if(this.tetrominoRotationIndex === 1)
                        {
                            if(movement !== 8)
                            {
                                if(board[this.shadowPosition[3] + 10] === undefined &&
                                  !board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                {
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else if(board[this.shadowPosition[3] + 10] === undefined &&
                                        board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else if(board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                        board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                {
                                    //register option
                                    this.registerOption(placementOptions);

                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                                else{
                                    if(this.collisionDetector(right, board) === "borderRight")
                                    {
                                        console.log("borderRight");
                                    }
                                    else
                                    {
                                        //if no checks matched for a position
                                        //move the tetromino to the right
                                        this.moveTetromino(right, board);
                                    }
                                }
                            }
                            else{
                                if(board[this.shadowPosition[3] + 10] === undefined &&
                                    board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                 {
                                     //register option
                                     this.registerOption(placementOptions);
                                 }
                                 else if(!board[this.shadowPosition[3] + 10] === undefined &&
                                         board[this.shadowPosition[3] + 10].classList.contains("tetromino") &&
                                         board[this.shadowPosition[1] + 10].classList.contains("tetromino"))
                                 {
                                     //register option
                                     this.registerOption(placementOptions);
                                 }

                                 if(placementOptions.length === 0)
                                    {
                                        //move the tetromino back to the starting position
                                        this.placeTetromino(starting_position_for_Z, board, "move");

                                        //reset the rotation index
                                        this.tetrominoRotationIndex = 1;

                                        if(this.collisionDetector(right, board) === "borderRight")
                                        {
                                            console.log("borderRight");
                                        }
                                        else
                                        {
                                            //if no checks matched for a position
                                            //move the tetromino to the right
                                            this.moveTetromino(right, board);
                                        }

                                        //Rotate it once
                                        this.rotate(board);

                                        //set the new amount of movementsToRight
                                        movementsToRight = 9;

                                        //reset movements
                                        movement = 0;

                                        //Add 1 to rotation because it just used one rotation
                                        rotation++

                                        //Remove old varients from the previous rotation
                                        placementOptions = [];

                                        if(this.collisionDetector(10, board) === "landed")
                                        {
                                            console.log("LANDED");
                                        }
                                        else
                                        {
                                            this.moveTetromino(10, board)
                                        }
                                    }
                            }
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

        //Move the tetromino position up 2 times
        //this.moveTetromino(-10, board)
        //this.moveTetromino(-10, board)

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

        console.log(board);

        //removes all shadows
        this.removeShadows(board);
        
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

    //Removes all shadows from the board
    removeShadows(board) 
    {
        // Remove the old position styling
        for (let i = 0; i < board.length; i++) 
        {
            board[i].classList.remove(`${this.tetrominoColor}-shadow`);
        }
    }
    
}
