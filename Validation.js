class Validation {
    constructor(userInput, noOfRows, noOfCols, matrix) {
        this.userInput = userInput;
        this.noOfRows = noOfRows;
        this.noOfCols = noOfCols;
        this.matrix = matrix;
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
}

module.exports = {
    Validation
}