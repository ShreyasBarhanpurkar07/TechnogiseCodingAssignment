const { King } = require("./King");
const { Pawn } = require("./Pawn");
const { Queen } = require("./Queen");

class PossiblePositions {
    constructor(noOfRows, piece, position, matrix) {
        this.noOfRows = noOfRows;
        this.piece = piece;
        this.position = position;
        this.matrix = matrix;
    }

    // Method used to get all the available position based on current position.
    async getAllPossiblePositions () {
        let possiblePositions = [];
        if (this.piece === 'pawn') {
            const pawnObj = new Pawn(this.noOfRows, this.position, this.matrix);
            possiblePositions = pawnObj.getPossiblePositions();
        } else if (this.piece === 'king') {
            const kingObj = new King(this.noOfRows, this.position, this.matrix);
            possiblePositions = kingObj.getPossiblePositions();
        } else if (this.piece === 'queen') {
            const queenObj = new Queen(this.noOfRows, this.position, this.matrix);
            possiblePositions = queenObj.getPossiblePositions();
        }
        return possiblePositions;
    };
}

module.exports = {
    PossiblePositions
};