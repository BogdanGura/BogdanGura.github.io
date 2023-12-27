import { Game } from '../Scripts/game.js';

export class AI extends Game 
{
    //Constructor
    constructor()
    {
        super();

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

    findBestPlacement()
    {

    }

    placeTetromino()
    {

    }
}
