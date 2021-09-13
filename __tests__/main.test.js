const { Main } = require('../Main');
const { Matrix } = require('../Matrix');

const sampleMatrix = [
    [
      'A8', 'B8', 'C8',
      'D8', 'E8', 'F8',
      'G8', 'H8'
    ],
    [
      'A7', 'B7', 'C7',
      'D7', 'E7', 'F7',
      'G7', 'H7'
    ],
    [
      'A6', 'B6', 'C6',
      'D6', 'E6', 'F6',
      'G6', 'H6'
    ],
    [
      'A5', 'B5', 'C5',
      'D5', 'E5', 'F5',
      'G5', 'H5'
    ],
    [
      'A4', 'B4', 'C4',
      'D4', 'E4', 'F4',
      'G4', 'H4'
    ],
    [
      'A3', 'B3', 'C3',
      'D3', 'E3', 'F3',
      'G3', 'H3'
    ],
    [
      'A2', 'B2', 'C2',
      'D2', 'E2', 'F2',
      'G2', 'H2'
    ],
    [
      'A1', 'B1', 'C1',
      'D1', 'E1', 'F1',
      'G1', 'H1'
    ]
];

const sampleKingResponse = [
  'C4', 'C5', 'C6',
  'D4', 'D6', 'E4',
  'E5', 'E6'
];

const sampleQueenResponse = [
  'A4', 'A8', 'B1', 'B4', 'B7',
  'C2', 'C4', 'C6', 'D3', 'D4',
  'D5', 'E1', 'E2', 'E3', 'E5',
  'E6', 'E7', 'E8', 'F3', 'F4',
  'F5', 'G2', 'G4', 'G6', 'H1',
  'H4', 'H7'
];

const sampleForQueenAtExtremeRightColumn = [
  'A4', 'B4', 'C4', 'D4',
  'D8', 'E1', 'E4', 'E7',
  'F2', 'F4', 'F6', 'G3',
  'G4', 'G5', 'H1', 'H2',
  'H3', 'H5', 'H6', 'H7',
  'H8'
];

const sampleForQueenAtExtremeLeftColumn = [
  'A1', 'A2', 'A3', 'A5',
  'A6', 'A7', 'A8', 'B3',
  'B4', 'B5', 'C2', 'C4',
  'C6', 'D1', 'D4', 'D7',
  'E4', 'E8', 'F4', 'G4',
  'H4'
];

const sampleForQueenAtExtremeTopRow = [
  'A6', 'A8', 'B7', 'B8',
  'C1', 'C2', 'C3', 'C4',
  'C5', 'C6', 'C7', 'D7',
  'D8', 'E6', 'E8', 'F5',
  'F8', 'G4', 'G8', 'H3',
  'H8'
];

const sampleForQueenAtExtremeBottomRow = [
  'A1', 'A4', 'B1', 'B3',
  'C1', 'C2', 'D2', 'D3',
  'D4', 'D5', 'D6', 'D7',
  'D8', 'E1', 'E2', 'F1',
  'F3', 'G1', 'G4', 'H1',
  'H5'
];

const samplePawnValidResponse = ['C5'];

describe('Test to check if matrix being prepared is correct', () => {
  test('Testing Prepare Matrix', async () => {
    const matrixObj = new Matrix(8, 8)
    const response = await matrixObj.prepareMatrix();
    expect(response).toEqual(sampleMatrix);
  });
});

describe('Tests for Invalid Inputs from user', () => {
    test('Testing Invalid position', async () => {
        const mainObj = new Main('king, d9');
        const response = await mainObj.main();
        expect(response).toEqual('Invalid Position');
    });
    test('Testing Invalid position', async () => {
      const mainObj = new Main('king, i5');
      const response = await mainObj.main();
      expect(response).toEqual('Invalid Position');
    });
    test('Testing Invalid piece', async () => {
      const mainObj = new Main('camel, e5');
      const response = await mainObj.main();
      expect(response).toEqual('Invalid Piece');
    });
    test('Testing Invalid piece and position', async () => {
      const mainObj = new Main('camel, i5');
      const response = await mainObj.main();
      expect(response).toEqual('Invalid Piece and Position');
    });
    test('Testing Invalid input format', async () => {
      const mainObj = new Main('king d5');
      const response = await mainObj.main();
      expect(response).toEqual('Please give input in proper format : <piece>, <position>');
    });
});

describe('Tests for valid Inputs from user', () => {
  test('Testing for pawn with available position', async () => {
    const mainObj = new Main('pawn, c4');
    const response = await mainObj.main();
    expect(response).toEqual(samplePawnValidResponse);
  });
  test('Testing for pawn with NO available position', async () => {
    const mainObj = new Main('pawn, c8');
    const response = await mainObj.main();
    expect(response).toEqual('No Positions Available');
  });
  test('Testing for king', async () => {
    const mainObj = new Main('king, d5');
    const response = await mainObj.main();
    expect(response).toEqual(sampleKingResponse);
  });
  test('Testing for queen', async () => {
    const mainObj = new Main('queen, e4');
    const response = await mainObj.main();
    expect(response).toEqual(sampleQueenResponse);
  });
  test('Testing for queen at extreme right column', async () => {
    const mainObj = new Main('queen, h4');
    const response = await mainObj.main();
    expect(response).toEqual(sampleForQueenAtExtremeRightColumn);
  });
  test('Testing for queen at extreme left column', async () => {
    const mainObj = new Main('queen, a4');
    const response = await mainObj.main();
    expect(response).toEqual(sampleForQueenAtExtremeLeftColumn);
  });
  test('Testing for queen at extreme top row', async () => {
    const mainObj = new Main('queen, c8');
    const response = await mainObj.main();
    expect(response).toEqual(sampleForQueenAtExtremeTopRow);
  });
  test('Testing for queen at extreme bottom row', async () => {
    const mainObj = new Main('queen, d1');
    const response = await mainObj.main();
    expect(response).toEqual(sampleForQueenAtExtremeBottomRow);
  });
});