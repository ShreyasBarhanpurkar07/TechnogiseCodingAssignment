const readline = require('readline');
const RL = readline.createInterface(process.stdin, process.stdout);
const { Matrix } = require('./Matrix');
const { PossiblePositions } = require('./PossiblePositions');
const { PrintResult } = require('./PrintPositions');

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
    

    // Method to check if the value received from user is valid
    async checkIfValidInput () {
        let validFlag = true;
        let validationMsg = '';
        
        let input = this.userInput.split(',');
        if (input.length > 1 && input[0].trim().toLowerCase() !== 'king' && input[0].trim().toLowerCase() !== 'queen' && input[0].trim().toLowerCase() !== 'pawn') {
            validationMsg = 'Invalid Piece';
            validFlag = false;
        }

        let validPositionFlag = false;
        for(let row = 0; row < this.noOfRows; row += 1) {
            for (let col = 0; col < this.noOfCols; col += 1) {
                if(input.length > 1 && this.matrix[row][col] === input[1].trim().toUpperCase()) {
                    validPositionFlag = true;
                    break;
                }
            }
            if (validPositionFlag) {
                break;
            }
        }
        if (!validPositionFlag) {
            if(validationMsg === '' && input.length > 1) {
                validationMsg = 'Invalid Position';
            } else if (input.length > 1) {
                validationMsg = validationMsg + ' and Position'
            }        
            validFlag = false;
        }

        if(validFlag) {
            return {
                valid: true,
                piece: input[0].trim().toLowerCase(),
                position: input[1].trim().toUpperCase()
            };
        } 
    
        return {
            valid: false,
            msg: validationMsg === '' ? 'Please give input in proper format : <piece>, <position>' : validationMsg
        };
    };

    

    // Main Method
    async main () {
        const matrixObj = new Matrix(this.noOfRows, this.noOfCols);
        this.matrix = await matrixObj.prepareMatrix();
        const userInputObj = await this.checkIfValidInput();
        if (userInputObj.valid) {
            const { piece } = userInputObj;
            const { position } = userInputObj;
            const possiblePositionsObj = new PossiblePositions(this.noOfRows, piece, position, this.matrix);
            let availablePositions = await possiblePositionsObj.getPossiblePositions();
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