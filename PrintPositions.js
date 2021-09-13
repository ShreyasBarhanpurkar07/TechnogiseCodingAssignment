class PrintResult {
    constructor (availablePositions) {
        this.availablePositions = typeof availablePositions === 'object' ? availablePositions.sort().join(', ') : availablePositions;
    }

    printResultToConsole () {
        console.log('Available Positions: ', this.availablePositions);
    }
};

module.exports = {
    PrintResult
};