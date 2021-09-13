const { exit } = require('process');
const readline = require('readline');

const RL = readline.createInterface(process.stdin, process.stdout);

let matrix;
let noOfRows = 8;
let noOfCols = 8;

// Method to create a matrix based on no. of rows and columns
const prepareMatrix = async (noOfRows, noOfCols) => {
    matrix = new Array(noOfRows);

    for (let row = 0; row < noOfRows; row += 1) {
        matrix[row] = new Array(8);
    }

    for(let row = 0; row < noOfRows; row += 1) {
        let charCodeStart = 65;
        for (let col = 0; col < noOfCols; col += 1) {
            matrix[row][col] = String.fromCharCode(charCodeStart++) + '' + parseInt(noOfCols - row);
        }
    }
    return matrix;
};

// Method to check if the value received from user is valid
const checkIfValidInput = async (userInput, noOfRows, noOfCols, matrix) => {
    let validFlag = true;
    let validationMsg = '';
    
    let input = userInput.split(',');
    if (input.length > 1 && input[0].trim().toLowerCase() !== 'king' && input[0].trim().toLowerCase() !== 'queen' && input[0].trim().toLowerCase() !== 'pawn') {
        validationMsg = 'Invalid Piece';
        validFlag = false;
    }

    let validPositionFlag = false;
    for(let row = 0; row < noOfRows; row += 1) {
        for (let col = 0; col < noOfCols; col += 1) {
            if(input.length > 1 && matrix[row][col] === input[1].trim().toUpperCase()) {
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
    validationMsg = validationMsg === '' ? 'Please give input in proper format : <piece>, <position>' : validationMsg;
    console.log('Error: ', validationMsg)
    return {
        valid: false,
        msg: validationMsg
    };
};

// Method used for getting one step forward position, mainly used for pawn movement
const getVeticalPositionsOneStepForwardOnly = (currentPosition) => {
    let availablePosition = [];
    let row = parseInt(noOfRows - parseInt(currentPosition.split('')[1]));
    const currentIndex = matrix[row].indexOf(currentPosition);
    if (row !== 0) {
        row -= 1;
        availablePosition.push(matrix[row][currentIndex])
        return availablePosition;
    }
    return [];
};

// Method used for getting the vertical(forward as well as backward) avaliable positions 
const getAllVerticalPositions = (noOfMoves, currentPosition) => {
    let availablePosition = [];
    let row = parseInt(noOfRows - parseInt(currentPosition.split('')[1]));
    let maxMoves = noOfMoves;
    const currentIndex = matrix[row].indexOf(currentPosition);
    if (row !== 0) {
        while (row !== 0 && maxMoves != 0) {
            row -= 1;
            availablePosition.push(matrix[row][currentIndex]);
            maxMoves -= 1;
        }
    }

    row = parseInt(noOfRows - parseInt(currentPosition.split('')[1]));
    if(row !== noOfRows - 1) {
        maxMoves = noOfMoves;
        while (row !== noOfRows - 1 && maxMoves != 0) {
            row += 1;
            availablePosition.push(matrix[row][currentIndex]);
            maxMoves -= 1;
        }
    }
    return availablePosition;
};

// Method used for getting the horizontal(left as well as right) avaliable positions 
const getAllHorizontalPositions = (noOfMoves, currentPosition) => {
    let availablePosition = [];
    const row = parseInt(noOfRows - parseInt(currentPosition.split('')[1]));
    let maxMoves = noOfMoves;
    let currentIndex = matrix[row].indexOf(currentPosition);
    if (currentIndex !== 0) {
        while (currentIndex !== 0 && maxMoves != 0) {
            currentIndex -= 1;
            availablePosition.push(matrix[row][currentIndex]);
            maxMoves -= 1;
        }
    }

    currentIndex = matrix[row].indexOf(currentPosition);
    if(currentIndex !== noOfRows - 1) {
        maxMoves = noOfMoves;
        while (currentIndex !== noOfRows - 1 && maxMoves != 0) {
            currentIndex += 1;
            availablePosition.push(matrix[row][currentIndex]);
            maxMoves -= 1;
        }
    }
    return availablePosition;
};

// Method used to get left diagonal(top and bottom) available positions
const getLeftDiagonalPositions = (row, col, noOfMoves) => {
    let availablePosition = [];
    if (col !== 0) {
        let tempRow = row;
        let tempCol = col;
        let maxMoves = noOfMoves;
        if (tempRow !== 0) {
            while (tempRow !== 0 && tempCol !== 0 && maxMoves !== 0) {
                availablePosition.push(matrix[--tempRow][--tempCol]);
                maxMoves -= 1;
            }
        }

        tempRow = row;
        tempCol = col;
        maxMoves = noOfMoves;

        if (tempRow !== noOfRows - 1) {
            while (tempRow !== noOfRows - 1 && tempCol !== 0 && maxMoves !== 0) {
                availablePosition.push(matrix[++tempRow][--tempCol]);
                maxMoves -= 1;
            }
        }
    }
    
    return availablePosition;
};

// Method used to get right diagonal(top and bottom) available positions
const getRightDiagonalPositions = (row, col, noOfMoves) => {
    let availablePosition = [];
    if (col !== noOfRows - 1) {
        let tempRow = row;
        let tempCol = col;
        let maxMoves = noOfMoves;
        if (tempRow !== 0) {
            while (tempRow !== 0 && tempCol !== noOfRows - 1 && maxMoves !== 0) {
                availablePosition.push(matrix[--tempRow][++tempCol]);
                maxMoves -= 1;
            }
        }

        tempRow = row;
        tempCol = col;
        maxMoves = noOfMoves;

        if (tempRow !== noOfRows - 1 ) {
            while (tempRow !== noOfRows - 1 && tempCol !== noOfRows - 1 && maxMoves !== 0) {
                availablePosition.push(matrix[++tempRow][++tempCol]);
                maxMoves -= 1;
            }
        }
    }
    return availablePosition;
};

// Method used to get the diagonal(both left and right) available positions
const getAllDiagonalPositions = (noOfMoves, currentPosition) => {
    let availablePosition = [];
    const row = parseInt(noOfRows - parseInt(currentPosition.split('')[1]));
    const maxMoves = noOfMoves;
    const col = matrix[row].indexOf(currentPosition);

    availablePosition = availablePosition.concat(getLeftDiagonalPositions(row, col, maxMoves));
    availablePosition = availablePosition.concat(getRightDiagonalPositions(row, col, maxMoves));
    
    return availablePosition;
};

// Method used to get all the available position based on current position.
const getPossiblePositions = async(piece, position) => {
    let possiblePositions = [];
    const maxMoves = piece === 'king' ? 1 : noOfRows - 1;
    if (piece === 'pawn') {
        possiblePositions = getVeticalPositionsOneStepForwardOnly(position);
    } else if (piece === 'king' || piece === 'queen') {
        possiblePositions = getAllVerticalPositions(maxMoves, position);
        possiblePositions = possiblePositions.concat(getAllHorizontalPositions(maxMoves, position));
        possiblePositions = possiblePositions.concat(getAllDiagonalPositions(maxMoves, position));
    }
    return possiblePositions;
};

// Main Method
const main = async(userInput) => {
    let matrix = await prepareMatrix(noOfRows, noOfCols);
    const userInputObj = await checkIfValidInput(userInput, noOfRows, noOfCols, matrix);
    if (userInputObj.valid) {
        const { piece } = userInputObj;
        const { position } = userInputObj;
        let availablePositions = await getPossiblePositions(piece, position);
        console.log(availablePositions.sort());
        RL.close();
        return availablePositions;
    } else {
        RL.close();
        return userInputObj.msg;
    }
};

// Accepting input from user
RL.question('Enter the chess piece (Pawn/King/Queen) and its position : ', async (userInput) => {
    await main(userInput);
});


module.exports = {
    main,
    prepareMatrix
}