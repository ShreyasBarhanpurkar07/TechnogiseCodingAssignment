const readline = require('readline');

const RL = readline.createInterface(process.stdin, process.stdout);

let matrix;

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

const checkIfValidInput = async (userInput, noOfRows, noOfCols, matrix) => {
    let validFlag = true;
    
    let input = userInput.split(',');
    if (input.length > 1 && input[0].trim().toLowerCase() !== 'king' && input[0].trim().toLowerCase() !== 'queen' && input[0].trim().toLowerCase() !== 'pawn') {
        console.log('Invalid Piece entered');
        validFlag = false;
    }

    let validPositionFlag = false;
    for(let row = 0; row < noOfRows; row += 1) {
        for (let col = 0; col < noOfCols; col += 1) {
            if(input.length > 1 && matrix[row][col] === input[1].trim().toUpperCase()) {
                validPositionFlag = true;
                break;
            }
            if (validPositionFlag) {
                break;
            }
        }
    }
    if (!validPositionFlag) {
        console.log('Invalid position!');
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
        valid: false
    };
};

const getVeticalPositionsOneStepForwardOnly = (currentPosition) => {
    let availablePosition = [];
    let row = parseInt(8 - parseInt(currentPosition.split('')[1]));
    const currentIndex = matrix[row].indexOf(currentPosition);
    if (row !== 0) {
        row -= 1;
        availablePosition.push(matrix[row][currentIndex])
        return availablePosition;
    }
    return [];
};

const getAllVerticalPositions = (noOfMoves, currentPosition) => {
    let availablePosition = [];
    let row = parseInt(8 - parseInt(currentPosition.split('')[1]));
    let maxMoves = noOfMoves;
    const currentIndex = matrix[row].indexOf(currentPosition);
    if (row !== 0) {
        while (row !== 0 && maxMoves != 0) {
            row -= 1;
            availablePosition.push(matrix[row][currentIndex]);
            maxMoves -= 1;
        }
    }

    row = parseInt(8 - parseInt(currentPosition.split('')[1]));
    if(row !== 7) {
        maxMoves = noOfMoves;
        while (row !== 7 && maxMoves != 0) {
            row += 1;
            availablePosition.push(matrix[row][currentIndex]);
            maxMoves -= 1;
        }
    }
    return availablePosition;
};

const getAllHorizontalPositions = (noOfMoves, currentPosition) => {
    let availablePosition = [];
    const row = parseInt(8 - parseInt(currentPosition.split('')[1]));
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
    if(currentIndex !== 7) {
        maxMoves = noOfMoves;
        while (currentIndex !== 7 && maxMoves != 0) {
            currentIndex += 1;
            availablePosition.push(matrix[row][currentIndex]);
            maxMoves -= 1;
        }
    }
    return availablePosition;
};

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

        if (tempRow !== 7) {
            while (tempRow !== 7 && tempCol !== 0 && maxMoves !== 0) {
                availablePosition.push(matrix[++tempRow][--tempCol]);
                maxMoves -= 1;
            }
        }
    }
    
    return availablePosition;
};

const getRightDiagonalPositions = (row, col, noOfMoves) => {
    let availablePosition = [];
    if (col !== 7) {
        let tempRow = row;
        let tempCol = col;
        let maxMoves = noOfMoves;
        if (tempRow !== 0) {
            while (tempRow !== 0 && tempCol !== 7 && maxMoves !== 0) {
                availablePosition.push(matrix[--tempRow][++tempCol]);
                maxMoves -= 1;
            }
        }

        tempRow = row;
        tempCol = col;
        maxMoves = noOfMoves;

        if (tempRow !== 7 ) {
            while (tempRow !== 7 && tempCol !== 7 && maxMoves !== 0) {
                availablePosition.push(matrix[++tempRow][++tempCol]);
                maxMoves -= 1;
            }
        }
    }
    return availablePosition;
};

const getAllDiagonalPositions = (noOfMoves, currentPosition) => {
    let availablePosition = [];
    const row = parseInt(8 - parseInt(currentPosition.split('')[1]));
    const maxMoves = noOfMoves;
    const col = matrix[row].indexOf(currentPosition);

    availablePosition = availablePosition.concat(getLeftDiagonalPositions(row, col, maxMoves));
    availablePosition = availablePosition.concat(getRightDiagonalPositions(row, col, maxMoves));
    
    return availablePosition;
};

const getPossiblePositions = async(piece, position) => {
    let possiblePositions = [];
    const maxMoves = piece === 'king' ? 1 : 7;
    if (piece === 'pawn') {
        possiblePositions = getVeticalPositionsOneStepForwardOnly(position);
    } else if (piece === 'king' || piece === 'queen') {
        possiblePositions = getAllVerticalPositions(maxMoves, position);
        possiblePositions = possiblePositions.concat(getAllHorizontalPositions(maxMoves, position));
        possiblePositions = possiblePositions.concat(getAllDiagonalPositions(maxMoves, position));
    }
    return possiblePositions;
};

const main = async() => {
    let noOfRows = 8;
    let noOfCols = 8;
    let matrix = await prepareMatrix(noOfRows,noOfCols);
    RL.question('Enter the chess piece (Pawn/King/Queen) and its position : ', async (userInput) => {
        const userInputObj = await checkIfValidInput(userInput, noOfRows, noOfCols, matrix);
        if (userInputObj.valid) {
            const { piece } = userInputObj;
            const { position } = userInputObj;
            let availablePositions = await getPossiblePositions(piece, position);
            console.log(availablePositions.sort());
            return availablePositions;
        } else {
            return 'Invalid Piece or Position';
        }
    });
};

main();

module.exports = {
    main,
    prepareMatrix,
    checkIfValidInput,
    getPossiblePositions,
    getVeticalPositionsOneStepForwardOnly,
    getAllVerticalPositions,
    getAllHorizontalPositions,
    getAllDiagonalPositions,
    getLeftDiagonalPositions,
    getRightDiagonalPositions
}