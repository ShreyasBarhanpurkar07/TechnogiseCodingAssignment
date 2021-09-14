class PossiblePositions {
    constructor(noOfRows, piece, position, matrix) {
        this.noOfRows = noOfRows;
        this.piece = piece;
        this.position = position;
        this.matrix = matrix;
    }

    // Method used for getting the vertical(forward as well as backward) avaliable positions 
    getAllVerticalPositions (noOfMoves, currentPosition, backwardAllowed = true) {
        let availablePosition = [];
        let row = parseInt(this.noOfRows - parseInt(currentPosition.split('')[1]));
        let maxMoves = noOfMoves;
        const currentIndex = this.matrix[row].indexOf(currentPosition);
        if (row !== 0) {
            while (row !== 0 && maxMoves != 0) {
                row -= 1;
                availablePosition.push(this.matrix[row][currentIndex]);
                maxMoves -= 1;
            }
        }

        row = parseInt(this.noOfRows - parseInt(currentPosition.split('')[1]));
        if(row !== this.noOfRows - 1 && backwardAllowed) {
            maxMoves = noOfMoves;
            while (row !== this.noOfRows - 1 && maxMoves != 0) {
                row += 1;
                availablePosition.push(this.matrix[row][currentIndex]);
                maxMoves -= 1;
            }
        }
        return availablePosition;
    }

    // Method used for getting the horizontal(left as well as right) avaliable positions 
    getAllHorizontalPositions (noOfMoves, currentPosition) {
        let availablePosition = [];
        const row = parseInt(this.noOfRows - parseInt(currentPosition.split('')[1]));
        let maxMoves = noOfMoves;
        let currentIndex = this.matrix[row].indexOf(currentPosition);
        if (currentIndex !== 0) {
            while (currentIndex !== 0 && maxMoves != 0) {
                currentIndex -= 1;
                availablePosition.push(this.matrix[row][currentIndex]);
                maxMoves -= 1;
            }
        }

        currentIndex = this.matrix[row].indexOf(currentPosition);
        if(currentIndex !== this.noOfRows - 1) {
            maxMoves = noOfMoves;
            while (currentIndex !== this.noOfRows - 1 && maxMoves != 0) {
                currentIndex += 1;
                availablePosition.push(this.matrix[row][currentIndex]);
                maxMoves -= 1;
            }
        }
        return availablePosition;
    }

    // Method used to get left diagonal(top and bottom) available positions
    getLeftDiagonalPositions (row, col, noOfMoves) {
        let availablePosition = [];
        if (col !== 0) {
            let tempRow = row;
            let tempCol = col;
            let maxMoves = noOfMoves;
            if (tempRow !== 0) {
                while (tempRow !== 0 && tempCol !== 0 && maxMoves !== 0) {
                    availablePosition.push(this.matrix[--tempRow][--tempCol]);
                    maxMoves -= 1;
                }
            }

            tempRow = row;
            tempCol = col;
            maxMoves = noOfMoves;

            if (tempRow !== this.noOfRows - 1) {
                while (tempRow !== this.noOfRows - 1 && tempCol !== 0 && maxMoves !== 0) {
                    availablePosition.push(this.matrix[++tempRow][--tempCol]);
                    maxMoves -= 1;
                }
            }
        }
        
        return availablePosition;
    }

    // Method used to get right diagonal(top and bottom) available positions
    getRightDiagonalPositions (row, col, noOfMoves) {
        let availablePosition = [];
        if (col !== this.noOfRows - 1) {
            let tempRow = row;
            let tempCol = col;
            let maxMoves = noOfMoves;
            if (tempRow !== 0) {
                while (tempRow !== 0 && tempCol !== this.noOfRows - 1 && maxMoves !== 0) {
                    availablePosition.push(this.matrix[--tempRow][++tempCol]);
                    maxMoves -= 1;
                }
            }

            tempRow = row;
            tempCol = col;
            maxMoves = noOfMoves;

            if (tempRow !== this.noOfRows - 1 ) {
                while (tempRow !== this.noOfRows - 1 && tempCol !== this.noOfRows - 1 && maxMoves !== 0) {
                    availablePosition.push(this.matrix[++tempRow][++tempCol]);
                    maxMoves -= 1;
                }
            }
        }
        return availablePosition;
    }

    // Method used to get the diagonal(both left and right) available positions
    getAllDiagonalPositions (noOfMoves, currentPosition) {
        let availablePosition = [];
        const row = parseInt(this.noOfRows - parseInt(currentPosition.split('')[1]));
        const maxMoves = noOfMoves;
        const col = this.matrix[row].indexOf(currentPosition);

        availablePosition = availablePosition.concat(this.getLeftDiagonalPositions(row, col, maxMoves));
        availablePosition = availablePosition.concat(this.getRightDiagonalPositions(row, col, maxMoves));
        
        return availablePosition;
    }

    // Method used to get all the available position based on current position.
    async getPossiblePositions () {
        let possiblePositions = [];
        const maxMoves = this.piece === 'king' || this.piece === 'pawn' ? 1 : this.noOfRows - 1;
        if (this.piece === 'pawn') {
            possiblePositions = this.getAllVerticalPositions(maxMoves, this.position, false);
        } else if (this.piece === 'king' || this.piece === 'queen') {
            possiblePositions = this.getAllVerticalPositions(maxMoves, this.position);
            possiblePositions = possiblePositions.concat(this.getAllHorizontalPositions(maxMoves, this.position));
            possiblePositions = possiblePositions.concat(this.getAllDiagonalPositions(maxMoves, this.position));
        }
        return possiblePositions;
    }
}

module.exports = {
    PossiblePositions
};