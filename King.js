const { ChessPiece } = require('./ChessPiece');
class King extends ChessPiece {
    constructor(noOfRows, position, matrix) {
        super(noOfRows, position, matrix);
        this.maxMoves = 1
    }

    // Method used to get all the available position based on current position.
    async getPossiblePositions () {
        let possiblePositions = [];
        possiblePositions = this.getAllVerticalPositions(this.maxMoves, this.position);
        possiblePositions = possiblePositions.concat(this.getAllHorizontalPositions(this.maxMoves, this.position));
        possiblePositions = possiblePositions.concat(this.getAllDiagonalPositions(this.maxMoves, this.position));
        return possiblePositions;
    }
}

module.exports = {
    King
}