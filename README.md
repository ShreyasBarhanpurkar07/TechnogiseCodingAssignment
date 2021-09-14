*********************** Instructions to run the program ************************
1) To run the program:
    i) Open command prompt, go the project folder
    ii) run the 'npm i' command to install the required packages.
    iii) run the command 'node Main.js'
    iv) The console will ask you for input. Please enter the value in the format and then press enter: <Piece>, <Position>
        for e.g. King, d5
    v) You will get the output with the available positions for the piece from the entered position, or appropriate message if there are no available positions or entered input is incorrect.

2) To run the test cases:
    Run the command 'npm test -- --coverage'. This will run the tests as well give a table of the test coverage report.

********************************** Assumptions **********************************

1) Chess board will always be square board. The code will work for square board of any size.

2) For pawn, the movement is considered to be from bottom to top, i.e. from A1/B1/C1/D1/E1/F1/G1/H1 towards A8/B8/C8/D8/E8/F8/G8/H8.

3) There are no other pieces on the Chess board when we are entering the piece and its current position.