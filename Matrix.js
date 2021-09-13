class Matrix {
    constructor(noOfRows, noOfCols) {
        this.noOfRows = noOfRows;
        this.noOfCols = noOfCols;
        this.matrix = new Array(noOfRows);

        for (let row = 0; row < noOfRows; row += 1) {
            this.matrix[row] = new Array(noOfCols);
        }
    }

    // Method to create a matrix based on no. of rows and columns
    async prepareMatrix() {
        for(let row = 0; row < this.noOfRows; row += 1) {
            let charCodeStart = 65;
            for (let col = 0; col < this.noOfCols; col += 1) {
                this.matrix[row][col] = String.fromCharCode(charCodeStart++) + '' + parseInt(this.noOfCols - row);
            }
        }
        return this.matrix;
    };
};

module.exports = {
    Matrix
}