const WHITE_PAWN = "&#x2659;";
const BLACK_PAWN = "&#x265F;";

// TODO: User playing as white by default. There will be a switch to toggle this, which will negate this value, and replace the pieces. 
const isPlayingWhite = true; 

function colorSquare(square) {
    const GREEN = "#739552";
    const WHITE = "#ebecd0";

    let column = parseInt(square.id[0]);
    let row = parseInt(square.id[1]);
    let positionSum = row + column;

    if (positionSum % 2 == 0) {
        square.style.backgroundColor = GREEN;
    }

    else {
        square.style.backgroundColor = WHITE;
    }

}

function roundCorners() {
    const topLeftCorner = document.querySelector(`#${CSS.escape("18")}`);
    const topRightCorner = document.querySelector(`#${CSS.escape("88")}`);
    const bottomLeftCorner = document.querySelector(`#${CSS.escape("11")}`);
    const bottomRightCorner = document.querySelector(`#${CSS.escape("81")}`);

    topLeftCorner.classList.add("top-left-corner");
    topRightCorner.classList.add("top-right-corner");
    bottomLeftCorner.classList.add("bottom-left-corner");
    bottomRightCorner.classList.add("bottom-right-corner");
}


const board = document.querySelector("#board");

for (let row = 8; row > 0; row--) {
    for (let column = 1; column < 9; column++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.id = `${column}${row}`;
        colorSquare(square);
        
        
        board.appendChild(square);
    }
}

roundCorners();
placePieces();

// TODO: Add functionality for placing the major pieces 
function placePieces() {
    let playerPawn;
    let playerPieces
    let opponentPawn;
    let opponentPieces;

    if (isPlayingWhite) {
        playerPawn = WHITE_PAWN;
        opponentPawn = BLACK_PAWN
    }

    else {
        playerPawn = BLACK_PAWN;
        opponentPawn = WHITE_PAWN;
    }


    const allSquares = Array.from(board.childNodes);
  
    opponentPawnRow = allSquares.filter((square) => (square.id[1] == '8'));
    playerPawnRow = allSquares.filter((square) => (square.id[1] == '1'));

    // playerPawnRow and opponentPawnRow should both have length 8 
    for (let i = 0; i < opponentPawnRow.length; i++) {
        opponentPawnRow[i].innerHTML = opponentPawn;
        playerPawnRow[i].innerHTML = playerPawn;
    }
}




