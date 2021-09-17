const { ChessPiece } = require('./ChessPiece');
class Pawn extends ChessPiece {
    constructor(noOfRows, position, matrix) {
        super(noOfRows, position, matrix);
        this.maxMoves = 1
    }

    // Method used to get all the available position based on current position.
    async getPossiblePositions () {
        let possiblePositions = [];
        possiblePositions = this.getAllVerticalPositions(this.maxMoves, this.position, false);
        return possiblePositions;
    }
}

module.exports = {
    Pawn
}