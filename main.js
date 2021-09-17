const readline = require('readline');
const RL = readline.createInterface(process.stdin, process.stdout);
const { Matrix } = require('./Matrix');
const { PossiblePositions } = require('./PossiblePositions');
const { PrintResult } = require('./PrintPositions');
const { Validation } = require('./Validation');

let MATRIX;
let NO_OF_ROWS = 8;
let NO_OF_COLS = 8;

class Main {
    constructor(userInput) {
        this.matrix = MATRIX;
        this.noOfRows = NO_OF_ROWS;
        this.noOfCols = NO_OF_COLS;
        this.userInput = userInput;
    }
    
    // Main Method
    async main () {
        const matrixObj = new Matrix(this.noOfRows, this.noOfCols);
        this.matrix = await matrixObj.prepareMatrix();
        const validationObj = new Validation(this.userInput, this.noOfRows, this.noOfCols, this.matrix);
        const userInputObj = await validationObj.checkIfValidInput();
        if (userInputObj.valid) {
            const { piece } = userInputObj;
            const { position } = userInputObj;
            const possiblePositionsObj = new PossiblePositions(this.noOfRows, piece, position, this.matrix);
            let availablePositions = await possiblePositionsObj.getAllPossiblePositions();
            availablePositions = availablePositions.length === 0 ? 'No Positions Available' : availablePositions;
            const printPositionsObj = new PrintResult(availablePositions);
            printPositionsObj.printResultToConsole();
            RL.close();
            return availablePositions;
        } else {
            const printPositionsObj = new PrintResult(userInputObj.msg);
            printPositionsObj.printResultToConsole();
            RL.close();
            return userInputObj.msg;
        }
    };
}


// Accepting input from user
RL.question('Enter the chess piece (Pawn/King/Queen) and its position : ', async (userInput) => {
    const mainObj = new Main(userInput);
    await mainObj.main();
});


module.exports = {
    Main
}