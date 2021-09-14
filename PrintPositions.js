class PrintResult {
    constructor (availablePositions) {
        this.availablePositions = typeof availablePositions === 'object' ? availablePositions.sort().join(', ') : availablePositions;
    }

    printResultToConsole () {
        console.log('Result: ', this.availablePositions);
    }
};

module.exports = {
    PrintResult
};